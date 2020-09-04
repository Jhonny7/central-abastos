import { HomeGeoProveedoresPage } from './../home-geo-proveedores/home-geo-proveedores';
import { LoadingService } from './../../services/loading.service';
import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, ModalController, FabContainer } from 'ionic-angular';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { User } from '../../models/User';
import { ProductoService } from '../../services/producto.service';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';
import { DetalleProductoPage } from '../detalle-producto/detalle-producto';
import { ValidationService } from '../../services/validation.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
declare var Stripe;

@Component({
  selector: 'page-carrito-compras',
  templateUrl: 'carrito-compras.html',
})
export class CarritoComprasPage implements OnDestroy {

  public selectOptions: any = {
    cssClass: 'action-sheet-class'
  };
  public user: User = null;

  public productosCarrito: any = [];
  public productosCarritoReplica: any = [];

  public env: any = environment;

  public first: boolean = true;

  public stripe = Stripe(JSON.parse(this.localStorageEncryptService.yayirobe(environment.st.keyPublic)));
  //public stripe = Stripe('pk_live_4f4ddGQitsEeJ0I1zg84xkRZ00mUNujYXd');
  public card: any;

  public recarga: boolean = false;

  public cards: any = null;

  public dataCard: any = {
    tarj: "",
    cvc: "",
    dtime: ""
  };

  public pagoActual: any = null;

  public objetoRegistro: any[] = [
    {
      name: "Nombre del contacto",
      required: true,
      length: 50,
      type: "text",
      formName: "name",
      value: null,
      disabled: false
    },
    {
      name: "Teléfono",
      required: true,
      length: 10,
      type: "number",
      formName: "tel",
      value: null,
      disabled: false
    },
    {
      name: "Correo electrónico",
      required: true,
      length: 100,
      type: "email",
      formName: "email",
      value: null,
      disabled: false
    },

  ];

  public enCompra: boolean = false;

  public objetoRegistroOriginal: any[] = [];

  public formGroup: FormGroup = null;

  public btnHabilitado: boolean = true;

  public data: any = null;

  public objetoRegistroCopy: any = [];

  public check: boolean = false;

  public agrupado: any[] = [];

  public totales: any = null;

  @ViewChild('fab') fab: FabContainer;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localStorageEncryptService: LocalStorageEncryptService,
    private events: Events,
    private modalController: ModalController,
    //private productoService: ProductoService,
    private genericService: GenericService,
    private alertCtrl: AlertController,
    private alertaService: AlertaService,
    private loadingService: LoadingService,
    public formBuilder: FormBuilder,
    private currencyPipe: CurrencyPipe) {
    this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
    if (this.user) {
      this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
      this.productosCarritoReplica = this.productosCarrito;
      this.objetoRegistro.forEach(element => {
        this.objetoRegistroOriginal.push(element);
      });
      console.log(this.objetoRegistroOriginal);


      this.recarga = navParams.get("recarga");
      console.log(this.recarga);

      this.getCards();

      this.agruparTotales();
    }

  }

  ionViewDidEnter() {
    this.events.publish("backHome");
    this.events.publish("backHistorial");
    this.events.publish("backProveedor");

  }

  ionViewWillLeave() {

  }

  agruparTotales() {
    this.agrupado = [];
    let unique = this.productosCarrito.filter((valorActual, indiceActual, arreglo) => {
      //Podríamos omitir el return y hacerlo en una línea, pero se vería menos legible
      return arreglo.findIndex(valorDelArreglo => valorDelArreglo.productoProveedor.proveedorId === valorActual.productoProveedor.proveedorId) === indiceActual
    });

    unique.forEach(prov => {
      prov.carritoAgrupado = [];
      this.productosCarrito.forEach(element => {
        if (element.productoProveedor.proveedorId == prov.productoProveedor.proveedorId) {
          prov.carritoAgrupado.push(element);
        }
      });
      this.agrupado.push(prov);
    });


    console.log(this.agrupado);
    this.getTotales();
  }

  armaObjRegistro() {
    this.objetoRegistro = [
      {
        name: "Nombre del contacto",
        required: true,
        length: 50,
        type: "text",
        formName: "name",
        value: null,
        disabled: false
      },
      {
        name: "Teléfono",
        required: true,
        length: 10,
        type: "number",
        formName: "tel",
        value: null,
        disabled: false
      },
      {
        name: "Correo electrónico",
        required: true,
        length: 100,
        type: "email",
        formName: "email",
        value: null,
        disabled: false
      },

    ];

    if (this.totales.listCarritoProveedores.length > 1) {

      this.objetoRegistro.push({
        name: "Dirección",
        required: true,
        length: 200,
        type: "text",
        formName: "direc",
        value: null,
        disabled: true
      });
      this.objetoRegistro.push({
        name: "Código postal",
        required: false,
        length: 6,
        type: "text",
        formName: "cp",
        value: null,
        disabled: false
      });
    } else {
      this.objetoRegistro.push({
        name: "Picking",
        required: true,
        length: 11,
        type: "select",
        formName: "sex",
        value: false,
        opts: [
          {
            id: false,
            value: "Entrega a domicilio"
          },
          {
            id: true,
            value: "Entrega en domicilio de proveedor"
          }
        ]
      });
      this.objetoRegistro.push({
        name: "Dirección",
        required: true,
        length: 200,
        type: "text",
        formName: "direc",
        value: null,
        disabled: true
      });
      this.objetoRegistro.push({
        name: "Código postal",
        required: false,
        length: 6,
        type: "text",
        formName: "cp",
        value: null,
        disabled: false
      });
    }
    if (!this.enCompra) {
      setTimeout(() => {
        this.fab.toggleList();
      }, 500);
    }
  }

  getTotales() {
    //debugger;

    this.genericService.sendGetRequest(environment.carritoComprasProveedor).subscribe((response: any) => {
      console.log(response);
      this.totales = response;
      this.agrupado.forEach(element => {
        if (element.totalAgrupado) {
          delete element.totalAgrupado;
        }
      });
      this.totales.listCarritoProveedores.forEach(item => {
        this.agrupado.forEach(element => {
          if (!element.totalAgrupado && item.proveedor.id == element.productoProveedor.proveedor.id) {
            element.totalAgrupado = {
              comisionTransporte: item.comisionTransporte,
              tiempoEntrega: item.tiempoEntrega,
              total: item.total,
              totalProductos: item.totalProductos
            };
          }
        });
      });

      this.armaObjRegistro();
    }, (error: HttpErrorResponse) => {
      //this.alertaService.warnAlertGeneric("Agrega artículos al carrito");
    });
  }

  ngOnDestroy() {
    this.events.publish("carritoTab");
  }

  ionViewDidLoad() {
    if (this.recarga) {
      let claseTabs: any = document.getElementsByClassName("tabbar");
      if (claseTabs[0]) {
        //claseTabs[0].style.display = "none";
      }
      //this.verCarrito();
    }

    this.events.subscribe('carritoTab', (data) => {
      this.verCarrito();
    });
    this.events.subscribe('carritoTab2', (data) => {
      this.verCarrito();
    });
  }


  verCarrito() {
    //nav.pop();
    this.cargarProductosCarrito();


  }

  cargarProductosCarrito() {
    this.genericService.sendGetRequest(environment.carritoCompras).subscribe((response: any) => {

      this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}`, response);
      this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
      this.productosCarritoReplica = this.productosCarrito;
      this.agruparTotales();
    }, (error: HttpErrorResponse) => {
    });
  }

  seleccionar(card: any) {
    if (!card.selected) {
      this.cards.forEach(element => {
        element.selected = false;
      });
      card.selected = true;
    } else {
      card.selected = false;
    }
  }

  getCards() {
    this.genericService.sendGetRequest(environment.tarjetas).subscribe((response: any) => {

      this.cards = response;
      this.cards.forEach(element => {
        element.selected = false;
      });
      if (this.cards.length <= 0) {
        //this.alertaService.warnAlertGeneric("Aún no cuentas con tarjetas frecuentes");
      }
    }, (error: HttpErrorResponse) => {
      let err: any = error.error;
      this.cards = null;
      //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
    });
  }

  setupStripe() {

    let position: any = this.cards.findIndex(
      (carrito) => {
        return carrito.selected;
      }
    );
    let c: any = {
      number: "4242424242424242",
      cvc: "123",
      exp_month: 12,
      exp_year: 2025
    }

    let bandera: boolean = false;
    if (this.cards[position]) {
      let item: any = this.cards[position];
      let fechaFormat: any = item.fechaCaducidad.split("-");
      item.expMont = fechaFormat[1];
      item.expYear = fechaFormat[0];

      c.number = item.numeroTarjeta;
      c.cvc = item.numeroSeguridad;
      c.exp_month = item.expMont;
      c.exp_year = item.expYear;
    } else if (this.dataCard.dtime.length == 0 || this.dataCard.tarj.length == 0 || this.dataCard.cvc.length == 0) {
      bandera = true;
    } else {
      c.number = this.dataCard.tarj;
      c.cvc = this.dataCard.cvc;

      let fechaFormat: any = this.dataCard.dtime.split("-");
      let expMont = fechaFormat[1];
      let expYear = fechaFormat[0];

      c.exp_month = expMont;
      c.exp_year = expYear;
    }
    if (!bandera) {
      Stripe.setPublishableKey(JSON.parse(this.localStorageEncryptService.yayirobe(environment.st.keyPublic)));
      this.loadingService.show().then(() => {
        let clase: any = this;
        Stripe.card.createToken(c, (status, response) => {

          if (response.error) { // Problem!
            clase.loadingService.hide();
            clase.alertaService.errorAlertGeneric("Lo sentimos! No es posible efectuar el cobro, verifica que la información de tu tarjeta es correcta");
          } else { // Token was created!

            // Get the token ID:
            console.log(response);

            //clase.loadingService.hide();
            var token = response.id;
            let body: any = {
              pedidoId: clase.pagoActual.id,
              token: token
            };
            let service: any = clase.genericService.sendPutRequest(`${environment.pedidos}/pago`, body);

            service.subscribe((response: any) => {
              clase.loadingService.hide();
              clase.events.publish("totalCarrito");
              clase.events.publish("cargarPedidos");
              clase.alertaService.successAlertGeneric("El pago se ha efectuado con éxito");
              clase.cerrar();
            }, (error: HttpErrorResponse) => {

              clase.loadingService.hide();
              clase.alertaService.errorAlertGeneric("Ocurrió un error al procesar tu pago, intenta nuevamente");
            });
          }
        });
      });
    } else {
      this.alertaService.warnAlertGeneric("Llena todos los campos de tarjeta o selecciona alguna que hayas ingresado anteriormente");
    }
  }

  cerrar() {
    let modal: any = document.getElementById("myModal");
    modal.style.display = "none";
    this.dataCard = {
      tarj: "",
      cvc: "",
      dtime: ""
    };
    this.cards.forEach(element => {
      element.selected = false;
    });

    ///Aqui ejecutar el limpiado de carrito
    this.enCompra = false;
    this.events.publish("carritoTab");
  }

  deleteFavorito(producto) {
    let nuevoArrarCarrito: any[] = [];
    let productoDelete: any = null;
    this.productosCarrito.forEach(element => {
      if (producto.id != element.id) {
        nuevoArrarCarrito.push(element);
      } else {
        productoDelete = element;
      }
    });
    this.productosCarrito = nuevoArrarCarrito;
    this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}`, this.productosCarrito);

    //Llamar a events
    this.events.publish('updateProductos', { productoDelete });

    if (this.productosCarrito.length <= 0) {
      this.navCtrl.pop();
    }
  }

  incrementa(p: any) {
    //debugger;
    let bandera: boolean = false;
    if (p.cantidad) {
      p.cantidad++;
    } else if (p.cantidad == 0) {
      p.cantidad = 1;
      bandera = true;
    } else {
      p.cantidad = 1;
      bandera = true;
    }
    console.log(p.cantidad);

    this.agregarToCarritoBack(bandera, p);
  }

  agregarToCarrito(producto: any) {
    //debugger;
    let productosStorage: any = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
    let productos: any = [];
    productos.push(producto);
    if (productosStorage) {
      productosStorage.forEach(element => {
        productos.push(element);
      });
    }
    producto.carrito = true;
    try {
      this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}`, productos);
    } catch (error) {
      producto.carrito = false;
    }
  }

  agregarToCarritoBack(bandera: boolean, producto: any) {
    //debugger;
    let body: any = {
      precio: producto.precio,
      productoProveedorId: producto.productoProveedor.id
    }
    let service: any = this.genericService.sendPostRequest(environment.carritoCompras, body);

    if (producto.cantidad > 1) {
      body.cantidad = producto.cantidad;
      service = this.genericService.sendPutRequest(environment.carritoCompras, body);
    }

    service.subscribe((response: any) => {
      if (bandera) {
        this.agregarToCarrito(producto);
        this.verificarCarritoModificarCantidad(producto);
      } else {
        this.verificarCarritoModificarCantidad(producto);
      }

    }, (error: HttpErrorResponse) => {
      if (producto.cantidad == 1) {
        producto.cantidad = 1;
      } else {
        producto.cantidad--;
      }
    });
  }

  viewDetail(producto: any) {
    //consumir servicio de imagenes completas
    this.loadingService.show().then(() => {
      this.genericService.sendGetRequest(`${environment.proveedorProductos}/${producto.productoProveedor.id}`).subscribe((response: any) => {

        //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
        //let nav = this.app.getRootNav();
        //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
        if (this.user) {
          let carritos = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);

          if (carritos) {
            let position: any = carritos.findIndex(
              (carrito) => {
                return carrito.id == response.id;
              }
            );

            if (position >= 0) {
              response.cantidad = carritos[position].cantidad;
            }
          }
        }
        this.navCtrl.push(DetalleProductoPage, { producto: response, fromCarritos: true });
        this.loadingService.hide();
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        let err: any = error.error;
        this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
      });
    });
    //

  }

  decrementar(p: any) {
    p.cantidad--;
    this.borrarToCarritoBack(p);
  }

  borrarToCarritoBack(producto: any) {
    let body: any = {
      precio: producto.precio,
      productoProveedorId: producto.productoProveedor.id
    }
    body.cantidad = producto.cantidad;

    this.genericService.sendPutRequest(environment.carritoCompras, body).subscribe((response1: any) => {

      if (producto.cantidad == 0) {
        this.genericService.sendDelete(`${environment.carritoCompras}/${producto.id}`).subscribe((response2: any) => {

          if (producto.cantidad == 0) {
            this.events.publish("totalCarrito");
            this.deleteFavoritoService(producto);
            //this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
          }
          this.verificarCarritoModificarCantidad(producto);
        }, (error: HttpErrorResponse) => {
          producto.cantidad++;
        });
      } else {
        this.verificarCarritoModificarCantidad(producto);
      }
    }, (error: HttpErrorResponse) => {
      producto.cantidad++;
    });
  }

  deleteFavoritoService(producto) {
    this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
    let nuevoArrarCarrito: any[] = [];
    let productoDelete: any = null;
    this.productosCarrito.forEach(element => {
      if (producto.productoProveedor.producto.id != element.productoProveedor.producto.id) {
        nuevoArrarCarrito.push(element);
      } else {
        productoDelete = element;
        productoDelete.carrito = false;
        producto.carrito = false;
      }
    });
    this.productosCarrito = nuevoArrarCarrito;
    this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}`, this.productosCarrito);

    //Llamar a events
    this.events.publish('updateProductos', { productoDelete });

    if (this.productosCarrito.length <= 0) {
      this.navCtrl.pop();
    }
  }

  verificarCarritoModificarCantidad(element: any) {
    //debugger;
    let productosStorage: any = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
    if (productosStorage) {
      productosStorage.forEach(item => {
        if (item.id == element.id) {
          item.cantidad = element.cantidad;
        }
      });
    }
    console.log(productosStorage);

    this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}`, productosStorage);
    this.getTotales();
    //this.agruparTotales();
    //this.events.publish("carritoTab");
  }

  infoContact() {
    //debugger;
    let modal: any = document.getElementById("myModal2");
    //
    this.enCompra = true;
    let putObj: any = {};
    this.objetoRegistro.forEach(item => {

      let tmp: any[] = [];
      tmp[0] = null;
      tmp[1] = [];
      if (item.required) {
        tmp[1].push(Validators.required);
      }

      if (item.type == "number") {
        tmp[1].push(ValidationService.phoneValidator);
        tmp[1].push(ValidationService.maxLengthValidator);
        tmp[1].push(ValidationService.minLengthValidator);
      }

      if (item.type == "email") {
        tmp[1].push(ValidationService.emailValidator);
      }

      if (item.type == "password") {
        tmp[1].push(ValidationService.passwordValidator);
      }

      if (item.type == "select") {
        tmp[0] = item.opts[0].value;
      }

      if (this.user) {

      }

      putObj[item.formName] = tmp;
    });

    this.formGroup = this.formBuilder.group(
      putObj
    );
    //
    //if (modal) {
    try {
      modal.style.display = "block";
    } catch (error) {

    }
    //}
  }

  closeInfoContact(aun: boolean = true) {
    let modal: any = document.getElementById('myModal2');
    if (modal) {
      modal.style.display = 'none';
    }

    this.objetoRegistro.forEach(item => {
      if (item.name == 'Picking') {
        item.value = false;
      } else {
        item.value = null;
      }
    });
    this.armaObjRegistro();
    this.formGroup = null;
    this.btnHabilitado = true;
    if (aun) {
      this.enCompra = false;
    }
  }

  cerrarModal3(aun: boolean = true) {
    let modal: any = document.getElementById("myModal3");
    modal.style.display = "none";
    if (aun) {
      this.enCompra = false;
    }
  }

  openModal3() {
    let modal: any = document.getElementById("myModal3");
    modal.style.display = "block";
  }

  /**Verifica validaciones */
  ejecutaValidator(opc: boolean = false, evt: any = null) {
    if (opc) {
      console.log(evt);
      if (!evt) {
        this.objetoRegistro.push({
          name: "Dirección",
          required: true,
          length: 200,
          type: "text",
          formName: "direc",
          value: null,
          disabled: true
        });
        this.objetoRegistro.push({
          name: "Código postal",
          required: false,
          length: 6,
          type: "text",
          formName: "cp",
          value: null,
          disabled: false
        });
      } else {
        this.objetoRegistro = [...this.objetoRegistro.slice(0, 4), ...this.objetoRegistro.slice(4 + 1)];
        this.objetoRegistro = [...this.objetoRegistro.slice(0, 4), ...this.objetoRegistro.slice(4 + 1)];
      }
    }
    let validacion: number = 0;
    for (const name in this.formGroup.controls) {

      let n: any = this.formGroup.controls[name];

      if (n.invalid) {
        validacion++;

      }
      /*
      if (n.value && (n.value === 0 || n.value.length === 0) && n.invalid) {
        invalid.push(this.translatePipe.instant(String(name).toUpperCase()));
        fields += `${this.translatePipe.instant(String(name).toUpperCase())}, `;
      } */
    }
    console.log(validacion);

    if (validacion <= 0) {
      this.btnHabilitado = false;
    } else {
      this.btnHabilitado = true;
    }

    if (validacion == 1 && (this.objetoRegistro[3].value == false || this.objetoRegistro[3].value == 'false')) {
      this.btnHabilitado = false;
    }
  }

  getMapa() {
    let modal = this.modalController.create(HomeGeoProveedoresPage,
      { fromModal: true });
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        if (data != null) {
          this.data = data.data;
          if (
            this.objetoRegistro[3].value == 'true' ||
            this.objetoRegistro[3].value == true ||
            this.objetoRegistro[3].value == 'false' ||
            this.objetoRegistro[3].value == false
          ) {
            this.objetoRegistro[4].value = this.data.direccion;
            this.objetoRegistro[5].value = this.data.codigoPostal;
          } else {
            this.objetoRegistro[3].value = this.data.direccion;
            this.objetoRegistro[4].value = this.data.codigoPostal;
          }
          setTimeout(() => {
            this.ejecutaValidator();
          }, 500);
        }
      }
    });
  }

  precompra() {

    this.objetoRegistroCopy = [];
    this.objetoRegistroCopy.push({ value: this.formGroup.controls["name"].value });
    this.objetoRegistroCopy.push({ value: this.formGroup.controls["tel"].value });
    this.objetoRegistroCopy.push({ value: this.formGroup.controls["email"].value });

    let h: any = null;
    console.log(this.totales.listCarritoProveedores);

    if (this.totales.listCarritoProveedores.length > 1) {
      h = true;
    }

    let body: any = {
      nombreContacto: this.objetoRegistroCopy[0].value,
      telefonoContacto: this.objetoRegistroCopy[1].value,
      correoContacto: this.objetoRegistroCopy[2].value,
      direccionContacto: this.objetoRegistro[3].value == 'true' ||
        this.objetoRegistro[3].value == true ||
        this.objetoRegistro[3].value == 'false' ||
        this.objetoRegistro[3].value == false || h ? {
          id: this.data.id ? this.data.id : null,
          codigoPostal: this.data.codigoPostal,
          direccion: this.data.direccion,
          latitud: this.data.latitud,
          longitud: this.data.longitud
        } : null,
      productos: []
    };

    if (
      this.objetoRegistro[3].value == 'true' ||
      this.objetoRegistro[3].value == true ||
      this.objetoRegistro[3].value == 'false' ||
      this.objetoRegistro[3].value == false
    ) {
      body.picking = this.objetoRegistro[3].value;
    } else {
      body.picking = false;
    }

    if (this.objetoRegistro[3].value == false || this.objetoRegistro[3].value == true) {
      body.picking = this.objetoRegistro[3].value;
    } else {
      body.picking = false;
    }

    console.log(this.productosCarrito);

    this.productosCarrito.forEach(item => {
      body.productos.push({
        cantidad: item.cantidad,
        productoProveedorId: item.productoProveedorId
      });
    });

    let service: any = this.genericService.sendPostRequest(environment.pedidos, body);

    this.loadingService.show().then(() => {
      service.subscribe((response: any) => {
        this.pagoActual = response;
        this.loadingService.hide();
        //this.comprar();
        this.closeInfoContact(false);
        setTimeout(() => {
          this.openModal3();
        }, 300);
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        this.alertaService.errorAlertGeneric("Ocurrió un error al procesar tu pago, intenta nuevamente");
      });
    });
  }

  comprar() {
    if (this.check) {
      this.cerrarModal3(false);
      let modal: any = document.getElementById("myModal");
      modal.style.display = "block";
      this.check = false;
    } else {
      this.alertaService.warnAlertGeneric("Por favor, acepta los términos y condiciones");
    }
  }

  confirmar() {
    let alert = this.alertCtrl.create({
      title: "Confirmación",//this.translatePipe.instant("CONFIRM"),
      message: `Se realizará un cargo a su tarjeta por ${this.currencyPipe.transform(this.pagoActual.total)} ¿Estás de acuerdo?`,//this.translatePipe.instant("CONFIRM-LOGOUT"),
      cssClass: this.genericService.getColorClassTWO(),
      buttons: [
        {
          text: "No",//this.translatePipe.instant("CANCEL"),
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Si',
          handler: () => {
            //this.confirmar();
            this.setupStripe();
          }
        }
      ]
    });
    alert.present();
  }

  addToList() {
    let inputs: any = [
      {
        name: 'nombre',
        placeholder: 'Nombre de mi lista',
        type: 'text',
        id: "i-1-name"
      }
    ];

    let buttons: any = [
      {
        text: "Agregar",
        handler: (data: any) => {
          let body: any = {
            nombre: data.nombre
          };
          let service: any = this.genericService.sendPostRequest(environment.carritoHistorico, body);

          this.loadingService.show().then(() => {
            service.subscribe((response: any) => {
              this.alertaService.successAlertGeneric("Lista frecuente agregada con éxito");
              this.loadingService.hide();
              return true;
            }, (error: HttpErrorResponse) => {
              this.loadingService.hide();
              this.alertaService.errorAlertGeneric("No se ha podido agregar tu lista frecuente, intenta nuevamente");
              return true;
            });
          });

        }
      }
    ];
    let data: any = {
      title: "Mi lista frecuente",
      message: `Ingresa el nombre de tu lista frecuente, ésta aparecerá en tu menú de listas de carrito frecuentes`,
      inputs: inputs,
    }

    let alert = this.alertCtrl.create({
      title: data.title,
      cssClass: this.genericService.getColorClass(),
      message: data.message,
      inputs: data.inputs,
      buttons: buttons
    });
    alert.present();
  }

  up() {
    console.log(this.productosCarrito);
    console.log(this.productosCarritoReplica);
    this.productosCarrito = this.productosCarritoReplica;
    this.productosCarrito.sort((mayor, menor) => {
      return mayor.precio - menor.precio;
    });
  }

  down() {
    this.productosCarrito = this.productosCarritoReplica;
    this.productosCarrito.sort((mayor, menor) => {
      return menor.precio - mayor.precio;
    });
  }
}

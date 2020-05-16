import { HomeGeoProveedoresPage } from './../home-geo-proveedores/home-geo-proveedores';
import { LoadingService } from './../../services/loading.service';
import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, ModalController } from 'ionic-angular';
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
export class CarritoComprasPage {


  public user: User = null;

  public productosCarrito: any = [];
  public productosCarritoReplica: any = [];

  public env: any = environment;

  public stripe = Stripe(environment.stripe.keyPublic);
  //public stripe = Stripe('pk_live_4f4ddGQitsEeJ0I1zg84xkRZ00mUNujYXd');
  public card: any;

  public recarga:boolean = false;

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
    {
      name: "Dirección",
      required: true,
      length: 200,
      type: "text",
      formName: "direc",
      value: null,
      disabled: true
    },
    {
      name: "Código postal",
      required: false,
      length: 6,
      type: "text",
      formName: "cp",
      value: null,
      disabled: false
    },
  ];

  public formGroup: FormGroup = null;

  public btnHabilitado: boolean = true;

  public data: any = null;

  public objetoRegistroCopy: any = [];

  public check: boolean = false;
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
    this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
    this.productosCarritoReplica = this.productosCarrito;

    this.recarga = navParams.get("recarga");
    console.log(this.recarga);
    
    this.getCards();
  }

  ionViewDidLoad() {
    if(this.recarga){
      let claseTabs: any = document.getElementsByClassName("tabbar");
      if(claseTabs[0]){
        //claseTabs[0].style.display = "none";
      }
      this.verCarrito();
    }
  }

  verCarrito() {
    if (this.genericService.getTotalCarrito() > 0) {

      //nav.pop();
      this.cargarProductosCarrito();

    }
  }

  cargarProductosCarrito() {
    this.genericService.sendGetRequest(environment.carritoCompras).subscribe((response: any) => {

      this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}`, response);
      this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
      this.productosCarritoReplica = this.productosCarrito;
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
      Stripe.setPublishableKey(environment.stripe.keyPublic);
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
    this.agregarToCarritoBack(bandera, p);
  }

  agregarToCarrito(producto: any) {
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
      }
      this.verificarCarritoModificarCantidad(producto);
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
    let productosStorage: any = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
    if (productosStorage) {
      productosStorage.forEach(item => {
        if (item.id == element.id) {
          item.cantidad = element.cantidad;
        }
      });
    }
    this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}`, productosStorage);
  }

  infoContact() {
    let modal: any = document.getElementById("myModal2");
    //
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
    modal.style.display = "block";
  }

  closeInfoContact() {
    let modal: any = document.getElementById("myModal2");
    modal.style.display = "none";

    this.objetoRegistro.forEach(item => {
      item.value = null;
    });

    this.formGroup = null;
    this.btnHabilitado = true;
  }

  cerrarModal3() {
    let modal: any = document.getElementById("myModal3");
    modal.style.display = "none";
  }

  openModal3() {
    let modal: any = document.getElementById("myModal3");
    modal.style.display = "block";
  }

  /**Verifica validaciones */
  ejecutaValidator() {
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
    if (validacion <= 0) {
      this.btnHabilitado = false;
    } else {
      this.btnHabilitado = true;
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
          this.objetoRegistro[3].value = this.data.direccion;
          this.objetoRegistro[4].value = this.data.codigoPostal;
          setTimeout(() => {
            this.ejecutaValidator();
          }, 1000);
        }
      }
    });
  }

  precompra() {

    this.objetoRegistroCopy = [];
    this.objetoRegistroCopy.push({ value: this.formGroup.controls["name"].value });
    this.objetoRegistroCopy.push({ value: this.formGroup.controls["tel"].value });
    this.objetoRegistroCopy.push({ value: this.formGroup.controls["email"].value });

    let body: any = {
      nombreContacto: this.objetoRegistroCopy[0].value,
      telefonoContacto: this.objetoRegistroCopy[1].value,
      correoContacto: this.objetoRegistroCopy[2].value,
      direccionContacto: {
        id: this.data.id ? this.data.id : null,
        codigoPostal: this.data.codigoPostal,
        direccion: this.data.direccion,
        latitud: this.data.latitud,
        longitud: this.data.longitud
      },
      productos: []
    };


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
        this.closeInfoContact();
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
      this.cerrarModal3();
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

  up(){
    this.productosCarrito = this.productosCarritoReplica;
    this.productosCarrito.carritoHistoricoDetalles.sort((mayor,menor)=>{
        return mayor.precio - menor.precio;
      });
  }

  down(){
    this.productosCarrito = this.productosCarritoReplica;
    this.productosCarrito.carritoHistoricoDetalles.sort((mayor,menor)=>{
        return menor.precio - mayor.precio;
      });
  }
}

import { LoadingService } from './../../services/loading.service';
import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { User } from '../../models/User';
import { ProductoService } from '../../services/producto.service';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';
import { DetalleProductoPage } from '../detalle-producto/detalle-producto';
declare var Stripe;

@Component({
  selector: 'page-carrito-compras',
  templateUrl: 'carrito-compras.html',
})
export class CarritoComprasPage {


  public user: User = null;

  public productosCarrito: any = [];

  public env: any = environment;

  public stripe = Stripe('pk_test_TNjRZggfGMHinhrlBVIP1P1B00d8WURtiI');
  //public stripe = Stripe('pk_live_4f4ddGQitsEeJ0I1zg84xkRZ00mUNujYXd');
  public card: any;

  public cards: any = null;

  public dataCard: any = {
    tarj: "",
    cvc: "",
    dtime: ""
  };

  public pagoActual: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localStorageEncryptService: LocalStorageEncryptService,
    private events: Events,
    //private productoService: ProductoService,
    private genericService: GenericService,
    private alertCtrl: AlertController,
    private alertaService: AlertaService,
    private loadingService: LoadingService) {
    this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
    this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
    console.log(this.productosCarrito);
    this.getCards();
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
      console.log(response);
      //quitar
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

  ionViewDidLoad() {
    //this.cargarProductosCarrito();
    //this.setupStripe();
  }

  setupStripe() {

    console.log(this.cards);

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
      console.log(this.cards[position]);
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
    //this.stripe.createSource(this.card);
    //console.log(a);
    if (!bandera) {
      Stripe.setPublishableKey('pk_test_TNjRZggfGMHinhrlBVIP1P1B00d8WURtiI');
      this.loadingService.show().then(() => {
        let clase: any = this;
        Stripe.card.createToken(c, (status, response) => {

          if (response.error) { // Problem!
            clase.loadingService.hide();
            clase.alertaService.errorAlertGeneric("Lo sentimos! No es posible efectuar el cobro, verifica que la información de tu tarjeta es correcta");
          } else { // Token was created!

            // Get the token ID:
            //clase.loadingService.hide();
            var token = response.id;
            console.log(token);
            console.log(response);
            let body: any = {
              pedidoId: clase.pagoActual.id,
              token: token
            };
            let service: any = clase.genericService.sendPutRequest(`${environment.pedidos}/pago`, body);

            service.subscribe((response: any) => {
              clase.loadingService.hide();
              console.log(response);
              clase.alertaService.successAlertGeneric("El pago se ha efectuado con éxito");
              clase.cerrar();
            }, (error: HttpErrorResponse) => {
              console.log(error);

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
        console.log(response);

        //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
        //let nav = this.app.getRootNav();
        //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
        if (this.user) {
          let carritos = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
          console.log(carritos);

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
        this.navCtrl.push(DetalleProductoPage, { producto: response });
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

    console.log(body);

    this.genericService.sendPutRequest(environment.carritoCompras, body).subscribe((response1: any) => {
      console.log(response1);

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
    console.log(producto);
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

    console.log(producto);
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

  precompra() {
    let body: any = {
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
        console.log(response);
        this.pagoActual = response;
        this.loadingService.hide();
        this.comprar();
      }, (error: HttpErrorResponse) => {
        console.log(error);

        this.loadingService.hide();
        this.alertaService.errorAlertGeneric("Ocurrió un error al procesar tu pago, intenta nuevamente");
      });
    });
  }

  comprar() {
    let modal: any = document.getElementById("myModal");
    modal.style.display = "block";
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
          console.log(data.nombre);
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

}

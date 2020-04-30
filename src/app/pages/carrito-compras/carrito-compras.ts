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

@Component({
  selector: 'page-carrito-compras',
  templateUrl: 'carrito-compras.html',
})
export class CarritoComprasPage {


  public user: User = null;

  public productosCarrito: any = [];

  public env: any = environment;
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

  }

  ionViewDidLoad() {
    //this.cargarProductosCarrito();
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
      if(producto.cantidad == 1){
        producto.cantidad = 1;
      }else{
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

          if(carritos){
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

  comprar() {

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
          let body:any = {
            nombre : data.nombre
          };
          let service: any = this.genericService.sendPostRequest(environment.carritoHistorico, body);

          this.loadingService.show().then(()=>{
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

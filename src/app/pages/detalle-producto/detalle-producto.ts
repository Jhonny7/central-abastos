import { AlertaService } from './../../services/alerta.service';
import { LoadingService } from './../../services/loading.service';
import { User } from './../../models/User';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { GenericService } from './../../services/generic.service';
import { environment } from './../../../environments/environment.prod';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Events } from 'ionic-angular';
import PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-detalle-producto',
  templateUrl: 'detalle-producto.html',
})
export class DetalleProductoPage {

  public producto: any = null;

  public productosTemp: any = [];
  public gallery: any;

  public verDescripcion: boolean = true;

  @ViewChild('slides2')
  slider2: Slides;

  public user: User = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private auth: AuthService,
    private events: Events,
    private loadingService: LoadingService,
    private alertaService: AlertaService) {
    this.producto = navParams.get("producto");
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");

    this.producto.photos = [];
    if (this.producto.imagenes) {
      this.producto.imagenes.forEach(element => {
        this.producto.photos.push({
          id: element.id,
          img: `data:image/jpeg;base64,${element.file}`
        });
      });
    }

    if (!this.producto.cantidad) {
      this.producto.cantidad = 1;
      this.producto.first = true;
    }
    console.log(this.producto);
    
    this.events.subscribe("actualizarCantidad", data => {
      try {
        this.actualizarCantidad();
      } catch (error) {
      }
    });
  }

  actualizarCantidad() {
    let carritos = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
    console.log(carritos);

    let position: any = carritos.findIndex(
      (carrito) => {
        return carrito.id == this.producto.id;
      }
    );

    if (position >= 0) {
      this.producto.cantidad = carritos[position].cantidad;
    }
  }

  /**Métodos de navegacion del slide */
  next1() {
    console.log("next");

    this.slider2.slideNext();
  }

  prev1() {
    this.slider2.slidePrev();
  }

  ionViewDidLoad() {
    this.producto.photos.forEach(phot => {
      let img: any = new Image();
      img.src = phot.img;
      img.onload = () => {
        this.productosTemp.push({ img: phot.img, w: img.width, h: img.height, i: phot.id });
        console.log(this.productosTemp);

      }
    });
  }

  regresar() {
    let id: any = document.getElementById("icn-p");
    id.style.display = "none";
    this.navCtrl.pop();
  }

  imagesLoaded(i: number): void {
    console.log(i);
    let pswpElement: any = document.querySelectorAll('.pswp')[0];
    console.log(this.productosTemp);

    this.productosTemp.sort((a, b) => (a.i > b.i) ? 1 : -1)
    console.log(this.productosTemp);

    // build items array
    let items: any[] = [];

    this.productosTemp.forEach(photo => {
      //console.log(photo);

      items.push({ src: photo.img, w: photo.w, h: photo.h });

    });

    console.log(items);


    // define options (if needed)
    let options = {
      // optionName: 'option value'
      // for example:
      index: i // start at first slide
    };

    // Initializes and opens PhotoSwipe
    this.gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    this.gallery.init();
  }

  verDes() {
    this.verDescripcion = !this.verDescripcion;
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
    //this.agregarToCarritoBack(bandera, p);
  }

  agregarToCarritoBack(bandera: boolean, producto: any) {
    let body: any = {
      precio: producto.precio,
      productoId: producto.id
    }
    let service: any = this.genericService.sendPostRequest(environment.carritoCompras, body);

    if (producto.cantidad > 1) {
      body.cantidad = producto.cantidad;
      service = this.genericService.sendPutRequest(environment.carritoCompras, body);
    }

    service.subscribe((response: any) => {
      if (bandera) {
        //this.agregarToCarrito(producto);
      }
      //this.verificarCarritoModificarCantidad(producto);
    }, (error: HttpErrorResponse) => {
      producto.cantidad--;
    });
  }

  decrementar(p: any) {
    if (p.cantidad > 1) {
      p.cantidad--;
      this.borrarToCarritoBack(p);
    }
  }

  borrarToCarritoBack(producto: any) {
    let body: any = {
      precio: producto.precio,
      productoId: producto.id
    }
    body.cantidad = producto.cantidad;
    this.genericService.sendPutRequest(environment.carritoCompras, body).subscribe((response1: any) => {
      console.log(response1);
      if (producto.cantidad == 0) {
        this.genericService.sendDeleteRequest(`${environment.carritoCompras}/${producto.id}`).subscribe((response2: any) => {
          if (producto.cantidad == 0) {
            this.producto = 1;
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


  agregarCarrito(producto: any) {
    this.loadingService.show().then(() => {
      this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");

      if (this.user) {
        let carritos = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
        let body: any = {
          precio: producto.precio,
          productoId: producto.id
        }
        let b: boolean = false;
        let position: any;
        if (!carritos) {
          position = -1;
        } else {
          position = carritos.findIndex(
            (carrito) => {
              return carrito.id == producto.id;
            }
          );
        }
        body.cantidad = producto.cantidad;
        if (position >= 0) {
          this.updateCarrito(producto, body);
        } else {
          
          this.genericService.sendPostRequest(environment.carritoCompras, body).subscribe((response: any) => {
            body.cantidad = producto.cantidad;
            this.alertaService.successAlertGeneric("Tu articulo se agrego al carrito con éxito");
            this.updateCarrito(producto, body);
            //this.verificarCarritoModificarCantidad(producto);
          }, (error: HttpErrorResponse) => {
            producto.cantidad--;
            this.loadingService.hide();
          });
        }
      } else {
        this.auth.events.publish("startSession");
      }
    });
  }

  updateCarrito(producto: any, body: any) {
    this.genericService.sendPutRequest(environment.carritoCompras, body).subscribe((response: any) => {
      this.loadingService.hide();
      this.verificarCarritoModificarCantidad(producto);
    }, (error: HttpErrorResponse) => {
      this.loadingService.hide();
      producto.cantidad--;
    });
  }

  verificarCarritoModificarCantidad(element: any) {
    let productosStorage: any = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
    if (!productosStorage) {
      productosStorage = [];
      productosStorage.push(element);
    } else {
      let position: any = productosStorage.findIndex(
        (carrito) => {
          return carrito.id == element.id;
        }
      );

      if (position >= 0) {
        productosStorage[position].cantidad = element.cantidad;
      } else {
        productosStorage.push(element);
      }
    }
    this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}`, productosStorage);
    this.events.publish("totalCarrito");
  }
}

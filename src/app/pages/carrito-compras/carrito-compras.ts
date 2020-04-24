import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { User } from '../../models/User';
import { ProductoService } from '../../services/producto.service';
import { environment } from '../../../environments/environment.prod';

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
    private productoService: ProductoService) {
    this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
    this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
  }

  ionViewDidLoad() {

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
    if (p.cantidad) {
      p.cantidad++;
    } 
    this.events.publish('updateProductos', { productoDelete:p });
    this.verificarCarritoModificarCantidad(p);
  }

  decrementar(p: any) {
    p.cantidad--;
    if (p.cantidad == 0) {
      this.verificarCarritoModificarCantidad(p);
      this.deleteFavorito(p);
    }else{
      this.verificarCarritoModificarCantidad(p);
    }
    this.events.publish('updateProductos', { productoDelete:p });
  }

  verificarCarritoModificarCantidad(element:any) {
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

  comprar(){

  }

}

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

  comprar(){
    
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-lista-carrito-compras',
  templateUrl: 'lista-carrito-compras.html',
})
export class ListaCarritoComprasPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaCarritoComprasPage');
  }

}

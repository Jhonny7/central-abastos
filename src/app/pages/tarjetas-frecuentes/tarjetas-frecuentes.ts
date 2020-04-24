import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tarjetas-frecuentes',
  templateUrl: 'tarjetas-frecuentes.html',
})
export class TarjetasFrecuentesPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TarjetasFrecuentesPage');
  }

}

import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private genericService: GenericService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AyudaPage');
  }

}

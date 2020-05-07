import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-terminos-condiciones',
  templateUrl: 'terminos-condiciones.html',
})
export class TerminosCondicionesPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private genericService: GenericService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TerminosCondicionesPage');
  }

}

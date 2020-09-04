import { TerminosCondicionesPage } from './../terminos-condiciones/terminos-condiciones';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private genericService: GenericService) {
  }

  ionViewDidLoad() {
  }

  irTerminos(){
    this.navCtrl.push(TerminosCondicionesPage);
  }
}

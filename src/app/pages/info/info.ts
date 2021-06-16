import { TerminosCondicionesPage } from './../terminos-condiciones/terminos-condiciones';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage implements OnDestroy{

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private genericService: GenericService) {
  }

  ionViewDidLoad() {
    let tabbar:any = document.getElementsByClassName("tabbar");
    tabbar[0].style.display = "none";
  }

  ngOnDestroy() {
    let tabbar:any = document.getElementsByClassName("tabbar");
    tabbar[0].style.display = "flex";
  }

  irTerminos(){
    this.navCtrl.push(TerminosCondicionesPage);
  }
}

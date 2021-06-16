import { GenericService } from './../../services/generic.service';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage implements OnDestroy{

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

}

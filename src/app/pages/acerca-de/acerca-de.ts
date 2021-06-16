import { GenericService } from './../../services/generic.service';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'page-acerca-de',
  templateUrl: 'acerca-de.html',
})
export class AcercaDePage implements OnDestroy{

  public version:any = "1.0.0";
  public anio:any = "2020";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private appVersion: AppVersion) {
  }

  ionViewDidLoad() {
    let tabbar:any = document.getElementsByClassName("tabbar");
    tabbar[0].style.display = "none";
    this.appVersion.getAppName();
    this.appVersion.getPackageName();
    this.appVersion.getVersionCode();
    this.appVersion.getVersionNumber().then((res)=>{
      this.version = res;
    });

    this.anio = new Date().getFullYear();
  }

  ngOnDestroy() {
    let tabbar:any = document.getElementsByClassName("tabbar");
    tabbar[0].style.display = "flex";
  }

}

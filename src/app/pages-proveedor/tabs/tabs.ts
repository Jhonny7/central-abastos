import { App } from 'ionic-angular';
import { HomeProveedorPage } from './../home-proveedor/home-proveedor';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsProveedorPage {

  tab1Root = HomeProveedorPage;

  public user:any = null;
  constructor(
    private genericService:GenericService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private app: App) {
    this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);

    

  }

  
  ionViewDidLoad(){
    
  }
}

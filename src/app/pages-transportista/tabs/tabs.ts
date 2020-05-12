import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { HomeProveedorPage } from '../../pages-proveedor/home-proveedor/home-proveedor';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsTransportistaPage {

  tab1Root = HomeProveedorPage;

  public user:any = null;
  constructor(
    private genericService:GenericService,
    private localStorageEncryptService: LocalStorageEncryptService) {
    this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
  }
}

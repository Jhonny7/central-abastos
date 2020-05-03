import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { ChatPage } from './../chat/chat';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { TarjetasFrecuentesPage } from '../tarjetas-frecuentes/tarjetas-frecuentes';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TarjetasFrecuentesPage;
  tab3Root = ChatPage;

  public user:any = null;
  constructor(
    private genericService:GenericService,
    private localStorageEncryptService: LocalStorageEncryptService) {
    this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
  }
}

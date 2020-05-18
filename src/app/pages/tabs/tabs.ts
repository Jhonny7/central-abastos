import { CarritoComprasPage } from './../carrito-compras/carrito-compras';
import { ProveedorPage } from './../recuperar-password/recuperar-password';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { ChatPage } from './../chat/chat';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { TarjetasFrecuentesPage } from '../tarjetas-frecuentes/tarjetas-frecuentes';
import { HistorialPedidosPage } from '../historial-pedidos/historial-pedidos';
import { Nav, App, Events } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HistorialPedidosPage;
  tab3Root = ProveedorPage;
  tab4Root = CarritoComprasPage;

  public user: any = null;
  constructor(
    private genericService: GenericService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private app: App,
    private events: Events) {
    this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
      
    

  }

  ionViewDidLoad(){
    let tabbar:any = document.getElementsByClassName("tabbar");
    console.log(tabbar);
    let hijito:any = null;
    tabbar[0].childNodes.forEach(element => {
      if(element.innerText == "Mi carrito"){
        hijito = element;
      }
    });
    console.log(hijito);
    let component:any = this;
    hijito.addEventListener("click", (e: Event) => {
      console.log(hijito);
      
      component.actualizaCarrito();
    });
  }

  actualizaCarrito(){
    console.log("---->");
    //this.events.publish("carritoTab");
  }
}

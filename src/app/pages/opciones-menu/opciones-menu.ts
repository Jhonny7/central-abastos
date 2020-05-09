import { CambioContraseniaPage } from '../cambio-contrasenia/cambio-contrasenia';
import { GenericService } from './../../services/generic.service';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ViewController, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ListaCarritoComprasPage } from '../lista-carrito-compras/lista-carrito-compras';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'page-opciones-menu',
  templateUrl: 'opciones-menu.html',
})
export class OpcionesMenuPage {

  public user: any = null;

  public env:any = environment;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localStorageEncryptService: LocalStorageEncryptService,
    private alertCtrl: AlertController,
    private app: App,
    private viewCtrl: ViewController,
    private events: Events,
    private genericService: GenericService) {

    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");

    this.events.subscribe("reloadUser", data => {
      try {
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
      } catch (error) {
      }
    });
  }

  ionViewDidLoad() {
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: "Confirmación",//this.translatePipe.instant("CONFIRM"),
      message: "¿Estás segur@ de cerrar sesión?",//this.translatePipe.instant("CONFIRM-LOGOUT"),
      cssClass: this.genericService.getColorClassTWO(),
      buttons: [
        {
          text: "Cancelar",//this.translatePipe.instant("CANCEL"),
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.confirmar();
          }
        }
      ]
    });
    alert.present();
  }

  confirmar() {
    try {
      this.localStorageEncryptService.clearProperty("userSession");
        this.viewCtrl.dismiss();
      
      let nav:any = this.app.getRootNav();
      nav.setRoot(LoginPage);
    } catch (error) {

    }
  }

  openListCarrito() {
    let nav: any = this.app.getRootNav();
    this.viewCtrl.dismiss();
    nav.push(ListaCarritoComprasPage);
  }

  change(opt) {
    switch (opt) {
      case 1:
        this.localStorageEncryptService.setToLocalStorage("theme", "#3b64c0");
        break;
      case 2:
        this.localStorageEncryptService.setToLocalStorage("theme", "#be3b3b");
        break;
      case 3:
        this.localStorageEncryptService.setToLocalStorage("theme", "#3bb8be");
        break;
      case 4:
        this.localStorageEncryptService.setToLocalStorage("theme", "#74be3b");
        break;
        case 5:
        this.localStorageEncryptService.setToLocalStorage("theme", "#292929");
        break;
        case 6:
        this.localStorageEncryptService.setToLocalStorage("theme", "#F07C1B");
        break;
      default:
        this.localStorageEncryptService.setToLocalStorage("theme", "#3b64c0");
        break;
    }
    this.events.publish("changeColor");
  }

  login() {
    this.viewCtrl.dismiss();
    this.app.getRootNav().push(LoginPage);
  }

  cambiarContra() {
    this.navCtrl.push(CambioContraseniaPage);
  }
}

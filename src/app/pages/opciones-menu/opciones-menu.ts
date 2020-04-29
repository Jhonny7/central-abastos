import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ViewController, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ListaCarritoComprasPage } from '../lista-carrito-compras/lista-carrito-compras';

@Component({
  selector: 'page-opciones-menu',
  templateUrl: 'opciones-menu.html',
})
export class OpcionesMenuPage {

  public user: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localStorageEncryptService: LocalStorageEncryptService,
    private alertCtrl: AlertController,
    private app: App,
    private viewCtrl: ViewController,
    private events: Events) {

    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");

    this.events.subscribe("reloadUser", data => {
      try {
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
      } catch (error) {
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpcionesMenuPage');
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: "Confirmación",//this.translatePipe.instant("CONFIRM"),
      message: "¿Estás segur@ de cerrar sesión?",//this.translatePipe.instant("CONFIRM-LOGOUT"),
      cssClass: "alerta-two-button",
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
      this.navCtrl.setRoot(LoginPage);
    } catch (error) {
      console.log(error);

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
      default:
        this.localStorageEncryptService.setToLocalStorage("theme", "#3b64c0");
        break;
    }
    this.events.publish("changeColor");
  }
}

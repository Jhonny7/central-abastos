import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ListaCarritoComprasPage } from '../lista-carrito-compras/lista-carrito-compras';

@Component({
  selector: 'page-opciones-menu',
  templateUrl: 'opciones-menu.html',
})
export class OpcionesMenuPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private localStorageEncryptService: LocalStorageEncryptService,
    private alertCtrl: AlertController,
    private app: App,
    private viewCtrl: ViewController) {
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

  openListCarrito(){
    let nav:any = this.app.getRootNav();
    this.viewCtrl.dismiss();
    nav.push(ListaCarritoComprasPage);
  }
}

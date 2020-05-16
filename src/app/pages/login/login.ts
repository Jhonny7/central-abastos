import { PushNotificationService } from './../../services/pushNotifications.service';
import { HomeProveedorPage } from './../../pages-proveedor/home-proveedor/home-proveedor';
import { AlertaService } from './../../services/alerta.service';
import { LoadingService } from './../../services/loading.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events, Platform } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { HomePage } from '../home/home';
import { GenericService } from '../../services/generic.service';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { TabsPage } from '../tabs/tabs';
import { RecuperaContraseniaPage } from '../recupera-contrasenia/recupera-contrasenia';
import { TabsProveedorPage } from '../../pages-proveedor/tabs/tabs';
import { FCM } from '@ionic-native/fcm';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public configuraciones: any = {
    visible: false
  }

  public dataLogin: any = {
    user: null,
    password: null
  };

  public color: any = "#3b64c0";

  public env: any = environment;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingService: LoadingService,
    private alertaService: AlertaService,
    private genericService: GenericService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private app: App,
    private events: Events,
    private fcm: FCM,
    private platform:Platform,
    private pushNotificationService: PushNotificationService) {
    this.loadingService.hide();
    //comentario
    if (this.localStorageEncryptService.getFromLocalStorage("theme")) {
      this.color = this.localStorageEncryptService.getFromLocalStorage("theme");
    }
    this.events.subscribe("changeColor", data => {
      try {
        if (this.localStorageEncryptService.getFromLocalStorage("theme")) {
          this.color = this.localStorageEncryptService.getFromLocalStorage("theme");
        }
      } catch (error) {
      }
    });
  }

  ionViewDidLoad() {

    //this.loadingService.show();
  }

  regresar() {

    try {
      this.navCtrl.pop();
    } catch (error) {
      let nav:any = this.app.getRootNav();
      nav.setRoot(LoginPage);
    }
  }

  login() {
    this.loadingService.show().then(() => {
      let body: any = {
        username: this.dataLogin.user,
        password: this.dataLogin.password
      };
      this.genericService.sendPostRequest(environment.login, body).subscribe((response: any) => {

        //quitar
        this.loadingService.hide();
        if (response.tipo_usuario == 3 && environment.perfil.activo == 2 ||
          response.tipo_usuario == 2 && environment.perfil.activo == 1 ||
          response.tipo_usuario == 4 && environment.perfil.activo == 3) {
          this.localStorageEncryptService.setToLocalStorage("userSession", response);

          //let nav:any = this.app.getRootNav();
          //nav.push(TabsPage);
          this.events.publish("actualizarCantidad", { fromLogin: true });
          this.events.publish("actualizarTarjetas", { fromLogin: true });
          this.events.publish("totalCarrito", { fromLogin: true });

          this.events.publish("reloadUser", { fromLogin: true });

          switch (environment.perfil.activo) {
            case 1:
              this.navCtrl.setRoot(TabsPage);
              break;
            case 2:
              this.navCtrl.setRoot(TabsProveedorPage);
              break;
            case 3:
              this.navCtrl.setRoot(TabsProveedorPage);
              break;
            default:
              break;
          }

            this.fcm.getToken().then(token => {
              console.log("*********************");
              console.log(token);
              //localStorage.setItem("token", token);
              let body: any = {
                login: response.username,
                token: token
              };
              this.genericService.sendPutRequest(environment.usuarios, body).subscribe((response: any) => {
                this.localStorageEncryptService.setToLocalStorage("phoneToken", token);
                this.readNotify();
              }, (error: HttpErrorResponse) => {

              });
              console.log("*********************");
            });

          
        } else {
          this.alertaService.warnAlertGeneric("No has dado de alta tu usuario, por favor, registrate");
        }
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        let err: any = error.error;
        this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
      });
    });
  }

  readNotify() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.fcm.onNotification().subscribe(data => {
        this.pushNotificationService.evaluateNotification(data);
      });
    } else {

    }
  }

  visible() {
    this.configuraciones.visible = !this.configuraciones.visible;
  }

  goToRegister() {
    this.navCtrl.push(RegistroPage);
  }

  olvideContrasenia() {
    this.navCtrl.push(RecuperaContraseniaPage);
  }

}

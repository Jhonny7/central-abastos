import { HomeProveedorPage } from './../../pages-proveedor/home-proveedor/home-proveedor';
import { AlertaService } from './../../services/alerta.service';
import { LoadingService } from './../../services/loading.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { HomePage } from '../home/home';
import { GenericService } from '../../services/generic.service';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { TabsPage } from '../tabs/tabs';
import { RecuperaContraseniaPage } from '../recupera-contrasenia/recupera-contrasenia';
import { TabsProveedorPage } from '../../pages-proveedor/tabs/tabs';

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
    private events: Events) {
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

    this.navCtrl.pop();
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
          response.tipo_usuario == 2 && environment.perfil.activo == 1) {
          this.localStorageEncryptService.setToLocalStorage("userSession", response);

          //let nav:any = this.app.getRootNav();
          //nav.push(TabsPage);
          this.events.publish("actualizarCantidad", {});
          this.events.publish("actualizarTarjetas", {});
          this.events.publish("totalCarrito");

          this.events.publish("reloadUser");
          switch (environment.perfil.activo) {
            case 1:
              this.navCtrl.pop();
              break;
            case 2:
              this.navCtrl.setRoot(TabsProveedorPage);
              break;
            default:
              break;
          }
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

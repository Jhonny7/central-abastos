import { TarjetasFrecuentesPage } from './pages/tarjetas-frecuentes/tarjetas-frecuentes';
import { AyudaPage } from './pages/ayuda/ayuda';
import { AcercaDePage } from './pages/acerca-de/acerca-de';
import { PerfilPage } from './pages/perfil/perfil';
import { HistorialPedidosPage } from './pages/historial-pedidos/historial-pedidos';
import { GenericService } from './services/generic.service';
import { HomeGeoProveedoresPage } from './pages/home-geo-proveedores/home-geo-proveedores';
import { ListaCarritoComprasPage } from './pages/lista-carrito-compras/lista-carrito-compras';
import { AlertaService } from './services/alerta.service';
import { Component } from '@angular/core';
import { Platform, Events, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from './pages/tabs/tabs';
import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from './pages/login/login';
import { HomePage } from './pages/home/home';
import { LocalStorageEncryptService } from './services/local-storage-encrypt.service';
import { Menu } from './models/Menu';
import { User } from './models/User';
import { DireccionesPage } from './pages/direcciones/direcciones';
import { InfoPage } from './pages/info/info';
import { TerminosCondicionesPage } from './pages/terminos-condiciones/terminos-condiciones';
import { environment } from '../environments/environment.prod';
import { TabsProveedorPage } from './pages-proveedor/tabs/tabs';
import { ProveedorPage } from './pages/recuperar-password/recuperar-password';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = null;
  pages: Menu[] = [];

  public user: User = null;

  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private translateService: TranslateService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private events: Events,
    private app: App,
    private alertaService: AlertaService,
    private alertCtrl: AlertController,
    private genericService: GenericService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initializeLanguage();

      let firstTime = this.localStorageEncryptService.getFromLocalStorage("firstTime");
      if(!firstTime){
        this.localStorageEncryptService.setToLocalStorage("theme", "#F07C1B");
        this.localStorageEncryptService.setToLocalStorage("firstTime",1);
      }
      /**Armar menu */
      switch (environment.perfil.activo) {
        case 1:
          this.pages.push(new Menu("Mi perfil", "assets/imgs/perfil/social-media.png", "#7d3a63", PerfilPage));
          this.pages.push(new Menu("Tarjetas", "assets/imgs/menu/card.png", "#7d3a63", TarjetasFrecuentesPage));
          this.pages.push(new Menu("Lista de carrito frecuentes", "assets/imgs/lista-carrito/trolley.png", "#7d3a63", ListaCarritoComprasPage));
          this.pages.push(new Menu("Direcciones frecuentes", "assets/imgs/direcciones/markerD.png", "#7d3a63", DireccionesPage));
          //this.pages.push(new Menu("Mi historial", "assets/imgs/menu/historial.png", "#7d3a63", HistorialPedidosPage));
          this.pages.push(new Menu("Proveedores", "assets/imgs/menu/arrows.png", "#7d3a63", ProveedorPage));

          this.pages.push(new Menu("Acerca de", "assets/imgs/menu/interface.png", "#7d3a63", AcercaDePage));
          this.pages.push(new Menu("Información de la app", "assets/imgs/menu/signs.png", "#7d3a63", InfoPage));
          this.pages.push(new Menu("Contacto", "assets/imgs/menu/logotype.png", "#7d3a63", AyudaPage));
          this.pages.push(new Menu("Términos y condiciones", "assets/imgs/menu/contrato.png", "#7d3a63", TerminosCondicionesPage));
          break;

        case 2:
          this.pages.push(new Menu("Acerca de", "assets/imgs/menu/interface.png", "#7d3a63", AcercaDePage));
          this.pages.push(new Menu("Información de la app", "assets/imgs/menu/signs.png", "#7d3a63", InfoPage));
          this.pages.push(new Menu("Contacto", "assets/imgs/menu/logotype.png", "#7d3a63", AyudaPage));
          this.pages.push(new Menu("Términos y condiciones", "assets/imgs/menu/contrato.png", "#7d3a63", TerminosCondicionesPage));
          break;
      }
      /** */

      this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");

      switch (environment.perfil.activo) {
        case 1:
          if (this.user) {
            this.rootPage = TabsPage;
          } else {
            this.rootPage = TabsPage;
          }
          break;

        case 2:
          if (this.user) {
            this.rootPage = TabsProveedorPage;
          } else {
            this.rootPage = LoginPage;
          }
          break;
      }


    });

    this.events.subscribe("reloadUser", data => {
      try {
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
      } catch (error) {
      }
    });

    this.events.subscribe("cierre", data => {
      try {
        this.alertaService.errorAlertGeneric("Su sesión expiró");
        this.cierreSesion();
      } catch (error) {
      }
    });

    this.events.subscribe("startSession", data => {
      try {
        this.openSesion();
      } catch (error) {
      }
    });

  }

  openPage(pagina) {
    this.app.getActiveNav().push(pagina.component);
  }

  cierreSesion() {
    try {
      this.app.getActiveNav().popToRoot();
    } catch (error) {

    }
    this.localStorageEncryptService.clearProperty("userSession");
    //this.app.getRootNav().push(ProvisionalComponent);
    this.app.getRootNav().push(LoginPage);
  }

  openSesion() {
    let alert = this.alertCtrl.create({
      title: 'Confirmación',
      message: 'Para proceder es necesario que inicies sesión',
      cssClass: this.genericService.getColorClassTWO(),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.app.getRootNav().push(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

  exitApp() {
    const confirm = this.alertCtrl.create({
      title: "Confirmación",
      message: "¿Estás seguro de querer salir?",
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.salir();
          }
        }
      ]
    });
    confirm.present();
  }

  salir() {
    this.platform.exitApp();
  }

  initializeLanguage() {

    let l: any = localStorage.getItem("language");

    let language: any = l;

    if (language) {
      this.translateService.setDefaultLang(language);
      this.translateService.use(language);
    } else {
      localStorage.setItem("language", "es");
      this.translateService.setDefaultLang('es');
      this.translateService.use('es');
    }
  }
}

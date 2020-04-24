import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from './pages/tabs/tabs';
import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from './pages/login/login';
import { HomePage } from './pages/home/home';
import { LocalStorageEncryptService } from './services/local-storage-encrypt.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private translateService: TranslateService,
    private localStorageEncryptService: LocalStorageEncryptService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initializeLanguage();

      let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
      if(user){
        this.rootPage = TabsPage;
      }else{
        this.rootPage = LoginPage;
      }
    });
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

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AboutPage } from './pages/about/about';
import { ContactPage } from './pages/contact/contact';
import { HomePage } from './pages/home/home';
import { TabsPage } from './pages/tabs/tabs';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProvidersModule } from './providers.module';
import { LoginPage } from './pages/login/login';
import { RegistroPage } from './pages/registro/registro';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RecuperarPasswordPage } from './pages/recuperar-password/recuperar-password';
import { FiltroProductoPage } from './pages/filtro-producto/filtro-producto';
import { DetalleProductoPage } from './pages/detalle-producto/detalle-producto';
import { CarritoComprasPage } from './pages/carrito-compras/carrito-compras';
import { AltaDireccionesPage } from './pages/alta-direcciones/alta-direcciones';
import { ScrollHideDirective } from './directives/scroll-hide.directive';
import { ListaCarritoComprasPage } from './pages/lista-carrito-compras/lista-carrito-compras';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistroPage,
    ControlMessagesComponent,
    GalleryComponent,
    RecuperarPasswordPage,
    FiltroProductoPage,
    DetalleProductoPage,
    CarritoComprasPage,
    AltaDireccionesPage,
    ScrollHideDirective,
    ListaCarritoComprasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ProvidersModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistroPage,
    ControlMessagesComponent,
    GalleryComponent,
    RecuperarPasswordPage,
    FiltroProductoPage,
    DetalleProductoPage,
    CarritoComprasPage,
    AltaDireccionesPage,
    ListaCarritoComprasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

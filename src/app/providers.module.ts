import { NgModule, ErrorHandler } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicErrorHandler } from 'ionic-angular';
import { AlertaService } from './services/alerta.service';
import { LoadingService } from './services/loading.service';
import { ValidationService } from './services/validation.service';
import { LocalStorageEncryptService } from './services/local-storage-encrypt.service';
import { GenericService } from './services/generic.service';
import { Camera } from '@ionic-native/camera';
import { ActionSheet } from '@ionic-native/action-sheet';
import { RequestInterceptorService } from './interceptors/request-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ProductoService } from './services/producto.service';
import { StringUtilsService } from './services/string-utils.service';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { FCM } from '@ionic-native/fcm';
import { Stripe } from '@ionic-native/stripe';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@NgModule({
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AlertaService,
        LoadingService,
        ValidationService,
        LocalStorageEncryptService,
        GenericService,
        Camera,
        ActionSheet,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptorService,
            multi: true
        },
        AuthService,
        ProductoService,
        StringUtilsService,
        GoogleMaps,
        Geolocation,
        FCM,
        Stripe,
        OpenNativeSettings,
        Diagnostic,
        AndroidPermissions,
    ]
})
export class ProvidersModule { }
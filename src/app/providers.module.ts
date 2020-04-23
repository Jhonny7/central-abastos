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
        ProductoService
    ]
})
export class ProvidersModule { }
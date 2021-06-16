import { LoadingService } from './loading.service';
import { GenericService } from './generic.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App, Events } from 'ionic-angular';
import { LocalStorageEncryptService } from './local-storage-encrypt.service';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment.prod';
import { LoginPage } from '../pages/login/login';
/**Clase provider que conecta con servicios de autenticación */
@Injectable()
export class AuthService {

    constructor(
        private http: GenericService,
        public app: App,
        public events: Events,
        private localStorageEncryptService: LocalStorageEncryptService,
        private loadingService: LoadingService) { }

    /**Método que retorna si el usuario esta logueado */
    isAuthenticated() {
        let user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
        return user.email != null;
    }

    /**Método de logout, cierra sesión */
    logout() {
        this.app.getRootNav().push(LoginPage);
    }

    getToken(){
        let user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
        
        return user === null ? null : user.email;
    }

    /**Return gatway auth key */
    getGatewayToken() {
        const gatewayInfo = this.localStorageEncryptService.getFromLocalStorage('gateway_token');
        if (gatewayInfo !== null) {
            const gi = gatewayInfo;
            return gi.access_token;
        } else {
            return null;
        }
    }

    /**Return session key */
    getSessionToken() {
        let user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
        return user.email;
    }
}
webpackJsonp([3],{

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**Clase provider que conecta con servicios de autenticación */
var AuthService = /** @class */ (function () {
    function AuthService(http, app, events, localStorageEncryptService, loadingService) {
        this.http = http;
        this.app = app;
        this.events = events;
        this.localStorageEncryptService = localStorageEncryptService;
        this.loadingService = loadingService;
    }
    /**Método que retorna si el usuario esta logueado */
    AuthService.prototype.isAuthenticated = function () {
        var user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        return user.id_token != null;
    };
    /**Método de logout, cierra sesión */
    AuthService.prototype.logout = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
    };
    AuthService.prototype.getToken = function () {
        var user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        return user === null ? null : user.id_token;
    };
    /**Return gatway auth key */
    AuthService.prototype.getGatewayToken = function () {
        var gatewayInfo = this.localStorageEncryptService.getFromLocalStorage('gateway_token');
        if (gatewayInfo !== null) {
            var gi = gatewayInfo;
            return gi.access_token;
        }
        else {
            return null;
        }
    };
    /**Return session key */
    AuthService.prototype.getSessionToken = function () {
        var user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        return user.id_token;
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_0__loading_service__["a" /* LoadingService */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__registro_registro__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__recupera_contrasenia_recupera_contrasenia__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_proveedor_tabs_tabs__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, loadingService, alertaService, genericService, localStorageEncryptService, app, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingService = loadingService;
        this.alertaService = alertaService;
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.app = app;
        this.events = events;
        this.configuraciones = {
            visible: false
        };
        this.dataLogin = {
            user: null,
            password: null
        };
        this.color = "#3b64c0";
        this.env = __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */];
        this.loadingService.hide();
        //comentario
        if (this.localStorageEncryptService.getFromLocalStorage("theme")) {
            this.color = this.localStorageEncryptService.getFromLocalStorage("theme");
        }
        this.events.subscribe("changeColor", function (data) {
            try {
                if (_this.localStorageEncryptService.getFromLocalStorage("theme")) {
                    _this.color = _this.localStorageEncryptService.getFromLocalStorage("theme");
                }
            }
            catch (error) {
            }
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        //this.loadingService.show();
    };
    LoginPage.prototype.regresar = function () {
        this.navCtrl.pop();
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.loadingService.show().then(function () {
            var body = {
                username: _this.dataLogin.user,
                password: _this.dataLogin.password
            };
            _this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].login, body).subscribe(function (response) {
                //quitar
                _this.loadingService.hide();
                _this.localStorageEncryptService.setToLocalStorage("userSession", response);
                //let nav:any = this.app.getRootNav();
                //nav.push(TabsPage);
                _this.events.publish("actualizarCantidad", {});
                _this.events.publish("actualizarTarjetas", {});
                _this.events.publish("totalCarrito");
                _this.events.publish("reloadUser");
                switch (__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].perfil.activo) {
                    case 1:
                        _this.navCtrl.pop();
                        break;
                    case 2:
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_proveedor_tabs_tabs__["a" /* TabsProveedorPage */]);
                        break;
                    default:
                        break;
                }
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
    };
    LoginPage.prototype.visible = function () {
        this.configuraciones.visible = !this.configuraciones.visible;
    };
    LoginPage.prototype.goToRegister = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__registro_registro__["a" /* RegistroPage */]);
    };
    LoginPage.prototype.olvideContrasenia = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__recupera_contrasenia_recupera_contrasenia__["a" /* RecuperaContraseniaPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/login/login.html"*/'<!-- background-color: #258649; -->\n<ion-icon *ngIf="env.perfil.activo == 1" id="icn-5" name="ios-arrow-back" class="arrow-generada" (click)="regresar()" [ngStyle]="{\'color\': color}"></ion-icon>\n<ion-content class="max-contenedor" padding style="background-image: url(assets/imgs/login/loginFondo.png);"\n[style.background-image]="\'url(\'+genericService.imgLogin()+\')\'">\n  <section class="container animated rubberBand">\n    <section class="flex">\n      <img src="assets/imgs/logo.png" alt="" class="animated fadeIn">\n\n      <section class="input-section">\n        <input [(ngModel)]="dataLogin.user" type="email" placeholder="{{\'EMAIL\' | translate}}">\n        <div class="interno">\n          <input [(ngModel)]="dataLogin.password" type="{{configuraciones.visible ? \'text\' : \'password\'}}" placeholder="{{\'PASSWORD\' | translate}}">\n          <section (touchstart)="visible()" (touchend)="visible()">\n            <ion-icon ios="ios-eye" md="ios-eye"></ion-icon>\n          </section>\n        </div>\n\n        <button (click)="login()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">{{\'LOGIN\' | translate}}</button>\n      </section>\n      <section class="registrate">\n        <a (click)="goToRegister()" [ngStyle]="{\'color\': genericService.getColorHex()}">¿Aún no te has registrado?</a>\n      </section>\n      <section class="registrate">\n        <a (click)="olvideContrasenia()" [ngStyle]="{\'color\': genericService.getColorHex()}">Olvidé mi contraseña</a>\n      </section>\n    </section>\n  </section>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_5__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Events */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpcionesMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cambio_contrasenia_cambio_contrasenia__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lista_carrito_compras_lista_carrito_compras__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var OpcionesMenuPage = /** @class */ (function () {
    function OpcionesMenuPage(navCtrl, navParams, localStorageEncryptService, alertCtrl, app, viewCtrl, events, genericService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorageEncryptService = localStorageEncryptService;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.viewCtrl = viewCtrl;
        this.events = events;
        this.genericService = genericService;
        this.user = null;
        this.env = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */];
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.events.subscribe("reloadUser", function (data) {
            try {
                _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            }
            catch (error) {
            }
        });
    }
    OpcionesMenuPage.prototype.ionViewDidLoad = function () {
    };
    OpcionesMenuPage.prototype.logout = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Confirmación",
            message: "¿Estás segur@ de cerrar sesión?",
            cssClass: this.genericService.getColorClassTWO(),
            buttons: [
                {
                    text: "Cancelar",
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Ok',
                    handler: function () {
                        _this.confirmar();
                    }
                }
            ]
        });
        alert.present();
    };
    OpcionesMenuPage.prototype.confirmar = function () {
        try {
            this.localStorageEncryptService.clearProperty("userSession");
            this.viewCtrl.dismiss();
            var nav = this.app.getRootNav();
            nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
        }
        catch (error) {
        }
    };
    OpcionesMenuPage.prototype.openListCarrito = function () {
        var nav = this.app.getRootNav();
        this.viewCtrl.dismiss();
        nav.push(__WEBPACK_IMPORTED_MODULE_6__lista_carrito_compras_lista_carrito_compras__["a" /* ListaCarritoComprasPage */]);
    };
    OpcionesMenuPage.prototype.change = function (opt) {
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
            case 5:
                this.localStorageEncryptService.setToLocalStorage("theme", "#292929");
                break;
            case 6:
                this.localStorageEncryptService.setToLocalStorage("theme", "#F07C1B");
                break;
            default:
                this.localStorageEncryptService.setToLocalStorage("theme", "#3b64c0");
                break;
        }
        this.events.publish("changeColor");
    };
    OpcionesMenuPage.prototype.login = function () {
        this.viewCtrl.dismiss();
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    OpcionesMenuPage.prototype.cambiarContra = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__cambio_contrasenia_cambio_contrasenia__["a" /* CambioContraseniaPage */]);
    };
    OpcionesMenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-opciones-menu',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/opciones-menu/opciones-menu.html"*/'<div>\n  <ion-list>\n    <ion-list-header style="margin: 0px;">General</ion-list-header>\n\n    <div style="padding: 10px;text-align: center;">Elige un tema</div>\n    <ion-row class="rowi">\n      <ion-col col-2 class="tema-6">\n        <button (click)="change(6)"></button>\n      </ion-col>\n      <ion-col col-2 class="tema-1">\n        <button (click)="change(1)"></button>\n      </ion-col>\n      <ion-col col-2 class="tema-2">\n        <button (click)="change(2)"></button>\n      </ion-col>\n      <ion-col col-2 class="tema-3">\n        <button (click)="change(3)"></button>\n      </ion-col>\n      <ion-col col-2 class="tema-4">\n        <button (click)="change(4)"></button>\n      </ion-col>\n      <ion-col col-2 class="tema-5">\n        <button (click)="change(5)"></button>\n      </ion-col>\n    </ion-row>\n\n    <button ion-item (click)="openListCarrito()" *ngIf="user && env.perfil.activo == 1">\n      <ion-icon name="ios-cart-outline" style="font-size: 2.4rem;"></ion-icon>\n      Listas de carrito\n    </button>\n\n    <button ion-item (click)="cambiarContra()" *ngIf="user">\n      <ion-icon name="ios-construct-outline" style="font-size: 2.4rem;"></ion-icon>\n      Cambiar contraseña\n    </button>\n\n    <button ion-item (click)="logout()" *ngIf="user">\n      <ion-icon name="ios-log-out-outline" style="font-size: 2.4rem;"></ion-icon>\n      Cerrar sesión\n    </button>\n\n    <button ion-item (click)="login()" *ngIf="!user">\n      <ion-icon name="ios-log-out-outline" style="font-size: 2.4rem;"></ion-icon>\n      Iniciar sesión\n    </button>\n  </ion-list>\n</div>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/opciones-menu/opciones-menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1__services_generic_service__["a" /* GenericService */]])
    ], OpcionesMenuPage);
    return OpcionesMenuPage;
}());

//# sourceMappingURL=opciones-menu.js.map

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageEncryptService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_crypto_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**Clase que guarda información en localstorage pero de forma
 * encriptada para no dejar a la vista del usuario o de terceros, la
 * información detallada de lo que se requiere utilizar durante el ciclo de vida
 * de la aplicación
 */
var LocalStorageEncryptService = /** @class */ (function () {
    function LocalStorageEncryptService() {
        /**
         * Llave secreta para encriptar y desencriptar la informacion almacenada
         */
        this.secretKey = 'RG5vt457u%$5bj78c452YBBc24432c%#T7&$tv657bu6B&BvH76hvv64';
    }
    /**
     * Almacena encriptado los datos necesarios en el localstorage
     * @param key Llave a almacenar
     * @param data Dato a almacenar
     */
    LocalStorageEncryptService.prototype.setToLocalStorage = function (key, data) {
        var encryptedData = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["AES"].encrypt(JSON.stringify(data), this.secretKey).toString();
        var encryptedKey = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["SHA256"](key).toString();
        encryptedData = JSON.stringify(data);
        encryptedKey = key;
        localStorage.setItem(encryptedKey, encryptedData);
    };
    /**
     * Recupera valores del localstorage por medio de la llave
     * @param key Llave a obtener
     */
    LocalStorageEncryptService.prototype.getFromLocalStorage = function (key) {
        var encryptedKey = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["SHA256"](key).toString();
        encryptedKey = key;
        var item = localStorage.getItem(encryptedKey);
        if (item === undefined || item === null) {
            return null;
        }
        var dencryptedData; // = CryptoJS.AES.decrypt(item, this.secretKey).toString(CryptoJS.enc.Utf8);
        dencryptedData = 1;
        if (dencryptedData == 1) {
            return JSON.parse(item);
        }
        else {
            if (this.isJson(dencryptedData)) {
                return JSON.parse(dencryptedData);
            }
            else {
                return dencryptedData;
            }
        }
    };
    /**
     * Limpia todo el localstorage
     */
    LocalStorageEncryptService.prototype.clear = function () {
        localStorage.clear();
    };
    /**
     * Remueve una propiedad especifica del local storage
     * @param property Propiedad a eliminar
     */
    LocalStorageEncryptService.prototype.clearProperty = function (property) {
        var encryptedKey = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["SHA256"](property).toString();
        //localStorage.removeItem(encryptedKey);
        localStorage.removeItem(property);
    };
    /**
     * Valida si una cadena cumple el formato JSON
     * @param str Cadena a validar
     * @returns True si cumple el formato False no cumple el formato
     */
    LocalStorageEncryptService.prototype.isJson = function (str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    LocalStorageEncryptService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], LocalStorageEncryptService);
    return LocalStorageEncryptService;
}());

//# sourceMappingURL=local-storage-encrypt.service.js.map

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**Clase provider que se utiliza para generar mensajes de error, alerta o éxito
 * Se hizo de forma genérica para evitar repetir esta clase de código
 */
var AlertaService = /** @class */ (function () {
    /**Constructor del servicio en el que se inyecta el controlador de alertas de ionic
     * y eventos de escucha para el momento de un cierre de sesión inesperado
     */
    function AlertaService(alertCtrl, translateService, localStorageEncryptService, genericService, events) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.translateService = translateService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.genericService = genericService;
        this.events = events;
        /**Respectivamente, variables que determinan si cada una de las alertas estan
         * activas
         */
        this.basica = false;
        this.mensajeAdvertencia = this.translateService.instant("WARNING");
        this.mensajeError = this.translateService.instant("ERROR");
        this.mensajeBien = this.translateService.instant("GOOD");
        //this.events.publish();
        this.events.subscribe('closedAlerts', function (data) {
            try {
                if (_this.basica) {
                    _this.alert.dismiss();
                }
            }
            catch (error) {
            }
        });
    }
    /**Método necesario para quitar la suscripción al evento */
    AlertaService.prototype.ngOnDestroy = function () {
        this.events.unsubscribe('closedAlerts');
    };
    /**Método utilizado como alerta de éxito o mensaje de éxito  */
    AlertaService.prototype.alertaBasica = function (titulo, subtitulo, accion) {
        var _this = this;
        if (!this.basica) {
            this.alert = this.alertCtrl.create({
                title: titulo,
                subTitle: subtitulo,
                cssClass: this.genericService.getColorClass(),
                buttons: [
                    {
                        text: 'Aceptar',
                        handler: function () {
                            if (accion != null) {
                                accion();
                            }
                        }
                    }
                ]
            });
            this.basica = true;
            this.alert.present().then(function (result) {
            });
            this.alert.onDidDismiss(function () {
                _this.basica = false;
            });
        }
    };
    AlertaService.prototype.errorAlertTimeout = function () {
        this.warnAlert(null, this.translateService.instant("VERIFY-CONNECTION"), null);
    };
    /**Método utilizado como alerta normal  */
    AlertaService.prototype.alertaNormal = function (mensaje) {
        var _this = this;
        if (!this.basica) {
            this.basica = true;
            this.alert = this.alertCtrl.create({
                title: "<div class='notificacionError'>\n        <div><img class='headerImg' src='assets/imgs/alertas/success.png'/></div>\n        <div class='textoTitle'>" + mensaje + "</div>\n        <div>",
                message: null,
                cssClass: this.genericService.getColorClass(),
                buttons: [
                    {
                        text: 'Aceptar',
                        handler: function () {
                        }
                    }
                ]
            });
            this.alert.present().then(function (result) {
            });
            this.alert.onDidDismiss(function (res) {
                _this.basica = false;
            });
        }
    };
    /**Método utilizado como alerta de validación o cuidado*/
    AlertaService.prototype.warnAlert = function (titulo, subtitulo, accion) {
        var _this = this;
        if (!this.basica) {
            this.alert = this.alertCtrl.create({
                title: "<div class='notificacionError'>\n        <div><img class='headerImg' src='assets/imgs/alertas/warning.png'/></div>\n        \n        <div>",
                subTitle: subtitulo,
                cssClass: this.genericService.getColorClass(),
                buttons: [
                    {
                        text: 'Aceptar',
                        handler: function () {
                            if (accion != null) {
                                accion();
                            }
                        }
                    }
                ]
            });
            this.basica = true;
            this.alert.present().then(function (result) {
            });
            this.alert.onDidDismiss(function () {
                _this.basica = false;
            });
        }
    };
    /**Método utilizado como alerta de error*/
    //<div><img class='headerImgSub' src='/assets/icon/icn-regalo.svg'/></div>
    AlertaService.prototype.errorAlert = function (titulo, subtitulo, accion) {
        var _this = this;
        if (!this.basica) {
            this.alert = this.alertCtrl.create({
                title: titulo == null ?
                    "<div class='notificacionError'>\n        <div><img class='headerImg' src='assets/imgs/alertas/error.png'/></div>\n        \n        <div>" : titulo,
                subTitle: subtitulo,
                cssClass: this.genericService.getColorClass(),
                buttons: [
                    {
                        text: 'Aceptar',
                        handler: function () {
                            if (accion != null) {
                                accion();
                            }
                        }
                    }
                ]
            });
            this.basica = true;
            this.alert.present().then(function (result) {
            });
            this.alert.onDidDismiss(function () {
                _this.basica = false;
            });
        }
    };
    /**Alerta genérica de error */
    AlertaService.prototype.errorAlertGenericWithAction = function (error, action) {
        var _this = this;
        if (!this.basica) {
            this.alert = this.alertCtrl.create({
                title: "<div class='notificacionError'>\n        <div><img class='headerImg' src='assets/imgs/alerts/error.png'/></div>\n        <div class='textoTitle'>" + error + "</div>\n        <div>",
                cssClass: this.genericService.getColorClass(),
                message: null,
                buttons: [
                    {
                        text: 'Aceptar',
                        handler: function () {
                            action();
                        }
                    }
                ]
            });
            this.basica = true;
            this.alert.present().then(function (result) {
            });
            this.alert.onDidDismiss(function () {
                _this.basica = false;
            });
        }
    };
    /**Alerta genérica de error */
    AlertaService.prototype.errorAlertGeneric = function (error) {
        var _this = this;
        if (!this.basica) {
            this.alert = this.alertCtrl.create({
                title: "<div class='notificacionError'>\n        <div><img class='headerImg' src='assets/imgs/alerts/error.png'/></div>\n        <div class='textoTitle'>" + error + "</div>\n        <div>",
                cssClass: this.genericService.getColorClass(),
                message: null,
                buttons: [
                    {
                        text: 'Aceptar',
                        handler: function () {
                        }
                    }
                ]
            });
            this.basica = true;
            this.alert.present().then(function (result) {
            });
            this.alert.onDidDismiss(function () {
                _this.basica = false;
            });
        }
    };
    /**Alerta genérica de error */
    AlertaService.prototype.warnAlertGeneric = function (error) {
        var _this = this;
        if (!this.basica) {
            this.alert = this.alertCtrl.create({
                title: "<div class='notificacionError'>\n        <div><img class='headerImg' src='assets/imgs/alerts/warn.png'/></div>\n        <div class='textoTitle'>" + error + "</div>\n        <div>",
                cssClass: this.genericService.getColorClass(),
                message: null,
                buttons: [
                    {
                        text: 'Aceptar',
                        handler: function () {
                        }
                    }
                ]
            });
            this.basica = true;
            this.alert.present().then(function (result) {
            });
            this.alert.onDidDismiss(function () {
                _this.basica = false;
            });
        }
    };
    /**Alerta genérica de error */
    AlertaService.prototype.successAlertGeneric = function (error) {
        var _this = this;
        if (!this.basica) {
            this.alert = this.alertCtrl.create({
                title: "<div class='notificacionError'>\n        <div><img class='headerImg' src='assets/imgs/alerts/success.png'/></div>\n        <div class='textoTitle'>" + error + "</div>\n        <div>",
                cssClass: this.genericService.getColorClass(),
                message: null,
                buttons: [
                    {
                        text: 'Aceptar',
                        handler: function () {
                        }
                    }
                ]
            });
            this.basica = true;
            this.alert.present().then(function (result) {
            });
            this.alert.onDidDismiss(function () {
                _this.basica = false;
            });
        }
    };
    AlertaService.prototype.getBasicaAlert = function () {
        return this.basica;
    };
    /**Setter's de propiedades de alerta */
    AlertaService.prototype.setBasicaAlert = function (valor) {
        this.basica = valor;
    };
    AlertaService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1__local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_0__generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]])
    ], AlertaService);
    return AlertaService;
}());

//# sourceMappingURL=alerta.service.js.map

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export pathPrincipal */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pathChat; });
/* unused harmony export appCliente */
/* unused harmony export appProveedor */
/* unused harmony export appTransportista */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var pathPrincipal = "http://localhost:8080/api/";
var pathChat = "http://localhost:8080/";
var appCliente = 1;
var appProveedor = 2;
var appTransportista = 3;
var environment = {
    production: true,
    productos: pathPrincipal + "productos",
    productosCategoria: pathPrincipal + "productos/home",
    proveedorProductos: pathPrincipal + "proveedor-productos",
    categoria: pathPrincipal + "proveedor-productos/categoria/",
    secciones: pathPrincipal + "seccions",
    categorias: pathPrincipal + "categorias",
    proveedores: pathPrincipal + "proveedors",
    proveedoresFull: pathPrincipal + "proveedores",
    proveedoresProducto: pathPrincipal + "proveedores/producto/",
    registro: pathPrincipal + "register",
    login: pathPrincipal + "authenticate",
    carritoCompras: pathPrincipal + "carrito-compras",
    carritoHistorico: pathPrincipal + "carrito-historicos",
    carritoHistoricoDetalle: pathPrincipal + "carrito-historico-detalles",
    getImagenIndividual: pathPrincipal + "adjuntos/download/",
    promociones: pathPrincipal + "promociones",
    tarjetas: pathPrincipal + "tarjetas",
    direcciones: pathPrincipal + "usuario-direcciones",
    tipoDirecciones: pathPrincipal + "tipo-direcciones",
    pedidos: pathPrincipal + "pedidos",
    pedidosProveedor: pathPrincipal + "proveedor/pedidos",
    pedidosProveedores: pathPrincipal + "proveedor/pedido-proveedores",
    usuarios: pathPrincipal + "usuarios",
    usuarioDocumentos: pathPrincipal + "usuario-documentos",
    users: pathPrincipal + "users",
    chats: pathPrincipal + "chats",
    chatsProveedor: pathPrincipal + "proveedor/chats/pedido-proveedor/",
    cambioContraseña: pathPrincipal + "account/change-password",
    reset: pathPrincipal + "account/reset-password/init",
    logout: null,
    icons: {
        persona: {
            icon: "assets/imgs/direcciones/m3.png"
        },
        casa: {
            icon: "assets/imgs/direcciones/m2.png"
        },
        lugar: {
            icon: "assets/imgs/direcciones/m1.png"
        },
        proveedor: {
            icon: "assets/imgs/direcciones/m4.png"
        }
    },
    //info de GOOGLE
    geocodeGoogle: "https://maps.googleapis.com/maps/api/geocode/json",
    keyGoogle: "AIzaSyDpg-WwghYJCwSq1Q8nM_5ZW5IY5tLNFmQ",
    //Fines de pruebas
    emulado: true,
    //Aqui "cambiamos" la app en ejecución
    perfil: {
        //activo: appCliente,
        activo: appProveedor
    }
};
//# sourceMappingURL=environment.prod.js.map

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


/**Clase Servicio que sirve para mostrar y ocultar un spinner
 * de carga en peticiones de servicios back o en donde se requiera
 */
var LoadingService = /** @class */ (function () {
    /**Constructor donde se hace la inyección del
     * controlador de loading
     */
    function LoadingService(loadingController) {
        this.loadingController = loadingController;
        this.activo = 0;
    }
    /**Método que se encarga de mostrar el loader */
    LoadingService.prototype.show = function (message) {
        if (message === void 0) { message = null; }
        return __awaiter(this, void 0, void 0, function () {
            var params, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        if (!(this.activo == 0)) return [3 /*break*/, 3];
                        params = {};
                        if (message) {
                            params.message = message;
                        }
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create(params)];
                    case 1:
                        _a.loading = _b.sent();
                        this.activo = 1;
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**Método que se encarga de ocultar el loader */
    LoadingService.prototype.hide = function () {
        try {
            if (this.activo == 1) {
                this.activo = 0;
                this.loading.dismiss();
            }
            else {
            }
        }
        catch (error) {
        }
    };
    LoadingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
    ], LoadingService);
    return LoadingService;
}());

//# sourceMappingURL=loading.service.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DireccionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_geo_proveedores_home_geo_proveedores__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DireccionesPage = /** @class */ (function () {
    function DireccionesPage(navCtrl, navParams, genericService, alertaService, loadingService, events, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.events = events;
        this.viewCtrl = viewCtrl;
        this.listaDirecciones = [];
        this.render = false;
        this.fromPop = false;
        this.fromPop = navParams.get("fromPop");
        this.cargarDireccionesLista();
        this.events.subscribe('direction', function (data) {
            if (!data.create) {
                var position = _this.listaDirecciones.findIndex(function (img) {
                    return img.id == data.body.id;
                });
                for (var index = 0; index < _this.listaDirecciones.length; index++) {
                    var element = _this.listaDirecciones[index];
                    if (element.id == data.body.id) {
                        position = index;
                    }
                }
                _this.listaDirecciones[position] = data.body;
            }
            else {
                _this.listaDirecciones.push(data.body);
            }
            //this.cards = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}-cards`);
        });
        this.events.subscribe('actualizarTarjetas', function (data) {
            _this.cargarDireccionesLista();
        });
    }
    DireccionesPage.prototype.ionViewDidLoad = function () {
    };
    DireccionesPage.prototype.cargarDireccionesLista = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].direcciones).subscribe(function (response) {
            //quitar
            _this.listaDirecciones = response;
            _this.render = true;
            if (_this.listaDirecciones.length <= 0) {
                _this.alertaService.warnAlertGeneric("Aún no cuentas con direcciones frecuentes");
            }
        }, function (error) {
            var err = error.error;
            _this.listaDirecciones = [];
            _this.render = true;
            //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    DireccionesPage.prototype.borrar = function (direccion) {
        var _this = this;
        var position = this.listaDirecciones.findIndex(function (img) {
            return img.id == direccion.id;
        });
        this.loadingService.show().then(function () {
            _this.genericService.sendDelete(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].direcciones + "/" + direccion.id).subscribe(function (response) {
                _this.listaDirecciones = _this.listaDirecciones.slice(0, position).concat(_this.listaDirecciones.slice(position + 1));
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                _this.alertaService.errorAlertGeneric("No se ha podido eliminar tu dirección, intenta nuevamente");
            });
        });
    };
    DireccionesPage.prototype.view = function (direccion) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__home_geo_proveedores_home_geo_proveedores__["a" /* HomeGeoProveedoresPage */], { direccion: direccion });
    };
    DireccionesPage.prototype.select = function (direccion) {
        this.viewCtrl.dismiss({ direccion: direccion });
    };
    DireccionesPage.prototype.nuevaLista = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__home_geo_proveedores_home_geo_proveedores__["a" /* HomeGeoProveedoresPage */]);
    };
    DireccionesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-direcciones',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/direcciones/direcciones.html"*/'<ion-header *ngIf="!fromPop">\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>Mis direcciones</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content [ngStyle]="{\'padding\': !fromPop ? \'16px\' : \'0px\'}">\n  <div class="spinner-carrito" *ngIf="!render">\n    <ion-spinner></ion-spinner>\n  </div>\n  <div *ngIf="fromPop" style="padding: 10px;\n  text-align: center;\n  color: #fff;" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    Selecciona una dirección frecuente\n  </div>\n\n  <ion-list *ngIf="!fromPop">\n    <ion-item-sliding #item *ngFor="let card of listaDirecciones">\n      <ion-item class="item-list-card" (click)="view(card)">\n        <ion-avatar slot="start">\n          <img src="assets/imgs/direcciones/maps-and-flags.png" alt="">\n        </ion-avatar>\n        <div class="datos-tarjetas">\n          <div class="name">{{card.alias}}</div>\n          <div class="number">{{card.direccion.direccion}}</div>\n        </div>\n      </ion-item>\n\n      <ion-item-options side="right">\n        <button ion-button (click)="borrar(card)" color="danger">\n          <ion-icon name="ios-trash-outline"></ion-icon>\n          Borrar\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n  <ion-list *ngIf="fromPop">\n    <ion-item class="item-list-card" (click)="select(card)" *ngFor="let card of listaDirecciones">\n      <ion-avatar slot="start">\n        <img src="assets/imgs/direcciones/maps-and-flags.png" alt="">\n      </ion-avatar>\n      <div class="datos-tarjetas">\n        <div class="name">{{card.alias}}</div>\n        <div class="number">{{card.direccion.direccion}}</div>\n      </div>\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-fab bottom right class="fab-cards animated swing" *ngIf="!fromPop">\n  <button ion-fab (click)="nuevaLista()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <ion-icon name="add"></ion-icon>\n  </button>\n</ion-fab>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/direcciones/direcciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["q" /* ViewController */]])
    ], DireccionesPage);
    return DireccionesPage;
}());

//# sourceMappingURL=direcciones.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsProveedorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_proveedor_home_proveedor__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsProveedorPage = /** @class */ (function () {
    function TabsProveedorPage(genericService, localStorageEncryptService) {
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_0__home_proveedor_home_proveedor__["a" /* HomeProveedorPage */];
        this.user = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    }
    TabsProveedorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages-proveedor/tabs/tabs.html"*/'<ion-tabs color="{{genericService.getColor()}}">\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages-proveedor/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]])
    ], TabsProveedorPage);
    return TabsProveedorPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListaCarritoComprasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__carrito_historico_carrito_historico__ = __webpack_require__(547);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ListaCarritoComprasPage = /** @class */ (function () {
    function ListaCarritoComprasPage(navCtrl, navParams, genericService, alertaService, loadingService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.listas = [];
        this.renderSlide = true;
        this.cargarListas();
    }
    /**Método para cargar productos en base a especificaciones */
    ListaCarritoComprasPage.prototype.cargarListas = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].carritoHistorico).subscribe(function (response) {
            //quitar
            _this.listas = response;
            _this.listas.forEach(function (item) {
                if (item.fechaAlta) {
                    var stringF = item.fechaAlta.split("T");
                    var fechaF = stringF[0] + " " + stringF[1];
                    __WEBPACK_IMPORTED_MODULE_6_moment__["locale"]("ES");
                    item.fecha = __WEBPACK_IMPORTED_MODULE_6_moment__(fechaF, 'YYYY-MM-DD HH:mm:ss').format("D [de] MMMM [de] YYYY HH:mm:ss");
                }
            });
            _this.renderSlide = false;
            if (_this.listas.length <= 0) {
                _this.alertaService.warnAlertGeneric("Aún no cuentas con listas frecuentes");
            }
        }, function (error) {
            var err = error.error;
            _this.renderSlide = false;
            //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    ListaCarritoComprasPage.prototype.ionViewDidLoad = function () {
    };
    ListaCarritoComprasPage.prototype.borrar = function (item) {
        var _this = this;
        var position = this.listas.findIndex(function (img) {
            return img.id == item.id;
        });
        this.loadingService.show().then(function () {
            _this.genericService.sendDelete(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].carritoHistorico + "/" + item.id).subscribe(function (response) {
                _this.listas = _this.listas.slice(0, position).concat(_this.listas.slice(position + 1));
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                _this.alertaService.errorAlertGeneric("No se ha podido eliminar tu lista, intenta nuevamente");
            });
        });
    };
    ListaCarritoComprasPage.prototype.view = function (lista) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__carrito_historico_carrito_historico__["a" /* CarritoHistoricoPage */], { lista: lista });
    };
    ListaCarritoComprasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-lista-carrito-compras',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/lista-carrito-compras/lista-carrito-compras.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>Colecciones</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="spinner-carrito" *ngIf="renderSlide">\n      <ion-spinner></ion-spinner>\n  </div>\n\n  <ion-list>\n      <ion-item-sliding #item *ngFor="let card of listas">\n        <ion-item class="item-list-card" (click)="view(card)">\n          <ion-avatar slot="start">\n            <img src="assets/imgs/lista-carrito/shopping-cart.png" alt="">\n          </ion-avatar>\n          <div class="datos-tarjetas">\n            <div class="name">{{card.nombre}}</div>\n            <div class="number">{{card.fecha}}</div>\n          </div>\n        </ion-item>\n    \n        <ion-item-options side="right">\n          <button ion-button (click)="borrar(card)" color="danger">\n            <ion-icon name="ios-trash-outline"></ion-icon>\n            Borrar\n          </button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/lista-carrito-compras/lista-carrito-compras.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_0__services_loading_service__["a" /* LoadingService */]])
    ], ListaCarritoComprasPage);
    return ListaCarritoComprasPage;
}());

//# sourceMappingURL=lista-carrito-compras.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistorialPedidosDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qr_qr__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chat_chat__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_proveedor_ver_productos_ver_productos__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pedidos_detail_pedidos_detail__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__problemas_pedido_problemas_pedido__ = __webpack_require__(541);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var HistorialPedidosDetailPage = /** @class */ (function () {
    function HistorialPedidosDetailPage(navCtrl, navParams, genericService, localStorageEncryptService, alertaService, loadingService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.user = null;
        this.pedido = null;
        this.tipoUsuario = __WEBPACK_IMPORTED_MODULE_9__environments_environment_prod__["a" /* environment */].perfil.activo;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.pedido = navParams.get("pedido");
    }
    HistorialPedidosDetailPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
    };
    HistorialPedidosDetailPage.prototype.loadMap = function () {
        var _this = this;
        var latitude = this.pedido.direccionContacto.latitud;
        var longitude = this.pedido.direccionContacto.longitud;
        // create a new map by passing HTMLElement
        var mapEle = document.getElementById('map_canvas');
        // create LatLng object
        var myLatLng = { lat: Number(latitude), lng: Number(longitude) };
        // create map
        this.map = new google.maps.Map(mapEle, {
            center: myLatLng,
            zoom: 15
        });
        google.maps.event.addListenerOnce(this.map, 'idle', function () {
            var info = "<div>Ejemplo de window</div>";
            var infowindow = new google.maps.InfoWindow({
                content: info
            });
            var component = _this;
            component.marker = new google.maps.Marker({
                position: myLatLng,
                map: _this.map,
                title: 'Hello World!',
                id: "marcador-1",
                //draggable: true,
                icon: __WEBPACK_IMPORTED_MODULE_9__environments_environment_prod__["a" /* environment */].icons['persona'].icon
            });
            component.marker.addListener('click', function () {
                //infowindow.open(this.map, this.marker);
                //component.changeInfoCard();
            });
            /* marker.addEventListener("click", (e: Event) => {
             
              
            }); */
            mapEle.classList.add('show-map');
        });
    };
    HistorialPedidosDetailPage.prototype.verDetalle = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__pedidos_detail_pedidos_detail__["a" /* PedidosDetailPage */], { detalle: this.pedido.pedidoProveedores, id: this.pedido.id });
    };
    HistorialPedidosDetailPage.prototype.problemasPedido = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__problemas_pedido_problemas_pedido__["a" /* ProblemasPedidoPage */]);
    };
    HistorialPedidosDetailPage.prototype.verProductos = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_proveedor_ver_productos_ver_productos__["a" /* VerProductosPage */], { pedidos: this.pedido });
    };
    HistorialPedidosDetailPage.prototype.terminarServicio = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__qr_qr__["a" /* QrPage */], { pedido: this.pedido });
    };
    HistorialPedidosDetailPage.prototype.enviarPedido = function () {
        var _this = this;
        var body = {
            pedidoProveedorId: this.pedido.pedidoProveedores[0].id,
            estatusId: 14
        };
        this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_9__environments_environment_prod__["a" /* environment */].pedidosProveedores, body).subscribe(function (response1) {
            _this.alertaService.successAlertGeneric("El pedido ha cambiado su estatus a enviado, ponte en contacto con " + _this.pedido.cliente.firstName);
        }, function (error) {
            _this.alertaService.errorAlertGeneric("Ocurrió un error, por favor intenta nuevamente.");
        });
    };
    HistorialPedidosDetailPage.prototype.verChat = function () {
        var _this = this;
        switch (__WEBPACK_IMPORTED_MODULE_9__environments_environment_prod__["a" /* environment */].perfil.activo) {
            case 1:
                if (!this.pedido.pedidoProveedores[0].chatProveedorid) {
                    this.alertaService.warnAlertGeneric("El proveedor aun no inicia el chat, espera a que él se comunique contigo");
                }
                else {
                    this.loadingService.show().then(function () {
                        _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_9__environments_environment_prod__["a" /* environment */].chats + "/" + _this.pedido.pedidoProveedores[0].chatProveedorid).subscribe(function (response) {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__chat_chat__["a" /* ChatPage */], { chat: response, pedido: _this.pedido });
                            _this.loadingService.hide();
                        }, function (error) {
                            _this.loadingService.hide();
                            var err = error.error;
                            _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                        });
                    });
                }
                break;
            case 2:
                this.loadingService.show().then(function () {
                    _this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_9__environments_environment_prod__["a" /* environment */].chatsProveedor + _this.pedido.pedidoProveedores[0].id + "/tipoChat/1").subscribe(function (response) {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__chat_chat__["a" /* ChatPage */], { chat: response, pedido: _this.pedido });
                        _this.loadingService.hide();
                    }, function (error) {
                        _this.loadingService.hide();
                        var err = error.error;
                        _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                    });
                });
                break;
        }
    };
    HistorialPedidosDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-historial-pedidos-detail',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/historial-pedidos-detail/historial-pedidos-detail.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>Pedido <strong>{{pedido.folio}}</strong></ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <section class="estatus">\n    <div class="number">Costo <strong>{{pedido.total | currency}}</strong></div>\n    <div class="number">Fecha Solicitud <strong>{{pedido.fechaAlta}}</strong></div>\n    <div class="number" *ngIf="pedido.fechaEntrega">Fecha Entrega <strong>{{pedido.fechaEntrega}}</strong></div>\n    <div class="number">Estatus <strong>{{pedido.estatus.nombre}}</strong></div>\n  </section>\n\n  <section class="mapa">\n      <div class="direccion" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" *ngIf="tipoUsuario == 2">Cliente</div>\n      <div class="direct" *ngIf="tipoUsuario == 2">{{pedido.cliente.firstName}} {{pedido.cliente.lastName}}</div>\n      \n    <div class="direccion" [ngStyle]="{\'background-color\' : genericService.getColorHex()}">Dirección de entrega</div>\n    <div class="direct">{{pedido.direccionContacto.direccion}}</div>\n    <div id="map_canvas" class="mapita-google"></div>\n  </section>\n \n  <section class="botones" *ngIf="tipoUsuario == 1">  \n    <button class="boton-terminar" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="terminarServicio()"><ion-icon name="md-done-all"></ion-icon>Terminar servicio</button>\n    <button class="boton-detalle" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="verDetalle()"><ion-icon name="ios-clipboard-outline"></ion-icon>Ver detalle</button>\n    <button class="boton-chat" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="verChat()">\n      <ion-icon name="ios-chatbubbles-outline"></ion-icon>\n      Chat\n    </button>\n    <button class="boton-recibo" [ngStyle]="{\'background-color\' : genericService.getColorHex()}"><ion-icon name="ios-document-outline"></ion-icon>Ver recibo</button>\n    <button class="boton-problemas" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="problemasPedido()"><ion-icon name="ios-flash-outline"></ion-icon>Problemas con pedido</button>\n  </section>\n\n  <section class="botones" *ngIf="tipoUsuario == 2" style="    margin-top: 84%;">  \n      <button class="boton-terminar" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="verProductos()"><ion-icon name="md-done-all"></ion-icon>Ver productos</button>\n      <button class="boton-chat" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="verChat()">\n        <ion-icon name="ios-chatbubbles-outline"></ion-icon>\n        Chat\n      </button>\n      <button class="boton-recibo" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="enviarPedido()"><ion-icon name="ios-send-outline"></ion-icon>Enviar pedido</button>\n      <button class="boton-problemas2" style="font-size: 10px;" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="problemasPedido()"><ion-icon name="ios-flash-outline"></ion-icon>Problemas con pedido</button>\n    </section>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/historial-pedidos-detail/historial-pedidos-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_2__services_loading_service__["a" /* LoadingService */]])
    ], HistorialPedidosDetailPage);
    return HistorialPedidosDetailPage;
}());

//# sourceMappingURL=historial-pedidos-detail.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticuloProveedoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__detalle_producto_detalle_producto__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ArticuloProveedoresPage = /** @class */ (function () {
    function ArticuloProveedoresPage(navCtrl, navParams, genericService, alertaService, loadingService, localStorageEncryptService, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.productos = [];
        this.replicaProductos = [];
        this.palabra = "";
        this.env = __WEBPACK_IMPORTED_MODULE_0__environments_environment_prod__["a" /* environment */];
        this.proveedor = null;
        this.proveedor = navParams.get("proveedor");
        this.productos = navParams.get("productos");
        this.replicaProductos = this.productos;
    }
    ArticuloProveedoresPage.prototype.ionViewDidLoad = function () {
    };
    ArticuloProveedoresPage.prototype.viewDetail = function (producto) {
        var _this = this;
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_0__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.productoId).subscribe(function (response) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { producto: response });
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
        //
    };
    ArticuloProveedoresPage.prototype.buscarPorPalabra = function () {
        var _this = this;
        this.productos = this.replicaProductos;
        this.productos = this.productos.filter(function (item) { return item.producto.nombre.toUpperCase().includes(_this.palabra.toUpperCase()); });
    };
    ArticuloProveedoresPage.prototype.up = function () {
        this.palabra = "";
        this.productos = this.replicaProductos;
        this.productos.sort(function (mayor, menor) {
            return mayor.precio - menor.precio;
        });
    };
    ArticuloProveedoresPage.prototype.down = function () {
        this.palabra = "";
        this.productos = this.replicaProductos;
        this.productos.sort(function (mayor, menor) {
            return menor.precio - mayor.precio;
        });
    };
    ArticuloProveedoresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-articulo-proveedores',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/articulo-proveedores/articulo-proveedores.html"*/'<ion-header>\n    <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n        <ion-title *ngIf="proveedor.proveedor">{{proveedor.proveedor?.nombre}}</ion-title>\n        <ion-title *ngIf="!proveedor.proveedor">{{proveedor.nombre}}</ion-title>\n    </ion-navbar>\n    <div class="busca" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n        <input type="text" [(ngModel)]="palabra" placeholder="Escribe aquí tu búsqueda" (keyup)="buscarPorPalabra()">\n      </div>\n  </ion-header>\n  \n  <ion-content padding>\n      <div *ngIf="productos && productos?.length>0" class="ordenamiento" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n          <div class="texto-ordena">\n            Ordernar por precio\n          </div>\n          <div class="botones">\n            <button ion-button outline style="width: 48%;" (click)="up()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n              <ion-icon name="md-trending-up" class="botonFooter"></ion-icon>\n            </button>\n          </div>\n          <div class="botones">\n            <button ion-button outline style="width: 48%;" (click)="down()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n              <ion-icon name="md-trending-down" class="botonFooter"></ion-icon>\n            </button>\n          </div>\n        </div>\n    <div class="spinner-carrito" *ngIf="!productos || productos.length <= 0">\n      <ion-spinner></ion-spinner>\n    </div>\n  \n  \n  \n    <div *ngIf="productos && productos.length > 0">\n      <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of productos; let i = index" (click)="viewDetail(p)">\n        <!-- <div class="tacha">\n                    <div class="mini-tacha">\n                        <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                        <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                    </div>\n                  </div> -->\n        <div class="container-card">\n  \n          <img src="{{env.getImagenIndividual}}{{p.producto.adjuntoId}}" />\n        </div>\n        <div class="container-text">{{p.producto.nombre}}</div>\n        <div class="description">{{p.producto.descripcion}}</div>\n        <div class="precio">{{p.precio | currency}}</div>\n      </div>\n    </div>\n  </ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/articulo-proveedores/articulo-proveedores.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_5__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */]])
    ], ArticuloProveedoresPage);
    return ArticuloProveedoresPage;
}());

//# sourceMappingURL=articulo-proveedores.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProveedorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__articulo_proveedores_articulo_proveedores__ = __webpack_require__(210);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProveedorPage = /** @class */ (function () {
    function ProveedorPage(navCtrl, navParams, genericService, alertaService, loadingService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.proveedores = [];
        this.proveedoresReplica = [];
        this.palabra = "";
        this.env = __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */];
        this.cargarProveedores();
    }
    ProveedorPage.prototype.cargarProveedores = function () {
        var _this = this;
        this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].proveedoresFull).subscribe(function (response) {
            _this.proveedores = response;
            _this.proveedoresReplica = response;
        }, function (error) {
            var err = error.error;
            _this.proveedores = null;
            _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    ProveedorPage.prototype.ionViewDidLoad = function () {
    };
    ProveedorPage.prototype.regresar = function () {
        var id = document.getElementById("icn-2");
        id.style.display = "none";
        this.navCtrl.pop();
    };
    ProveedorPage.prototype.cambio = function () {
    };
    ProveedorPage.prototype.viewDetailAll = function (proveedor) {
        var _this = this;
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].proveedorProductos + "/proveedor/" + proveedor.id).subscribe(function (response) {
                _this.loadingService.hide();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__articulo_proveedores_articulo_proveedores__["a" /* ArticuloProveedoresPage */], { productos: response, proveedor: proveedor });
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
        //
    };
    ProveedorPage.prototype.buscarPorPalabra = function () {
        var _this = this;
        this.proveedores = this.proveedoresReplica;
        this.proveedores = this.proveedores.filter(function (item) { return item.nombre.toUpperCase().includes(_this.palabra.toUpperCase()); });
    };
    ProveedorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-recuperar-password',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/recuperar-password/recuperar-password.html"*/'<ion-header>\n    <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n        <ion-title>Proveedores</ion-title>\n    </ion-navbar>\n    <div class="busca" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n            <input type="text" [(ngModel)]="palabra" placeholder="Escribe aquí tu búsqueda" (keyup)="buscarPorPalabra()">\n          </div>\n</ion-header>\n\n<ion-content>\n    <div class="spinner-carrito" *ngIf="proveedores && proveedores.length <= 0">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of proveedores; let i = index">\n        <!-- <div class="tacha">\n                      <div class="mini-tacha">\n                          <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                          <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                      </div>\n                    </div> -->\n        <div class="container-card" (click)="viewDetailAll(p)">\n\n            <img src="{{env.getImagenIndividual}}{{p.adjuntoId}}" *ngIf="p.adjuntoId" />\n            <img src="assets/imgs/menu/arrows.png" *ngIf="!p.adjuntoId" />\n        </div>\n        <div class="container-text" (click)="viewDetailAll(p)">{{p.nombre}}</div>\n        <div class="description" (click)="viewDetailAll(p)"><strong>Empresa</strong></div>\n        <div class="precio" (click)="viewDetailAll(p)" *ngIf="p.empresa">{{p.empresa.nombre}}</div>\n        <div class="precio" (click)="viewDetailAll(p)" *ngIf="!p.empresa">-</div>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/recuperar-password/recuperar-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_0__services_loading_service__["a" /* LoadingService */]])
    ], ProveedorPage);
    return ProveedorPage;
}());

//# sourceMappingURL=recuperar-password.js.map

/***/ }),

/***/ 224:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 224;

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DocumentosPage = /** @class */ (function () {
    function DocumentosPage(navCtrl, navParams, genericService, alertaService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.documentos = [];
        this.documentosTmp = [];
        this.documentosTmp.push({
            documentoId: 1,
            nombre: "IFE",
            adjuntoId: null,
            usuarioDocumentoId: null,
            imagen: null
        });
        this.documentosTmp.push({
            documentoId: 2,
            nombre: "Comprobante de domicilio",
            adjuntoId: null,
            usuarioDocumentoId: null,
            imagen: null
        });
        this.documentosTmp.push({
            documentoId: 3,
            nombre: "Estado de cuenta",
            adjuntoId: null,
            usuarioDocumentoId: null,
            imagen: null
        });
        this.documentosTmp.push({
            documentoId: 4,
            nombre: "Foto de la fachada",
            adjuntoId: null,
            usuarioDocumentoId: null,
            imagen: null
        });
    }
    DocumentosPage.prototype.ionViewDidLoad = function () {
        this.cargarDocs();
    };
    DocumentosPage.prototype.cargarDocs = function () {
        var _this = this;
        this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].usuarioDocumentos).subscribe(function (response) {
            console.log(response);
            _this.documentos = response;
            if (_this.documentos.length <= 0) {
                //this.documentos = null;
                _this.documentos = _this.documentosTmp;
                console.log(_this.documentos);
            }
        }, function (error) {
            var err = error.error;
            _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    DocumentosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-documentos',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages-proveedor/documentos/documentos.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>Documentos</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <div class="spinner-carrito" *ngIf="!documentos || documentos.length <= 0">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <ion-list *ngIf="documentos && documentos?.length > 0">\n      <ion-item class="item-list-card" *ngFor="let d of documentos" (click)="viewDetail(p)">\n        <ion-avatar slot="start">\n            <img src="assets/imgs/menu/file.png" alt="" *ngIf="!d.usuarioDocumentoId">\n            <img src="{{d.imagen}}" alt="" *ngIf="d.usuarioDocumentoId">\n        </ion-avatar>\n        <div class="datos-tarjetas" style="vertical-align: top;">\n            <div class="name" style="font-size:14px">Documento</div>\n            <div class="name" style="font-size:14px"><strong>{{d.nombre}}</strong></div>\n        </div>\n  \n      </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages-proveedor/documentos/documentos.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_alerta_service__["a" /* AlertaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_alerta_service__["a" /* AlertaService */]) === "function" && _d || Object])
    ], DocumentosPage);
    return DocumentosPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=documentos.js.map

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"pages/alta-direcciones/alta-direcciones.module": [
		997,
		2
	],
	"pages/recibo-pago/recibo-pago.module": [
		998,
		1
	],
	"pages/termino-servicio/termino-servicio.module": [
		999,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 269;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AcercaDePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_version__ = __webpack_require__(405);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AcercaDePage = /** @class */ (function () {
    function AcercaDePage(navCtrl, navParams, genericService, appVersion) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.appVersion = appVersion;
        this.version = "1.0.0";
        this.anio = "2020";
    }
    AcercaDePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.appVersion.getAppName();
        this.appVersion.getPackageName();
        this.appVersion.getVersionCode();
        this.appVersion.getVersionNumber().then(function (res) {
            _this.version = res;
        });
        this.anio = new Date().getFullYear();
    };
    AcercaDePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-acerca-de',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/acerca-de/acerca-de.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Acerca de</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="animated fadeIn acerca">\n    <div>\n      <img src="assets/imgs/logo.png" alt="">\n    </div>\n    <strong [ngStyle]="{\'color\':genericService.getColorHex()}">Luegoluego</strong> \n\n    <div>\n      Version\n\n    </div>\n    <strong [ngStyle]="{\'color\':genericService.getColorHex()}">{{version}}</strong>\n\n    <div>Desarrollado por</div>\n    <img src="assets/imgs/Logo-SharkTech.png" alt="">\n\n    <div><strong [ngStyle]="{\'color\':genericService.getColorHex()}">© Copyright {{anio}}</strong></div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/acerca-de/acerca-de.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_version__["a" /* AppVersion */]])
    ], AcercaDePage);
    return AcercaDePage;
}());

//# sourceMappingURL=acerca-de.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AyudaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AyudaPage = /** @class */ (function () {
    function AyudaPage(navCtrl, navParams, genericService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
    }
    AyudaPage.prototype.ionViewDidLoad = function () {
    };
    AyudaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-ayuda',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/ayuda/ayuda.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Ayuda</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="texto">Utiliza nuestros siguientes medios de contacto</div>\n\n  <div class="separado">\n    <div>Telefono: <a href="tel:+527222222222">7222222222</a></div>\n\n    <div>Correo: <a href="mailto:cuenta@deemail.com">cuenta@deemail.com</a></div>\n  </div>\n\n  <div class="separado-icons">\n      <div class="icono"><img src="assets/imgs/ayuda/wats.png" alt=""></div>\n\n      <div class="icono"><img src="assets/imgs/ayuda/logo.png" alt=""></div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/ayuda/ayuda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__services_generic_service__["a" /* GenericService */]])
    ], AyudaPage);
    return AyudaPage;
}());

//# sourceMappingURL=ayuda.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CambioContraseniaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CambioContraseniaPage = /** @class */ (function () {
    function CambioContraseniaPage(navCtrl, navParams, genericService, loadingService, alertaService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.loadingService = loadingService;
        this.alertaService = alertaService;
        this.data = {
            contrasenia: "",
            confirm: ""
        };
    }
    CambioContraseniaPage.prototype.ionViewDidLoad = function () {
    };
    CambioContraseniaPage.prototype.cambio = function () {
        var _this = this;
        if (!this.data.confirm.toString().match(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/)) {
            this.alertaService.warnAlertGeneric('Contraseña inválida. La contraseña debe contener mínimo 8 caracteres, por lo menos un valor numérico y mínimo un símbolo.');
        }
        else if (this.data.confirm.toString().length < 8) {
            this.alertaService.warnAlertGeneric('Contraseña inválida. La contraseña debe contener mínimo 8 caracteres, por lo menos un valor numérico y mínimo un símbolo.');
        }
        else {
            this.loadingService.show().then(function () {
                var body = {
                    currentPassword: _this.data.contrasenia,
                    newPassword: _this.data.confirm
                };
                _this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].cambioContraseña, body).subscribe(function (response) {
                    _this.alertaService.successAlertGeneric("Su contraseña cambio exitosamente");
                    //this.verificarCarritoModificarCantidad(producto);
                    _this.loadingService.hide();
                }, function (error) {
                    _this.alertaService.errorAlertGeneric(error.error.title);
                    _this.loadingService.hide();
                });
            });
        }
    };
    CambioContraseniaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-cambio-contrasenia',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/cambio-contrasenia/cambio-contrasenia.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Cambio contraseña</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="correo">\n    <div [ngStyle]="{\'color\': genericService.getColorHex()}">Contraseña</div>\n    <input type="password" placeholder="Ingresa aqui" [(ngModel)]="data.contrasenia">\n    <div [ngStyle]="{\'color\': genericService.getColorHex()}" style="margin-top:10px">Confirmar contraseña</div>\n    <input type="password" placeholder="Confirma" [(ngModel)]="data.confirm">\n  </div>\n  <button class="boton" [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="cambio()">\n    Cambiar contraseña\n  </button>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/cambio-contrasenia/cambio-contrasenia.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */]])
    ], CambioContraseniaPage);
    return CambioContraseniaPage;
}());

//# sourceMappingURL=cambio-contrasenia.js.map

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_validation_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_action_sheet__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__home_geo_proveedores_home_geo_proveedores__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var PerfilPage = /** @class */ (function () {
    function PerfilPage(navCtrl, navParams, formBuilder, localStorageEncryptService, camera, translatePipe, actionSheet, alertaService, genericService, loadingService, events, modalController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.localStorageEncryptService = localStorageEncryptService;
        this.camera = camera;
        this.translatePipe = translatePipe;
        this.actionSheet = actionSheet;
        this.alertaService = alertaService;
        this.genericService = genericService;
        this.loadingService = loadingService;
        this.events = events;
        this.modalController = modalController;
        this.photo_url = null;
        this.selectOptions = {
            cssClass: 'action-sheet-class'
        };
        //this.objetoRegistro[0].value = 
        this.objetoRegistro = [
            {
                name: "Nombre del cliente",
                required: true,
                length: 50,
                type: "text",
                formName: "name",
                value: null
            },
            {
                name: "Apellido paterno",
                required: true,
                length: 50,
                type: "text",
                formName: "ap",
                value: null
            },
            {
                name: "Apellido materno",
                required: true,
                length: 50,
                type: "text",
                formName: "am",
                value: null
            },
            {
                name: "Fecha de nacimiento",
                required: true,
                length: 10,
                type: "date",
                formName: "fecha",
                value: null
            },
            {
                name: "Teléfono",
                required: true,
                length: 10,
                type: "number",
                formName: "tel",
                value: null
            },
            {
                name: "Género",
                required: true,
                length: 11,
                type: "select",
                formName: "sex",
                value: 0,
                opts: [
                    {
                        id: 0,
                        value: "[--Selecciona--]"
                    },
                    {
                        id: "M",
                        value: "Hombre"
                    },
                    {
                        id: "F",
                        value: "Mujer"
                    }
                ]
            }
        ];
        this.options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.formGroup = null;
        this.btnHabilitado = true;
        this.user = null;
        this.userResponse = null;
        this.env = __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */];
        this.data = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.getDataUsuario();
        this.events.subscribe("reloadUser", function (data) {
            try {
                _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            }
            catch (error) {
            }
        });
    }
    PerfilPage.prototype.ionViewDidLoad = function () {
        __WEBPACK_IMPORTED_MODULE_12_moment__["locale"]("ES");
    };
    PerfilPage.prototype.getDataUsuario = function () {
        var _this = this;
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].users + "/" + _this.user.username).subscribe(function (response) {
                _this.objetoRegistro[0].value = response.firstName;
                _this.objetoRegistro[1].value = response.lastName;
                _this.objetoRegistro[2].value = response.motherLastName;
                _this.objetoRegistro[3].value = __WEBPACK_IMPORTED_MODULE_12_moment__(response.fechaNacimiento, "DD/MM/YYYY").toDate().toISOString();
                _this.objetoRegistro[4].value = response.telefono;
                _this.objetoRegistro[5].value = response.genero;
                if (__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].perfil.activo == 2) {
                    _this.objetoRegistro.push({
                        name: "Tipo persona",
                        required: true,
                        length: 11,
                        type: "select",
                        formName: "typpe",
                        value: response.tipoPersonaId,
                        opts: [
                            {
                                id: 0,
                                value: "[--Tipo persona--]"
                            },
                            {
                                id: 1,
                                value: "Persona física"
                            },
                            {
                                id: 2,
                                value: "Persona moral"
                            }
                        ]
                    });
                    _this.objetoRegistro.push({
                        name: "Razón Social",
                        required: true,
                        length: 50,
                        type: "text",
                        formName: "rz",
                        value: response.razonSocial
                    });
                    _this.objetoRegistro.push({
                        name: "Dirección",
                        required: true,
                        length: 200,
                        type: "text",
                        formName: "direc",
                        value: response.direccion ? response.direccion.direccion : null,
                        disabled: true
                    });
                    _this.data = response.direccion ? response.direccion : null;
                }
                _this.userResponse = response;
                var putObj = {};
                _this.objetoRegistro.forEach(function (item) {
                    var tmp = [];
                    tmp[0] = null;
                    tmp[1] = [];
                    if (item.required) {
                        tmp[1].push(__WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required);
                    }
                    if (item.type == "number") {
                        tmp[1].push(__WEBPACK_IMPORTED_MODULE_10__services_validation_service__["a" /* ValidationService */].phoneValidator);
                        tmp[1].push(__WEBPACK_IMPORTED_MODULE_10__services_validation_service__["a" /* ValidationService */].maxLengthValidator);
                        tmp[1].push(__WEBPACK_IMPORTED_MODULE_10__services_validation_service__["a" /* ValidationService */].minLengthValidator);
                    }
                    if (item.type == "email") {
                        tmp[1].push(__WEBPACK_IMPORTED_MODULE_10__services_validation_service__["a" /* ValidationService */].emailValidator);
                    }
                    if (item.type == "password") {
                        tmp[1].push(__WEBPACK_IMPORTED_MODULE_10__services_validation_service__["a" /* ValidationService */].passwordValidator);
                    }
                    if (item.type == "select") {
                        tmp[0] = item.opts[0].value;
                    }
                    putObj[item.formName] = tmp;
                });
                _this.formGroup = _this.formBuilder.group(putObj);
                _this.btnHabilitado = false;
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
    };
    PerfilPage.prototype.cambiarPerfil = function () {
        var _this = this;
        this.loadingService.show().then(function () {
            /**
             this.objetoRegistro[0].value = response.firstName;
              this.objetoRegistro[1].value = response.lastName;
              this.objetoRegistro[2].value = response.motherLastName;
              this.objetoRegistro[3].value = moment(response.fechaNacimiento, "DD/MM/YYYY").toDate().toISOString();
              this.objetoRegistro[4].value = response.telefono;
              this.objetoRegistro[5].value = response.genero;
             */
            var body = {
                login: _this.user.username,
                firstName: _this.objetoRegistro[0].value,
                lastName: _this.objetoRegistro[1].value,
                motherLastName: _this.objetoRegistro[2].value,
                telefono: _this.objetoRegistro[4].value,
                genero: _this.objetoRegistro[5].value,
                fechaNacimiento: __WEBPACK_IMPORTED_MODULE_12_moment__(_this.objetoRegistro[3].value.split("T")[0], "YYYY-MM-DD").format("DD/MM/YYYY"),
                adjunto: _this.photo_url == null || _this.photo_url == "null" ? null : {
                    contentType: "image/jpeg",
                    file: _this.photo_url,
                    fileName: Math.floor(new Date().getTime() / 1000.0).toString(),
                    size: 0
                },
            };
            if (__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].perfil.activo == 2) {
                body.direccion = {
                    codigoPostal: _this.data.codigoPostal,
                    direccion: _this.data.direccion,
                    latitud: _this.data.latitud,
                    longitud: _this.data.longitud
                };
                body.tipoPersonaId = _this.objetoRegistro[6].value;
                body.razonSocial = _this.objetoRegistro[7].value;
            }
            _this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].usuarios, body).subscribe(function (response) {
                _this.alertaService.successAlertGeneric("Perfil modificado con éxito");
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                _this.alertaService.errorAlertGeneric("No se ha podido modificar tu perfil, intenta nuevamente");
            });
        });
    };
    /**Verifica validaciones */
    PerfilPage.prototype.ejecutaValidator = function () {
        var validacion = 0;
        for (var name in this.formGroup.controls) {
            var n = this.formGroup.controls[name];
            if (n.value === 0) {
                validacion++;
            }
            if (n.errors) {
                validacion++;
            }
            /*
            if (n.value && (n.value === 0 || n.value.length === 0) && n.invalid) {
              invalid.push(this.translatePipe.instant(String(name).toUpperCase()));
              fields += `${this.translatePipe.instant(String(name).toUpperCase())}, `;
            } */
        }
        if (validacion <= 0) {
            this.btnHabilitado = false;
        }
        else {
            this.btnHabilitado = true;
        }
    };
    PerfilPage.prototype.opcionesDeImagen = function () {
        var _this = this;
        var buttonLabels = [this.translatePipe.instant("CAPTURE"), this.translatePipe.instant("SELECT")];
        var options = {
            title: '',
            subtitle: '',
            buttonLabels: buttonLabels,
            addCancelButtonWithLabel: this.translatePipe.instant("CANCEL"),
            addDestructiveButtonWithLabel: this.translatePipe.instant("DELETE"),
            androidTheme: 1,
            destructiveButtonLast: true
        };
        this.actionSheet.show(options).then(function (buttonIndex) {
            switch (buttonIndex) {
                case 1:
                    _this.takeFoto();
                    break;
                case 2:
                    _this.seleccionaImagen();
                    break;
                case 3:
                    _this.photo_url = null;
                    break;
            }
        });
    };
    PerfilPage.prototype.takeFoto = function () {
        var _this = this;
        this.options.sourceType = this.camera.PictureSourceType.CAMERA;
        this.camera.getPicture(this.options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            _this.photo_url = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    PerfilPage.prototype.seleccionaImagen = function () {
        var _this = this;
        this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        this.camera.getPicture(this.options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            _this.photo_url = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    PerfilPage.prototype.getMapa = function () {
        var _this = this;
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_13__home_geo_proveedores_home_geo_proveedores__["a" /* HomeGeoProveedoresPage */], { fromModal: true, fromRegister: true });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                if (data != null) {
                    console.log(data.data);
                    _this.data = data.data;
                    _this.objetoRegistro[_this.objetoRegistro.length - 1].value = _this.data.direccion;
                    /*this.objetoRegistro[4].value = this.data.codigoPostal; */
                    setTimeout(function () {
                        _this.ejecutaValidator();
                    }, 1000);
                }
            }
        });
    };
    PerfilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-perfil',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/perfil/perfil.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Mi perfil</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n\n  <div class="contenedor-step-3">\n    <div class="sub-contenedor">\n      <div class="avatar">\n        <div class="imagen" (tap)="opcionesDeImagen()">\n          <img src="assets/imgs/perfil/social-media.png" alt="" *ngIf="!photo_url">\n          <img src="{{photo_url}}" alt="" *ngIf="photo_url && !userResponse || !userResponse?.adjuntoId">\n          <img src="{{env.getImagenIndividual}}{{p.adjuntoId}}" alt="" *ngIf="userResponse && userResponse.adjuntoId">\n        </div>\n      </div>\n\n      <div class="formulario" *ngIf="formGroup">\n        <form [formGroup]="formGroup">\n          <div *ngFor="let dato of objetoRegistro;let i = index" class="contenedor-input">\n\n            <input class="inp" [attr.disabled]="dato.disabled ? \'\' : null" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}"\n              type="{{dato.type}}" [(ngModel)]="dato.value" maxlength="{{dato.length}}" *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\'"\n              [ngStyle]="{\'width\': dato.name == \'Dirección\' ? \'88%\' : \'100%\'}">\n            <div class="direc" *ngIf="dato.name == \'Dirección\'" (click)="getMapa()" style="display: inline-block;\n                width: 10%;\n                vertical-align: bottom;"><img\n                src="assets/imgs/direcciones/home-run.png" alt=""></div>\n            <ion-datetime class="dt" [(ngModel)]="dato.value" formControlName="{{dato.formName}}" text-left\n              pickerFormat="DD/MM/YYYY" cancelText="Cancelar" doneText="Aceptar" #fechaNac (ionChange)="ejecutaValidator()"\n              *ngIf="dato.type == \'date\'" placeholder="01/12/2020"></ion-datetime>\n\n            <ion-col col-2 class="text-center" *ngIf="dato.type == \'checkbox\'">\n              <ion-checkbox formControlName="{{dato.formName}}" [(ngModel)]="dato.value" (ionChange)="ejecutaValidator()">\n              </ion-checkbox>\n            </ion-col>\n\n            <ion-select *ngIf="dato.type == \'select\'" [(ngModel)]="dato.value" okText="Ok" cancelText="Cancelar"\n              interface="action-sheet" (ionChange)="ejecutaValidator()" [selectOptions]="selectOptions" formControlName="{{dato.formName}}">\n              <ion-option *ngFor="let op of dato.opts" [value]="op.id">\n                {{op.value}}\n              </ion-option>\n            </ion-select>\n\n            <app-control-messages [control]="formGroup.controls[dato.formName]" [clase]="\'validators2\'">\n            </app-control-messages>\n          </div>\n          <div class="contenedor-boton">\n            <button [disabled]="btnHabilitado" (click)="cambiarPerfil()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Registrarme</button>\n          </div>\n        </form>\n\n      </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/perfil/perfil.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_11__ionic_native_action_sheet__["a" /* ActionSheet */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__ionic_native_action_sheet__["a" /* ActionSheet */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__services_generic_service__["a" /* GenericService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_generic_service__["a" /* GenericService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_2__services_loading_service__["a" /* LoadingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_loading_service__["a" /* LoadingService */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* ModalController */]) === "function" && _m || Object])
    ], PerfilPage);
    return PerfilPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
}());

//# sourceMappingURL=perfil.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetalleProductoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_photoswipe__ = __webpack_require__(687);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_photoswipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_photoswipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_photoswipe_dist_photoswipe_ui_default__ = __webpack_require__(688);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_photoswipe_dist_photoswipe_ui_default___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_photoswipe_dist_photoswipe_ui_default__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_auth_service__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var DetalleProductoPage = /** @class */ (function () {
    function DetalleProductoPage(navCtrl, navParams, genericService, localStorageEncryptService, auth, events, loadingService, alertaService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.auth = auth;
        this.events = events;
        this.loadingService = loadingService;
        this.alertaService = alertaService;
        this.producto = null;
        this.productosTemp = [];
        this.verDescripcion = true;
        this.user = null;
        this.color = "#3b64c0";
        this.producto = navParams.get("producto");
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.producto.photos = [];
        if (this.producto.imagenes) {
            this.producto.imagenes.forEach(function (element) {
                _this.producto.photos.push({
                    id: element.id,
                    img: "data:image/jpeg;base64," + element.file
                });
            });
        }
        if (!this.producto.cantidad) {
            this.producto.cantidad = 1;
            this.producto.first = true;
        }
        this.events.subscribe("actualizarCantidad", function (data) {
            try {
                _this.actualizarCantidad();
            }
            catch (error) {
            }
        });
        this.events.subscribe("reloadUser", function (data) {
            try {
                _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            }
            catch (error) {
            }
        });
        if (this.localStorageEncryptService.getFromLocalStorage("theme")) {
            this.color = this.localStorageEncryptService.getFromLocalStorage("theme");
        }
        this.events.subscribe("changeColor", function (data) {
            try {
                if (_this.localStorageEncryptService.getFromLocalStorage("theme")) {
                    _this.color = _this.localStorageEncryptService.getFromLocalStorage("theme");
                }
            }
            catch (error) {
            }
        });
    }
    DetalleProductoPage.prototype.actualizarCantidad = function () {
        var _this = this;
        var carritos = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        var position = carritos.findIndex(function (carrito) {
            return carrito.id == _this.producto.id;
        });
        if (position >= 0) {
            this.producto.cantidad = carritos[position].cantidad;
        }
    };
    /**Métodos de navegacion del slide */
    DetalleProductoPage.prototype.next1 = function () {
        this.slider2.slideNext();
    };
    DetalleProductoPage.prototype.prev1 = function () {
        this.slider2.slidePrev();
    };
    DetalleProductoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.producto.photos.forEach(function (phot) {
            var img = new Image();
            img.src = phot.img;
            img.onload = function () {
                _this.productosTemp.push({ img: phot.img, w: img.width, h: img.height, i: phot.id });
            };
        });
    };
    DetalleProductoPage.prototype.regresar = function () {
        var id = document.getElementById("icn-p");
        id.style.display = "none";
        this.navCtrl.pop();
    };
    DetalleProductoPage.prototype.imagesLoaded = function (i) {
        var pswpElement = document.querySelectorAll('.pswp')[0];
        this.productosTemp.sort(function (a, b) { return (a.i > b.i) ? 1 : -1; });
        // build items array
        var items = [];
        this.productosTemp.forEach(function (photo) {
            items.push({ src: photo.img, w: photo.w, h: photo.h });
        });
        // define options (if needed)
        var options = {
            // optionName: 'option value'
            // for example:
            index: i // start at first slide
        };
        // Initializes and opens PhotoSwipe
        this.gallery = new __WEBPACK_IMPORTED_MODULE_7_photoswipe___default.a(pswpElement, __WEBPACK_IMPORTED_MODULE_8_photoswipe_dist_photoswipe_ui_default__, items, options);
        this.gallery.init();
    };
    DetalleProductoPage.prototype.verDes = function () {
        this.verDescripcion = !this.verDescripcion;
    };
    DetalleProductoPage.prototype.incrementa = function (p) {
        var bandera = false;
        if (p.cantidad) {
            p.cantidad++;
        }
        else if (p.cantidad == 0) {
            p.cantidad = 1;
            bandera = true;
        }
        else {
            p.cantidad = 1;
            bandera = true;
        }
        //this.agregarToCarritoBack(bandera, p);
    };
    DetalleProductoPage.prototype.agregarToCarritoBack = function (bandera, producto) {
        var body = {
            precio: producto.precio,
            productoId: producto.id
        };
        var service = this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].carritoCompras, body);
        if (producto.cantidad > 1) {
            body.cantidad = producto.cantidad;
            service = this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].carritoCompras, body);
        }
        service.subscribe(function (response) {
            if (bandera) {
                //this.agregarToCarrito(producto);
            }
            //this.verificarCarritoModificarCantidad(producto);
        }, function (error) {
            //producto.cantidad--;
            if (producto.cantidad == 1) {
                producto.cantidad = 1;
            }
            else {
                producto.cantidad--;
            }
        });
    };
    DetalleProductoPage.prototype.decrementar = function (p) {
        if (p.cantidad > 1) {
            p.cantidad--;
            this.borrarToCarritoBack(p);
        }
    };
    DetalleProductoPage.prototype.borrarToCarritoBack = function (producto) {
        var _this = this;
        var body = {
            precio: producto.precio,
            productoProveedorId: producto.id
        };
        body.cantidad = producto.cantidad;
        this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].carritoCompras, body).subscribe(function (response1) {
            if (producto.cantidad == 0) {
                _this.genericService.sendDeleteRequest(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].carritoCompras + "/" + producto.id).subscribe(function (response2) {
                    if (producto.cantidad == 0) {
                        _this.producto = 1;
                        //this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
                    }
                    _this.verificarCarritoModificarCantidad(producto);
                }, function (error) {
                    producto.cantidad++;
                });
            }
            else {
                _this.verificarCarritoModificarCantidad(producto);
            }
        }, function (error) {
            producto.cantidad++;
        });
    };
    DetalleProductoPage.prototype.agregarCarrito = function (producto) {
        var _this = this;
        this.loadingService.show().then(function () {
            //this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
            if (_this.user) {
                var carritos = _this.localStorageEncryptService.getFromLocalStorage("" + _this.user.id_token);
                var body_1 = {
                    precio: producto.precio,
                    productoProveedorId: producto.id
                };
                var b = false;
                var position = void 0;
                if (!carritos) {
                    position = -1;
                }
                else {
                    position = carritos.findIndex(function (carrito) {
                        return carrito.id == producto.id;
                    });
                }
                body_1.cantidad = producto.cantidad;
                if (position >= 0) {
                    _this.updateCarrito(producto, body_1);
                }
                else {
                    _this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].carritoCompras, body_1).subscribe(function (response) {
                        body_1.cantidad = producto.cantidad;
                        _this.alertaService.successAlertGeneric("Tu articulo se agregó al carrito con éxito");
                        _this.updateCarrito(producto, body_1);
                        //this.verificarCarritoModificarCantidad(producto);
                    }, function (error) {
                        _this.alertaService.errorAlertGeneric(error.error.title);
                        if (producto.cantidad == 1) {
                            producto.cantidad = 1;
                        }
                        else {
                            producto.cantidad--;
                        }
                        _this.loadingService.hide();
                    });
                }
            }
            else {
                _this.auth.events.publish("startSession");
            }
        });
    };
    DetalleProductoPage.prototype.updateCarrito = function (producto, body) {
        var _this = this;
        this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].carritoCompras, body).subscribe(function (response) {
            _this.loadingService.hide();
            _this.verificarCarritoModificarCantidad(producto);
        }, function (error) {
            _this.loadingService.hide();
            if (producto.cantidad == 1) {
                producto.cantidad = 1;
            }
            else {
                producto.cantidad--;
            }
        });
    };
    DetalleProductoPage.prototype.verificarCarritoModificarCantidad = function (element) {
        var productosStorage = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        if (!productosStorage) {
            productosStorage = [];
            productosStorage.push(element);
        }
        else {
            var position = productosStorage.findIndex(function (carrito) {
                return carrito.id == element.id;
            });
            if (position >= 0) {
                productosStorage[position].cantidad = element.cantidad;
            }
            else {
                productosStorage.push(element);
            }
        }
        this.localStorageEncryptService.setToLocalStorage("" + this.user.id_token, productosStorage);
        this.events.publish("totalCarrito");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["_8" /* ViewChild */])('slides2'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["p" /* Slides */])
    ], DetalleProductoPage.prototype, "slider2", void 0);
    DetalleProductoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'page-detalle-producto',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/detalle-producto/detalle-producto.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>{{producto.producto.nombre}}</ion-title>\n\n\n\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="compartir()">\n        <ion-icon name="md-share" style="font-size: 2.4rem;"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <div class="slider-io animated bounceInLeft" *ngIf="producto.photos.length > 0">\n    <ion-slides autoplay="5000" zoom="true" loop="true" #slides2 loop="false">\n      <ion-slide *ngFor="let photo of producto.photos; let i=index" (click)="imagesLoaded(i)">\n        <div>\n          <img src="{{photo.img}}" alt="">\n          <div class="div-foto">\n            <ion-icon ios="ios-images-outline" md="ios-images-outline"></ion-icon>\n            <p>{{i+1}}/{{producto.photos.length}}</p>\n          </div>\n        </div>\n      </ion-slide>\n    </ion-slides>\n    <div class="arrows-lateral" *ngIf="1===2">\n      <div (tap)="prev1()">\n        <ion-icon ios="ios-arrow-back" md="ios-arrow-back"></ion-icon>\n      </div>\n      <div (tap)="next1()">\n        <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward"></ion-icon>\n      </div>\n    </div>\n  </div>\n\n  <div class="descripcion" [ngStyle]="{\'color\': color}">\n    {{producto.precio | currency}} MXN\n  </div>\n\n  <div class="space-desc">\n    <ion-icon name="ios-arrow-up-outline" *ngIf="verDescripcion" (click)="verDes()"></ion-icon>\n    <ion-icon name="ios-arrow-down-outline" *ngIf="!verDescripcion" (click)="verDes()"></ion-icon>\n    <h4>Descripción</h4>\n    <div class="descripcion-gral" *ngIf="verDescripcion">{{producto.producto.descripcion}}</div>\n  </div>\n\n\n\n  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true" style="z-index: 2;">\n\n    <!-- Background of PhotoSwipe. \n         It\'s a separate element, as animating opacity is faster than rgba(). -->\n    <div class="pswp__bg"></div>\n\n    <!-- Slides wrapper with overflow:hidden. -->\n    <div class="pswp__scroll-wrap">\n\n      <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->\n      <!-- don\'t modify these 3 pswp__item elements, data is added later on. -->\n      <div class="pswp__container">\n        <div class="pswp__item"></div>\n        <div class="pswp__item"></div>\n        <div class="pswp__item"></div>\n      </div>\n\n      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->\n      <div class="pswp__ui pswp__ui--hidden">\n\n        <div class="pswp__top-bar" style="opacity: 1;z-index: 99999999;" [ngStyle]="{\'top\': fixedContentTop == \'56\' ? \'56px\' : \'44px\'}">\n\n          <!--  Controls are self-explanatory. Order can be changed. -->\n\n          <div class="pswp__counter"></div>\n\n          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\n\n          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>\n\n          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\n\n          <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->\n          <!-- element will get class pswp__preloader--active when preloader is running -->\n          <div class="pswp__preloader">\n            <div class="pswp__preloader__icn">\n              <div class="pswp__preloader__cut">\n                <div class="pswp__preloader__donut"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\n          <div class="pswp__share-tooltip"></div>\n        </div>\n\n        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">\n        </button>\n\n        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">\n        </button>\n\n        <div class="pswp__caption">\n          <div class="pswp__caption__center"></div>\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n</ion-content>\n<ion-footer class="footer-detalle">\n  <div class="cont-e">\n    <div class="suma">\n      <div class="menos" (click)="decrementar(producto)" >\n        <div [ngStyle]="{\'color\': color, \'border-color\': color}">-</div>\n      </div>\n      <div class="cantidad" >\n        <div [ngStyle]="{\'color\': color}">{{producto.cantidad}} {{producto.cantidad == 1 ? \'pza\' : \'pzas\'}}</div>\n      </div>\n      <div class="mas" (click)="incrementa(producto)">\n        <div [ngStyle]="{\'color\': color, \'border-color\': color}">+</div>\n      </div>\n    </div>\n    <button (click)="agregarCarrito(producto)" [ngStyle]="{\'background-color\': color}">\n      Agregar a carrito\n    </button>\n  </div>\n</ion-footer>\n<!-- Root element of PhotoSwipe. Must have class pswp. -->'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/detalle-producto/detalle-producto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_9__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */]])
    ], DetalleProductoPage);
    return DetalleProductoPage;
}());

//# sourceMappingURL=detalle-producto.js.map

/***/ }),

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProblemasPedidoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProblemasPedidoPage = /** @class */ (function () {
    function ProblemasPedidoPage(navCtrl, navParams, genericService, localStorageEncryptService, alertaService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.alertaService = alertaService;
    }
    ProblemasPedidoPage.prototype.ionViewDidLoad = function () {
    };
    ProblemasPedidoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-problemas-pedido',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/problemas-pedido/problemas-pedido.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>Problemas con mi pedido</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n    \n  <div class="contened">\n    <div style="width: 100%;\n    text-align: center;">\n        <img style="width: 36%;" src="{{genericService.imgProblema()}}" alt="">\n    </div>\n    <button [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n      Deseo reportar una queja al Contact Center\n    </button>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/problemas-pedido/problemas-pedido.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__["a" /* AlertaService */]])
    ], ProblemasPedidoPage);
    return ProblemasPedidoPage;
}());

//# sourceMappingURL=problemas-pedido.js.map

/***/ }),

/***/ 542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecuperaContraseniaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RecuperaContraseniaPage = /** @class */ (function () {
    function RecuperaContraseniaPage(navCtrl, navParams, genericService, loadingService, alertaService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.loadingService = loadingService;
        this.alertaService = alertaService;
        this.correo = "";
    }
    RecuperaContraseniaPage.prototype.ionViewDidLoad = function () {
    };
    RecuperaContraseniaPage.prototype.cambio = function () {
        var _this = this;
        this.loadingService.show().then(function () {
            _this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].reset, _this.correo).subscribe(function (response) {
                _this.alertaService.successAlertGeneric("Siga las indicación que se enviaron a su correo " + _this.correo);
                //this.verificarCarritoModificarCantidad(producto);
                _this.loadingService.hide();
            }, function (error) {
                _this.alertaService.errorAlertGeneric(error.error.title);
                _this.loadingService.hide();
            });
        });
    };
    RecuperaContraseniaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-recupera-contrasenia',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/recupera-contrasenia/recupera-contrasenia.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Recuperar contraseña</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <div class="correo">\n    <div [ngStyle]="{\'color\': genericService.getColorHex()}">Correo electrónico</div>\n    <input type="text" placeholder="Ingresa aqui" [(ngModel)]="correo">\n  </div>\n  <button class="boton" [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="cambio()">\n    Recibir indicaciones\n  </button>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/recupera-contrasenia/recupera-contrasenia.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */]])
    ], RecuperaContraseniaPage);
    return RecuperaContraseniaPage;
}());

//# sourceMappingURL=recupera-contrasenia.js.map

/***/ }),

/***/ 543:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapaProveedoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__compara_precios_proveedor_compara_precios_proveedor__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_open_native_settings__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_android_permissions__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_leaflet__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_leaflet_knn__ = __webpack_require__(970);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_leaflet_knn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_leaflet_knn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__articulo_proveedores_articulo_proveedores__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_auth_service__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var MapaProveedoresPage = /** @class */ (function () {
    function MapaProveedoresPage(navCtrl, navParams, geolocation, genericService, loadingService, alertaService, alertCtrl, diagnostic, openNativeSettings, androidPermissions, platform, events, auth, localStorageEncryptService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.genericService = genericService;
        this.loadingService = loadingService;
        this.alertaService = alertaService;
        this.alertCtrl = alertCtrl;
        this.diagnostic = diagnostic;
        this.openNativeSettings = openNativeSettings;
        this.androidPermissions = androidPermissions;
        this.platform = platform;
        this.events = events;
        this.auth = auth;
        this.localStorageEncryptService = localStorageEncryptService;
        this.emulado = __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].emulado;
        this.muestraMapa = false;
        this.id = null;
        this.proveedoresTotal = [];
        this.proveedoresGeolocate = [];
        //public proveedores: any = [];
        this.producto = null;
        this.geo = null;
        this.proveedorActivo = null;
        this.env = __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */];
        this.user = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.proveedoresTotal = navParams.get("proveedores");
        this.producto = navParams.get("producto");
        this.geo = [];
        this.proveedoresTotal.forEach(function (proveedorT) {
            //this.proveedores.push(proveedor);
            _this.geo.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [proveedorT.proveedor.direccion.latitud, proveedorT.proveedor.direccion.longitud]
                },
                "properties": {
                    proveedor: proveedorT
                }
            });
        });
    }
    MapaProveedoresPage.prototype.ionViewDidLoad = function () {
        var claseTabs = document.getElementsByClassName("tabbar");
        claseTabs[0].style.display = "none";
        this.obtenerLocalizacion();
    };
    MapaProveedoresPage.prototype.ionViewWillLeave = function () {
        var claseTabs = document.getElementsByClassName("tabbar");
        claseTabs[0].style.display = "flex";
    };
    /**Método que obtiene la geolocalización del usuario
     * se utiliza al hacer click en el boton de posicionamiento
     */
    MapaProveedoresPage.prototype.obtenerLocalizacion = function () {
        //this.loadingService.show().then(() => {
        var _this = this;
        if (this.platform.is("android") && !this.emulado) {
            //debugger;
            this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(function (result) {
                //debugger;
                if (!result.hasPermission) {
                    _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(function (resReq) {
                        _this.loadingService.hide();
                    });
                }
                else {
                    _this.diagnostic.isLocationAvailable().then(function (res) {
                        //debugger;
                        if (!res) {
                            _this.loadingService.hide();
                            //debugger;
                            _this.openNativeSettings.open("location").then(function (res2) {
                                //debugger;
                                _this.loadingService.hide();
                                _this.diagnostic.isLocationAvailable().then(function (res) {
                                    //debugger;
                                    if (!res) {
                                        _this.loadingService.hide();
                                        //aqui apagar geolocation
                                        //this.selecciones.cercaDeMi = false;
                                    }
                                    else {
                                        //debugger;
                                        _this.getPosition();
                                    }
                                });
                            });
                        }
                        else {
                            _this.getPosition();
                        }
                    });
                }
            }, function (err) {
                _this.loadingService.hide();
                _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION);
            });
        }
        else if (this.platform.is("ios") && !this.emulado) {
            this.diagnostic.isLocationEnabled().then(function (resIOS) {
                _this.loadingService.hide();
                //alert(JSON.stringify(res));
                if (!resIOS) {
                    _this.loadingService.hide();
                    var alert_1 = _this.alertCtrl.create({
                        title: "<div class='notificacionError'>\n                <div><img class='headerImg' src='assets/imgs/alerts/success.png'/></div>\n                <div class='textoTitle'>Para acceder a \u00E9sta funci\u00F3n necesitas habilitar tu <strong>GPS</strong></div>\n                <div>",
                        message: null,
                        cssClass: _this.genericService.getColorClass(),
                        buttons: [
                            {
                                text: 'Cancelar',
                                handler: function () {
                                }
                            },
                            {
                                text: 'Aceptar',
                                handler: function () {
                                    _this.openLocate();
                                }
                            }
                        ]
                    });
                    alert_1.present();
                    alert_1.onDidDismiss(function (res) {
                    });
                }
                else {
                    _this.getPosition();
                }
            });
        }
        else {
            this.getPosition();
        }
        //});
    };
    /**Metodo que se ejecuta solo en ios para pedir abrir localizacion*/
    MapaProveedoresPage.prototype.openLocate = function () {
        var _this = this;
        this.loadingService.hide();
        //debugger;
        this.openNativeSettings.open("locations").then(function (res2) {
            //debugger;
            _this.diagnostic.isLocationEnabled().then(function (res) {
                //debugger;
                if (!res) {
                    //aqui apagar geolocation
                    //this.selecciones.cercaDeMi = false;
                }
                else {
                    //debugger;
                    _this.getPosition();
                }
            });
        });
    };
    MapaProveedoresPage.prototype.getPosition = function () {
        var _this = this;
        this.geolocation.getCurrentPosition()
            .then(function (response) {
            _this.loadMap(response);
        })
            .catch(function (error) {
        });
    };
    MapaProveedoresPage.prototype.loadMap = function (position) {
        var _this = this;
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        // create a new map by passing HTMLElement
        var mapEle = document.getElementById('map_canvas');
        var myLatLng = { lat: latitude, lng: longitude };
        var gj = __WEBPACK_IMPORTED_MODULE_12_leaflet___default.a.geoJson(this.geo);
        var nearest = __WEBPACK_IMPORTED_MODULE_13_leaflet_knn___default()(gj).nearest([latitude, longitude], 50, 5000); //punto de partida, estaciones máximas a encontrar, diámetro de busqueda en metros
        // create map
        this.map = new google.maps.Map(mapEle, {
            center: myLatLng,
            zoom: 15
        });
        this.muestraMapa = true;
        google.maps.event.addListenerOnce(this.map, 'idle', function () {
            nearest.forEach(function (item) {
                _this.proveedoresGeolocate.push(item.layer.feature.properties.proveedor);
                var ll = { lat: Number(item.lon), lng: Number(item.lat) };
                var info = "\n        <div>\n          <div style=\"    text-align: center;\n          font-weight: 700;\n          font-size: 19px;\n      \">" + item.layer.feature.properties.proveedor.proveedor.nombre + "</div>\n          <div style=\"width:100%; text-align: center\">\n            <div ><strong>Direcci\u00F3n</strong></div>\n            <div >" + item.layer.feature.properties.proveedor.proveedor.direccion.direccion + "</div>\n          </div>\n          <div style=\"width:100%; text-align: center\">\n            <div ><strong>Empresa</strong></div>\n            <div >" + item.layer.feature.properties.proveedor.proveedor.empresa.nombre + "</div>\n          </div>\n        </div>";
                var infowindow = new google.maps.InfoWindow({
                    content: info
                });
                var marker = new google.maps.Marker({
                    position: ll,
                    map: _this.map,
                    title: item.layer.feature.properties.proveedor.proveedor.nombre,
                    id: "" + item.layer.feature.properties.proveedor.id,
                    //draggable: true,
                    icon: __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].icons['proveedor'].icon
                });
                //this.map.setCenter(marker.position);
                marker.setMap(_this.map);
                var componente = _this;
                marker.addListener('click', function () {
                    infowindow.open(_this.map, marker);
                    componente.changeInfoCard(marker);
                });
            });
            mapEle.classList.add('show-map');
        });
    };
    MapaProveedoresPage.prototype.changeInfoCard = function (marker) {
        var position = this.proveedoresTotal.findIndex(function (carrito) {
            return carrito.id == marker.id;
        });
        this.proveedorActivo = this.proveedoresTotal[position];
    };
    MapaProveedoresPage.prototype.comparativa = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__compara_precios_proveedor_compara_precios_proveedor__["a" /* ComparaPreciosProveedorPage */], { proveedoresGeolocate: this.proveedoresGeolocate });
    };
    MapaProveedoresPage.prototype.viewDetailAll = function (proveedor) {
        var _this = this;
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].proveedorProductos + "/proveedor/" + proveedor.proveedorId).subscribe(function (response) {
                _this.loadingService.hide();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__articulo_proveedores_articulo_proveedores__["a" /* ArticuloProveedoresPage */], { productos: response, proveedor: proveedor });
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
        //
    };
    MapaProveedoresPage.prototype.agregarCarrito = function () {
        var _this = this;
        this.loadingService.show().then(function () {
            //this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
            if (_this.user) {
                var body_1 = {
                    precio: _this.proveedorActivo.precio,
                    productoProveedorId: _this.proveedorActivo.id,
                    cantidad: 1
                };
                _this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].carritoCompras, body_1).subscribe(function (response) {
                    body_1.cantidad = 1;
                    _this.loadingService.hide();
                    _this.alertaService.successAlertGeneric("Tu articulo se agregó al carrito con éxito");
                    _this.events.publish("totalCarrito");
                    //this.verificarCarritoModificarCantidad(producto);
                }, function (error) {
                    _this.alertaService.errorAlertGeneric(error.error.title);
                    _this.loadingService.hide();
                });
            }
            else {
                _this.auth.events.publish("startSession");
            }
        });
    };
    MapaProveedoresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-mapa-proveedores',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/mapa-proveedores/mapa-proveedores.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>{{producto.producto.nombre}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="spinner-carrito" *ngIf="!muestraMapa">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <div class="mapp">\n    <div id="map_canvas" class="mapita-google">\n\n    </div>\n    <button *ngIf="proveedorActivo" class="boton-mapa" [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="comparativa()">Comparar precios</button>\n  </div>\n\n  <div class="contenedor-card" *ngIf="proveedorActivo" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <div id="card-{{i}}" class="card animated lightSpeedIn">\n      <!-- <div class="tacha">\n                    <div class="mini-tacha">\n                        <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                        <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                    </div>\n                  </div> -->\n      <div class="container-card">\n\n        <img src="{{env.getImagenIndividual}}{{proveedorActivo.producto.adjuntoId}}" />\n      </div>\n      <div class="container-text">{{proveedorActivo.producto.nombre}}</div>\n      <div class="description">{{proveedorActivo.producto.descripcion}}</div>\n      <div class="precio">{{proveedorActivo.precio | currency}}</div>\n\n      <!-- <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n        <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">-</div>\n        </div>\n        <div class="cantidad" *ngIf="p.cantidad > 0">\n          <div [ngStyle]="{\'color\': genericService.getColorHex()}">{{p.cantidad}}</div>\n        </div>\n        <div class="mas" (click)="incrementa(p)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">+</div>\n        </div>\n      </div> -->\n    </div>\n    <div class="informa">\n      <div class="nombre">{{proveedorActivo.proveedor.nombre}}</div>\n\n      <div class="ofrece">A tu servicio: </div>\n      <div class="nombre">{{proveedorActivo.proveedor.empresa.nombre}}</div>\n\n      <div class="ofrece">Estamos ubicados en</div>\n      <div class="nombre">{{proveedorActivo.proveedor.direccion.direccion}}</div>\n      <div class="nombre" *ngIf="proveedorActivo.proveedor.direccion.colonia">col.\n        {{proveedorActivo.proveedor.direccion.colonia}}</div>\n      <div class="nombre">{{proveedorActivo.proveedor.direccion.codigoPostal}}</div>\n    </div>\n\n    <div class="todos" (click)="viewDetailAll(proveedorActivo)">Ver todos</div>\n    <div class="logo"><img src="assets/imgs/logo.png" alt=""></div>\n  </div>\n</ion-content>\n\n<ion-footer class="footer-detalle" *ngIf="proveedorActivo" style="box-shadow: none;">\n  <div class="cont-e">\n    <!-- <div class="suma">\n        <div class="menos" (click)="decrementar(producto)" >\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">-</div>\n        </div>\n        <div class="cantidad" >\n          <div [ngStyle]="{\'color\': genericService.getColorHex()}">{{producto.cantidad}} {{producto.cantidad == 1 ? \'pza\' : \'pzas\'}}</div>\n        </div>\n        <div class="mas" (click)="incrementa(producto)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">+</div>\n        </div>\n      </div> -->\n    <button style="width:100%" (click)="agregarCarrito()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n      Agregar a carrito\n    </button>\n  </div>\n</ion-footer>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/mapa-proveedores/mapa-proveedores.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_4__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_5__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_6__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_open_native_settings__["a" /* OpenNativeSettings */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_15__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]])
    ], MapaProveedoresPage);
    return MapaProveedoresPage;
}());

//# sourceMappingURL=mapa-proveedores.js.map

/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComparaPreciosProveedorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__detalle_producto_detalle_producto__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ComparaPreciosProveedorPage = /** @class */ (function () {
    function ComparaPreciosProveedorPage(navCtrl, navParams, genericService, alertaService, loadingService, localStorageEncryptService, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.proveedoresGeolocate = null;
        this.proveedoresGeolocateReplica = null;
        this.env = __WEBPACK_IMPORTED_MODULE_0__environments_environment_prod__["a" /* environment */];
        this.palabra = "";
        this.proveedoresGeolocate = navParams.get("proveedoresGeolocate");
        this.proveedoresGeolocateReplica = this.proveedoresGeolocate;
    }
    ComparaPreciosProveedorPage.prototype.ionViewDidLoad = function () {
    };
    ComparaPreciosProveedorPage.prototype.buscarPorPalabra = function () {
        var _this = this;
        this.proveedoresGeolocate = this.proveedoresGeolocateReplica;
        this.proveedoresGeolocate = this.proveedoresGeolocate.filter(function (item) { return item.proveedor.nombre.toUpperCase().includes(_this.palabra.toUpperCase()); });
    };
    ComparaPreciosProveedorPage.prototype.viewDetail = function (producto) {
        var _this = this;
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_0__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.productoId).subscribe(function (response) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { producto: response });
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
        //
    };
    ComparaPreciosProveedorPage.prototype.up = function () {
        this.proveedoresGeolocate = this.proveedoresGeolocateReplica;
        this.proveedoresGeolocate.sort(function (mayor, menor) {
            return mayor.precio - menor.precio;
        });
    };
    ComparaPreciosProveedorPage.prototype.down = function () {
        this.proveedoresGeolocate = this.proveedoresGeolocateReplica;
        this.proveedoresGeolocate.sort(function (mayor, menor) {
            return menor.precio - mayor.precio;
        });
    };
    ComparaPreciosProveedorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-compara-precios-proveedor',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/compara-precios-proveedor/compara-precios-proveedor.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>Comparativa</ion-title>\n\n  </ion-navbar>\n  <div class="busca" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <input type="text" [(ngModel)]="palabra" placeholder="Escribe aquí el proveedor" (keyup)="buscarPorPalabra()">\n  </div>\n</ion-header>\n\n<ion-content padding>\n    <div *ngIf="proveedoresGeolocate && proveedoresGeolocate?.length>0" class="ordenamiento" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n        <div class="texto-ordena">\n          Ordernar por precio\n        </div>\n        <div class="botones">\n          <button ion-button outline style="width: 48%;" (click)="up()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n            <ion-icon name="md-trending-up" class="botonFooter"></ion-icon>\n          </button>\n        </div>\n        <div class="botones">\n          <button ion-button outline style="width: 48%;" (click)="down()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n            <ion-icon name="md-trending-down" class="botonFooter"></ion-icon>\n          </button>\n        </div>\n      </div>\n\n  <div class="spinner-carrito" *ngIf="!proveedoresGeolocate || proveedoresGeolocate.length <= 0">\n    <ion-spinner></ion-spinner>\n  </div>\n\n\n\n  <div *ngIf="proveedoresGeolocate && proveedoresGeolocate.length > 0">\n    <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of proveedoresGeolocate; let i = index"\n      (click)="viewDetail(p)">\n      <!-- <div class="tacha">\n                      <div class="mini-tacha">\n                          <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                          <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                      </div>\n                    </div> -->\n      <div class="container-card">\n\n        <img src="{{env.getImagenIndividual}}{{p.producto.adjuntoId}}" />\n      </div>\n      <div class="container-text">{{p.producto.nombre}}</div>\n      <div class="description">{{p.producto.descripcion}}</div>\n      <div class="precio">{{p.producto.precio | currency}}</div>\n\n      <div style="text-align: center;\n      font-weight: 600;">Proveedor:</div>\n      <div style="text-align: center;text-overflow: ellipsis;\n      white-space: nowrap;\n      overflow: hidden;">{{p.proveedor.nombre}}, {{p.proveedor.empresa.nombre}}</div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/compara-precios-proveedor/compara-precios-proveedor.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_5__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Events */]])
    ], ComparaPreciosProveedorPage);
    return ComparaPreciosProveedorPage;
}());

//# sourceMappingURL=compara-precios-proveedor.js.map

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_action_sheet__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_validation_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__home_geo_proveedores_home_geo_proveedores__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var RegistroPage = /** @class */ (function () {
    function RegistroPage(navCtrl, navParams, formBuilder, localStorageEncryptService, camera, translatePipe, actionSheet, alertaService, genericService, loadingService, events, modalController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.localStorageEncryptService = localStorageEncryptService;
        this.camera = camera;
        this.translatePipe = translatePipe;
        this.actionSheet = actionSheet;
        this.alertaService = alertaService;
        this.genericService = genericService;
        this.loadingService = loadingService;
        this.events = events;
        this.modalController = modalController;
        this.photo_url = null;
        this.selectOptions = {
            cssClass: 'action-sheet-class'
        };
        this.objetoRegistro = [
            {
                name: "Nombre del cliente",
                required: true,
                length: 50,
                type: "text",
                formName: "name",
                value: null
            },
            {
                name: "Apellido paterno",
                required: true,
                length: 50,
                type: "text",
                formName: "ap",
                value: null
            },
            {
                name: "Apellido materno",
                required: true,
                length: 50,
                type: "text",
                formName: "am",
                value: null
            },
            {
                name: "Fecha de nacimiento",
                required: true,
                length: 10,
                type: "date",
                formName: "fecha",
                value: null
            },
            {
                name: "Teléfono",
                required: true,
                length: 10,
                type: "number",
                formName: "tel",
                value: null
            },
            {
                name: "Género",
                required: true,
                length: 11,
                type: "select",
                formName: "sex",
                value: 0,
                opts: [
                    {
                        id: 0,
                        value: "[--Género--]"
                    },
                    {
                        id: "M",
                        value: "Hombre"
                    },
                    {
                        id: "F",
                        value: "Mujer"
                    }
                ]
            },
            {
                name: "Correo electrónico",
                required: true,
                length: 100,
                type: "email",
                formName: "email",
                value: null
            },
            {
                name: "Contraseña",
                required: true,
                length: 50,
                type: "password",
                formName: "pass",
                value: null
            },
            {
                name: "Confirmar contraseña",
                required: true,
                length: 50,
                type: "password",
                formName: "passC",
                value: null
            }
        ];
        this.options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.formGroup = null;
        this.btnHabilitado = true;
        this.user = null;
        this.data = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        var putObj = {};
        if (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo == 2) {
            this.objetoRegistro.splice(7, 0, {
                name: "Tipo persona",
                required: true,
                length: 11,
                type: "select",
                formName: "typpe",
                value: 0,
                opts: [
                    {
                        id: 0,
                        value: "[--Tipo persona--]"
                    },
                    {
                        id: 1,
                        value: "Persona física"
                    },
                    {
                        id: 2,
                        value: "Persona moral"
                    }
                ]
            });
            this.objetoRegistro.splice(8, 0, {
                name: "Razón Social",
                required: true,
                length: 50,
                type: "text",
                formName: "rz",
                value: null
            });
            this.objetoRegistro.push({
                name: "Dirección",
                required: true,
                length: 200,
                type: "text",
                formName: "direc",
                value: null,
                disabled: true
            });
        }
        this.objetoRegistro.forEach(function (item) {
            var tmp = [];
            tmp[0] = null;
            tmp[1] = [];
            if (item.required) {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required);
            }
            if (item.type == "number") {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_4__services_validation_service__["a" /* ValidationService */].phoneValidator);
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_4__services_validation_service__["a" /* ValidationService */].maxLengthValidator);
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_4__services_validation_service__["a" /* ValidationService */].minLengthValidator);
            }
            if (item.type == "email") {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_4__services_validation_service__["a" /* ValidationService */].emailValidator);
            }
            if (item.type == "password") {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_4__services_validation_service__["a" /* ValidationService */].passwordValidator);
            }
            if (item.type == "select") {
                tmp[0] = item.opts[0].value;
            }
            if (_this.user) {
            }
            putObj[item.formName] = tmp;
        });
        this.formGroup = this.formBuilder.group(putObj);
        this.events.subscribe("reloadUser", function (data) {
            try {
                _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            }
            catch (error) {
            }
        });
    }
    RegistroPage.prototype.ionViewDidLoad = function () {
        __WEBPACK_IMPORTED_MODULE_12_moment__["locale"]("ES");
    };
    RegistroPage.prototype.regresar = function () {
        var id = document.getElementById("icn-1");
        id.style.display = "none";
        this.navCtrl.pop();
    };
    RegistroPage.prototype.registrar = function () {
        var _this = this;
        if (this.objetoRegistro[7].value != this.objetoRegistro[8].value && __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo == 1) {
            this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
        }
        else if (this.objetoRegistro[9].value != this.objetoRegistro[10].value && __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo == 2) {
            this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
        }
        else {
            var body_1 = null;
            switch (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo) {
                case 1:
                    body_1 = {
                        login: this.objetoRegistro[6].value,
                        email: this.objetoRegistro[6].value,
                        firstName: this.objetoRegistro[0].value,
                        lastName: this.objetoRegistro[1].value,
                        motherLastName: this.objetoRegistro[2].value,
                        telefono: this.objetoRegistro[4].value,
                        fechaNacimiento: __WEBPACK_IMPORTED_MODULE_12_moment__(this.objetoRegistro[3].value, "YYYY-MM-DD").format("DD/MM/YYYY"),
                        genero: this.objetoRegistro[5].value,
                        password: this.objetoRegistro[7].value,
                        activated: true,
                        adjunto: this.photo_url == null || this.photo_url == "null" ? null : {
                            contentType: "image/jpeg",
                            file: this.photo_url,
                            fileName: Math.floor(new Date().getTime() / 1000.0).toString(),
                            size: 0
                        },
                    };
                    break;
                case 2:
                    body_1 = {
                        login: this.objetoRegistro[6].value,
                        email: this.objetoRegistro[6].value,
                        firstName: this.objetoRegistro[0].value,
                        lastName: this.objetoRegistro[1].value,
                        motherLastName: this.objetoRegistro[2].value,
                        telefono: this.objetoRegistro[4].value,
                        fechaNacimiento: __WEBPACK_IMPORTED_MODULE_12_moment__(this.objetoRegistro[3].value, "YYYY-MM-DD").format("DD/MM/YYYY"),
                        genero: this.objetoRegistro[5].value,
                        password: this.objetoRegistro[9].value,
                        tipoPersona: this.objetoRegistro[7].value,
                        razonSocial: this.objetoRegistro[8].value,
                        activated: true,
                        adjunto: this.photo_url == null || this.photo_url == "null" ? null : {
                            contentType: "image/jpeg",
                            file: this.photo_url,
                            fileName: Math.floor(new Date().getTime() / 1000.0).toString(),
                            size: 0
                        },
                        direccion: {
                            codigoPostal: this.data.codigoPostal,
                            direccion: this.data.direccion,
                            latitud: this.data.latitud,
                            longitud: this.data.longitud
                        }
                    };
                    break;
            }
            var path_1 = __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].registro;
            if (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo == 2) {
                body_1.tipoPersona = 2;
                path_1 = __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].registro + "/proveedor";
            }
            if (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo == 2 && this.objetoRegistro[this.objetoRegistro.length - 1].value.length <= 0) {
                this.alertaService.warnAlertGeneric("Es necesario que ingreses tu dirección");
            }
            else {
                this.loadingService.show().then(function () {
                    _this.genericService.sendPostRequest(path_1, body_1).subscribe(function (response) {
                        _this.loadingService.hide();
                        _this.alertaService.successAlertGeneric("Registro exitoso");
                        _this.navCtrl.pop();
                    }, function (error) {
                        _this.loadingService.hide();
                        var err = error.error;
                        _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                    });
                });
            }
        }
    };
    /**Verifica validaciones */
    RegistroPage.prototype.ejecutaValidator = function () {
        var validacion = 0;
        for (var name_1 in this.formGroup.controls) {
            var n = this.formGroup.controls[name_1];
            if (n.value === 0) {
                validacion++;
            }
            if (n.errors) {
                validacion++;
            }
            /*
            if (n.value && (n.value === 0 || n.value.length === 0) && n.invalid) {
              invalid.push(this.translatePipe.instant(String(name).toUpperCase()));
              fields += `${this.translatePipe.instant(String(name).toUpperCase())}, `;
            } */
        }
        if (validacion <= 0) {
            this.btnHabilitado = false;
        }
        else {
            this.btnHabilitado = true;
        }
    };
    RegistroPage.prototype.opcionesDeImagen = function () {
        var _this = this;
        var buttonLabels = [this.translatePipe.instant("CAPTURE"), this.translatePipe.instant("SELECT")];
        var options = {
            title: '',
            subtitle: '',
            buttonLabels: buttonLabels,
            addCancelButtonWithLabel: this.translatePipe.instant("CANCEL"),
            addDestructiveButtonWithLabel: this.translatePipe.instant("DELETE"),
            androidTheme: 1,
            destructiveButtonLast: true
        };
        this.actionSheet.show(options).then(function (buttonIndex) {
            switch (buttonIndex) {
                case 1:
                    _this.takeFoto();
                    break;
                case 2:
                    _this.seleccionaImagen();
                    break;
                case 3:
                    _this.photo_url = null;
                    break;
            }
        });
    };
    RegistroPage.prototype.takeFoto = function () {
        var _this = this;
        this.options.sourceType = this.camera.PictureSourceType.CAMERA;
        this.camera.getPicture(this.options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            _this.photo_url = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    RegistroPage.prototype.seleccionaImagen = function () {
        var _this = this;
        this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        this.camera.getPicture(this.options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            _this.photo_url = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    RegistroPage.prototype.getMapa = function () {
        var _this = this;
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_13__home_geo_proveedores_home_geo_proveedores__["a" /* HomeGeoProveedoresPage */], { fromModal: true, fromRegister: true });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                if (data != null) {
                    console.log(data.data);
                    _this.data = data.data;
                    _this.objetoRegistro[_this.objetoRegistro.length - 1].value = _this.data.direccion;
                    /*this.objetoRegistro[4].value = this.data.codigoPostal; */
                    setTimeout(function () {
                        _this.ejecutaValidator();
                    }, 1000);
                }
            }
        });
    };
    RegistroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registro',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/registro/registro.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Registro</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n\n  <div class="contenedor-step-3">\n    <div class="sub-contenedor">\n      <div class="avatar">\n        <div class="imagen" (tap)="opcionesDeImagen()">\n          <img src="assets/imgs/perfil/social-media.png" alt="" *ngIf="!photo_url">\n          <img src="{{photo_url}}" alt="" *ngIf="photo_url">\n        </div>\n      </div>\n\n      <div class="formulario">\n        <form [formGroup]="formGroup">\n          <div *ngFor="let dato of objetoRegistro;let i = index" class="contenedor-input">\n\n            <input class="inp" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}" type="{{dato.type}}"\n              [(ngModel)]="dato.value" [attr.disabled]="dato.disabled ? \'\' : null" placeholder="{{dato.name}}" maxlength="{{dato.length}}" [ngStyle]="{\'width\': dato.name == \'Dirección\' ? \'88%\' : \'100%\'}" *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\'">\n            \n              <div class="direc" *ngIf="dato.name == \'Dirección\'" (click)="getMapa()" style="display: inline-block;\n              width: 10%;\n              vertical-align: bottom;"><img src="assets/imgs/direcciones/home-run.png"\n                alt=""></div>\n\n            <ion-datetime class="dt" [(ngModel)]="dato.value" formControlName="{{dato.formName}}" text-left\n              pickerFormat="DD/MM/YYYY" cancelText="Cancelar" doneText="Aceptar" #fechaNac (ionChange)="ejecutaValidator()"\n              *ngIf="dato.type == \'date\'" placeholder="01/12/2020"></ion-datetime>\n\n            <ion-col col-2 class="text-center" *ngIf="dato.type == \'checkbox\'">\n              <ion-checkbox formControlName="{{dato.formName}}" [(ngModel)]="dato.value" (ionChange)="ejecutaValidator()">\n              </ion-checkbox>\n            </ion-col>\n\n            <ion-select *ngIf="dato.type == \'select\'" [(ngModel)]="dato.value" okText="Ok" cancelText="Cancelar"\n              interface="action-sheet" (ionChange)="ejecutaValidator()" [selectOptions]="selectOptions" formControlName="{{dato.formName}}">\n              <ion-option *ngFor="let op of dato.opts" [value]="op.id">\n                {{op.value}}\n              </ion-option>\n            </ion-select>\n\n            <app-control-messages [control]="formGroup.controls[dato.formName]" [clase]="\'validators2\'">\n            </app-control-messages>\n          </div>\n\n\n\n          <div class="contenedor-boton">\n            <button [disabled]="btnHabilitado" (click)="registrar()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Registrarme</button>\n          </div>\n        </form>\n\n      </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/registro/registro.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_action_sheet__["a" /* ActionSheet */],
            __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_9__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_10__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */]])
    ], RegistroPage);
    return RegistroPage;
}());

//# sourceMappingURL=registro.js.map

/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeProveedorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_opciones_menu_opciones_menu__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_historial_pedidos_detail_historial_pedidos_detail__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HomeProveedorPage = /** @class */ (function () {
    function HomeProveedorPage(navCtrl, navParams, popoverCtrl, menuCtrl, localStorageEncryptService, genericService, alertaService, loadingService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.menuCtrl = menuCtrl;
        this.localStorageEncryptService = localStorageEncryptService;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.user = null;
        this.pedidos = [];
        this.pedidosReplica = [];
        /**Obtenci{on de usuario en sesión */
        this.menuCtrl.enable(true);
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.cargarPedidos();
    }
    HomeProveedorPage.prototype.ionViewDidLoad = function () {
    };
    HomeProveedorPage.prototype.verOpciones = function () {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_6__pages_opciones_menu_opciones_menu__["a" /* OpcionesMenuPage */], {}, { cssClass: "clase-Pop" });
        popover.present({});
    };
    HomeProveedorPage.prototype.cargarPedidos = function () {
        var _this = this;
        this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].pedidosProveedor).subscribe(function (response) {
            _this.pedidos = response;
            if (_this.pedidos.length <= 0) {
                _this.pedidos = null;
            }
            _this.pedidosReplica = _this.pedidos;
        }, function (error) {
            var err = error.error;
            _this.pedidos = null;
            _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    HomeProveedorPage.prototype.viewDetail = function (pedido) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__pages_historial_pedidos_detail_historial_pedidos_detail__["a" /* HistorialPedidosDetailPage */], { pedido: pedido });
    };
    HomeProveedorPage.prototype.ordenPor = function (opc) {
        this.pedidos = this.pedidosReplica;
        //item.fecha = moment(fechaF, 'DD-MM-YYYY HH:mm:ss').format("D [de] MMMM [de] YYYY HH:mm:ss");
        switch (opc) {
            case 1:
                //fecha solicitud
                this.pedidos.sort(function (mayor, menor) {
                    var dateA = __WEBPACK_IMPORTED_MODULE_8_moment__(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate(), dateB = __WEBPACK_IMPORTED_MODULE_8_moment__(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate();
                    return dateA - dateB;
                    //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
                });
                break;
            case 2:
                //fecha entrega
                this.pedidos.sort(function (mayor, menor) {
                    var dateA = __WEBPACK_IMPORTED_MODULE_8_moment__(mayor.fechaEntrega, 'DD-MM-YYYY HH:mm:ss').toDate(), dateB = __WEBPACK_IMPORTED_MODULE_8_moment__(menor.fechaEntrega, 'DD-MM-YYYY HH:mm:ss').toDate();
                    return dateA - dateB;
                    //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
                });
                break;
            case 3:
                //estatus
                this.pedidos.sort(function (mayor, menor) {
                    return mayor.estatus.nombre > menor.estatus.nombre;
                });
                break;
        }
    };
    HomeProveedorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-home-proveedor',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages-proveedor/home-proveedor/home-proveedor.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Bienvenid@</ion-title>\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="verOpciones()">\n        <ion-icon name="md-more" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="spinner-carrito" *ngIf="pedidos && pedidos.length <= 0">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <div class="filtros" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" *ngIf="pedidos && pedidos?.length > 0">\n    <button (click)="ordenPor(1)">\n      <ion-icon name="ios-calendar-outline"></ion-icon>\n    </button>\n    <button (click)="ordenPor(2)">\n      <ion-icon name="md-calendar"></ion-icon>\n    </button>\n    <button (click)="ordenPor(3)">\n      <ion-icon name="ios-checkbox-outline"></ion-icon>\n    </button>\n  </div>\n\n  <ion-list *ngIf="pedidos && pedidos?.length > 0">\n    <ion-item class="item-list-card" *ngFor="let p of pedidos" (click)="viewDetail(p)">\n      <ion-avatar slot="start">\n        <img src="assets/imgs/pedidos/entrega.png" alt="">\n      </ion-avatar>\n      <div class="datos-tarjetas">\n        <div class="name">Pedido Num. <strong>{{p.id | number:\'5.\'}}</strong></div>\n        <div class="number">Costo <strong>{{p.total | currency}}</strong></div>\n        <div class="number">Fecha Solicitud <strong>{{p.fechaAlta}}</strong></div>\n        <div class="number" *ngIf="p.fechaEntrega">Fecha Entrega <strong>{{p.fechaEntrega}}</strong></div>\n        <div class="number">Estatus <strong>{{p.estatus.nombre}}</strong></div>\n      </div>\n\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages-proveedor/home-proveedor/home-proveedor.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["o" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_0__services_loading_service__["a" /* LoadingService */]])
    ], HomeProveedorPage);
    return HomeProveedorPage;
}());

//# sourceMappingURL=home-proveedor.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarritoHistoricoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__detalle_producto_detalle_producto__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_validation_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__home_geo_proveedores_home_geo_proveedores__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var CarritoHistoricoPage = /** @class */ (function () {
    function CarritoHistoricoPage(navCtrl, navParams, genericService, alertaService, loadingService, localStorageEncryptService, events, alertCtrl, currencyPipe, formBuilder, modalController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.currencyPipe = currencyPipe;
        this.formBuilder = formBuilder;
        this.modalController = modalController;
        this.user = null;
        this.env = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */];
        this.listaCarrito = null;
        this.productosCarrito = [];
        this.listaCarritoReplica = [];
        this.stripe = Stripe('pk_test_TNjRZggfGMHinhrlBVIP1P1B00d8WURtiI');
        this.cards = null;
        this.dataCard = {
            tarj: "",
            cvc: "",
            dtime: ""
        };
        this.pagoActual = null;
        this.objetoRegistro = [
            {
                name: "Nombre del contacto",
                required: true,
                length: 50,
                type: "text",
                formName: "name",
                value: null,
                disabled: false
            },
            {
                name: "Teléfono",
                required: true,
                length: 10,
                type: "number",
                formName: "tel",
                value: null,
                disabled: false
            },
            {
                name: "Correo electrónico",
                required: true,
                length: 100,
                type: "email",
                formName: "email",
                value: null,
                disabled: false
            },
            {
                name: "Dirección",
                required: true,
                length: 200,
                type: "text",
                formName: "direc",
                value: null,
                disabled: true
            },
            {
                name: "Código postal",
                required: false,
                length: 6,
                type: "text",
                formName: "cp",
                value: null,
                disabled: true
            },
        ];
        this.formGroup = null;
        this.btnHabilitado = true;
        this.data = null;
        this.objetoRegistroCopy = [];
        this.check = false;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.listaCarrito = navParams.get("lista");
        this.listaCarritoReplica = this.listaCarrito;
        this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        this.getCards();
    }
    CarritoHistoricoPage.prototype.getCards = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].tarjetas).subscribe(function (response) {
            _this.cards = response;
            _this.cards.forEach(function (element) {
                element.selected = false;
            });
            if (_this.cards.length <= 0) {
                //this.alertaService.warnAlertGeneric("Aún no cuentas con tarjetas frecuentes");
            }
        }, function (error) {
            var err = error.error;
            _this.cards = null;
            //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    CarritoHistoricoPage.prototype.cerrar = function () {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
        this.dataCard = {
            tarj: "",
            cvc: "",
            dtime: ""
        };
        this.cards.forEach(function (element) {
            element.selected = false;
        });
    };
    CarritoHistoricoPage.prototype.ionViewDidLoad = function () {
        var claseTabs = document.getElementsByClassName("tabbar");
        claseTabs[0].style.display = "none";
    };
    CarritoHistoricoPage.prototype.ionViewWillLeave = function () {
        var claseTabs = document.getElementsByClassName("tabbar");
        claseTabs[0].style.display = "flex";
    };
    CarritoHistoricoPage.prototype.viewDetail = function (producto) {
        var _this = this;
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.productoProveedor.id).subscribe(function (response) {
                //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
                //let nav = this.app.getRootNav();
                //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
                if (_this.user) {
                    var carritos = _this.localStorageEncryptService.getFromLocalStorage("" + _this.user.id_token);
                    if (carritos) {
                        var position = carritos.findIndex(function (carrito) {
                            return carrito.id == response.id;
                        });
                        if (position >= 0) {
                            response.cantidad = carritos[position].cantidad;
                        }
                    }
                }
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { producto: response });
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
        //
    };
    CarritoHistoricoPage.prototype.decrementar = function (p) {
        p.cantidad--;
        this.borrarToCarritoBack(p);
    };
    CarritoHistoricoPage.prototype.borrarToCarritoBack = function (producto) {
        var _this = this;
        var body = {
            precio: producto.precio,
            id: producto.id
        };
        body.cantidad = producto.cantidad;
        this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].carritoHistoricoDetalle, body).subscribe(function (response1) {
            if (producto.cantidad == 0) {
                _this.genericService.sendDelete(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].carritoHistoricoDetalle + "/" + producto.id).subscribe(function (response2) {
                    if (producto.cantidad == 0) {
                        _this.events.publish("totalCarrito");
                        _this.deleteFavoritoService(producto);
                        //this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
                    }
                    _this.verificarCarritoModificarCantidad(producto);
                }, function (error) {
                    producto.cantidad++;
                });
            }
            else {
                _this.verificarCarritoModificarCantidad(producto);
            }
        }, function (error) {
            producto.cantidad++;
        });
    };
    CarritoHistoricoPage.prototype.deleteFavoritoService = function (producto) {
        this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        var nuevoArrarCarrito = [];
        var productoDelete = null;
        this.productosCarrito.forEach(function (element) {
            if (producto.productoProveedor.producto.id != element.productoProveedor.producto.id) {
                nuevoArrarCarrito.push(element);
            }
            else {
                productoDelete = element;
                productoDelete.carrito = false;
                producto.carrito = false;
            }
        });
        this.productosCarrito = nuevoArrarCarrito;
        this.localStorageEncryptService.setToLocalStorage("" + this.user.id_token, this.productosCarrito);
        //Llamar a events
        this.events.publish('updateProductos', { productoDelete: productoDelete });
        if (this.productosCarrito.length <= 0) {
            this.navCtrl.pop();
        }
    };
    CarritoHistoricoPage.prototype.verificarCarritoModificarCantidad = function (element) {
        var productosStorage = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        if (productosStorage) {
            productosStorage.forEach(function (item) {
                if (item.id == element.id) {
                    item.cantidad = element.cantidad;
                }
            });
        }
        this.localStorageEncryptService.setToLocalStorage("" + this.user.id_token, productosStorage);
    };
    CarritoHistoricoPage.prototype.incrementa = function (p) {
        var bandera = false;
        if (p.cantidad) {
            p.cantidad++;
        }
        else if (p.cantidad == 0) {
            p.cantidad = 1;
            bandera = true;
        }
        else {
            p.cantidad = 1;
            bandera = true;
        }
        this.agregarToCarritoBack(bandera, p);
    };
    CarritoHistoricoPage.prototype.agregarToCarrito = function (producto) {
        var productosStorage = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        var productos = [];
        productos.push(producto);
        if (productosStorage) {
            productosStorage.forEach(function (element) {
                productos.push(element);
            });
        }
        producto.carrito = true;
        try {
            this.localStorageEncryptService.setToLocalStorage("" + this.user.id_token, productos);
        }
        catch (error) {
            producto.carrito = false;
        }
    };
    CarritoHistoricoPage.prototype.agregarToCarritoBack = function (bandera, producto) {
        var _this = this;
        var body = {
            precio: producto.precio,
            id: producto.id
        };
        var service = this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].carritoHistoricoDetalle, body);
        if (producto.cantidad > 1) {
            body.cantidad = producto.cantidad;
            service = this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].carritoHistoricoDetalle, body);
        }
        service.subscribe(function (response) {
            if (bandera) {
                _this.agregarToCarrito(producto);
            }
            _this.verificarCarritoModificarCantidad(producto);
        }, function (error) {
            if (producto.cantidad == 1) {
                producto.cantidad = 1;
            }
            else {
                producto.cantidad--;
            }
        });
    };
    CarritoHistoricoPage.prototype.infoContact = function () {
        var _this = this;
        var modal = document.getElementById("myModal2");
        //
        var putObj = {};
        this.objetoRegistro.forEach(function (item) {
            var tmp = [];
            tmp[0] = null;
            tmp[1] = [];
            if (item.required) {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_8__angular_forms__["g" /* Validators */].required);
            }
            if (item.type == "number") {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_9__services_validation_service__["a" /* ValidationService */].phoneValidator);
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_9__services_validation_service__["a" /* ValidationService */].maxLengthValidator);
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_9__services_validation_service__["a" /* ValidationService */].minLengthValidator);
            }
            if (item.type == "email") {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_9__services_validation_service__["a" /* ValidationService */].emailValidator);
            }
            if (item.type == "password") {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_9__services_validation_service__["a" /* ValidationService */].passwordValidator);
            }
            if (item.type == "select") {
                tmp[0] = item.opts[0].value;
            }
            if (_this.user) {
            }
            putObj[item.formName] = tmp;
        });
        this.formGroup = this.formBuilder.group(putObj);
        //
        modal.style.display = "block";
    };
    CarritoHistoricoPage.prototype.closeInfoContact = function () {
        var modal = document.getElementById("myModal2");
        modal.style.display = "none";
        this.objetoRegistro.forEach(function (item) {
            item.value = null;
        });
        this.formGroup = null;
        this.btnHabilitado = true;
    };
    CarritoHistoricoPage.prototype.cerrarModal3 = function () {
        var modal = document.getElementById("myModal3");
        modal.style.display = "none";
    };
    CarritoHistoricoPage.prototype.openModal3 = function () {
        var modal = document.getElementById("myModal3");
        modal.style.display = "block";
    };
    /**Verifica validaciones */
    CarritoHistoricoPage.prototype.ejecutaValidator = function () {
        var validacion = 0;
        for (var name_1 in this.formGroup.controls) {
            var n = this.formGroup.controls[name_1];
            if (n.invalid) {
                validacion++;
            }
            /*
            if (n.value && (n.value === 0 || n.value.length === 0) && n.invalid) {
              invalid.push(this.translatePipe.instant(String(name).toUpperCase()));
              fields += `${this.translatePipe.instant(String(name).toUpperCase())}, `;
            } */
        }
        if (validacion <= 0) {
            this.btnHabilitado = false;
        }
        else {
            this.btnHabilitado = true;
        }
    };
    CarritoHistoricoPage.prototype.getMapa = function () {
        var _this = this;
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_11__home_geo_proveedores_home_geo_proveedores__["a" /* HomeGeoProveedoresPage */], { fromModal: true });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                if (data != null) {
                    _this.data = data.data;
                    _this.objetoRegistro[3].value = _this.data.direccion;
                    _this.objetoRegistro[4].value = _this.data.codigoPostal;
                    setTimeout(function () {
                        _this.ejecutaValidator();
                    }, 1000);
                }
            }
        });
    };
    CarritoHistoricoPage.prototype.precompra = function () {
        var _this = this;
        this.objetoRegistroCopy = [];
        this.objetoRegistroCopy.push({ value: this.formGroup.controls["name"].value });
        this.objetoRegistroCopy.push({ value: this.formGroup.controls["tel"].value });
        this.objetoRegistroCopy.push({ value: this.formGroup.controls["email"].value });
        var body = {
            nombreContacto: this.objetoRegistroCopy[0].value,
            telefonoContacto: this.objetoRegistroCopy[1].value,
            correoContacto: this.objetoRegistroCopy[2].value,
            direccionContacto: {
                id: this.data.id ? this.data.id : null,
                codigoPostal: this.data.codigoPostal,
                direccion: this.data.direccion,
                latitud: this.data.latitud,
                longitud: this.data.longitud
            },
            productos: []
        };
        this.productosCarrito.forEach(function (item) {
            body.productos.push({
                cantidad: item.cantidad,
                productoProveedorId: item.productoProveedorId
            });
        });
        var service = this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].pedidos, body);
        this.loadingService.show().then(function () {
            service.subscribe(function (response) {
                _this.pagoActual = response;
                _this.loadingService.hide();
                //this.comprar();
                _this.closeInfoContact();
                setTimeout(function () {
                    _this.openModal3();
                }, 300);
            }, function (error) {
                _this.loadingService.hide();
                _this.alertaService.errorAlertGeneric("Ocurrió un error al procesar tu pago, intenta nuevamente");
            });
        });
    };
    CarritoHistoricoPage.prototype.comprar = function () {
        if (this.check) {
            this.cerrarModal3();
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            this.check = false;
        }
        else {
            this.alertaService.warnAlertGeneric("Por favor, acepta los términos y condiciones");
        }
    };
    CarritoHistoricoPage.prototype.confirmar = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Confirmación",
            message: "Se realizar\u00E1 un cargo a su tarjeta por " + this.currencyPipe.transform(this.pagoActual.total) + " \u00BFEst\u00E1s de acuerdo?",
            cssClass: this.genericService.getColorClassTWO(),
            buttons: [
                {
                    text: "No",
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Si',
                    handler: function () {
                        //this.confirmar();
                        _this.setupStripe();
                    }
                }
            ]
        });
        alert.present();
    };
    CarritoHistoricoPage.prototype.setupStripe = function () {
        var _this = this;
        var position = this.cards.findIndex(function (carrito) {
            return carrito.selected;
        });
        var c = {
            number: "4242424242424242",
            cvc: "123",
            exp_month: 12,
            exp_year: 2025
        };
        var bandera = false;
        if (this.cards[position]) {
            var item = this.cards[position];
            var fechaFormat = item.fechaCaducidad.split("-");
            item.expMont = fechaFormat[1];
            item.expYear = fechaFormat[0];
            c.number = item.numeroTarjeta;
            c.cvc = item.numeroSeguridad;
            c.exp_month = item.expMont;
            c.exp_year = item.expYear;
        }
        else if (this.dataCard.dtime.length == 0 || this.dataCard.tarj.length == 0 || this.dataCard.cvc.length == 0) {
            bandera = true;
        }
        else {
            c.number = this.dataCard.tarj;
            c.cvc = this.dataCard.cvc;
            var fechaFormat = this.dataCard.dtime.split("-");
            var expMont = fechaFormat[1];
            var expYear = fechaFormat[0];
            c.exp_month = expMont;
            c.exp_year = expYear;
        }
        if (!bandera) {
            Stripe.setPublishableKey('pk_test_TNjRZggfGMHinhrlBVIP1P1B00d8WURtiI');
            this.loadingService.show().then(function () {
                var clase = _this;
                Stripe.card.createToken(c, function (status, response) {
                    if (response.error) {
                        clase.loadingService.hide();
                        clase.alertaService.errorAlertGeneric("Lo sentimos! No es posible efectuar el cobro, verifica que la información de tu tarjeta es correcta");
                    }
                    else {
                        // Get the token ID:
                        //clase.loadingService.hide();
                        var token = response.id;
                        var body = {
                            pedidoId: clase.pagoActual.id,
                            token: token
                        };
                        var service = clase.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].pedidos + "/pago", body);
                        service.subscribe(function (response) {
                            clase.loadingService.hide();
                            clase.alertaService.successAlertGeneric("El pago se ha efectuado con éxito");
                            clase.cerrar();
                        }, function (error) {
                            clase.loadingService.hide();
                            clase.alertaService.errorAlertGeneric("Ocurrió un error al procesar tu pago, intenta nuevamente");
                        });
                    }
                });
            });
        }
        else {
            this.alertaService.warnAlertGeneric("Llena todos los campos de tarjeta o selecciona alguna que hayas ingresado anteriormente");
        }
    };
    CarritoHistoricoPage.prototype.up = function () {
        this.listaCarrito = this.listaCarritoReplica;
        this.listaCarrito.carritoHistoricoDetalles.sort(function (mayor, menor) {
            return mayor.precio - menor.precio;
        });
    };
    CarritoHistoricoPage.prototype.down = function () {
        this.listaCarrito = this.listaCarritoReplica;
        this.listaCarrito.carritoHistoricoDetalles.sort(function (mayor, menor) {
            return menor.precio - mayor.precio;
        });
    };
    CarritoHistoricoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-carrito-historico',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/carrito-historico/carrito-historico.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>{{listaCarrito.nombre}}</ion-title>\n  </ion-navbar>\n</ion-header>\n<div id="myModal" class="modal">\n\n  <div class="modal-content animated lightSpeedIn">\n\n    <div class="tacha" (click)="cerrar()" [ngStyle]="{\'color\': genericService.getColorHex()}">\n      <ion-icon ios="md-close" md="md-close"></ion-icon>\n    </div>\n    <div class="selecciona" [ngStyle]="{\'color\': genericService.getColorHex()}" *ngIf="cards && cards?.length > 0">Selecciona\n      tu tarjeta</div>\n    <ion-list *ngIf="cards && cards?.length > 0">\n      <ion-item class="item-list-card" *ngFor="let card of cards" [ngClass]="{\'seleccionado\':card.selected}" (click)="seleccionar(card)">\n        <ion-avatar slot="start">\n          <img src="assets/imgs/tarjetas/bank.png" alt="">\n        </ion-avatar>\n        <div class="datos-tarjetas">\n          <div class="name">{{card.alias}}</div>\n          <div class="number">{{card.numeroTarjeta}}</div>\n        </div>\n\n      </ion-item>\n    </ion-list>\n    <div class="ingresa" [ngStyle]="{\'color\': genericService.getColorHex()}" *ngIf="cards && cards?.length > 0">Ó\n      ingresa una para hacer el pago</div>\n    <div class="ingresa" [ngStyle]="{\'color\': genericService.getColorHex()}" *ngIf="!cards || cards?.length <= 0">Ingresa\n      una tarjeta para hacer el pago</div>\n\n\n\n    <div class="form-row">\n      <input type="number" placeholder="N. Tarjeta" id="tarj" [(ngModel)]="dataCard.tarj" style="width: 100%">\n\n      <ion-datetime class="dt" text-left pickerFormat="MM/YY" cancelText="Cancelar" doneText="Aceptar" #fechaNac\n        placeholder="04/24" min="2016" max="2050" id="dtime" [(ngModel)]="dataCard.dtime"></ion-datetime>\n\n      <input type="number" placeholder="CVC" id="cvc" [(ngModel)]="dataCard.cvc">\n\n\n\n\n    </div>\n    <button ion-button block large style="padding: 10px;\n          height: auto;\n          contain: none;\n          margin-top: 15px;font-size: 14px;"\n      [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="confirmar()">Pagar</button>\n  </div>\n</div>\n\n<div id="myModal2" class="modal2">\n\n  <div class="modal-content animated lightSpeedIn">\n\n    <div style="top: 3px;" class="tacha" (click)="closeInfoContact()" [ngStyle]="{\'color\': genericService.getColorHex()}">\n      <ion-icon ios="md-close" md="md-close"></ion-icon>\n    </div>\n\n    <div style="width: 90%;\n        padding: 7px;\n        color: #fff;\n        border-radius: 4px;" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Llena\n      la información de contacto</div>\n    <div class="formulario" *ngIf="formGroup">\n      <form [formGroup]="formGroup">\n        <div *ngFor="let dato of objetoRegistro;let i = index" class="contenedor-input">\n          <!-- <span>{{dato.name}}</span> -->\n\n          <input class="inp" placeholder="{{dato.name}}" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}"\n            type="{{dato.type}}" [(ngModel)]="dato.value" maxlength="{{dato.length}}" [attr.disabled]="dato.disabled ? \'\' : null"\n            *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\'" [ngStyle]="{\'width\': dato.name == \'Dirección\' ? \'88%\' : \'100%\'}">\n\n          <div class="direc" *ngIf="dato.name == \'Dirección\'" (click)="getMapa()"><img src="assets/imgs/direcciones/home-run.png"\n              alt=""></div>\n\n          <ion-datetime class="dt" [(ngModel)]="dato.value" formControlName="{{dato.formName}}" text-left pickerFormat="DD/MM/YYYY"\n            cancelText="Cancelar" doneText="Aceptar" #fechaNac (ionChange)="ejecutaValidator()" *ngIf="dato.type == \'date\'"\n            placeholder="01/12/2020"></ion-datetime>\n\n          <ion-col col-2 class="text-center" *ngIf="dato.type == \'checkbox\'">\n            <ion-checkbox formControlName="{{dato.formName}}" [(ngModel)]="dato.value" (ionChange)="ejecutaValidator()">\n            </ion-checkbox>\n          </ion-col>\n\n          <ion-select *ngIf="dato.type == \'select\'" [(ngModel)]="dato.value" okText="Ok" cancelText="Cancelar"\n            interface="action-sheet" (ionChange)="ejecutaValidator()" [selectOptions]="selectOptions" formControlName="{{dato.formName}}">\n            <ion-option *ngFor="let op of dato.opts" [value]="op.id">\n              {{op.value}}\n            </ion-option>\n          </ion-select>\n\n          <app-control-messages [control]="formGroup.controls[dato.formName]" [clase]="\'validators2\'">\n          </app-control-messages>\n        </div>\n      </form>\n\n    </div>\n\n    <button ion-button block large style="padding: 10px;\n            height: auto;\n            contain: none;\n            margin-top: 15px;font-size: 14px;"\n      [disabled]="btnHabilitado" [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="precompra()">Aceptar</button>\n  </div>\n</div>\n\n<div id="myModal3" class="modal3">\n\n  <div class="modal-content animated lightSpeedIn">\n\n    <div class="tacha" (click)="cerrarModal3()" [ngStyle]="{\'color\': genericService.getColorHex()}">\n      <ion-icon ios="md-close" md="md-close"></ion-icon>\n    </div>\n    <div style="width: 90%;\n      padding: 7px;\n      color: #fff;\n      border-radius: 4px;" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Información\n      de pago</div>\n\n    <div class="resumen">Resumen de la compra</div>\n\n    <div class="resumen-proveedor" *ngIf="pagoActual">\n      <div *ngFor="let p of pagoActual.pedidoProveedores" class="separador">\n        <div class="proveedor">\n          <div class="nombre">{{p.proveedor?.nombre}}</div>\n          <div class="precio">{{p.total | currency}}</div>\n\n          <div class="costo-envio">Costo de envío</div>\n          <div class="precio-envio">{{p.comisionTransportista | currency}}</div>\n\n          <div class="costo-subtotal">Subtotal</div>\n          <div class="precio-subtotal">{{p.total + p.comisionTransportista | currency}}</div>\n        </div>\n\n\n      </div>\n\n      <div class="total-pagar">Total a pagar: <strong>{{pagoActual.total | currency}}</strong></div>\n      <div class="iva">*Costos incluyen iva.</div>\n\n      <ion-item>\n        <ion-label>Acepto términos y condiciones</ion-label>\n        <ion-checkbox color="{{genericService.getColor()}}" [(ngModel)]="check"></ion-checkbox>\n      </ion-item>\n    </div>\n\n    <div style="width:100%">\n      <button ion-button block large style="padding: 10px;\n          height: auto;\n          contain: none;\n          margin-top: 15px;font-size: 14px;display: inline-block; width: 49%"\n        [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="cerrarModal3()">Cancelar</button>\n      <button ion-button block large style="padding: 10px;\n            height: auto;\n            contain: none;\n            margin-top: 15px;font-size: 14px;display: inline-block; width: 49%"\n        [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="comprar()">Realizar pago</button>\n    </div>\n  </div>\n</div>\n\n\n<ion-content padding>\n  <div *ngIf="listaCarrito.carritoHistoricoDetalles && listaCarrito.carritoHistoricoDetalles?.length>0" class="ordenamiento" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <div class="texto-ordena">\n      Ordernar por precio\n    </div>\n    <div class="botones">\n      <button ion-button outline style="width: 48%;" (click)="up()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n        <ion-icon name="md-trending-up" class="botonFooter"></ion-icon>\n      </button>\n    </div>\n    <div class="botones">\n      <button ion-button outline style="width: 48%;" (click)="down()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n        <ion-icon name="md-trending-down" class="botonFooter"></ion-icon>\n      </button>\n    </div>\n  </div>\n  <div>\n    <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of listaCarrito.carritoHistoricoDetalles; let i = index">\n      <!-- <div class="tacha">\n                  <div class="mini-tacha">\n                      <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                      <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                  </div>\n                </div> -->\n      <div class="container-card" (click)="viewDetail(p)">\n\n        <img src="{{env.getImagenIndividual}}{{p.productoProveedor.producto.adjuntoId}}" />\n      </div>\n      <div class="container-text" (click)="viewDetail(p)">{{p.productoProveedor.producto.nombre}}</div>\n      <div class="description" (click)="viewDetail(p)">{{p.productoProveedor.producto.descripcion}}</div>\n      <div class="precio" (click)="viewDetail(p)">{{p.precio | currency}}</div>\n\n      <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n        <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">-</div>\n        </div>\n        <div class="cantidad" *ngIf="p.cantidad > 0">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">{{p.cantidad}}</div>\n        </div>\n        <div class="mas" (click)="incrementa(p)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">+</div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</ion-content>\n<ion-footer class="footer-button-class">\n  <button style="width: 100%;" (tap)="infoContact()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Realizar\n    pedido</button>\n</ion-footer>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/carrito-historico/carrito-historico.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_10__angular_common__["c" /* CurrencyPipe */],
            __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["k" /* ModalController */]])
    ], CarritoHistoricoPage);
    return CarritoHistoricoPage;
}());

//# sourceMappingURL=carrito-historico.js.map

/***/ }),

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QrPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var QrPage = /** @class */ (function () {
    function QrPage(navCtrl, navParams, genericService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.qrCode = "aaaa";
        this.pedido = null;
        this.pedido = navParams.get("pedido");
        this.qrCode = this.pedido.folio;
    }
    QrPage.prototype.ionViewDidLoad = function () {
        console.log(this.qrCode);
    };
    QrPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-qr',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/qr/qr.html"*/'<ion-header>\n    <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n      <ion-title>Terminar servicio</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n<ion-content padding>\n\n  <div class="titlee" [ngStyle]="{\'border-color\' : genericService.getColorHex()}">Código: <strong>{{pedido.folio}}</strong></div>\n\n    <div class="miqr">\n        <qrcode [qrdata]="qrCode"></qrcode>\n    </div>\n\n    <div style="    margin-top: 20px;\n    font-size: 17px;\n    text-align: center;">Muestra este código QR a la persona que entrega el pedido</div>\n\n    \n</ion-content>\n'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/qr/qr.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__services_generic_service__["a" /* GenericService */]])
    ], QrPage);
    return QrPage;
}());

//# sourceMappingURL=qr.js.map

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_chat_service__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ChatPage = /** @class */ (function () {
    function ChatPage(navCtrl, navParams, localStorageEncryptService, events, genericService, chatService, alertaService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.genericService = genericService;
        this.chatService = chatService;
        this.alertaService = alertaService;
        this.chat = null;
        this.pedido = null;
        this.user = null;
        this.color = "#3b64c0";
        this.mensaje = "";
        this.toggled = false;
        this.env = __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */];
        this.intervalo = null;
        this.chat = navParams.get("chat");
        this.pedido = navParams.get("pedido");
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        if (this.localStorageEncryptService.getFromLocalStorage("theme")) {
            this.color = this.localStorageEncryptService.getFromLocalStorage("theme");
        }
        this.events.subscribe("changeColor", function (data) {
            try {
                if (_this.localStorageEncryptService.getFromLocalStorage("theme")) {
                    _this.color = _this.localStorageEncryptService.getFromLocalStorage("theme");
                }
            }
            catch (error) {
            }
        });
    }
    ChatPage.prototype.handleSelection = function (event) {
        this.mensaje = this.mensaje + " " + event.char;
    };
    ChatPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.chatService.connect();
        this.chatService.receive().subscribe(function (message) {
        });
        var claseTabs = document.getElementsByClassName("tabbar");
        claseTabs[0].style.display = "none";
        this.intervalo = setInterval(function () {
            _this.verChat();
        }, 2000);
        var dimensions = this.content.getContentDimensions();
        this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
    };
    ChatPage.prototype.ionViewWillLeave = function () {
        var claseTabs = document.getElementsByClassName("tabbar");
        claseTabs[0].style.display = "flex";
        clearInterval(this.intervalo);
        this.intervalo = null;
    };
    ChatPage.prototype.verChat = function () {
        var _this = this;
        switch (__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].perfil.activo) {
            case 1:
                this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].chats + "/" + this.pedido.pedidoProveedores[0].chatProveedorid).subscribe(function (response) {
                    _this.chat = response;
                }, function (error) {
                    var err = error.error;
                    //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
                break;
            case 2:
                this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].chatsProveedor + this.pedido.pedidoProveedores[0].id + "/tipoChat/1").subscribe(function (response) {
                    _this.chat = response;
                }, function (error) {
                    var err = error.error;
                    //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
                break;
        }
    };
    ChatPage.prototype.sendMessage = function () {
        var _this = this;
        if (this.mensaje.length === 0) {
            return;
        }
        //this.chatService.sendMessage(this.mensaje);
        var body = {
            chatId: this.chat.id,
            from: this.user.username,
            text: this.mensaje.toString()
        };
        if (__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].perfil.activo == 1) {
            body.to = "" + this.chat.chatDetalles[0].usuarioEmisorLogin;
        }
        else if (__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].perfil.activo == 2) {
            body.to = "" + this.pedido.cliente.login;
        }
        this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].chats + "/messages", body).subscribe(function (response) {
            _this.chat.chatDetalles.push(response);
            var dimensions = _this.content.getContentDimensions();
            _this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
            _this.mensaje = '';
        }, function (error) {
            _this.alertaService.errorAlertGeneric("No se ha podido enviar tu mensaje, intenta nuevamente");
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* Content */])
    ], ChatPage.prototype, "content", void 0);
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/chat/chat.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title style="text-align:center">Chat</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="contenedor-chat">\n    <div class="cont-msj">\n      <div class="msj" style="margin-bottom: 10px;" [ngClass]="{\'msj\' : user.username == c.usuarioEmisorLogin, \'msj-r\' : user.username != c.usuarioEmisorLogin}"\n        *ngFor="let c of chat.chatDetalles">\n        <div class="{{user.username == c.usuarioEmisorLogin ? genericService.getColorClassChat() : \'m\'}}" [ngStyle]="{\'background-color\': user.username == c.usuarioEmisorLogin ? genericService.getColorHex(): \'\'}">\n          <div>{{c.mensaje}}</div>\n          <div style="font-size:9px">{{c.fecha}}</div>\n        </div>\n      </div>\n    </div>\n    <!-- <div class="uno">\n      <span>\n        <div class="dos">\n          <span class="span1"></span>\n          <span class="span2"></span>\n          <div class="tres">\n              <div class="cuatro">\n                  <div class="cinco">\n                      <div class="seis">\n                        <span>\n                          <span>Hola</span>\n                        </span>\n                      </div>\n                  </div>\n              </div>\n          </div>\n        </div>\n      </span>\n    </div> -->\n  </div>\n\n\n</ion-content>\n<ion-footer class="footer-chat">\n  <div>\n    <!-- <button class="emoji" ion-button clear icon-only (click)="toggled = !toggled" [(emojiPickerIf)]="toggled" [emojiPickerDirection]="\'top\'"\n      (emojiPickerSelect)="handleSelection($event)">\n      <ion-icon name="ios-happy-outline"></ion-icon>\n    </button> -->\n    <input type="text" style="width:89%" placeholder="Escribe un mensaje aquí" [(ngModel)]="mensaje">\n    <div>\n      <button (click)="sendMessage()">\n        <ion-icon name="md-send"></ion-icon>\n      </button>\n    </div>\n  </div>\n</ion-footer>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/chat/chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_5__services_chat_service__["a" /* ChatService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(689);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sockjs_client__ = __webpack_require__(938);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sockjs_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sockjs_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_webstomp_client__ = __webpack_require__(969);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_webstomp_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_webstomp_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ChatService = /** @class */ (function () {
    function ChatService(location, localStorageEncryptService) {
        this.location = location;
        this.localStorageEncryptService = localStorageEncryptService;
        this.stompClient = null;
        this.subscriber = null;
        this.alreadyConnectedOnce = false;
        this.user = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.connection = this.createConnection();
        this.listener = this.createListener();
    }
    ChatService.prototype.connect = function () {
        var _this = this;
        if (this.connectedPromise === null) {
            this.connection = this.createConnection();
        }
        // building absolute path so that websocket doesn't fail when deploying with a context path
        var url = 'websocket/chat';
        var urlComplete = "" + __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["b" /* pathChat */] + url;
        var authToken = this.user.id_token;
        if (authToken) {
            url += '?access_token=' + authToken;
        }
        var socket = new __WEBPACK_IMPORTED_MODULE_4_sockjs_client__(urlComplete);
        this.stompClient = __WEBPACK_IMPORTED_MODULE_5_webstomp_client__["over"](socket);
        var headers = {};
        this.stompClient.connect(headers, function () {
            _this.connectedPromise('success');
            _this.connectedPromise = null;
            _this.subscribe();
            if (!_this.alreadyConnectedOnce) {
                _this.alreadyConnectedOnce = true;
            }
        });
    };
    ChatService.prototype.disconnect = function () {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            this.stompClient = null;
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this.alreadyConnectedOnce = false;
    };
    ChatService.prototype.receive = function () {
        return this.listener;
    };
    ChatService.prototype.sendMessage = function (message) {
        if (this.stompClient !== null && this.stompClient.connected) {
            this.stompClient.send('/chat', // destination
            JSON.stringify({ message: message }), // body
            {} // header
            );
        }
    };
    ChatService.prototype.subscribe = function () {
        var _this = this;
        this.connection.then(function () {
            _this.subscriber = _this.stompClient.subscribe('/chat/public', function (data) {
                _this.listenerObserver.next(JSON.parse(data.body));
            });
        });
    };
    ChatService.prototype.unsubscribe = function () {
        if (this.subscriber !== null) {
            this.subscriber.unsubscribe();
        }
        this.listener = this.createListener();
    };
    ChatService.prototype.createListener = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"](function (observer) {
            _this.listenerObserver = observer;
        });
    };
    ChatService.prototype.createConnection = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return (_this.connectedPromise = resolve); });
    };
    ChatService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common__["f" /* Location */],
            __WEBPACK_IMPORTED_MODULE_0__local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]])
    ], ChatService);
    return ChatService;
}());

//# sourceMappingURL=chat.service.js.map

/***/ }),

/***/ 576:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerProductosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var VerProductosPage = /** @class */ (function () {
    function VerProductosPage(navCtrl, navParams, genericService, alertaService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.pedidos = null;
        this.pedidos = navParams.get("pedidos");
        this.pedidos.pedidoProveedores[0].pedidoDetalles.forEach(function (element) {
            element.activado = false;
        });
    }
    VerProductosPage.prototype.ionViewDidLoad = function () {
        var claseTabs = document.getElementsByClassName("tabbar");
        claseTabs[0].style.display = "none";
    };
    VerProductosPage.prototype.ionViewWillLeave = function () {
        var claseTabs = document.getElementsByClassName("tabbar");
        claseTabs[0].style.display = "flex";
    };
    VerProductosPage.prototype.solicitar = function () {
    };
    VerProductosPage.prototype.confirmar = function () {
        var _this = this;
        var nada = 0;
        this.pedidos.pedidoProveedores[0].pedidoDetalles.forEach(function (element) {
            if (!element.activado) {
                nada++;
            }
        });
        if (nada > 0) {
            this.alertaService.warnAlertGeneric("Debe confirmar cada artículo para poder confirmar su pedido");
        }
        else {
            var body = {
                pedidoProveedorId: this.pedidos.pedidoProveedores[0].id,
                estatusId: 13
            };
            this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].pedidosProveedores, body).subscribe(function (response1) {
                _this.alertaService.successAlertGeneric("El pedido ha sido confirmado, ponte en contacto con " + _this.pedidos.cliente.firstName);
                _this.navCtrl.pop();
            }, function (error) {
                _this.alertaService.errorAlertGeneric("Ocurrió un error, por favor intenta nuevamente.");
            });
        }
    };
    VerProductosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-ver-productos',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages-proveedor/ver-productos/ver-productos.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>Pedido Checklist</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list *ngIf="pedidos && pedidos?.pedidoProveedores.length > 0">\n    <ion-item class="item-list-card" *ngFor="let p of pedidos.pedidoProveedores[0].pedidoDetalles">\n      <div class="round" style="vertical-align:middle">\n        <input type="checkbox" id="checkbox" [(ngModel)]="p.activado"/>\n        <label for="checkbox"></label>\n      </div>\n      <div class="datos-tarjetas" style="vertical-align:middle">\n        <div class="name" style="font-size: 15px;">Producto <strong>{{p.productoProveedor.producto.nombre}}</strong></div>\n\n        <div class="number" style="font-size: 13px;">Cantidad <strong>{{p.cantidad}}</strong></div>\n        <div class="number" style="font-size: 13px;">Costo <strong>{{p.total | currency}}</strong></div>\n        \n      </div>\n\n    </ion-item>\n  </ion-list>\n\n  <div class="totals" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n\n      <div>Envio</div>\n      <div>=</div>\n      <div><strong>{{pedidos.pedidoProveedores[0].comisionTransportista | currency}}</strong></div>\n\n      <div>Costo</div>\n      <div>=</div>\n      <div><strong>{{pedidos.pedidoProveedores[0].comisionTransportista + pedidos.total | currency}}</strong></div>\n\n    <div>Total</div>\n    <div>=</div>\n    <div><strong>{{pedidos.total | currency}}</strong></div>\n  </div>\n</ion-content>\n<ion-footer class="footer-button-class">\n    <button (tap)="solicitar()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Solicitar cambio</button>\n    <button (tap)="confirmar()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Confirmar pedido</button>\n  </ion-footer>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages-proveedor/ver-productos/ver-productos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */]])
    ], VerProductosPage);
    return VerProductosPage;
}());

//# sourceMappingURL=ver-productos.js.map

/***/ }),

/***/ 577:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PedidosDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_loading_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PedidosDetailPage = /** @class */ (function () {
    function PedidosDetailPage(navCtrl, navParams, genericService, localStorageEncryptService, alertaService, loadingService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.detalle = null;
        this.id = null;
        this.detalle = navParams.get("detalle");
        this.id = navParams.get("id");
    }
    PedidosDetailPage.prototype.ionViewDidLoad = function () {
    };
    PedidosDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-pedidos-detail',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/pedidos-detail/pedidos-detail.html"*/'<ion-header>\n    <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n      <ion-title>Detalle pedido <strong>{{id | number:\'5.\'}}</strong></ion-title>\n    </ion-navbar>\n  </ion-header>\n\n<ion-content padding>\n    <div *ngFor="let p of detalle" class="separador">\n        <div class="proveedor">\n          <div class="nombre" style="font-weight: 900;\n          font-size: 18px;" [ngStyle]="{\'color\': genericService.getColorHex()}">{{p.proveedor?.nombre}}</div>\n          <div class="precio">{{p.total | currency}}</div>\n\n          <div class="costo-envio">Costo de envío</div>\n          <div class="precio-envio">{{p.comisionTransportista | currency}}</div>\n\n          <div class="costo-subtotal">Subtotal</div>\n          <div class="precio-subtotal">{{p.total + p.comisionTransportista | currency}}</div>\n        </div>\n\n\n      </div>\n</ion-content>\n'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/pedidos-detail/pedidos-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_5__services_loading_service__["a" /* LoadingService */]])
    ], PedidosDetailPage);
    return PedidosDetailPage;
}());

//# sourceMappingURL=pedidos-detail.js.map

/***/ }),

/***/ 578:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoriaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__articulo_productos_articulo_productos__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_producto_service__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__detalle_producto_detalle_producto__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mapa_proveedores_mapa_proveedores__ = __webpack_require__(543);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var CategoriaPage = /** @class */ (function () {
    function CategoriaPage(navCtrl, navParams, genericService, productoService, loadingService, alertaService, localStorageEncryptService, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.productoService = productoService;
        this.loadingService = loadingService;
        this.alertaService = alertaService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.categoria = null;
        this.articulos = null;
        this.articulosReplica = null;
        this.env = __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */];
        this.user = null;
        this.color = "#3b64c0";
        this.categoria = navParams.get("categoria");
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.cargarArticulos();
        this.events.subscribe("reloadUser", function (data) {
            try {
                _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            }
            catch (error) {
            }
        });
        if (this.localStorageEncryptService.getFromLocalStorage("theme")) {
            this.color = this.localStorageEncryptService.getFromLocalStorage("theme");
        }
        this.events.subscribe("changeColor", function (data) {
            try {
                if (_this.localStorageEncryptService.getFromLocalStorage("theme")) {
                    _this.color = _this.localStorageEncryptService.getFromLocalStorage("theme");
                }
            }
            catch (error) {
            }
        });
    }
    CategoriaPage.prototype.ionViewDidLoad = function () {
    };
    CategoriaPage.prototype.viewDetail = function (producto) {
        var _this = this;
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            //this.user.parametros.pantalla_proveedores = "N";
            if (_this.user && _this.user.parametros.pantalla_proveedores == "S") {
                _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].proveedorProductos + "/producto/" + producto.id).subscribe(function (response) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__mapa_proveedores_mapa_proveedores__["a" /* MapaProveedoresPage */], { proveedores: response, producto: producto });
                    _this.loadingService.hide();
                }, function (error) {
                    var err = error.error;
                    _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
            }
            else {
                _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.id).subscribe(function (response) {
                    //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
                    //let nav = this.app.getRootNav();
                    //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
                    if (_this.user) {
                        var carritos = _this.localStorageEncryptService.getFromLocalStorage("" + _this.user.id_token);
                        if (carritos) {
                            var position = carritos.findIndex(function (carrito) {
                                return carrito.id == response.id;
                            });
                            if (position >= 0) {
                                response.cantidad = carritos[position].cantidad;
                            }
                        }
                    }
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { producto: response });
                    _this.loadingService.hide();
                }, function (error) {
                    _this.loadingService.hide();
                    var err = error.error;
                    _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
            }
        });
        //
    };
    CategoriaPage.prototype.verTodos = function (articulo) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__articulo_productos_articulo_productos__["a" /* ArticuloProductosPage */], { articulo: articulo });
    };
    CategoriaPage.prototype.cargarArticulos = function () {
        var _this = this;
        this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].categoria + this.categoria.categoria.id).
            subscribe(function (res) {
            _this.articulos = res.productosTipoArticulo;
            _this.articulosReplica = _this.articulos;
        }, function (err) {
        });
    };
    CategoriaPage.prototype.up = function () {
        this.articulos = this.articulosReplica;
        this.articulos.forEach(function (item1) {
            item1.productos.sort(function (mayor, menor) {
                return mayor.precio - menor.precio;
            });
        });
    };
    CategoriaPage.prototype.down = function () {
        this.articulos = this.articulosReplica;
        this.articulos.forEach(function (item1) {
            item1.productos.sort(function (mayor, menor) {
                return menor.precio - mayor.precio;
            });
        });
    };
    CategoriaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-categoria',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/categoria/categoria.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>{{categoria.categoria.nombre}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div class="spinner-carrito" *ngIf="articulos == null">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <div *ngIf="articulos && articulos?.length>0" class="ordenamiento" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <div class="texto-ordena">\n      Ordernar por precio\n    </div>\n    <div class="botones">\n        <button ion-button outline style="width: 48%;" (click)="up()"\n        [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n          <ion-icon name="md-trending-up" class="botonFooter"></ion-icon>\n        </button>\n    </div>\n    <div class="botones">\n        <button ion-button outline style="width: 48%;" (click)="down()"\n        [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n          <ion-icon name="md-trending-down" class="botonFooter"></ion-icon>\n        </button>\n    </div>\n  </div>\n\n  <div *ngFor="let articulo of articulos">\n    <div class="titulo-wrapper">\n      <div class="seccion" [ngStyle]="{\'color\':color}">\n        {{articulo.tipoArticulo.nombre}}\n      </div>\n\n      <div class="ver-todos" (click)="verTodos(articulo)">\n        Ver todos\n      </div>\n    </div>\n    <div class="scrolling-wrapper" *ngIf="articulo.productos">\n      <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of articulo.productos; let i = index"\n        (click)="viewDetail(p)">\n        <div class="container-card">\n\n          <img src="{{env.getImagenIndividual}}{{p.producto.adjuntoId}}" />\n        </div>\n        <div class="container-text">{{p.producto.nombre}}</div>\n        <div class="description">{{p.producto.descripcion}}</div>\n        <div class="precio">{{p.precio | currency}}</div>\n\n        <!-- <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n                      <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n                        <div>-</div>\n                      </div>\n                      <div class="cantidad" *ngIf="p.cantidad > 0">\n                        <div>{{p.cantidad}}</div>\n                      </div>\n                      <div class="mas" (click)="incrementa(p)">\n                        <div>+</div>\n                      </div>\n                    </div> -->\n      </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/categoria/categoria.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_7__services_producto_service__["a" /* ProductoService */],
            __WEBPACK_IMPORTED_MODULE_8__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */]])
    ], CategoriaPage);
    return CategoriaPage;
}());

//# sourceMappingURL=categoria.js.map

/***/ }),

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticuloProductosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__detalle_producto_detalle_producto__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ArticuloProductosPage = /** @class */ (function () {
    function ArticuloProductosPage(navCtrl, navParams, genericService, alertaService, loadingService, localStorageEncryptService, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.productos = [];
        this.replicaProductos = [];
        this.paginaActual = 0;
        this.articulo = null;
        this.env = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */];
        this.resultadoPost = [];
        this.palabra = "";
        this.user = null;
        this.color = "#3b64c0";
        this.articulo = navParams.get("articulo");
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.cargarProductosArticulo();
        this.events.subscribe("reloadUser", function (data) {
            try {
                _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            }
            catch (error) {
            }
        });
        if (this.localStorageEncryptService.getFromLocalStorage("theme")) {
            this.color = this.localStorageEncryptService.getFromLocalStorage("theme");
        }
        this.events.subscribe("changeColor", function (data) {
            try {
                if (_this.localStorageEncryptService.getFromLocalStorage("theme")) {
                    _this.color = _this.localStorageEncryptService.getFromLocalStorage("theme");
                }
            }
            catch (error) {
            }
        });
    }
    ArticuloProductosPage.prototype.ionViewDidLoad = function () {
    };
    ArticuloProductosPage.prototype.doInfinite = function (infinite) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.cargarProductosArticulo(infinite);
                resolve();
            }, 500);
        });
    };
    ArticuloProductosPage.prototype.cargarProductosArticulo = function (resolve) {
        var _this = this;
        if (resolve === void 0) { resolve = null; }
        var params = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["d" /* HttpParams */]();
        params = params.set('sortType', "asc");
        params = params.set('limit', "10");
        params = params.set('page', this.paginaActual.toString());
        params = params.append('sort', "id");
        params = params.append('tipoArticuloId', this.articulo.tipoArticulo.id.toString());
        this.genericService.sendGetParams(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].productos + "/search", params).subscribe(function (response) {
            _this.resultadoPost = response;
            response.forEach(function (element) {
                _this.productos.push(element);
                _this.replicaProductos.push(element);
            });
            _this.paginaActual++;
            if (resolve) {
                resolve.complete();
            }
        }, function (error) {
            var err = error.error;
            _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    ArticuloProductosPage.prototype.viewDetail = function (producto) {
        var _this = this;
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.id).subscribe(function (response) {
                //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
                //let nav = this.app.getRootNav();
                //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
                if (_this.user) {
                    var carritos = _this.localStorageEncryptService.getFromLocalStorage("" + _this.user.id_token);
                    if (carritos) {
                        var position = carritos.findIndex(function (carrito) {
                            return carrito.id == response.id;
                        });
                        if (position >= 0) {
                            response.cantidad = carritos[position].cantidad;
                        }
                    }
                }
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { producto: response });
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
        //
    };
    ArticuloProductosPage.prototype.buscarPorPalabra = function () {
        var _this = this;
        this.productos = this.replicaProductos;
        this.productos = this.productos.filter(function (item) { return item.nombre.toUpperCase().includes(_this.palabra.toUpperCase()); });
    };
    ArticuloProductosPage.prototype.up = function () {
        this.palabra = "";
        this.productos = this.replicaProductos;
        this.productos.sort(function (mayor, menor) {
            return mayor.precio - menor.precio;
        });
    };
    ArticuloProductosPage.prototype.down = function () {
        this.palabra = "";
        this.productos = this.replicaProductos;
        this.productos.sort(function (mayor, menor) {
            return menor.precio - mayor.precio;
        });
    };
    ArticuloProductosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-articulo-productos',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/articulo-productos/articulo-productos.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>{{articulo.tipoArticulo?.nombre}}</ion-title>\n    \n  </ion-navbar>\n  <div class="busca" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n      <input type="text" [(ngModel)]="palabra" placeholder="Escribe aquí tu búsqueda" (keyup)="buscarPorPalabra()">\n    </div>\n</ion-header>\n\n<ion-content padding>\n    <div *ngIf="productos && productos?.length>0" class="ordenamiento" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n        <div class="texto-ordena">\n          Ordernar por precio\n        </div>\n        <div class="botones">\n          <button ion-button outline style="width: 48%;" (click)="up()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n            <ion-icon name="md-trending-up" class="botonFooter"></ion-icon>\n          </button>\n        </div>\n        <div class="botones">\n          <button ion-button outline style="width: 48%;" (click)="down()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n            <ion-icon name="md-trending-down" class="botonFooter"></ion-icon>\n          </button>\n        </div>\n      </div>\n  <div class="spinner-carrito" *ngIf="!productos || productos.length <= 0">\n    <ion-spinner></ion-spinner>\n  </div>\n\n\n\n  <div *ngIf="productos && productos.length > 0">\n    <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of productos; let i = index" (click)="viewDetail(p)">\n      <!-- <div class="tacha">\n                  <div class="mini-tacha">\n                      <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                      <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                  </div>\n                </div> -->\n      <div class="container-card">\n\n        <img src="{{env.getImagenIndividual}}{{p.adjuntoId}}" />\n      </div>\n      <div class="container-text">{{p.nombre}}</div>\n      <div class="description">{{p.descripcion}}</div>\n      <div class="precio">{{p.precio | currency}}</div>\n    </div>\n  </div>\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="resultadoPost.length % 10 == 0">\n    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Cargando...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/articulo-productos/articulo-productos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */]])
    ], ArticuloProductosPage);
    return ArticuloProductosPage;
}());

//# sourceMappingURL=articulo-productos.js.map

/***/ }),

/***/ 580:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_detalle_producto_detalle_producto__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__local_storage_encrypt_service__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**Clase provider que es básicamente un servicio generico para las peticiones a servicios */
var ProductoService = /** @class */ (function () {
    function ProductoService(alertaService, loadingService, genericService, app, localStorageEncryptService, events) {
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.genericService = genericService;
        this.app = app;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.user = null;
        this.productosCarrito = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        if (this.user) {
            this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        }
    }
    ProductoService.prototype.viewDetail = function (producto) {
        var _this = this;
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.id).subscribe(function (response) {
                var nav = _this.app.getRootNav();
                nav.push(__WEBPACK_IMPORTED_MODULE_6__pages_detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { producto: response });
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
        //
    };
    ProductoService.prototype.getTotalCarrito = function () {
        var productosCarrito = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        if (productosCarrito) {
            return productosCarrito.length;
        }
        else {
            return 0;
        }
    };
    ProductoService.prototype.deleteFavorito = function (producto) {
        this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        var nuevoArrarCarrito = [];
        var productoDelete = null;
        this.productosCarrito.forEach(function (element) {
            if (producto.id != element.id) {
                nuevoArrarCarrito.push(element);
            }
            else {
                productoDelete = element;
                productoDelete.carrito = false;
                producto.carrito = false;
            }
        });
        this.productosCarrito = nuevoArrarCarrito;
        this.localStorageEncryptService.setToLocalStorage("" + this.user.id_token, this.productosCarrito);
        //Llamar a events
        this.events.publish('updateProductos', { productoDelete: productoDelete });
        if (this.productosCarrito.length <= 0) {
            var nav = this.app.getRootNav();
            nav.pop();
        }
    };
    ProductoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_3__loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_5__generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_8__local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["d" /* Events */]])
    ], ProductoService);
    return ProductoService;
}());

//# sourceMappingURL=producto.service.js.map

/***/ }),

/***/ 581:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TarjetasFrecuentesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__detalle_tarjeta_detalle_tarjeta__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TarjetasFrecuentesPage = /** @class */ (function () {
    function TarjetasFrecuentesPage(navCtrl, navParams, localStorageEncryptService, events, app, genericService, alertaService, loadingService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.app = app;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.cards = null;
        this.user = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.events.subscribe('card', function (data) {
            if (!data.create) {
                var position = _this.cards.findIndex(function (img) {
                    return img.id == data.response.id;
                });
                for (var index = 0; index < _this.cards.length; index++) {
                    var element = _this.cards[index];
                    if (element.id == data.response.id) {
                        position = index;
                    }
                }
                _this.cards[position] = data.response;
            }
            else {
                _this.cards.push(data.response);
            }
            //this.cards = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}-cards`);
        });
        this.events.subscribe('actualizarTarjetas', function (data) {
            _this.getCards();
        });
    }
    TarjetasFrecuentesPage.prototype.getCards = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].tarjetas).subscribe(function (response) {
            //quitar
            _this.cards = response;
            if (_this.cards.length <= 0) {
                _this.alertaService.warnAlertGeneric("Aún no cuentas con tarjetas frecuentes");
            }
        }, function (error) {
            var err = error.error;
            _this.cards = null;
            //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    TarjetasFrecuentesPage.prototype.ngOnDestroy = function () {
        this.events.unsubscribe("card");
    };
    TarjetasFrecuentesPage.prototype.ionViewDidLoad = function () {
        this.getCards();
    };
    TarjetasFrecuentesPage.prototype.addCard = function (card) {
        if (card === void 0) { card = null; }
        var nav = this.app.getRootNav();
        var position;
        if (this.cards && card) {
            position = this.cards.findIndex(function (img) {
                return img.id == card.id;
            });
        }
        else {
            position = -1;
        }
        nav.push(__WEBPACK_IMPORTED_MODULE_5__detalle_tarjeta_detalle_tarjeta__["a" /* DetalleTarjetaPage */], { card: card, position: position, cards: this.cards, edit: card ? true : false });
    };
    TarjetasFrecuentesPage.prototype.borrar = function (item) {
        var _this = this;
        var position = this.cards.findIndex(function (img) {
            return img.id == item.id;
        });
        this.loadingService.show().then(function () {
            _this.genericService.sendDelete(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].tarjetas + "/" + item.id).subscribe(function (response) {
                _this.cards = _this.cards.slice(0, position).concat(_this.cards.slice(position + 1));
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                _this.alertaService.errorAlertGeneric("No se ha podido eliminar tu tarjeta, intenta nuevamente");
            });
        });
    };
    TarjetasFrecuentesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-tarjetas-frecuentes',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/tarjetas-frecuentes/tarjetas-frecuentes.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>Tarjetas Frecuentes</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div class="spinner-carrito" *ngIf="!cards">\n        <ion-spinner></ion-spinner>\n    </div>\n    <ion-list>\n        <ion-item-sliding #item *ngFor="let card of cards">\n          <ion-item class="item-list-card" (click)="addCard(card)">\n            <ion-avatar slot="start">\n              <img src="assets/imgs/tarjetas/bank.png" alt="">\n            </ion-avatar>\n            <div class="datos-tarjetas">\n              <div class="name">{{card.alias}}</div>\n              <div class="number">{{card.numeroTarjeta}}</div>\n            </div>\n          </ion-item>\n      \n          <ion-item-options side="right">\n            <button ion-button (click)="borrar(card)" color="danger">\n              <ion-icon name="ios-trash-outline"></ion-icon>\n              Borrar\n            </button>\n          </ion-item-options>\n        </ion-item-sliding>\n      </ion-list>\n</ion-content>\n\n<ion-fab bottom right class="fab-cards animated swing">\n  <button ion-fab (click)="addCard()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <ion-icon name="add"></ion-icon>\n  </button>\n</ion-fab>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/tarjetas-frecuentes/tarjetas-frecuentes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_0__services_loading_service__["a" /* LoadingService */]])
    ], TarjetasFrecuentesPage);
    return TarjetasFrecuentesPage;
}());

//# sourceMappingURL=tarjetas-frecuentes.js.map

/***/ }),

/***/ 582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetalleTarjetaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_validation_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var DetalleTarjetaPage = /** @class */ (function () {
    function DetalleTarjetaPage(navCtrl, navParams, formBuilder, localStorageEncryptService, alertaService, events, loadingService, genericService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.localStorageEncryptService = localStorageEncryptService;
        this.alertaService = alertaService;
        this.events = events;
        this.loadingService = loadingService;
        this.genericService = genericService;
        this.card = null;
        this.cards = null;
        this.btnHabilitado = true;
        this.user = null;
        this.position = null;
        this.objetoRegistro = [
            {
                name: "Nombre de la tarjeta",
                required: true,
                length: 50,
                type: "text",
                formName: "name",
                value: null,
                tag: "alias"
            },
            {
                name: "Número de tarjeta",
                required: true,
                length: 20,
                type: "number",
                formName: "card",
                value: null,
                tag: "numeroTarjeta"
            },
            {
                name: "Fecha de expiración",
                required: true,
                length: 50,
                type: "date",
                formName: "fecha",
                value: null,
                tag: "fechaCaducidad"
            },
            {
                name: "Pin/CCV",
                required: true,
                length: 3,
                type: "number",
                formName: "ccv",
                value: null,
                tag: "numeroSeguridad"
            }
        ];
        this.formGroup = null;
        this.render = false;
        this.edit = false;
        this.card = navParams.get("card");
        this.edit = navParams.get("edit");
        this.cards = navParams.get("cards");
        this.position = navParams.get("position");
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        var putObj = {};
        this.objetoRegistro.forEach(function (item) {
            var tmp = [];
            tmp[0] = null;
            tmp[1] = [];
            if (item.required) {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_7__angular_forms__["g" /* Validators */].required);
            }
            if (item.type == "number") {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_6__services_validation_service__["a" /* ValidationService */].phoneValidator);
                if (item.formName == "ccv") {
                    tmp[1].push(__WEBPACK_IMPORTED_MODULE_6__services_validation_service__["a" /* ValidationService */].maxLengthCCV);
                }
                if (item.formName == "card") {
                    tmp[1].push(__WEBPACK_IMPORTED_MODULE_6__services_validation_service__["a" /* ValidationService */].creditCardValidator);
                    tmp[1].push(__WEBPACK_IMPORTED_MODULE_6__services_validation_service__["a" /* ValidationService */].maxLengthCard);
                }
            }
            if (item.type == "email") {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_6__services_validation_service__["a" /* ValidationService */].emailValidator);
            }
            if (item.type == "password") {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_6__services_validation_service__["a" /* ValidationService */].passwordValidator);
            }
            if (item.type == "select") {
                tmp[0] = item.opts[0].value;
            }
            if (_this.card) {
                item.value = _this.card[item.tag];
                tmp[0] = _this.card[item.tag];
                _this.btnHabilitado = true;
            }
            putObj[item.formName] = tmp;
        });
        this.formGroup = this.formBuilder.group(putObj);
        this.render = true;
        this.events.subscribe("reloadUser", function (data) {
            try {
                _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            }
            catch (error) {
            }
        });
    }
    /**Verifica validaciones */
    DetalleTarjetaPage.prototype.ejecutaValidator = function () {
        var validacion = 0;
        for (var name_1 in this.formGroup.controls) {
            var n = this.formGroup.controls[name_1];
            if (n.value === 0) {
                validacion++;
            }
            if (n.errors) {
                validacion++;
            }
            /*
            if (n.value && (n.value === 0 || n.value.length === 0) && n.invalid) {
              invalid.push(this.translatePipe.instant(String(name).toUpperCase()));
              fields += `${this.translatePipe.instant(String(name).toUpperCase())}, `;
            } */
        }
        if (validacion <= 0) {
            this.btnHabilitado = false;
        }
        else {
            this.btnHabilitado = true;
        }
    };
    DetalleTarjetaPage.prototype.ionViewDidLoad = function () {
    };
    DetalleTarjetaPage.prototype.guardar = function () {
        //let cards: any = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}-cards`);
        var _this = this;
        /**Evaluar si hay tarjeta con mismo numero y nombre */
        var banderaRepetido = false;
        this.cards.forEach(function (element) {
            if (element.tarjeta == _this.objetoRegistro[1].value &&
                element.alias == _this.objetoRegistro[0].value) {
                banderaRepetido = true;
            }
        });
        if (banderaRepetido) {
            this.alertaService.warnAlertGeneric("Ya cuentas con una tarjeta con mismo nombre y número");
        }
        else {
            if (this.edit) {
                var tarjeta_1 = {
                    alias: this.objetoRegistro[0].value,
                    numeroTarjeta: this.objetoRegistro[1].value,
                    fechaCaducidad: this.objetoRegistro[2].value,
                    numeroSeguridad: this.objetoRegistro[3].value,
                    id: this.card.id
                };
                this.loadingService.show().then(function () {
                    _this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].tarjetas, tarjeta_1).subscribe(function (response) {
                        _this.alertaService.successAlertGeneric("Tarjeta frecuente modificada con éxito");
                        _this.loadingService.hide();
                        _this.navCtrl.pop();
                        _this.events.publish("card", { response: response, create: false });
                    }, function (error) {
                        _this.loadingService.hide();
                        _this.alertaService.errorAlertGeneric("No se ha podido modificar tu tarjeta frecuente, intenta nuevamente");
                    });
                });
            }
            else {
                if (this.objetoRegistro[3].value.length < 3) {
                    this.alertaService.warnAlertGeneric("El CCV debe contener 3 dígitos");
                }
                else {
                    //arma tarjeta//
                    var tarjeta_2 = {
                        alias: this.objetoRegistro[0].value,
                        numeroTarjeta: this.objetoRegistro[1].value,
                        fechaCaducidad: this.objetoRegistro[2].value,
                        numeroSeguridad: this.objetoRegistro[3].value
                    };
                    //
                    this.loadingService.show().then(function () {
                        _this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].tarjetas, tarjeta_2).subscribe(function (response) {
                            _this.alertaService.successAlertGeneric("Tarjeta frecuente agregada con éxito");
                            _this.loadingService.hide();
                            _this.events.publish("card", { response: response, create: true });
                            _this.navCtrl.pop();
                        }, function (error) {
                            _this.loadingService.hide();
                            _this.alertaService.errorAlertGeneric("No se ha podido agregar tu tarjeta frecuente, intenta nuevamente");
                        });
                    });
                    /* if (!cards) {
                      cards = [];
                    }
                    cards.push(tarjeta);
                    this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}-cards`, cards); */
                }
            }
        }
    };
    DetalleTarjetaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-detalle-tarjeta',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/detalle-tarjeta/detalle-tarjeta.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title *ngIf="card">{{card.alias}}</ion-title>\n    <ion-title *ngIf="!card">Nueva Tarjeta</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="contenedori">\n    <div class="formulario" *ngIf="render">\n      <form [formGroup]="formGroup">\n        <div *ngFor="let dato of objetoRegistro;let i = index" class="contenedor-input">\n          <input class="inp" placeholder="{{dato.name}}" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}" type="{{dato.type}}"\n            [(ngModel)]="dato.value" maxlength="{{dato.length}}" *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\' && dato.formName != \'ccv\'">\n  \n            <input placeholder="{{dato.name}}"  class="inp" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}" type="{{dato.type}}" type="password"\n            [(ngModel)]="dato.value" maxlength="{{dato.length}}" *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\' && dato.formName == \'ccv\'">\n  \n          <ion-datetime class="dt" [(ngModel)]="dato.value" formControlName="{{dato.formName}}" text-left pickerFormat="MM/YY"\n            cancelText="Cancelar" doneText="Aceptar" #fechaNac (ionChange)="ejecutaValidator()" *ngIf="dato.type == \'date\'"\n            placeholder="{{dato.name}}" min="2016" max="2050"></ion-datetime>\n  \n          <app-control-messages [control]="formGroup.controls[dato.formName]" [clase]="\'validators2\'">\n          </app-control-messages>\n        </div>\n        <div class="contenedor-boton">\n          <button [disabled]="btnHabilitado" (click)="guardar()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Guardar</button>\n        </div>\n      </form>\n    </div>\n  </div>\n  \n</ion-content>\n<ion-footer class="footer-button-class">\n  <div style="text-align: end;" ><img src="assets/imgs/tarjetas/visa.jpg" alt="" style="width:60%"></div>\n</ion-footer>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/detalle-tarjeta/detalle-tarjeta.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_generic_service__["a" /* GenericService */]])
    ], DetalleTarjetaPage);
    return DetalleTarjetaPage;
}());

//# sourceMappingURL=detalle-tarjeta.js.map

/***/ }),

/***/ 583:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__recuperar_password_recuperar_password__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__historial_pedidos_historial_pedidos__ = __webpack_require__(588);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = /** @class */ (function () {
    function TabsPage(genericService, localStorageEncryptService) {
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_5__historial_pedidos_historial_pedidos__["a" /* HistorialPedidosPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_0__recuperar_password_recuperar_password__["a" /* ProveedorPage */];
        this.user = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/tabs/tabs.html"*/'<ion-tabs color="{{genericService.getColor()}}" selectedIndex="1">\n    <ion-tab [root]="tab3Root" tabTitle="Proveedores" tabIcon="ios-cart-outline"></ion-tab>\n  <ion-tab [root]="tab1Root" tabTitle="Busca" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Mi historial" tabIcon="ios-albums-outline" *ngIf="genericService.getUser()"></ion-tab>\n  \n</ion-tabs>\n '/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 584:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filtro_producto_filtro_producto__ = __webpack_require__(585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detalle_producto_detalle_producto__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_action_sheet__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_Seccion__ = __webpack_require__(976);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__models_Proveedor__ = __webpack_require__(977);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__models_Categoria__ = __webpack_require__(978);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__carrito_compras_carrito_compras__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_string_utils_service__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__opciones_menu_opciones_menu__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__categoria_categoria__ = __webpack_require__(578);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


















var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, modalController, loadingService, alertCtrl, genericService, alertaService, localStorageEncryptService, events, actionSheet, stringUtilsService, app, popoverCtrl, menuCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalController = modalController;
        this.loadingService = loadingService;
        this.alertCtrl = alertCtrl;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.actionSheet = actionSheet;
        this.stringUtilsService = stringUtilsService;
        this.app = app;
        this.popoverCtrl = popoverCtrl;
        this.menuCtrl = menuCtrl;
        this.productos = [];
        this.promociones = [];
        this.productosBuscados = [];
        this.productosCategorias = [];
        this.productosCategoriasSub = [];
        this.categorias = [];
        this.proveedores = [];
        this.secciones = [];
        this.imgBusqueda = "/assets/imgs/home/search.png";
        this.textoBusqueda = "";
        this.pruebaImg = "assets/imgs/home/images.jpeg";
        this.dataFilter = {
            idProveedor: null,
            idSeccion: null,
            idCategoria: null,
            nombre: ""
        };
        this.objCombos = {
            secciones: this.secciones,
            proveedores: this.proveedores,
            categorias: this.categorias
        };
        this.env = __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */];
        this.user = null;
        this.totalCarrito = 0;
        this.color = "#3b64c0";
        /**Obtenci{on de usuario en sesión */
        this.menuCtrl.enable(true);
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        //this.totalCarrito = this.getTotalCarrito();
        this.events.subscribe("totalCarrito", function (data) {
            try {
                _this.totalCarrito = _this.getTotalCarrito();
            }
            catch (error) {
            }
        });
        this.events.subscribe("reloadUser", function (data) {
            try {
                _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            }
            catch (error) {
            }
        });
        if (this.localStorageEncryptService.getFromLocalStorage("theme")) {
            this.color = this.localStorageEncryptService.getFromLocalStorage("theme");
        }
        this.events.subscribe("changeColor", function (data) {
            try {
                if (_this.localStorageEncryptService.getFromLocalStorage("theme")) {
                    _this.color = _this.localStorageEncryptService.getFromLocalStorage("theme");
                }
            }
            catch (error) {
            }
        });
    }
    HomePage.prototype.cargaPromociones = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].promociones).subscribe(function (response) {
            _this.promociones = response;
            _this.verificarCarrito();
        }, function (error) {
            _this.promociones = null;
        });
    };
    HomePage.prototype.getTotalCarrito = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].carritoCompras).subscribe(function (response) {
            _this.localStorageEncryptService.setToLocalStorage("" + _this.user.id_token, response);
            _this.totalCarrito = response.length;
        }, function (error) {
        });
    };
    HomePage.prototype.ngOnDestroy = function () {
        this.events.unsubscribe("updateProductos");
    };
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.cargarProductosPorCategoria(1);
        this.cargaPromociones();
        //this.cargarProductos();
        //this.cargarProveedores();
        //this.cargarSecciones();
        //this.cargarCategorias();
        this.events.subscribe('updateProductos', function (data) {
            _this.getTotalCarrito();
        });
        if (this.user) {
            this.getTotalCarrito();
        }
        //this.cargarProductosCarrito();
    };
    HomePage.prototype.cargarProductosCarrito = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].carritoCompras).subscribe(function (response) {
            var nav = _this.app.getRootNav();
            _this.localStorageEncryptService.setToLocalStorage("" + _this.user.id_token, response);
            nav.push(__WEBPACK_IMPORTED_MODULE_13__carrito_compras_carrito_compras__["a" /* CarritoComprasPage */]);
        }, function (error) {
        });
    };
    HomePage.prototype.buscando = function () {
        if (this.textoBusqueda.length > 0) {
            this.imgBusqueda = "/assets/imgs/home/close.png";
        }
        else {
            this.imgBusqueda = "/assets/imgs/home/search.png";
        }
    };
    HomePage.prototype.close = function () {
        if (this.imgBusqueda == "/assets/imgs/home/close.png") {
            this.imgBusqueda = "/assets/imgs/home/search.png";
            this.textoBusqueda = "";
        }
    };
    HomePage.prototype.verificarCarrito = function () {
        var _this = this;
        if (this.user) {
            var productosStorage = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
            if (productosStorage) {
                productosStorage.forEach(function (item) {
                    _this.productos.forEach(function (element) {
                        if (item.id == element.id) {
                            element.carrito = true;
                            element.cantidad = item.cantidad;
                        }
                    });
                });
            }
        }
    };
    HomePage.prototype.verificarCarritoModificarCantidad = function (element) {
        var productosStorage = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        if (productosStorage) {
            productosStorage.forEach(function (item) {
                if (item.id == element.id) {
                    item.cantidad = element.cantidad;
                }
            });
        }
        this.localStorageEncryptService.setToLocalStorage("" + this.user.id_token, productosStorage);
    };
    HomePage.prototype.cargarSecciones = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].secciones, __WEBPACK_IMPORTED_MODULE_10__models_Seccion__["a" /* Seccion */])
            .subscribe(function (response) {
            _this.secciones = response;
            _this.objCombos.secciones = _this.secciones;
            //quitar
        }, function (error) {
            var err = error.error;
            //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    HomePage.prototype.cargarProveedores = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].proveedores, __WEBPACK_IMPORTED_MODULE_11__models_Proveedor__["a" /* Proveedor */])
            .subscribe(function (response) {
            _this.proveedores = response;
            _this.objCombos.proveedores = _this.proveedores;
            //quitar
        }, function (error) {
            var err = error.error;
            //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    HomePage.prototype.cargarCategorias = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].categorias, __WEBPACK_IMPORTED_MODULE_12__models_Categoria__["a" /* Categoria */])
            .subscribe(function (response) {
            _this.categorias = response;
            _this.objCombos.categorias = _this.categorias;
            //quitar
        }, function (error) {
            var err = error.error;
            //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    HomePage.prototype.incrementa = function (p) {
        var bandera = false;
        if (p.cantidad) {
            p.cantidad++;
        }
        else if (p.cantidad == 0) {
            p.cantidad = 1;
            bandera = true;
        }
        else {
            p.cantidad = 1;
            bandera = true;
        }
        this.agregarToCarritoBack(bandera, p);
    };
    HomePage.prototype.agregarToCarritoBack = function (bandera, producto) {
        var _this = this;
        var body = {
            precio: producto.precio,
            productoId: producto.id
        };
        var service = this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].carritoCompras, body);
        if (producto.cantidad > 1) {
            body.cantidad = producto.cantidad;
            service = this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].carritoCompras, body);
        }
        service.subscribe(function (response) {
            if (bandera) {
                _this.agregarToCarrito(producto);
            }
            _this.verificarCarritoModificarCantidad(producto);
        }, function (error) {
            if (producto.cantidad == 1) {
                producto.cantidad = 1;
            }
            else {
                producto.cantidad--;
            }
        });
    };
    /* decrementar(p: any) {
      p.cantidad--;
      this.borrarToCarritoBack(p);
    } */
    /* borrarToCarritoBack(producto: any) {
      let body: any = {
        precio: producto.precio,
        productoId: producto.id
      }
      body.cantidad = producto.cantidad;
      this.genericService.sendPutRequest(environment.carritoCompras, body).subscribe((response1: any) => {
        this.genericService.sendDeleteRequest(`${environment.carritoCompras}/${producto.id}`).subscribe((response2: any) => {
          if (producto.cantidad == 0) {
            this.productoService.deleteFavorito(producto);
            //this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
          }
          this.verificarCarritoModificarCantidad(producto);
        }, (error: HttpErrorResponse) => {
          producto.cantidad++;
        });
      }, (error: HttpErrorResponse) => {
        producto.cantidad++;
      });
    } */
    /* borrarToCarritoBack(producto: any) {
      this.genericService.sendDeleteRequest(`${environment.carritoCompras}/${producto.id}`).subscribe((response: any) => {
        if (producto.cantidad == 0) {
          this.productoService.deleteFavorito(producto);
        }
        this.verificarCarritoModificarCantidad(producto);
      }, (error: HttpErrorResponse) => {
        producto.cantidad++;
      });
    } */
    /**Método para cargar productos en base a especificaciones */
    HomePage.prototype.cargarProductos = function () {
        var _this = this;
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].productos).subscribe(function (response) {
                //quitar
                _this.productos = response;
                _this.verificarCarrito();
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
    };
    /**Método para cargar productos en base a especificaciones */
    HomePage.prototype.cargarProductosPorCategoria = function (opc) {
        var _this = this;
        this.productosCategorias = [];
        this.productosCategoriasSub = [];
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].proveedorProductos + "/home/" + opc).subscribe(function (response) {
                //quitar
                _this.productosCategorias = response.productosCategoria;
                for (var index = 1; index < _this.productosCategorias.length; index++) {
                    var element = _this.productosCategorias[index];
                    _this.productosCategoriasSub.push(element);
                }
                _this.verificarCarrito();
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
    };
    HomePage.prototype.ordena = function (opc) {
        this.cargarProductosPorCategoria(opc);
    };
    /**Método que mediante un modal abre una página con los filtros de intereses */
    HomePage.prototype.openFilters = function () {
        var _this = this;
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_2__filtro_producto_filtro_producto__["a" /* FiltroProductoPage */], { dataFilter: this.dataFilter, objCombos: this.objCombos });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                if (data != null) {
                    var valores = data.data;
                    _this.dataFilter = {
                        idProveedor: valores.idProveedor,
                        idSeccion: valores.idSeccion,
                        idCategoria: valores.idCategoria,
                        nombre: valores.nombre
                    };
                    //Autoclick
                    if (valores.cambio > 0) {
                        _this.loadingService.show().then(function () {
                            _this.buscarPorFiltros();
                        });
                    }
                }
            }
        });
    };
    HomePage.prototype.buscarPorFiltros = function () {
        var _this = this;
        var params = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["d" /* HttpParams */]();
        if (this.dataFilter.idProveedor) {
            params = params.set('proveedorId', this.dataFilter.idProveedor ? this.dataFilter.idProveedor : "");
        }
        if (this.dataFilter.idSeccion) {
            params = params.set('seccionId', this.dataFilter.idSeccion ? this.dataFilter.idSeccion : "");
        }
        if (this.dataFilter.idCategoria) {
            params = params.set('categoriaId', this.dataFilter.idCategoria ? this.dataFilter.idCategoria : "");
        }
        if (this.dataFilter.nombre) {
            params = params.append('nombre', this.dataFilter.nombre);
        }
        this.productosBuscados = [];
        this.genericService.sendGetParams(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].proveedorProductos + "/search", params).subscribe(function (response) {
            _this.productosBuscados = response;
            _this.loadingService.hide();
        }, function (error) {
            _this.loadingService.hide();
            var err = error.error;
            _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    HomePage.prototype.agregarColeccion = function () {
        var _this = this;
        var colecciones = this.localStorageEncryptService.getFromLocalStorage(this.user.id_token + "-colecciones");
        var buttonLabels = [];
        buttonLabels.push("Nueva colección");
        colecciones.forEach(function (coleccion) {
            buttonLabels.push(coleccion.nombre);
        });
        var options = {
            title: '',
            subtitle: '',
            buttonLabels: buttonLabels,
            addCancelButtonWithLabel: "Cancelar",
            androidTheme: 1,
            destructiveButtonLast: true
        };
        this.actionSheet.show(options).then(function (buttonIndex) {
            if (buttonIndex != 0) {
                var coleccion = buttonLabels[buttonIndex];
            }
            else {
                _this.nombrarColeccion();
            }
        });
    };
    HomePage.prototype.agregarToCarrito = function (producto) {
        var productosStorage = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        var productos = [];
        productos.push(producto);
        if (productosStorage) {
            productosStorage.forEach(function (element) {
                productos.push(element);
            });
        }
        producto.carrito = true;
        try {
            this.localStorageEncryptService.setToLocalStorage("" + this.user.id_token, productos);
        }
        catch (error) {
            producto.carrito = false;
        }
    };
    HomePage.prototype.nombrarColeccion = function () {
        var alert = this.alertCtrl.create({
            title: 'Colecciones',
            inputs: [
                {
                    name: 'coleccion',
                    placeholder: 'Nombra tu coleccion'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function (data) {
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.verCarrito = function () {
        if (this.genericService.getTotalCarrito() > 0) {
            //nav.pop();
            this.cargarProductosCarrito();
        }
    };
    HomePage.prototype.verOpciones = function () {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_16__opciones_menu_opciones_menu__["a" /* OpcionesMenuPage */], {}, { cssClass: "clase-Pop" });
        popover.present({});
    };
    HomePage.prototype.irToCategoria = function (categoria) {
        var nav = this.app.getRootNav();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_17__categoria_categoria__["a" /* CategoriaPage */], { categoria: categoria });
    };
    HomePage.prototype.viewDetail = function (producto) {
        var _this = this;
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.id).subscribe(function (response) {
                //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
                //let nav = this.app.getRootNav();
                //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
                if (_this.user) {
                    var carritos = _this.localStorageEncryptService.getFromLocalStorage("" + _this.user.id_token);
                    if (carritos) {
                        var position = carritos.findIndex(function (carrito) {
                            return carrito.id == response.id;
                        });
                        if (position >= 0) {
                            response.cantidad = carritos[position].cantidad;
                        }
                    }
                }
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { producto: response });
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
        //
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Productos</ion-title>\n\n\n     \n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="verCarrito()" class="carrito" *ngIf="user">\n        <ion-badge *ngIf="totalCarrito > 0" [ngStyle]="{\'color\': genericService.getColorHex()}">{{totalCarrito}}</ion-badge>\n        <ion-icon name="ios-cart-outline" style="font-size: 2.4rem;"></ion-icon>\n\n      </button>\n\n      <button ion-button icon-only (click)="verOpciones()">\n        <ion-icon name="md-more" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n  <div class="division" [ngStyle]="{\'background-color\': color}">\n    <label for="search"></label>\n    <div class="input-image" (click)="close()" [style.background-image]="\'url(\'+imgBusqueda+\')\'"></div>\n    <input type="text" placeholder="Buscar" class="input-text" id="search" [(ngModel)]="dataFilter.nombre" (keyup)="buscarPorFiltros()">\n\n  </div>\n</ion-header>\n\n<div class="filtro" *ngIf="1==2">\n  <button ion-button (click)="openFilters()">\n    <ion-icon ios="ios-options" md="ios-options"></ion-icon>\n  </button>\n</div>\n\n<ion-content>\n\n  <div *ngIf="dataFilter.nombre.length > 0" class="contenedor-busqueda">\n    <div class="resultado" *ngFor="let p of productosBuscados" (click)="viewDetail(p)">\n      <div class="c-i "><img src="{{env.getImagenIndividual}}{{p.producto.adjuntoId}}" alt=""></div>\n      <div class="r">{{ p.producto.nombre }} - {{p.proveedor.nombre}}</div>\n    </div>\n\n    <div *ngIf="productosBuscados.length <= 0" class="no-en">\n      No se encontraron resultados\n    </div>\n  </div>\n\n  <div *ngIf="dataFilter.nombre.length<=0">\n    <div style="margin-top: 8px"></div>\n\n    <div class="scrolling-wrapper-flexbox" style="margin-top:0px">\n      <div class="promociones" [style.background-image]="\'url(\'+env.getImagenIndividual+promo.adjuntoId+\')\'" *ngFor="let promo of promociones">\n        <div class="contenedor-imagen">\n          <!-- <img src="assets/imgs/home/images.jpeg" alt=""> -->\n        </div>\n        <div class="info">\n          <p class="titulo">{{promo.titulo}}</p>\n          <p class="subtitulo">{{promo.descripcion}}</p>\n        </div>\n      </div>\n    </div>\n\n    <div class="scrolling-wrapper" style="margin-top: 15px">\n      <div class="buttons">\n        <button [ngStyle]="{\'background-color\': color}" (click)="ordena(1)">\n          <img src="assets/imgs/home/milk.png" alt="">\n          Artículos\n        </button>\n      </div>\n      <div class="buttons">\n        <button [ngStyle]="{\'background-color\': color}" (click)="ordena(2)">\n          <img src="assets/imgs/home/services.png" alt="">\n          Servicios\n        </button>\n      </div>\n\n    </div>\n\n    <div class="card-super" *ngIf="productosCategorias.length > 0">\n      <div class="cont">\n        <div class="principal" (click)="irToCategoria(productosCategorias[0])">\n          <img src="{{env.getImagenIndividual}}{{productosCategorias[0].categoria.adjuntoId}}" alt="">\n          <div class="seccion-principal" [ngStyle]="{\'color\': color}">{{productosCategorias[0].categoria.nombre}}</div>\n        </div>\n\n        <div class="borde-b"></div>\n\n        <div class="contenedor-tres">\n          <div class="contenedor-int" (click)="irToCategoria(cat)" *ngFor="let cat of productosCategoriasSub">\n            <img src="{{env.getImagenIndividual}}{{cat.categoria.adjuntoId}}" alt="">\n            <div class="seccion-sub-principal" [ngStyle]="{\'color\': color}">{{cat.categoria.nombre}}</div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_14__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_action_sheet__["a" /* ActionSheet */],
            __WEBPACK_IMPORTED_MODULE_15__services_string_utils_service__["a" /* StringUtilsService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 585:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltroProductoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FiltroProductoPage = /** @class */ (function () {
    function FiltroProductoPage(navCtrl, navParams, viewCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.events = events;
        this.filtros = {};
        this.selectOptions = {
            cssClass: 'action-sheet-class'
        };
        this.proveedores = null;
        this.categorias = null;
        this.secciones = null;
        this.filtros = navParams.get('dataFilter');
        var objCombos = navParams.get('objCombos');
        if (objCombos) {
            this.secciones = objCombos.secciones;
            this.proveedores = objCombos.proveedores;
            this.categorias = objCombos.categorias;
        }
        this.events.subscribe('closedAlerts', function (data) {
            try {
                _this.viewCtrl.dismiss();
            }
            catch (error) {
            }
        });
    }
    FiltroProductoPage.prototype.ionViewDidLoad = function () {
        this.filtros.cambio = 0;
    };
    /**Método para cerrar el modal, sin embargo
     * se envían de vuelta los filtros para manipularlos en la búsqueda
     */
    FiltroProductoPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss({ data: this.filtros });
    };
    /**
     * Método que cambia el valor del checkbox seleccionado
     */
    FiltroProductoPage.prototype.evaluateAttribute = function (atributo) {
        atributo = !atributo;
    };
    FiltroProductoPage.prototype.change = function () {
        this.filtros.cambio++;
    };
    FiltroProductoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-filtro-producto',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/filtro-producto/filtro-producto.html"*/'<ion-header>\n  <ion-toolbar color="{{genericService.getColor()}}">\n    <ion-title>Productos: Filtros</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss(false)">\n        <span color="secundary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android, windows" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class="wrapper-frame">\n    <p>Filtra los productos seleccionando lo que más te interese.</p>\n    <div class="block">\n\n      <ion-item>\n        <ion-label floating>Nombre producto</ion-label>\n        <ion-input (keyup)="change()" type="text" [(ngModel)]="filtros.nombre" style="border-bottom: 1px solid #3b64bf;"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Proveedores</ion-label>\n        <ion-select (ionChange)="change()" [(ngModel)]="filtros.idProveedor" okText="Ok" cancelText="Cancelar" interface="action-sheet"\n          [selectOptions]="selectOptions">\n          <ion-option *ngFor="let op of proveedores" [value]="op.id">\n            {{op.nombre}}\n          </ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label>Categorías</ion-label>\n        <ion-select (ionChange)="change()" [(ngModel)]="filtros.idCategoria" okText="Ok" cancelText="Cancelar" interface="action-sheet"\n          [selectOptions]="selectOptions">\n          <ion-option *ngFor="let op of categorias" [value]="op.id">\n            {{op.nombre}}\n          </ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label>Secciones</ion-label>\n        <ion-select (ionChange)="change()" [(ngModel)]="filtros.idSeccion" okText="Ok" cancelText="Cancelar" interface="action-sheet"\n          [selectOptions]="selectOptions">\n          <ion-option *ngFor="let op of secciones" [value]="op.id">\n            <ion-icon name="md-close"></ion-icon>\n            {{op.nombre}}\n          </ion-option>\n        </ion-select>\n      </ion-item>\n\n    </div>\n  </div>\n\n</ion-content>\n<ion-footer class="footer-button">\n  <div class="btn-full" (tap)="dismiss()">\n    <span>Aceptar</span>\n  </div>\n</ion-footer>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/filtro-producto/filtro-producto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
    ], FiltroProductoPage);
    return FiltroProductoPage;
}());

//# sourceMappingURL=filtro-producto.js.map

/***/ }),

/***/ 586:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarritoComprasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_geo_proveedores_home_geo_proveedores__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__detalle_producto_detalle_producto__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_validation_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var CarritoComprasPage = /** @class */ (function () {
    function CarritoComprasPage(navCtrl, navParams, localStorageEncryptService, events, modalController, 
        //private productoService: ProductoService,
        genericService, alertCtrl, alertaService, loadingService, formBuilder, currencyPipe) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.modalController = modalController;
        this.genericService = genericService;
        this.alertCtrl = alertCtrl;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.formBuilder = formBuilder;
        this.currencyPipe = currencyPipe;
        this.user = null;
        this.productosCarrito = [];
        this.productosCarritoReplica = [];
        this.env = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */];
        this.stripe = Stripe('pk_test_TNjRZggfGMHinhrlBVIP1P1B00d8WURtiI');
        this.cards = null;
        this.dataCard = {
            tarj: "",
            cvc: "",
            dtime: ""
        };
        this.pagoActual = null;
        this.objetoRegistro = [
            {
                name: "Nombre del contacto",
                required: true,
                length: 50,
                type: "text",
                formName: "name",
                value: null,
                disabled: false
            },
            {
                name: "Teléfono",
                required: true,
                length: 10,
                type: "number",
                formName: "tel",
                value: null,
                disabled: false
            },
            {
                name: "Correo electrónico",
                required: true,
                length: 100,
                type: "email",
                formName: "email",
                value: null,
                disabled: false
            },
            {
                name: "Dirección",
                required: true,
                length: 200,
                type: "text",
                formName: "direc",
                value: null,
                disabled: true
            },
            {
                name: "Código postal",
                required: false,
                length: 6,
                type: "text",
                formName: "cp",
                value: null,
                disabled: true
            },
        ];
        this.formGroup = null;
        this.btnHabilitado = true;
        this.data = null;
        this.objetoRegistroCopy = [];
        this.check = false;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        this.productosCarritoReplica = this.productosCarrito;
        this.getCards();
    }
    CarritoComprasPage.prototype.seleccionar = function (card) {
        if (!card.selected) {
            this.cards.forEach(function (element) {
                element.selected = false;
            });
            card.selected = true;
        }
        else {
            card.selected = false;
        }
    };
    CarritoComprasPage.prototype.getCards = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].tarjetas).subscribe(function (response) {
            _this.cards = response;
            _this.cards.forEach(function (element) {
                element.selected = false;
            });
            if (_this.cards.length <= 0) {
                //this.alertaService.warnAlertGeneric("Aún no cuentas con tarjetas frecuentes");
            }
        }, function (error) {
            var err = error.error;
            _this.cards = null;
            //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    CarritoComprasPage.prototype.ionViewDidLoad = function () {
        //this.cargarProductosCarrito();
        //this.setupStripe();
    };
    CarritoComprasPage.prototype.setupStripe = function () {
        var _this = this;
        var position = this.cards.findIndex(function (carrito) {
            return carrito.selected;
        });
        var c = {
            number: "4242424242424242",
            cvc: "123",
            exp_month: 12,
            exp_year: 2025
        };
        var bandera = false;
        if (this.cards[position]) {
            var item = this.cards[position];
            var fechaFormat = item.fechaCaducidad.split("-");
            item.expMont = fechaFormat[1];
            item.expYear = fechaFormat[0];
            c.number = item.numeroTarjeta;
            c.cvc = item.numeroSeguridad;
            c.exp_month = item.expMont;
            c.exp_year = item.expYear;
        }
        else if (this.dataCard.dtime.length == 0 || this.dataCard.tarj.length == 0 || this.dataCard.cvc.length == 0) {
            bandera = true;
        }
        else {
            c.number = this.dataCard.tarj;
            c.cvc = this.dataCard.cvc;
            var fechaFormat = this.dataCard.dtime.split("-");
            var expMont = fechaFormat[1];
            var expYear = fechaFormat[0];
            c.exp_month = expMont;
            c.exp_year = expYear;
        }
        if (!bandera) {
            Stripe.setPublishableKey('pk_test_TNjRZggfGMHinhrlBVIP1P1B00d8WURtiI');
            this.loadingService.show().then(function () {
                var clase = _this;
                Stripe.card.createToken(c, function (status, response) {
                    if (response.error) {
                        clase.loadingService.hide();
                        clase.alertaService.errorAlertGeneric("Lo sentimos! No es posible efectuar el cobro, verifica que la información de tu tarjeta es correcta");
                    }
                    else {
                        // Get the token ID:
                        //clase.loadingService.hide();
                        var token = response.id;
                        var body = {
                            pedidoId: clase.pagoActual.id,
                            token: token
                        };
                        var service = clase.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].pedidos + "/pago", body);
                        service.subscribe(function (response) {
                            clase.loadingService.hide();
                            clase.alertaService.successAlertGeneric("El pago se ha efectuado con éxito");
                            clase.cerrar();
                        }, function (error) {
                            clase.loadingService.hide();
                            clase.alertaService.errorAlertGeneric("Ocurrió un error al procesar tu pago, intenta nuevamente");
                        });
                    }
                });
            });
        }
        else {
            this.alertaService.warnAlertGeneric("Llena todos los campos de tarjeta o selecciona alguna que hayas ingresado anteriormente");
        }
    };
    CarritoComprasPage.prototype.cerrar = function () {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
        this.dataCard = {
            tarj: "",
            cvc: "",
            dtime: ""
        };
        this.cards.forEach(function (element) {
            element.selected = false;
        });
    };
    CarritoComprasPage.prototype.deleteFavorito = function (producto) {
        var nuevoArrarCarrito = [];
        var productoDelete = null;
        this.productosCarrito.forEach(function (element) {
            if (producto.id != element.id) {
                nuevoArrarCarrito.push(element);
            }
            else {
                productoDelete = element;
            }
        });
        this.productosCarrito = nuevoArrarCarrito;
        this.localStorageEncryptService.setToLocalStorage("" + this.user.id_token, this.productosCarrito);
        //Llamar a events
        this.events.publish('updateProductos', { productoDelete: productoDelete });
        if (this.productosCarrito.length <= 0) {
            this.navCtrl.pop();
        }
    };
    CarritoComprasPage.prototype.incrementa = function (p) {
        var bandera = false;
        if (p.cantidad) {
            p.cantidad++;
        }
        else if (p.cantidad == 0) {
            p.cantidad = 1;
            bandera = true;
        }
        else {
            p.cantidad = 1;
            bandera = true;
        }
        this.agregarToCarritoBack(bandera, p);
    };
    CarritoComprasPage.prototype.agregarToCarrito = function (producto) {
        var productosStorage = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        var productos = [];
        productos.push(producto);
        if (productosStorage) {
            productosStorage.forEach(function (element) {
                productos.push(element);
            });
        }
        producto.carrito = true;
        try {
            this.localStorageEncryptService.setToLocalStorage("" + this.user.id_token, productos);
        }
        catch (error) {
            producto.carrito = false;
        }
    };
    CarritoComprasPage.prototype.agregarToCarritoBack = function (bandera, producto) {
        var _this = this;
        var body = {
            precio: producto.precio,
            productoProveedorId: producto.productoProveedor.id
        };
        var service = this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].carritoCompras, body);
        if (producto.cantidad > 1) {
            body.cantidad = producto.cantidad;
            service = this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].carritoCompras, body);
        }
        service.subscribe(function (response) {
            if (bandera) {
                _this.agregarToCarrito(producto);
            }
            _this.verificarCarritoModificarCantidad(producto);
        }, function (error) {
            if (producto.cantidad == 1) {
                producto.cantidad = 1;
            }
            else {
                producto.cantidad--;
            }
        });
    };
    CarritoComprasPage.prototype.viewDetail = function (producto) {
        var _this = this;
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.productoProveedor.id).subscribe(function (response) {
                //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
                //let nav = this.app.getRootNav();
                //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
                if (_this.user) {
                    var carritos = _this.localStorageEncryptService.getFromLocalStorage("" + _this.user.id_token);
                    if (carritos) {
                        var position = carritos.findIndex(function (carrito) {
                            return carrito.id == response.id;
                        });
                        if (position >= 0) {
                            response.cantidad = carritos[position].cantidad;
                        }
                    }
                }
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { producto: response });
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
        //
    };
    CarritoComprasPage.prototype.decrementar = function (p) {
        p.cantidad--;
        this.borrarToCarritoBack(p);
    };
    CarritoComprasPage.prototype.borrarToCarritoBack = function (producto) {
        var _this = this;
        var body = {
            precio: producto.precio,
            productoProveedorId: producto.productoProveedor.id
        };
        body.cantidad = producto.cantidad;
        this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].carritoCompras, body).subscribe(function (response1) {
            if (producto.cantidad == 0) {
                _this.genericService.sendDelete(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].carritoCompras + "/" + producto.id).subscribe(function (response2) {
                    if (producto.cantidad == 0) {
                        _this.events.publish("totalCarrito");
                        _this.deleteFavoritoService(producto);
                        //this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
                    }
                    _this.verificarCarritoModificarCantidad(producto);
                }, function (error) {
                    producto.cantidad++;
                });
            }
            else {
                _this.verificarCarritoModificarCantidad(producto);
            }
        }, function (error) {
            producto.cantidad++;
        });
    };
    CarritoComprasPage.prototype.deleteFavoritoService = function (producto) {
        this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        var nuevoArrarCarrito = [];
        var productoDelete = null;
        this.productosCarrito.forEach(function (element) {
            if (producto.productoProveedor.producto.id != element.productoProveedor.producto.id) {
                nuevoArrarCarrito.push(element);
            }
            else {
                productoDelete = element;
                productoDelete.carrito = false;
                producto.carrito = false;
            }
        });
        this.productosCarrito = nuevoArrarCarrito;
        this.localStorageEncryptService.setToLocalStorage("" + this.user.id_token, this.productosCarrito);
        //Llamar a events
        this.events.publish('updateProductos', { productoDelete: productoDelete });
        if (this.productosCarrito.length <= 0) {
            this.navCtrl.pop();
        }
    };
    CarritoComprasPage.prototype.verificarCarritoModificarCantidad = function (element) {
        var productosStorage = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        if (productosStorage) {
            productosStorage.forEach(function (item) {
                if (item.id == element.id) {
                    item.cantidad = element.cantidad;
                }
            });
        }
        this.localStorageEncryptService.setToLocalStorage("" + this.user.id_token, productosStorage);
    };
    CarritoComprasPage.prototype.infoContact = function () {
        var _this = this;
        var modal = document.getElementById("myModal2");
        //
        var putObj = {};
        this.objetoRegistro.forEach(function (item) {
            var tmp = [];
            tmp[0] = null;
            tmp[1] = [];
            if (item.required) {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_10__angular_forms__["g" /* Validators */].required);
            }
            if (item.type == "number") {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_9__services_validation_service__["a" /* ValidationService */].phoneValidator);
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_9__services_validation_service__["a" /* ValidationService */].maxLengthValidator);
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_9__services_validation_service__["a" /* ValidationService */].minLengthValidator);
            }
            if (item.type == "email") {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_9__services_validation_service__["a" /* ValidationService */].emailValidator);
            }
            if (item.type == "password") {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_9__services_validation_service__["a" /* ValidationService */].passwordValidator);
            }
            if (item.type == "select") {
                tmp[0] = item.opts[0].value;
            }
            if (_this.user) {
            }
            putObj[item.formName] = tmp;
        });
        this.formGroup = this.formBuilder.group(putObj);
        //
        modal.style.display = "block";
    };
    CarritoComprasPage.prototype.closeInfoContact = function () {
        var modal = document.getElementById("myModal2");
        modal.style.display = "none";
        this.objetoRegistro.forEach(function (item) {
            item.value = null;
        });
        this.formGroup = null;
        this.btnHabilitado = true;
    };
    CarritoComprasPage.prototype.cerrarModal3 = function () {
        var modal = document.getElementById("myModal3");
        modal.style.display = "none";
    };
    CarritoComprasPage.prototype.openModal3 = function () {
        var modal = document.getElementById("myModal3");
        modal.style.display = "block";
    };
    /**Verifica validaciones */
    CarritoComprasPage.prototype.ejecutaValidator = function () {
        var validacion = 0;
        for (var name_1 in this.formGroup.controls) {
            var n = this.formGroup.controls[name_1];
            if (n.invalid) {
                validacion++;
            }
            /*
            if (n.value && (n.value === 0 || n.value.length === 0) && n.invalid) {
              invalid.push(this.translatePipe.instant(String(name).toUpperCase()));
              fields += `${this.translatePipe.instant(String(name).toUpperCase())}, `;
            } */
        }
        if (validacion <= 0) {
            this.btnHabilitado = false;
        }
        else {
            this.btnHabilitado = true;
        }
    };
    CarritoComprasPage.prototype.getMapa = function () {
        var _this = this;
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_0__home_geo_proveedores_home_geo_proveedores__["a" /* HomeGeoProveedoresPage */], { fromModal: true });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                if (data != null) {
                    _this.data = data.data;
                    _this.objetoRegistro[3].value = _this.data.direccion;
                    _this.objetoRegistro[4].value = _this.data.codigoPostal;
                    setTimeout(function () {
                        _this.ejecutaValidator();
                    }, 1000);
                }
            }
        });
    };
    CarritoComprasPage.prototype.precompra = function () {
        var _this = this;
        this.objetoRegistroCopy = [];
        this.objetoRegistroCopy.push({ value: this.formGroup.controls["name"].value });
        this.objetoRegistroCopy.push({ value: this.formGroup.controls["tel"].value });
        this.objetoRegistroCopy.push({ value: this.formGroup.controls["email"].value });
        var body = {
            nombreContacto: this.objetoRegistroCopy[0].value,
            telefonoContacto: this.objetoRegistroCopy[1].value,
            correoContacto: this.objetoRegistroCopy[2].value,
            direccionContacto: {
                id: this.data.id ? this.data.id : null,
                codigoPostal: this.data.codigoPostal,
                direccion: this.data.direccion,
                latitud: this.data.latitud,
                longitud: this.data.longitud
            },
            productos: []
        };
        this.productosCarrito.forEach(function (item) {
            body.productos.push({
                cantidad: item.cantidad,
                productoProveedorId: item.productoProveedorId
            });
        });
        var service = this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].pedidos, body);
        this.loadingService.show().then(function () {
            service.subscribe(function (response) {
                _this.pagoActual = response;
                _this.loadingService.hide();
                //this.comprar();
                _this.closeInfoContact();
                setTimeout(function () {
                    _this.openModal3();
                }, 300);
            }, function (error) {
                _this.loadingService.hide();
                _this.alertaService.errorAlertGeneric("Ocurrió un error al procesar tu pago, intenta nuevamente");
            });
        });
    };
    CarritoComprasPage.prototype.comprar = function () {
        if (this.check) {
            this.cerrarModal3();
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            this.check = false;
        }
        else {
            this.alertaService.warnAlertGeneric("Por favor, acepta los términos y condiciones");
        }
    };
    CarritoComprasPage.prototype.confirmar = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Confirmación",
            message: "Se realizar\u00E1 un cargo a su tarjeta por " + this.currencyPipe.transform(this.pagoActual.total) + " \u00BFEst\u00E1s de acuerdo?",
            cssClass: this.genericService.getColorClassTWO(),
            buttons: [
                {
                    text: "No",
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Si',
                    handler: function () {
                        //this.confirmar();
                        _this.setupStripe();
                    }
                }
            ]
        });
        alert.present();
    };
    CarritoComprasPage.prototype.addToList = function () {
        var _this = this;
        var inputs = [
            {
                name: 'nombre',
                placeholder: 'Nombre de mi lista',
                type: 'text',
                id: "i-1-name"
            }
        ];
        var buttons = [
            {
                text: "Agregar",
                handler: function (data) {
                    var body = {
                        nombre: data.nombre
                    };
                    var service = _this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].carritoHistorico, body);
                    _this.loadingService.show().then(function () {
                        service.subscribe(function (response) {
                            _this.alertaService.successAlertGeneric("Lista frecuente agregada con éxito");
                            _this.loadingService.hide();
                            return true;
                        }, function (error) {
                            _this.loadingService.hide();
                            _this.alertaService.errorAlertGeneric("No se ha podido agregar tu lista frecuente, intenta nuevamente");
                            return true;
                        });
                    });
                }
            }
        ];
        var data = {
            title: "Mi lista frecuente",
            message: "Ingresa el nombre de tu lista frecuente, \u00E9sta aparecer\u00E1 en tu men\u00FA de listas de carrito frecuentes",
            inputs: inputs,
        };
        var alert = this.alertCtrl.create({
            title: data.title,
            cssClass: this.genericService.getColorClass(),
            message: data.message,
            inputs: data.inputs,
            buttons: buttons
        });
        alert.present();
    };
    CarritoComprasPage.prototype.up = function () {
        this.productosCarrito = this.productosCarritoReplica;
        this.productosCarrito.carritoHistoricoDetalles.sort(function (mayor, menor) {
            return mayor.precio - menor.precio;
        });
    };
    CarritoComprasPage.prototype.down = function () {
        this.productosCarrito = this.productosCarritoReplica;
        this.productosCarrito.carritoHistoricoDetalles.sort(function (mayor, menor) {
            return menor.precio - mayor.precio;
        });
    };
    CarritoComprasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-carrito-compras',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/carrito-compras/carrito-compras.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>Mi carrito</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<div id="myModal" class="modal">\n\n  <div class="modal-content animated lightSpeedIn">\n\n    <div class="tacha" (click)="cerrar()" [ngStyle]="{\'color\': genericService.getColorHex()}">\n      <ion-icon ios="md-close" md="md-close"></ion-icon>\n    </div>\n    <div class="selecciona" [ngStyle]="{\'color\': genericService.getColorHex()}" *ngIf="cards && cards?.length > 0">Selecciona tu tarjeta</div>\n    <ion-list *ngIf="cards && cards?.length > 0">\n      <ion-item class="item-list-card" *ngFor="let card of cards" [ngClass]="{\'seleccionado\':card.selected}" (click)="seleccionar(card)">\n        <ion-avatar slot="start">\n          <img src="assets/imgs/tarjetas/bank.png" alt="">\n        </ion-avatar>\n        <div class="datos-tarjetas">\n          <div class="name">{{card.alias}}</div>\n          <div class="number">{{card.numeroTarjeta}}</div>\n        </div>\n\n      </ion-item>\n    </ion-list>\n    <div class="ingresa" [ngStyle]="{\'color\': genericService.getColorHex()}" *ngIf="cards && cards?.length > 0">Ó\n      ingresa una para hacer el pago</div>\n    <div class="ingresa" [ngStyle]="{\'color\': genericService.getColorHex()}" *ngIf="!cards || cards?.length <= 0">Ingresa\n      una tarjeta para hacer el pago</div>\n\n\n\n    <div class="form-row">\n      <input type="number" placeholder="N. Tarjeta" id="tarj" [(ngModel)]="dataCard.tarj" style="width: 100%">\n\n      <ion-datetime class="dt" text-left pickerFormat="MM/YY" cancelText="Cancelar" doneText="Aceptar" #fechaNac\n        placeholder="04/24" min="2016" max="2050" id="dtime" [(ngModel)]="dataCard.dtime"></ion-datetime>\n\n      <input type="number" placeholder="CVC" id="cvc" [(ngModel)]="dataCard.cvc">\n\n\n\n\n    </div>\n    <button ion-button block large style="padding: 10px;\n        height: auto;\n        contain: none;\n        margin-top: 15px;font-size: 14px;"\n      [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="confirmar()">Pagar</button>\n  </div>\n</div>\n\n<div id="myModal2" class="modal2">\n\n  <div class="modal-content animated lightSpeedIn">\n\n    <div style="top: 3px;" class="tacha" (click)="closeInfoContact()" [ngStyle]="{\'color\': genericService.getColorHex()}">\n      <ion-icon ios="md-close" md="md-close"></ion-icon>\n    </div>\n\n    <div style="width: 90%;\n      padding: 7px;\n      color: #fff;\n      border-radius: 4px;" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Llena\n      la información de contacto</div>\n    <div class="formulario" *ngIf="formGroup">\n      <form [formGroup]="formGroup">\n        <div *ngFor="let dato of objetoRegistro;let i = index" class="contenedor-input">\n          <!-- <span>{{dato.name}}</span> -->\n\n          <input class="inp" placeholder="{{dato.name}}" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}"\n            type="{{dato.type}}" [(ngModel)]="dato.value" maxlength="{{dato.length}}" [attr.disabled]="dato.disabled ? \'\' : null"\n            *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\'" [ngStyle]="{\'width\': dato.name == \'Dirección\' ? \'88%\' : \'100%\'}">\n\n          <div class="direc" *ngIf="dato.name == \'Dirección\'" (click)="getMapa()"><img src="assets/imgs/direcciones/home-run.png"\n              alt=""></div>\n\n          <ion-datetime class="dt" [(ngModel)]="dato.value" formControlName="{{dato.formName}}" text-left pickerFormat="DD/MM/YYYY"\n            cancelText="Cancelar" doneText="Aceptar" #fechaNac (ionChange)="ejecutaValidator()" *ngIf="dato.type == \'date\'"\n            placeholder="01/12/2020"></ion-datetime>\n\n          <ion-col col-2 class="text-center" *ngIf="dato.type == \'checkbox\'">\n            <ion-checkbox formControlName="{{dato.formName}}" [(ngModel)]="dato.value" (ionChange)="ejecutaValidator()">\n            </ion-checkbox>\n          </ion-col>\n\n          <ion-select *ngIf="dato.type == \'select\'" [(ngModel)]="dato.value" okText="Ok" cancelText="Cancelar"\n            interface="action-sheet" (ionChange)="ejecutaValidator()" [selectOptions]="selectOptions" formControlName="{{dato.formName}}">\n            <ion-option *ngFor="let op of dato.opts" [value]="op.id">\n              {{op.value}}\n            </ion-option>\n          </ion-select>\n\n          <app-control-messages [control]="formGroup.controls[dato.formName]" [clase]="\'validators2\'">\n          </app-control-messages>\n        </div>\n      </form>\n\n    </div>\n\n    <button ion-button block large style="padding: 10px;\n          height: auto;\n          contain: none;\n          margin-top: 15px;font-size: 14px;"\n      [disabled]="btnHabilitado" [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="precompra()">Aceptar</button>\n  </div>\n</div>\n\n<div id="myModal3" class="modal3">\n\n  <div class="modal-content animated lightSpeedIn">\n\n    <div class="tacha" (click)="cerrarModal3()" [ngStyle]="{\'color\': genericService.getColorHex()}">\n      <ion-icon ios="md-close" md="md-close"></ion-icon>\n    </div>\n    <div style="width: 90%;\n    padding: 7px;\n    color: #fff;\n    border-radius: 4px;" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Información\n      de pago</div>\n\n    <div class="resumen">Resumen de la compra</div>\n\n    <div class="resumen-proveedor" *ngIf="pagoActual">\n      <div *ngFor="let p of pagoActual.pedidoProveedores" class="separador">\n        <div class="proveedor">\n          <div class="nombre">{{p.proveedor?.nombre}}</div>\n          <div class="precio">{{p.total | currency}}</div>\n\n          <div class="costo-envio">Costo de envío</div>\n          <div class="precio-envio">{{p.comisionTransportista | currency}}</div>\n\n          <div class="costo-subtotal">Subtotal</div>\n          <div class="precio-subtotal">{{p.total + p.comisionTransportista | currency}}</div>\n        </div>\n\n\n      </div>\n\n      <div class="total-pagar">Total a pagar: <strong>{{pagoActual.total | currency}}</strong></div>\n      <div class="iva">*Costos incluyen iva.</div>\n\n      <ion-item>\n        <ion-label>Acepto términos y condiciones</ion-label>\n        <ion-checkbox color="{{genericService.getColor()}}" [(ngModel)]="check"></ion-checkbox>\n      </ion-item>\n    </div>\n\n    <div style="width:100%">\n      <button ion-button block large style="padding: 10px;\n        height: auto;\n        contain: none;\n        margin-top: 15px;font-size: 14px;display: inline-block; width: 49%"\n        [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="cerrarModal3()">Cancelar</button>\n      <button ion-button block large style="padding: 10px;\n          height: auto;\n          contain: none;\n          margin-top: 15px;font-size: 14px;display: inline-block; width: 49%"\n        [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="comprar()">Realizar pago</button>\n    </div>\n  </div>\n</div>\n\n<ion-content padding>\n\n    <div *ngIf="productosCarrito && productosCarrito?.length>0" class="ordenamiento" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n        <div class="texto-ordena">\n          Ordernar por precio\n        </div>\n        <div class="botones">\n            <button ion-button outline style="width: 48%;" (click)="up()"\n            [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n              <ion-icon name="md-trending-up" class="botonFooter"></ion-icon>\n            </button>\n        </div>\n        <div class="botones">\n            <button ion-button outline style="width: 48%;" (click)="down()"\n            [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n              <ion-icon name="md-trending-down" class="botonFooter"></ion-icon>\n            </button>\n        </div>\n      </div>\n\n  <div>\n    <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of productosCarrito; let i = index">\n      <!-- <div class="tacha">\n                <div class="mini-tacha">\n                    <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                    <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                </div>\n              </div> -->\n      <div class="container-card" (click)="viewDetail(p)">\n\n        <img src="{{env.getImagenIndividual}}{{p.productoProveedor.producto.adjuntoId}}" />\n      </div>\n      <div class="container-text" (click)="viewDetail(p)">{{p.productoProveedor.producto.nombre}}</div>\n      <div class="description" (click)="viewDetail(p)">{{p.productoProveedor.producto.descripcion}}</div>\n      <div class="precio" (click)="viewDetail(p)">{{p.precio | currency}}</div>\n\n      <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n        <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">-</div>\n        </div>\n        <div class="cantidad" *ngIf="p.cantidad > 0">\n          <div [ngStyle]="{\'color\': genericService.getColorHex()}">{{p.cantidad}}</div>\n        </div>\n        <div class="mas" (click)="incrementa(p)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">+</div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n\n</ion-content>\n<ion-footer class="footer-button-class">\n  <button (tap)="addToList()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Agregar a una lista</button>\n  <button (tap)="infoContact()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Realizar pedido</button>\n</ion-footer>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/carrito-compras/carrito-compras.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_11__angular_common__["c" /* CurrencyPipe */]])
    ], CarritoComprasPage);
    return CarritoComprasPage;
}());

//# sourceMappingURL=carrito-compras.js.map

/***/ }),

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StringUtilsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Service to format strings
 */
var StringUtilsService = /** @class */ (function () {
    function StringUtilsService() {
    }
    /**
     * Joins a string with underscores
     * @param str string to format
     */
    StringUtilsService.prototype.joinUnderscore = function (str) {
        var val = str.split(' ').join('_');
        val = val.replace(/_{2,}/g, '_');
        return this.removeAccents(val);
    };
    /**
     * Joins a string with scores
     * @param str string to format
     */
    StringUtilsService.prototype.joinMiddleScores = function (str) {
        var val = str.split(' ').join('-');
        val = val.replace(/-{2,}/g, '-');
        return this.removeAccents(val);
    };
    /**
     * Capitalize first letter in s astring
     * @param str string to format
     */
    StringUtilsService.prototype.capitilize = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    /**
     * Capitalize first letter in s astring
     * @param str string to format
     */
    StringUtilsService.prototype.capitilizeFormat = function (str) {
        var chequeo = str.split("_");
        if (chequeo.length > 1) {
            return chequeo[1].charAt(0).toUpperCase() + chequeo[1].slice(1);
        }
        else {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    };
    /**Separa Palabras snake_case */
    StringUtilsService.prototype.snakeCaseFormat = function (str) {
        var separados = str.split("_");
        var retorno = "";
        separados.forEach(function (itemSnake) {
            retorno += itemSnake + " ";
        });
        return retorno;
    };
    /**
     * Removes accents
     * @param str string to format
     */
    StringUtilsService.prototype.removeAccents = function (str) {
        var strAccents = "";
        if (str) {
            strAccents = str.split('');
            var strAccentsOut = new Array();
            var strAccentsLen = strAccents.length;
            var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
            var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
            for (var y = 0; y < strAccentsLen; y++) {
                if (accents.indexOf(strAccents[y]) != -1) {
                    strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
                }
                else {
                    strAccentsOut[y] = strAccents[y];
                }
            }
            strAccentsOut = strAccentsOut.join('');
            return strAccentsOut;
        }
        else {
            return strAccents;
        }
    };
    /**
     * Removes special characters
     * @param str string to be formatted
     */
    StringUtilsService.prototype.removeSpecialCharacters = function (str) {
        return str.replace(/[^\w\s]/gi, '');
    };
    StringUtilsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], StringUtilsService);
    return StringUtilsService;
}());

//# sourceMappingURL=string-utils.service.js.map

/***/ }),

/***/ 588:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistorialPedidosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__historial_pedidos_detail_historial_pedidos_detail__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__opciones_menu_opciones_menu__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HistorialPedidosPage = /** @class */ (function () {
    function HistorialPedidosPage(navCtrl, navParams, genericService, localStorageEncryptService, alertaService, loadingService, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.popoverCtrl = popoverCtrl;
        this.user = null;
        this.pedidos = [];
        this.pedidosReplica = [];
        this.env = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */];
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.cargarPedidos();
    }
    HistorialPedidosPage.prototype.ionViewDidLoad = function () {
    };
    HistorialPedidosPage.prototype.verOpciones = function () {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_9__opciones_menu_opciones_menu__["a" /* OpcionesMenuPage */], {}, { cssClass: "clase-Pop" });
        popover.present({});
    };
    HistorialPedidosPage.prototype.cargarPedidos = function () {
        var _this = this;
        this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].pedidos).subscribe(function (response) {
            _this.pedidos = response;
            if (_this.pedidos.length <= 0) {
                _this.pedidos = null;
            }
            _this.pedidosReplica = _this.pedidos;
        }, function (error) {
            var err = error.error;
            _this.pedidos = null;
            _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    HistorialPedidosPage.prototype.viewDetail = function (pedido) {
        var _this = this;
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].pedidos + "/" + pedido.id).subscribe(function (response) {
                _this.loadingService.hide();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__historial_pedidos_detail_historial_pedidos_detail__["a" /* HistorialPedidosDetailPage */], { pedido: response });
            }, function (error) {
                var err = error.error;
                _this.loadingService.hide();
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
    };
    HistorialPedidosPage.prototype.ordenPor = function (opc) {
        this.pedidos = this.pedidosReplica;
        //item.fecha = moment(fechaF, 'DD-MM-YYYY HH:mm:ss').format("D [de] MMMM [de] YYYY HH:mm:ss");
        switch (opc) {
            case 1:
                //fecha solicitud
                this.pedidos.sort(function (mayor, menor) {
                    var dateA = __WEBPACK_IMPORTED_MODULE_8_moment__(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate(), dateB = __WEBPACK_IMPORTED_MODULE_8_moment__(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate();
                    return dateA - dateB;
                    //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
                });
                break;
            case 2:
                //fecha entrega
                this.pedidos.sort(function (mayor, menor) {
                    var dateA = __WEBPACK_IMPORTED_MODULE_8_moment__(mayor.fechaEntrega, 'DD-MM-YYYY HH:mm:ss').toDate(), dateB = __WEBPACK_IMPORTED_MODULE_8_moment__(menor.fechaEntrega, 'DD-MM-YYYY HH:mm:ss').toDate();
                    return dateA - dateB;
                    //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
                });
                break;
            case 3:
                //estatus
                this.pedidos.sort(function (mayor, menor) {
                    return mayor.estatus.nombre > menor.estatus.nombre;
                });
                break;
        }
    };
    HistorialPedidosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'page-historial-pedidos',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/historial-pedidos/historial-pedidos.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title *ngIf="env.perfil.activo == 2">Mi historial</ion-title>\n\n    <button ion-button menuToggle *ngIf="env.perfil.activo == 1">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Mi historial</ion-title>\n\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="verOpciones()">\n        <ion-icon name="md-more" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <div class="spinner-carrito" *ngIf="pedidos && pedidos.length <= 0">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <div class="filtros" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" *ngIf="pedidos && pedidos?.length > 0">\n    <button (click)="ordenPor(1)">\n      <ion-icon name="ios-calendar-outline"></ion-icon>\n    </button>\n    <button (click)="ordenPor(2)">\n      <ion-icon name="md-calendar"></ion-icon>\n    </button>\n    <button (click)="ordenPor(3)">\n      <ion-icon name="ios-checkbox-outline"></ion-icon>\n    </button>\n  </div>\n\n  <ion-list *ngIf="pedidos && pedidos?.length > 0">\n    <ion-item class="item-list-card" *ngFor="let p of pedidos" (click)="viewDetail(p)">\n      <ion-avatar slot="start">\n        <img src="assets/imgs/pedidos/entrega.png" alt="">\n      </ion-avatar>\n      <div class="datos-tarjetas">\n        <div class="name">Pedido Num. <strong>{{p.folio}}</strong></div>\n        <div class="number">Costo <strong>{{p.total | currency}}</strong></div>\n        <div class="number">Fecha Solicitud <strong>{{p.fechaAlta}}</strong></div>\n        <div class="number" *ngIf="p.fechaEntrega">Fecha Entrega <strong>{{p.fechaEntrega}}</strong></div>\n        <div class="number">Estatus <strong>{{p.estatus.nombre}}</strong></div>\n      </div>\n\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/historial-pedidos/historial-pedidos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["o" /* PopoverController */]])
    ], HistorialPedidosPage);
    return HistorialPedidosPage;
}());

//# sourceMappingURL=historial-pedidos.js.map

/***/ }),

/***/ 589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InfoPage = /** @class */ (function () {
    function InfoPage(navCtrl, navParams, genericService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
    }
    InfoPage.prototype.ionViewDidLoad = function () {
    };
    InfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-info',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/info/info.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Información</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="title" [ngStyle]="{\'color\':genericService.getColorHex()}">Luegoluego</div>\n\n  <div class="texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque suscipit quisquam, repellat\n    consequuntur, harum tenetur nostrum ad, dolorem explicabo illo non! Veritatis aperiam quaerat aspernatur repellat,\n    necessitatibus impedit commodi magni.</div>\n\n  <div class="ter" [ngStyle]="{\'color\':genericService.getColorHex()}">Consulta los términos y condiciones</div>\n  <div class="a"><a>Términos y condiciones</a></div>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/info/info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */]])
    ], InfoPage);
    return InfoPage;
}());

//# sourceMappingURL=info.js.map

/***/ }),

/***/ 590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TerminosCondicionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TerminosCondicionesPage = /** @class */ (function () {
    function TerminosCondicionesPage(navCtrl, navParams, genericService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
    }
    TerminosCondicionesPage.prototype.ionViewDidLoad = function () {
    };
    TerminosCondicionesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-terminos-condiciones',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/terminos-condiciones/terminos-condiciones.html"*/'<ion-header>\n    <ion-navbar color="{{genericService.getColor()}}">\n      <ion-title style="padding: 0px;">Términos y condiciones</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/terminos-condiciones/terminos-condiciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__services_generic_service__["a" /* GenericService */]])
    ], TerminosCondicionesPage);
    return TerminosCondicionesPage;
}());

//# sourceMappingURL=terminos-condiciones.js.map

/***/ }),

/***/ 594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AltaDireccionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AltaDireccionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AltaDireccionesPage = /** @class */ (function () {
    function AltaDireccionesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AltaDireccionesPage.prototype.ionViewDidLoad = function () {
    };
    AltaDireccionesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-alta-direcciones',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/alta-direcciones/alta-direcciones.html"*/'<!--\n  Generated template for the AltaDireccionesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>alta-direcciones</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/alta-direcciones/alta-direcciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], AltaDireccionesPage);
    return AltaDireccionesPage;
}());

//# sourceMappingURL=alta-direcciones.js.map

/***/ }),

/***/ 595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReciboPagoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ReciboPagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReciboPagoPage = /** @class */ (function () {
    function ReciboPagoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ReciboPagoPage.prototype.ionViewDidLoad = function () {
    };
    ReciboPagoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recibo-pago',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/recibo-pago/recibo-pago.html"*/'<!--\n  Generated template for the ReciboPagoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>recibo-pago</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/recibo-pago/recibo-pago.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], ReciboPagoPage);
    return ReciboPagoPage;
}());

//# sourceMappingURL=recibo-pago.js.map

/***/ }),

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TerminoServicioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the TerminoServicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TerminoServicioPage = /** @class */ (function () {
    function TerminoServicioPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    TerminoServicioPage.prototype.ionViewDidLoad = function () {
    };
    TerminoServicioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-termino-servicio',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/termino-servicio/termino-servicio.html"*/'<!--\n  Generated template for the TerminoServicioPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>termino-servicio</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/termino-servicio/termino-servicio.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], TerminoServicioPage);
    return TerminoServicioPage;
}());

//# sourceMappingURL=termino-servicio.js.map

/***/ }),

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(602);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_proveedor_documentos_documentos__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_acerca_de_acerca_de__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_ayuda_ayuda__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_cambio_contrasenia_cambio_contrasenia__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_perfil_perfil__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_problemas_pedido_problemas_pedido__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_recupera_contrasenia_recupera_contrasenia__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_mapa_proveedores_mapa_proveedores__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_categoria_categoria__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(975);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_about_about__ = __webpack_require__(980);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_contact_contact__ = __webpack_require__(981);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_home_home__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_tabs_tabs__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ngx_translate_http_loader__ = __webpack_require__(982);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_common_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_module__ = __webpack_require__(984);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_login_login__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_registro_registro__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_control_messages_control_messages_component__ = __webpack_require__(989);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_gallery_gallery_component__ = __webpack_require__(990);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_recuperar_password_recuperar_password__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_filtro_producto_filtro_producto__ = __webpack_require__(585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_detalle_producto_detalle_producto__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_carrito_compras_carrito_compras__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_alta_direcciones_alta_direcciones__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__directives_scroll_hide_directive__ = __webpack_require__(991);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_lista_carrito_compras_lista_carrito_compras__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_tarjetas_frecuentes_tarjetas_frecuentes__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_detalle_tarjeta_detalle_tarjeta__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_opciones_menu_opciones_menu__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_home_geo_proveedores_home_geo_proveedores__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_chat_chat__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_articulo_productos_articulo_productos__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_carrito_historico_carrito_historico__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_direcciones_direcciones__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_compara_precios_proveedor_compara_precios_proveedor__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_articulo_proveedores_articulo_proveedores__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_historial_pedidos_historial_pedidos__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_historial_pedidos_detail_historial_pedidos_detail__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_pedidos_detail_pedidos_detail__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_termino_servicio_termino_servicio__ = __webpack_require__(596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_terminos_condiciones_terminos_condiciones__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_recibo_pago_recibo_pago__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_info_info__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pages_proveedor_tabs_tabs__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_proveedor_home_proveedor_home_proveedor__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pages_proveedor_ver_productos_ver_productos__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_qr_qr__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55_angularx_qrcode__ = __webpack_require__(992);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















































//import { EmojiPickerModule } from '@ionic-tools/emoji-picker';


function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_20__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_9__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_15__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_registro_registro__["a" /* RegistroPage */],
                __WEBPACK_IMPORTED_MODULE_25__components_control_messages_control_messages_component__["a" /* ControlMessagesComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_gallery_gallery_component__["a" /* GalleryComponent */],
                __WEBPACK_IMPORTED_MODULE_27__pages_recuperar_password_recuperar_password__["a" /* ProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_filtro_producto_filtro_producto__["a" /* FiltroProductoPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_detalle_producto_detalle_producto__["a" /* DetalleProductoPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_carrito_compras_carrito_compras__["a" /* CarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_alta_direcciones_alta_direcciones__["a" /* AltaDireccionesPage */],
                __WEBPACK_IMPORTED_MODULE_32__directives_scroll_hide_directive__["a" /* ScrollHideDirective */],
                __WEBPACK_IMPORTED_MODULE_33__pages_lista_carrito_compras_lista_carrito_compras__["a" /* ListaCarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_tarjetas_frecuentes_tarjetas_frecuentes__["a" /* TarjetasFrecuentesPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_detalle_tarjeta_detalle_tarjeta__["a" /* DetalleTarjetaPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_opciones_menu_opciones_menu__["a" /* OpcionesMenuPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_home_geo_proveedores_home_geo_proveedores__["a" /* HomeGeoProveedoresPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_categoria_categoria__["a" /* CategoriaPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_articulo_productos_articulo_productos__["a" /* ArticuloProductosPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_carrito_historico_carrito_historico__["a" /* CarritoHistoricoPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_direcciones_direcciones__["a" /* DireccionesPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_mapa_proveedores_mapa_proveedores__["a" /* MapaProveedoresPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_compara_precios_proveedor_compara_precios_proveedor__["a" /* ComparaPreciosProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_articulo_proveedores_articulo_proveedores__["a" /* ArticuloProveedoresPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_historial_pedidos_historial_pedidos__["a" /* HistorialPedidosPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_historial_pedidos_detail_historial_pedidos_detail__["a" /* HistorialPedidosDetailPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_pedidos_detail_pedidos_detail__["a" /* PedidosDetailPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_recupera_contrasenia_recupera_contrasenia__["a" /* RecuperaContraseniaPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_termino_servicio_termino_servicio__["a" /* TerminoServicioPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_terminos_condiciones_terminos_condiciones__["a" /* TerminosCondicionesPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_recibo_pago_recibo_pago__["a" /* ReciboPagoPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_problemas_pedido_problemas_pedido__["a" /* ProblemasPedidoPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_info_info__["a" /* InfoPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_cambio_contrasenia_cambio_contrasenia__["a" /* CambioContraseniaPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_ayuda_ayuda__["a" /* AyudaPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_acerca_de_acerca_de__["a" /* AcercaDePage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_proveedor_tabs_tabs__["a" /* TabsProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_proveedor_home_proveedor_home_proveedor__["a" /* HomeProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_proveedor_ver_productos_ver_productos__["a" /* VerProductosPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_qr_qr__["a" /* QrPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_proveedor_documentos_documentos__["a" /* DocumentosPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_11_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: 'pages/alta-direcciones/alta-direcciones.module#AltaDireccionesPageModule', name: 'AltaDireccionesPage', segment: 'alta-direcciones', priority: 'low', defaultHistory: [] },
                        { loadChildren: 'pages/recibo-pago/recibo-pago.module#ReciboPagoPageModule', name: 'ReciboPagoPage', segment: 'recibo-pago', priority: 'low', defaultHistory: [] },
                        { loadChildren: 'pages/termino-servicio/termino-servicio.module#TerminoServicioPageModule', name: 'TerminoServicioPage', segment: 'termino-servicio', priority: 'low', defaultHistory: [] }
                    ]
                }),
                //EmojiPickerModule,
                __WEBPACK_IMPORTED_MODULE_22__providers_module__["a" /* ProvidersModule */],
                __WEBPACK_IMPORTED_MODULE_55_angularx_qrcode__["a" /* QRCodeModule */],
                __WEBPACK_IMPORTED_MODULE_21__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (createTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_21__angular_common_http__["b" /* HttpClient */]]
                    }
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_11_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_15__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_registro_registro__["a" /* RegistroPage */],
                __WEBPACK_IMPORTED_MODULE_25__components_control_messages_control_messages_component__["a" /* ControlMessagesComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_gallery_gallery_component__["a" /* GalleryComponent */],
                __WEBPACK_IMPORTED_MODULE_27__pages_recuperar_password_recuperar_password__["a" /* ProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_filtro_producto_filtro_producto__["a" /* FiltroProductoPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_detalle_producto_detalle_producto__["a" /* DetalleProductoPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_carrito_compras_carrito_compras__["a" /* CarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_alta_direcciones_alta_direcciones__["a" /* AltaDireccionesPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_lista_carrito_compras_lista_carrito_compras__["a" /* ListaCarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_tarjetas_frecuentes_tarjetas_frecuentes__["a" /* TarjetasFrecuentesPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_detalle_tarjeta_detalle_tarjeta__["a" /* DetalleTarjetaPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_opciones_menu_opciones_menu__["a" /* OpcionesMenuPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_home_geo_proveedores_home_geo_proveedores__["a" /* HomeGeoProveedoresPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_categoria_categoria__["a" /* CategoriaPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_articulo_productos_articulo_productos__["a" /* ArticuloProductosPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_carrito_historico_carrito_historico__["a" /* CarritoHistoricoPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_direcciones_direcciones__["a" /* DireccionesPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_mapa_proveedores_mapa_proveedores__["a" /* MapaProveedoresPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_compara_precios_proveedor_compara_precios_proveedor__["a" /* ComparaPreciosProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_articulo_proveedores_articulo_proveedores__["a" /* ArticuloProveedoresPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_historial_pedidos_historial_pedidos__["a" /* HistorialPedidosPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_historial_pedidos_detail_historial_pedidos_detail__["a" /* HistorialPedidosDetailPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_pedidos_detail_pedidos_detail__["a" /* PedidosDetailPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_recupera_contrasenia_recupera_contrasenia__["a" /* RecuperaContraseniaPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_termino_servicio_termino_servicio__["a" /* TerminoServicioPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_terminos_condiciones_terminos_condiciones__["a" /* TerminosCondicionesPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_recibo_pago_recibo_pago__["a" /* ReciboPagoPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_problemas_pedido_problemas_pedido__["a" /* ProblemasPedidoPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_info_info__["a" /* InfoPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_cambio_contrasenia_cambio_contrasenia__["a" /* CambioContraseniaPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_ayuda_ayuda__["a" /* AyudaPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_acerca_de_acerca_de__["a" /* AcercaDePage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_proveedor_tabs_tabs__["a" /* TabsProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_proveedor_home_proveedor_home_proveedor__["a" /* HomeProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_proveedor_ver_productos_ver_productos__["a" /* VerProductosPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_qr_qr__["a" /* QrPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_proveedor_documentos_documentos__["a" /* DocumentosPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_9__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_11_ionic_angular__["f" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidationService = /** @class */ (function () {
    /** Generate ValidationService */
    function ValidationService() {
    }
    ValidationService.prototype.getValidatorErrorMessage = function (validatorName, validatorValue) {
        var config = {
            'required': "Campo requerido",
            'invalidCreditCard': 'Número de tarjeta inválido',
            'invalidEmailAddress': 'Correo electrónico inválido',
            'invalidPassword': 'Contraseña inválida. La contraseña debe contener mínimo 8 caracteres, por lo menos un valor numérico y mínimo un símbolo.',
            'minlength': "M\u00EDnimum longitud " + validatorValue.requiredLength,
            'maxlength': "Maxima longitud " + validatorValue.requiredLength,
            'seleccion': 'El campo es requerido, selecciona al menos uno',
            'invalidNumber': 'Ingrese un número válido',
            'phone': 'Ingrese un número válido',
            'maxilength': "Longitud m\u00E1xima 10 d\u00EDgitos",
            'minilength': "Longitud m\u00EDnima 10 d\u00EDgitos",
            'onlyCharacter': "El campo es de tipo texto",
        };
        return config[validatorName];
    };
    ValidationService.creditCardValidator = function (control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value) {
            if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
                return null;
            }
            else {
                return { 'invalidCreditCard': true };
            }
        }
    };
    ValidationService.emailValidator = function (control) {
        // RFC 2822 compliant regex
        if (control.value) {
            if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
                return null;
            }
            else {
                return { 'invalidEmailAddress': true };
            }
        }
    };
    ValidationService.characterValidator = function (control) {
        // RFC 2822 compliant regex
        if (control.value) {
            if (control._pendingValue.match(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g)) {
                return null;
            }
            else {
                if (control._pendingValue.substring(0, control.value.length - 1).match(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g)) {
                    control.setValue(control._pendingValue.substring(0, control._pendingValue.length - 1));
                    return null;
                }
                else {
                    return null;
                }
            }
        }
    };
    ValidationService.phoneValidator = function (control) {
        // RFC 2822 compliant regex
        if (control.value) {
            if (control._pendingValue.match("^[0-9]*$")) {
                return null;
            }
            else {
                if (control._pendingValue.substring(0, control.value.length - 1).match("^[0-9]*$")) {
                    control.setValue(control._pendingValue.substring(0, control._pendingValue.length - 1));
                    return null;
                }
                else {
                    return null;
                }
            }
        }
    };
    ValidationService.passwordValidator = function (control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value) {
            if (control.value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")) {
                return null;
            }
            else {
                return { 'invalidPassword': true };
            }
        }
    };
    ValidationService.maxLengthValidator = function (control) {
        if (control.value) {
            if (control._pendingValue.length <= 10) {
                return null;
            }
            else {
                if (control._pendingValue.length > 10) {
                    control.setValue(control._pendingValue.substring(0, control._pendingValue.length - 1));
                    return null;
                }
                else {
                    return null;
                }
            }
        }
    };
    ValidationService.maxLengthCCV = function (control) {
        if (control.value) {
            if (control._pendingValue.length <= 3) {
                return null;
            }
            else {
                if (control._pendingValue.length > 3) {
                    control.setValue(control._pendingValue.substring(0, control._pendingValue.length - 1));
                    return null;
                }
                else {
                    return null;
                }
            }
        }
    };
    ValidationService.maxLengthCard = function (control) {
        if (control.value) {
            if (control._pendingValue.length <= 20) {
                return null;
            }
            else {
                if (control._pendingValue.length > 20) {
                    control.setValue(control._pendingValue.substring(0, control._pendingValue.length - 1));
                    return null;
                }
                else {
                    return null;
                }
            }
        }
    };
    ValidationService.minLengthValidator = function (control) {
        if (control.value) {
            if (control._pendingValue.length >= 10) {
                return null;
            }
            else {
                if (control._pendingValue.length < 10) {
                    return { 'minilength': true };
                }
                else {
                    return null;
                }
            }
        }
    };
    ValidationService.numberValidator = function (control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match("^[0-9]*$")) {
            return null;
        }
        else {
            return { 'invalidNumber': true };
        }
    };
    ValidationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ValidationService);
    return ValidationService;
}());

//# sourceMappingURL=validation.service.js.map

/***/ }),

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 413,
	"./af.js": 413,
	"./ar": 414,
	"./ar-dz": 415,
	"./ar-dz.js": 415,
	"./ar-kw": 416,
	"./ar-kw.js": 416,
	"./ar-ly": 417,
	"./ar-ly.js": 417,
	"./ar-ma": 418,
	"./ar-ma.js": 418,
	"./ar-sa": 419,
	"./ar-sa.js": 419,
	"./ar-tn": 420,
	"./ar-tn.js": 420,
	"./ar.js": 414,
	"./az": 421,
	"./az.js": 421,
	"./be": 422,
	"./be.js": 422,
	"./bg": 423,
	"./bg.js": 423,
	"./bm": 424,
	"./bm.js": 424,
	"./bn": 425,
	"./bn.js": 425,
	"./bo": 426,
	"./bo.js": 426,
	"./br": 427,
	"./br.js": 427,
	"./bs": 428,
	"./bs.js": 428,
	"./ca": 429,
	"./ca.js": 429,
	"./cs": 430,
	"./cs.js": 430,
	"./cv": 431,
	"./cv.js": 431,
	"./cy": 432,
	"./cy.js": 432,
	"./da": 433,
	"./da.js": 433,
	"./de": 434,
	"./de-at": 435,
	"./de-at.js": 435,
	"./de-ch": 436,
	"./de-ch.js": 436,
	"./de.js": 434,
	"./dv": 437,
	"./dv.js": 437,
	"./el": 438,
	"./el.js": 438,
	"./en-SG": 439,
	"./en-SG.js": 439,
	"./en-au": 440,
	"./en-au.js": 440,
	"./en-ca": 441,
	"./en-ca.js": 441,
	"./en-gb": 442,
	"./en-gb.js": 442,
	"./en-ie": 443,
	"./en-ie.js": 443,
	"./en-il": 444,
	"./en-il.js": 444,
	"./en-nz": 445,
	"./en-nz.js": 445,
	"./eo": 446,
	"./eo.js": 446,
	"./es": 447,
	"./es-do": 448,
	"./es-do.js": 448,
	"./es-us": 449,
	"./es-us.js": 449,
	"./es.js": 447,
	"./et": 450,
	"./et.js": 450,
	"./eu": 451,
	"./eu.js": 451,
	"./fa": 452,
	"./fa.js": 452,
	"./fi": 453,
	"./fi.js": 453,
	"./fo": 454,
	"./fo.js": 454,
	"./fr": 455,
	"./fr-ca": 456,
	"./fr-ca.js": 456,
	"./fr-ch": 457,
	"./fr-ch.js": 457,
	"./fr.js": 455,
	"./fy": 458,
	"./fy.js": 458,
	"./ga": 459,
	"./ga.js": 459,
	"./gd": 460,
	"./gd.js": 460,
	"./gl": 461,
	"./gl.js": 461,
	"./gom-latn": 462,
	"./gom-latn.js": 462,
	"./gu": 463,
	"./gu.js": 463,
	"./he": 464,
	"./he.js": 464,
	"./hi": 465,
	"./hi.js": 465,
	"./hr": 466,
	"./hr.js": 466,
	"./hu": 467,
	"./hu.js": 467,
	"./hy-am": 468,
	"./hy-am.js": 468,
	"./id": 469,
	"./id.js": 469,
	"./is": 470,
	"./is.js": 470,
	"./it": 471,
	"./it-ch": 472,
	"./it-ch.js": 472,
	"./it.js": 471,
	"./ja": 473,
	"./ja.js": 473,
	"./jv": 474,
	"./jv.js": 474,
	"./ka": 475,
	"./ka.js": 475,
	"./kk": 476,
	"./kk.js": 476,
	"./km": 477,
	"./km.js": 477,
	"./kn": 478,
	"./kn.js": 478,
	"./ko": 479,
	"./ko.js": 479,
	"./ku": 480,
	"./ku.js": 480,
	"./ky": 481,
	"./ky.js": 481,
	"./lb": 482,
	"./lb.js": 482,
	"./lo": 483,
	"./lo.js": 483,
	"./lt": 484,
	"./lt.js": 484,
	"./lv": 485,
	"./lv.js": 485,
	"./me": 486,
	"./me.js": 486,
	"./mi": 487,
	"./mi.js": 487,
	"./mk": 488,
	"./mk.js": 488,
	"./ml": 489,
	"./ml.js": 489,
	"./mn": 490,
	"./mn.js": 490,
	"./mr": 491,
	"./mr.js": 491,
	"./ms": 492,
	"./ms-my": 493,
	"./ms-my.js": 493,
	"./ms.js": 492,
	"./mt": 494,
	"./mt.js": 494,
	"./my": 495,
	"./my.js": 495,
	"./nb": 496,
	"./nb.js": 496,
	"./ne": 497,
	"./ne.js": 497,
	"./nl": 498,
	"./nl-be": 499,
	"./nl-be.js": 499,
	"./nl.js": 498,
	"./nn": 500,
	"./nn.js": 500,
	"./pa-in": 501,
	"./pa-in.js": 501,
	"./pl": 502,
	"./pl.js": 502,
	"./pt": 503,
	"./pt-br": 504,
	"./pt-br.js": 504,
	"./pt.js": 503,
	"./ro": 505,
	"./ro.js": 505,
	"./ru": 506,
	"./ru.js": 506,
	"./sd": 507,
	"./sd.js": 507,
	"./se": 508,
	"./se.js": 508,
	"./si": 509,
	"./si.js": 509,
	"./sk": 510,
	"./sk.js": 510,
	"./sl": 511,
	"./sl.js": 511,
	"./sq": 512,
	"./sq.js": 512,
	"./sr": 513,
	"./sr-cyrl": 514,
	"./sr-cyrl.js": 514,
	"./sr.js": 513,
	"./ss": 515,
	"./ss.js": 515,
	"./sv": 516,
	"./sv.js": 516,
	"./sw": 517,
	"./sw.js": 517,
	"./ta": 518,
	"./ta.js": 518,
	"./te": 519,
	"./te.js": 519,
	"./tet": 520,
	"./tet.js": 520,
	"./tg": 521,
	"./tg.js": 521,
	"./th": 522,
	"./th.js": 522,
	"./tl-ph": 523,
	"./tl-ph.js": 523,
	"./tlh": 524,
	"./tlh.js": 524,
	"./tr": 525,
	"./tr.js": 525,
	"./tzl": 526,
	"./tzl.js": 526,
	"./tzm": 527,
	"./tzm-latn": 528,
	"./tzm-latn.js": 528,
	"./tzm.js": 527,
	"./ug-cn": 529,
	"./ug-cn.js": 529,
	"./uk": 530,
	"./uk.js": 530,
	"./ur": 531,
	"./ur.js": 531,
	"./uz": 532,
	"./uz-latn": 533,
	"./uz-latn.js": 533,
	"./uz.js": 532,
	"./vi": 534,
	"./vi.js": 534,
	"./x-pseudo": 535,
	"./x-pseudo.js": 535,
	"./yo": 536,
	"./yo.js": 536,
	"./zh-cn": 537,
	"./zh-cn.js": 537,
	"./zh-hk": 538,
	"./zh-hk.js": 538,
	"./zh-tw": 539,
	"./zh-tw.js": 539
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 686;

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeGeoProveedoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_leaflet__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_open_native_settings__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_diagnostic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_android_permissions__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__direcciones_direcciones__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var HomeGeoProveedoresPage = /** @class */ (function () {
    function HomeGeoProveedoresPage(navCtrl, navParams, geolocation, genericService, loadingService, alertaService, alertCtrl, diagnostic, openNativeSettings, androidPermissions, platform, events, viewCtrl, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.genericService = genericService;
        this.loadingService = loadingService;
        this.alertaService = alertaService;
        this.alertCtrl = alertCtrl;
        this.diagnostic = diagnostic;
        this.openNativeSettings = openNativeSettings;
        this.androidPermissions = androidPermissions;
        this.platform = platform;
        this.events = events;
        this.viewCtrl = viewCtrl;
        this.popoverCtrl = popoverCtrl;
        this.emulado = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].emulado;
        this.componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };
        this.data = {};
        this.muestraMapa = false;
        this.tipoDirecciones = [];
        this.direccion = null;
        this.edit = false;
        this.fromModal = null;
        this.fromRegister = null;
        this.listaDirecciones = [];
        this.direccion = navParams.get("direccion");
        this.fromModal = navParams.get("fromModal");
        this.fromRegister = navParams.get("fromRegister");
        if (this.direccion) {
            this.edit = true;
            /*
                    codigoPostal: "89670"
                    direccion: "Ocampo 508, Zona Centro, Aldama, Tamaulipas, México"
                    latitud: "22.9221196"
                    longitud: "-98.0690771"
                    */
            this.data.codigoPostal = this.direccion.direccion.codigoPostal;
            this.data.direccion = this.direccion.direccion.direccion;
            this.data.latitud = this.direccion.direccion.latitud;
            this.data.longitud = this.direccion.direccion.longitud;
        }
        this.cargarTipoDirecciones();
        if (this.fromModal && !this.fromRegister) {
            this.cargarDireccionesLista();
        }
    }
    /**Método para cerrar el modal, sin embargo
     * se envían de vuelta los filtros para manipularlos en la búsqueda
     */
    HomeGeoProveedoresPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss({});
    };
    HomeGeoProveedoresPage.prototype.cargarDireccionesLista = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].direcciones).subscribe(function (response) {
            _this.listaDirecciones = response;
        }, function (error) {
            var err = error.error;
            _this.listaDirecciones = [];
            //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    HomeGeoProveedoresPage.prototype.selectFrecuente = function () {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_12__direcciones_direcciones__["a" /* DireccionesPage */], { fromPop: true }, { cssClass: "clase-Pop-direcciones" });
        popover.present({});
        popover.onDidDismiss(function (data) {
            if (data) {
                if (data != null) {
                    /*
                        codigoPostal: "89670"
                        direccion: "Ocampo 508, Zona Centro, Aldama, Tamaulipas, México"
                        latitud: "22.9221196"
                        longitud: "-98.0690771"
                        */
                    _this.data.codigoPostal = data.direccion.direccion.codigoPostal;
                    _this.data.direccion = data.direccion.direccion.direccion;
                    _this.data.latitud = data.direccion.direccion.latitud;
                    _this.data.longitud = data.direccion.direccion.longitud;
                    _this.data.id = data.direccion.direccion.id;
                    _this.viewCtrl.dismiss({ data: _this.data });
                }
            }
        });
    };
    HomeGeoProveedoresPage.prototype.cargarTipoDirecciones = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].tipoDirecciones).subscribe(function (response) {
            _this.tipoDirecciones = response;
        }, function (error) {
        });
    };
    HomeGeoProveedoresPage.prototype.ionViewDidLoad = function () {
        var claseTabs = document.getElementsByClassName("tabbar");
        if (claseTabs[0]) {
            claseTabs[0].style.display = "none";
        }
        this.obtenerLocalizacion();
        var as = document.getElementById('autocomplete');
        this.autocomplete = new google.maps.places.Autocomplete(as, { types: ['geocode'] });
        // Avoid paying for data that you don't need by restricting the set of
        // place fields that are returned to just the address components.
        this.autocomplete.setFields(['address_component', 'geometry', 'name']);
        // When the user selects an address from the drop-down, populate the
        // address fields in the form.
        var componente = this;
        this.autocomplete.addListener('place_changed', function () {
            componente.fillInAddress(componente);
        });
    };
    /**Método que obtiene la geolocalización del usuario
     * se utiliza al hacer click en el boton de posicionamiento
     */
    HomeGeoProveedoresPage.prototype.obtenerLocalizacion = function () {
        //this.loadingService.show().then(() => {
        var _this = this;
        if (this.platform.is("android") && !this.emulado) {
            //debugger;
            this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(function (result) {
                //debugger;
                if (!result.hasPermission) {
                    _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(function (resReq) {
                        _this.loadingService.hide();
                    });
                }
                else {
                    _this.diagnostic.isLocationAvailable().then(function (res) {
                        //debugger;
                        if (!res) {
                            _this.loadingService.hide();
                            //debugger;
                            _this.openNativeSettings.open("location").then(function (res2) {
                                //debugger;
                                _this.loadingService.hide();
                                _this.diagnostic.isLocationAvailable().then(function (res) {
                                    //debugger;
                                    if (!res) {
                                        _this.loadingService.hide();
                                        //aqui apagar geolocation
                                        //this.selecciones.cercaDeMi = false;
                                    }
                                    else {
                                        //debugger;
                                        _this.getPosition();
                                    }
                                });
                            });
                        }
                        else {
                            _this.getPosition();
                        }
                    });
                }
            }, function (err) {
                _this.loadingService.hide();
                _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION);
            });
        }
        else if (this.platform.is("ios") && !this.emulado) {
            this.diagnostic.isLocationEnabled().then(function (resIOS) {
                _this.loadingService.hide();
                //alert(JSON.stringify(res));
                if (!resIOS) {
                    _this.loadingService.hide();
                    var alert_1 = _this.alertCtrl.create({
                        title: "<div class='notificacionError'>\n                <div><img class='headerImg' src='assets/imgs/alerts/success.png'/></div>\n                <div class='textoTitle'>Para acceder a \u00E9sta funci\u00F3n necesitas habilitar tu <strong>GPS</strong></div>\n                <div>",
                        message: null,
                        cssClass: _this.genericService.getColorClass(),
                        buttons: [
                            {
                                text: 'Cancelar',
                                handler: function () {
                                }
                            },
                            {
                                text: 'Aceptar',
                                handler: function () {
                                    _this.openLocate();
                                }
                            }
                        ]
                    });
                    alert_1.present();
                    alert_1.onDidDismiss(function (res) {
                    });
                }
                else {
                    _this.getPosition();
                }
            });
        }
        else {
            this.getPosition();
        }
        //});
    };
    /**Metodo que se ejecuta solo en ios para pedir abrir localizacion*/
    HomeGeoProveedoresPage.prototype.openLocate = function () {
        var _this = this;
        this.loadingService.hide();
        //debugger;
        this.openNativeSettings.open("locations").then(function (res2) {
            //debugger;
            _this.diagnostic.isLocationEnabled().then(function (res) {
                //debugger;
                if (!res) {
                    //aqui apagar geolocation
                    //this.selecciones.cercaDeMi = false;
                }
                else {
                    //debugger;
                    _this.getPosition();
                }
            });
        });
    };
    HomeGeoProveedoresPage.prototype.ionViewWillLeave = function () {
        var claseTabs = document.getElementsByClassName("tabbar");
        if (claseTabs[0]) {
            claseTabs[0].style.display = "flex";
        }
    };
    HomeGeoProveedoresPage.prototype.getPosition = function () {
        var _this = this;
        this.geolocation.getCurrentPosition()
            .then(function (response) {
            _this.loadMap(response);
        })
            .catch(function (error) {
        });
    };
    HomeGeoProveedoresPage.prototype.loadMap = function (position) {
        var _this = this;
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        // create a new map by passing HTMLElement
        var mapEle = document.getElementById('map_canvas');
        // create LatLng object
        if (this.edit) {
            latitude = Number(this.direccion.direccion.latitud);
            longitude = Number(this.direccion.direccion.longitud);
        }
        var myLatLng = { lat: latitude, lng: longitude };
        // create map
        this.map = new google.maps.Map(mapEle, {
            center: myLatLng,
            zoom: 15
        });
        this.muestraMapa = true;
        google.maps.event.addListenerOnce(this.map, 'idle', function () {
            var info = "<div>Ejemplo de window</div>";
            var infowindow = new google.maps.InfoWindow({
                content: info
            });
            var component = _this;
            component.marker = new google.maps.Marker({
                position: myLatLng,
                map: _this.map,
                title: 'Hello World!',
                id: "marcador-1",
                draggable: true,
                icon: __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].icons['casa'].icon
            });
            _this.data.latitud = latitude;
            _this.data.longitud = longitude;
            var params = new __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["d" /* HttpParams */]();
            params = params.set('latlng', _this.data.latitud + "," + _this.data.longitud);
            params = params.set('key', __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].keyGoogle);
            _this.genericService.sendGetParams("" + __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].geocodeGoogle, params).subscribe(function (response) {
                _this.loadingService.hide();
                _this.map.setCenter(_this.marker.position);
                _this.marker.setMap(_this.map);
                var results = response.results;
                if (results) {
                    /*
                    codigoPostal: "89670"
                    direccion: "Ocampo 508, Zona Centro, Aldama, Tamaulipas, México"
                    latitud: "22.9221196"
                    longitud: "-98.0690771"
                    */
                    _this.data.direccion = results[0].formatted_address;
                    _this.data.codigoPostal = "";
                }
            }, function (error) {
                _this.loadingService.hide();
                _this.marker.setPosition(myLatLng);
                _this.map.setCenter(myLatLng);
                _this.marker.setMap(_this.map);
                _this.alertaService.errorAlertGeneric("No se obtuvo información del marcador, intenta nuevamente");
            });
            component.marker.addListener('click', function () {
                //infowindow.open(this.map, this.marker);
                //component.changeInfoCard();
            });
            google.maps.event.addListener(component.marker, 'dragend', function (evt) {
                component.data.latitud = evt.latLng.lat().toString();
                component.data.longitud = evt.latLng.lng().toString();
                component.loadingService.show().then(function () {
                    var params = new __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["d" /* HttpParams */]();
                    params = params.set('latlng', component.data.latitud + "," + component.data.longitud);
                    params = params.set('key', __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].keyGoogle);
                    component.genericService.sendGetParams("" + __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].geocodeGoogle, params).subscribe(function (response) {
                        component.loadingService.hide();
                        component.map.setCenter(component.marker.position);
                        component.marker.setMap(component.map);
                        var results = response.results;
                        if (results) {
                            /*
                            codigoPostal: "89670"
                            direccion: "Ocampo 508, Zona Centro, Aldama, Tamaulipas, México"
                            latitud: "22.9221196"
                            longitud: "-98.0690771"
                            */
                            component.data.direccion = results[0].formatted_address;
                            component.data.codigoPostal = "";
                        }
                    }, function (error) {
                        component.loadingService.hide();
                        component.marker.setPosition(myLatLng);
                        component.map.setCenter(myLatLng);
                        component.marker.setMap(component.map);
                        component.alertaService.errorAlertGeneric("No se obtuvo información del marcador, intenta nuevamente");
                    });
                });
                //'<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
            });
            /* marker.addEventListener("click", (e: Event) => {
              
            }); */
            mapEle.classList.add('show-map');
        });
    };
    HomeGeoProveedoresPage.prototype.changeInfoCard = function () {
    };
    HomeGeoProveedoresPage.prototype.loadMapLeaflet = function () {
        var _this = this;
        this.mapa = __WEBPACK_IMPORTED_MODULE_6_leaflet___default.a.map("map").setView([40.7127837, -74.0059413], 18);
        //let contributions
        // set map tiles source
        //leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        __WEBPACK_IMPORTED_MODULE_6_leaflet___default.a.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: 'Central de Abastos &copy; <a href="https://www.sharkit.com/">Shark IT</a>',
            maxZoom: 20,
            zoom: 14
        }).addTo(this.mapa);
        var contributions = document.getElementsByClassName("leaflet-control-attribution");
        contributions[0].removeChild(contributions[0].childNodes[0]);
        this.mapa.locate({
            setView: true,
            maxZoom: 20,
            zoom: 14
        }).on('locationfound', function (e) {
            // add marker to the map
            var greenIcon = __WEBPACK_IMPORTED_MODULE_6_leaflet___default.a.icon({
                iconUrl: 'assets/images/marker.png',
                //shadowUrl: 'assets/images/marker.png',
                iconSize: [38, 38],
                shadowSize: [50, 64],
                iconAnchor: [22, 94],
                shadowAnchor: [4, 62],
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            });
            var marker = __WEBPACK_IMPORTED_MODULE_6_leaflet___default.a.marker([40.7127837, -74.0059413], { icon: greenIcon }).addTo(_this.mapa);
            // add popup to the marker  
            var infoWindowContent = "<div class=\"contenedor\">\n                                  <div class=\"img\">\n                                    <img src=\"assets/imgs/home/basket.png\" alt=\"\">\n                                  </div>\n                                  <div class=\"titulo\">Titulo de proveedor</div>\n                                </div>";
            marker.bindPopup(infoWindowContent).openPopup();
        }).on('locationerror', function (err) {
            //this.alertaService.errorAlert(this.alertaService.mensajeError, this.translatePipe.instant("ENABLED-GEOLOCATION"), null);
        });
    };
    HomeGeoProveedoresPage.prototype.geolocate = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({ center: geolocation, radius: position.coords.accuracy });
                this.autocomplete.setBounds(circle.getBounds());
            });
        }
    };
    HomeGeoProveedoresPage.prototype.getData = function () {
        return this.data;
    };
    HomeGeoProveedoresPage.prototype.cleanData = function () {
        this.data = {};
    };
    HomeGeoProveedoresPage.prototype.backData = function () {
        this.viewCtrl.dismiss({ data: this.data });
    };
    HomeGeoProveedoresPage.prototype.guardar = function (body) {
        var _this = this;
        if (!this.edit) {
            this.loadingService.show().then(function () {
                _this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].direcciones, body).subscribe(function (response) {
                    _this.loadingService.hide();
                    _this.events.publish("direction", { body: body, create: true });
                    if (!_this.fromModal) {
                        _this.alertaService.successAlertGeneric("Dirección agregada con éxito");
                        _this.navCtrl.pop();
                    }
                    else {
                        _this.viewCtrl.dismiss({ data: _this.data });
                    }
                }, function (error) {
                    _this.loadingService.hide();
                    _this.alertaService.errorAlertGeneric("No se ha podido agregar tu dirección frecuente, intenta nuevamente");
                });
            });
        }
        else {
            this.loadingService.show().then(function () {
                _this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].direcciones, body).subscribe(function (response) {
                    _this.alertaService.successAlertGeneric("Dirección modificada con éxito");
                    _this.loadingService.hide();
                    _this.events.publish("direction", { body: body, create: false });
                    _this.navCtrl.pop();
                }, function (error) {
                    _this.loadingService.hide();
                    _this.alertaService.errorAlertGeneric("No se ha podido modificar tu dirección frecuente, intenta nuevamente");
                });
            });
        }
    };
    HomeGeoProveedoresPage.prototype.fillInAddress = function (componente) {
        // Get the place details from the autocomplete object.
        var place = componente.autocomplete.getPlace();
        var lat = place.geometry.location.lat(), lng = place.geometry.location.lng();
        componente.cleanData();
        componente.marker.position = place.geometry.location;
        var latlng = new google.maps.LatLng(lat, lng);
        componente.marker.setPosition(latlng);
        componente.map.setCenter(place.geometry.location);
        componente.marker.setMap(componente.map);
        componente.getData().latitud = lat ? lat.toString() : "";
        componente.getData().longitud = lng ? lng.toString() : "";
        var completa = document.getElementById("autocomplete");
        componente.getData().direccion = completa ? completa.value.toString() : "";
        for (var component in componente.componentForm) {
            var a = document.getElementById(component);
            if (a) {
                a.value = '';
            }
            var b = document.getElementById(component);
            if (b) {
                b.disabled = false;
            }
        }
        // Get each component of the address from the place details,
        // and then fill-in the corresponding field on the form.
        if (place) {
            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (componente.componentForm[addressType]) {
                    var val = place.address_components[i][componente.componentForm[addressType]];
                    switch (addressType) {
                        case "postal_code":
                            componente.getData().codigoPostal = val ? val.toString() : "";
                            break;
                        default:
                            break;
                    }
                    var c = document.getElementById(addressType);
                    if (c) {
                        c.value = val;
                    }
                }
            }
        }
    };
    HomeGeoProveedoresPage.prototype.addToList = function () {
        var _this = this;
        var buttons = [
            {
                text: "Agregar",
                handler: function (data) {
                    var input = document.getElementById("input-name");
                    var selectDireccion = document.getElementById("select-direccion");
                    if (input.value.length <= 0) {
                        _this.alertaService.warnAlertGeneric("Por favor ingresa un nombre a tu dirección");
                    }
                    else {
                        var body = {
                            alias: input.value,
                            direccion: {
                                codigoPostal: "",
                                direccion: "",
                                latitud: "",
                                longitud: ""
                            },
                            tipodireccionId: selectDireccion.value
                        };
                        if (_this.edit) {
                            body.direccionId = _this.direccion.direccionId;
                            body.id = _this.direccion.id;
                        }
                        /*
                        codigoPostal: "89670"
                        direccion: "Ocampo 508, Zona Centro, Aldama, Tamaulipas, México"
                        latitud: "22.9221196"
                        longitud: "-98.0690771"
                        */
                        body.direccion.codigoPostal = _this.data.codigoPostal ? _this.data.codigoPostal : "";
                        body.direccion.direccion = _this.data.direccion ? _this.data.direccion : "";
                        body.direccion.latitud = _this.data.latitud ? _this.data.latitud : "";
                        body.direccion.longitud = _this.data.longitud ? _this.data.longitud : "";
                        _this.guardar(body);
                    }
                }
            }
        ];
        var data = {
            title: "Mi dirección frecuente",
            message: "Ingresa un alias y selecciona el tipo de direcci\u00F3n",
        };
        var alert = this.alertCtrl.create({
            title: data.title,
            cssClass: this.genericService.getColorClass(),
            message: data.message,
            inputs: data.inputs,
            buttons: buttons
        });
        alert.present().then(function (res) {
            var a = document.getElementsByClassName("alert-message");
            var div2 = document.createElement("div");
            div2.id = "div-name-2";
            var input = "<input placeholder=\"Ingresa el nombre\" id=\"input-name\"></input>";
            div2.innerHTML = input;
            div2.setAttribute("class", "clase-select animated fadeIn");
            a[0].appendChild(div2);
            var div = document.createElement("div");
            div.id = "div-name-1";
            var select = "<select id='select-direccion'>";
            _this.tipoDirecciones.forEach(function (element) {
                select += "<option value=\"" + element.id + "\">" + element.nombre + "</option>";
            });
            select += "</select>";
            div.innerHTML = select;
            div.setAttribute("class", "clase-select animated fadeIn");
            a[0].appendChild(div);
            if (_this.edit) {
                var input_1 = document.getElementById("input-name");
                var selectDireccion = document.getElementById("select-direccion");
                input_1.value = _this.direccion.alias;
                selectDireccion.value = _this.direccion.tipodireccionId;
            }
        });
    };
    HomeGeoProveedoresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-home-geo-proveedores',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/home-geo-proveedores/home-geo-proveedores.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title *ngIf="!fromModal">\n      {{!direccion ? \'Alta de dirección\' : \'Actualizar de dirección\'}}\n    </ion-title>\n    <ion-title *ngIf="fromModal">\n      Datos de contacto\n    </ion-title>\n\n    <ion-buttons start *ngIf="fromModal">\n      <button ion-button (click)="dismiss(false)">\n        <span color="secundary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android, windows" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <div class="spinner-carrito" *ngIf="!muestraMapa">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <div id="locationField" class="buscador">\n    <input id="autocomplete" placeholder="Buscar" (ionFocus)="geolocate()" type="text" />\n\n    <div *ngIf="!fromModal">\n      <img src="assets/imgs/direcciones/home-run.png" alt="">\n    </div>\n\n    <div *ngIf="fromModal" (click)="selectFrecuente()">\n      <img src="assets/imgs/direcciones/home-run.png" alt="">\n    </div>\n  </div>\n\n  <div id="map_canvas" class="mapita-google"></div>\n\n  <div id="map" style="height: 50%;" *ngIf="1==2"></div>\n\n  <div class="card-proveedor">\n\n  </div>\n</ion-content>\n\n<ion-footer class="footer-button-class" *ngIf="muestraMapa && !fromModal">\n  <button style="width:100%" (tap)="addToList()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">{{!direccion\n    ? \'Agregar\' : \'Actualizar\'}} dirección</button>\n</ion-footer>\n<ion-footer class="footer-button-class" *ngIf="muestraMapa && fromModal">\n  <button style="width:49%" (tap)="addToList()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Guardar\n    y aceptar</button>\n  <button style="width:49%" (tap)="backData()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Aceptar</button>\n</ion-footer>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/home-geo-proveedores/home-geo-proveedores.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_open_native_settings__["a" /* OpenNativeSettings */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* PopoverController */]])
    ], HomeGeoProveedoresPage);
    return HomeGeoProveedoresPage;
}());

//# sourceMappingURL=home-geo-proveedores.js.map

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TIME_OUT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenericService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TIME_OUT = 1000 * 60 * 1; //ultimo número define en minutos
/**Clase provider que es básicamente un servicio generico para las peticiones a servicios */
var GenericService = /** @class */ (function () {
    function GenericService(http, localStorageEncryptService, events) {
        var _this = this;
        this.http = http;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.user = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.events.subscribe("reloadUser", function (data) {
            try {
                _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            }
            catch (error) {
            }
        });
        this.events.subscribe("changeColor", function (data) {
            try {
                _this.getColor();
            }
            catch (error) {
            }
        });
    }
    /**Método que hace peticiones tipo GET */
    GenericService.prototype.sendGetRequest = function (webservice_URL, clase) {
        if (clase === void 0) { clase = null; }
        var observable = this.http.get(webservice_URL);
        if (clase) {
            return observable.pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["map"])(function (data) {
                var arr = data;
                var obj = null;
                if (!Array.isArray(arr)) {
                    obj = clase.fromJson(arr);
                }
                else {
                    obj = arr.map(function (item) { return clase.fromJson(item); });
                }
                return obj;
            }));
        }
        else {
            return observable;
        }
    };
    /**Método que hace peticiones tipo GET  con parámetros*/
    GenericService.prototype.sendGetRequestParams = function (webservice_URL, params) {
        //return this.http.get(webservice_URL, params).timeout(TIME_OUT);
        return this.http.get(webservice_URL, params);
    };
    /**Método que hace peticiones tipo GET  con parámetros*/
    GenericService.prototype.sendGetParams = function (webservice_URL, params) {
        //return this.http.get(webservice_URL, params).timeout(TIME_OUT);
        var options = {};
        options.params = params;
        return this.http.get(webservice_URL, options);
    };
    /**Método que hace peticiones tipo POST  con parámetros específicos*/
    GenericService.prototype.sendPostRequestParams = function (webservice_URL, params, httpOptions) {
        //return this.http.post(webservice_URL, params, httpOptions).timeout(TIME_OUT);
        return this.http.post(webservice_URL, params, httpOptions);
    };
    /**Método que hace peticiones tipo POST */
    GenericService.prototype.sendPostRequest = function (webservice_URL, request) {
        //return this.http.post(webservice_URL, request).timeout(TIME_OUT);
        return this.http.post(webservice_URL, request);
    };
    /**Método que hace peticiones tipo PUT */
    GenericService.prototype.sendPutRequest = function (webservice_URL, request) {
        if (request === void 0) { request = {}; }
        //return this.http.post(webservice_URL, request).timeout(TIME_OUT);
        return this.http.put(webservice_URL, request);
    };
    /**Método que hace peticiones tipo DELETE */
    GenericService.prototype.sendDeleteRequest = function (webservice_URL) {
        //return this.http.delete(webservice_URL).timeout(TIME_OUT);
        return this.http.delete(webservice_URL);
    };
    /**Método que hace peticiones tipo DELETE */
    GenericService.prototype.sendDelete = function (webservice_URL) {
        //return this.http.delete(webservice_URL).timeout(TIME_OUT);
        return this.http.delete(webservice_URL);
    };
    GenericService.prototype.getTotalCarrito = function () {
        if (this.user) {
            var productosCarrito = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
            if (productosCarrito) {
                return productosCarrito.length;
            }
            else {
                return 0;
            }
        }
        else {
            return 0;
        }
    };
    GenericService.prototype.getColor = function () {
        var color = this.localStorageEncryptService.getFromLocalStorage("theme");
        var retornar = color == '#3b64c0' ? 'primary' : color == '#be3b3b' ? 'primary2' : color == '#3bb8be' ? 'primary3' : color == '#292929' ? 'primary5' : color == '#F07C1B' ? 'primary6' : 'primary4';
        return retornar;
    };
    GenericService.prototype.getColorHex = function () {
        var color = this.localStorageEncryptService.getFromLocalStorage("theme");
        return color;
    };
    GenericService.prototype.getColorClass = function () {
        var color = this.localStorageEncryptService.getFromLocalStorage("theme");
        var retornar = color == '#3b64c0' ? 'alerta-loteria' : color == '#be3b3b' ? 'alerta-loteria2' : color == '#3bb8be' ? 'alerta-loteria3' : color == '#292929' ? 'alerta-loteria5' : color == '#F07C1B' ? 'alerta-loteria6' : 'alerta-loteria4';
        return retornar;
    };
    GenericService.prototype.getColorClassTWO = function () {
        var color = this.localStorageEncryptService.getFromLocalStorage("theme");
        var retornar = color == '#3b64c0' ? 'alerta-two-button' : color == '#be3b3b' ? 'alerta-two-button2' : color == '#3bb8be' ? 'alerta-two-button3' : color == '#292929' ? 'alerta-two-button5' : color == '#F07C1B' ? 'alerta-two-button6' : 'alerta-two-button4';
        return retornar;
    };
    GenericService.prototype.getColorClassChat = function () {
        var color = this.localStorageEncryptService.getFromLocalStorage("theme");
        var retornar = color == '#3b64c0' ? 'm' : color == '#be3b3b' ? 'm2' : color == '#3bb8be' ? 'm3' : color == '#292929' ? 'm5' : color == '#F07C1B' ? 'm6' : 'm4';
        return retornar;
    };
    GenericService.prototype.imgLogin = function () {
        var color = this.localStorageEncryptService.getFromLocalStorage("theme");
        var armado = "assets/imgs/login/loginFondo";
        var retornar = color == '#3b64c0' ? armado + ".png" : color == '#be3b3b' ? armado + "2.png" : color == '#3bb8be' ? armado + "3.png" : color == '#292929' ? armado + "5.png" : color == '#F07C1B' ? armado + "6.png" : armado + "4.png";
        return retornar;
    };
    GenericService.prototype.imgProblema = function () {
        var color = this.localStorageEncryptService.getFromLocalStorage("theme");
        var armado = "assets/imgs/problemas/problema";
        var retornar = color == '#3b64c0' ? armado + "2.png" : color == '#be3b3b' ? armado + "3.png" : color == '#3bb8be' ? armado + "4.png" : color == '#292929' ? armado + "6.png" : color == '#F07C1B' ? armado + "1.png" : armado + "5.png";
        return retornar;
    };
    GenericService.prototype.getUser = function () {
        return this.localStorageEncryptService.getFromLocalStorage("userSession");
    };
    GenericService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_0__local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */]])
    ], GenericService);
    return GenericService;
}());

//# sourceMappingURL=generic.service.js.map

/***/ }),

/***/ 975:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_tarjetas_frecuentes_tarjetas_frecuentes__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_ayuda_ayuda__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_acerca_de_acerca_de__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_perfil_perfil__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_lista_carrito_compras_lista_carrito_compras__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_tabs_tabs__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_login_login__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__models_Menu__ = __webpack_require__(979);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_direcciones_direcciones__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_info_info__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_terminos_condiciones_terminos_condiciones__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__environments_environment_prod__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_proveedor_tabs_tabs__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_recuperar_password_recuperar_password__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_fcm__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_screen_orientation__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_proveedor_documentos_documentos__ = __webpack_require__(225);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

























var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, translateService, localStorageEncryptService, events, app, alertaService, alertCtrl, genericService, fcm, screenOrientation) {
        var _this = this;
        this.platform = platform;
        this.translateService = translateService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.app = app;
        this.alertaService = alertaService;
        this.alertCtrl = alertCtrl;
        this.genericService = genericService;
        this.fcm = fcm;
        this.screenOrientation = screenOrientation;
        this.rootPage = null;
        this.pages = [];
        this.user = null;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            if (_this.platform.is("ios") || _this.platform.is("android")) {
                _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.PORTRAIT);
            }
            _this.initializeLanguage();
            var firstTime = _this.localStorageEncryptService.getFromLocalStorage("firstTime");
            if (!firstTime) {
                _this.localStorageEncryptService.setToLocalStorage("theme", "#F07C1B");
                _this.localStorageEncryptService.setToLocalStorage("firstTime", 1);
            }
            /**Armar menu */
            switch (__WEBPACK_IMPORTED_MODULE_19__environments_environment_prod__["a" /* environment */].perfil.activo) {
                case 1:
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Mi perfil", "assets/imgs/perfil/social-media.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_3__pages_perfil_perfil__["a" /* PerfilPage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Tarjetas", "assets/imgs/menu/card.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_0__pages_tarjetas_frecuentes_tarjetas_frecuentes__["a" /* TarjetasFrecuentesPage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Lista de carrito frecuentes", "assets/imgs/lista-carrito/trolley.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_5__pages_lista_carrito_compras_lista_carrito_compras__["a" /* ListaCarritoComprasPage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Direcciones frecuentes", "assets/imgs/direcciones/markerD.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_16__pages_direcciones_direcciones__["a" /* DireccionesPage */]));
                    //this.pages.push(new Menu("Mi historial", "assets/imgs/menu/historial.png", "#7d3a63", HistorialPedidosPage));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Proveedores", "assets/imgs/menu/arrows.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_21__pages_recuperar_password_recuperar_password__["a" /* ProveedorPage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Acerca de", "assets/imgs/menu/interface.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_2__pages_acerca_de_acerca_de__["a" /* AcercaDePage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Información de la app", "assets/imgs/menu/signs.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_17__pages_info_info__["a" /* InfoPage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Contacto", "assets/imgs/menu/logotype.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_1__pages_ayuda_ayuda__["a" /* AyudaPage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Términos y condiciones", "assets/imgs/menu/contrato.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_18__pages_terminos_condiciones_terminos_condiciones__["a" /* TerminosCondicionesPage */]));
                    break;
                case 2:
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Mi perfil", "assets/imgs/perfil/social-media.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_3__pages_perfil_perfil__["a" /* PerfilPage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Mis documentos", "assets/imgs/menu/file.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_24__pages_proveedor_documentos_documentos__["a" /* DocumentosPage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Acerca de", "assets/imgs/menu/interface.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_2__pages_acerca_de_acerca_de__["a" /* AcercaDePage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Información de la app", "assets/imgs/menu/signs.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_17__pages_info_info__["a" /* InfoPage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Contacto", "assets/imgs/menu/logotype.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_1__pages_ayuda_ayuda__["a" /* AyudaPage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Términos y condiciones", "assets/imgs/menu/contrato.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_18__pages_terminos_condiciones_terminos_condiciones__["a" /* TerminosCondicionesPage */]));
                    break;
            }
            /** */
            _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            switch (__WEBPACK_IMPORTED_MODULE_19__environments_environment_prod__["a" /* environment */].perfil.activo) {
                case 1:
                    if (_this.user) {
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_11__pages_tabs_tabs__["a" /* TabsPage */];
                    }
                    else {
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_11__pages_tabs_tabs__["a" /* TabsPage */];
                    }
                    break;
                case 2:
                    if (_this.user) {
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_20__pages_proveedor_tabs_tabs__["a" /* TabsProveedorPage */];
                    }
                    else {
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */];
                    }
                    break;
            }
        });
        this.events.subscribe("reloadUser", function (data) {
            try {
                _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            }
            catch (error) {
            }
        });
        this.events.subscribe("cierre", function (data) {
            try {
                _this.alertaService.errorAlertGeneric("Su sesión expiró");
                _this.cierreSesion();
            }
            catch (error) {
            }
        });
        this.events.subscribe("startSession", function (data) {
            try {
                _this.openSesion();
            }
            catch (error) {
            }
        });
        this.fcm.getToken().then(function (token) {
            console.log("*********************");
            console.log(token);
            localStorage.setItem("token", token);
            console.log("*********************");
        });
    }
    MyApp.prototype.readNotify = function () {
        if (this.platform.is('ios') || this.platform.is('android')) {
            this.fcm.onNotification().subscribe(function (data) {
                if (data.wasTapped) {
                    //Notification was received on device tray and tapped by the user.
                    console.log(JSON.stringify(data));
                    //var date = this.datePipe.transform(new Date(), "yyyy-MM-dd").toString();
                    //console.log(date);
                    //this.badge.increase(1);
                    /* this.localNotifications.schedule({
                      text: data.body,
                      led: 'FF0000',
                      //icon: 'http://www.soyluzradio.com/logo.png',
                      icon: 'assets://imgs/logo.png',
                      title: "Suite Home",
                      vibrate: true,
                      badge: 1
                    }); */
                }
                else {
                    //Notification was received in foreground. Maybe the user needs to be notified.
                    console.log(JSON.stringify(data));
                    //this.alertaService.alertaBasica("Soy Luz Radio Notifica", data.body, null);
                }
            });
        }
        else {
        }
    };
    MyApp.prototype.openPage = function (pagina) {
        this.app.getActiveNav().push(pagina.component);
    };
    MyApp.prototype.cierreSesion = function () {
        try {
            this.app.getActiveNav().popToRoot();
        }
        catch (error) {
        }
        this.localStorageEncryptService.clearProperty("userSession");
        //this.app.getRootNav().push(ProvisionalComponent);
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */]);
    };
    MyApp.prototype.openSesion = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirmación',
            message: 'Para proceder es necesario que inicies sesión',
            cssClass: this.genericService.getColorClassTWO(),
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */]);
                    }
                }
            ]
        });
        alert.present();
    };
    MyApp.prototype.exitApp = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: "Confirmación",
            message: "¿Estás seguro de querer salir?",
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function () {
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.salir();
                    }
                }
            ]
        });
        confirm.present();
    };
    MyApp.prototype.salir = function () {
        this.platform.exitApp();
    };
    MyApp.prototype.initializeLanguage = function () {
        var l = localStorage.getItem("language");
        var language = l;
        if (language) {
            this.translateService.setDefaultLang(language);
            this.translateService.use(language);
        }
        else {
            localStorage.setItem("language", "es");
            this.translateService.setDefaultLang('es');
            this.translateService.use('es');
        }
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/app.html"*/'<ion-menu [content]="content" *ngIf="user">\n  <ion-header>\n    <ion-item class="item item-thumbnail-left" style="\n                  background-image: url(assets/imgs/menu/market.jpg);\n                  background-size: 100%;\n                  background-position: center center;">\n      <img src="assets/imgs/logo.png" alt="Fry" class="animated myImagen" style="top: 16px !important;left: 16px !important;height: 65px !important;border-radius: 0px !important;width: 67px !important;opacity: -1.6;">\n      <div class="menu-bottom" style="color: rgba(0, 0, 0, 0.99);\n      background-color: rgba(255, 255, 255, 0.74);\n      padding: 7px;\n      font-size: 15px;\n      font-weight: 700;\n      font-family: sans-serif;\n      border-radius: 4px;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      overflow: hidden;">\n        {{user.nombre}}\n      </div>\n    </ion-item>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n\n      <div *ngFor="let p of pages">\n        <ion-item menuClose class="item item-icon-right" (click)="openPage(p)" style="border-top: 1px solid #ddd;box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.07);">\n          <img src="{{p.img}}" alt="logo" style="    /* height: 35%; */\n              width: 11%;\n              /* margin-top: 1px; */\n              position: absolute;" />\n          <h2 style="display: inline-block;\n            margin-left: 44px;\n            margin-top: 8px;\n            font-size: 17px;\n            font-weight: 600;\n            font-family: sans-serif;">{{\n            p.nombre }}</h2>\n        </ion-item>\n      </div>\n    </ion-list>\n  </ion-content>\n  <ion-footer>\n    <ion-toolbar>\n      <div>\n        <button ion-button outline style="width: 48%;" (click)="exitApp()"\n        [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n          <ion-icon name="close-circle" class="botonFooter"></ion-icon>\n          Salir\n        </button>\n      </div>\n    </ion-toolbar>\n  </ion-footer>\n\n</ion-menu>\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false">\n\n</ion-nav>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_14__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_6__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_fcm__["a" /* FCM */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_screen_orientation__["a" /* ScreenOrientation */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 976:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Seccion; });
/*
*Seccion Model.
*/
var Seccion = /** @class */ (function () {
    /** Generate Seccion */
    function Seccion(id, nombre, empresaId) {
        this.id = id;
        this.nombre = nombre;
        this.empresaId = empresaId;
    }
    /*
    *Función para obtener información.
    */
    Seccion.fromJson = function (data) {
        if (!data) {
            throw (new Error("Invalid argument"));
        }
        var temp = new Seccion(data.id, data.nombre, data.empresaId);
        return temp;
    };
    return Seccion;
}());

//# sourceMappingURL=Seccion.js.map

/***/ }),

/***/ 977:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Proveedor; });
/*
*Proveedor Model.
*/
var Proveedor = /** @class */ (function () {
    /** Generate Proveedor */
    function Proveedor(id, nombre, empresaId) {
        this.id = id;
        this.nombre = nombre;
        this.empresaId = empresaId;
    }
    /*
    *Función para obtener información.
    */
    Proveedor.fromJson = function (data) {
        if (!data) {
            throw (new Error("Invalid argument"));
        }
        var temp = new Proveedor(data.id, data.nombre, data.empresaId);
        return temp;
    };
    return Proveedor;
}());

//# sourceMappingURL=Proveedor.js.map

/***/ }),

/***/ 978:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Categoria; });
/*
*Categoria Model.
*/
var Categoria = /** @class */ (function () {
    /** Generate Categoria */
    function Categoria(id, nombre, empresaId) {
        this.id = id;
        this.nombre = nombre;
        this.empresaId = empresaId;
    }
    /*
    *Función para obtener información.
    */
    Categoria.fromJson = function (data) {
        if (!data) {
            throw (new Error("Invalid argument"));
        }
        var temp = new Categoria(data.id, data.nombre, data.empresaId);
        return temp;
    };
    return Categoria;
}());

//# sourceMappingURL=Categoria.js.map

/***/ }),

/***/ 979:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Menu; });
var Menu = /** @class */ (function () {
    function Menu(nombre, img, color, component) {
        this.nombre = nombre;
        this.img = img;
        this.color = color;
        this.component = component;
    }
    return Menu;
}());

//# sourceMappingURL=Menu.js.map

/***/ }),

/***/ 980:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 981:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-start></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 984:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProvidersModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_validation_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_action_sheet__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__interceptors_request_interceptor_service__ = __webpack_require__(985);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_auth_service__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_producto_service__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_string_utils_service__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_google_maps__ = __webpack_require__(986);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_fcm__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_stripe__ = __webpack_require__(987);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_open_native_settings__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_diagnostic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_android_permissions__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_qr_scanner__ = __webpack_require__(988);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_chat_service__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_common__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_app_version__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_screen_orientation__ = __webpack_require__(592);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




























var ProvidersModule = /** @class */ (function () {
    function ProvidersModule() {
    }
    ProvidersModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__["a" /* AlertaService */],
                __WEBPACK_IMPORTED_MODULE_5__services_loading_service__["a" /* LoadingService */],
                __WEBPACK_IMPORTED_MODULE_6__services_validation_service__["a" /* ValidationService */],
                __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
                __WEBPACK_IMPORTED_MODULE_8__services_generic_service__["a" /* GenericService */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_action_sheet__["a" /* ActionSheet */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_12__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_11__interceptors_request_interceptor_service__["a" /* RequestInterceptorService */],
                    multi: true
                },
                __WEBPACK_IMPORTED_MODULE_13__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_14__services_producto_service__["a" /* ProductoService */],
                __WEBPACK_IMPORTED_MODULE_15__services_string_utils_service__["a" /* StringUtilsService */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_fcm__["a" /* FCM */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_stripe__["a" /* Stripe */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_open_native_settings__["a" /* OpenNativeSettings */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_android_permissions__["a" /* AndroidPermissions */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_qr_scanner__["a" /* QRScanner */],
                __WEBPACK_IMPORTED_MODULE_24__services_chat_service__["a" /* ChatService */],
                __WEBPACK_IMPORTED_MODULE_25__angular_common__["c" /* CurrencyPipe */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_app_version__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_screen_orientation__["a" /* ScreenOrientation */]
            ]
        })
    ], ProvidersModule);
    return ProvidersModule;
}());

//# sourceMappingURL=providers.module.js.map

/***/ }),

/***/ 985:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestInterceptorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**Clase provider que intercepta las llamadas o peticiones a los servicios back-end y en caso de que el usuario
 * se encuentre en sesión añade los header de token
 */
var RequestInterceptorService = /** @class */ (function () {
    function RequestInterceptorService(auth, events) {
        this.auth = auth;
        this.events = events;
    }
    RequestInterceptorService.prototype.intercept = function (request, next) {
        var _this = this;
        var chequeo = this.auth.getToken();
        var headers = {
            'Content-Type': 'application/json'
        };
        if (chequeo && request.url != "https://maps.googleapis.com/maps/api/geocode/json") {
            headers.Authorization = "Bearer " + this.auth.getToken();
        }
        /* let urlParse: any = request.url.split("api");
        switch (urlParse[1]) {
          case "promociones":
    
            break;
    
          default:
            headers.Authorization = `Bearer ${this.auth.getToken()}`;
            break;
        } */
        if (request.url == "https://maps.googleapis.com/maps/api/geocode/json") {
            return next.handle(request);
        }
        else {
            request = request.clone({
                setHeaders: headers
            });
            return next.handle(request).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["catchError"])(function (errorResponse) {
                var error = null;
                try {
                    error = (typeof errorResponse !== 'object') ? JSON.parse(errorResponse) : errorResponse;
                }
                catch (error) {
                    error = errorResponse;
                }
                if (error && error.status == 401 &&
                    !request.url.toString().includes("api/authenticate") &&
                    error.error.title == "Unauthorized" ||
                    error.error.title == "El cliente es requerido") {
                    _this.auth.events.publish("startSession");
                    return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error);
                }
                else {
                    return next.handle(request);
                }
            }));
        }
    };
    RequestInterceptorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["d" /* Events */]])
    ], RequestInterceptorService);
    return RequestInterceptorService;
}());

//# sourceMappingURL=request-interceptor.service.js.map

/***/ }),

/***/ 989:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlMessagesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_validation_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ControlMessagesComponent = /** @class */ (function () {
    /** Generate ControlMessagesComponent */
    function ControlMessagesComponent(validationService) {
        this.validationService = validationService;
        this.clase = "validators";
    }
    Object.defineProperty(ControlMessagesComponent.prototype, "errorMessage", {
        get: function () {
            for (var propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                    return this.validationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */])
    ], ControlMessagesComponent.prototype, "control", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ControlMessagesComponent.prototype, "clase", void 0);
    ControlMessagesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'app-control-messages',
            template: "<div *ngIf=\"errorMessage !== null\" class=\"{{clase}} animated fadeIn\">{{errorMessage}}</div>"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__services_validation_service__["a" /* ValidationService */]])
    ], ControlMessagesComponent);
    return ControlMessagesComponent;
}());

//# sourceMappingURL=control-messages.component.js.map

/***/ }),

/***/ 990:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_local_storage_encrypt_service__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**Componente que se encarga de mostrar las card
 * en cada vista requerida
 */
var GalleryComponent = /** @class */ (function () {
    /**Constructor de la clase
     * con la inyección de los servicios necesarios
     */
    function GalleryComponent(navCtrl, loadingService, genericService, localStorageEncryptService) {
        this.navCtrl = navCtrl;
        this.loadingService = loadingService;
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.showSpinner = true;
        this.titleUp = false;
        this.showButton = true;
        this.isEntertaiment = false;
        this.isEntertaimentPromotion = false;
        this.isEntertaimentExperience = false;
        this.retornarImagen = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        /**Variable que funciona como temporizador */
        this.tooltipDelay = 1;
        this.url = "https://santandertwist.com.mx/storage/app/uploads/public/5ca/e04/9e8/5cae049e8505c908712807.png";
        this.user = null;
        this.imagen = "";
        //Arrows
        this.rigthArrow = true;
        this.leftArrow = false;
        /*Se obtiene la instancia mas reciente del objeto usuario guardado en localstorage */
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        //this.imagen = this.cards[0].url;
    }
    /**Metodo que retorna la imagen seleccionada */
    GalleryComponent.prototype.changeImage = function (event) {
        this.imagen = this.cards[event].url;
    };
    /** init pages*/
    GalleryComponent.prototype.ngOnInit = function () {
        this.imagen = this.cards[0].url;
    };
    /**Metodo para verificar la imagen anterior */
    GalleryComponent.prototype.prev = function () {
        this.slider.slidePrev();
    };
    /**Metodo para verificar la imagen posterior */
    GalleryComponent.prototype.next = function () {
        this.slider.slideNext();
    };
    /**Método que captura el evento del cambio en el slide de promociones*/
    GalleryComponent.prototype.didChange = function (event) {
        if (event.realIndex === 0) {
            this.leftArrow = false;
        }
        else {
            this.leftArrow = true;
        }
        if (event.realIndex + 1 === this.cards.length) {
            this.rigthArrow = false;
        }
        else {
            this.rigthArrow = true;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], GalleryComponent.prototype, "cards", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], GalleryComponent.prototype, "showSpinner", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], GalleryComponent.prototype, "titleUp", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], GalleryComponent.prototype, "showButton", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], GalleryComponent.prototype, "isEntertaiment", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], GalleryComponent.prototype, "isEntertaimentPromotion", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], GalleryComponent.prototype, "isEntertaimentExperience", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], GalleryComponent.prototype, "retornarImagen", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */])
    ], GalleryComponent.prototype, "slider", void 0);
    GalleryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'cmpt-gallery',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/components/gallery/gallery.html"*/'<div *ngIf="showSpinner && cards?.length == 0" class="divSpinner animated fadeIn">\n  <ion-spinner></ion-spinner>\n</div>\n<div style="box-shadow: 1px 1px 6px 1px #646467;" class="animated fadeIn">\n  <img src="{{imagen}}" alt="" style="width: 100%;">\n</div>\n<div class="slider-io">\n  <ion-slides class="ionSlidesAndroid animated fadeIn" autoplay="5000" loop="false" speed="500" pager\n  (ionSlideDidChange)="didChange($event)">\n    <ion-slide *ngFor="let slide of cards; let i = index" [ngClass]="{\'adjustEntertaiment\' : isEntertaiment}">\n      <img src="{{slide.url}}" alt="" (click)="changeImage(i)">\n      <div class="textoGana" [ngStyle]="{\'margin-top\': titleUp ? \'0%\' :  !showButton ? \'0%\' : \'\'}" *ngIf="!isEntertaiment">\n      </div>\n      <div *ngIf="isEntertaiment" class="titlesAlign">\n      </div>\n    </ion-slide>\n  </ion-slides>\n  <div class="arrows-lateral">\n    <div (tap)="prev()">\n      <ion-icon ios="ios-arrow-back" md="ios-arrow-back" [ngStyle]="{\'display\': !leftArrow ? \'none\' : \'block\', \'text-shadow\': !leftArrow ? \'none\' : \'\'}"></ion-icon>\n    </div>\n    <div (tap)="next()" *ngIf="cards?.length > 0">\n      <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" [ngStyle]="{\'display\': !rigthArrow ? \'none\' : \'block\', \'text-shadow\': !rigthArrow ? \'none\' : \'\'}"></ion-icon>\n    </div>\n  </div>\n</div>\n'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/components/gallery/gallery.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_4__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]])
    ], GalleryComponent);
    return GalleryComponent;
}());

//# sourceMappingURL=gallery.component.js.map

/***/ }),

/***/ 991:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollHideDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ScrollHideDirective = /** @class */ (function () {
    function ScrollHideDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.lastValue = 0;
        this.lastValueMax = 0;
        this.a = document.getElementsByClassName("scroll-content");
    }
    ScrollHideDirective.prototype.ngOnDestroy = function () {
        this.a.style.marginTop = this.config.maxValue + "px";
    };
    ScrollHideDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var posicion = 0;
        for (var index = 0; index < this.a.length; index++) {
            var element = this.a[index];
            for (var j = 0; j < element.children.length; j++) {
                var element2 = element.children[j];
                if (element2.id) {
                    if (element2.id == this.config.property) {
                        posicion = index;
                    }
                }
            }
        }
        this.a = this.a[posicion];
        if (this.scrollContent && this.config) {
            this.lastValueMax = this.config.maxValue;
            this.scrollContent.ionScrollStart.subscribe(function (ev) {
                _this.contentHeight = _this.scrollContent.getScrollElement().offsetHeight;
                _this.scrollHeight = _this.scrollContent.getScrollElement().scrollHeight;
                if (_this.config.maxValue === undefined) {
                    _this.config.maxValue = _this.element.nativeElement.offsetHeight;
                }
                try {
                    _this.lastScrollPosition = ev.scrollTop;
                }
                catch (error) {
                }
            });
            this.scrollContent.ionScroll.subscribe(function (ev) { return _this.adjustElementOnScroll(ev); });
            this.scrollContent.ionScrollEnd.subscribe(function (ev) { return _this.adjustElementOnScroll(ev); });
        }
    };
    ScrollHideDirective.prototype.adjustElementOnScroll = function (ev) {
        var _this = this;
        if (ev) {
            ev.domWrite(function () {
                var scrollTop = ev.scrollTop > 0 ? ev.scrollTop : 0;
                var scrolldiff = scrollTop - _this.lastScrollPosition;
                var scrolldiff2 = scrollTop + _this.lastScrollPosition;
                _this.lastScrollPosition = scrollTop;
                var newValue = _this.lastValue + scrolldiff;
                var newValue2 = _this.lastValueMax + scrolldiff2;
                newValue = Math.max(0, Math.min(newValue, _this.config.maxValue));
                newValue2 = Math.min(_this.config.maxValue, Math.max(newValue2, 0));
                newValue2 = Math.min(_this.config.maxValue, Math.min(newValue, 0));
                _this.renderer.setStyle(_this.element.nativeElement, _this.config.cssProperty, "-" + newValue + "px");
                var valor;
                _this.a.style.marginTop = "-" + newValue + "px";
                _this.lastValue = newValue;
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* Input */])('scrollHide'),
        __metadata("design:type", Object)
    ], ScrollHideDirective.prototype, "config", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* Input */])('scrollContent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Content */])
    ], ScrollHideDirective.prototype, "scrollContent", void 0);
    ScrollHideDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["s" /* Directive */])({
            selector: '[scrollHide]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["W" /* Renderer2 */]])
    ], ScrollHideDirective);
    return ScrollHideDirective;
}());

//# sourceMappingURL=scroll-hide.directive.js.map

/***/ })

},[597]);
//# sourceMappingURL=main.js.map
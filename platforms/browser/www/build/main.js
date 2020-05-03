webpackJsonp([1],{

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TIME_OUT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenericService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(8);
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
        var retornar = color == '#3b64c0' ? 'primary' : color == '#be3b3b' ? 'primary2' : color == '#3bb8be' ? 'primary3' : 'primary4';
        //console.log(retornar);
        return retornar;
    };
    GenericService.prototype.getColorHex = function () {
        var color = this.localStorageEncryptService.getFromLocalStorage("theme");
        return color;
    };
    GenericService.prototype.getColorClass = function () {
        var color = this.localStorageEncryptService.getFromLocalStorage("theme");
        var retornar = color == '#3b64c0' ? 'alerta-loteria' : color == '#be3b3b' ? 'alerta-loteria2' : color == '#3bb8be' ? 'alerta-loteria3' : 'alerta-loteria4';
        //console.log(retornar);
        return retornar;
    };
    GenericService.prototype.getColorClassTWO = function () {
        var color = this.localStorageEncryptService.getFromLocalStorage("theme");
        var retornar = color == '#3b64c0' ? 'alerta-two-button' : color == '#be3b3b' ? 'alerta-two-button2' : color == '#3bb8be' ? 'alerta-two-button3' : 'alerta-two-button4';
        //console.log(retornar);
        return retornar;
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

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(86);
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
        //console.log(user);
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

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListaCarritoComprasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__carrito_historico_carrito_historico__ = __webpack_require__(423);
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
            console.log(response);
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
        console.log('ionViewDidLoad ListaCarritoComprasPage');
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

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageEncryptService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js__ = __webpack_require__(482);
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
        localStorage.removeItem(encryptedKey);
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

/***/ 173:
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
webpackEmptyAsyncContext.id = 173;

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapaProveedoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_open_native_settings__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_android_permissions__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__environments_environment_prod__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_leaflet__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_leaflet_knn__ = __webpack_require__(616);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_leaflet_knn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_leaflet_knn__);
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
    function MapaProveedoresPage(navCtrl, navParams, geolocation, genericService, loadingService, alertaService, alertCtrl, diagnostic, openNativeSettings, androidPermissions, platform, events) {
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
        this.emulado = __WEBPACK_IMPORTED_MODULE_9__environments_environment_prod__["a" /* environment */].emulado;
        this.muestraMapa = false;
        this.id = null;
        this.proveedores = [];
        this.producto = null;
        this.geo = null;
        this.proveedorActivo = null;
        this.env = __WEBPACK_IMPORTED_MODULE_9__environments_environment_prod__["a" /* environment */];
        this.proveedores = navParams.get("proveedores");
        this.producto = navParams.get("producto");
        console.log(this.producto);
        this.geo = [];
        this.proveedores.forEach(function (proveedor) {
            _this.geo.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [proveedor.direccion.latitud, proveedor.direccion.longitud]
                },
                "properties": {
                    proveedor: proveedor
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
            console.log(error);
        });
    };
    MapaProveedoresPage.prototype.loadMap = function (position) {
        var _this = this;
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log(latitude, longitude);
        // create a new map by passing HTMLElement
        var mapEle = document.getElementById('map_canvas');
        var myLatLng = { lat: latitude, lng: longitude };
        console.log(this.geo);
        var gj = __WEBPACK_IMPORTED_MODULE_10_leaflet___default.a.geoJson(this.geo);
        var nearest = __WEBPACK_IMPORTED_MODULE_11_leaflet_knn___default()(gj).nearest([latitude, longitude], 50, 2000); //punto de partida, estaciones máximas a encontrar, diámetro de busqueda en metros
        console.log(nearest);
        // create map
        this.map = new google.maps.Map(mapEle, {
            center: myLatLng,
            zoom: 15
        });
        this.muestraMapa = true;
        google.maps.event.addListenerOnce(this.map, 'idle', function () {
            nearest.forEach(function (item) {
                console.log(item);
                var ll = { lat: Number(item.lon), lng: Number(item.lat) };
                var info = "\n        <div>\n          <div style=\"    text-align: center;\n          font-weight: 700;\n          font-size: 19px;\n      \">" + item.layer.feature.properties.proveedor.nombre + "</div>\n          <div style=\"width:100%; text-align: center\">\n            <div ><strong>Direcci\u00F3n</strong></div>\n            <div >" + item.layer.feature.properties.proveedor.direccion.direccion + "</div>\n          </div>\n          <div style=\"width:100%; text-align: center\">\n            <div ><strong>Empresa</strong></div>\n            <div >" + item.layer.feature.properties.proveedor.empresa.nombre + "</div>\n          </div>\n        </div>";
                var infowindow = new google.maps.InfoWindow({
                    content: info
                });
                console.log(ll);
                var marker = new google.maps.Marker({
                    position: ll,
                    map: _this.map,
                    title: item.layer.feature.properties.proveedor.nombre,
                    id: "" + item.layer.feature.properties.proveedor.id,
                    //draggable: true,
                    icon: __WEBPACK_IMPORTED_MODULE_9__environments_environment_prod__["a" /* environment */].icons['proveedor'].icon
                });
                console.log(marker);
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
        var position = this.proveedores.findIndex(function (carrito) {
            return carrito.id == marker.id;
        });
        console.log(position);
        this.proveedorActivo = this.proveedores[position];
        console.log(this.proveedorActivo);
    };
    MapaProveedoresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mapa-proveedores',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/mapa-proveedores/mapa-proveedores.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>{{producto.producto.nombre}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="spinner-carrito" *ngIf="!muestraMapa">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <div id="map_canvas" class="mapita-google"></div>\n\n  <div class="contenedor-card" *ngIf="proveedorActivo" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <div id="card-{{i}}" class="card animated lightSpeedIn">\n      <!-- <div class="tacha">\n                    <div class="mini-tacha">\n                        <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                        <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                    </div>\n                  </div> -->\n      <div class="container-card" >\n\n        <img src="{{env.getImagenIndividual}}{{producto.producto.adjuntoId}}" />\n      </div>\n      <div class="container-text" >{{producto.producto.nombre}}</div>\n      <div class="description" >{{producto.producto.descripcion}}</div>\n      <div class="precio" >{{producto.precio | currency}}</div>\n\n      <!-- <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n        <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">-</div>\n        </div>\n        <div class="cantidad" *ngIf="p.cantidad > 0">\n          <div [ngStyle]="{\'color\': genericService.getColorHex()}">{{p.cantidad}}</div>\n        </div>\n        <div class="mas" (click)="incrementa(p)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">+</div>\n        </div>\n      </div> -->\n    </div>\n    <div class="informa">\n      <div class="nombre">{{proveedorActivo.nombre}}</div>\n\n      <div class="ofrece">A tu servicio: </div>\n      <div class="nombre">{{proveedorActivo.empresa.nombre}}</div>\n\n      <div class="ofrece">Estamos ubicados en</div>\n      <div class="nombre">{{proveedorActivo.direccion.direccion}}</div>\n      <div class="nombre" *ngIf="proveedorActivo.direccion.colonia">col. {{proveedorActivo.direccion.colonia}}</div>\n      <div class="nombre">{{proveedorActivo.direccion.codigoPostal}}</div>\n    </div>\n\n    <div class="logo"><img src="assets/imgs/logo.png" alt=""></div>\n  </div>\n</ion-content>\n\n<ion-footer class="footer-detalle" *ngIf="proveedorActivo" style="box-shadow: none;">\n    <div class="cont-e">\n      <!-- <div class="suma">\n        <div class="menos" (click)="decrementar(producto)" >\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">-</div>\n        </div>\n        <div class="cantidad" >\n          <div [ngStyle]="{\'color\': genericService.getColorHex()}">{{producto.cantidad}} {{producto.cantidad == 1 ? \'pza\' : \'pzas\'}}</div>\n        </div>\n        <div class="mas" (click)="incrementa(producto)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">+</div>\n        </div>\n      </div> -->\n      <button style="width:100%" (click)="agregarCarrito(producto)" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n        Agregar a carrito\n      </button>\n    </div>\n  </ion-footer>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/mapa-proveedores/mapa-proveedores.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_3__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_open_native_settings__["a" /* OpenNativeSettings */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
    ], MapaProveedoresPage);
    return MapaProveedoresPage;
}());

//# sourceMappingURL=mapa-proveedores.js.map

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
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

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(8);
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

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"pages/alta-direcciones/alta-direcciones.module": [
		647,
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
webpackAsyncContext.id = 217;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export pathPrincipal */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var pathPrincipal = "http://localhost:8080/api/";
var environment = {
    production: true,
    productos: pathPrincipal + "productos",
    productosCategoria: pathPrincipal + "productos/home",
    proveedorProductos: pathPrincipal + "proveedor-productos",
    categoria: pathPrincipal + "proveedor-productos/categoria/",
    secciones: pathPrincipal + "seccions",
    categorias: pathPrincipal + "categorias",
    proveedores: pathPrincipal + "proveedors",
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
    emulado: true
};
//# sourceMappingURL=environment.prod.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoriaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__articulo_productos_articulo_productos__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_producto_service__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__detalle_producto_detalle_producto__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mapa_proveedores_mapa_proveedores__ = __webpack_require__(174);
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
        this.env = __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */];
        this.user = null;
        this.color = "#3b64c0";
        this.categoria = navParams.get("categoria");
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        console.log(this.categoria);
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
        console.log('ionViewDidLoad CategoriaPage');
    };
    CategoriaPage.prototype.viewDetail = function (producto) {
        var _this = this;
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            _this.user.parametros.pantalla_proveedores = "N";
            if (_this.user.parametros.pantalla_proveedores == "S") {
                _this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].proveedoresProducto + producto.id).subscribe(function (response) {
                    console.log(response);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__mapa_proveedores_mapa_proveedores__["a" /* MapaProveedoresPage */], { proveedores: response, producto: producto });
                    _this.loadingService.hide();
                }, function (error) {
                    var err = error.error;
                    _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
            }
            else {
                _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.id).subscribe(function (response) {
                    console.log(response);
                    //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
                    //let nav = this.app.getRootNav();
                    //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
                    if (_this.user) {
                        var carritos = _this.localStorageEncryptService.getFromLocalStorage("" + _this.user.id_token);
                        console.log(carritos);
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
        console.log("-----");
        this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].categoria + this.categoria.categoria.id).
            subscribe(function (res) {
            console.log(res);
            _this.articulos = res.productosTipoArticulo;
        }, function (err) {
        });
    };
    CategoriaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-categoria',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/categoria/categoria.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>{{categoria.categoria.nombre}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div class="spinner-carrito" *ngIf="articulos == null">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <div *ngFor="let articulo of articulos">\n    <div class="titulo-wrapper">\n      <div class="seccion" [ngStyle]="{\'color\':color}">\n        {{articulo.tipoArticulo.nombre}}\n      </div>\n\n      <div class="ver-todos" (click)="verTodos(articulo)">\n        Ver todos\n      </div>\n    </div>\n    <div class="scrolling-wrapper" *ngIf="articulo.productos">\n      <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of articulo.productos; let i = index"\n        (click)="viewDetail(p)">\n        <div class="container-card">\n\n          <img src="{{env.getImagenIndividual}}{{p.producto.adjuntoId}}" />\n        </div>\n        <div class="container-text">{{p.producto.nombre}}</div>\n        <div class="description">{{p.producto.descripcion}}</div>\n        <div class="precio">{{p.precio | currency}}</div>\n\n        <!-- <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n                      <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n                        <div>-</div>\n                      </div>\n                      <div class="cantidad" *ngIf="p.cantidad > 0">\n                        <div>{{p.cantidad}}</div>\n                      </div>\n                      <div class="mas" (click)="incrementa(p)">\n                        <div>+</div>\n                      </div>\n                    </div> -->\n      </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/categoria/categoria.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__services_producto_service__["a" /* ProductoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_producto_service__["a" /* ProductoService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__services_loading_service__["a" /* LoadingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_loading_service__["a" /* LoadingService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */]) === "function" && _h || Object])
    ], CategoriaPage);
    return CategoriaPage;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=categoria.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticuloProductosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__detalle_producto_detalle_producto__ = __webpack_require__(51);
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
        console.log(this.articulo);
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
                console.log(response);
                //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
                //let nav = this.app.getRootNav();
                //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
                if (_this.user) {
                    var carritos = _this.localStorageEncryptService.getFromLocalStorage("" + _this.user.id_token);
                    console.log(carritos);
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
    ArticuloProductosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-articulo-productos',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/articulo-productos/articulo-productos.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>{{articulo.tipoArticulo?.nombre}}</ion-title>\n    \n  </ion-navbar>\n  <div class="busca">\n      <input type="text" [(ngModel)]="palabra" placeholder="Escribe aquí tu búsqueda" (keyup)="buscarPorPalabra()">\n    </div>\n</ion-header>\n\n<ion-content padding>\n\n  <div class="spinner-carrito" *ngIf="!productos || productos.length <= 0">\n    <ion-spinner></ion-spinner>\n  </div>\n\n\n\n  <div *ngIf="productos && productos.length > 0">\n    <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of productos; let i = index" (click)="viewDetail(p)">\n      <!-- <div class="tacha">\n                  <div class="mini-tacha">\n                      <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                      <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                  </div>\n                </div> -->\n      <div class="container-card">\n\n        <img src="{{env.getImagenIndividual}}{{p.adjuntoId}}" />\n      </div>\n      <div class="container-text">{{p.nombre}}</div>\n      <div class="description">{{p.descripcion}}</div>\n      <div class="precio">{{p.precio | currency}}</div>\n    </div>\n  </div>\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="resultadoPost.length % 10 == 0">\n    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Cargando...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/articulo-productos/articulo-productos.html"*/,
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

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_action_sheet__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_validation_service__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_moment__);
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
    function RegistroPage(navCtrl, navParams, formBuilder, localStorageEncryptService, camera, translatePipe, actionSheet, alertaService, genericService, loadingService, events) {
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
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        var putObj = {};
        this.objetoRegistro.forEach(function (item) {
            console.log(item);
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
        if (this.objetoRegistro[7].value != this.objetoRegistro[8].value) {
            this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
        }
        else {
            console.log(this.photo_url);
            var body_1 = {
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
            this.loadingService.show().then(function () {
                _this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].registro, body_1).subscribe(function (response) {
                    console.log(response);
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
        console.log(this.formGroup.controls);
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
    RegistroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registro',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/registro/registro.html"*/'<ion-icon id="icn-1" name="ios-arrow-back" class="arrow-generada" (click)="regresar()"></ion-icon>\n<ion-content>\n\n  <div class="contenedor-step-3">\n    <div class="sub-contenedor">\n      <div class="avatar">\n        <div class="imagen" (tap)="opcionesDeImagen()">\n          <img src="assets/imgs/registro/user.png" alt="" *ngIf="!photo_url">\n          <img src="{{photo_url}}" alt="" *ngIf="photo_url">\n        </div>\n      </div>\n\n      <div class="formulario">\n        <form [formGroup]="formGroup">\n          <div *ngFor="let dato of objetoRegistro;let i = index" class="contenedor-input">\n            <span>{{dato.name}}</span>\n\n            <input class="inp" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}" type="{{dato.type}}"\n              [(ngModel)]="dato.value" maxlength="{{dato.length}}"\n              *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\'">\n\n            <ion-datetime class="dt" [(ngModel)]="dato.value" formControlName="{{dato.formName}}" text-left\n              pickerFormat="DD/MM/YYYY" cancelText="Cancelar" doneText="Aceptar" #fechaNac\n              \n              (ionChange)="ejecutaValidator()" *ngIf="dato.type == \'date\'" placeholder="01/12/2020"></ion-datetime>\n\n            <ion-col col-2 class="text-center" *ngIf="dato.type == \'checkbox\'">\n              <ion-checkbox formControlName="{{dato.formName}}" [(ngModel)]="dato.value"\n                (ionChange)="ejecutaValidator()">\n              </ion-checkbox>\n            </ion-col>\n\n            <ion-select *ngIf="dato.type == \'select\'" [(ngModel)]="dato.value" \n              okText="Ok" cancelText="Cancelar" interface="action-sheet"\n              (ionChange)="ejecutaValidator()" [selectOptions]="selectOptions" \n              formControlName="{{dato.formName}}">\n              <ion-option *ngFor="let op of dato.opts" [value]="op.id">\n                {{op.value}}\n              </ion-option>\n            </ion-select>\n\n            <app-control-messages [control]="formGroup.controls[dato.formName]" [clase]="\'validators2\'">\n            </app-control-messages>\n          </div>\n          <div class="contenedor-boton">\n            <button [disabled]="btnHabilitado" (click)="registrar()">Registrarme</button>\n          </div>\n        </form>\n\n      </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/registro/registro.html"*/,
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
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
    ], RegistroPage);
    return RegistroPage;
}());

//# sourceMappingURL=registro.js.map

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_detalle_producto_detalle_producto__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__local_storage_encrypt_service__ = __webpack_require__(17);
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
                console.log(response);
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
        console.log(producto);
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
        console.log(producto);
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

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarritoHistoricoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__detalle_producto_detalle_producto__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(23);
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
    function CarritoHistoricoPage(navCtrl, navParams, genericService, alertaService, loadingService, localStorageEncryptService, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.user = null;
        this.env = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */];
        this.listaCarrito = null;
        this.productosCarrito = [];
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.listaCarrito = navParams.get("lista");
        this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        console.log(this.listaCarrito);
    }
    CarritoHistoricoPage.prototype.ionViewDidLoad = function () {
    };
    CarritoHistoricoPage.prototype.viewDetail = function (producto) {
        var _this = this;
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.productoProveedor.id).subscribe(function (response) {
                console.log(response);
                //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
                //let nav = this.app.getRootNav();
                //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
                if (_this.user) {
                    var carritos = _this.localStorageEncryptService.getFromLocalStorage("" + _this.user.id_token);
                    console.log(carritos);
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
        console.log(body);
        this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].carritoHistoricoDetalle, body).subscribe(function (response1) {
            console.log(response1);
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
        console.log(producto);
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
        console.log(producto);
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
    CarritoHistoricoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-carrito-historico',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/carrito-historico/carrito-historico.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>{{listaCarrito.nombre}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div>\n    <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of listaCarrito.carritoHistoricoDetalles; let i = index">\n      <!-- <div class="tacha">\n                  <div class="mini-tacha">\n                      <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                      <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                  </div>\n                </div> -->\n      <div class="container-card" (click)="viewDetail(p)">\n\n        <img src="{{env.getImagenIndividual}}{{p.productoProveedor.producto.adjuntoId}}" />\n      </div>\n      <div class="container-text" (click)="viewDetail(p)">{{p.productoProveedor.producto.nombre}}</div>\n      <div class="description" (click)="viewDetail(p)">{{p.productoProveedor.producto.descripcion}}</div>\n      <div class="precio" (click)="viewDetail(p)">{{p.precio | currency}}</div>\n\n      <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n        <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">-</div>\n        </div>\n        <div class="cantidad" *ngIf="p.cantidad > 0">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">{{p.cantidad}}</div>\n        </div>\n        <div class="mas" (click)="incrementa(p)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">+</div>\n        </div>\n      </div> \n    </div>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/carrito-historico/carrito-historico.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */]])
    ], CarritoHistoricoPage);
    return CarritoHistoricoPage;
}());

//# sourceMappingURL=carrito-historico.js.map

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chat_chat__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tarjetas_frecuentes_tarjetas_frecuentes__ = __webpack_require__(431);
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
    function TabsPage(genericService) {
        this.genericService = genericService;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_4__tarjetas_frecuentes_tarjetas_frecuentes__["a" /* TarjetasFrecuentesPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_0__chat_chat__["a" /* ChatPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/tabs/tabs.html"*/'<ion-tabs color="{{genericService.getColor()}}">\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Mis tarjetas" tabIcon="card"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Mis chats" tabIcon="ios-chatbubbles-outline"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_generic_service__["a" /* GenericService */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(8);
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
    function ChatPage(navCtrl, navParams, localStorageEncryptService, events, genericService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.genericService = genericService;
        this.chat = {};
        this.color = "#3b64c0";
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
    ChatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatPage');
    };
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/chat/chat.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title style="text-align:center">Chat</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="contenedor-chat">\n    <div class="cont-msj">\n      <div class="msj">\n        <div class="m" [ngStyle]="{\'background-color\': color}">Hola</div>\n      </div>\n      <div class="msj-r">\n        <div class="m" >Hola</div>\n      </div>\n      <div class="msj">\n          <div class="m" [ngStyle]="{\'background-color\': color}">Hola</div>\n        </div>\n        <div class="msj-r">\n          <div class="m" >Hola</div>\n        </div>\n        <div class="msj">\n            <div class="m" [ngStyle]="{\'background-color\': color}">Hola</div>\n          </div>\n          <div class="msj-r">\n            <div class="m" >Hola</div>\n          </div>\n          <div class="msj">\n              <div class="m" [ngStyle]="{\'background-color\': color}">Hola</div>\n            </div>\n            <div class="msj-r">\n              <div class="m" >Hola</div>\n            </div>\n    </div>\n    <!-- <div class="uno">\n      <span>\n        <div class="dos">\n          <span class="span1"></span>\n          <span class="span2"></span>\n          <div class="tres">\n              <div class="cuatro">\n                  <div class="cinco">\n                      <div class="seis">\n                        <span>\n                          <span>Hola</span>\n                        </span>\n                      </div>\n                  </div>\n              </div>\n          </div>\n        </div>\n      </span>\n    </div> -->\n  </div>\n\n</ion-content>\n<ion-footer class="footer-chat">\n  <div>\n    <input type="text" placeholder="Escribe un mensaje aquí">\n    <div>\n      <button>\n        <ion-icon name="md-send"></ion-icon>\n      </button>\n    </div>\n  </div>\n</ion-footer>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/chat/chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__services_generic_service__["a" /* GenericService */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filtro_producto_filtro_producto__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detalle_producto_detalle_producto__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_action_sheet__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_Seccion__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__models_Proveedor__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__models_Categoria__ = __webpack_require__(628);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__carrito_compras_carrito_compras__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_string_utils_service__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__opciones_menu_opciones_menu__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__categoria_categoria__ = __webpack_require__(291);
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
        console.log("------------------");
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
            console.log(response);
            _this.localStorageEncryptService.setToLocalStorage("" + _this.user.id_token, response);
            _this.totalCarrito = response.length;
        }, function (error) {
            console.log(error);
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
            console.log(response);
            var nav = _this.app.getRootNav();
            _this.localStorageEncryptService.setToLocalStorage("" + _this.user.id_token, response);
            nav.push(__WEBPACK_IMPORTED_MODULE_13__carrito_compras_carrito_compras__["a" /* CarritoComprasPage */]);
        }, function (error) {
            console.log(error);
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
            console.log(productosStorage);
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
        console.log("in method");
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].productos).subscribe(function (response) {
                console.log(response);
                //quitar
                _this.productos = response;
                console.log(_this.productos);
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
        console.log("in method");
        this.productosCategorias = [];
        this.productosCategoriasSub = [];
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].proveedorProductos + "/home/" + opc).subscribe(function (response) {
                console.log(response);
                //quitar
                _this.productosCategorias = response.productosCategoria;
                for (var index = 1; index < _this.productosCategorias.length; index++) {
                    var element = _this.productosCategorias[index];
                    _this.productosCategoriasSub.push(element);
                }
                console.log(_this.productos);
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
            console.log("---");
            params = params.append('nombre', this.dataFilter.nombre);
        }
        console.log(params);
        this.productosBuscados = [];
        this.genericService.sendGetParams(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].proveedorProductos + "/search", params).subscribe(function (response) {
            console.log(response);
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
                        console.log('Cancel clicked');
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
                console.log(response);
                //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
                //let nav = this.app.getRootNav();
                //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
                if (_this.user) {
                    var carritos = _this.localStorageEncryptService.getFromLocalStorage("" + _this.user.id_token);
                    console.log(carritos);
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
            selector: 'page-home',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Productos</ion-title>\n\n\n     \n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="verCarrito()" class="carrito" *ngIf="user">\n        <ion-badge *ngIf="totalCarrito > 0" [ngStyle]="{\'color\': genericService.getColorHex()}">{{totalCarrito}}</ion-badge>\n        <ion-icon name="ios-cart-outline" style="font-size: 2.4rem;"></ion-icon>\n\n      </button>\n\n      <button ion-button icon-only (click)="verOpciones()">\n        <ion-icon name="md-more" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n  <div class="division" [ngStyle]="{\'background-color\': color}">\n    <label for="search"></label>\n    <div class="input-image" (click)="close()" [style.background-image]="\'url(\'+imgBusqueda+\')\'"></div>\n    <input type="text" placeholder="Buscar" class="input-text" id="search" [(ngModel)]="dataFilter.nombre" (keyup)="buscarPorFiltros()">\n\n  </div>\n</ion-header>\n\n<div class="filtro" *ngIf="1==2">\n  <button ion-button (click)="openFilters()">\n    <ion-icon ios="ios-options" md="ios-options"></ion-icon>\n  </button>\n</div>\n\n<ion-content>\n\n  <div *ngIf="dataFilter.nombre.length > 0" class="contenedor-busqueda">\n    <div class="resultado" *ngFor="let p of productosBuscados" (click)="viewDetail(p)">\n      <div class="c-i "><img src="{{env.getImagenIndividual}}{{p.producto.adjuntoId}}" alt=""></div>\n      <div class="r">{{ p.producto.nombre }}</div>\n    </div>\n\n    <div *ngIf="productosBuscados.length <= 0" class="no-en">\n      No se encontraron resultados\n    </div>\n  </div>\n\n  <div *ngIf="dataFilter.nombre.length<=0">\n    <div style="margin-top: 8px"></div>\n\n    <div class="scrolling-wrapper-flexbox" style="margin-top:0px">\n      <div class="promociones" [style.background-image]="\'url(\'+env.getImagenIndividual+promo.adjuntoId+\')\'" *ngFor="let promo of promociones">\n        <div class="contenedor-imagen">\n          <!-- <img src="assets/imgs/home/images.jpeg" alt=""> -->\n        </div>\n        <div class="info">\n          <p class="titulo">{{promo.titulo}}</p>\n          <p class="subtitulo">{{promo.descripcion}}</p>\n        </div>\n      </div>\n    </div>\n\n    <div class="scrolling-wrapper" style="margin-top: 15px">\n      <div class="buttons">\n        <button [ngStyle]="{\'background-color\': color}" (click)="ordena(1)">\n          <img src="assets/imgs/home/milk.png" alt="">\n          Artículos\n        </button>\n      </div>\n      <div class="buttons">\n        <button [ngStyle]="{\'background-color\': color}" (click)="ordena(2)">\n          <img src="assets/imgs/home/services.png" alt="">\n          Servicios\n        </button>\n      </div>\n\n    </div>\n\n    <div class="card-super" *ngIf="productosCategorias.length > 0">\n      <div class="cont">\n        <div class="principal" (click)="irToCategoria(productosCategorias[0])">\n          <img src="{{env.getImagenIndividual}}{{productosCategorias[0].categoria.adjuntoId}}" alt="">\n          <div class="seccion-principal" [ngStyle]="{\'color\': color}">{{productosCategorias[0].categoria.nombre}}</div>\n        </div>\n\n        <div class="borde-b"></div>\n\n        <div class="contenedor-tres">\n          <div class="contenedor-int" (click)="irToCategoria(cat)" *ngFor="let cat of productosCategoriasSub">\n            <img src="{{env.getImagenIndividual}}{{cat.categoria.adjuntoId}}" alt="">\n            <div class="seccion-sub-principal" [ngStyle]="{\'color\': color}">{{cat.categoria.nombre}}</div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/home/home.html"*/
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

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltroProductoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
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

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarritoComprasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__detalle_producto_detalle_producto__ = __webpack_require__(51);
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
    function CarritoComprasPage(navCtrl, navParams, localStorageEncryptService, events, 
        //private productoService: ProductoService,
        genericService, alertCtrl, alertaService, loadingService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.genericService = genericService;
        this.alertCtrl = alertCtrl;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.user = null;
        this.productosCarrito = [];
        this.env = __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */];
        this.stripe = Stripe('pk_test_TNjRZggfGMHinhrlBVIP1P1B00d8WURtiI');
        this.cards = null;
        this.dataCard = {
            tarj: "",
            cvc: "",
            dtime: ""
        };
        this.pagoActual = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        console.log(this.productosCarrito);
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
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].tarjetas).subscribe(function (response) {
            console.log(response);
            //quitar
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
        console.log(this.cards);
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
            console.log(this.cards[position]);
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
        //this.stripe.createSource(this.card);
        //console.log(a);
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
                        clase.loadingService.hide();
                        var token = response.id;
                        console.log(token);
                        console.log(response);
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
        var service = this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].carritoCompras, body);
        if (producto.cantidad > 1) {
            body.cantidad = producto.cantidad;
            service = this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].carritoCompras, body);
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
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.productoProveedor.id).subscribe(function (response) {
                console.log(response);
                //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
                //let nav = this.app.getRootNav();
                //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
                if (_this.user) {
                    var carritos = _this.localStorageEncryptService.getFromLocalStorage("" + _this.user.id_token);
                    console.log(carritos);
                    if (carritos) {
                        var position = carritos.findIndex(function (carrito) {
                            return carrito.id == response.id;
                        });
                        if (position >= 0) {
                            response.cantidad = carritos[position].cantidad;
                        }
                    }
                }
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
        console.log(body);
        this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].carritoCompras, body).subscribe(function (response1) {
            console.log(response1);
            if (producto.cantidad == 0) {
                _this.genericService.sendDelete(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].carritoCompras + "/" + producto.id).subscribe(function (response2) {
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
        console.log(producto);
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
        console.log(producto);
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
    CarritoComprasPage.prototype.precompra = function () {
        var _this = this;
        var body = {
            productos: []
        };
        this.productosCarrito.forEach(function (item) {
            body.productos.push({
                cantidad: item.cantidad,
                productoProveedorId: item.productoProveedorId
            });
        });
        var service = this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].pedidos, body);
        this.loadingService.show().then(function () {
            service.subscribe(function (response) {
                console.log(response);
                _this.pagoActual = response;
                _this.loadingService.hide();
                _this.comprar();
            }, function (error) {
                console.log(error);
                _this.loadingService.hide();
                _this.alertaService.errorAlertGeneric("Ocurrió un error al procesar tu pago, intenta nuevamente");
            });
        });
    };
    CarritoComprasPage.prototype.comprar = function () {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
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
                    console.log(data.nombre);
                    var body = {
                        nombre: data.nombre
                    };
                    var service = _this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].carritoHistorico, body);
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
    CarritoComprasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-carrito-compras',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/carrito-compras/carrito-compras.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>Mi carrito</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<div id="myModal" class="modal animated lightSpeedIn">\n\n  <div class="modal-content">\n\n    <div class="tacha" (click)="cerrar()" [ngStyle]="{\'color\': genericService.getColorHex()}">\n      <ion-icon ios="md-close" md="md-close"></ion-icon>\n    </div>\n    <div class="selecciona" [ngStyle]="{\'color\': genericService.getColorHex()}">Selecciona tu tarjeta</div>\n    <ion-list>\n      <ion-item class="item-list-card" *ngFor="let card of cards" [ngClass]="{\'seleccionado\':card.selected}" (click)="seleccionar(card)">\n        <ion-avatar slot="start">\n          <img src="assets/imgs/tarjetas/bank.png" alt="">\n        </ion-avatar>\n        <div class="datos-tarjetas">\n          <div class="name">{{card.alias}}</div>\n          <div class="number">{{card.numeroTarjeta}}</div>\n        </div>\n\n      </ion-item>\n    </ion-list>\n    <div class="ingresa" [ngStyle]="{\'color\': genericService.getColorHex()}">Ó ingresa una para hacer el pago</div>\n\n\n\n    <div class="form-row">\n      <input type="number" placeholder="N. Tarjeta" id="tarj" [(ngModel)]="dataCard.tarj">\n\n      <ion-datetime class="dt" text-left pickerFormat="MM/YY" cancelText="Cancelar" doneText="Aceptar" #fechaNac\n        placeholder="04/24" min="2016" max="2050" id="dtime" [(ngModel)]="dataCard.dtime"></ion-datetime>\n\n      <input type="number" placeholder="CVC" id="cvc" [(ngModel)]="dataCard.cvc">\n\n\n\n\n    </div>\n    <button ion-button block large style="padding: 10px;\n        height: auto;\n        contain: none;\n        margin-top: 15px;font-size: 14px;"\n      [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="setupStripe()">Pagar</button>\n  </div>\n</div>\n\n<ion-content padding>\n  <div>\n    <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of productosCarrito; let i = index">\n      <!-- <div class="tacha">\n                <div class="mini-tacha">\n                    <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                    <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                </div>\n              </div> -->\n      <div class="container-card" (click)="viewDetail(p)">\n\n        <img src="{{env.getImagenIndividual}}{{p.productoProveedor.producto.adjuntoId}}" />\n      </div>\n      <div class="container-text" (click)="viewDetail(p)">{{p.productoProveedor.producto.nombre}}</div>\n      <div class="description" (click)="viewDetail(p)">{{p.productoProveedor.producto.descripcion}}</div>\n      <div class="precio" (click)="viewDetail(p)">{{p.precio | currency}}</div>\n\n      <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n        <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">-</div>\n        </div>\n        <div class="cantidad" *ngIf="p.cantidad > 0">\n          <div [ngStyle]="{\'color\': genericService.getColorHex()}">{{p.cantidad}}</div>\n        </div>\n        <div class="mas" (click)="incrementa(p)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">+</div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n\n</ion-content>\n<ion-footer class="footer-button-class">\n  <button (tap)="addToList()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Agregar a una lista</button>\n  <button (tap)="precompra()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Comprar</button>\n</ion-footer>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/carrito-compras/carrito-compras.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__["a" /* AlertaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__["a" /* AlertaService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__services_loading_service__["a" /* LoadingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_loading_service__["a" /* LoadingService */]) === "function" && _h || Object])
    ], CarritoComprasPage);
    return CarritoComprasPage;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=carrito-compras.js.map

/***/ }),

/***/ 429:
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

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpcionesMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lista_carrito_compras_lista_carrito_compras__ = __webpack_require__(159);
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
        console.log('ionViewDidLoad OpcionesMenuPage');
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
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
        }
        catch (error) {
            console.log(error);
        }
    };
    OpcionesMenuPage.prototype.openListCarrito = function () {
        var nav = this.app.getRootNav();
        this.viewCtrl.dismiss();
        nav.push(__WEBPACK_IMPORTED_MODULE_5__lista_carrito_compras_lista_carrito_compras__["a" /* ListaCarritoComprasPage */]);
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
            default:
                this.localStorageEncryptService.setToLocalStorage("theme", "#3b64c0");
                break;
        }
        this.events.publish("changeColor");
    };
    OpcionesMenuPage.prototype.login = function () {
        this.viewCtrl.dismiss();
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    OpcionesMenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-opciones-menu',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/opciones-menu/opciones-menu.html"*/'<div>\n  <ion-list>\n    <ion-list-header style="margin: 0px;">General</ion-list-header>\n\n    <div style="padding: 10px;text-align: center;">Elige un tema</div>\n    <ion-row class="rowi">\n      <ion-col col-3 class="tema-1">\n        <button (click)="change(1)"></button>\n      </ion-col>\n      <ion-col col-3 class="tema-2">\n        <button (click)="change(2)"></button>\n      </ion-col>\n      <ion-col col-3 class="tema-3">\n        <button (click)="change(3)"></button>\n      </ion-col>\n      <ion-col col-3 class="tema-4">\n        <button (click)="change(4)"></button>\n      </ion-col>\n    </ion-row>\n\n    <button ion-item (click)="openListCarrito()" *ngIf="user">\n      <ion-icon name="ios-cart-outline" style="font-size: 2.4rem;"></ion-icon>\n      Listas de carrito\n    </button>\n\n    <button ion-item (click)="logout()" *ngIf="user">\n      <ion-icon name="ios-log-out-outline" style="font-size: 2.4rem;"></ion-icon>\n      Cerrar sesión\n    </button>\n\n    <button ion-item (click)="login()" *ngIf="!user">\n      <ion-icon name="ios-log-out-outline" style="font-size: 2.4rem;"></ion-icon>\n      Iniciar sesión\n    </button>\n  </ion-list>\n</div>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/opciones-menu/opciones-menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__services_generic_service__["a" /* GenericService */]])
    ], OpcionesMenuPage);
    return OpcionesMenuPage;
}());

//# sourceMappingURL=opciones-menu.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TarjetasFrecuentesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__detalle_tarjeta_detalle_tarjeta__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(23);
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
            console.log(data);
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
            console.log(response);
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
        console.log(position);
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

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetalleTarjetaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_validation_service__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__ = __webpack_require__(23);
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
            console.log(item);
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
                console.log(item.tag);
                item.value = _this.card[item.tag];
                tmp[0] = _this.card[item.tag];
                _this.btnHabilitado = true;
            }
            putObj[item.formName] = tmp;
        });
        console.log(putObj);
        this.formGroup = this.formBuilder.group(putObj);
        console.log("--------");
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
        console.log(this.formGroup.controls);
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
                console.log("-.-.-.-.-.-.-.-.-.--.-..-.-.-.-");
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

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DireccionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_geo_proveedores_home_geo_proveedores__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(23);
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
    function DireccionesPage(navCtrl, navParams, genericService, alertaService, loadingService, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.events = events;
        this.listaDirecciones = [];
        this.render = false;
        this.cargarDireccionesLista();
        this.events.subscribe('direction', function (data) {
            console.log(data);
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
        console.log('ionViewDidLoad DireccionesPage');
    };
    DireccionesPage.prototype.cargarDireccionesLista = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].direcciones).subscribe(function (response) {
            console.log(response);
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
    DireccionesPage.prototype.nuevaLista = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__home_geo_proveedores_home_geo_proveedores__["a" /* HomeGeoProveedoresPage */]);
    };
    DireccionesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-direcciones',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/direcciones/direcciones.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>Mis direcciones</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="spinner-carrito" *ngIf="!render">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <ion-list>\n    <ion-item-sliding #item *ngFor="let card of listaDirecciones">\n      <ion-item class="item-list-card" (click)="view(card)">\n        <ion-avatar slot="start">\n          <img src="assets/imgs/direcciones/maps-and-flags.png" alt="">\n        </ion-avatar>\n        <div class="datos-tarjetas">\n          <div class="name">{{card.alias}}</div>\n          <div class="number">{{card.direccion.direccion}}</div>\n        </div>\n      </ion-item>\n\n      <ion-item-options side="right">\n        <button ion-button (click)="borrar(card)" color="danger">\n          <ion-icon name="ios-trash-outline"></ion-icon>\n          Borrar\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>\n<ion-fab bottom right class="fab-cards animated swing">\n  <button ion-fab (click)="nuevaLista()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <ion-icon name="add"></ion-icon>\n  </button>\n</ion-fab>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/direcciones/direcciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */]])
    ], DireccionesPage);
    return DireccionesPage;
}());

//# sourceMappingURL=direcciones.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeGeoProveedoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_leaflet__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_open_native_settings__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_diagnostic__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_android_permissions__ = __webpack_require__(155);
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
    function HomeGeoProveedoresPage(navCtrl, navParams, geolocation, genericService, loadingService, alertaService, alertCtrl, diagnostic, openNativeSettings, androidPermissions, platform, events) {
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
        this.direccion = navParams.get("direccion");
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
    }
    HomeGeoProveedoresPage.prototype.cargarTipoDirecciones = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].tipoDirecciones).subscribe(function (response) {
            _this.tipoDirecciones = response;
            console.log(_this.tipoDirecciones);
        }, function (error) {
            console.log(error);
        });
    };
    HomeGeoProveedoresPage.prototype.ionViewDidLoad = function () {
        var claseTabs = document.getElementsByClassName("tabbar");
        claseTabs[0].style.display = "none";
        this.obtenerLocalizacion();
        var as = document.getElementById('autocomplete');
        console.log(as);
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
        claseTabs[0].style.display = "flex";
    };
    HomeGeoProveedoresPage.prototype.getPosition = function () {
        var _this = this;
        this.geolocation.getCurrentPosition()
            .then(function (response) {
            _this.loadMap(response);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    HomeGeoProveedoresPage.prototype.loadMap = function (position) {
        var _this = this;
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log(latitude, longitude);
        // create a new map by passing HTMLElement
        var mapEle = document.getElementById('map_canvas');
        // create LatLng object
        if (this.edit) {
            console.log("editable");
            latitude = Number(this.direccion.direccion.latitud);
            longitude = Number(this.direccion.direccion.longitud);
        }
        console.log(latitude, longitude);
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
            component.marker.addListener('click', function () {
                //infowindow.open(this.map, this.marker);
                //component.changeInfoCard();
            });
            google.maps.event.addListener(component.marker, 'dragend', function (evt) {
                console.log(evt.latLng.lat());
                console.log(evt.latLng.lng());
                component.data.latitud = evt.latLng.lat().toString();
                component.data.longitud = evt.latLng.lng().toString();
                component.loadingService.show().then(function () {
                    var params = new __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["d" /* HttpParams */]();
                    params = params.set('latlng', component.data.latitud + "," + component.data.longitud);
                    params = params.set('key', __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].keyGoogle);
                    console.log(params);
                    component.genericService.sendGetParams("" + __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].geocodeGoogle, params).subscribe(function (response) {
                        console.log(response);
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
              console.log("---->");
              
            }); */
            mapEle.classList.add('show-map');
        });
    };
    HomeGeoProveedoresPage.prototype.changeInfoCard = function () {
        console.log("Hola mundo 1");
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
                console.log(position);
                console.log(geolocation);
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
    HomeGeoProveedoresPage.prototype.guardar = function (body) {
        var _this = this;
        if (!this.edit) {
            this.loadingService.show().then(function () {
                _this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].direcciones, body).subscribe(function (response) {
                    _this.alertaService.successAlertGeneric("Dirección agregada con éxito");
                    _this.loadingService.hide();
                    _this.events.publish("direction", { body: body, create: true });
                    _this.navCtrl.pop();
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
        console.log(componente.marker);
        componente.marker.setMap(componente.map);
        console.log(componente.marker);
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
                console.log(addressType);
                if (componente.componentForm[addressType]) {
                    var val = place.address_components[i][componente.componentForm[addressType]];
                    console.log(val);
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
        console.log(componente.getData());
    };
    HomeGeoProveedoresPage.prototype.addToList = function () {
        var _this = this;
        var buttons = [
            {
                text: "Agregar",
                handler: function (data) {
                    var input = document.getElementById("input-name");
                    var selectDireccion = document.getElementById("select-direccion");
                    console.log(input.value);
                    console.log(selectDireccion.value);
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
                        console.log(body);
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
            selector: 'page-home-geo-proveedores',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/home-geo-proveedores/home-geo-proveedores.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>\n      {{!direccion ? \'Alta de dirección\' : \'Actualizar de dirección\'}}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <div class="spinner-carrito" *ngIf="!muestraMapa">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <div id="locationField" class="buscador" >\n    <input id="autocomplete" placeholder="Buscar" (ionFocus)="geolocate()" type="text" />\n\n    <div>\n      <img src="assets/imgs/direcciones/home-run.png" alt="">\n    </div>\n  </div>\n\n  <div id="map_canvas" class="mapita-google"></div>\n\n  <div id="map" style="height: 50%;" *ngIf="1==2"></div>\n\n  <div class="card-proveedor">\n\n  </div>\n</ion-content>\n\n<ion-footer class="footer-button-class" *ngIf="muestraMapa">\n  <button style="width:100%" (tap)="addToList()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">{{!direccion ? \'Agregar\' : \'Actualizar\'}} dirección</button>\n</ion-footer>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/home-geo-proveedores/home-geo-proveedores.html"*/,
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
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]])
    ], HomeGeoProveedoresPage);
    return HomeGeoProveedoresPage;
}());

//# sourceMappingURL=home-geo-proveedores.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AltaDireccionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
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
        console.log('ionViewDidLoad AltaDireccionesPage');
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

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(443);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 443:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_mapa_proveedores_mapa_proveedores__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_categoria_categoria__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(625);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_about_about__ = __webpack_require__(630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_contact_contact__ = __webpack_require__(631);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_tabs_tabs__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ngx_translate_http_loader__ = __webpack_require__(632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_module__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_login_login__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_registro_registro__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_control_messages_control_messages_component__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_gallery_gallery_component__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_recuperar_password_recuperar_password__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_filtro_producto_filtro_producto__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_detalle_producto_detalle_producto__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_carrito_compras_carrito_compras__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_alta_direcciones_alta_direcciones__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__directives_scroll_hide_directive__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_lista_carrito_compras_lista_carrito_compras__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_tarjetas_frecuentes_tarjetas_frecuentes__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_detalle_tarjeta_detalle_tarjeta__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_opciones_menu_opciones_menu__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_home_geo_proveedores_home_geo_proveedores__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_chat_chat__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_articulo_productos_articulo_productos__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_carrito_historico_carrito_historico__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_direcciones_direcciones__ = __webpack_require__(433);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



































function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_13__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_registro_registro__["a" /* RegistroPage */],
                __WEBPACK_IMPORTED_MODULE_18__components_control_messages_control_messages_component__["a" /* ControlMessagesComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_gallery_gallery_component__["a" /* GalleryComponent */],
                __WEBPACK_IMPORTED_MODULE_20__pages_recuperar_password_recuperar_password__["a" /* RecuperarPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_filtro_producto_filtro_producto__["a" /* FiltroProductoPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_detalle_producto_detalle_producto__["a" /* DetalleProductoPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_carrito_compras_carrito_compras__["a" /* CarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_alta_direcciones_alta_direcciones__["a" /* AltaDireccionesPage */],
                __WEBPACK_IMPORTED_MODULE_25__directives_scroll_hide_directive__["a" /* ScrollHideDirective */],
                __WEBPACK_IMPORTED_MODULE_26__pages_lista_carrito_compras_lista_carrito_compras__["a" /* ListaCarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_tarjetas_frecuentes_tarjetas_frecuentes__["a" /* TarjetasFrecuentesPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_detalle_tarjeta_detalle_tarjeta__["a" /* DetalleTarjetaPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_opciones_menu_opciones_menu__["a" /* OpcionesMenuPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_home_geo_proveedores_home_geo_proveedores__["a" /* HomeGeoProveedoresPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_categoria_categoria__["a" /* CategoriaPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_articulo_productos_articulo_productos__["a" /* ArticuloProductosPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_carrito_historico_carrito_historico__["a" /* CarritoHistoricoPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_direcciones_direcciones__["a" /* DireccionesPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_mapa_proveedores_mapa_proveedores__["a" /* MapaProveedoresPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: 'pages/alta-direcciones/alta-direcciones.module#AltaDireccionesPageModule', name: 'AltaDireccionesPage', segment: 'alta-direcciones', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_15__providers_module__["a" /* ProvidersModule */],
                __WEBPACK_IMPORTED_MODULE_14__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (createTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_14__angular_common_http__["b" /* HttpClient */]]
                    }
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_registro_registro__["a" /* RegistroPage */],
                __WEBPACK_IMPORTED_MODULE_18__components_control_messages_control_messages_component__["a" /* ControlMessagesComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_gallery_gallery_component__["a" /* GalleryComponent */],
                __WEBPACK_IMPORTED_MODULE_20__pages_recuperar_password_recuperar_password__["a" /* RecuperarPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_filtro_producto_filtro_producto__["a" /* FiltroProductoPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_detalle_producto_detalle_producto__["a" /* DetalleProductoPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_carrito_compras_carrito_compras__["a" /* CarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_alta_direcciones_alta_direcciones__["a" /* AltaDireccionesPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_lista_carrito_compras_lista_carrito_compras__["a" /* ListaCarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_tarjetas_frecuentes_tarjetas_frecuentes__["a" /* TarjetasFrecuentesPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_detalle_tarjeta_detalle_tarjeta__["a" /* DetalleTarjetaPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_opciones_menu_opciones_menu__["a" /* OpcionesMenuPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_home_geo_proveedores_home_geo_proveedores__["a" /* HomeGeoProveedoresPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_categoria_categoria__["a" /* CategoriaPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_articulo_productos_articulo_productos__["a" /* ArticuloProductosPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_carrito_historico_carrito_historico__["a" /* CarritoHistoricoPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_direcciones_direcciones__["a" /* DireccionesPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_mapa_proveedores_mapa_proveedores__["a" /* MapaProveedoresPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetalleProductoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_photoswipe__ = __webpack_require__(621);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_photoswipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_photoswipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_photoswipe_dist_photoswipe_ui_default__ = __webpack_require__(622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_photoswipe_dist_photoswipe_ui_default___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_photoswipe_dist_photoswipe_ui_default__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_auth_service__ = __webpack_require__(157);
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
        console.log(this.producto);
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
        console.log(carritos);
        var position = carritos.findIndex(function (carrito) {
            return carrito.id == _this.producto.id;
        });
        if (position >= 0) {
            this.producto.cantidad = carritos[position].cantidad;
        }
    };
    /**Métodos de navegacion del slide */
    DetalleProductoPage.prototype.next1 = function () {
        console.log("next");
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
                console.log(_this.productosTemp);
            };
        });
    };
    DetalleProductoPage.prototype.regresar = function () {
        var id = document.getElementById("icn-p");
        id.style.display = "none";
        this.navCtrl.pop();
    };
    DetalleProductoPage.prototype.imagesLoaded = function (i) {
        console.log(i);
        var pswpElement = document.querySelectorAll('.pswp')[0];
        console.log(this.productosTemp);
        this.productosTemp.sort(function (a, b) { return (a.i > b.i) ? 1 : -1; });
        console.log(this.productosTemp);
        // build items array
        var items = [];
        this.productosTemp.forEach(function (photo) {
            //console.log(photo);
            items.push({ src: photo.img, w: photo.w, h: photo.h });
        });
        console.log(items);
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
            console.log(response1);
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
                        console.log(error);
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

/***/ 624:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 295,
	"./af.js": 295,
	"./ar": 296,
	"./ar-dz": 297,
	"./ar-dz.js": 297,
	"./ar-kw": 298,
	"./ar-kw.js": 298,
	"./ar-ly": 299,
	"./ar-ly.js": 299,
	"./ar-ma": 300,
	"./ar-ma.js": 300,
	"./ar-sa": 301,
	"./ar-sa.js": 301,
	"./ar-tn": 302,
	"./ar-tn.js": 302,
	"./ar.js": 296,
	"./az": 303,
	"./az.js": 303,
	"./be": 304,
	"./be.js": 304,
	"./bg": 305,
	"./bg.js": 305,
	"./bm": 306,
	"./bm.js": 306,
	"./bn": 307,
	"./bn.js": 307,
	"./bo": 308,
	"./bo.js": 308,
	"./br": 309,
	"./br.js": 309,
	"./bs": 310,
	"./bs.js": 310,
	"./ca": 311,
	"./ca.js": 311,
	"./cs": 312,
	"./cs.js": 312,
	"./cv": 313,
	"./cv.js": 313,
	"./cy": 314,
	"./cy.js": 314,
	"./da": 315,
	"./da.js": 315,
	"./de": 316,
	"./de-at": 317,
	"./de-at.js": 317,
	"./de-ch": 318,
	"./de-ch.js": 318,
	"./de.js": 316,
	"./dv": 319,
	"./dv.js": 319,
	"./el": 320,
	"./el.js": 320,
	"./en-SG": 321,
	"./en-SG.js": 321,
	"./en-au": 322,
	"./en-au.js": 322,
	"./en-ca": 323,
	"./en-ca.js": 323,
	"./en-gb": 324,
	"./en-gb.js": 324,
	"./en-ie": 325,
	"./en-ie.js": 325,
	"./en-il": 326,
	"./en-il.js": 326,
	"./en-nz": 327,
	"./en-nz.js": 327,
	"./eo": 328,
	"./eo.js": 328,
	"./es": 329,
	"./es-do": 330,
	"./es-do.js": 330,
	"./es-us": 331,
	"./es-us.js": 331,
	"./es.js": 329,
	"./et": 332,
	"./et.js": 332,
	"./eu": 333,
	"./eu.js": 333,
	"./fa": 334,
	"./fa.js": 334,
	"./fi": 335,
	"./fi.js": 335,
	"./fo": 336,
	"./fo.js": 336,
	"./fr": 337,
	"./fr-ca": 338,
	"./fr-ca.js": 338,
	"./fr-ch": 339,
	"./fr-ch.js": 339,
	"./fr.js": 337,
	"./fy": 340,
	"./fy.js": 340,
	"./ga": 341,
	"./ga.js": 341,
	"./gd": 342,
	"./gd.js": 342,
	"./gl": 343,
	"./gl.js": 343,
	"./gom-latn": 344,
	"./gom-latn.js": 344,
	"./gu": 345,
	"./gu.js": 345,
	"./he": 346,
	"./he.js": 346,
	"./hi": 347,
	"./hi.js": 347,
	"./hr": 348,
	"./hr.js": 348,
	"./hu": 349,
	"./hu.js": 349,
	"./hy-am": 350,
	"./hy-am.js": 350,
	"./id": 351,
	"./id.js": 351,
	"./is": 352,
	"./is.js": 352,
	"./it": 353,
	"./it-ch": 354,
	"./it-ch.js": 354,
	"./it.js": 353,
	"./ja": 355,
	"./ja.js": 355,
	"./jv": 356,
	"./jv.js": 356,
	"./ka": 357,
	"./ka.js": 357,
	"./kk": 358,
	"./kk.js": 358,
	"./km": 359,
	"./km.js": 359,
	"./kn": 360,
	"./kn.js": 360,
	"./ko": 361,
	"./ko.js": 361,
	"./ku": 362,
	"./ku.js": 362,
	"./ky": 363,
	"./ky.js": 363,
	"./lb": 364,
	"./lb.js": 364,
	"./lo": 365,
	"./lo.js": 365,
	"./lt": 366,
	"./lt.js": 366,
	"./lv": 367,
	"./lv.js": 367,
	"./me": 368,
	"./me.js": 368,
	"./mi": 369,
	"./mi.js": 369,
	"./mk": 370,
	"./mk.js": 370,
	"./ml": 371,
	"./ml.js": 371,
	"./mn": 372,
	"./mn.js": 372,
	"./mr": 373,
	"./mr.js": 373,
	"./ms": 374,
	"./ms-my": 375,
	"./ms-my.js": 375,
	"./ms.js": 374,
	"./mt": 376,
	"./mt.js": 376,
	"./my": 377,
	"./my.js": 377,
	"./nb": 378,
	"./nb.js": 378,
	"./ne": 379,
	"./ne.js": 379,
	"./nl": 380,
	"./nl-be": 381,
	"./nl-be.js": 381,
	"./nl.js": 380,
	"./nn": 382,
	"./nn.js": 382,
	"./pa-in": 383,
	"./pa-in.js": 383,
	"./pl": 384,
	"./pl.js": 384,
	"./pt": 385,
	"./pt-br": 386,
	"./pt-br.js": 386,
	"./pt.js": 385,
	"./ro": 387,
	"./ro.js": 387,
	"./ru": 388,
	"./ru.js": 388,
	"./sd": 389,
	"./sd.js": 389,
	"./se": 390,
	"./se.js": 390,
	"./si": 391,
	"./si.js": 391,
	"./sk": 392,
	"./sk.js": 392,
	"./sl": 393,
	"./sl.js": 393,
	"./sq": 394,
	"./sq.js": 394,
	"./sr": 395,
	"./sr-cyrl": 396,
	"./sr-cyrl.js": 396,
	"./sr.js": 395,
	"./ss": 397,
	"./ss.js": 397,
	"./sv": 398,
	"./sv.js": 398,
	"./sw": 399,
	"./sw.js": 399,
	"./ta": 400,
	"./ta.js": 400,
	"./te": 401,
	"./te.js": 401,
	"./tet": 402,
	"./tet.js": 402,
	"./tg": 403,
	"./tg.js": 403,
	"./th": 404,
	"./th.js": 404,
	"./tl-ph": 405,
	"./tl-ph.js": 405,
	"./tlh": 406,
	"./tlh.js": 406,
	"./tr": 407,
	"./tr.js": 407,
	"./tzl": 408,
	"./tzl.js": 408,
	"./tzm": 409,
	"./tzm-latn": 410,
	"./tzm-latn.js": 410,
	"./tzm.js": 409,
	"./ug-cn": 411,
	"./ug-cn.js": 411,
	"./uk": 412,
	"./uk.js": 412,
	"./ur": 413,
	"./ur.js": 413,
	"./uz": 414,
	"./uz-latn": 415,
	"./uz-latn.js": 415,
	"./uz.js": 414,
	"./vi": 416,
	"./vi.js": 416,
	"./x-pseudo": 417,
	"./x-pseudo.js": 417,
	"./yo": 418,
	"./yo.js": 418,
	"./zh-cn": 419,
	"./zh-cn.js": 419,
	"./zh-hk": 420,
	"./zh-hk.js": 420,
	"./zh-tw": 421,
	"./zh-tw.js": 421
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
webpackContext.id = 624;

/***/ }),

/***/ 625:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_lista_carrito_compras_lista_carrito_compras__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__models_Menu__ = __webpack_require__(629);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_direcciones_direcciones__ = __webpack_require__(433);
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
    function MyApp(platform, statusBar, splashScreen, translateService, localStorageEncryptService, events, app, alertaService, alertCtrl, genericService) {
        var _this = this;
        this.platform = platform;
        this.translateService = translateService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.app = app;
        this.alertaService = alertaService;
        this.alertCtrl = alertCtrl;
        this.genericService = genericService;
        this.rootPage = null;
        this.pages = [];
        this.user = null;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            _this.initializeLanguage();
            /**Armar menu */
            _this.pages.push(new __WEBPACK_IMPORTED_MODULE_11__models_Menu__["a" /* Menu */]("Lista de carrito frecuentes", "assets/imgs/lista-carrito/trolley.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_1__pages_lista_carrito_compras_lista_carrito_compras__["a" /* ListaCarritoComprasPage */]));
            _this.pages.push(new __WEBPACK_IMPORTED_MODULE_11__models_Menu__["a" /* Menu */]("Drecciones frecuentes", "assets/imgs/direcciones/markerD.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_12__pages_direcciones_direcciones__["a" /* DireccionesPage */]));
            /** */
            _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            if (_this.user) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */];
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
    }
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
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */]);
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
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */]);
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
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/app.html"*/'<ion-menu [content]="content" *ngIf="user">\n  <ion-header>\n    <ion-item class="item item-thumbnail-left" style="\n                  background-image: url(assets/imgs/menu/market.jpg);\n                  background-size: 100%;\n                  background-position: center center;">\n      <img src="assets/imgs/logo.png" alt="Fry" class="animated myImagen" style="top: 16px !important;left: 16px !important;height: 65px !important;border-radius: 0px !important;width: 67px !important;opacity: -1.6;">\n      <div class="menu-bottom" style="color: #ffffff;\n        font-size: x-large;\n        text-shadow: 1px 1px 2px #000000;\n        font-weight: 700;\n        font-family: sans-serif;">\n        Menu\n      </div>\n    </ion-item>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n\n      <div *ngFor="let p of pages">\n        <ion-item menuClose class="item item-icon-right" (click)="openPage(p)" style="border-top: 1px solid #ddd;box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.07);">\n          <img src="{{p.img}}" alt="logo" style="    /* height: 35%; */\n              width: 11%;\n              /* margin-top: 1px; */\n              position: absolute;" />\n          <h2 style="display: inline-block;\n            margin-left: 44px;\n            margin-top: 8px;\n            font-size: 17px;\n            font-weight: 600;\n            font-family: sans-serif;">{{\n            p.nombre }}</h2>\n        </ion-item>\n      </div>\n    </ion-list>\n  </ion-content>\n  <ion-footer>\n    <ion-toolbar>\n      <div>\n        <button ion-button outline style="width: 48%;" (click)="exitApp()"\n        [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n          <ion-icon name="close-circle" class="botonFooter"></ion-icon>\n          Salir\n        </button>\n      </div>\n    </ion-toolbar>\n  </ion-footer>\n\n</ion-menu>\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false">\n\n</ion-nav>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_10__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__services_generic_service__["a" /* GenericService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 626:
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

/***/ 627:
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

/***/ 628:
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

/***/ 629:
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

/***/ 630:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
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

/***/ 631:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
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

/***/ 634:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProvidersModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_validation_service__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_action_sheet__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__interceptors_request_interceptor_service__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_auth_service__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_producto_service__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_string_utils_service__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_google_maps__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_fcm__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_stripe__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_open_native_settings__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_diagnostic__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_android_permissions__ = __webpack_require__(155);
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
            ]
        })
    ], ProvidersModule);
    return ProvidersModule;
}());

//# sourceMappingURL=providers.module.js.map

/***/ }),

/***/ 635:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestInterceptorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw__ = __webpack_require__(636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(8);
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
        //console.log("---------------------------------");
        console.log(request);
        var chequeo = this.auth.getToken();
        var headers = {
            'Content-Type': 'application/json'
        };
        if (chequeo && request.url != "https://maps.googleapis.com/maps/api/geocode/json") {
            headers.Authorization = "Bearer " + this.auth.getToken();
        }
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

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlMessagesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_validation_service__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(27);
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

/***/ 644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_local_storage_encrypt_service__ = __webpack_require__(17);
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

/***/ 645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecuperarPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RecuperarPasswordPage = /** @class */ (function () {
    function RecuperarPasswordPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    RecuperarPasswordPage.prototype.ionViewDidLoad = function () {
    };
    RecuperarPasswordPage.prototype.regresar = function () {
        var id = document.getElementById("icn-2");
        id.style.display = "none";
        this.navCtrl.pop();
    };
    RecuperarPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recuperar-password',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/recuperar-password/recuperar-password.html"*/'<ion-icon id="icn-2" name="ios-arrow-back" class="arrow-generada" (click)="regresar()"></ion-icon>\n<ion-content>\n\n</ion-content>\n'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/recuperar-password/recuperar-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], RecuperarPasswordPage);
    return RecuperarPasswordPage;
}());

//# sourceMappingURL=recuperar-password.js.map

/***/ }),

/***/ 646:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollHideDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(8);
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
                //console.log(element2);
                if (element2.id) {
                    if (element2.id == this.config.property) {
                        posicion = index;
                    }
                }
            }
        }
        this.a = this.a[posicion];
        //console.log(this.a);
        if (this.scrollContent && this.config) {
            this.lastValueMax = this.config.maxValue;
            //console.log(this.lastValueMax);
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
                    //console.log(error);
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
                //console.log(scrolldiff2);
                //console.log("--------------");
                //console.log(scrolldiff);
                //console.log("..............");
                _this.lastScrollPosition = scrollTop;
                //console.log("ScrollPosition: "+this.lastScrollPosition);
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

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__registro_registro__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_generic_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__ = __webpack_require__(17);
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
        //console.log("fghjk");
        //this.loadingService.show();
    };
    LoginPage.prototype.regresar = function () {
        console.log("dfgh");
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
                console.log(response);
                //quitar
                _this.loadingService.hide();
                _this.localStorageEncryptService.setToLocalStorage("userSession", response);
                console.log(_this.localStorageEncryptService.getFromLocalStorage("userSession"));
                //let nav:any = this.app.getRootNav();
                //nav.push(TabsPage);
                _this.events.publish("actualizarCantidad", {});
                _this.events.publish("actualizarTarjetas", {});
                _this.events.publish("totalCarrito");
                _this.events.publish("reloadUser");
                _this.navCtrl.pop();
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
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/login/login.html"*/'<!-- background-color: #258649; -->\n<ion-icon id="icn-5" name="ios-arrow-back" class="arrow-generada" (click)="regresar()" [ngStyle]="{\'color\': color}"></ion-icon>\n<ion-content class="max-contenedor" padding style="background-image: url(assets/imgs/login/loginFondo.png);">\n  <section class="container animated rubberBand">\n    <section class="flex">\n      <img src="assets/imgs/logo.png" alt="" class="animated fadeIn">\n\n      <section class="input-section">\n        <input [(ngModel)]="dataLogin.user" type="email" placeholder="{{\'EMAIL\' | translate}}">\n        <div class="interno">\n          <input [(ngModel)]="dataLogin.password" type="{{configuraciones.visible ? \'text\' : \'password\'}}" placeholder="{{\'PASSWORD\' | translate}}">\n          <section (touchstart)="visible()" (touchend)="visible()">\n            <ion-icon ios="ios-eye" md="ios-eye"></ion-icon>\n          </section>\n        </div>\n\n        <button (click)="login()">{{\'LOGIN\' | translate}}</button>\n      </section>\n      <section class="registrate">\n        <a (click)="goToRegister()">¿Aún no te has registrado?</a>\n      </section>\n    </section>\n  </section>\n</ion-content>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/login/login.html"*/,
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

/***/ 87:
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
        console.log(":::::::::");
        // RFC 2822 compliant regex
        if (control.value) {
            if (control._pendingValue.match(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g)) {
                console.log("->");
                return null;
            }
            else {
                console.log("<-");
                if (control._pendingValue.substring(0, control.value.length - 1).match(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g)) {
                    console.log("<-Aqui");
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

/***/ })

},[436]);
//# sourceMappingURL=main.js.map
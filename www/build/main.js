webpackJsonp([2],{

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contact_contact__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tarjetas_frecuentes_tarjetas_frecuentes__ = __webpack_require__(420);
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
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__tarjetas_frecuentes_tarjetas_frecuentes__["a" /* TarjetasFrecuentesPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__contact_contact__["a" /* ContactPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Mis tarjetas" tabIcon="card"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 150:
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
            'invalidCreditCard': 'Is invalid credit card number',
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
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        }
        else {
            return { 'invalidCreditCard': true };
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

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alerta_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__generic_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_detalle_producto_detalle_producto__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__local_storage_encrypt_service__ = __webpack_require__(34);
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
        this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
    }
    ProductoService.prototype.viewDetail = function (producto) {
        var _this = this;
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].productos + "/" + producto.id).subscribe(function (response) {
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

/***/ 168:
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
webpackEmptyAsyncContext.id = 168;

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"pages/alta-direcciones/alta-direcciones.module": [
		623,
		4
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
webpackAsyncContext.id = 211;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
            selector: 'page-about',template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
            selector: 'page-contact',template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-start></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filtro_producto_filtro_producto__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_loading_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_generic_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_action_sheet__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_Seccion__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__models_Proveedor__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__models_Categoria__ = __webpack_require__(608);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__carrito_compras_carrito_compras__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_local_storage_encrypt_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_producto_service__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_string_utils_service__ = __webpack_require__(417);
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
    function HomePage(navCtrl, modalController, loadingService, alertCtrl, genericService, alertaService, localStorageEncryptService, events, productoService, actionSheet, stringUtilsService, app) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalController = modalController;
        this.loadingService = loadingService;
        this.alertCtrl = alertCtrl;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.productoService = productoService;
        this.actionSheet = actionSheet;
        this.stringUtilsService = stringUtilsService;
        this.app = app;
        this.productos = [];
        this.categorias = [];
        this.proveedores = [];
        this.secciones = [];
        this.dataFilter = {
            idProveedor: null,
            idSeccion: null,
            idCategoria: null,
            nombre: null
        };
        this.objCombos = {
            secciones: this.secciones,
            proveedores: this.proveedores,
            categorias: this.categorias
        };
        this.env = __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */];
        this.user = null;
        /**Obtenci{on de usuario en sesión */
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.cargarProductos();
        this.cargarProveedores();
        this.cargarSecciones();
        this.cargarCategorias();
        this.events.subscribe('updateProductos', function (data) {
            console.log(data);
            if (data) {
                if (data.productoDelete) {
                    _this.productos.forEach(function (element) {
                        if (element.id == data.productoDelete.id) {
                            element.carrito = data.productoDelete.carrito;
                            element.cantidad = data.productoDelete.cantidad;
                        }
                    });
                }
            }
        });
    }
    HomePage.prototype.ngOnDestroy = function () {
        this.events.unsubscribe("updateProductos");
    };
    HomePage.prototype.verificarCarrito = function () {
        var _this = this;
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
        if (p.cantidad) {
            p.cantidad++;
        }
        else if (p.cantidad == 0) {
            p.cantidad = 1;
            this.agregarToCarrito(p);
        }
        else {
            p.cantidad = 1;
            this.agregarToCarrito(p);
        }
        this.verificarCarritoModificarCantidad(p);
    };
    HomePage.prototype.decrementar = function (p) {
        p.cantidad--;
        if (p.cantidad == 0) {
            this.productoService.deleteFavorito(p);
        }
        this.verificarCarritoModificarCantidad(p);
    };
    /**Método para cargar productos en base a especificaciones */
    HomePage.prototype.cargarProductos = function () {
        var _this = this;
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
        this.genericService.sendGetParams(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].productos + "/search", params).subscribe(function (response) {
            console.log(response);
            _this.productos = response;
            _this.loadingService.hide();
        }, function (error) {
            _this.loadingService.hide();
            var err = error.error;
            _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Confirmación",
            message: "¿Estás segur@ de cerrar sesión?",
            cssClass: "alerta-two-button",
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
    HomePage.prototype.confirmar = function () {
        try {
            localStorage.removeItem("userSession");
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
        }
        catch (error) {
            console.log(error);
        }
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
        if (this.productoService.getTotalCarrito() > 0) {
            var nav = this.app.getRootNav();
            //nav.pop();
            nav.push(__WEBPACK_IMPORTED_MODULE_13__carrito_compras_carrito_compras__["a" /* CarritoComprasPage */]);
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <!-- <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button> -->\n    <ion-title>Productos</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="verCarrito()" class="carrito">\n          <ion-badge *ngIf="productoService.getTotalCarrito() > 0">{{productoService.getTotalCarrito()}}</ion-badge>\n        <ion-icon name="ios-cart-outline" style="font-size: 2.4rem;"></ion-icon>\n        \n      </button>\n      <button ion-button icon-only (click)="logout()">\n        <ion-icon name="ios-log-out-outline" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<div class="filtro">\n  <button ion-button (click)="openFilters()">\n    <ion-icon ios="ios-options" md="ios-options"></ion-icon>\n  </button>\n</div>\n\n<ion-content padding>\n\n  <div style="margin-top: 48px"></div>\n\n  <div class="scrolling-wrapper" *ngIf="productos.length > 0">\n      <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of productos; let i = index">\n        <!-- <div class="tacha">\n          <div class="mini-tacha">\n              <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n              <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n          </div>\n        </div> -->\n        <div class="container-card">\n  \n          <img src="{{env.getImagenIndividual}}{{p.adjuntoId}}" />\n        </div>\n        <div class="container-text">{{p.nombre}}</div>\n        <div class="description">{{p.descripcion}}</div>\n        <div class="precio">{{p.precio | currency}}</div>\n\n        <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n          <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)"><div>-</div></div>\n          <div class="cantidad" *ngIf="p.cantidad > 0"><div>{{p.cantidad}}</div></div>\n          <div class="mas" (click)="incrementa(p)"><div>+</div></div>\n        </div>\n      </div>\n    </div>\n\n  <div *ngFor="let producto of productos" class="full-size animated fadeInUp">\n    <ion-card>\n      <div class="favorito">\n        <ion-icon ios="ios-cart-outline" md="ios-cart-outline" *ngIf="!producto.carrito" (click)="agregarToCarrito(producto)"></ion-icon>\n        <ion-icon ios="ios-cart" md="ios-cart" *ngIf="producto.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(producto)"></ion-icon>\n      </div>\n      <img src="{{env.getImagenIndividual}}{{producto.adjuntoId}}" (click)="productoService.viewDetail(producto)" />\n      <div class="card-title" (click)="productoService.viewDetail(producto)">{{producto.nombre}}</div>\n      <div class="card-subtitle" (click)="productoService.viewDetail(producto)">{{producto.descripcion}}</div>\n      <div class="card-price" (click)="productoService.viewDetail(producto)">{{producto.precio | currency}}</div>\n\n\n      <!-- imagenes adicionales -->\n      <div class="info-icons">\n        <div class="square">\n          <p>{{producto.proveedor?.nombre}}</p>\n        </div>\n      </div>\n    </ion-card>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_14__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_15__services_producto_service__["a" /* ProductoService */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_action_sheet__["a" /* ActionSheet */],
            __WEBPACK_IMPORTED_MODULE_16__services_string_utils_service__["a" /* StringUtilsService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltroProductoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
            selector: 'page-filtro-producto',template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/filtro-producto/filtro-producto.html"*/'<ion-header>\n  <ion-toolbar color="primary">\n    <ion-title>Productos: Filtros</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss(false)">\n        <span color="secundary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android, windows" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class="wrapper-frame">\n    <p>Filtra los productos seleccionando lo que más te interese.</p>\n    <div class="block">\n\n      <ion-item>\n        <ion-label floating>Nombre producto</ion-label>\n        <ion-input (keyup)="change()" type="text" [(ngModel)]="filtros.nombre" style="border-bottom: 1px solid #3b64bf;"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Proveedores</ion-label>\n        <ion-select (ionChange)="change()" [(ngModel)]="filtros.idProveedor" okText="Ok" cancelText="Cancelar" interface="action-sheet"\n          [selectOptions]="selectOptions">\n          <ion-option *ngFor="let op of proveedores" [value]="op.id">\n            {{op.nombre}}\n          </ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label>Categorías</ion-label>\n        <ion-select (ionChange)="change()" [(ngModel)]="filtros.idCategoria" okText="Ok" cancelText="Cancelar" interface="action-sheet"\n          [selectOptions]="selectOptions">\n          <ion-option *ngFor="let op of categorias" [value]="op.id">\n            {{op.nombre}}\n          </ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label>Secciones</ion-label>\n        <ion-select (ionChange)="change()" [(ngModel)]="filtros.idSeccion" okText="Ok" cancelText="Cancelar" interface="action-sheet"\n          [selectOptions]="selectOptions">\n          <ion-option *ngFor="let op of secciones" [value]="op.id">\n            <ion-icon name="md-close"></ion-icon>\n            {{op.nombre}}\n          </ion-option>\n        </ion-select>\n      </ion-item>\n\n    </div>\n  </div>\n\n</ion-content>\n<ion-footer class="footer-button">\n  <div class="btn-full" (tap)="dismiss()">\n    <span>Aceptar</span>\n  </div>\n</ion-footer>'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/filtro-producto/filtro-producto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
    ], FiltroProductoPage);
    return FiltroProductoPage;
}());

//# sourceMappingURL=filtro-producto.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_action_sheet__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_validation_service__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_local_storage_encrypt_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_generic_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_loading_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__ = __webpack_require__(62);
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
    function RegistroPage(navCtrl, navParams, formBuilder, localStorageEncryptService, camera, translatePipe, actionSheet, alertaService, genericService, loadingService) {
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
            selector: 'page-registro',template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/registro/registro.html"*/'<ion-icon id="icn-1" name="ios-arrow-back" class="arrow-generada" (click)="regresar()"></ion-icon>\n<ion-content>\n\n  <div class="contenedor-step-3">\n    <div class="sub-contenedor">\n      <div class="title">\n        <h4> Registro de Usuario</h4>\n      </div>\n      \n      <div class="avatar">\n        <div class="imagen" (tap)="opcionesDeImagen()">\n          <img src="assets/imgs/registro/user.png" alt="" *ngIf="!photo_url">\n          <img src="{{photo_url}}" alt="" *ngIf="photo_url">\n        </div>\n      </div>\n\n      <div class="formulario">\n        <form [formGroup]="formGroup">\n          <div *ngFor="let dato of objetoRegistro;let i = index" class="contenedor-input">\n            <span>{{dato.name}}</span>\n\n            <input class="inp" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}" type="{{dato.type}}"\n              [(ngModel)]="dato.value" maxlength="{{dato.length}}"\n              *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\'">\n\n            <ion-datetime class="dt" [(ngModel)]="dato.value" formControlName="{{dato.formName}}" text-left\n              pickerFormat="DD/MM/YYYY" cancelText="Cancelar" doneText="Aceptar" #fechaNac\n              (ionChange)="ejecutaValidator()" *ngIf="dato.type == \'date\'" placeholder="01/12/2020"></ion-datetime>\n\n            <ion-col col-2 class="text-center" *ngIf="dato.type == \'checkbox\'">\n              <ion-checkbox formControlName="{{dato.formName}}" [(ngModel)]="dato.value"\n                (ionChange)="ejecutaValidator()">\n              </ion-checkbox>\n            </ion-col>\n\n            <ion-select *ngIf="dato.type == \'select\'" [(ngModel)]="dato.value" \n              okText="Ok" cancelText="Cancelar" interface="action-sheet"\n              (ionChange)="ejecutaValidator()" [selectOptions]="selectOptions" \n              formControlName="{{dato.formName}}">\n              <ion-option *ngFor="let op of dato.opts" [value]="op.id">\n                {{op.value}}\n              </ion-option>\n            </ion-select>\n\n            <app-control-messages [control]="formGroup.controls[dato.formName]" [clase]="\'validators2\'">\n            </app-control-messages>\n          </div>\n          <div class="contenedor-boton">\n            <button [disabled]="btnHabilitado" (click)="registrar()">Registrarme</button>\n          </div>\n        </form>\n\n      </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/registro/registro.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_action_sheet__["a" /* ActionSheet */],
            __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_9__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_10__services_loading_service__["a" /* LoadingService */]])
    ], RegistroPage);
    return RegistroPage;
}());

//# sourceMappingURL=registro.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageEncryptService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js__ = __webpack_require__(488);
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
        localStorage.setItem(encryptedKey, encryptedData);
    };
    /**
     * Recupera valores del localstorage por medio de la llave
     * @param key Llave a obtener
     */
    LocalStorageEncryptService.prototype.getFromLocalStorage = function (key) {
        var encryptedKey = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["SHA256"](key).toString();
        var item = localStorage.getItem(encryptedKey);
        if (item === undefined || item === null) {
            return null;
        }
        var dencryptedData = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["AES"].decrypt(item, this.secretKey).toString(__WEBPACK_IMPORTED_MODULE_1_crypto_js__["enc"].Utf8);
        if (this.isJson(dencryptedData)) {
            return JSON.parse(dencryptedData);
        }
        else {
            return dencryptedData;
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

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarritoComprasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_producto_service__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__(62);
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
    function CarritoComprasPage(navCtrl, navParams, localStorageEncryptService, events, productoService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.productoService = productoService;
        this.user = null;
        this.productosCarrito = [];
        this.env = __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */];
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
    }
    CarritoComprasPage.prototype.ionViewDidLoad = function () {
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
        if (p.cantidad) {
            p.cantidad++;
        }
        this.events.publish('updateProductos', { productoDelete: p });
        this.verificarCarritoModificarCantidad(p);
    };
    CarritoComprasPage.prototype.decrementar = function (p) {
        p.cantidad--;
        if (p.cantidad == 0) {
            this.verificarCarritoModificarCantidad(p);
            this.deleteFavorito(p);
        }
        else {
            this.verificarCarritoModificarCantidad(p);
        }
        this.events.publish('updateProductos', { productoDelete: p });
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
    CarritoComprasPage.prototype.comprar = function () {
    };
    CarritoComprasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-carrito-compras',template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/carrito-compras/carrito-compras.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Mi carrito</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div>\n      <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of productosCarrito; let i = index">\n          <!-- <div class="tacha">\n                <div class="mini-tacha">\n                    <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                    <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                </div>\n              </div> -->\n          <div class="container-card">\n      \n            <img src="{{env.getImagenIndividual}}{{p.adjuntoId}}" />\n          </div>\n          <div class="container-text">{{p.nombre}}</div>\n          <div class="description">{{p.descripcion}}</div>\n          <div class="precio">{{p.precio | currency}}</div>\n      \n          <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n            <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n              <div>-</div>\n            </div>\n            <div class="cantidad" *ngIf="p.cantidad > 0">\n              <div>{{p.cantidad}}</div>\n            </div>\n            <div class="mas" (click)="incrementa(p)">\n              <div>+</div>\n            </div>\n          </div>\n        </div>\n  </div>\n\n  \n</ion-content>\n<ion-footer class="footer-button-class">\n  <button (tap)="addToList()">Agregar a una lista</button>\n  <button (tap)="comprar()">Comprar</button>\n</ion-footer>'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/carrito-compras/carrito-compras.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3__services_producto_service__["a" /* ProductoService */]])
    ], CarritoComprasPage);
    return CarritoComprasPage;
}());

//# sourceMappingURL=carrito-compras.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetalleProductoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_photoswipe__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_photoswipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_photoswipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_photoswipe_dist_photoswipe_ui_default__ = __webpack_require__(610);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_photoswipe_dist_photoswipe_ui_default___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_photoswipe_dist_photoswipe_ui_default__);
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
    function DetalleProductoPage(navCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.producto = null;
        this.productosTemp = [];
        this.producto = navParams.get("producto");
        this.producto.photos = [];
        if (this.producto.imagenes) {
            this.producto.imagenes.forEach(function (element) {
                _this.producto.photos.push({
                    id: element.id,
                    img: "data:image/jpeg;base64," + element.file
                });
            });
        }
    }
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
        this.gallery = new __WEBPACK_IMPORTED_MODULE_2_photoswipe___default.a(pswpElement, __WEBPACK_IMPORTED_MODULE_3_photoswipe_dist_photoswipe_ui_default__, items, options);
        this.gallery.init();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('slides2'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Slides */])
    ], DetalleProductoPage.prototype, "slider2", void 0);
    DetalleProductoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detalle-producto',template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/detalle-producto/detalle-producto.html"*/'<ion-icon id="icn-p" name="ios-arrow-back" class="arrow-generada" (click)="regresar()"></ion-icon>\n\n<ion-icon id="icn-c" name="ios-cart-outline" class="carrito" (click)="carrito()"></ion-icon>\n<ion-content>\n  <div class="title-page">{{producto.nombre}}</div>\n\n  <div class="slider-io animated bounceInLeft" *ngIf="producto.photos.length > 0">\n    <ion-slides autoplay="5000" zoom="true" loop="true" #slides2 loop="false">\n      <ion-slide *ngFor="let photo of producto.photos; let i=index" (click)="imagesLoaded(i)">\n        <div>\n          <img src="{{photo.img}}" alt="">\n          <div class="div-foto">\n            <ion-icon ios="ios-images-outline" md="ios-images-outline"></ion-icon>\n            <p>{{i+1}}/{{producto.photos.length}}</p>\n          </div>\n        </div>\n      </ion-slide>\n    </ion-slides>\n    <div class="arrows-lateral">\n      <div (tap)="prev1()">\n        <ion-icon ios="ios-arrow-back" md="ios-arrow-back"></ion-icon>\n      </div>\n      <div (tap)="next1()">\n        <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward"></ion-icon>\n      </div>\n    </div>\n  </div>\n\n  <div class="descripcion">\n    {{producto.descripcion}}\n  </div>\n\n  <div class="precio">{{producto.precio | currency}}</div>\n\n  <div class="especificaciones">\n    <div class="attr">\n      <img src="assets/imgs/detalle-producto/give.png" alt="">\n      <div class="attr-2">\n          {{producto.proveedor?.nombre}}\n        </div>\n    </div>\n    \n    <div class="attr">\n      <img src="assets/imgs/detalle-producto/market.png" alt="">\n      <div class="attr-2">\n          {{producto.empresa?.nombre}}\n        </div>\n    </div>\n    \n    <div class="attr">\n      <img src="assets/imgs/detalle-producto/news.png" alt="">\n      <div class="attr-2">\n          {{producto.tipoArticulo?.nombre}}\n        </div>\n    </div>\n    \n    <div class="attr">\n      <img src="assets/imgs/detalle-producto/section.png" alt="">\n      <div class="attr-2">\n          {{producto.seccion?.nombre}}\n        </div>\n    </div>\n    \n  </div>\n\n  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true" style="z-index: 2;">\n\n    <!-- Background of PhotoSwipe. \n         It\'s a separate element, as animating opacity is faster than rgba(). -->\n    <div class="pswp__bg"></div>\n\n    <!-- Slides wrapper with overflow:hidden. -->\n    <div class="pswp__scroll-wrap">\n\n      <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->\n      <!-- don\'t modify these 3 pswp__item elements, data is added later on. -->\n      <div class="pswp__container">\n        <div class="pswp__item"></div>\n        <div class="pswp__item"></div>\n        <div class="pswp__item"></div>\n      </div>\n\n      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->\n      <div class="pswp__ui pswp__ui--hidden">\n\n        <div class="pswp__top-bar" style="opacity: 1;z-index: 99999999;"\n          [ngStyle]="{\'top\': fixedContentTop == \'56\' ? \'56px\' : \'44px\'}">\n\n          <!--  Controls are self-explanatory. Order can be changed. -->\n\n          <div class="pswp__counter"></div>\n\n          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\n\n          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>\n\n          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\n\n          <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->\n          <!-- element will get class pswp__preloader--active when preloader is running -->\n          <div class="pswp__preloader">\n            <div class="pswp__preloader__icn">\n              <div class="pswp__preloader__cut">\n                <div class="pswp__preloader__donut"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\n          <div class="pswp__share-tooltip"></div>\n        </div>\n\n        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">\n        </button>\n\n        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">\n        </button>\n\n        <div class="pswp__caption">\n          <div class="pswp__caption__center"></div>\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n</ion-content>\n<!-- Root element of PhotoSwipe. Must have class pswp. -->'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/detalle-producto/detalle-producto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], DetalleProductoPage);
    return DetalleProductoPage;
}());

//# sourceMappingURL=detalle-producto.js.map

/***/ }),

/***/ 417:
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

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loading_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__generic_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__local_storage_encrypt_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(77);
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

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AltaDireccionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
            selector: 'page-alta-direcciones',template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/alta-direcciones/alta-direcciones.html"*/'<!--\n  Generated template for the AltaDireccionesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>alta-direcciones</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/alta-direcciones/alta-direcciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], AltaDireccionesPage);
    return AltaDireccionesPage;
}());

//# sourceMappingURL=alta-direcciones.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TarjetasFrecuentesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
    function TarjetasFrecuentesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    TarjetasFrecuentesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TarjetasFrecuentesPage');
    };
    TarjetasFrecuentesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tarjetas-frecuentes',template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/tarjetas-frecuentes/tarjetas-frecuentes.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Tarjetas Frecuentes</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list>\n        <ion-item-sliding #item>\n          <ion-item>\n            <ion-avatar slot="start">\n              <img src="assets/imgs/tarjetas/bank.png" alt="">\n            </ion-avatar>\n            <ion-label>Alias de tarjeta</ion-label>\n            <ion-label>4152 3133 1665 9596</ion-label>\n          </ion-item>\n          <ion-item-options side="left">\n            <button ion-button (click)="favorite(item)">Favorite</button>\n            <button ion-button color="danger" (click)="share(item)">Share</button>\n          </ion-item-options>\n      \n          <ion-item-options side="right">\n            <button ion-button (click)="unread(item)">Unread</button>\n          </ion-item-options>\n        </ion-item-sliding>\n      </ion-list>\n</ion-content>\n\n<ion-fab bottom right class="fab-cards animated swing">\n  <button ion-fab (click)="addCard()" color="naranja">\n    <ion-icon name="add"></ion-icon>\n  </button>\n</ion-fab>'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/tarjetas-frecuentes/tarjetas-frecuentes.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]) === "function" && _b || Object])
    ], TarjetasFrecuentesPage);
    return TarjetasFrecuentesPage;
    var _a, _b;
}());

//# sourceMappingURL=tarjetas-frecuentes.js.map

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(428);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_about_about__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ngx_translate_http_loader__ = __webpack_require__(611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_module__ = __webpack_require__(613);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_login_login__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_registro_registro__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_control_messages_control_messages_component__ = __webpack_require__(618);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_gallery_gallery_component__ = __webpack_require__(619);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_recuperar_password_recuperar_password__ = __webpack_require__(620);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_filtro_producto_filtro_producto__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_detalle_producto_detalle_producto__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_carrito_compras_carrito_compras__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_alta_direcciones_alta_direcciones__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__directives_scroll_hide_directive__ = __webpack_require__(621);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_lista_carrito_compras_lista_carrito_compras__ = __webpack_require__(622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_tarjetas_frecuentes_tarjetas_frecuentes__ = __webpack_require__(420);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


























function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_11__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_registro_registro__["a" /* RegistroPage */],
                __WEBPACK_IMPORTED_MODULE_16__components_control_messages_control_messages_component__["a" /* ControlMessagesComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_gallery_gallery_component__["a" /* GalleryComponent */],
                __WEBPACK_IMPORTED_MODULE_18__pages_recuperar_password_recuperar_password__["a" /* RecuperarPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_filtro_producto_filtro_producto__["a" /* FiltroProductoPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_detalle_producto_detalle_producto__["a" /* DetalleProductoPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_carrito_compras_carrito_compras__["a" /* CarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_alta_direcciones_alta_direcciones__["a" /* AltaDireccionesPage */],
                __WEBPACK_IMPORTED_MODULE_23__directives_scroll_hide_directive__["a" /* ScrollHideDirective */],
                __WEBPACK_IMPORTED_MODULE_24__pages_lista_carrito_compras_lista_carrito_compras__["a" /* ListaCarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_tarjetas_frecuentes_tarjetas_frecuentes__["a" /* TarjetasFrecuentesPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: 'pages/alta-direcciones/alta-direcciones.module#AltaDireccionesPageModule', name: 'AltaDireccionesPage', segment: 'alta-direcciones', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_13__providers_module__["a" /* ProvidersModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (createTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_12__angular_common_http__["b" /* HttpClient */]]
                    }
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_registro_registro__["a" /* RegistroPage */],
                __WEBPACK_IMPORTED_MODULE_16__components_control_messages_control_messages_component__["a" /* ControlMessagesComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_gallery_gallery_component__["a" /* GalleryComponent */],
                __WEBPACK_IMPORTED_MODULE_18__pages_recuperar_password_recuperar_password__["a" /* RecuperarPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_filtro_producto_filtro_producto__["a" /* FiltroProductoPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_detalle_producto_detalle_producto__["a" /* DetalleProductoPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_carrito_compras_carrito_compras__["a" /* CarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_alta_direcciones_alta_direcciones__["a" /* AltaDireccionesPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_lista_carrito_compras_lista_carrito_compras__["a" /* ListaCarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_tarjetas_frecuentes_tarjetas_frecuentes__["a" /* TarjetasFrecuentesPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
    }
    /**Método que se encarga de mostrar el loader */
    LoadingService.prototype.show = function (message) {
        if (message === void 0) { message = null; }
        return __awaiter(this, void 0, void 0, function () {
            var params, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        params = {};
                        if (message) {
                            params.message = message;
                        }
                        this.hide();
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create(params)];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.log("pdo en el ejido");
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**Método que se encarga de ocultar el loader */
    LoadingService.prototype.hide = function () {
        try {
            if (this.loading) {
                this.loading.dismiss();
            }
            else {
                if (this.loading != undefined) {
                    this.loading.dismiss();
                }
            }
        }
        catch (error) {
            console.log("---->");
            console.log(error);
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

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__ = __webpack_require__(34);
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
    function MyApp(platform, statusBar, splashScreen, translateService, localStorageEncryptService) {
        var _this = this;
        this.translateService = translateService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.rootPage = null;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            _this.initializeLanguage();
            var user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            if (user) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
            }
        });
    }
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TIME_OUT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenericService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alerta_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__);
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
    function GenericService(http, alertaService) {
        this.http = http;
        this.alertaService = alertaService;
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
    GenericService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_0__alerta_service__["a" /* AlertaService */]])
    ], GenericService);
    return GenericService;
}());

//# sourceMappingURL=generic.service.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngx_translate_core__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
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
    function AlertaService(alertCtrl, events, translateService) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.translateService = translateService;
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
                cssClass: "alerta-loteria",
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
            this.alert.present();
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
                cssClass: "alerta-loteria",
                buttons: [
                    {
                        text: 'Aceptar',
                        handler: function () {
                        }
                    }
                ]
            });
            this.alert.present();
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
                cssClass: "alerta-loteria",
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
            this.alert.present();
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
                cssClass: "alerta-loteria",
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
            this.alert.present();
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
                cssClass: "alerta-loteria",
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
            this.alert.present();
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
                cssClass: "alerta-loteria",
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
            this.alert.present();
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
                cssClass: "alerta-loteria",
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
            this.alert.present();
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__ngx_translate_core__["c" /* TranslateService */]])
    ], AlertaService);
    return AlertaService;
}());

//# sourceMappingURL=alerta.service.js.map

/***/ }),

/***/ 605:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 288,
	"./af.js": 288,
	"./ar": 289,
	"./ar-dz": 290,
	"./ar-dz.js": 290,
	"./ar-kw": 291,
	"./ar-kw.js": 291,
	"./ar-ly": 292,
	"./ar-ly.js": 292,
	"./ar-ma": 293,
	"./ar-ma.js": 293,
	"./ar-sa": 294,
	"./ar-sa.js": 294,
	"./ar-tn": 295,
	"./ar-tn.js": 295,
	"./ar.js": 289,
	"./az": 296,
	"./az.js": 296,
	"./be": 297,
	"./be.js": 297,
	"./bg": 298,
	"./bg.js": 298,
	"./bm": 299,
	"./bm.js": 299,
	"./bn": 300,
	"./bn.js": 300,
	"./bo": 301,
	"./bo.js": 301,
	"./br": 302,
	"./br.js": 302,
	"./bs": 303,
	"./bs.js": 303,
	"./ca": 304,
	"./ca.js": 304,
	"./cs": 305,
	"./cs.js": 305,
	"./cv": 306,
	"./cv.js": 306,
	"./cy": 307,
	"./cy.js": 307,
	"./da": 308,
	"./da.js": 308,
	"./de": 309,
	"./de-at": 310,
	"./de-at.js": 310,
	"./de-ch": 311,
	"./de-ch.js": 311,
	"./de.js": 309,
	"./dv": 312,
	"./dv.js": 312,
	"./el": 313,
	"./el.js": 313,
	"./en-SG": 314,
	"./en-SG.js": 314,
	"./en-au": 315,
	"./en-au.js": 315,
	"./en-ca": 316,
	"./en-ca.js": 316,
	"./en-gb": 317,
	"./en-gb.js": 317,
	"./en-ie": 318,
	"./en-ie.js": 318,
	"./en-il": 319,
	"./en-il.js": 319,
	"./en-nz": 320,
	"./en-nz.js": 320,
	"./eo": 321,
	"./eo.js": 321,
	"./es": 322,
	"./es-do": 323,
	"./es-do.js": 323,
	"./es-us": 324,
	"./es-us.js": 324,
	"./es.js": 322,
	"./et": 325,
	"./et.js": 325,
	"./eu": 326,
	"./eu.js": 326,
	"./fa": 327,
	"./fa.js": 327,
	"./fi": 328,
	"./fi.js": 328,
	"./fo": 329,
	"./fo.js": 329,
	"./fr": 330,
	"./fr-ca": 331,
	"./fr-ca.js": 331,
	"./fr-ch": 332,
	"./fr-ch.js": 332,
	"./fr.js": 330,
	"./fy": 333,
	"./fy.js": 333,
	"./ga": 334,
	"./ga.js": 334,
	"./gd": 335,
	"./gd.js": 335,
	"./gl": 336,
	"./gl.js": 336,
	"./gom-latn": 337,
	"./gom-latn.js": 337,
	"./gu": 338,
	"./gu.js": 338,
	"./he": 339,
	"./he.js": 339,
	"./hi": 340,
	"./hi.js": 340,
	"./hr": 341,
	"./hr.js": 341,
	"./hu": 342,
	"./hu.js": 342,
	"./hy-am": 343,
	"./hy-am.js": 343,
	"./id": 344,
	"./id.js": 344,
	"./is": 345,
	"./is.js": 345,
	"./it": 346,
	"./it-ch": 347,
	"./it-ch.js": 347,
	"./it.js": 346,
	"./ja": 348,
	"./ja.js": 348,
	"./jv": 349,
	"./jv.js": 349,
	"./ka": 350,
	"./ka.js": 350,
	"./kk": 351,
	"./kk.js": 351,
	"./km": 352,
	"./km.js": 352,
	"./kn": 353,
	"./kn.js": 353,
	"./ko": 354,
	"./ko.js": 354,
	"./ku": 355,
	"./ku.js": 355,
	"./ky": 356,
	"./ky.js": 356,
	"./lb": 357,
	"./lb.js": 357,
	"./lo": 358,
	"./lo.js": 358,
	"./lt": 359,
	"./lt.js": 359,
	"./lv": 360,
	"./lv.js": 360,
	"./me": 361,
	"./me.js": 361,
	"./mi": 362,
	"./mi.js": 362,
	"./mk": 363,
	"./mk.js": 363,
	"./ml": 364,
	"./ml.js": 364,
	"./mn": 365,
	"./mn.js": 365,
	"./mr": 366,
	"./mr.js": 366,
	"./ms": 367,
	"./ms-my": 368,
	"./ms-my.js": 368,
	"./ms.js": 367,
	"./mt": 369,
	"./mt.js": 369,
	"./my": 370,
	"./my.js": 370,
	"./nb": 371,
	"./nb.js": 371,
	"./ne": 372,
	"./ne.js": 372,
	"./nl": 373,
	"./nl-be": 374,
	"./nl-be.js": 374,
	"./nl.js": 373,
	"./nn": 375,
	"./nn.js": 375,
	"./pa-in": 376,
	"./pa-in.js": 376,
	"./pl": 377,
	"./pl.js": 377,
	"./pt": 378,
	"./pt-br": 379,
	"./pt-br.js": 379,
	"./pt.js": 378,
	"./ro": 380,
	"./ro.js": 380,
	"./ru": 381,
	"./ru.js": 381,
	"./sd": 382,
	"./sd.js": 382,
	"./se": 383,
	"./se.js": 383,
	"./si": 384,
	"./si.js": 384,
	"./sk": 385,
	"./sk.js": 385,
	"./sl": 386,
	"./sl.js": 386,
	"./sq": 387,
	"./sq.js": 387,
	"./sr": 388,
	"./sr-cyrl": 389,
	"./sr-cyrl.js": 389,
	"./sr.js": 388,
	"./ss": 390,
	"./ss.js": 390,
	"./sv": 391,
	"./sv.js": 391,
	"./sw": 392,
	"./sw.js": 392,
	"./ta": 393,
	"./ta.js": 393,
	"./te": 394,
	"./te.js": 394,
	"./tet": 395,
	"./tet.js": 395,
	"./tg": 396,
	"./tg.js": 396,
	"./th": 397,
	"./th.js": 397,
	"./tl-ph": 398,
	"./tl-ph.js": 398,
	"./tlh": 399,
	"./tlh.js": 399,
	"./tr": 400,
	"./tr.js": 400,
	"./tzl": 401,
	"./tzl.js": 401,
	"./tzm": 402,
	"./tzm-latn": 403,
	"./tzm-latn.js": 403,
	"./tzm.js": 402,
	"./ug-cn": 404,
	"./ug-cn.js": 404,
	"./uk": 405,
	"./uk.js": 405,
	"./ur": 406,
	"./ur.js": 406,
	"./uz": 407,
	"./uz-latn": 408,
	"./uz-latn.js": 408,
	"./uz.js": 407,
	"./vi": 409,
	"./vi.js": 409,
	"./x-pseudo": 410,
	"./x-pseudo.js": 410,
	"./yo": 411,
	"./yo.js": 411,
	"./zh-cn": 412,
	"./zh-cn.js": 412,
	"./zh-hk": 413,
	"./zh-hk.js": 413,
	"./zh-tw": 414,
	"./zh-tw.js": 414
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
webpackContext.id = 605;

/***/ }),

/***/ 606:
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

/***/ 607:
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

/***/ 608:
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

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProvidersModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_loading_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_validation_service__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_generic_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_action_sheet__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__interceptors_request_interceptor_service__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_auth_service__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_producto_service__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_string_utils_service__ = __webpack_require__(417);
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
                __WEBPACK_IMPORTED_MODULE_15__services_string_utils_service__["a" /* StringUtilsService */]
            ]
        })
    ], ProvidersModule);
    return ProvidersModule;
}());

//# sourceMappingURL=providers.module.js.map

/***/ }),

/***/ 614:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestInterceptorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(616);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(418);
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
    function RequestInterceptorService(auth) {
        this.auth = auth;
    }
    RequestInterceptorService.prototype.intercept = function (request, next) {
        //console.log("---------------------------------");
        var chequeo = this.auth.getToken();
        var headers = {
            'Content-Type': 'application/json'
        };
        if (chequeo) {
            headers.Authorization = "Bearer " + this.auth.getToken();
        }
        request = request.clone({
            setHeaders: headers
        });
        return next.handle(request);
    };
    RequestInterceptorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]])
    ], RequestInterceptorService);
    return RequestInterceptorService;
}());

//# sourceMappingURL=request-interceptor.service.js.map

/***/ }),

/***/ 618:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlMessagesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_validation_service__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(24);
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

/***/ 619:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_loading_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_local_storage_encrypt_service__ = __webpack_require__(34);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Slides */])
    ], GalleryComponent.prototype, "slider", void 0);
    GalleryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'cmpt-gallery',template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/components/gallery/gallery.html"*/'<div *ngIf="showSpinner && cards?.length == 0" class="divSpinner animated fadeIn">\n  <ion-spinner></ion-spinner>\n</div>\n<div style="box-shadow: 1px 1px 6px 1px #646467;" class="animated fadeIn">\n  <img src="{{imagen}}" alt="" style="width: 100%;">\n</div>\n<div class="slider-io">\n  <ion-slides class="ionSlidesAndroid animated fadeIn" autoplay="5000" loop="false" speed="500" pager\n  (ionSlideDidChange)="didChange($event)">\n    <ion-slide *ngFor="let slide of cards; let i = index" [ngClass]="{\'adjustEntertaiment\' : isEntertaiment}">\n      <img src="{{slide.url}}" alt="" (click)="changeImage(i)">\n      <div class="textoGana" [ngStyle]="{\'margin-top\': titleUp ? \'0%\' :  !showButton ? \'0%\' : \'\'}" *ngIf="!isEntertaiment">\n      </div>\n      <div *ngIf="isEntertaiment" class="titlesAlign">\n      </div>\n    </ion-slide>\n  </ion-slides>\n  <div class="arrows-lateral">\n    <div (tap)="prev()">\n      <ion-icon ios="ios-arrow-back" md="ios-arrow-back" [ngStyle]="{\'display\': !leftArrow ? \'none\' : \'block\', \'text-shadow\': !leftArrow ? \'none\' : \'\'}"></ion-icon>\n    </div>\n    <div (tap)="next()" *ngIf="cards?.length > 0">\n      <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" [ngStyle]="{\'display\': !rigthArrow ? \'none\' : \'block\', \'text-shadow\': !rigthArrow ? \'none\' : \'\'}"></ion-icon>\n    </div>\n  </div>\n</div>\n'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/components/gallery/gallery.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_4__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]])
    ], GalleryComponent);
    return GalleryComponent;
}());

//# sourceMappingURL=gallery.component.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export pathPrincipal */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var pathPrincipal = "http://192.168.0.14:8080/api/";
var environment = {
    production: true,
    productos: pathPrincipal + "productos",
    secciones: pathPrincipal + "seccions",
    categorias: pathPrincipal + "categorias",
    proveedores: pathPrincipal + "proveedors",
    registro: pathPrincipal + "register",
    login: pathPrincipal + "authenticate",
    getImagenIndividual: pathPrincipal + "adjuntos/download/",
    logout: null
};
//# sourceMappingURL=environment.prod.js.map

/***/ }),

/***/ 620:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecuperarPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
            selector: 'page-recuperar-password',template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/recuperar-password/recuperar-password.html"*/'<ion-icon id="icn-2" name="ios-arrow-back" class="arrow-generada" (click)="regresar()"></ion-icon>\n<ion-content>\n\n</ion-content>\n'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/recuperar-password/recuperar-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], RecuperarPasswordPage);
    return RecuperarPasswordPage;
}());

//# sourceMappingURL=recuperar-password.js.map

/***/ }),

/***/ 621:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollHideDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(13);
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

/***/ 622:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListaCarritoComprasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
    function ListaCarritoComprasPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ListaCarritoComprasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListaCarritoComprasPage');
    };
    ListaCarritoComprasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-lista-carrito-compras',template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/lista-carrito-compras/lista-carrito-compras.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Colecciones</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/lista-carrito-compras/lista-carrito-compras.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], ListaCarritoComprasPage);
    return ListaCarritoComprasPage;
}());

//# sourceMappingURL=lista-carrito-compras.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__registro_registro__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_generic_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tabs_tabs__ = __webpack_require__(140);
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
    function LoginPage(navCtrl, navParams, loadingService, alertaService, genericService, localStorageEncryptService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingService = loadingService;
        this.alertaService = alertaService;
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.configuraciones = {
            visible: false
        };
        this.dataLogin = {
            user: null,
            password: null
        };
        //this.loadingService.show();  
        //comentario
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        //console.log("fghjk");
        //this.loadingService.show();
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
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__tabs_tabs__["a" /* TabsPage */]);
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
            selector: 'page-login',template:/*ion-inline-start:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/login/login.html"*/'<!-- background-color: #258649; -->\n<ion-content class="max-contenedor" padding style="background-image: url(assets/imgs/login/loginFondo.png);">\n  <section class="container animated rubberBand">\n    <section class="flex">\n      <img src="assets/imgs/logo.png" alt="" class="animated fadeIn">\n\n      <section class="input-section">\n        <input [(ngModel)]="dataLogin.user" type="email" placeholder="{{\'EMAIL\' | translate}}">\n        <div class="interno">\n          <input [(ngModel)]="dataLogin.password" type="{{configuraciones.visible ? \'text\' : \'password\'}}" placeholder="{{\'PASSWORD\' | translate}}">\n          <section (touchstart)="visible()" (touchend)="visible()">\n            <ion-icon ios="ios-eye" md="ios-eye"></ion-icon>\n          </section>\n        </div>\n\n        <button (click)="login()">{{\'LOGIN\' | translate}}</button>\n      </section>\n      <section class="registrate">\n        <a (click)="goToRegister()">¿Aún no te has registrado?</a>\n      </section>\n    </section>\n  </section>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/MiApps/basic-with-login/src/app/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_5__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[421]);
//# sourceMappingURL=main.js.map
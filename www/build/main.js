webpackJsonp([0],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1__local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_0__generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* Events */]])
    ], AlertaService);
    return AlertaService;
}());

//# sourceMappingURL=alerta.service.js.map

/***/ }),

/***/ 1000:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_local_storage_encrypt_service__ = __webpack_require__(9);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */])
    ], GalleryComponent.prototype, "slider", void 0);
    GalleryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'cmpt-gallery',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/components/gallery/gallery.html"*/'<div *ngIf="showSpinner && cards?.length == 0" class="divSpinner animated fadeIn">\n  <ion-spinner></ion-spinner>\n</div>\n<div style="box-shadow: 1px 1px 6px 1px #646467;" class="animated fadeIn">\n  <img src="{{imagen}}" alt="" style="width: 100%;">\n</div>\n<div class="slider-io">\n  <ion-slides class="ionSlidesAndroid animated fadeIn" autoplay="5000" loop="false" speed="500" pager\n  (ionSlideDidChange)="didChange($event)">\n    <ion-slide *ngFor="let slide of cards; let i = index" [ngClass]="{\'adjustEntertaiment\' : isEntertaiment}">\n      <img src="{{slide.url}}" alt="" (click)="changeImage(i)">\n      <div class="textoGana" [ngStyle]="{\'margin-top\': titleUp ? \'0%\' :  !showButton ? \'0%\' : \'\'}" *ngIf="!isEntertaiment">\n      </div>\n      <div *ngIf="isEntertaiment" class="titlesAlign">\n      </div>\n    </ion-slide>\n  </ion-slides>\n  <div class="arrows-lateral">\n    <div (tap)="prev()">\n      <ion-icon ios="ios-arrow-back" md="ios-arrow-back" [ngStyle]="{\'display\': !leftArrow ? \'none\' : \'block\', \'text-shadow\': !leftArrow ? \'none\' : \'\'}"></ion-icon>\n    </div>\n    <div (tap)="next()" *ngIf="cards?.length > 0">\n      <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" [ngStyle]="{\'display\': !rigthArrow ? \'none\' : \'block\', \'text-shadow\': !rigthArrow ? \'none\' : \'\'}"></ion-icon>\n    </div>\n  </div>\n</div>\n'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/components/gallery/gallery.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_4__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]])
    ], GalleryComponent);
    return GalleryComponent;
}());

//# sourceMappingURL=gallery.component.js.map

/***/ }),

/***/ 1001:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AltaDireccionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AltaDireccionesPage = /** @class */ (function () {
    function AltaDireccionesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AltaDireccionesPage.prototype.ionViewDidLoad = function () {
    };
    AltaDireccionesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-alta-direcciones',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/alta-direcciones/alta-direcciones.html"*/'<!--\n  Generated template for the AltaDireccionesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>alta-direcciones</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/alta-direcciones/alta-direcciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], AltaDireccionesPage);
    return AltaDireccionesPage;
}());

//# sourceMappingURL=alta-direcciones.js.map

/***/ }),

/***/ 1002:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollHideDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(5);
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
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["d" /* Content */])
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

/***/ 1003:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TerminoServicioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TerminoServicioPage = /** @class */ (function () {
    function TerminoServicioPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    TerminoServicioPage.prototype.ionViewDidLoad = function () {
    };
    TerminoServicioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-termino-servicio',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/termino-servicio/termino-servicio.html"*/'<!--\n  Generated template for the TerminoServicioPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>termino-servicio</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/termino-servicio/termino-servicio.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], TerminoServicioPage);
    return TerminoServicioPage;
}());

//# sourceMappingURL=termino-servicio.js.map

/***/ }),

/***/ 1004:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReciboPagoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ReciboPagoPage = /** @class */ (function () {
    function ReciboPagoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ReciboPagoPage.prototype.ionViewDidLoad = function () {
    };
    ReciboPagoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recibo-pago',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/recibo-pago/recibo-pago.html"*/'<!--\n  Generated template for the ReciboPagoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>recibo-pago</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/recibo-pago/recibo-pago.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], ReciboPagoPage);
    return ReciboPagoPage;
}());

//# sourceMappingURL=recibo-pago.js.map

/***/ }),

/***/ 1010:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardProductoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_local_storage_encrypt_service__ = __webpack_require__(9);
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
var CardProductoComponent = /** @class */ (function () {
    /**Constructor de la clase
     * con la inyección de los servicios necesarios
     */
    function CardProductoComponent(navCtrl, loadingService, genericService, localStorageEncryptService) {
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
    CardProductoComponent.prototype.changeImage = function (event) {
        this.imagen = this.cards[event].url;
    };
    /** init pages*/
    CardProductoComponent.prototype.ngOnInit = function () {
        this.imagen = this.cards[0].url;
    };
    /**Metodo para verificar la imagen anterior */
    CardProductoComponent.prototype.prev = function () {
        this.slider.slidePrev();
    };
    /**Metodo para verificar la imagen posterior */
    CardProductoComponent.prototype.next = function () {
        this.slider.slideNext();
    };
    /**Método que captura el evento del cambio en el slide de promociones*/
    CardProductoComponent.prototype.didChange = function (event) {
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
    ], CardProductoComponent.prototype, "cards", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], CardProductoComponent.prototype, "showSpinner", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], CardProductoComponent.prototype, "titleUp", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], CardProductoComponent.prototype, "showButton", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], CardProductoComponent.prototype, "isEntertaiment", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], CardProductoComponent.prototype, "isEntertaimentPromotion", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], CardProductoComponent.prototype, "isEntertaimentExperience", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], CardProductoComponent.prototype, "retornarImagen", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */])
    ], CardProductoComponent.prototype, "slider", void 0);
    CardProductoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'cmpt-card-producto',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/components/card-producto/card-producto.html"*/'<div *ngIf="showSpinner && cards?.length == 0" class="divSpinner animated fadeIn">\n  <ion-spinner></ion-spinner>\n</div>\n<div style="box-shadow: 1px 1px 6px 1px #646467;" class="animated fadeIn">\n  <img src="{{imagen}}" alt="" style="width: 100%;">\n</div>\n<div class="slider-io">\n  <ion-slides class="ionSlidesAndroid animated fadeIn" autoplay="5000" loop="false" speed="500" pager\n  (ionSlideDidChange)="didChange($event)">\n    <ion-slide *ngFor="let slide of cards; let i = index" [ngClass]="{\'adjustEntertaiment\' : isEntertaiment}">\n      <img src="{{slide.url}}" alt="" (click)="changeImage(i)">\n      <div class="textoGana" [ngStyle]="{\'margin-top\': titleUp ? \'0%\' :  !showButton ? \'0%\' : \'\'}" *ngIf="!isEntertaiment">\n      </div>\n      <div *ngIf="isEntertaiment" class="titlesAlign">\n      </div>\n    </ion-slide>\n  </ion-slides>\n  <div class="arrows-lateral">\n    <div (tap)="prev()">\n      <ion-icon ios="ios-arrow-back" md="ios-arrow-back" [ngStyle]="{\'display\': !leftArrow ? \'none\' : \'block\', \'text-shadow\': !leftArrow ? \'none\' : \'\'}"></ion-icon>\n    </div>\n    <div (tap)="next()" *ngIf="cards?.length > 0">\n      <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" [ngStyle]="{\'display\': !rigthArrow ? \'none\' : \'block\', \'text-shadow\': !rigthArrow ? \'none\' : \'\'}"></ion-icon>\n    </div>\n  </div>\n</div>\n'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/components/card-producto/card-producto.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_4__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]])
    ], CardProductoComponent);
    return CardProductoComponent;
}());

//# sourceMappingURL=card-producto.component.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_pushNotifications_service__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__registro_registro__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tabs_tabs__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__recupera_contrasenia_recupera_contrasenia__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_proveedor_tabs_tabs__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_fcm__ = __webpack_require__(219);
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
    function LoginPage(navCtrl, navParams, loadingService, alertaService, genericService, localStorageEncryptService, app, events, fcm, platform, pushNotificationService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingService = loadingService;
        this.alertaService = alertaService;
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.app = app;
        this.events = events;
        this.fcm = fcm;
        this.platform = platform;
        this.pushNotificationService = pushNotificationService;
        this.configuraciones = {
            visible: false
        };
        this.dataLogin = {
            user: null,
            password: null
        };
        this.color = "#3b64c0";
        this.env = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */];
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
        var nav = this.app.getRootNav();
        nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__tabs_tabs__["a" /* TabsPage */]);
    };
    LoginPage.prototype.actualizarToken = function (response) {
        var _this = this;
        this.fcm.getToken().then(function (token) {
            console.log("*********************");
            console.log(token);
            //localStorage.setItem("token", token);
            var body = {
                login: response.username,
                token: token
            };
            _this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].usuarios, body).subscribe(function (response) {
                _this.localStorageEncryptService.setToLocalStorage("phoneToken", token);
                _this.readNotify();
            }, function (error) {
            });
            console.log("*********************");
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.loadingService.show().then(function () {
            var body = {
                username: _this.dataLogin.user,
                password: _this.dataLogin.password
            };
            _this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].login, body).subscribe(function (response) {
                //quitar
                _this.loadingService.hide();
                if (response.tipo_usuario == 3 && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2 ||
                    response.tipo_usuario == 2 && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 1 ||
                    response.tipo_usuario == 4 && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3) {
                    _this.localStorageEncryptService.setToLocalStorage("userSession", response);
                    //let nav:any = this.app.getRootNav();
                    //nav.push(TabsPage);
                    _this.events.publish("actualizarCantidad", { fromLogin: true });
                    _this.events.publish("actualizarTarjetas", { fromLogin: true });
                    _this.events.publish("totalCarrito", { fromLogin: true });
                    _this.events.publish("reloadUser", { fromLogin: true });
                    switch (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo) {
                        case 1:
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__tabs_tabs__["a" /* TabsPage */]);
                            break;
                        case 2:
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_proveedor_tabs_tabs__["a" /* TabsProveedorPage */]);
                            break;
                        case 3:
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_proveedor_tabs_tabs__["a" /* TabsProveedorPage */]);
                            break;
                        default:
                            break;
                    }
                    _this.actualizarToken(response);
                }
                else {
                    _this.alertaService.warnAlertGeneric("No has dado de alta tu usuario, por favor, registrate");
                }
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.description ? err.description : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
    };
    LoginPage.prototype.readNotify = function () {
        var _this = this;
        if (this.platform.is('ios') || this.platform.is('android')) {
            this.fcm.onNotification().subscribe(function (data) {
                _this.pushNotificationService.evaluateNotification(data);
            });
        }
        else {
        }
    };
    LoginPage.prototype.visible = function () {
        this.configuraciones.visible = !this.configuraciones.visible;
    };
    LoginPage.prototype.goToRegister = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__registro_registro__["a" /* RegistroPage */]);
    };
    LoginPage.prototype.olvideContrasenia = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__recupera_contrasenia_recupera_contrasenia__["a" /* RecuperaContraseniaPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/login/login.html"*/'<!-- background-color: #258649; -->\n<ion-icon *ngIf="env.perfil.activo == 1" id="icn-5" name="ios-arrow-back" class="arrow-generada" (click)="regresar()" [ngStyle]="{\'color\': color}"></ion-icon>\n<ion-content class="max-contenedor" padding style="background-image: url(assets/imgs/login/loginFondo.png);"\n[style.background-image]="\'url(\'+genericService.imgLogin()+\')\'">\n  <section class="container animated rubberBand">\n    <section class="flex">\n      <img src="assets/imgs/logo.png" alt="" class="animated fadeIn">\n\n      <section class="input-section">\n        <input [(ngModel)]="dataLogin.user" type="email" placeholder="{{\'EMAIL\' | translate}}">\n        <div class="interno">\n          <input [(ngModel)]="dataLogin.password" type="{{configuraciones.visible ? \'text\' : \'password\'}}" placeholder="{{\'PASSWORD\' | translate}}">\n          <section (touchstart)="visible()" (touchend)="visible()">\n            <ion-icon ios="ios-eye" md="ios-eye"></ion-icon>\n          </section>\n        </div>\n\n        <button (click)="login()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">{{\'LOGIN\' | translate}}</button>\n      </section>\n      <section class="registrate">\n        <a (click)="goToRegister()" [ngStyle]="{\'color\': genericService.getColorHex()}">¿Aún no te has registrado?</a>\n      </section>\n      <section class="registrate">\n        <a (click)="olvideContrasenia()" [ngStyle]="{\'color\': genericService.getColorHex()}">Olvidé mi contraseña</a>\n      </section>\n    </section>\n  </section>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_6__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_8__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_fcm__["a" /* FCM */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_0__services_pushNotifications_service__["a" /* PushNotificationService */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistorialPedidosDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_envio_transportista_envio_transportista__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_sqlGenericService__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_lista_chat_lista_chat__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__qr_qr__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chat_chat__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_proveedor_ver_productos_ver_productos__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pedidos_detail_pedidos_detail__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__problemas_pedido_problemas_pedido__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_common_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_qr_scanner__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_in_app_browser__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_file__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_file_opener__ = __webpack_require__(454);
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




















var HistorialPedidosDetailPage = /** @class */ (function () {
    function HistorialPedidosDetailPage(navCtrl, navParams, genericService, localStorageEncryptService, alertaService, loadingService, qrScanner, alertCtrl, actionSheetCtrl, iab, httpClient, platform, file, fileOpener, sqlGenericService, modalController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.qrScanner = qrScanner;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.iab = iab;
        this.httpClient = httpClient;
        this.platform = platform;
        this.file = file;
        this.fileOpener = fileOpener;
        this.sqlGenericService = sqlGenericService;
        this.modalController = modalController;
        this.user = null;
        this.pedido = null;
        this.tipoUsuario = __WEBPACK_IMPORTED_MODULE_12__environments_environment_prod__["a" /* environment */].perfil.activo;
        this.idGenerado = 1;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.pedido = navParams.get("pedido");
        console.log(this.pedido);
        this.idGenerado = Math.floor(new Date().getTime() / 1000.0);
    }
    HistorialPedidosDetailPage.prototype.ngOnDestroy = function () {
        this.localStorageEncryptService.clearProperty("pedidoPedido");
    };
    HistorialPedidosDetailPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
        this.localStorageEncryptService.setToLocalStorage("pedidoPedido", this.pedido.id);
    };
    HistorialPedidosDetailPage.prototype.loadMap = function () {
        var _this = this;
        var latitude = this.pedido.direccionContacto.latitud;
        var longitude = this.pedido.direccionContacto.longitud;
        // create a new map by passing HTMLElement
        console.log(this.idGenerado);
        var mapEle = document.getElementById(this.idGenerado + "-map");
        console.log(mapEle);
        // create LatLng object
        var myLatLng = { lat: Number(latitude), lng: Number(longitude) };
        // create map
        this.map = new google.maps.Map(mapEle, {
            center: myLatLng,
            zoom: 15
        });
        console.log(this.map);
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
                icon: __WEBPACK_IMPORTED_MODULE_12__environments_environment_prod__["a" /* environment */].icons['persona'].icon
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__pedidos_detail_pedidos_detail__["a" /* PedidosDetailPage */], { detalle: this.pedido.pedidoProveedores, id: this.pedido.id });
    };
    HistorialPedidosDetailPage.prototype.problemasPedido = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__problemas_pedido_problemas_pedido__["a" /* ProblemasPedidoPage */], { pedidoProblem: this.pedido });
    };
    HistorialPedidosDetailPage.prototype.terminarPedido = function () {
        var _this = this;
        var body = {
            pedidoProveedorId: this.pedido.pedidoProveedores[0].id
        };
        this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_12__environments_environment_prod__["a" /* environment */].llegada, body).subscribe(function (response1) {
            _this.alertaService.successAlertGeneric("Se ha notificado al usuario de tu llegada al domicilio");
        }, function (error) {
            _this.alertaService.errorAlertGeneric('Ocurrió un error, por favor intenta nuevamente.');
        });
    };
    HistorialPedidosDetailPage.prototype.verProductos = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_proveedor_ver_productos_ver_productos__["a" /* VerProductosPage */], { pedidos: this.pedido });
    };
    HistorialPedidosDetailPage.prototype.terminarServicio = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__qr_qr__["a" /* QrPage */], { pedido: this.pedido });
    };
    HistorialPedidosDetailPage.prototype.enviarPedido = function () {
        var _this = this;
        var body = {
            pedidoProveedorId: this.pedido.pedidoProveedores[0].id,
            estatusId: 18 //antes 14
        };
        this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_12__environments_environment_prod__["a" /* environment */].pedidosProveedores, body).subscribe(function (response1) {
            _this.alertaService.successAlertGeneric("El pedido se ha enviado al transportista");
        }, function (error) {
            _this.alertaService.errorAlertGeneric("Ocurrió un error, por favor intenta nuevamente.");
        });
    };
    HistorialPedidosDetailPage.prototype.enviarPedidoMultiple = function () {
        var _this = this;
        this.loadingService.show();
        //this.pedido.pedidoProveedores[0].proveedorId
        //console.log(this.pedido);
        /* let objSQL: ParamSQL = {
          table: "proveedor_transportista",
          //selectables: ["id", "json"],
          conditions: {
            id_proveedor: {
              value: this.pedido.pedidoProveedores[0].proveedorId,
            }
          },
          typeSQL: 3
        }; */
        var sql = "\n    SELECT pt.*, t.*, ju.*, d.*, t.id as idT FROM proveedor_transportista pt\n    LEFT JOIN transportista t\n    ON (pt.id_transportista = t.id) \n    LEFT JOIN jhi_user ju\n    ON (ju.id = t.usuario_id)\n    LEFT JOIN direccion d\n    ON (d.id = t.direccion_id)\n    WHERE pt.id_proveedor = " + this.pedido.pedidoProveedores[0].proveedorId;
        console.log(sql);
        //console.log(sql);
        var queryEncrypt = this.localStorageEncryptService.encryptBack(sql);
        ////console.log(params);
        var request = {
            query: queryEncrypt,
            retorna: 1,
            push: null,
            token: null
        };
        this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_12__environments_environment_prod__["a" /* environment */].genericQuerie, request).subscribe(function (response) {
            //console.log(response);
            _this.loadingService.hide();
            if (response.parameters.length > 0) {
                console.log(response.parameters);
                //this.navCtrl.push(EnvioTransportistaPage, );
                var modal = _this.modalController.create(__WEBPACK_IMPORTED_MODULE_0__pages_envio_transportista_envio_transportista__["a" /* EnvioTransportistaPage */], { transportistas: response.parameters });
                modal.present();
                modal.onDidDismiss(function (data) {
                    if (data && data.transportista) {
                        console.log(data.transportista);
                        var transportista = data.transportista;
                        ////Notification data
                        var notification = {
                            body: "Tienes un nuevo pedido por entregar - PEDIDO " + _this.pedido.pedidoProveedores[0].folio,
                            title: "Pedido " + _this.pedido.pedidoProveedores[0].folio,
                            click_action: "FCM_PLUGIN_ACTIVITY",
                            image: null,
                            color: "#F07C1B",
                            "content-available": true
                        };
                        var dataFCM = {
                            body: data.msj,
                            title: data.titulo,
                            view: 1,
                            otherData: null
                        };
                        var fcmd = {
                            to: "" + transportista.token,
                            notification: notification,
                            data: dataFCM,
                            priority: "high"
                        };
                        //////////////////
                        var body = {
                            pedidoProveedorId: _this.pedido.pedidoProveedores[0].id,
                            estatusId: 18,
                            email: _this.user.email,
                            transportistaId: data.transportista.idT,
                            fcmData: fcmd
                        };
                        _this.loadingService.show();
                        _this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_12__environments_environment_prod__["a" /* environment */].pedidosProveedores, body).subscribe(function (response1) {
                            _this.loadingService.hide();
                            _this.alertaService.successAlertGeneric(response1.description);
                        }, function (error) {
                            _this.loadingService.hide();
                            _this.alertaService.errorAlertGeneric(error.error.description);
                        });
                    }
                });
            }
            else {
                _this.alertaService.warnAlertGeneric("No tienes transportistas asignados");
            }
            //this.getMenus();
        }, function (error) {
            //console.log(error);
            _this.loadingService.hide();
            _this.alertaService.errorAlertGeneric(error.error.description);
        });
    };
    HistorialPedidosDetailPage.prototype.verRecibo = function () {
        if (this.pedido.receiptUrl && this.pedido.receiptUrl.length > 0) {
            //this.returnDocument(this.pedido.folio.toString(),this.pedido.receiptUrl,'application/pdf');
            this.aceptarRedirect(this.pedido.receiptUrl);
        }
        else {
            this.alertaService.warnAlertGeneric("No se ha generado el ticket de tu pedido, contacta al administrador");
        }
        //
    };
    /**Accept redirect android */
    HistorialPedidosDetailPage.prototype.aceptarRedirectAndroid = function (linkTemp) {
        return __awaiter(this, void 0, void 0, function () {
            var script, ref;
            return __generator(this, function (_a) {
                script = "window.print();";
                ref = this.iab.create(linkTemp, '_blank', 'location=yes');
                ref.on('loadstop').subscribe(function (event) {
                    console.log("script ejecuta");
                    ref.executeScript({ code: script });
                });
                ref.on('exit').subscribe(function (event) {
                });
                ref.on('loadstart').subscribe(function (event) {
                });
                return [2 /*return*/];
            });
        });
    };
    /**Accept redirect android */
    HistorialPedidosDetailPage.prototype.aceptarRedirectIOS = function (linkTemp) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var script;
            return __generator(this, function (_a) {
                if (this.ref) {
                    this.ref.close();
                    this.ref = undefined;
                }
                this.ref = this.iab.create(linkTemp, '_blank', 'location=yes');
                script = "window.print();";
                this.ref.on('loadstop').subscribe(function (event) {
                    _this.ref.executeScript({ code: script });
                });
                this.ref.on('exit').subscribe(function (event) {
                });
                this.ref.on('loadstart').subscribe(function (event) {
                });
                return [2 /*return*/];
            });
        });
    };
    /**Método que hace el redirect y genera un autoclick en el formulario que se envia */
    HistorialPedidosDetailPage.prototype.aceptarRedirect = function (linkTemp) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.platform.is("ios")) {
                    this.aceptarRedirectIOS(linkTemp);
                }
                else {
                    this.aceptarRedirectAndroid(linkTemp);
                }
                return [2 /*return*/];
            });
        });
    };
    HistorialPedidosDetailPage.prototype.returnDocument = function (titulo, filePath, mimeType) {
        var _this = this;
        /* this.fileOpener.open(filePath, mimeType)
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file', e)); */
        var headers = new __WEBPACK_IMPORTED_MODULE_15__angular_common_http__["d" /* HttpHeaders */]();
        headers = headers.set('Accept', 'application/pdf');
        this.httpClient.get(filePath, { headers: headers, responseType: 'blob' }).subscribe(function (resp) {
            console.log(resp);
            var path = null;
            if (_this.platform.is('ios')) {
                path = _this.file.tempDirectory;
            }
            else {
                path = _this.file.externalRootDirectory;
            }
            console.log(path);
            console.log(_this.platform.is('ios'));
            _this.file.writeExistingFile(path, titulo + ".pdf", resp).then(function (response) {
                console.log('successfully wrote to file', response);
                _this.fileOpener.open(path + (titulo + ".pdf"), 'application/pdf').then(function (response) {
                    console.log('opened PDF file successfully', response);
                }).catch(function (err) {
                    console.log('error in opening pdf file', err);
                });
            }).catch(function (err) {
                console.log('error writing to file', err);
            });
        });
    };
    HistorialPedidosDetailPage.prototype.completarServicio = function (tokenEntrada) {
        var _this = this;
        var body = {
            pedidoProveedorId: this.pedido.pedidoProveedores[0].id,
            token: tokenEntrada
        };
        this.loadingService.show().then(function () {
            _this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_12__environments_environment_prod__["a" /* environment */].pedidosTransportistas + "/terminar-servicio", body).subscribe(function (response) {
                _this.loadingService.hide();
                _this.alertaService.successAlertGeneric("El servició terminó correctamente");
            }, function (error) {
                _this.loadingService.hide();
                _this.alertaService.errorAlertGeneric("Ocurrió un error, por favor vuelve a intentarlo");
            });
        });
    };
    HistorialPedidosDetailPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Selecciona',
            buttons: [
                {
                    text: 'Escanear',
                    icon: 'ios-barcode-outline',
                    handler: function () {
                        _this.qrScanner.prepare()
                            .then(function (status) {
                            if (status.authorized) {
                                // camera permission was granted
                                // start scanning
                                var scanSub_1 = _this.qrScanner.scan().subscribe(function (text) {
                                    console.log('Scanned something', text);
                                    ///LOGICA DE ESCANEO Y MANDADO EL TEXTO
                                    _this.completarServicio(text);
                                    ///
                                    _this.qrScanner.hide(); // hide camera preview
                                    scanSub_1.unsubscribe(); // stop scanning
                                });
                            }
                            else if (status.denied) {
                                // camera permission was permanently denied
                                // you must use QRScanner.openSettings() method to guide the user to the settings page
                                // then they can grant the permission from there
                                _this.alertaService.warnAlertGeneric("Activa los permisos de cámara en la aplicación para poder escanear el código");
                            }
                            else {
                                // permission was denied, but not permanently. You can ask for permission again at a later time.
                                _this.alertaService.warnAlertGeneric("Activa los permisos de cámara en la aplicación para poder escanear el código");
                            }
                        })
                            .catch(function (e) { return console.log('Error is', e); });
                    }
                },
                {
                    text: 'Ingresar manual',
                    icon: 'create',
                    handler: function () {
                        var alert = _this.alertCtrl.create({
                            title: 'Escaneo de código',
                            inputs: [
                                {
                                    name: 'token',
                                    placeholder: 'Código'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    handler: function (data) {
                                        console.log('Cancel clicked');
                                    }
                                },
                                {
                                    text: 'Aceptar',
                                    handler: function (data) {
                                        //data.token
                                        _this.completarServicio(data.token);
                                    }
                                }
                            ]
                        });
                        alert.present();
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'destructive',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    HistorialPedidosDetailPage.prototype.verMapa = function () {
        if (__WEBPACK_IMPORTED_MODULE_12__environments_environment_prod__["a" /* environment */].perfil.activo == 3) {
            //http://google.com/maps/@?api=1&map_action=map&center=-33.712206,150.311941&zoom=1
            var latitude = this.pedido.direccionContacto.latitud;
            var longitude = this.pedido.direccionContacto.longitud;
            window.open("https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=" + latitude + "," + longitude + "&zoom=18");
        }
    };
    HistorialPedidosDetailPage.prototype.verChat = function () {
        var _this = this;
        switch (__WEBPACK_IMPORTED_MODULE_12__environments_environment_prod__["a" /* environment */].perfil.activo) {
            case 1:
                if (!this.pedido.pedidoProveedores[0].chatProveedorid) {
                    this.alertaService.warnAlertGeneric("El proveedor aun no inicia el chat, espera a que él se comunique contigo");
                }
                else {
                    /* this.loadingService.show().then(() => {
                      this.genericService.sendGetRequest(`${environment.chats}/${this.pedido.pedidoProveedores[0].chatProveedorid}`).subscribe((response: any) => {
                        */
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_lista_chat_lista_chat__["a" /* ListaChatPage */], { chats: this.pedido.pedidoProveedores, pedido: this.pedido });
                    /* this.loadingService.hide();
                  }, (error: HttpErrorResponse) => {
                    this.loadingService.hide();
                    let err: any = error.error;
                    this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                  });
                }); */
                }
                break;
            case 2:
                this.loadingService.show().then(function () {
                    _this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_12__environments_environment_prod__["a" /* environment */].chatsProveedor + _this.pedido.pedidoProveedores[0].id + "/tipoChat/1").subscribe(function (response) {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__chat_chat__["a" /* ChatPage */], { chat: response, pedido: _this.pedido });
                        _this.loadingService.hide();
                    }, function (error) {
                        _this.loadingService.hide();
                        var err = error.error;
                        _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                    });
                });
                break;
            case 3:
                this.loadingService.show().then(function () {
                    _this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_12__environments_environment_prod__["a" /* environment */].chatsProveedor + _this.pedido.pedidoProveedores[0].id + "/tipoChat/2").subscribe(function (response) {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__chat_chat__["a" /* ChatPage */], { chat: response, pedido: _this.pedido });
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
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["m" /* Component */])({
            selector: 'page-historial-pedidos-detail',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/historial-pedidos-detail/historial-pedidos-detail.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title style="padding:0px">Pedido <strong>{{pedido.folio}}</strong></ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <section class="estatus">\n    <div class="number">Costo <strong>{{pedido.total | currency}}</strong></div>\n    <div class="number">Fecha Solicitud <strong>{{pedido.fechaAlta}}</strong></div>\n    <div class="number" *ngIf="pedido.fechaEntrega">Fecha Entrega <strong>{{pedido.fechaEntrega}}</strong></div>\n    <div class="number">Estatus <strong>{{pedido.estatus.nombre}}</strong></div>\n  </section>\n\n  <section class="mapa">\n\n    <div class="direccion" [ngStyle]="{\'color\' : genericService.getColorHex()}" *ngIf="tipoUsuario == 3">Proveedor</div>\n    <div class="direct" *ngIf="tipoUsuario == 3">{{pedido.cliente.firstName}}\n      {{pedido.cliente.lastName}}</div>\n\n    <div class="direccion" [ngStyle]="{\'color\' : genericService.getColorHex()}" *ngIf="tipoUsuario == 2 || tipoUsuario == 3">Cliente</div>\n    <div class="direct" *ngIf="tipoUsuario == 2 || tipoUsuario == 3">{{pedido.cliente.firstName}}\n      {{pedido.cliente.lastName}}</div>\n\n    <div class="direccion" [ngStyle]="{\'color\' : genericService.getColorHex()}">Dirección de entrega</div>\n    <div class="direct">{{pedido.direccionContacto.direccion}}</div>\n\n\n\n    <div id="{{idGenerado}}-map" class="mapita-google" (click)="verMapa()" style="margin-bottom: 10%;height: 100%;\n    border-radius: 4px;\n    box-shadow: 0px 0px 5px #b3b3b3;"></div>\n\n\n    <section class="botones" *ngIf="tipoUsuario == 1" style="margin-top:0px">\n      <!-- <button class="boton-terminar" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="terminarServicio()"><ion-icon name="md-done-all"></ion-icon>Terminar servicio</button> -->\n      <button class="boton-detalle" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="verDetalle()">\n        <ion-icon name="ios-clipboard-outline"></ion-icon>Ver detalle\n      </button>\n      <!-- <button class="boton-chat" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="verChat()">\n        <ion-icon name="ios-chatbubbles-outline"></ion-icon>\n        Chat\n      </button> -->\n      <button class="boton-recibo" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="verRecibo()">\n        <ion-icon name="ios-document-outline"></ion-icon>Ver recibo\n      </button>\n    </section>\n\n    <section class="botones" *ngIf="tipoUsuario == 2" style="margin-top:0px">\n      <button class="boton-terminar" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="verProductos()">\n        <ion-icon name="md-done-all"></ion-icon>Ver productos\n      </button>\n      <button class="boton-chat" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="verChat()">\n        <ion-icon name="ios-chatbubbles-outline"></ion-icon>\n        Chat\n      </button>\n      <button class="boton-recibo" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="enviarPedidoMultiple()"\n        style="font-size: 11px;" [disabled]="pedido.pedidoProveedores[0]?.estatusId == 18">\n        <ion-icon name="ios-send-outline"></ion-icon>Enviar a transportista\n      </button>\n      <button class="boton-problemas2" style="font-size: 10px;" [ngStyle]="{\'background-color\' : genericService.getColorHex()}"\n        (click)="problemasPedido()">\n        <ion-icon name="ios-flash-outline"></ion-icon>Problemas con pedido\n      </button>\n    </section>\n\n    <section class="botones" *ngIf="tipoUsuario == 3" style="margin-top:0px">\n      <button class="boton-terminar" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="verProductos()">\n        <ion-icon name="md-done-all"></ion-icon>Ver productos\n      </button>\n      <button class="boton-chat" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="verChat()">\n        <ion-icon name="ios-chatbubbles-outline"></ion-icon>\n        Chat\n      </button>\n      <button class="boton-problemas2" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" (click)="presentActionSheet()">\n        <ion-icon name="ios-flash-outline"></ion-icon>Terminar pedido\n      </button>\n      <button class="boton-problemas2" style="font-size: 10px;" [ngStyle]="{\'background-color\' : genericService.getColorHex()}"\n        (click)="problemasPedido()">\n        <ion-icon name="ios-flash-outline"></ion-icon>Problemas con pedido\n      </button>\n\n      <button class="boton-problemas2" style="font-size: 10px;" [ngStyle]="{\'background-color\' : genericService.getColorHex()}"\n        (click)="terminarPedido()">\n        <ion-icon name="ios-flash-outline"></ion-icon>En domicilio\n      </button>\n    </section>\n  </section>\n\n\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/historial-pedidos-detail/historial-pedidos-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_9__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_10__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_11__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_5__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_qr_scanner__["a" /* QRScanner */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_15__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_file_opener__["a" /* FileOpener */],
            __WEBPACK_IMPORTED_MODULE_1__services_sqlGenericService__["a" /* SqlGenericService */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["l" /* ModalController */]])
    ], HistorialPedidosDetailPage);
    return HistorialPedidosDetailPage;
}());

//# sourceMappingURL=historial-pedidos-detail.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticuloProveedoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__detalle_producto_detalle_producto__ = __webpack_require__(46);
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
        this.fromCliente = false;
        this.proveedor = navParams.get("proveedor");
        this.productos = navParams.get("productos");
        this.fromCliente = navParams.get("fromCliente");
        this.replicaProductos = this.productos;
    }
    ArticuloProveedoresPage.prototype.ionViewDidLoad = function () {
    };
    ArticuloProveedoresPage.prototype.viewDetail = function (producto) {
        var _this = this;
        //consumir servicio de imagenes completas
        if (!this.fromCliente) {
            this.loadingService.show().then(function () {
                _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_0__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.id).subscribe(function (response) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { producto: response });
                    _this.loadingService.hide();
                }, function (error) {
                    _this.loadingService.hide();
                    var err = error.error;
                    _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
            });
        }
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
            selector: 'page-articulo-proveedores',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/articulo-proveedores/articulo-proveedores.html"*/'<ion-header>\n    <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n        <ion-title *ngIf="proveedor.proveedor">{{proveedor.proveedor?.nombre}}</ion-title>\n        <ion-title *ngIf="!proveedor.proveedor">{{proveedor.nombre}}</ion-title>\n    </ion-navbar>\n    <div class="busca" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n        <input type="text" [(ngModel)]="palabra" placeholder="Escribe aquí tu búsqueda" (keyup)="buscarPorPalabra()">\n      </div>\n  </ion-header>\n  \n  <ion-content padding>\n      <div *ngIf="productos && productos?.length>0" class="ordenamiento" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n          <div class="texto-ordena">\n            Ordenar por precio\n          </div>\n          <div class="botones">\n            <button ion-button outline style="width: 48%;" (click)="up()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n              <ion-icon name="md-trending-up" class="botonFooter"></ion-icon>\n            </button>\n          </div>\n          <div class="botones">\n            <button ion-button outline style="width: 48%;" (click)="down()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n              <ion-icon name="md-trending-down" class="botonFooter"></ion-icon>\n            </button>\n          </div>\n        </div>\n    <div class="spinner-carrito" *ngIf="!productos || productos.length <= 0">\n      <ion-spinner></ion-spinner>\n    </div>\n  \n  \n  \n    <div *ngIf="productos && productos.length > 0">\n      <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of productos; let i = index" (click)="viewDetail(p)">\n        <!-- <div class="tacha">\n                    <div class="mini-tacha">\n                        <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                        <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                    </div>\n                  </div> -->\n        <div class="container-card">\n  \n          <img src="{{env.getImagenIndividual}}{{p.producto.adjunto_id}}" *ngIf="p.producto.adjunto_id"/>\n          <img src="{{env.getImagenIndividual}}{{p.producto.adjuntoId}}" *ngIf="!p.producto.adjunto_id"/>\n        </div>\n        <div class="container-text">{{p.producto.nombre}}</div>\n        <div class="description">{{p.producto.descripcion}}</div>\n        <div class="precio">{{p.precio | currency}}</div>\n      </div>\n    </div>\n  </ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/articulo-proveedores/articulo-proveedores.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_5__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* Events */]])
    ], ArticuloProveedoresPage);
    return ArticuloProveedoresPage;
}());

//# sourceMappingURL=articulo-proveedores.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__(197);
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
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_0__loading_service__["a" /* LoadingService */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarritoComprasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_envio_externo_envio_externo__ = __webpack_require__(585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_geo_proveedores_home_geo_proveedores__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__detalle_producto_detalle_producto__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_validation_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common__ = __webpack_require__(47);
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
        var _this = this;
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
        this.selectOptions = {
            cssClass: 'action-sheet-class'
        };
        this.user = null;
        this.productosCarrito = [];
        this.productosCarritoReplica = [];
        this.env = __WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */];
        this.first = true;
        this.stripe = Stripe(JSON.parse(this.localStorageEncryptService.yayirobe(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].st.keyPublic)));
        this.recarga = false;
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
        ];
        this.enCompra = false;
        this.objetoRegistroOriginal = [];
        this.formGroup = null;
        this.btnHabilitado = true;
        this.data = null;
        this.objetoRegistroCopy = [];
        this.check = false;
        this.agrupado = [];
        this.totales = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        if (this.user) {
            this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
            this.productosCarritoReplica = this.productosCarrito;
            this.objetoRegistro.forEach(function (element) {
                _this.objetoRegistroOriginal.push(element);
            });
            console.log(this.objetoRegistroOriginal);
            this.recarga = navParams.get("recarga");
            console.log(this.recarga);
            this.getCards();
            this.agruparTotales();
        }
    }
    CarritoComprasPage.prototype.ionViewDidEnter = function () {
        this.events.publish("backHome");
        this.events.publish("backHistorial");
        this.events.publish("backProveedor");
    };
    CarritoComprasPage.prototype.ionViewWillLeave = function () {
    };
    CarritoComprasPage.prototype.agruparTotales = function () {
        var _this = this;
        this.agrupado = [];
        var unique = this.productosCarrito.filter(function (valorActual, indiceActual, arreglo) {
            //Podríamos omitir el return y hacerlo en una línea, pero se vería menos legible
            return arreglo.findIndex(function (valorDelArreglo) { return valorDelArreglo.productoProveedor.proveedorId === valorActual.productoProveedor.proveedorId; }) === indiceActual;
        });
        unique.forEach(function (prov) {
            prov.carritoAgrupado = [];
            _this.productosCarrito.forEach(function (element) {
                if (element.productoProveedor.proveedorId == prov.productoProveedor.proveedorId) {
                    prov.carritoAgrupado.push(element);
                }
            });
            _this.agrupado.push(prov);
        });
        console.log(this.agrupado);
        this.getTotales();
    };
    CarritoComprasPage.prototype.armaObjRegistro = function () {
        var _this = this;
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
        ];
        if (this.totales.listCarritoProveedores.length > 1) {
            this.objetoRegistro.push({
                name: "Dirección",
                required: true,
                length: 200,
                type: "text",
                formName: "direc",
                value: null,
                disabled: true
            });
            this.objetoRegistro.push({
                name: "Código postal",
                required: true,
                length: 6,
                type: "text",
                formName: "cp",
                value: null,
                disabled: false
            });
        }
        else {
            this.objetoRegistro.push({
                name: "Picking",
                required: true,
                length: 11,
                type: "select",
                formName: "sex",
                value: false,
                opts: [
                    {
                        id: false,
                        value: "Entrega a domicilio"
                    },
                    {
                        id: true,
                        value: "Entrega en domicilio de proveedor"
                    }
                ]
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
            this.objetoRegistro.push({
                name: "Código postal",
                required: false,
                length: 6,
                type: "text",
                formName: "cp",
                value: null,
                disabled: false
            });
        }
        if (!this.enCompra) {
            setTimeout(function () {
                _this.fab.toggleList();
            }, 500);
        }
    };
    CarritoComprasPage.prototype.getTotales = function () {
        //debugger;
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].carritoComprasProveedor).subscribe(function (response) {
            console.log(response);
            _this.totales = response;
            _this.agrupado.forEach(function (element) {
                if (element.totalAgrupado) {
                    delete element.totalAgrupado;
                }
            });
            _this.totales.listCarritoProveedores.forEach(function (item) {
                _this.agrupado.forEach(function (element) {
                    if (!element.totalAgrupado && item.proveedor.id == element.productoProveedor.proveedor.id) {
                        element.totalAgrupado = {
                            comisionTransporte: item.comisionTransporte,
                            tiempoEntrega: item.tiempoEntrega,
                            total: item.total,
                            totalProductos: item.totalProductos
                        };
                    }
                });
            });
            _this.armaObjRegistro();
        }, function (error) {
            //this.alertaService.warnAlertGeneric("Agrega artículos al carrito");
        });
    };
    CarritoComprasPage.prototype.ngOnDestroy = function () {
        this.events.publish("carritoTab");
    };
    CarritoComprasPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.recarga) {
            var claseTabs = document.getElementsByClassName("tabbar");
            if (claseTabs[0]) {
                //claseTabs[0].style.display = "none";
            }
            //this.verCarrito();
        }
        this.events.subscribe('carritoTab', function (data) {
            _this.verCarrito();
        });
        this.events.subscribe('carritoTab2', function (data) {
            _this.verCarrito();
        });
    };
    CarritoComprasPage.prototype.verCarrito = function () {
        //nav.pop();
        this.cargarProductosCarrito();
    };
    CarritoComprasPage.prototype.cargarProductosCarrito = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].carritoCompras).subscribe(function (response) {
            _this.localStorageEncryptService.setToLocalStorage("" + _this.user.id_token, response);
            _this.productosCarrito = _this.localStorageEncryptService.getFromLocalStorage("" + _this.user.id_token);
            _this.productosCarritoReplica = _this.productosCarrito;
            _this.agruparTotales();
        }, function (error) {
        });
    };
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
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].tarjetas).subscribe(function (response) {
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
            Stripe.setPublishableKey(JSON.parse(this.localStorageEncryptService.yayirobe(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].st.keyPublic)));
            this.loadingService.show().then(function () {
                var clase = _this;
                Stripe.card.createToken(c, function (status, response) {
                    if (response.error) {
                        clase.loadingService.hide();
                        clase.alertaService.errorAlertGeneric("Lo sentimos! No es posible efectuar el cobro, verifica que la información de tu tarjeta es correcta");
                    }
                    else {
                        // Get the token ID:
                        console.log(response);
                        //clase.loadingService.hide();
                        var token = response.id;
                        var body = {
                            pedidoId: clase.pagoActual.id,
                            token: token,
                            email: clase.user.email,
                            emailStripe: clase.objetoRegistro[2].value
                        };
                        var service = clase.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].pedidos + "/pago", body);
                        service.subscribe(function (response) {
                            clase.loadingService.hide();
                            clase.events.publish("totalCarrito");
                            clase.events.publish("cargarPedidos");
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
        ///Aqui ejecutar el limpiado de carrito
        this.enCompra = false;
        this.events.publish("carritoTab");
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
        //debugger;
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
        console.log(p.cantidad);
        this.agregarToCarritoBack(bandera, p);
    };
    CarritoComprasPage.prototype.agregarToCarrito = function (producto) {
        //debugger;
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
        //debugger;
        var body = {
            precio: producto.precio,
            productoProveedorId: producto.productoProveedor.id
        };
        var service = this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].carritoCompras, body);
        if (producto.cantidad > 1) {
            body.cantidad = producto.cantidad;
            service = this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].carritoCompras, body);
        }
        service.subscribe(function (response) {
            if (bandera) {
                _this.agregarToCarrito(producto);
                _this.verificarCarritoModificarCantidad(producto);
            }
            else {
                _this.verificarCarritoModificarCantidad(producto);
            }
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
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.productoProveedor.id).subscribe(function (response) {
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
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { producto: response, fromCarritos: true });
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
        this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].carritoCompras, body).subscribe(function (response1) {
            if (producto.cantidad == 0) {
                _this.genericService.sendDelete(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].carritoCompras + "/" + producto.id).subscribe(function (response2) {
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
        //debugger;
        var productosStorage = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
        if (productosStorage) {
            productosStorage.forEach(function (item) {
                if (item.id == element.id) {
                    item.cantidad = element.cantidad;
                }
            });
        }
        console.log(productosStorage);
        this.localStorageEncryptService.setToLocalStorage("" + this.user.id_token, productosStorage);
        this.getTotales();
        //this.agruparTotales();
        //this.events.publish("carritoTab");
    };
    CarritoComprasPage.prototype.infoContact = function () {
        var _this = this;
        //debugger;
        var modal = document.getElementById("myModal2");
        //
        this.enCompra = true;
        var putObj = {};
        this.objetoRegistro.forEach(function (item) {
            var tmp = [];
            tmp[0] = null;
            tmp[1] = [];
            if (item.required) {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_11__angular_forms__["g" /* Validators */].required);
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
            if (_this.user) {
            }
            putObj[item.formName] = tmp;
        });
        this.formGroup = this.formBuilder.group(putObj);
        //
        //if (modal) {
        try {
            modal.style.display = "block";
        }
        catch (error) {
        }
        //}
    };
    CarritoComprasPage.prototype.closeInfoContact = function (aun) {
        if (aun === void 0) { aun = true; }
        var modal = document.getElementById('myModal2');
        if (modal) {
            modal.style.display = 'none';
        }
        this.objetoRegistro.forEach(function (item) {
            if (item.name == 'Picking') {
                item.value = false;
            }
            else {
                item.value = null;
            }
        });
        this.armaObjRegistro();
        this.formGroup = null;
        this.btnHabilitado = true;
        if (aun) {
            this.enCompra = false;
        }
    };
    CarritoComprasPage.prototype.cerrarModal3 = function (aun) {
        if (aun === void 0) { aun = true; }
        var modal = document.getElementById("myModal3");
        modal.style.display = "none";
        if (aun) {
            this.enCompra = false;
        }
    };
    CarritoComprasPage.prototype.openModal3 = function () {
        var modal = document.getElementById("myModal3");
        modal.style.display = "block";
    };
    /**Verifica validaciones */
    CarritoComprasPage.prototype.ejecutaValidator = function (opc, evt) {
        if (opc === void 0) { opc = false; }
        if (evt === void 0) { evt = null; }
        if (opc) {
            console.log(evt);
            if (!evt) {
                this.objetoRegistro.push({
                    name: "Dirección",
                    required: true,
                    length: 200,
                    type: "text",
                    formName: "direc",
                    value: null,
                    disabled: true
                });
                this.objetoRegistro.push({
                    name: "Código postal",
                    required: false,
                    length: 6,
                    type: "text",
                    formName: "cp",
                    value: null,
                    disabled: false
                });
            }
            else {
                this.objetoRegistro = this.objetoRegistro.slice(0, 4).concat(this.objetoRegistro.slice(4 + 1));
                this.objetoRegistro = this.objetoRegistro.slice(0, 4).concat(this.objetoRegistro.slice(4 + 1));
            }
        }
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
        console.log(validacion);
        if (validacion <= 0) {
            this.btnHabilitado = false;
        }
        else {
            this.btnHabilitado = true;
        }
        if (validacion == 1 && (this.objetoRegistro[3].value == false || this.objetoRegistro[3].value == 'false')) {
            this.btnHabilitado = false;
        }
    };
    CarritoComprasPage.prototype.getMapa = function () {
        var _this = this;
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_1__home_geo_proveedores_home_geo_proveedores__["a" /* HomeGeoProveedoresPage */], { fromModal: true });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                if (data != null) {
                    _this.data = data.data;
                    if (_this.objetoRegistro[3].value == 'true' ||
                        _this.objetoRegistro[3].value == true ||
                        _this.objetoRegistro[3].value == 'false' ||
                        _this.objetoRegistro[3].value == false) {
                        _this.objetoRegistro[4].value = _this.data.direccion;
                        _this.objetoRegistro[5].value = _this.data.codigoPostal;
                    }
                    else {
                        _this.objetoRegistro[3].value = _this.data.direccion;
                        _this.objetoRegistro[4].value = _this.data.codigoPostal;
                    }
                    setTimeout(function () {
                        _this.ejecutaValidator();
                    }, 500);
                }
            }
        });
    };
    CarritoComprasPage.prototype.seleccionaExterno = function (pedidoProveedor) {
        console.log(this.objetoRegistroCopy);
        var modal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_0__pages_envio_externo_envio_externo__["a" /* EnvioExternoPage */], { pedidoProveedor: pedidoProveedor, cp: this.objetoRegistroCopy[3].value });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                console.log(data);
            }
        });
    };
    CarritoComprasPage.prototype.precompra = function () {
        var _this = this;
        this.objetoRegistroCopy = [];
        this.objetoRegistroCopy.push({ value: this.formGroup.controls["name"].value });
        this.objetoRegistroCopy.push({ value: this.formGroup.controls["tel"].value });
        this.objetoRegistroCopy.push({ value: this.formGroup.controls["email"].value });
        this.objetoRegistroCopy.push({ value: this.formGroup.controls["cp"].value });
        var h = null;
        console.log(this.totales.listCarritoProveedores);
        if (this.totales.listCarritoProveedores.length > 1) {
            h = true;
        }
        var body = {
            nombreContacto: this.objetoRegistroCopy[0].value,
            telefonoContacto: this.objetoRegistroCopy[1].value,
            correoContacto: this.objetoRegistroCopy[2].value,
            direccionContacto: this.objetoRegistro[3].value == 'true' ||
                this.objetoRegistro[3].value == true ||
                this.objetoRegistro[3].value == 'false' ||
                this.objetoRegistro[3].value == false || h ? {
                id: this.data.id ? this.data.id : null,
                codigoPostal: this.data.codigoPostal,
                direccion: this.data.direccion,
                latitud: this.data.latitud,
                longitud: this.data.longitud
            } : null,
            productos: []
        };
        if (this.objetoRegistro[3].value == 'true' ||
            this.objetoRegistro[3].value == true ||
            this.objetoRegistro[3].value == 'false' ||
            this.objetoRegistro[3].value == false) {
            body.picking = this.objetoRegistro[3].value;
        }
        else {
            body.picking = false;
        }
        if (this.objetoRegistro[3].value == false || this.objetoRegistro[3].value == true) {
            body.picking = this.objetoRegistro[3].value;
        }
        else {
            body.picking = false;
        }
        console.log(this.productosCarrito);
        this.productosCarrito.forEach(function (item) {
            body.productos.push({
                cantidad: item.cantidad,
                productoProveedorId: item.productoProveedorId
            });
        });
        body.email = this.user.email;
        var service = this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].pedidos, body);
        this.loadingService.show().then(function () {
            service.subscribe(function (response) {
                _this.pagoActual = response;
                _this.loadingService.hide();
                //this.comprar();
                _this.closeInfoContact(false);
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
            this.cerrarModal3(false);
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
                    var service = _this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].carritoHistorico, body);
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
        console.log(this.productosCarrito);
        console.log(this.productosCarritoReplica);
        this.productosCarrito = this.productosCarritoReplica;
        this.productosCarrito.sort(function (mayor, menor) {
            return mayor.precio - menor.precio;
        });
    };
    CarritoComprasPage.prototype.down = function () {
        this.productosCarrito = this.productosCarritoReplica;
        this.productosCarrito.sort(function (mayor, menor) {
            return menor.precio - mayor.precio;
        });
    };
    CarritoComprasPage.prototype.suma = function (v1, v2) {
        return Number(v1) + Number(v2);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["_8" /* ViewChild */])('fab'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["f" /* FabContainer */])
    ], CarritoComprasPage.prototype, "fab", void 0);
    CarritoComprasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'page-carrito-compras',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/carrito-compras/carrito-compras.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>Mi carrito</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<div id="myModal" class="modal">\n\n  <div class="modal-content animated lightSpeedIn">\n\n    <div class="tacha" (click)="cerrar()" [ngStyle]="{\'color\': genericService.getColorHex()}">\n      <ion-icon ios="md-close" md="md-close"></ion-icon>\n    </div>\n    <div class="selecciona" [ngStyle]="{\'color\': genericService.getColorHex()}" *ngIf="cards && cards?.length > 0">Selecciona\n      tu tarjeta</div>\n    <ion-list *ngIf="cards && cards?.length > 0">\n      <ion-item class="item-list-card" *ngFor="let card of cards" [ngClass]="{\'seleccionado\':card.selected}" (click)="seleccionar(card)">\n        <ion-avatar slot="start">\n          <img src="assets/imgs/tarjetas/bank.png" alt="">\n        </ion-avatar>\n        <div class="datos-tarjetas">\n          <div class="name">{{card.alias}}</div>\n          <div class="number">{{card.numeroTarjeta}}</div>\n        </div>\n\n      </ion-item>\n    </ion-list>\n    <div class="ingresa" [ngStyle]="{\'color\': genericService.getColorHex()}" *ngIf="cards && cards?.length > 0">Ó\n      ingresa una para hacer el pago</div>\n    <div class="ingresa" [ngStyle]="{\'color\': genericService.getColorHex()}" *ngIf="!cards || cards?.length <= 0">Ingresa\n      una tarjeta para hacer el pago</div>\n\n\n\n    <div class="form-row">\n      <input type="number" placeholder="N. Tarjeta" id="tarj" [(ngModel)]="dataCard.tarj" style="width: 100%">\n\n      <ion-datetime class="dt" text-left pickerFormat="MM/YY" cancelText="Cancelar" doneText="Aceptar" #fechaNac\n        placeholder="04/24" min="2016" max="2050" id="dtime" [(ngModel)]="dataCard.dtime"></ion-datetime>\n\n      <input type="number" placeholder="CVC" id="cvc" [(ngModel)]="dataCard.cvc">\n\n\n\n\n    </div>\n    <button ion-button block large style="padding: 10px;\n        height: auto;\n        contain: none;\n        margin-top: 15px;font-size: 14px;"\n      [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="confirmar()">Pagar</button>\n  </div>\n</div>\n\n<div id="myModal2" class="modal2">\n\n  <div class="modal-content animated lightSpeedIn">\n\n    <div style="top: 3px;" class="tacha" (click)="closeInfoContact()" [ngStyle]="{\'color\': genericService.getColorHex()}">\n      <ion-icon ios="md-close" md="md-close"></ion-icon>\n    </div>\n\n    <div style="width: 90%;\n      padding: 7px;\n      color: #fff;\n      border-radius: 4px;" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Llena\n      la información de contacto</div>\n    <div class="formulario" *ngIf="formGroup">\n      <form [formGroup]="formGroup">\n        <div *ngFor="let dato of objetoRegistro;let i = index" class="contenedor-input">\n          <!-- <span>{{dato.name}}</span> -->\n\n          <input class="inp" placeholder="{{dato.name}}" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}"\n            type="{{dato.type}}" [(ngModel)]="dato.value" maxlength="{{dato.length}}" [attr.disabled]="dato.disabled ? \'\' : null"\n            *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\'" [ngStyle]="{\'width\': dato.name == \'Dirección\' ? \'88%\' : \'100%\'}">\n\n          <div class="direc" *ngIf="dato.name == \'Dirección\'" (click)="getMapa()"><img src="assets/imgs/direcciones/home-run.png"\n              alt=""></div>\n\n          <ion-datetime class="dt" [(ngModel)]="dato.value" formControlName="{{dato.formName}}" text-left pickerFormat="DD/MM/YYYY"\n            cancelText="Cancelar" doneText="Aceptar" #fechaNac (ionChange)="ejecutaValidator()" *ngIf="dato.type == \'date\'"\n            placeholder="01/12/2020"></ion-datetime>\n\n          <ion-col col-2 class="text-center" *ngIf="dato.type == \'checkbox\'">\n            <ion-checkbox formControlName="{{dato.formName}}" [(ngModel)]="dato.value" (ionChange)="ejecutaValidator()">\n            </ion-checkbox>\n          </ion-col>\n\n          <ion-select *ngIf="dato.type == \'select\'" [(ngModel)]="dato.value" okText="Ok" cancelText="Cancelar"\n            interface="action-sheet" (ionChange)="ejecutaValidator(true,$event)" [selectOptions]="selectOptions"\n            formControlName="{{dato.formName}}">\n            <ion-option *ngFor="let op of dato.opts" [value]="op.id">\n              {{op.value}}\n            </ion-option>\n          </ion-select>\n\n          <app-control-messages [control]="formGroup.controls[dato.formName]" [clase]="\'validators2\'">\n          </app-control-messages>\n        </div>\n      </form>\n\n    </div>\n\n    <button ion-button block large style="padding: 10px;\n          height: auto;\n          contain: none;\n          margin-top: 15px;font-size: 14px;"\n      [disabled]="btnHabilitado" [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="precompra()">Aceptar</button>\n  </div>\n</div>\n\n<div id="myModal3" class="modal3">\n\n  <div class="modal-content animated lightSpeedIn">\n\n    <div class="tacha" (click)="cerrarModal3()" [ngStyle]="{\'color\': genericService.getColorHex()}">\n      <ion-icon ios="md-close" md="md-close"></ion-icon>\n    </div>\n    <div style="width: 90%;\n    padding: 7px;\n    color: #fff;\n    border-radius: 4px;" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Información de pago</div>\n\n    <div class="resumen">Resumen de la compra</div>\n\n    <div class="resumen-proveedor" *ngIf="pagoActual">\n      <div *ngFor="let p of pagoActual.pedidoProveedores" class="separador">\n        <div class="proveedor">\n          <div class="nombre">{{p.proveedor?.nombre}}</div>\n          <div class="precio">{{p.total | currency}}</div>\n\n          <div class="costo-envio">Costo de envío</div>\n          <div class="precio-envio">{{p.comisionTransportista | currency}}</div>\n\n          <div class="costo-subtotal">Subtotal</div>\n          <div class="precio-subtotal">{{suma(p.total,p.comisionTransportista) | currency}}</div>\n\n          <div class="extern" *ngIf="p.envioExterno" (click)="seleccionaExterno(p)">\n            <div class="aplica">*Aplica envío externo</div>\n            <div class="contenedor-estafeta">\n              <div>\n                <img src="assets/imgs/servicios-envio/estafeta.png" alt="">\n              </div>\n              <div>\n                <img src="assets/imgs/servicios-envio/dhl.png" alt="">\n              </div>\n            </div>\n          </div>\n\n        </div>\n\n\n      </div>\n\n      <div class="total-pagar">Total a pagar: <strong>{{pagoActual.total | currency}}</strong></div>\n      <div class="iva">*Costos incluyen iva.</div>\n\n      <ion-item>\n        <ion-label>Acepto términos y condiciones</ion-label>\n        <ion-checkbox color="{{genericService.getColor()}}" [(ngModel)]="check"></ion-checkbox>\n      </ion-item>\n    </div>\n\n    <div style="width:100%;position: sticky;\n    bottom: -6px;\n    background-color: #fff;">\n      <button ion-button block large style="padding: 10px;\n        height: auto;\n        contain: none;\n        margin-top: 15px;font-size: 14px;display: inline-block; width: 49%"\n        [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="cerrarModal3()">Cancelar</button>\n      <button ion-button block large style="padding: 10px;\n          height: auto;\n          contain: none;\n          margin-top: 15px;font-size: 14px;display: inline-block; width: 49%"\n        [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="comprar()">Realizar pago</button>\n    </div>\n  </div>\n</div>\n\n<ion-content padding class="">\n\n  <!-- <div *ngIf="productosCarrito && productosCarrito?.length>0" class="ordenamiento" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n        <div class="texto-ordena">\n          Ordenar por precio\n        </div>\n        <div class="botones">\n            <button ion-button outline style="width: 48%;" (click)="up()"\n            [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n              <ion-icon name="md-trending-up" class="botonFooter"></ion-icon>\n            </button>\n        </div>\n        <div class="botones">\n            <button ion-button outline style="width: 48%;" (click)="down()"\n            [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n              <ion-icon name="md-trending-down" class="botonFooter"></ion-icon>\n            </button>\n        </div>\n      </div> -->\n\n  <div>\n\n\n\n    <div *ngFor="let proveedor of agrupado">\n      <div class="name-pro" [ngStyle]="{\'color\': genericService.getColorHex()}" style="color: rgb(240, 124, 27);\n      font-weight: 600;\n      font-size: 17px;\n      text-align: center;">{{proveedor.productoProveedor.proveedor.nombre}}</div>\n\n      <div class="scrolling-wrapper">\n        <div id="card-{{i}}" class="card" *ngFor="let p of proveedor.carritoAgrupado; let i = index">\n          <!-- <div class="tacha">\n                            <div class="mini-tacha">\n                                <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                                <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                            </div>\n                          </div> -->\n          <div class="container-card" (click)="viewDetail(p)">\n\n            <img src="{{env.getImagenIndividual}}{{p.productoProveedor.producto.adjuntoId}}" />\n          </div>\n          <div class="container-text" (click)="viewDetail(p)">{{p.productoProveedor.producto.nombre}}</div>\n          <div class="description" (click)="viewDetail(p)">{{p.productoProveedor.producto.descripcion}}</div>\n          <div class="precio" (click)="viewDetail(p)">{{p.precio | currency}}</div>\n\n          <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n            <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n              <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">-</div>\n            </div>\n            <div class="cantidad" *ngIf="p.cantidad > 0">\n              <div [ngStyle]="{\'color\': genericService.getColorHex()}">{{p.cantidad}}</div>\n            </div>\n            <div class="mas" (click)="incrementa(p)">\n              <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">+</div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="name-pro" [ngStyle]="{\'color\': genericService.getColorHex()}">Información</div>\n      <div *ngIf="proveedor.totalAgrupado" class="totales" style="    border: 1px solid #b7b7b7;\n      border-style: dashed;">\n        <div class="tot">Total por productos: <strong>{{proveedor.totalAgrupado.totalProductos}}</strong></div>\n        <div class="tot">Comisión de transporte: <strong>{{proveedor.totalAgrupado.comisionTransporte}}</strong></div>\n        <div class="tot" *ngIf="proveedor.totalAgrupado.tiempoEntrega">Tiempo de entrega: <strong>{{proveedor.totalAgrupado.tiempoEntrega}}</strong></div>\n        <div class="tot">Total: <strong>{{proveedor.totalAgrupado.total}}</strong></div>\n\n      </div>\n    </div>\n    <div *ngIf="totales && totales.listCarritoProveedores?.length <= 0">\n      <div><img style="    border-radius: 4px;\n        box-shadow: 0px 0px 4px 0px #a0a0a0;" src="assets/imgs/lista-carrito/carritoComprado.png"\n          alt=""></div>\n      <div>Sin articulos en carrito, agrega algunos y aparecerán en esta sección</div>\n    </div>\n    <div *ngIf="totales && totales.listCarritoProveedores?.length > 0" class="totales" style="margin-bottom: 50px;">\n      <div class="tot">Total por productos: <strong>{{totales.totalProductos}}</strong></div>\n      <div class="tot">Comisión de transporte: <strong>{{totales.totalComisionTransporte}}</strong></div>\n      <div class="tot">Comisión por pago con tarjeta: <strong>{{totales.comisionStripe}}</strong></div>\n\n      <div class="borde-total"></div>\n\n      <div class="tot" style="font-size: 17px;">Total: <strong>{{totales.total}}</strong></div>\n    </div>\n  </div>\n\n\n</ion-content>\n\n<ion-fab #fab right bottom *ngIf="totales && totales.listCarritoProveedores?.length > 0 && recarga && !enCompra" style="    bottom: 64px;">\n  <button id="botonsin" ion-fab style="color: #fff;" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <ion-icon name="arrow-dropleft"></ion-icon>\n  </button>\n  <ion-fab-list side="left">\n    <button (tap)="addToList()" style="color: #fff;font-size: 12px;\n    width: 137px;\n    padding-top: 10px;\n    padding-bottom: 10px;\n    border-radius: 4px;\n    margin-left: 6px;"\n      [ngStyle]="{\'background-color\': genericService.getColorHex()}">Agregar a una lista</button>\n    <button (tap)="infoContact()" style="color: #fff;font-size: 12px;\n    width: 137px;\n    padding-top: 10px;\n    padding-bottom: 10px;\n    border-radius: 4px;\n    margin-left: 6px;width: 98px;"\n      [ngStyle]="{\'background-color\': genericService.getColorHex()}">Realizar pedido</button>\n  </ion-fab-list>\n</ion-fab>\n\n<ion-footer class="footer-button-class" *ngIf="totales && totales.listCarritoProveedores?.length > 0 && !recarga && !enCompra">\n  <button (tap)="addToList()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Agregar a una lista</button>\n  <button (tap)="infoContact()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Realizar\n    pedido</button>\n</ion-footer>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/carrito-compras/carrito-compras.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_2__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_11__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_12__angular_common__["c" /* CurrencyPipe */]])
    ], CarritoComprasPage);
    return CarritoComprasPage;
}());

//# sourceMappingURL=carrito-compras.js.map

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], LoadingService);
    return LoadingService;
}());

//# sourceMappingURL=loading.service.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeProveedorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_opciones_menu_opciones_menu__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_historial_pedidos_detail_historial_pedidos_detail__ = __webpack_require__(120);
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
    function HomeProveedorPage(navCtrl, navParams, popoverCtrl, menuCtrl, localStorageEncryptService, genericService, alertaService, loadingService, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.menuCtrl = menuCtrl;
        this.localStorageEncryptService = localStorageEncryptService;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.events = events;
        this.user = null;
        this.pedidos = [];
        this.pedidosReplica = [];
        this.botones = {
            boton1: false,
            boton2: false,
            boton3: false
        };
        /**Obtenci{on de usuario en sesión */
        this.menuCtrl.enable(true);
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.cargarPedidos(null);
        this.events.subscribe("cargarPedidos", function (data) {
            try {
                _this.cargarPedidos(null);
            }
            catch (error) {
            }
        });
    }
    /**Método que es lanzado al deslizar hacia arriba
     * el usuario puede refrescar cada que haya algun problema con
     * su conexión
     */
    HomeProveedorPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            _this.cargarPedidos(refresher);
        }, 2000);
    };
    HomeProveedorPage.prototype.ngOnDestroy = function () {
        this.events.unsubscribe("cargarPedidos");
    };
    HomeProveedorPage.prototype.ionViewDidLoad = function () {
    };
    HomeProveedorPage.prototype.verOpciones = function () {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_6__pages_opciones_menu_opciones_menu__["a" /* OpcionesMenuPage */], {}, { cssClass: "clase-Pop" });
        popover.present({});
    };
    HomeProveedorPage.prototype.cargarPedidos = function (refresher) {
        var _this = this;
        if (refresher === void 0) { refresher = null; }
        var path = "" + __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].pedidosProveedor;
        if (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3) {
            path = "" + __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].pedidosTransportista;
        }
        this.genericService.sendGetRequest(path).subscribe(function (response) {
            _this.pedidos = response;
            if (_this.pedidos.length <= 0) {
                _this.pedidos = null;
            }
            _this.pedidosReplica = _this.pedidos;
            if (refresher) {
                refresher.complete();
            }
        }, function (error) {
            var err = error.error;
            if (refresher) {
                refresher.complete();
            }
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
        console.log(opc);
        console.log(this.pedidos);
        switch (opc) {
            case 1:
                //fecha solicitud
                this.pedidos.sort(function (mayor, menor) {
                    var dateA = __WEBPACK_IMPORTED_MODULE_8_moment__(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate();
                    var dateB = __WEBPACK_IMPORTED_MODULE_8_moment__(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate();
                    console.log(dateA);
                    console.log(dateB);
                    return dateB - dateA;
                    //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
                });
                this.botones.boton1 = !this.botones.boton1;
                break;
            case 2:
                //fecha entrega
                this.pedidos.sort(function (mayor, menor) {
                    var dateA = __WEBPACK_IMPORTED_MODULE_8_moment__(mayor.fechaEntrega, 'DD-MM-YYYY HH:mm:ss').toDate();
                    var dateB = __WEBPACK_IMPORTED_MODULE_8_moment__(menor.fechaEntrega, 'DD-MM-YYYY HH:mm:ss').toDate();
                    return dateB - dateA;
                    //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
                });
                this.botones.boton2 = !this.botones.boton2;
                break;
            case 3:
                //estatus
                this.pedidos.sort(function (mayor, menor) {
                    var a = mayor.estatus.nombre;
                    var b = menor.estatus.nombre;
                    console.log(a);
                    console.log(b);
                    if (a > b) {
                        return -1;
                    }
                    if (b > a) {
                        return 1;
                    }
                    return 0;
                });
                this.botones.boton3 = !this.botones.boton3;
                break;
            case 4:
                //fecha solicitud
                this.pedidos.sort(function (mayor, menor) {
                    var dateA = __WEBPACK_IMPORTED_MODULE_8_moment__(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate();
                    var dateB = __WEBPACK_IMPORTED_MODULE_8_moment__(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate();
                    console.log(dateA);
                    console.log(dateB);
                    return dateA - dateB;
                    //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
                });
                this.botones.boton1 = !this.botones.boton1;
                break;
            case 5:
                //fecha entrega
                this.pedidos.sort(function (mayor, menor) {
                    var dateA = __WEBPACK_IMPORTED_MODULE_8_moment__(mayor.fechaEntrega, 'DD-MM-YYYY HH:mm:ss').toDate();
                    var dateB = __WEBPACK_IMPORTED_MODULE_8_moment__(menor.fechaEntrega, 'DD-MM-YYYY HH:mm:ss').toDate();
                    return dateA - dateB;
                    //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
                });
                this.botones.boton2 = !this.botones.boton2;
                break;
            case 6:
                //estatus
                this.pedidos.sort(function (mayor, menor) {
                    var a = mayor.estatus.nombre;
                    var b = menor.estatus.nombre;
                    console.log(a);
                    console.log(b);
                    if (a < b) {
                        return -1;
                    }
                    if (b < a) {
                        return 1;
                    }
                    return 0;
                });
                this.botones.boton3 = !this.botones.boton3;
                break;
        }
        console.log(this.pedidos);
    };
    HomeProveedorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-home-proveedor',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages-proveedor/home-proveedor/home-proveedor.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Bienvenid@</ion-title>\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="verOpciones()">\n        <ion-icon name="md-more" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="circles" refreshingText="">\n    </ion-refresher-content>\n  </ion-refresher>\n  <div class="spinner-carrito" *ngIf="pedidos && pedidos.length <= 0">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <div class="filtros" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" *ngIf="pedidos && pedidos?.length > 0">\n    <button (click)="ordenPor(1)" *ngIf="!botones.boton1">\n      <div style="font-size: 12px;">Fecha solicitud</div>\n      <ion-icon name="ios-calendar-outline"></ion-icon>\n    </button>\n    <button (click)="ordenPor(4)" *ngIf="botones.boton1">\n      <div style="font-size: 12px;">Fecha solicitud</div>\n      <ion-icon name="ios-calendar"></ion-icon>\n    </button>\n    <button (click)="ordenPor(2)" *ngIf="!botones.boton2">\n      <div style="font-size: 12px;">Fecha entrega</div>\n      <ion-icon name="ios-list-box-outline"></ion-icon>\n    </button>\n    <button (click)="ordenPor(5)" *ngIf="botones.boton2">\n      <div style="font-size: 12px;">Fecha entrega</div>\n      <ion-icon name="ios-list-box"></ion-icon>\n    </button>\n    <button (click)="ordenPor(3)" *ngIf="!botones.boton3">\n      <div style="font-size: 12px;">Estatus</div>\n      <ion-icon name="ios-checkbox-outline"></ion-icon>\n    </button>\n    <button (click)="ordenPor(6)" *ngIf="botones.boton3">\n      <div style="font-size: 12px;">Estatus</div>\n      <ion-icon name="ios-checkbox"></ion-icon>\n    </button>\n  </div>\n\n  <ion-list *ngIf="pedidos && pedidos?.length > 0">\n    <ion-item class="item-list-card" *ngFor="let p of pedidos" (click)="viewDetail(p)">\n      <ion-avatar slot="start">\n        <img src="assets/imgs/pedidos/entrega.png" alt="">\n      </ion-avatar>\n      <div class="datos-tarjetas">\n        <div class="name">Pedido <strong>{{p.folio}}</strong></div>\n        <div class="number">Costo <strong>{{p.total | currency}}</strong></div>\n        <div class="number">Fecha Solicitud <strong>{{p.fechaAlta}}</strong></div>\n        <div class="number" *ngIf="p.fechaEntrega">Fecha Entrega <strong>{{p.fechaEntrega}}</strong></div>\n        <div class="number">Estatus <strong>{{p.estatus.nombre}}</strong></div>\n      </div>\n\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages-proveedor/home-proveedor/home-proveedor.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["p" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["k" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_0__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["e" /* Events */]])
    ], HomeProveedorPage);
    return HomeProveedorPage;
}());

//# sourceMappingURL=home-proveedor.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushNotificationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_calificacion_calificacion__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_historial_pedidos_detail_historial_pedidos_detail__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_chat_chat__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var PushNotificationService = /** @class */ (function () {
    function PushNotificationService(loadingService, genericService, localStorageEncryptService, alertCtrl, events, alertaService, app) {
        this.loadingService = loadingService;
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.alertaService = alertaService;
        this.app = app;
        this.user = null;
        this.chatId = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    }
    PushNotificationService.prototype.goToPedido = function (id, goToChat) {
        var _this = this;
        if (goToChat === void 0) { goToChat = false; }
        this.loadingService.show().then(function () {
            var path = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].pedidos + "/";
            if (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2) {
                path = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].proveedor + "/pedidos/";
            }
            else if (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3) {
                path = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].transportista + "/pedidos/";
            }
            _this.genericService.sendGetRequest("" + path + id).subscribe(function (response) {
                if (goToChat) {
                    _this.verChat(response);
                }
                else {
                    _this.loadingService.hide();
                    var nav = _this.app.getActiveNav();
                    nav.push(__WEBPACK_IMPORTED_MODULE_8__pages_historial_pedidos_detail_historial_pedidos_detail__["a" /* HistorialPedidosDetailPage */], { pedido: response });
                }
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
    };
    PushNotificationService.prototype.goToPedidoCalificar = function (id) {
        var _this = this;
        this.loadingService.show().then(function () {
            var path = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].pedidos + "/";
            if (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2 || __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3) {
                path = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].proveedor + "/pedidos/";
            }
            _this.genericService.sendGetRequest("" + path + id).subscribe(function (response) {
                _this.loadingService.hide();
                var nav = _this.app.getActiveNav();
                nav.push(__WEBPACK_IMPORTED_MODULE_0__pages_calificacion_calificacion__["a" /* CalificacionPage */], { pedido: response });
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
    };
    PushNotificationService.prototype.alertaChat = function (mensaje, idPedido) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "<div class='notificacionError'>\n            <div><img class='headerImg' src='assets/imgs/alerts/success.png'/></div>\n            <div class='textoTitle'>" + mensaje + "</div>\n            <div>",
            cssClass: this.genericService.getColorClassTWO(),
            message: null,
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function () {
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.goToPedido(idPedido, true);
                    }
                }
            ]
        });
        alert.present().then(function (result) {
        });
        alert.onDidDismiss(function () {
        });
    };
    PushNotificationService.prototype.verChat = function (pedido) {
        var _this = this;
        var nav = this.app.getActiveNav();
        switch (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo) {
            case 1:
                this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].chats + "/" + this.chatId).subscribe(function (response) {
                    nav.push(__WEBPACK_IMPORTED_MODULE_9__pages_chat_chat__["a" /* ChatPage */], { chat: response, pedido: pedido });
                    //this.navCtrl.push(ListaChatPage, { chats: this.pedido.pedidoProveedores, pedido: this.pedido });
                    _this.loadingService.hide();
                }, function (error) {
                    _this.loadingService.hide();
                    var err = error.error;
                    _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
                break;
            case 2:
                this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].chatsProveedor + pedido.pedidoProveedores[0].id + "/tipoChat/1").subscribe(function (response) {
                    nav.push(__WEBPACK_IMPORTED_MODULE_9__pages_chat_chat__["a" /* ChatPage */], { chat: response, pedido: pedido });
                    _this.loadingService.hide();
                }, function (error) {
                    _this.loadingService.hide();
                    var err = error.error;
                    _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
                break;
            case 3:
                this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].chatsProveedor + pedido.pedidoProveedores[0].id + "/tipoChat/2").subscribe(function (response) {
                    nav.push(__WEBPACK_IMPORTED_MODULE_9__pages_chat_chat__["a" /* ChatPage */], { chat: response, pedido: pedido });
                    //this.navCtrl.push(ChatPage, { chat: response, pedido: this.pedido });
                    _this.loadingService.hide();
                }, function (error) {
                    _this.loadingService.hide();
                    var err = error.error;
                    _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
                break;
        }
    };
    PushNotificationService.prototype.lecturaBackground = function (data) {
        var _this = this;
        console.log(data);
        console.log("-----------------------------------------------");
        var currentPageName = this.app.getActiveNav();
        console.log(currentPageName);
        var currentPage = "";
        if (currentPageName.viewCtrl) {
            currentPage = currentPageName.viewCtrl.name;
        }
        else if (currentPageName.root) {
            currentPage = currentPageName.root.name;
        }
        //Notification was received on device tray and tapped by the user.
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        switch (Number(data.view)) {
            case 1:
                ///Primera pantalla pago a proveedor
                if (this.user && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2) {
                    var pedido_1 = JSON.parse(data.pedidoId);
                    this.events.publish("cargarPedidos");
                    var alert_1 = this.alertCtrl.create({
                        title: 'Confirmación',
                        message: 'Recibiste un nuevo pedido, deseas ir a verlo?',
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
                                    try {
                                        alert_1.dismiss();
                                    }
                                    catch (error) {
                                    }
                                    _this.goToPedido(Number(pedido_1));
                                    //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                }
                            }
                        ]
                    });
                    alert_1.present();
                }
                else if (!this.user && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2) {
                    this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                }
                //this.navCtrl.push(HistorialPedidosDetailPage, { pedido });
                break;
            case 10:
                var idPedidoFromChat = this.localStorageEncryptService.getFromLocalStorage("pedidoChat");
                var chatId = JSON.parse(data.chatId);
                var pedidoId = JSON.parse(data.pedidoId);
                var pedidoReal = false;
                if (idPedidoFromChat) {
                    if (idPedidoFromChat == pedidoId) {
                        pedidoReal = true;
                    }
                    else {
                        pedidoReal = false;
                    }
                }
                if (this.user && !pedidoReal) {
                    this.chatId = chatId;
                    if (currentPage == "ChatPage" && !pedidoReal) {
                        this.alertaService.successAlertGeneric(data.body);
                        this.events.publish("updateChat");
                    }
                    else if (!pedidoReal) {
                        this.alertaChat(data.title + ": " + data.body, pedidoId);
                    }
                }
                else if (!this.user) {
                    this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder ver los chats");
                }
                else {
                    this.events.publish("updateChat");
                }
                break;
            case 2:
                //Notificación confirmación pedido
                var pedidoPedido = this.localStorageEncryptService.getFromLocalStorage("pedidoPedido");
                var pedido_2 = JSON.parse(data.pedidoId);
                var pedidoProveedor = JSON.parse(data.pedidoProveedorId);
                var pedidoPedidoR = false;
                if (pedidoPedido) {
                    if (pedidoPedido == pedido_2) {
                        pedidoPedidoR = true;
                    }
                    else {
                        pedidoPedidoR = false;
                    }
                }
                if (this.user && (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 1 || __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3) && !pedidoPedidoR && currentPage != "HistorialPedidosDetailPage") {
                    this.events.publish("cargarPedidos");
                    var alert_2 = this.alertCtrl.create({
                        title: 'Confirmación',
                        message: data.title + ", deseas ir a verlo?",
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
                                    try {
                                        alert_2.dismiss();
                                    }
                                    catch (error) {
                                    }
                                    _this.goToPedido(Number(pedido_2));
                                    //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                }
                            }
                        ]
                    });
                    alert_2.present();
                }
                else if (!this.user && (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 1 || __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3) && !pedidoPedidoR) {
                    this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                }
                else {
                    this.events.publish("cargarPedidos");
                }
                break;
            case 3:
                var pedidoPedido3 = this.localStorageEncryptService.getFromLocalStorage("pedidoPedido");
                var pedido3 = JSON.parse(data.pedidoId);
                var pedidoProveedor3 = JSON.parse(data.pedidoProveedorId);
                var pedidoPedidoR3 = false;
                if (pedidoPedido3) {
                    if (pedidoPedido3 == pedido3) {
                        pedidoPedidoR3 = true;
                    }
                    else {
                        pedidoPedidoR3 = false;
                    }
                }
                if (this.user && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3 && !pedidoPedidoR3 && currentPage != "HistorialPedidosDetailPage") {
                    var pedido_3 = pedido3;
                    var pedidoProveedor_1 = pedidoProveedor3;
                    this.events.publish("cargarPedidos");
                    var alert_3 = this.alertCtrl.create({
                        title: 'Confirmación',
                        message: data.title + ", deseas ir a verlo?",
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
                                    try {
                                        alert_3.dismiss();
                                    }
                                    catch (error) {
                                    }
                                    _this.goToPedido(Number(pedido_3));
                                    //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                }
                            }
                        ]
                    });
                    alert_3.present();
                }
                else if (!this.user && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3 && !pedidoPedidoR3) {
                    this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                }
                else {
                    this.events.publish("cargarPedidos");
                }
                break;
            case 6:
                var pedidoPedido6 = this.localStorageEncryptService.getFromLocalStorage("pedidoPedido");
                var pedido6 = JSON.parse(data.pedidoId);
                var pedidoProveedor6 = JSON.parse(data.pedidoProveedorId);
                var pedidoPedidoR6 = false;
                if (pedidoPedido6) {
                    if (pedidoPedido6 == pedido6) {
                        pedidoPedidoR6 = true;
                    }
                    else {
                        pedidoPedidoR6 = false;
                    }
                }
                if (this.user && (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3 || __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2) && !pedidoPedidoR6 && currentPage != "HistorialPedidosDetailPage") {
                    var pedido_4 = pedido6;
                    //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
                    this.events.publish("cargarPedidos");
                    var alert_4 = this.alertCtrl.create({
                        title: 'Confirmación',
                        message: data.title + ", deseas ver tu pedido?",
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
                                    try {
                                        alert_4.dismiss();
                                    }
                                    catch (error) {
                                    }
                                    _this.goToPedido(Number(pedido_4));
                                    //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                }
                            }
                        ]
                    });
                    alert_4.present();
                }
                else if (!this.user && (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3 || __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2) && !pedidoPedidoR6) {
                    this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                }
                else {
                    this.events.publish("cargarPedidos");
                }
                break;
            case 4:
                if (this.user && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 1) {
                    var pedido_5 = JSON.parse(data.pedidoId);
                    //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
                    this.events.publish("cargarPedidos");
                    var alert_5 = this.alertCtrl.create({
                        title: 'Pedido Entregado',
                        message: "" + data.title,
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
                                    try {
                                        alert_5.dismiss();
                                    }
                                    catch (error) {
                                    }
                                    _this.goToPedidoCalificar(Number(pedido_5));
                                    //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                }
                            }
                        ]
                    });
                    alert_5.present();
                }
                else if (!this.user && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 1) {
                    this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                }
                break;
            case 12:
                var pedidoPedido7 = this.localStorageEncryptService.getFromLocalStorage("pedidoPedido");
                var pedido7 = JSON.parse(data.pedidoId);
                var pedidoProveedor7 = JSON.parse(data.pedidoProveedorId);
                var pedidoPedidoR7 = false;
                if (pedidoPedido7) {
                    if (pedidoPedido7 == pedido7) {
                        pedidoPedidoR7 = true;
                    }
                    else {
                        pedidoPedidoR7 = false;
                    }
                }
                if (this.user && (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3 || __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2) && !pedidoPedidoR7 && currentPage != "HistorialPedidosDetailPage") {
                    var pedido_6 = pedido7;
                    //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
                    this.events.publish("cargarPedidos");
                    var alert_6 = this.alertCtrl.create({
                        title: 'Confirmación',
                        message: "El transportista est\u00E1 en tu domicilio, deseas ver tu pedido?",
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
                                    try {
                                        alert_6.dismiss();
                                    }
                                    catch (error) {
                                    }
                                    _this.goToPedido(Number(pedido_6));
                                    //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                }
                            }
                        ]
                    });
                    alert_6.present();
                }
                else if (!this.user && (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3 || __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2) && !pedidoPedidoR6) {
                    this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                }
                else {
                    this.events.publish("cargarPedidos");
                }
                break;
        }
    };
    PushNotificationService.prototype.lecturaForeground = function (data) {
        var _this = this;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        console.log("-----------------------------------------------");
        console.log(data);
        var currentPageName = this.app.getActiveNav();
        console.log(currentPageName);
        var currentPage = "";
        if (currentPageName.viewCtrl) {
            currentPage = currentPageName.viewCtrl.name;
        }
        else if (currentPageName.root) {
            currentPage = currentPageName.root.name;
        }
        console.log(currentPage);
        //let parseado:any = JSON.parse(data.pedido);
        //Notification was received in foreground. Maybe the user needs to be notified.
        try {
            switch (Number(data.view)) {
                case 1:
                    ///Primera pantalla pago a proveedor
                    if (this.user && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2) {
                        console.log(data);
                        console.log("..................");
                        console.log(data.data);
                        console.log("..................");
                        var pedido_7 = JSON.parse(data.pedidoId);
                        console.log(pedido_7);
                        this.events.publish("cargarPedidos");
                        /* if (currentPage == "TabsProveedorPage") {
                            this.alertaService.successAlertGeneric("Recibiste un nuevo pedido y hemos actualizado tu lista, para que puedas verlo");
                        } else { */
                        var alert_7 = this.alertCtrl.create({
                            title: 'Confirmación',
                            message: 'Recibiste un nuevo pedido, deseas ir a verlo?',
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
                                        try {
                                            alert_7.dismiss();
                                        }
                                        catch (error) {
                                        }
                                        _this.goToPedido(Number(pedido_7));
                                        //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                    }
                                }
                            ]
                        });
                        alert_7.present();
                        //}
                    }
                    else if (!this.user && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2) {
                        this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                    }
                    //this.navCtrl.push(HistorialPedidosDetailPage, { pedido });
                    break;
                case 10:
                    var idPedidoFromChat = this.localStorageEncryptService.getFromLocalStorage("pedidoChat");
                    var chatId = JSON.parse(data.chatId);
                    var pedidoId = JSON.parse(data.pedidoId);
                    var pedidoReal = false;
                    if (idPedidoFromChat) {
                        if (idPedidoFromChat == pedidoId) {
                            pedidoReal = true;
                        }
                        else {
                            pedidoReal = false;
                        }
                    }
                    if (this.user && !pedidoReal) {
                        this.chatId = chatId;
                        if (currentPage == "ChatPage" && !pedidoReal) {
                            this.alertaService.successAlertGeneric(data.body);
                            this.events.publish("updateChat");
                        }
                        else if (!pedidoReal) {
                            this.alertaChat(data.title + ": " + data.body, pedidoId);
                        }
                    }
                    else if (!this.user) {
                        this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder ver los chats");
                    }
                    else {
                        this.events.publish("updateChat");
                    }
                    break;
                case 2:
                    //Notificación confirmación pedido
                    var pedidoPedido = this.localStorageEncryptService.getFromLocalStorage("pedidoPedido");
                    var pedido_8 = JSON.parse(data.pedidoId);
                    var pedidoProveedor = JSON.parse(data.pedidoProveedorId);
                    var pedidoPedidoR = false;
                    if (pedidoPedido) {
                        if (pedidoPedido == pedido_8) {
                            pedidoPedidoR = true;
                        }
                        else {
                            pedidoPedidoR = false;
                        }
                    }
                    if (this.user && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 1 && !pedidoPedidoR && currentPage != "HistorialPedidosDetailPage") {
                        this.events.publish("cargarPedidos");
                        var alert_8 = this.alertCtrl.create({
                            title: 'Confirmación',
                            message: data.title + ", deseas ir a verlo?",
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
                                        try {
                                            alert_8.dismiss();
                                        }
                                        catch (error) {
                                        }
                                        _this.goToPedido(Number(pedido_8));
                                        //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                    }
                                }
                            ]
                        });
                        alert_8.present();
                    }
                    else if (!this.user && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 1 && !pedidoPedidoR) {
                        this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                    }
                    else {
                        this.events.publish("cargarPedidos");
                    }
                    break;
                case 3:
                    var pedidoPedido3 = this.localStorageEncryptService.getFromLocalStorage("pedidoPedido");
                    var pedido3 = JSON.parse(data.pedidoId);
                    var pedidoProveedor3 = JSON.parse(data.pedidoProveedorId);
                    var pedidoPedidoR3 = false;
                    if (pedidoPedido3) {
                        if (pedidoPedido3 == pedido3) {
                            pedidoPedidoR3 = true;
                        }
                        else {
                            pedidoPedidoR3 = false;
                        }
                    }
                    if (this.user && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3 && !pedidoPedidoR3 && currentPage != "HistorialPedidosDetailPage") {
                        var pedido_9 = pedido3;
                        var pedidoProveedor_2 = pedidoProveedor3;
                        this.events.publish("cargarPedidos");
                        var alert_9 = this.alertCtrl.create({
                            title: 'Confirmación',
                            message: data.title + ", deseas ir a verlo?",
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
                                        try {
                                            alert_9.dismiss();
                                        }
                                        catch (error) {
                                        }
                                        _this.goToPedido(Number(pedido_9));
                                        //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                    }
                                }
                            ]
                        });
                        alert_9.present();
                    }
                    else if (!this.user && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3 && !pedidoPedidoR3) {
                        this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                    }
                    else {
                        this.events.publish("cargarPedidos");
                    }
                    break;
                case 6:
                    var pedidoPedido6 = this.localStorageEncryptService.getFromLocalStorage("pedidoPedido");
                    var pedido6 = JSON.parse(data.pedidoId);
                    var pedidoProveedor6 = JSON.parse(data.pedidoProveedorId);
                    var pedidoPedidoR6 = false;
                    if (pedidoPedido6) {
                        if (pedidoPedido6 == pedido6) {
                            pedidoPedidoR6 = true;
                        }
                        else {
                            pedidoPedidoR6 = false;
                        }
                    }
                    if (this.user && (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3 || __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2) && !pedidoPedidoR6 && currentPage != "HistorialPedidosDetailPage") {
                        var pedido_10 = pedido6;
                        //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
                        this.events.publish("cargarPedidos");
                        var alert_10 = this.alertCtrl.create({
                            title: 'Confirmación',
                            message: data.title + ", deseas ver tu pedido?",
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
                                        try {
                                            alert_10.dismiss();
                                        }
                                        catch (error) {
                                        }
                                        _this.goToPedido(Number(pedido_10));
                                        //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                    }
                                }
                            ]
                        });
                        alert_10.present();
                    }
                    else if (!this.user && (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3 || __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2) && !pedidoPedidoR6) {
                        this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                    }
                    else {
                        this.events.publish("cargarPedidos");
                    }
                    break;
                case 4:
                    if (this.user && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 1) {
                        var pedido_11 = JSON.parse(data.pedidoId);
                        //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
                        this.events.publish("cargarPedidos");
                        var alert_11 = this.alertCtrl.create({
                            title: 'Pedido Entregado',
                            message: "" + data.title,
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
                                        try {
                                            alert_11.dismiss();
                                        }
                                        catch (error) {
                                        }
                                        _this.goToPedidoCalificar(Number(pedido_11));
                                        //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                    }
                                }
                            ]
                        });
                        alert_11.present();
                    }
                    else if (!this.user && __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 1) {
                        this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                    }
                    break;
                case 12:
                    var pedidoPedido7 = this.localStorageEncryptService.getFromLocalStorage("pedidoPedido");
                    var pedido7 = JSON.parse(data.pedidoId);
                    var pedidoProveedor7 = JSON.parse(data.pedidoProveedorId);
                    var pedidoPedidoR7 = false;
                    if (pedidoPedido7) {
                        if (pedidoPedido7 == pedido6) {
                            pedidoPedidoR7 = true;
                        }
                        else {
                            pedidoPedidoR7 = false;
                        }
                    }
                    if (this.user && (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3 || __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2) && !pedidoPedidoR7 && currentPage != "HistorialPedidosDetailPage") {
                        var pedido_12 = pedido7;
                        //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
                        this.events.publish("cargarPedidos");
                        var alert_12 = this.alertCtrl.create({
                            title: 'Confirmación',
                            message: "El transportista est\u00E1 en tu domicilio, deseas ver tu pedido?",
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
                                        try {
                                            alert_12.dismiss();
                                        }
                                        catch (error) {
                                        }
                                        _this.goToPedido(Number(pedido_12));
                                        //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                    }
                                }
                            ]
                        });
                        alert_12.present();
                    }
                    else if (!this.user && (__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 3 || __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].perfil.activo == 2) && !pedidoPedidoR6) {
                        this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                    }
                    else {
                        this.events.publish("cargarPedidos");
                    }
                    break;
            }
        }
        catch (error) {
            console.log(error);
        }
        //this.alertaService.alertaBasica("Soy Luz Radio Notifica", data.body, null);
    };
    PushNotificationService.prototype.evaluateNotification = function (data) {
        if (data.wasTapped) {
            this.lecturaBackground(data);
        }
        else {
            this.lecturaForeground(data);
        }
    };
    PushNotificationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_3__generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1__alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["c" /* App */]])
    ], PushNotificationService);
    return PushNotificationService;
}());

//# sourceMappingURL=pushNotifications.service.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalificacionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CalificacionPage = /** @class */ (function () {
    function CalificacionPage(navCtrl, navParams, genericService, loadingService, alertaService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.loadingService = loadingService;
        this.alertaService = alertaService;
        this.calificacionActual = "Excelente";
        this.stars = [];
        this.queja = "";
        this.nombre = "Juan López Sarrelangue";
        this.pedido = null;
        this.env = __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */];
        this.pedido = navParams.get("pedido");
        this.stars.push({
            selected: true,
            id: 1
        });
        this.stars.push({
            selected: true,
            id: 2
        });
        this.stars.push({
            selected: true,
            id: 3
        });
        this.stars.push({
            selected: true,
            id: 4
        });
        this.stars.push({
            selected: true,
            id: 5
        });
    }
    CalificacionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CalificacionPage');
    };
    CalificacionPage.prototype.selecciona = function (star) {
        this.stars.forEach(function (element) {
            element.selected = false;
        });
        for (var index = 0; index < this.stars.length; index++) {
            var element = this.stars[index];
            if (element.id <= star.id) {
                element.selected = true;
            }
        }
        switch (star.id) {
            case 1:
                this.calificacionActual = "Pésimo";
                break;
            case 2:
                this.calificacionActual = "Malo";
                break;
            case 3:
                this.calificacionActual = "Regular";
                break;
            case 4:
                this.calificacionActual = "Bueno";
                break;
            case 5:
                this.calificacionActual = "Excelente";
                break;
        }
    };
    CalificacionPage.prototype.enviar = function () {
        var _this = this;
        this.loadingService.show().then(function () {
            var cal = 1;
            _this.stars.forEach(function (element) {
                if (element.selected) {
                    cal = element.id;
                }
            });
            var body = {
                pedidoProveedorId: _this.pedido.id,
                calificacionServicio: cal,
                comentarios: _this.queja
            };
            _this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].calificacionServicio, body).subscribe(function (response) {
                _this.loadingService.hide();
                _this.navCtrl.pop();
                _this.alertaService.successAlertGeneric("Tu calificación ha sido enviada, gracias.");
            }, function (error) {
                _this.loadingService.hide();
                _this.alertaService.errorAlertGeneric("Ocurrió un error, intenta nuevamente");
            });
        });
    };
    CalificacionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-calificacion',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/calificacion/calificacion.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Calificar</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div style="text-align: center;\n  padding: 15px;\n  font-size: 20px;\n  font-weight: 400;">{{nombre}}</div>\n  <div class="vendor" *ngIf="!pedido">\n    <img src="assets/imgs/chat/vendor.png" alt="">\n  </div>\n  <div class="vendor" *ngIf="pedido">\n    <img src="assets/imgs/chat/vendor.png" *ngIf="!p.proveedor.transportista.usuario.adjuntoId">\n    <img src="{{env.getImagenIndividual}}{{p.proveedor.transportista.usuario.adjuntoId}}" *ngIf="p.proveedor.transportista.usuario.adjuntoId"/>\n  </div>\n  <div class="calificacion">\n    <div class="texto">{{calificacionActual}}</div>\n    <div class="contenedor-stars">\n      <div *ngFor="let s of stars" class="estrella" [ngStyle]="{\'color\': genericService.getColorHex()}" (click)="selecciona(s)">\n        <ion-icon name="ios-star" *ngIf="s.selected" (click)="selecciona(s)"></ion-icon>\n        <ion-icon name="ios-star-outline" *ngIf="!s.selected" (click)="selecciona(s)"></ion-icon>\n      </div>\n    </div>\n    <div class="queja">\n      <textarea name="" id="" cols="30" rows="4" [(ngModel)]="queja" placeholder="Escríbe aquí que salió bien o mal"></textarea>\n    </div>\n  </div>\n</ion-content>\n<ion-footer class="footer-button-class">\n  <button (tap)="enviar()" [ngStyle]="{\'background-color\': genericService.getColorHex()}" style="width:100%;font-size: 20px;">Enviar</button>\n</ion-footer>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/calificacion/calificacion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */]])
    ], CalificacionPage);
    return CalificacionPage;
}());

//# sourceMappingURL=calificacion.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QrPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
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
        this.qrCode = this.pedido.token;
    }
    QrPage.prototype.ionViewDidLoad = function () {
        console.log(this.qrCode);
    };
    QrPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-qr',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/qr/qr.html"*/'<ion-header>\n    <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n      <ion-title>Terminar servicio</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n<ion-content padding>\n\n    <div class="titlee" [ngStyle]="{\'border-color\' : genericService.getColorHex()}">Pedido: <strong>{{pedido.folio}}</strong></div>\n    <div class="titlee" [ngStyle]="{\'border-color\' : genericService.getColorHex()}">Proveedor: <strong>{{pedido.proveedor.nombre}}</strong></div>\n    <div class="titlee" [ngStyle]="{\'border-color\' : genericService.getColorHex()}" style="margin-bottom: 40px">Código: <strong>{{pedido.token}}</strong></div>\n\n    <div class="miqr">\n        <qrcode [qrdata]="qrCode"></qrcode>\n    </div>\n\n    <div style="    margin-top: 20px;\n    font-size: 17px;\n    text-align: center;">Muestra este código QR a la persona que entrega el pedido</div>\n\n    \n</ion-content>\n'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/qr/qr.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__services_generic_service__["a" /* GenericService */]])
    ], QrPage);
    return QrPage;
}());

//# sourceMappingURL=qr.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DireccionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_geo_proveedores_home_geo_proveedores__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(8);
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
            _this.cargarDireccionesLista(data.fromLogin);
        });
    }
    DireccionesPage.prototype.ionViewDidLoad = function () {
    };
    DireccionesPage.prototype.cargarDireccionesLista = function (fromLogin) {
        var _this = this;
        if (fromLogin === void 0) { fromLogin = false; }
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].direcciones).subscribe(function (response) {
            //quitar
            _this.listaDirecciones = response;
            _this.render = true;
            if (_this.listaDirecciones.length <= 0) {
                if (!fromLogin) {
                    _this.alertaService.warnAlertGeneric("Aún no cuentas con direcciones frecuentes");
                }
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
            selector: 'page-direcciones',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/direcciones/direcciones.html"*/'<ion-header *ngIf="!fromPop">\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>Mis direcciones</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content [ngStyle]="{\'padding\': !fromPop ? \'16px\' : \'0px\'}">\n  <div class="spinner-carrito" *ngIf="!render">\n    <ion-spinner></ion-spinner>\n  </div>\n  <div *ngIf="fromPop" style="padding: 10px;\n  text-align: center;\n  color: #fff;" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    Selecciona una dirección frecuente\n  </div>\n\n  <ion-list *ngIf="!fromPop">\n    <ion-item-sliding #item *ngFor="let card of listaDirecciones">\n      <ion-item class="item-list-card" (click)="view(card)">\n        <ion-avatar slot="start">\n          <img src="assets/imgs/direcciones/maps-and-flags.png" alt="">\n        </ion-avatar>\n        <div class="datos-tarjetas">\n          <div class="name">{{card.alias}}</div>\n          <div class="number">{{card.direccion.direccion}}</div>\n        </div>\n      </ion-item>\n\n      <ion-item-options side="right">\n        <button ion-button (click)="borrar(card)" color="danger">\n          <ion-icon name="ios-trash-outline"></ion-icon>\n          Borrar\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n  <ion-list *ngIf="fromPop">\n    <ion-item class="item-list-card" (click)="select(card)" *ngFor="let card of listaDirecciones">\n      <ion-avatar slot="start">\n        <img src="assets/imgs/direcciones/maps-and-flags.png" alt="">\n      </ion-avatar>\n      <div class="datos-tarjetas">\n        <div class="name">{{card.alias}}</div>\n        <div class="number">{{card.direccion.direccion}}</div>\n      </div>\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-fab bottom right class="fab-cards animated swing" *ngIf="!fromPop">\n  <button ion-fab (click)="nuevaLista()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <ion-icon name="add"></ion-icon>\n  </button>\n</ion-fab>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/direcciones/direcciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["r" /* ViewController */]])
    ], DireccionesPage);
    return DireccionesPage;
}());

//# sourceMappingURL=direcciones.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__carrito_compras_carrito_compras__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recuperar_password_recuperar_password__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__historial_pedidos_historial_pedidos__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(5);
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
    function TabsPage(genericService, localStorageEncryptService, app, events) {
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.app = app;
        this.events = events;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_6__historial_pedidos_historial_pedidos__["a" /* HistorialPedidosPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__recuperar_password_recuperar_password__["a" /* ProveedorPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_0__carrito_compras_carrito_compras__["a" /* CarritoComprasPage */];
        this.user = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        var tabbar = document.getElementsByClassName("tabbar");
        console.log(tabbar);
        var hijito = null;
        tabbar[0].childNodes.forEach(function (element) {
            if (element.innerText == "Mi carrito") {
                hijito = element;
            }
        });
        console.log(hijito);
        var component = this;
        hijito.addEventListener("click", function (e) {
            console.log(hijito);
            component.actualizaCarrito();
        });
    };
    TabsPage.prototype.actualizaCarrito = function () {
        console.log("---->");
        //this.events.publish("carritoTab");
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/tabs/tabs.html"*/'<ion-tabs color="{{genericService.getColor()}}" selectedIndex="1">\n  <ion-tab [root]="tab1Root" tabTitle="Buscar" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Proveedores" tabIcon="ios-body"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabTitle="Mi historial" tabIcon="ios-albums-outline" *ngIf="genericService.getUser()"></ion-tab>\n  <ion-tab [root]="tab4Root" [rootParams]="{recarga: true}" tabTitle="Mi carrito" tabIcon="ios-cart-outline" *ngIf="genericService.getUser()" (click)="actualizaCarrito()"></ion-tab>\n\n</ion-tabs>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["e" /* Events */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProveedorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__articulo_proveedores_articulo_proveedores__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__opciones_menu_opciones_menu__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__carrito_compras_carrito_compras__ = __webpack_require__(127);
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
    function ProveedorPage(navCtrl, navParams, genericService, alertaService, loadingService, events, popoverCtrl, menuCtrl, localStorageEncryptService, app) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.events = events;
        this.popoverCtrl = popoverCtrl;
        this.menuCtrl = menuCtrl;
        this.localStorageEncryptService = localStorageEncryptService;
        this.app = app;
        this.proveedores = [];
        this.proveedoresReplica = [];
        this.palabra = "";
        this.totalCarrito = 0;
        this.env = __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */];
        this.user = null;
        this.cargarProveedores();
        this.menuCtrl.enable(true);
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.events.subscribe("reloadUser", function (data) {
            try {
                _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            }
            catch (error) {
            }
        });
        this.events.subscribe("totalCarrito", function (data) {
            try {
                if (data) {
                    _this.totalCarrito = _this.getTotalCarrito(data.fromLogin);
                }
                else {
                    _this.totalCarrito = _this.getTotalCarrito();
                }
            }
            catch (error) {
            }
        });
        this.events.subscribe("totalCarrito2", function (data) {
            try {
                if (data) {
                    _this.totalCarrito = _this.getTotalCarrito(data.fromLogin);
                }
                else {
                    _this.totalCarrito = _this.getTotalCarrito();
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ProveedorPage.prototype.ionViewDidEnter = function () {
        this.events.publish("backHome");
        this.events.publish("backCarrito");
        this.events.publish("backHistorial");
    };
    ProveedorPage.prototype.verCarrito = function () {
        //if (this.genericService.getTotalCarrito() > 0) {
        //nav.pop();
        this.cargarProductosCarrito();
        //}
    };
    ProveedorPage.prototype.cargarProductosCarrito = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].carritoCompras).subscribe(function (response) {
            var nav = _this.app.getRootNav();
            _this.localStorageEncryptService.setToLocalStorage("" + _this.user.id_token, response);
            nav.push(__WEBPACK_IMPORTED_MODULE_9__carrito_compras_carrito_compras__["a" /* CarritoComprasPage */]);
        }, function (error) {
            _this.alertaService.warnAlertGeneric("Agrega artículos al carrito");
        });
    };
    ProveedorPage.prototype.getTotalCarrito = function (fromLogin) {
        var _this = this;
        if (fromLogin === void 0) { fromLogin = false; }
        console.log("-----------------------------------");
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].carritoCompras).subscribe(function (response) {
            _this.localStorageEncryptService.setToLocalStorage("" + _this.user.id_token, response);
            _this.totalCarrito = response.length;
            console.log(_this.totalCarrito);
        }, function (error) {
        });
    };
    ProveedorPage.prototype.verOpciones = function () {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_8__opciones_menu_opciones_menu__["a" /* OpcionesMenuPage */], {}, { cssClass: "clase-Pop" });
        popover.present({});
    };
    ProveedorPage.prototype.ionViewWillLeave = function () {
    };
    ProveedorPage.prototype.cargarProveedores = function () {
        var _this = this;
        this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].proveedoresFull).subscribe(function (response) {
            _this.proveedores = response;
            console.log(_this.proveedores);
            _this.proveedoresReplica = response;
        }, function (error) {
            var err = error.error;
            _this.proveedores = null;
            _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    ProveedorPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log("--->");
        this.events.subscribe('updateProductos', function (data) {
            _this.getTotalCarrito();
        });
        if (this.user) {
            this.getTotalCarrito();
        }
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
        console.log(proveedor);
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].proveedorProductos + "/proveedor/" + proveedor.id).subscribe(function (response) {
                console.log(response);
                _this.loadingService.hide();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__articulo_proveedores_articulo_proveedores__["a" /* ArticuloProveedoresPage */], { productos: response, proveedor: proveedor });
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
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-recuperar-password',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/recuperar-password/recuperar-password.html"*/'<ion-header>\n    <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Proveedores</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only (click)="verCarrito()" class="carrito" *ngIf="user">\n                <ion-badge *ngIf="totalCarrito > 0" [ngStyle]="{\'color\': genericService.getColorHex()}">{{totalCarrito}}</ion-badge>\n                <ion-icon name="ios-cart-outline" style="font-size: 2.4rem;"></ion-icon>\n\n            </button>\n\n            <button ion-button icon-only (click)="verOpciones()">\n                <ion-icon name="md-more" style="font-size: 2.4rem;"></ion-icon>\n            </button>\n\n        </ion-buttons>\n    </ion-navbar>\n    <div class="busca" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n        <input type="text" [(ngModel)]="palabra" placeholder="Escribe aquí tu búsqueda" (keyup)="buscarPorPalabra()">\n    </div>\n</ion-header>\n\n<ion-content>\n    <div class="spinner-carrito" *ngIf="proveedores && proveedores.length <= 0">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of proveedores; let i = index">\n        <!-- <div class="tacha">\n                      <div class="mini-tacha">\n                          <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                          <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                      </div>\n                    </div> -->\n        <div class="container-card" (click)="viewDetailAll(p)">\n            <!-- <img src="{{p.usuario.image_url}}" *ngIf="p.usuario.image_url" />\n            <img src="assets/imgs/menu/arrows.png" *ngIf="!p.usuario.image_url" /> -->\n\n            <img src="{{env.getImagenIndividual}}{{p.usuario.adjunto_id}}" *ngIf="p.usuario.adjunto_id"/>\n            <img src="assets/imgs/menu/arrows.png" *ngIf="!p.usuario.adjunto_id" /> \n        </div>\n        <div class="container-text" (click)="viewDetailAll(p)">{{p.nombre}}</div>\n        <div class="description" (click)="viewDetailAll(p)"><strong>Empresa</strong></div>\n        <div class="precio" (click)="viewDetailAll(p)" *ngIf="p.empresa">{{p.empresa.nombre}}</div>\n        <div class="precio" (click)="viewDetailAll(p)" *ngIf="!p.empresa">-</div>\n    </div>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/recuperar-password/recuperar-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["p" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["k" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* App */]])
    ], ProveedorPage);
    return ProveedorPage;
}());

//# sourceMappingURL=recuperar-password.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapaProveedoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__compara_precios_proveedor_compara_precios_proveedor__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_open_native_settings__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_android_permissions__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_leaflet__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_leaflet_knn__ = __webpack_require__(984);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_leaflet_knn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_leaflet_knn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__articulo_proveedores_articulo_proveedores__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_auth_service__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__detalle_producto_detalle_producto__ = __webpack_require__(46);
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
        this.slideProve = false;
        this.geo = null;
        this.proveedorActivo = null;
        this.env = __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */];
        this.user = null;
        this.objGeo = {};
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.proveedoresTotal = navParams.get("proveedores");
        console.log(this.proveedoresTotal);
        this.producto = navParams.get("producto");
        this.slideProve = navParams.get("slideProve");
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
        if (claseTabs[0]) {
            claseTabs[0].style.display = "none";
        }
        this.obtenerLocalizacion();
    };
    MapaProveedoresPage.prototype.ngOnDestroy = function () {
        var claseTabs = document.getElementsByClassName("tabbar");
        if (claseTabs[0]) {
            claseTabs[0].style.display = "flex";
        }
    };
    /**Método que obtiene la geolocalización del usuario
     * se utiliza al hacer click en el boton de posicionamiento
     */
    MapaProveedoresPage.prototype.obtenerLocalizacion = function () {
        //this.loadingService.show().then(() => {
        var _this = this;
        if (this.platform.is("android") && !this.emulado) {
            console.log(1);
            //debugger;
            this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(function (result) {
                console.log(2);
                //debugger;
                if (!result.hasPermission) {
                    console.log(3);
                    _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(function (resReq) {
                        _this.loadingService.hide();
                        _this.navCtrl.pop();
                    });
                }
                else {
                    console.log(4);
                    _this.diagnostic.isLocationAvailable().then(function (res) {
                        console.log(5);
                        //debugger;
                        if (!res) {
                            console.log(6);
                            _this.loadingService.hide();
                            //debugger;
                            _this.openNativeSettings.open("location").then(function (res2) {
                                console.log(7);
                                //debugger;
                                _this.loadingService.hide();
                                _this.diagnostic.isLocationAvailable().then(function (res) {
                                    //debugger;
                                    console.log(8);
                                    if (!res) {
                                        _this.navCtrl.pop();
                                        _this.loadingService.hide();
                                        //aqui apagar geolocation
                                        //this.selecciones.cercaDeMi = false;
                                    }
                                    else {
                                        console.log(9);
                                        //debugger;
                                        _this.getPosition();
                                    }
                                });
                            });
                        }
                        else {
                            console.log(10);
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
                    _this.navCtrl.pop();
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
        console.log("getPosition");
        this.geolocation.getCurrentPosition()
            .then(function (response) {
            console.log(response);
            _this.loadMap(response);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    MapaProveedoresPage.prototype.nacional = function () {
        this.map.setZoom(5);
    };
    MapaProveedoresPage.prototype.local = function () {
        this.map.setZoom(15);
        this.map.setCenter(new google.maps.LatLng(this.objGeo.latitude, this.objGeo.longitude));
    };
    MapaProveedoresPage.prototype.loadMap = function (position) {
        var _this = this;
        console.log("-------------------------");
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        this.objGeo.latitude = latitude;
        this.objGeo.longitude = longitude;
        // create a new map by passing HTMLElement
        var mapEle = document.getElementById('map_canvas');
        var myLatLng = { lat: latitude, lng: longitude };
        var gj = __WEBPACK_IMPORTED_MODULE_12_leaflet___default.a.geoJson(this.geo);
        var nearest = __WEBPACK_IMPORTED_MODULE_13_leaflet_knn___default()(gj).nearest([latitude, longitude], 50, 1000000); //5000);//punto de partida, estaciones máximas a encontrar, diámetro de busqueda en metros
        console.log(nearest);
        this.objGeo.nearest = nearest;
        if (nearest.length > 0) {
            // create map
            this.map = new google.maps.Map(mapEle, {
                center: myLatLng,
                zoom: 15
            });
            this.muestraMapa = true;
            google.maps.event.addListenerOnce(this.map, 'idle', function () {
                var primero = 0;
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
                    if (primero == 0) {
                        new google.maps.event.trigger(marker, 'click');
                    }
                    primero++;
                });
                mapEle.classList.add('show-map');
            });
        }
        else {
            this.alertaService.warnAlertGeneric("Lo sentimos, no hay proveedores cerca de tu ubicación");
            this.navCtrl.pop();
        }
    };
    MapaProveedoresPage.prototype.changeInfoCard = function (marker) {
        var position = this.proveedoresTotal.findIndex(function (carrito) {
            return carrito.id == marker.id;
        });
        this.proveedorActivo = this.proveedoresTotal[position];
        console.log(this.proveedorActivo);
    };
    MapaProveedoresPage.prototype.viewDetail = function (producto) {
        var _this = this;
        //consumir servicio de imagenes completas
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.productoId).subscribe(function (response) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_16__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { producto: response });
                _this.loadingService.hide();
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
        //
    };
    MapaProveedoresPage.prototype.comparativa = function () {
        console.log(this.proveedoresGeolocate);
        if (this.slideProve) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__compara_precios_proveedor_compara_precios_proveedor__["a" /* ComparaPreciosProveedorPage */], { proveedoresGeolocate: this.proveedoresGeolocate, multiple: true });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__compara_precios_proveedor_compara_precios_proveedor__["a" /* ComparaPreciosProveedorPage */], { proveedoresGeolocate: this.proveedoresGeolocate });
        }
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
                    _this.events.publish("totalCarrito2");
                    _this.events.publish("carritoTab");
                    //this.events.publish("carritoTab2");
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
    /**Métodos de navegacion del slide */
    MapaProveedoresPage.prototype.next = function () {
        this.slider.slideNext();
    };
    MapaProveedoresPage.prototype.prev = function () {
        this.slider.slidePrev();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_8" /* ViewChild */])('slides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* Slides */])
    ], MapaProveedoresPage.prototype, "slider", void 0);
    MapaProveedoresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-mapa-proveedores',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/mapa-proveedores/mapa-proveedores.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>{{producto.producto.nombre}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="spinner-carrito" *ngIf="!muestraMapa">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <div class="nacionales" *ngIf="proveedorActivo">\n    <button (click)="nacional()">Nacional</button>\n    <button (click)="local()">Local</button>\n  </div>\n\n  <div class="mapp">\n    <div id="map_canvas" class="mapita-google">\n\n    </div>\n    <button *ngIf="proveedorActivo" class="boton-mapa" [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="comparativa()">\n      Comparar precios</button>\n  </div>\n\n  <div class="contenedor-card" *ngIf="proveedorActivo" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <ion-slides autoplay="2000" zoom="true" loop="true" #slides pager="true" *ngIf="slideProve">\n      <ion-slide *ngFor="let p of proveedorActivo.productos; let i=index">\n        <div id="card-{{i}}" class="card animated lightSpeedIn">\n          <!-- <div class="tacha">\n                        <div class="mini-tacha">\n                            <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                            <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                        </div>\n                      </div> -->\n          <div class="container-card" (click)="viewDetail(p)">\n    \n            <img src="{{env.getImagenIndividual}}{{p.producto.adjuntoId}}" />\n          </div>\n          <div class="container-text" (click)="viewDetail(p)">{{p.producto.nombre}}</div>\n          <div class="description" (click)="viewDetail(p)">{{p.producto.descripcion}}</div>\n          <div class="precio" (click)="viewDetail(p)">{{p.precio | currency}}</div>\n    \n          <!-- <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n            <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n              <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">-</div>\n            </div>\n            <div class="cantidad" *ngIf="p.cantidad > 0">\n              <div [ngStyle]="{\'color\': genericService.getColorHex()}">{{p.cantidad}}</div>\n            </div>\n            <div class="mas" (click)="incrementa(p)">\n              <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">+</div>\n            </div>\n          </div> -->\n        </div>\n        <div class="informa">\n          <div class="nombre">{{proveedorActivo.proveedor.nombre}}</div>\n    \n          <div class="ofrece">A tu servicio: </div>\n          <div class="nombre">{{proveedorActivo.proveedor.empresa.nombre}}</div>\n    \n          <div class="ofrece">Estamos ubicados en</div>\n          <div class="nombre">{{proveedorActivo.proveedor.direccion.direccion}}</div>\n          <div class="nombre" *ngIf="proveedorActivo.proveedor.direccion.colonia">col.\n            {{proveedorActivo.proveedor.direccion.colonia}}</div>\n          <div class="nombre">{{proveedorActivo.proveedor.direccion.codigoPostal}}</div>\n        </div>\n    \n        <div class="todos" (click)="viewDetailAll(proveedorActivo)">Ver todos</div>\n        <div class="logo"><img src="assets/imgs/logo.png" alt=""></div>\n      </ion-slide>\n    </ion-slides>\n    \n    <div style="    position: absolute;\n    left: -5px;\n    padding: 10px;\n    top: 35%;\n    z-index: 9;\n    color: #5d5d5d;\n    font-size: 30px;" (click)="prev()" *ngIf="slideProve">\n        <ion-icon name="ios-arrow-back"></ion-icon>\n    </div>\n    <div style="    position: absolute;\n    right: -5px;\n    padding: 10px;\n    top: 35%;\n    z-index: 9;\n    color: #5d5d5d;\n    font-size: 30px;" (click)="next()" *ngIf="slideProve">\n        <ion-icon name="ios-arrow-forward"></ion-icon>\n    </div>\n    \n    <div *ngIf="!slideProve">\n      <div id="card-{{i}}" class="card animated lightSpeedIn">\n        <!-- <div class="tacha">\n                      <div class="mini-tacha">\n                          <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                          <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                      </div>\n                    </div> -->\n        <div class="container-card" (click)="viewDetail(proveedorActivo)">\n  \n          <img src="{{env.getImagenIndividual}}{{proveedorActivo.producto.adjuntoId}}" />\n        </div>\n        <div class="container-text" (click)="viewDetail(proveedorActivo)">{{proveedorActivo.producto.nombre}}</div>\n        <div class="description" (click)="viewDetail(proveedorActivo)">{{proveedorActivo.producto.descripcion}}</div>\n        <div class="precio" (click)="viewDetail(proveedorActivo)">{{proveedorActivo.precio | currency}}</div>\n  \n        <!-- <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n          <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n            <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">-</div>\n          </div>\n          <div class="cantidad" *ngIf="p.cantidad > 0">\n            <div [ngStyle]="{\'color\': genericService.getColorHex()}">{{p.cantidad}}</div>\n          </div>\n          <div class="mas" (click)="incrementa(p)">\n            <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">+</div>\n          </div>\n        </div> -->\n      </div>\n      <div class="informa">\n        <div class="nombre">{{proveedorActivo.proveedor.nombre}}</div>\n  \n        <div class="ofrece">A tu servicio: </div>\n        <div class="nombre">{{proveedorActivo.proveedor.empresa.nombre}}</div>\n  \n        <div class="ofrece">Estamos ubicados en</div>\n        <div class="nombre">{{proveedorActivo.proveedor.direccion.direccion}}</div>\n        <div class="nombre" *ngIf="proveedorActivo.proveedor.direccion.colonia">col.\n          {{proveedorActivo.proveedor.direccion.colonia}}</div>\n        <div class="nombre">{{proveedorActivo.proveedor.direccion.codigoPostal}}</div>\n      </div>\n  \n      <div class="todos" (click)="viewDetailAll(proveedorActivo)">Ver todos</div>\n      <div class="logo"><img src="assets/imgs/logo.png" alt=""></div>\n    </div>\n  </div>\n</ion-content>\n\n<ion-footer class="footer-detalle" *ngIf="proveedorActivo" style="box-shadow: none;background-color: rgba(142, 113, 89, 0.85);">\n  <div class="cont-e">\n    <!-- <div class="suma">\n        <div class="menos" (click)="decrementar(producto)" >\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">-</div>\n        </div>\n        <div class="cantidad" >\n          <div [ngStyle]="{\'color\': genericService.getColorHex()}">{{producto.cantidad}} {{producto.cantidad == 1 ? \'pza\' : \'pzas\'}}</div>\n        </div>\n        <div class="mas" (click)="incrementa(producto)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">+</div>\n        </div>\n      </div> -->\n    <button style="width:100%" (click)="agregarCarrito()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n      Agregar a carrito\n    </button>\n  </div>\n</ion-footer>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/mapa-proveedores/mapa-proveedores.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_4__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_5__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_6__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_open_native_settings__["a" /* OpenNativeSettings */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_15__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]])
    ], MapaProveedoresPage);
    return MapaProveedoresPage;
}());

//# sourceMappingURL=mapa-proveedores.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsProveedorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_proveedor_home_proveedor__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
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
    function TabsProveedorPage(genericService, localStorageEncryptService, app) {
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.app = app;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_proveedor_home_proveedor__["a" /* HomeProveedorPage */];
        this.user = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    }
    TabsProveedorPage.prototype.ionViewDidLoad = function () {
    };
    TabsProveedorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages-proveedor/tabs/tabs.html"*/'<ion-tabs color="{{genericService.getColor()}}">\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages-proveedor/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* App */]])
    ], TabsProveedorPage);
    return TabsProveedorPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListaCarritoComprasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__carrito_historico_carrito_historico__ = __webpack_require__(595);
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
    ListaCarritoComprasPage.prototype.ionViewWillLeave = function () {
        var claseTabs = document.getElementsByClassName("tabbar");
        //claseTabs[0].style.display = "flex";
    };
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
            selector: 'page-lista-carrito-compras',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/lista-carrito-compras/lista-carrito-compras.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>Colecciones</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="spinner-carrito" *ngIf="renderSlide">\n      <ion-spinner></ion-spinner>\n  </div>\n\n  <ion-list>\n      <ion-item-sliding #item *ngFor="let card of listas">\n        <ion-item class="item-list-card" (click)="view(card)">\n          <ion-avatar slot="start">\n            <img src="assets/imgs/lista-carrito/shopping-cart.png" alt="">\n          </ion-avatar>\n          <div class="datos-tarjetas">\n            <div class="name">{{card.nombre}}</div>\n            <div class="number">{{card.fecha}}</div>\n          </div>\n        </ion-item>\n    \n        <ion-item-options side="right">\n          <button ion-button (click)="borrar(card)" color="danger">\n            <ion-icon name="ios-trash-outline"></ion-icon>\n            Borrar\n          </button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/lista-carrito-compras/lista-carrito-compras.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_0__services_loading_service__["a" /* LoadingService */]])
    ], ListaCarritoComprasPage);
    return ListaCarritoComprasPage;
}());

//# sourceMappingURL=lista-carrito-compras.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TerminosCondicionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
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
            selector: 'page-terminos-condiciones',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/terminos-condiciones/terminos-condiciones.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Términos y condiciones</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n    <div style="\n    font-size: 14px;\n    text-align: center;\n    font-weight: 400;\n    ">\n      CONTRATO CLIENTE\n    </div>\n    <div style="\n  font-size: 14px;\n  text-align: center;\n  font-weight: 400;\n  ">\n    Condiciones de Uso\n  </div>\n  <div style="    overflow-y: scroll;\n  height: 100%;\n  font-size: 14px;\n  font-family: monospace;\n  text-align: justify;">\n\n\n    Bienvenido a SHARKIT.com.mx. Servicios Comerciales SHARKIT S.A. DE C.V., y/o sus filiales ("SHARKIT ") le ofrecen\n    funciones de sitio web y otros productos y servicios cuando visita o compra en SHARKIT.com.mx, utiliza los\n    productos o servicios de SHARKIT, usa las aplicaciones de SHARKIT para dispositivos móviles o emplea software\n    puesto a disposición por SHARKIT en relación con lo anterior (colectivamente, los "Servicios de SHARKIT "). SHARKIT\n    le presta los Servicios de SHARKIT bajo las siguientes condiciones.\n\n    Al utilizar los Servicios de SHARKIT, usted acepta estas condiciones. Le rogamos que las lea detenidamente.\n    Ofrecemos una amplia gama de Servicios de SHARKIT y en ocasiones pueden aplicarse condiciones adicionales. Cada vez\n    que utilice cualquier Servicio de SHARKIT (por ejemplo, Tu Perfil, Tarjetas de Regalo, o aplicaciones de SHARKIT\n    para móvil) usted estará igualmente sujeto a los lineamientos, términos y condiciones particulares aplicables a\n    dicho Servicio de SHARKIT (las "Condiciones Generales de los Servicios"). Las Condiciones Generales de los\n    Servicios, prevalecerán sobre las Condiciones de Uso en caso de discrepancia de ambas.\n    PRIVACIDAD\n    Le rogamos que revise nuestro Aviso de Privacidad que también rige el uso que realice de los Servicios de SHARKIT,\n    para que conozca nuestras prácticas.\n    COMUNICACIONES ELECTRÓNICAS\n    Cada vez que utilice un Servicio de SHARKIT o nos envíe un correo electrónico, mensaje de texto y otras\n    comunicaciones de cualquier dispositivo, estará comunicándose electrónicamente con nosotros. Usted acepta recibir\n    comunicaciones de nosotros electrónicamente en una variedad de formas, por ejemplo mediante los siguientes tipos de\n    mensajes de datos: correo electrónico, mensajes de texto, notificaciones automáticas de nuestra app o mediante\n    avisos y mensajes colocados en este sitio web o mediante los demás Servicios de SHARKIT, como nuestro Centro de\n    Mensajes. Usted acepta que todos los contratos, avisos, mensajes, y otras notificaciones y comunicaciones que le\n    enviemos por medios electrónicos satisfacen cualquier requisito legal de forma escrita y cuentan con plenos efectos\n    legales y validez.\n\n    DERECHOS DE AUTOR\n    Todo contenido alojado o puesto a disposición a través de cualquiera de los Servicios de SHARKIT, como por ejemplo\n    texto, gráficos, logotipos, iconos de botones, imágenes, clips de audio, descargas digitales, y recopilaciones de\n    datos son propiedad de SHARKIT o de sus proveedores de contenido y está protegido por las leyes internacionales y\n    de los Estados Unidos Mexicanos (México), de propiedad intelectual. El conjunto de todo el contenido albergado o\n    puesto a disposición a través de cualquier Servicio de SHARKIT es propiedad exclusiva de SHARKIT, y está protegido\n    por las leyes internacionales y de los Estados Unidos Mexicanos de propiedad intelectual.\n\n    MARCAS\n    Puede consultar un listado (no exhaustivo) de las marcas de SHARKIT en el siguiente enlace. De forma adicional, los\n    gráficos, logotipos, encabezados de página, iconos de botón, scripts y nombres de servicio que aparecen incluidos o\n    están disponibles a través de los Servicios de SHARKIT son marcas o representan la imagen comercial de SHARKIT en\n    México y otros países. No podrán utilizarse las marcas registradas ni la imagen comercial de SHARKIT en relación\n    con ningún producto o servicio que no pertenezca a SHARKIT, ni en ninguna forma que fuera susceptible de causar\n    confusión entre los usuarios o que pueda menospreciar o desacreditar a SHARKIT. El resto de marcas registradas que\n    no son propiedad de SHARKIT y que aparecen incluidos o están disponibles a través de los Servicios de SHARKIT\n    pertenecen a sus respectivos propietarios SHARKIT, quienes podrán o no estar afiliados o relacionados de cualquier\n    modo con, o patrocinados por SHARKIT.\n\n    PATENTES\n    Diversas patentes pertenecientes a SHARKIT son aplicables a los Servicios de SHARKIT así como a las funciones y\n    servicios accesibles a través de los mismos. Por otro lado, diferentes partes de los Servicios de SHARKIT operan en\n    virtud de distintas licencias de una o varias patentes. Puede consultar un listado (no exhaustivo) de las\n    correspondientes patentes de SHARKIT y demás patentes de tercero licenciadas a favor de SHARKIT.\n\n    LICENCIA Y ACCESO\n    Sujeto al cumplimiento por parte de usted de estas Condiciones de Uso y las Condiciones Generales de los Servicios\n    aplicables así como al pago del precio aplicable, en su caso, SHARKIT o sus proveedores de contenidos le conceden\n    una licencia limitada no exclusiva, no transferible y no sub-licenciable, de acceso y utilización, a los Servicios\n    de SHARKIT para fines personales no comerciales. Esta licencia no incluye derecho alguno de reventa ni de uso\n    comercial de ninguno de los Servicios de SHARKIT ni de sus contenidos; derecho alguno a compilar ni utilizar lista\n    alguna de productos, descripciones o precios; derecho alguno a realizar ningún uso derivado de los Servicios de\n    SHARKIT ni de sus contenidos; a descargar o copiar información de cuenta alguna para el beneficio de otra empresa;\n    ni el uso de herramientas o robots de búsqueda y extracción de datos o similar. SHARKIT y sus licenciantes,\n    proveedores, editores, titulares de derechos u otros proveedores de contenidos se reservan cualquier derecho que no\n    esté expresamente comprendido en estas Condiciones de Uso o en las Condiciones Generales de los Servicios. No está\n    permitida la reproducción, duplicación, copia, venta, reventa o explotación de ningún tipo de los Servicios de\n    SHARKIT ni de parte alguna de los mismos con fines comerciales, en cada caso sin nuestro previo consentimiento por\n    escrito. Tampoco está permitido colocar o utilizar técnicas de colocación para introducir cualquier marca\n    comercial, logotipo u otra información protegida por derechos de autor (incluyendo imágenes, texto, diseños de\n    página o formatos) de SHARKIT sin el consentimiento correspondiente previo por escrito. No está permitido el uso de\n    metaetiquetas (meta tags) ni de ningún otro "texto oculto" que utilice los nombres o marcas de SHARKIT sin nuestro\n    consentimiento previo y por escrito. No podrá usted hacer un uso incorrecto de los Servicios de SHARKIT. Sólo le\n    está permitido utilizar los Servicios de SHARKIT de forma lícita. Cualquier incumplimiento por usted de estas\n    Condiciones de Uso o de las Condiciones Generales de los Servicios supondrá la terminación de las licencias\n    otorgadas por SHARKIT.\n\n    SU CUENTA\n    Es posible que usted requiera crear una cuenta de SHARKIT propia, acceder a la misma y contar con un método de pago\n    válido asociado a su cuenta para utilizar ciertos Servicios de SHARKIT. En caso de que surja un problema con su\n    método de pago seleccionado, podríamos realizar el cargo a cualquier otro método de pago válido asociado a su\n    cuenta. Si desea administrar sus Opciones de Pago presione aquí. Cuando usted utiliza los Servicios de SHARKIT es\n    usted responsable de mantener la confidencialidad de los datos de su cuenta y su contraseña, así como de restringir\n    el acceso a su computadora y demás dispositivos, y usted asume la responsabilidad de cualesquier actividades\n    realizadas desde su cuenta o utilizando su contraseña.\n\n    SHARKIT comercializa productos para menores de edad, pero los vende a mayores de edad, quienes pueden adquirirlos\n    con una tarjeta de crédito u otro método de pago autorizado. Si es usted menor de 18 años de edad, puede usted\n    utilizar los Servicios de SHARKIT únicamente con la participación e involucramiento de uno de sus padres o tutores.\n    Debes ser mayor de 18 años para comprar bebidas alcohólicas o para navegar los listados relacionados con ellas.\n    SHARKIT se reserva el derecho de dar de baja cuentas, remover o editar contenido, cancelar ordenes en caso de\n    violación a las presentes Condiciones de Uso, Condiciones Generales de los Servicios o cualquier política, términos\n    y condiciones de SHARKIT, derechos de terceros o comisión de un delito o cualquier conducta que dañe la reputación\n    de SHARKIT o la experiencia al cliente.\n\n    OPINIONES, COMENTARIOS, COMUNICACIONES Y OTROS CONTENIDOS\n    Los usuarios podrán publicar sus opiniones, comentarios, fotografías, y otros contenidos; enviar comunicaciones; y\n    someter sugerencias, ideas, comentarios, preguntas u otra información, siempre que el contenido de las mismas no\n    resulte ilícito, obsceno, abusivo, constituya un supuesto de amenaza o difamación, o invada la privacidad de\n    terceros, infrinja derechos de propiedad intelectual o de cualquier otra forma resulte ofensivo para terceros o\n    censurable, ni consista en o contenga virus informáticos, propaganda política o contenido publicitario, correos en\n    cadena, envío masivo de correos o constituya cualquier otro tipo de "spam". No está permitido el uso de direcciones\n    de correo falsas, ni suplantar la identidad de otra persona o entidad, ni falsear de cualquier otro modo el origen\n    de cualquier contenido. SHARKIT no revisa regularmente el contenido publicado, pero nos reservamos el derecho\n    eliminar o modificar dicho contenido.\n\n    Al publicar cualquier contenido o presentar cualquier material para su publicación, y excepto que se indique de\n    otra manera, usted otorga a favor de SHARKIT el derecho no exclusivo, gratuito, perpetuo, irrevocable y susceptible\n    de plena sublicencia para utilizar, reproducir, modificar, adaptar, publicar, traducir, crear y explotar\n    cualesquiera obras derivadas y distribuir y exhibir su contenido en todo el mundo y a través de cualquier medio. La\n    posibilidad de utilizar el sitio web de SHARKIT y los Servicios de SHARKIT es la única compensación por los\n    derechos que nos conceda por el contenido y otros materiales que usted envíe o publique. Usted acepta que la única\n    compensación que usted recibirá por los derechos otorgados a SHARKIT con respecto de los materiales y contenido que\n    usted envíe o publique, es el derecho a utilizar el sitio web de SHARKIT y los Servicios de SHARKIT. Se entiende\n    que lo anterior se otorga por el máximo permitido conforme a la legislación aplicable. Usted otorga a favor de\n    SHARKIT y sus sublicenciatarios el derecho a utilizar el nombre facilitado por usted en relación con dicho\n    contenido, si así lo decidieran. Usted declara y garantiza ser titular o de cualquier otra forma controlar la\n    totalidad de los derechos sobre el contenido que pudiera publicar; que el contenido que usted proporcione es\n    exacto; que la utilización de dicho contenido no supondrá incumplimiento alguno con esta política y no supondrá\n    perjuicio alguno a ninguna persona o entidad; y que usted indemnizará a SHARKIT respecto de cualesquiera\n    reclamaciones en relación con el contenido que usted proporcione. SHARKIT tiene el derecho más no la obligación de\n    monitorear y editar o remover cualquier actividad o contenido. SHARKIT no asume responsabilidad alguna respecto de\n    cualquier contenido publicado por usted o cualquier tercero.\n\n    RECLAMACIONES SOBRE PROPIEDAD INTELECTUAL\n    SHARKIT respeta la propiedad intelectual de terceros. Si usted considera que su trabajo ha sido reproducido de\n    manera tal que constituya una infracción a derechos de propiedad intelectual, le rogamos que utilice nuestro Aviso\n    y Procedimiento para Reclamaciones sobre Infracciones de Propiedad Intelectual.\n\n    RIESGO DE PÉRDIDA\n    Todos los productos comprados en SHARKIT se llevan a cabo a través de un contrato de embarque. La propiedad y el\n    riesgo de pérdida de los productos le será transferida a usted en el momento en que entreguemos los productos al\n    transportista correspondiente. Usted consiente expresamente en que le cobremos su compra ya sea al momento en que\n    le son enviados o, si usted selecciona pagar con tarjetas de regalo o con Saldo SHARKIT al momento en que su orden\n    es procesada.\n\n    SHARKIT.com.mx no asume la titularidad del producto devuelto hasta la recepción del mismo en la dirección de\n    devolución. Nos reservamos el derecho, a nuestra discreción, a reembolsar el importe del producto sin exigir su\n    devolución. En tal caso, la titularidad del producto cuyo precio hubiera sido reembolsado no pasará a\n    SHARKIT.com.mx.\n\n    DESCRIPCIONES DE PRODUCTO\n    Toda la información acerca de los productos contenida en nuestro sitio web se proporciona únicamente con fines\n    informativos. Antes de usar los productos siempre lea las etiquetas, advertencias e instrucciones de uso de los\n    productos. SHARKIT intenta ser tan preciso como sea posible. Sin embargo, SHARKIT no garantiza que las\n    descripciones o el contenido de cualquier otro Servicio de SHARKIT sea preciso, completo, confiable, vigente o\n    libre de errores. Si usted considera que un producto ofrecido en SHARKIT no cumple con su descripción, el único\n    recurso del que usted dispone será devolverlo, siempre y cuando sea devuelto sin haberse utilizado y conforme a la\n    Política de Devoluciones.\n\n    PRECIOS\n    Excepto que se indiquen de manera separada, todos los precios mostrados a través de los Servicios de SHARKIT\n    incluyen impuestos.\n    Salvo en la medida en que se indique lo contrario, el Precio de Lista o Precio Sugerido que aparece para productos\n    en cualquier Servicio de SHARKIT representa el precio de venta al público listado en dicho producto, sugerido por\n    el fabricante o proveedor, o estimado de conformidad con prácticas estándar de la industria; o el precio estimado\n    de venta al público respecto de un producto comparable ofrecido en otro lugar. El Precio de Lista o Precio Sugerido\n    es un estimado de precio comparativo y puede o no representar el precio vigente en todos los lugares en una fecha\n    determinada. Para ciertos productos ofrecidos como un set (juego), el Precio de Lista o el Precio Sugerido podría\n    representar precios de “inventario abierto”, lo cual significa la suma del precio de venta sugerido o estimado por\n    el fabricante para cada uno de los productos incluidos en el set (juego). Cuando el producto sea ofrecido para\n    venta por alguno de nuestros comerciantes, el Precio de Lista o Precio Sugerido podrá ser proporcionado por el\n    comerciante.\n\n    DISPONIBILIDAD\n    Toda la información y detalles respecto de la disponibilidad, envío o entrega de un producto se trata únicamente de\n    estimaciones. Cuando usted realice su pedido, le enviaremos un mensaje confirmando la recepción de su orden. En\n    caso de que por cualquier razón, durante el procesamiento de su orden, el producto ordenado por usted ya no se\n    encontrara disponible, no se realizara cargo alguno respecto de aquellos productos excepto en caso de que usted\n    haya seleccionado pagar con tarjetas de regalo o con Saldo SHARKIT, en cuyo caso el cargo de las mensualidades se\n    efectuará cuando se procese su orden.\n    Si el producto que ordenó no está disponible, le permitiremos pedir el mismo sujeto a la confirmación de\n    inventario. Si no podemos obtener el producto deseado, su pedido no podrá ser confirmado. Para pedidos pagados con\n    tarjetas de regalo o con Saldo SHARKIT, le reembolsaremos la cantidad total que hubiese sido pagada.\n    Únicamente permitimos compras de productos en cantidades correspondientes a las necesidades típicas de un hogar\n    medio. Esto se aplica tanto al número de productos solicitados en un mismo pedido como al supuesto en el que el\n    cliente opta por colocar varios pedidos del mismo producto. En el evento de que un cliente coloque un pedido por\n    múltiples unidades de un mismo producto o múltiples órdenes para el mismo producto, nos reservamos el derecho de\n    reducir el número de productos ordenados.\n\n    GARANTÍA DE LOS PRODUCTOS\n    Varios productos disponibles para compra se encuentran cubiertos por una garantía. Si desea más información\n    respecto a las garantías ofrecidas por SHARKIT por favor visite nuestra página Acerca de las Garantías.\n\n    PERMISOS DE LAS APLICACIONES DE SHARKIT\n    Cuando utilice las apps creadas por SHARKIT, tales como la App de SHARKIT, SHARKIT Shopping App, SHARKIT Kindle\n    App, usted nos puede otorgar ciertos permisos desde su dispositivo. La mayoría de los dispositivos le proporcionan\n    la información de dichos permisos. Si desea más información respecto de dichos permisos, presione aquí.\n\n    CONDICIONES GENERALES SOBRE EL SOFTWARE DE SHARKIT\n    Todo software, incluidas las actualizaciones, mejoras y cualquier otra documentación relacionada con dicho\n    software, que ponemos a disposición de usted en cualquier momento en relación con los Servicios de SHARKIT (el\n    "Software de SHARKIT ") está sujeto, además de las presentes Condiciones de Uso y Venta, a las condiciones que\n    usted puede encontrar aquí.\n\n    OTROS NEGOCIOS\n    Otras Partes distintas a SHARKIT operan tiendas, proporcionan Servicios o venden líneas de productos es este sitio.\n    Asimismo, ofrecemos enlaces a los sitios web de sociedades afiliadas y de otras empresas. No somos responsables de\n    examinar o calificar, ni en ningún caso garantizamos, las ofertas de ninguna de tales empresas o personas físicas,\n    ni el contenido alojado en sus respectivos sitios web. SHARKIT no asume responsabilidad alguna por las acciones,\n    productos y contenidos de ninguna de tales empresas o individuos o cualesquiera otros terceros. Usted debe revisar\n    detenidamente las declaraciones de privacidad y demás condiciones de uso de tales terceros.\n\n\n    EL ROL DE SHARKIT\n    SHARKIT permite a terceras partes ofrecer y vender sus productos en SHARKIT.com.mx lo cual se indica en la página\n    de detalles de estos productos. A pesar de que SHARKIT facilita las transacciones a través de SHARKIT Marketplace,\n    SHARKIT no es ni el comprador ni el vendedor de los productos ofrecidos por terceros vendedores. SHARKIT\n    simplemente facilita un espacio donde compradores y vendedores pueden negociar y efectuar sus transacciones. Por lo\n    tanto, el contrato por la compra de cualquier producto vendido por un tercero vendedor, es celebrado única y\n    exclusivamente entre comprador y al vendedor de dicho producto. SHARKIT no es parte de ese contrato y no asume\n    ninguna responsabilidad relacionada con el mismo, ni actúa como representante del vendedor. El vendedor es\n    responsable de la venta de sus productos así como de ofrecer asistencia en cuanto a las reclamaciones del\n    comprador, o con respecto a cualquier asunto relacionado con dicho contrato entre el comprador y vendedor. No\n    obstante, y debido a que SHARKIT desea garantizar al comprador un espacio seguro donde realizar sus compras,\n    SHARKIT ofrece la Garantía, además de cualquier derecho que el consumidor pueda tener por disposición legal o\n    contractual.\n\n    LIBERACIÓN DE GARANTÍAS Y LIMITACIÓN DE RESPONSABILIDAD\n    LOS SERVICIOS DE SHARKIT Y TODA LA INFORMACIÓN, CONTENIDO, MATERIALES, PRODUCTOS (INCLUYENDO SOFTWARE) Y DEMÁS\n    SERVICIOS INCLUIDOS EN O DE OTRA FORMA DISPONIBLES PARA USTED A TRAVÉS DE LOS SERVICIOS DE SHARKIT SON\n    PROPORCIONADOS POR SHARKIT SOBRE UNA BASE “TAL COMO ESTÁ” Y “SEGÚN ESTÉN DISPONIBLES”, A MENOS QUE SE ESPECIFIQUE\n    DE OTRA FORMA POR ESCRITO. SHARKIT NO REALIZA MANIFESTACIÓN O GARANTÍA ALGUNA DE NATURALEZA ALGUNA, EN FORMA\n    EXPRESA O IMPLÍCITA, EN RELACIÓN CON LA OPERACIÓN DE LOS SERVICIOS DE SHARKIT, O LA INFORMACIÓN, CONTENIDO,\n    MATERIALES, PRODUCTOS (INCLUYENDO SOFTWARE) U OTROS SERVICIOS INCLUIDOS EN O DE OTRA FORMA DISPONIBLES PARA USTED A\n    TRAVÉS DE LOS SERVICIOS DE SHARKIT, A MENOS QUE SE ESPECIFIQUE DE OTRA FORMA POR ESCRITO. USTED ACEPTA EXPRESAMENTE\n    QUE LA UTILIZACIÓN QUE USTED HAGA DE LOS SERVICIOS DE SHARKIT ES A SU PROPIO RIESGO.\n    EN LA MEDIDA EN QUE SEA EL MAXIMO PERMITIDO BAJO LA LEY APLICABLE, SHARKIT RENUNCIA A TODAS LAS GARANTÍAS, EXPRESAS\n    O IMPLÍCITAS, INCLUYENDO SIN LIMITACIÓN GARANTÍAS IMPLÍCITAS DE COMERCIABILIDAD E IDONEIDAD PARA UN PROPÓSITO\n    ESPECÍFICO. SHARKIT NO GARANTIZA QUE LOS SERVICIOS DE SHARKIT, INFORMACIÓN, CONTENIDO, MATERIALES, PRODUCTOS\n    (INCLUYENDO SOFTWARE) Y DEMÁS SERVICIOS INCLUIDOS EN O DE OTRA FORMA DISPONIBLES PARA USTED A TRAVÉS DE LOS\n    SERVICIOS DE SHARKIT, SERVIDORES DE SHARKIT O COMUNICACIONES ELECTRÓNICAS ENVIADAS POR SHARKIT SE ENCUENTREN LIBRES\n    DE VIRUSES U OTROS COMPONENTES DAÑINOS. SHARKIT NO SERÁ RESPONSABLE DE CUALESQUIERA DAÑOS DE NINGUNA NATURALEZA QUE\n    RESULTEN DEL USO DE NINGÚN SERVICIO DE SHARKIT, O DE INFORMACIÓN ALGUNA, CONTENIDO, MATERIALES, PRODUCTOS\n    (INCLUYENDO SOFTWARE) O DEMÁS SERVICIOS INCLUIDOS EN O DE OTRA FORMA DISPONIBLES PARA USTED A TRAVÉS DE LOS\n    SERVICIOS DE SHARKIT, INCLUYENDO SIN LIMITACIÓN DAÑOS DIRECTOS, INDIRECTOS, PUNITIVOS, O EMERGENTES, A MENOS QUE SE\n    ESPECIFIQUE DE OTRA FORMA POR ESCRITO.\n    ALGUNAS LEYES NO PERMITEN LA LIMITACIÓN A GARANTÍAS IMPLÍCITAS O LA EXCLUSIÓN O LIMITACIÓN DE CIERTOS DAÑOS. SI\n    ESTAS LEYES APLICAN A USTED, ES POSIBLE QUE ALGUNAS O TODAS LAS LIBERACIONES, EXCLUSIONES O LIMITACIONES ANTERIORES\n    NO LE RESULTEN APLICABLES, Y USTED PUEDE TENER DERECHOS ADICIONALES. LAS LIBERACIONES, EXCLUSIONES Y LIMITACIONES\n    APLICARÁN EN EL MAXIMO PERMITIDO BAJO LA LEY APLICABLE.\n\n    POLÍTICAS, MODIFICACIÓN E INDEPENDENCIA DE DISPOSICIONES\n    Por favor revise nuestras demás políticas publicadas en este sitio web. Estas políticas también rigen el uso por\n    parte de usted de los Servicios de SHARKIT. Nos reservamos el derecho de efectuar cambios a nuestro sitio web,\n    políticas, Condiciones de los Servicios, y estas Condiciones de Uso en cualquier momento y el uso continuo de los\n    Servicios de SHARKIT por parte de usted acreditará su aceptación de dichos cambios. Si cualquiera de estas\n    condiciones se considera inválida, nula, o inexigible por cualquier causa, dicha condición se considerará\n    independiente y no afectará la validez y exigibilidad de ninguna de las condiciones restantes.\n\n    CONTROVERSIAS\n    Cualquier disputa o reclamación relacionada con el uso de los Servicios SHARKIT, los productos o servicios vendidos\n    o distribuidos por SHARKIT o a través de SHARKIT.com.mx o las presentes Condiciones De Servicio será sometida y\n    resuelta a su elección, ya sea a través de la jurisdicción administrativa de la Procuraduría Federal del Consumidor\n    ("PROFECO") o bien a través de un arbitraje obligatorio conducido por la Comisión de Mediación y Arbitraje de la\n    Cámara Nacional de Comercio ("CANACO") por lo que Usted y nosotros renunciamos a cualquier otra jurisdicción que\n    pudiera corresponder por razón de domicilios o por cualquier otra causa. Usted y nosotros acordamos que tanto usted\n    como nosotros podemos iniciar una demanda ante las cortes competentes a fin de impedir violaciones o el uso\n    indebido de derechos de propiedad intelectual.\n    En el procedimiento arbitral no hay juez ni jurado y la revisión que una corte puede hacer de un laudo arbitral es\n    limitada. Sin embargo, un árbitro puede hacer una condena individual a daños y demás prestaciones, en los mismos\n    términos que una corte, y además debe seguir los términos y condiciones de las Tarjetas de Regalo como lo haría una\n    corte.\n    Para iniciar un procedimiento arbitral, usted debe enviar una carta solicitando un arbitraje y describiendo su\n    reclamación, a la atención de: Attn: Departamento Juridico, Carretera Estatal Amomolulco, Ocoyoacac, km. 2, Barrio\n    de Santa María en Ocoyoacac, México. El arbitraje será administrado por la CANACO bajo sus reglas. Las reglas de la\n    CANACO están disponibles en www.arbitrajecanaco.com.mx por teléfono llamando al 36852269, ext. 1309 o 1310. El pago\n    de todas las cuotas de presentación de la solicitud, gastos administrativos y de los árbitros estarán gobernados\n    por las reglas de la CANACO. Nosotros nos comprometemos a reembolsar todas las cuotas por reclamaciones menores a\n    $145,000 (MXN), a menos que el árbitro determine que la reclamación es frívola. Del mismo modo, nos comprometemos a\n    no demandar costas en el arbitraje, a menos que el árbitro determine que la reclamación es frívola. Usted puede\n    escoger que el arbitraje se conduzca exclusivamente por teléfono o que se base únicamente en la presentación de\n    argumentos y pruebas por escrito; sin embargo, en todos los casos, la sede del arbitraje será la ciudad de Toluca\n    de Lerdo, México. El arbitraje será conducido en español por un solo árbitro y las leyes aplicables serán las de\n    México. Acordamos que cualquier procedimiento de solución de controversias se llevará a cabo sólo de manera\n    individual y no en acciones colectivas, de clase, o acción representativa.\n\n    NUESTRO DOMICILIO\n    Carretera Estatal Amomolulco, Ocoyoacac, km. 2, Barrio de Santa María en Ocoyoacac, México.\n    Para contactarnos vía telefónica favor de dar clic aquí y seleccione "Contáctanos".\n    Aviso y Procedimiento para Realizar Reclamaciones de Infracciones de Propiedad Intelectual\n    Si consideras que tus derechos de propiedad intelectual han sido vulnerados y eres elegible para utilizar Brand\n    Registry, te invitamos a iniciar sesión en este servicio y a remitir tu reclamación a través del mismo. En caso\n    contrario, te invitamos a remitir tu reclamación utilizando nuestro formulario online. Este formulario puede\n    utilizarse para notificar cualquier tipo de reclamación de derechos de propiedad intelectual incluyendo, sin\n    limitación, reclamaciones relacionadas con derechos de propiedad intelectual, marcas, diseños y patentes.\n    Una vez recibamos la reclamación, podremos iniciar diversas actuaciones que podrán incluir la eliminación de la\n    información o producto en cuestión y la supresión de infractores reincidentes cuando resulte procedente. Todas\n    estas actuaciones se llevarán a cabo sin admisión alguna de responsabilidad y sin perjuicio de cualquier derecho,\n    acción o defensa que pudiera asistirnos, todos los cuales quedan expresamente reservados. Lo anterior incluye el\n    derecho a nuestro favor a remitir la reclamación a las partes que hubieran facilitado el contenido supuestamente\n    infractor. Te comprometes a exonerar de responsabilidad a SHARKIT respecto de cualesquiera reclamaciones\n    presentadas por terceros frente a SHARKIT derivadas de o relativas a la presentación de una reclamación.\n    Si prefieres enviar un reporte por escrito, por favor incluye la siguiente información:\n    Una firma autógrafa de la persona facultada para actuar en representación del titular del derecho de propiedad\n    intelectual;\n    Una descripción del trabajo protegido por las leyes de propiedad intelectual respecto del cual usted reclama una\n    infracción;\n    Una descripción del lugar del sitio en que se ubica el material respecto del cual usted reclama una infracción;\n    Su domicilio, número telefónico y dirección de correo electrónico;\n    Una manifestación a su cargo en el sentido de que considera usted de buena fe que el uso en disputa no ha sido\n    autorizado por el titular del derecho, su representante o la ley aplicable;\n    Una manifestación a su cargo bajo protesta de decir verdad, de que la información anterior incluida en su aviso es\n    correcta y que usted es el titular de los derechos de propiedad intelectual o está facultado para actuar en\n    representación del titular de dichos derechos.\n    El Representante de SHARKIT para Derechos de Propiedad Intelectual para el envío de avisos de reclamaciones por\n    infracciones en su sitio web se ubica en la siguiente dirección:\n    Carretera Estatal Amomolulco, Ocoyoacac, km. 2, Barrio de Santa María en Ocoyoacac, México. C.P. 05348 México D.F.\n    E-mail:\n    Favor de tomar nota de que este procedimiento es exclusivamente para notificar a SHARKIT infracciones a los\n    derechos de propiedad intelectual que amparan a su material.\n    Condiciones Adicionales del Software de SHARKIT\n    Utilización del Software de SHARKIT. Usted podrá utilizar el Software de SHARKIT exclusivamente para permitirle\n    utilizar y gozar los Servicios de SHARKIT proporcionados por SHARKIT, y en la medida en que los permitan las\n    Condiciones de Uso, estas Condiciones del Software y cualesquiera Condiciones Generales de los Servicios. Usted no\n    podrá incorporar ninguna porción del Software de SHARKIT a sus propios programas o compilar ninguna porción del\n    mismo en combinación con sus propios programas, transferirlo para uso con otro servicio, o vender, rentar,\n    arrendar, prestar, acreditar, distribuir o sub-licenciar el Software de SHARKIT o de otra forma ceder cualesquier\n    derechos al Software de SHARKIT en todo o en parte. Usted no podrá utilizar el Software de SHARKIT para ningún\n    propósito ilegal. Nosotros podremos dejar de proporcionar cualquier Software de SHARKIT y dar por terminado su\n    derecho a utilizar cualquier Software de SHARKIT en cualquier momento. Sus derechos para utilizar el Software de\n    SHARKIT terminarán automáticamente sin notificación de nuestra parte en caso de que usted incumpla con cualquiera\n    de estas Condiciones del Software, las Condiciones de Uso o cualesquiera otras Condiciones Generales de los\n    Servicios. Pueden aplicar al Software de SHARKIT (o al software incorporado en el Software de SHARKIT) condiciones\n    adicionales de terceros incluidas en o distribuidas con cierto Software de SHARKIT que se identifican\n    específicamente en la documentación aplicable que regirán el uso de dicho software en caso de conflicto con estas\n    Condiciones de Uso. Todo el software utilizado en cualquier Servicio de SHARKIT es propiedad de SHARKIT o sus\n    proveedores de software y se encuentra protegido por las leyes de propiedad intelectual de MÉXICO y por las leyes\n    de la materia aplicables internacionalmente.\n    Utilización de Servicios de Terceros. Cuando usted utiliza el Software de SHARKIT, usted puede asimismo estar\n    utilizando los servicios de uno o más terceros, tales como proveedores de conexión inalámbrica o de servicios de\n    plataforma celular. Su utilización de estos servicios de tercero puede estar sujeta a las políticas, condiciones de\n    uso, y costos de dichos terceros.\n    Prohibición de Realizar Actos de Ingeniería de Reversa. Usted no podrá, ni alentará, asistirá o autorizará a\n    ninguna otra persona a, copiar modificar, ni aplicar ingeniería de reversa, descompilar o desensamblar, o de otra\n    forma manipular, el Software de SHARKIT, en todo ni en parte, ni crear cualesquier trabajos derivados desde o del\n    Software de SHARKIT.\n    Actualizaciones. A efecto de mantener actualizado el Software de SHARKIT, nosotros podremos ofrecer actualizaciones\n    automáticas o manuales en cualquier momento y sin necesidad de notificarlo a usted.\n\n  </div>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/terminos-condiciones/terminos-condiciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__services_generic_service__["a" /* GenericService */]])
    ], TerminosCondicionesPage);
    return TerminosCondicionesPage;
}());

//# sourceMappingURL=terminos-condiciones.js.map

/***/ }),

/***/ 235:
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
webpackEmptyAsyncContext.id = 235;

/***/ }),

/***/ 279:
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
webpackEmptyAsyncContext.id = 279;

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CambioContraseniaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(8);
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
            oldContrasenia: "",
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
        else if (this.data.confirm != this.data.contrasenia) {
            this.alertaService.warnAlertGeneric('La nueva contraseña no coincide con tu confirmación');
        }
        else {
            this.loadingService.show().then(function () {
                var body = {
                    currentPassword: _this.data.oldContrasenia,
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
            selector: 'page-cambio-contrasenia',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/cambio-contrasenia/cambio-contrasenia.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Cambio contraseña</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="correo">\n    <div [ngStyle]="{\'color\': genericService.getColorHex()}">Contraseña actual</div>\n    <input type="password" placeholder="Ingresa aqui" [(ngModel)]="data.oldContrasenia">\n    <div [ngStyle]="{\'color\': genericService.getColorHex()}">Nueva contraseña</div>\n    <input type="password" placeholder="Ingresa aqui" [(ngModel)]="data.contrasenia">\n    <div [ngStyle]="{\'color\': genericService.getColorHex()}" style="margin-top:10px">Confirmar contraseña</div>\n    <input type="password" placeholder="Confirma" [(ngModel)]="data.confirm">\n  </div>\n  <button class="boton" [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="cambio()">\n    Cambiar contraseña\n  </button>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/cambio-contrasenia/cambio-contrasenia.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */]])
    ], CambioContraseniaPage);
    return CambioContraseniaPage;
}());

//# sourceMappingURL=cambio-contrasenia.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnvioTransportistaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EnvioTransportistaPage = /** @class */ (function () {
    function EnvioTransportistaPage(navCtrl, navParams, viewCtrl, genericService, alertaService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.transportistas = null;
        this.transportista = null;
        this.env = __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */];
        this.transportistas = navParams.get("transportistas");
    }
    EnvioTransportistaPage.prototype.ionViewDidLoad = function () {
        this.limpia();
    };
    /**Método para cerrar el modal, sin embargo
     * se envían de vuelta los filtros para manipularlos en la búsqueda
     */
    EnvioTransportistaPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss({});
    };
    EnvioTransportistaPage.prototype.limpia = function () {
        this.transportistas.forEach(function (element) {
            element.seleccionado = false;
        });
    };
    EnvioTransportistaPage.prototype.selecciona = function (t) {
        console.log(t);
        //this.limpia();
        //t.seleccionado = true;
        this.transportista = t;
        console.log(this.transportista);
        this.transportistas.forEach(function (element) {
            if (element.id_transportista != t.id_transportista) {
                element.seleccionado = false;
            }
        });
    };
    EnvioTransportistaPage.prototype.retornarTransportista = function () {
        if (this.transportista && this.transportista.seleccionado) {
            this.viewCtrl.dismiss({ transportista: this.transportista });
        }
        else {
            this.alertaService.warnAlertGeneric("Debes seleccionar un transportista");
        }
    };
    EnvioTransportistaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-envio-transportista',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/pages/envio-transportista/envio-transportista.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>\n      Seleccion de transportista\n    </ion-title>\n\n    <ion-buttons start>\n      <button ion-button (click)="dismiss(false)">\n        <span color="secundary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android, windows" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <section>\n    <ion-list *ngIf="transportistas && transportistas?.length > 0">\n      <ion-item class="item-list-card" *ngFor="let t of transportistas" style="border-bottom: 1px solid #cccccc;">\n        <ion-avatar slot="start" style="vertical-align: middle;">\n          <img src="assets/imgs/transportista/chofer.png" alt="" *ngIf="!t.adjunto_id">\n          <img src="{{env.getImagenIndividual}}{{t.adjunto_id}}" *ngIf="t.adjunto_id" />\n        </ion-avatar>\n        <div class="datos-tarjetas" style="    width: 75%;\n        vertical-align: middle;">\n          <div class="name"><strong>{{t.nombre}}</strong></div>\n          <div class="number"><a (click)="verMaps(t)">{{t.direccion}} {{t.colonia}} {{t.codigo_postal}}</a></div>\n        </div>\n        <div style="    display: inline-block;\n        width: 5%;\n        vertical-align: middle;">\n          <input type="checkbox" id="cbox2" [(ngModel)]="t.seleccionado" (change)="selecciona(t)">\n        </div>\n      </ion-item>\n    </ion-list>\n  </section>\n</ion-content>\n\n<ion-footer class="footer-button-class">\n  <button style="width:100%" (click)="retornarTransportista()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    Aceptar</button>\n</ion-footer>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/pages/envio-transportista/envio-transportista.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1__app_services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_0__app_services_alerta_service__["a" /* AlertaService */]])
    ], EnvioTransportistaPage);
    return EnvioTransportistaPage;
}());

//# sourceMappingURL=envio-transportista.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SqlGenericService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__generic_service__ = __webpack_require__(7);
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




var SqlGenericService = /** @class */ (function () {
    function SqlGenericService(genericService, localStorageEncryptService) {
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
    }
    SqlGenericService.prototype.create = function (data) {
        var sql = "INSERT INTO " + data.table + " (";
        if (data.inserts) {
            var titulosInserts = Object.keys(data.inserts);
            var valoresInserts = Object['values'](data.inserts);
            titulosInserts.forEach(function (select) {
                sql += select + ",";
            });
            sql = sql.slice(0, -1);
            sql += ') VALUES(';
            valoresInserts.forEach(function (select) {
                sql += "" + (select.type == 'string' ? "'" : "") + select.value + (select.type == 'string' ? "'" : "") + ",";
            });
            sql = sql.slice(0, -1);
        }
        var sqli = sql.trim();
        sqli += ')';
        return sqli;
    };
    SqlGenericService.prototype.delete = function (dataSQL) {
        //let sql = 'DELETE FROM tasks WHERE id=?';
        var sql = "DELETE FROM " + dataSQL.table + " WHERE 1=1";
        if (dataSQL.conditions) {
            sql += " ";
            var titulosSelectables = Object.keys(dataSQL.conditions);
            var valoresSelectables = Object['values'](dataSQL.conditions);
            for (var index = 0; index < titulosSelectables.length; index++) {
                var condition = titulosSelectables[index];
                var valor = valoresSelectables[index];
                sql += "AND " + condition + " " + (valor.type ? valor.type : '=') + " " + (valor.type && valor.type == "like" ? '"' : '') + (valor.type && valor.type == "like" ?
                    '%' + valor.value + '%' : valor.value) + (valor.type && valor.type == "like" ? '"' : '');
            }
        }
        return sql;
    };
    SqlGenericService.prototype.getAll = function (dataSQL) {
        var sql = "SELECT * FROM " + dataSQL.table;
        return sql;
    };
    SqlGenericService.prototype.getAllByParams = function (data) {
        var sql = "SELECT ";
        if (data.selectables) {
            data.selectables.forEach(function (select) {
                sql += select + ",";
            });
            sql = sql.slice(0, -1);
        }
        else {
            sql += "*";
        }
        sql += " FROM " + data.table + " WHERE 1=1";
        if (data.conditions) {
            sql += " ";
            var titulosSelectables = Object.keys(data.conditions);
            var valoresSelectables = Object['values'](data.conditions);
            for (var index = 0; index < titulosSelectables.length; index++) {
                var condition = titulosSelectables[index];
                var valor = valoresSelectables[index];
                sql += "AND " + condition + " " + (valor.type ? valor.type : '=') + " " + (valor.type && valor.type == "like" ? '"' : '') + (valor.type && valor.type == "like" ?
                    '%' + valor.value + '%' : valor.value) + (valor.type && valor.type == "like" ? '"' : '');
            }
        }
        return sql;
    };
    SqlGenericService.prototype.update = function (dataSQL) {
        //let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
        var sql = "UPDATE " + dataSQL.table + " SET ";
        if (dataSQL.updates) {
            var titulosUpdates = Object.keys(dataSQL.updates);
            var valoresUpdates = Object['values'](dataSQL.updates);
            for (var index = 0; index < titulosUpdates.length; index++) {
                var propiedad = titulosUpdates[index];
                var valor = valoresUpdates[index];
                sql += propiedad + " = " + (valor.type == 'string' ? "'" : "") + valor.value + (valor.type == 'string' ? "'" : "") + ",";
            }
            sql = sql.slice(0, -1);
        }
        if (dataSQL.conditions) {
            sql += " WHERE 1=1 ";
            var titulosSelectables = Object.keys(dataSQL.conditions);
            var valoresSelectables = Object['values'](dataSQL.conditions);
            for (var index = 0; index < titulosSelectables.length; index++) {
                var condition = titulosSelectables[index];
                var valor = valoresSelectables[index];
                sql += "AND " + condition + " " + (valor.type ? valor.type : '=') + " " + (valor.type && valor.type == "like" ? '"' : valor.type && valor.type == "string" ? "'" : '') + (valor.type && valor.type == "like" ?
                    '%' + valor.value + '%' : valor.value) + (valor.type && valor.type == "like" ? '"' : valor.type && valor.type == "string" ? "'" : '');
            }
        }
        //console.log(sql);
        return sql;
    };
    SqlGenericService.prototype.executeQuery = function (dataSQL) {
        var query = "";
        switch (dataSQL.typeSQL) {
            case 1:
                query = this.create(dataSQL);
                break;
            case 2:
                query = this.getAll(dataSQL);
                break;
            case 3:
                query = this.getAllByParams(dataSQL);
                break;
            case 4:
                query = this.update(dataSQL);
                break;
            case 5:
                query = this.delete(dataSQL);
                break;
            case 6:
                query = dataSQL.querie;
        }
        //console.log(query);
        //console.log(dataSQL.typeSQL);
        var queryEncrypt = this.localStorageEncryptService.encryptBack(query);
        ////console.log(params);
        var request = {
            query: queryEncrypt,
            retorna: dataSQL.typeSQL == 1 ? 3 : dataSQL.typeSQL > 1 && dataSQL.typeSQL < 4 ? 1 : 9,
            push: dataSQL.push ? dataSQL.push : null
        };
        if (request.push !== null && !__WEBPACK_IMPORTED_MODULE_0__environments_environment_prod__["a" /* environment */].emulado) {
            var user = this.localStorageEncryptService.getFromLocalStorage("userSession");
            request.token = user.token;
        }
        else if (request.push !== null && __WEBPACK_IMPORTED_MODULE_0__environments_environment_prod__["a" /* environment */].emulado) {
            var user = this.localStorageEncryptService.getFromLocalStorage("userSession");
            request.token = "tokenFake";
        }
        else {
            request.token = null;
        }
        //console.log(request);
        return this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_0__environments_environment_prod__["a" /* environment */].genericQuerie, request);
        /* .subscribe((response: any) => {
            //console.log(response.parameters);
            response.parameters.forEach(element => {
              this.catalogo.push(element);
            });
          }, (error: HttpErrorResponse) => {
            
            //this.alertaService.errorAlertGeneric("Ocurrió un error,");
          }); */
    };
    SqlGenericService.prototype.returnQuery = function (dataSQL) {
        var query = "";
        switch (dataSQL.typeSQL) {
            case 1:
                query = this.create(dataSQL);
                break;
            case 2:
                query = this.getAll(dataSQL);
                break;
            case 3:
                query = this.getAllByParams(dataSQL);
                break;
            case 4:
                query = this.update(dataSQL);
                break;
            case 5:
                query = this.delete(dataSQL);
                break;
            case 6:
                query = dataSQL.querie;
        }
        //console.log(query);
        //console.log(dataSQL.typeSQL);
        var queryEncrypt = this.localStorageEncryptService.encryptBack(query);
        return queryEncrypt;
        /* .subscribe((response: any) => {
            //console.log(response.parameters);
            response.parameters.forEach(element => {
              this.catalogo.push(element);
            });
          }, (error: HttpErrorResponse) => {
            
            //this.alertaService.errorAlertGeneric("Ocurrió un error,");
          }); */
    };
    SqlGenericService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]])
    ], SqlGenericService);
    return SqlGenericService;
}());

//# sourceMappingURL=sqlGenericService.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListaChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__chat_chat__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ListaChatPage = /** @class */ (function () {
    function ListaChatPage(navCtrl, navParams, genericService, alertaService, loadingService, translatePipe) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.translatePipe = translatePipe;
        this.chats = null;
        this.pedido = null;
        this.chats = navParams.get("chats");
        this.pedido = navParams.get("pedido");
        console.log(this.chats);
        console.log(this.pedido);
    }
    ListaChatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListaChatPage');
    };
    ListaChatPage.prototype.verChat = function (chat) {
        var _this = this;
        this.loadingService.show().then(function () {
            _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].chats + "/" + chat.chatProveedorid).subscribe(function (response) {
                _this.loadingService.hide();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__chat_chat__["a" /* ChatPage */], { chat: response, pedido: _this.pedido });
            }, function (error) {
                _this.loadingService.hide();
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
    };
    ListaChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-lista-chat',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/lista-chat/lista-chat.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>Chats</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list *ngIf="chats && chats?.length > 0">\n    <ion-item class="item-list-card" *ngFor="let c of chats" (click)="verChat(c)" style="border-bottom: 1px solid #ddd;">\n      <ion-avatar slot="start">\n        <img src="assets/imgs/chat/call.png" alt="">\n      </ion-avatar>\n      <div class="datos-tarjetas" style="vertical-align: top;">\n        <div class="name" style="font-size:14px">Pedido</div>\n        <div class="name" style="font-size:14px"><strong>{{c.folio}}</strong></div>\n      </div>\n\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/lista-chat/lista-chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_0__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]])
    ], ListaChatPage);
    return ListaChatPage;
}());

//# sourceMappingURL=lista-chat.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sockjs_client__ = __webpack_require__(943);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sockjs_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sockjs_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_webstomp_client__ = __webpack_require__(974);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_webstomp_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_webstomp_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(8);
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

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerProductosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__(8);
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
        this.env = __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */];
        this.pedidos = navParams.get("pedidos");
        this.pedidos.pedidoProveedores[0].pedidoDetalles.forEach(function (element) {
            element.activado = false;
        });
        console.log(this.pedidos.pedidoProveedores[0].pedidoDetalles);
    }
    VerProductosPage.prototype.ionViewDidLoad = function () {
        var claseTabs = document.getElementsByClassName("tabbar");
        claseTabs[0].style.display = "none";
    };
    VerProductosPage.prototype.ngOnDestroy = function () {
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
            switch (__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].perfil.activo) {
                case 2:
                    var body = {
                        pedidoProveedorId: this.pedidos.pedidoProveedores[0].id,
                        estatusId: 13
                    };
                    this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].pedidosProveedores, body).subscribe(function (response1) {
                        _this.alertaService.successAlertGeneric("El pedido ha sido confirmado");
                        _this.navCtrl.pop();
                    }, function (error) {
                        _this.alertaService.errorAlertGeneric("Ocurrió un error, por favor intenta nuevamente.");
                    });
                    break;
                case 3:
                    var body2 = {
                        pedidoProveedorId: this.pedidos.pedidoProveedores[0].id,
                        estatusId: 14
                    };
                    this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].pedidosProveedores, body2).subscribe(function (response1) {
                        _this.alertaService.successAlertGeneric("El pedido ha sido confirmado");
                        _this.navCtrl.pop();
                    }, function (error) {
                        _this.alertaService.errorAlertGeneric("Ocurrió un error, por favor intenta nuevamente.");
                    });
                    break;
            }
        }
    };
    VerProductosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-ver-productos',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages-proveedor/ver-productos/ver-productos.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>Pedido Checklist</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list *ngIf="pedidos && pedidos?.pedidoProveedores.length > 0">\n    <ion-item class="item-list-card" *ngFor="let p of pedidos.pedidoProveedores[0].pedidoDetalles">\n      <div class="round" style="vertical-align:middle">\n        <input type="checkbox" id="checkbox-{{p.productoProveedor.producto.nombre}}" [(ngModel)]="p.activado"/>\n        <label for="checkbox-{{p.productoProveedor.producto.nombre}}"></label>\n      </div>\n      <div class="datos-tarjetas" style="vertical-align:middle">\n        <div class="name" style="font-size: 15px;">Producto <strong>{{p.productoProveedor.producto.nombre}}</strong></div>\n\n        <div class="number" style="font-size: 13px;">Cantidad <strong>{{p.cantidad}}</strong></div>\n        <div class="number" style="font-size: 13px;">Costo <strong>{{p.total | currency}}</strong></div>\n        \n      </div>\n\n    </ion-item>\n  </ion-list>\n\n  <div class="totals" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n\n      <div>Envio</div>\n      <div>=</div>\n      <div><strong>{{pedidos.pedidoProveedores[0].comisionTransportista | currency}}</strong></div>\n\n      <div>Costo</div>\n      <div>=</div>\n      <div><strong>{{pedidos.pedidoProveedores[0].comisionTransportista + pedidos.total | currency}}</strong></div>\n\n    <div>Total</div>\n    <div>=</div>\n    <div><strong>{{pedidos.total | currency}}</strong></div>\n  </div>\n</ion-content>\n<ion-footer class="footer-button-class">\n    <button (tap)="solicitar()" [ngStyle]="{\'background-color\': genericService.getColorHex()}" *ngIf="env.perfil.activo == 2">Solicitar cambio</button>\n    <button (tap)="confirmar()" [ngStyle]="{\'background-color\': genericService.getColorHex(),\'width\': env.perfil.activo == 3 ? \'100%\' : \'\'}">{{env.perfil.activo == 2 ? \'Confirmar pedido\' : \'Enviar pedido\'}}</button>\n  </ion-footer>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages-proveedor/ver-productos/ver-productos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */]])
    ], VerProductosPage);
    return VerProductosPage;
}());

//# sourceMappingURL=ver-productos.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PedidosDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_calificacion_calificacion__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__qr_qr__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__chat_chat__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__articulo_proveedores_articulo_proveedores__ = __webpack_require__(123);
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
        console.log(this.detalle);
        this.id = navParams.get("id");
    }
    PedidosDetailPage.prototype.ionViewDidLoad = function () {
    };
    PedidosDetailPage.prototype.terminarServicio = function (pedido) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__qr_qr__["a" /* QrPage */], { pedido: pedido });
    };
    PedidosDetailPage.prototype.verChatProveedor = function (pedido) {
        var _this = this;
        console.log(this.detalle);
        if (!pedido.chatProveedorid) {
            this.alertaService.warnAlertGeneric("El proveedor aun no inicia el chat, espera a que él se comunique contigo");
        }
        else {
            this.loadingService.show().then(function () {
                _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].chats + "/" + pedido.chatProveedorid).subscribe(function (response) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__chat_chat__["a" /* ChatPage */], { chat: response, pedido: _this.detalle });
                    _this.loadingService.hide();
                }, function (error) {
                    _this.loadingService.hide();
                    var err = error.error;
                    _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
            });
        }
    };
    PedidosDetailPage.prototype.verChatTransportista = function (pedido) {
        var _this = this;
        if (!pedido.chatTransportistaId) {
            this.alertaService.warnAlertGeneric("El transportista aun no inicia el chat, espera a que él se comunique contigo");
        }
        else {
            this.loadingService.show().then(function () {
                _this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].chats + "/" + pedido.chatTransportistaId).subscribe(function (response) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__chat_chat__["a" /* ChatPage */], { chat: response, pedido: _this.detalle });
                    _this.loadingService.hide();
                }, function (error) {
                    _this.loadingService.hide();
                    var err = error.error;
                    _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
            });
        }
    };
    PedidosDetailPage.prototype.verProductos = function (pedido) {
        /* this.loadingService.show().then(() => {
          this.genericService.sendGetRequest(`${environment.proveedorProductos}/proveedor/${pedido.proveedorId}`).subscribe((response: any) => {
            
    
            this.loadingService.hide();
            this.navCtrl.push(ArticuloProveedoresPage, { productos: response, proveedor : pedido.proveedor });
          }, (error: HttpErrorResponse) => {
            this.loadingService.hide();
            let err: any = error.error;
            this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
          });
        }); */
        var productos = [];
        pedido.pedidoDetalles.forEach(function (element) {
            productos.push(element.productoProveedor);
        });
        console.log(productos);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__articulo_proveedores_articulo_proveedores__["a" /* ArticuloProveedoresPage */], { productos: productos, proveedor: pedido.proveedor, fromCliente: true });
    };
    PedidosDetailPage.prototype.calificar = function (pedido) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__pages_calificacion_calificacion__["a" /* CalificacionPage */], { pedido: pedido });
    };
    PedidosDetailPage.prototype.queja = function (p) {
        var _this = this;
        var body = {
            pedidoProveedorId: p.id
        };
        this.genericService.sendPostRequest("" + __WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__["a" /* environment */].queja, body).subscribe(function (response) {
            _this.alertaService.successAlertGeneric('Un contact center te atenderá en breve');
        }, function (error) {
            _this.alertaService.errorAlertGeneric('No se ha podido contactar al administrador, intenta nuevamente');
        });
    };
    PedidosDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-pedidos-detail',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/pedidos-detail/pedidos-detail.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>Detalle pedido <strong>{{id | number:\'5.\'}}</strong></ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <section>\n      <div style="padding: 15px;\n      font-size: 17px;\n      display: inline-block;\n      width: 85%;">\n        Desliza hacia la izquierda cada pedido para ver mas opciones\n      </div>\n      <div style="padding: 15px;\n      display: inline-block;\n      width: 14%;vertical-align: top;">\n        <img src="assets/imgs/des.png" alt="">\n      </div>\n  </section>\n\n  <ion-list *ngIf="!fromPop">\n    <ion-item-sliding #item *ngFor="let p of detalle">\n      <ion-item class="item-list-card">\n        <div class="datos-tarjetas" (click)="verProductos(p)">\n          <div class="name">{{p.proveedor?.nombre}}</div>\n          <div class="number">{{p.total | currency}}</div>\n          <div class="number">Costo de envío: <strong>{{p.comisionTransportista | currency}}</strong></div>\n          <div class="number">Subtotal: <strong>{{p.total + p.comisionTransportista | currency}}</strong></div>\n        </div>\n        <button ion-button outline item-end (click)="terminarServicio(p)">Terminar pedido</button>\n        <button ion-button outline item-end (click)="calificar(p)" *ngIf="!p.calificacionServicio && p.estatusId == 15">Calificar\n          pedido</button>\n      </ion-item>\n\n      <ion-item-options side="right">\n        <button ion-button (click)="queja(p)" color="danger">\n          <ion-icon name="ios-chatbubbles-outline"></ion-icon>\n          <div>Queja</div>\n          <div>Contact center</div>\n        </button>\n        <button ion-button (click)="verChatProveedor(p)" color="primary">\n          <ion-icon name="ios-chatbubbles-outline"></ion-icon>\n          <div>Chat</div>\n          <div>proveedor</div>\n        </button>\n        <button ion-button (click)="verChatTransportista(p)" color="primary3">\n          <ion-icon name="ios-chatbubbles-outline"></ion-icon>\n          <div>Chat</div>\n          <div>transportista</div>\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/pedidos-detail/pedidos-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_4__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_5__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_6__services_loading_service__["a" /* LoadingService */]])
    ], PedidosDetailPage);
    return PedidosDetailPage;
}());

//# sourceMappingURL=pedidos-detail.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProblemasPedidoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(8);
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
        this.pedido = null;
        this.pedido = navParams.get('pedidoProblem');
    }
    ProblemasPedidoPage.prototype.ionViewDidLoad = function () {
    };
    ProblemasPedidoPage.prototype.queja = function () {
        var _this = this;
        var body = {
            pedidoProveedorId: this.pedido.pedidoProveedores[0].id
        };
        this.genericService.sendPostRequest("" + __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].queja, body).subscribe(function (response) {
            _this.alertaService.successAlertGeneric('Un contact center te atenderá en breve');
        }, function (error) {
            _this.alertaService.errorAlertGeneric('No se ha podido contactar al administrador, intenta nuevamente');
        });
    };
    ProblemasPedidoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-problemas-pedido',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/problemas-pedido/problemas-pedido.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>Problemas con mi pedido</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n    \n  <div class="contened">\n    <div style="width: 100%;\n    text-align: center;">\n        <img style="width: 36%;" src="{{genericService.imgProblema()}}" alt="">\n    </div>\n    <button [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="queja()">\n      Deseo reportar una queja al Contact Center\n    </button>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/problemas-pedido/problemas-pedido.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__["a" /* AlertaService */]])
    ], ProblemasPedidoPage);
    return ProblemasPedidoPage;
}());

//# sourceMappingURL=problemas-pedido.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_action_sheet__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_validation_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__home_geo_proveedores_home_geo_proveedores__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_image_picker__ = __webpack_require__(584);
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
    function RegistroPage(navCtrl, navParams, formBuilder, localStorageEncryptService, camera, translatePipe, actionSheet, alertaService, genericService, loadingService, events, modalController, actionSheetCtrl, imagePicker) {
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
        this.actionSheetCtrl = actionSheetCtrl;
        this.imagePicker = imagePicker;
        this.photo_url = null;
        this.selectOptions = {
            cssClass: 'action-sheet-class'
        };
        this.objetoRegistro = [
            {
                name: "Nombre",
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
        this.env = __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */];
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        var putObj = {};
        switch (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo) {
            case 2:
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
                break;
            case 3:
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
                break;
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
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_4__services_validation_service__["a" /* ValidationService */].minLengthPassValidator);
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_4__services_validation_service__["a" /* ValidationService */].maxLengthPassValidator);
                //tmp[1].push(ValidationService.passwordValidator);
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
    RegistroPage.prototype.registrarOld = function () {
        var _this = this;
        console.log(this.objetoRegistro);
        if (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo == 1 && this.objetoRegistro[7].value != this.objetoRegistro[8].value) {
            this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
        }
        else if (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo == 2 && this.objetoRegistro[9].value != this.objetoRegistro[10].value) {
            this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
        }
        else if (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo == 3 && this.objetoRegistro[9].value != this.objetoRegistro[10].value) {
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
                            file: this.photo_url.split("data:image/jpeg;base64,")[1],
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
                case 3:
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
                        }
                    };
                    break;
            }
            var path_1 = __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].registro;
            if (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo == 2) {
                body_1.tipoPersona = 2;
                path_1 = __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].registro + "/proveedor";
            }
            if (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo == 3) {
                body_1.tipoPersona = 3;
                path_1 = __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].registro + "/transportista";
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
    RegistroPage.prototype.registrar = function () {
        var _this = this;
        console.log(this.objetoRegistro);
        if (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo == 1 && this.objetoRegistro[7].value != this.objetoRegistro[8].value) {
            this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
        }
        else if (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo == 2 && this.objetoRegistro[9].value != this.objetoRegistro[10].value) {
            this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
        }
        else if (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo == 3 && this.objetoRegistro[9].value != this.objetoRegistro[10].value) {
            this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
        }
        else {
            var body_2 = null;
            switch (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo) {
                case 1:
                    body_2 = {
                        login: this.objetoRegistro[6].value,
                        email: this.objetoRegistro[6].value,
                        firstName: this.objetoRegistro[0].value,
                        lastName: this.objetoRegistro[1].value,
                        motherLastName: this.objetoRegistro[2].value,
                        telefono: this.objetoRegistro[4].value,
                        fechaNacimiento: __WEBPACK_IMPORTED_MODULE_12_moment__(this.objetoRegistro[3].value, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm:ss"),
                        genero: this.objetoRegistro[5].value,
                        password: this.objetoRegistro[7].value,
                        activated: true,
                        adjunto: this.photo_url == null || this.photo_url == "null" ? null : {
                            contentType: "image/jpeg",
                            file: this.photo_url,
                            fileName: Math.floor(new Date().getTime() / 1000.0).toString(),
                            size: 0
                        },
                        tipoUsuario: 2
                    };
                    break;
                case 2:
                    body_2 = {
                        login: this.objetoRegistro[6].value,
                        email: this.objetoRegistro[6].value,
                        firstName: this.objetoRegistro[0].value,
                        lastName: this.objetoRegistro[1].value,
                        motherLastName: this.objetoRegistro[2].value,
                        telefono: this.objetoRegistro[4].value,
                        fechaNacimiento: __WEBPACK_IMPORTED_MODULE_12_moment__(this.objetoRegistro[3].value, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm:ss"),
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
                        },
                        tipoUsuario: 3
                    };
                    break;
                case 3:
                    body_2 = {
                        login: this.objetoRegistro[6].value,
                        email: this.objetoRegistro[6].value,
                        firstName: this.objetoRegistro[0].value,
                        lastName: this.objetoRegistro[1].value,
                        motherLastName: this.objetoRegistro[2].value,
                        telefono: this.objetoRegistro[4].value,
                        fechaNacimiento: __WEBPACK_IMPORTED_MODULE_12_moment__(this.objetoRegistro[3].value, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm:ss"),
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
                        tipoUsuario: 4
                    };
                    break;
            }
            var path_2 = __WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].registro;
            /* if (environment.perfil.activo == 2) {
              body.tipoPersona = 2;
              path = `${environment.registro}/proveedor`;
            }
            if (environment.perfil.activo == 3) {
              body.tipoPersona = 3;
              path = `${environment.registro}/transportista`;
            } */
            if (__WEBPACK_IMPORTED_MODULE_11__environments_environment_prod__["a" /* environment */].perfil.activo == 2 && this.objetoRegistro[this.objetoRegistro.length - 1].value.length <= 0) {
                this.alertaService.warnAlertGeneric("Es necesario que ingreses tu dirección");
            }
            else {
                this.loadingService.show().then(function () {
                    _this.genericService.sendPostRequest(path_2, body_2).subscribe(function (response) {
                        _this.loadingService.hide();
                        _this.alertaService.successAlertGeneric("Registro exitoso");
                        _this.navCtrl.pop();
                    }, function (error) {
                        _this.loadingService.hide();
                        var err = error.error;
                        _this.alertaService.errorAlertGeneric(err.message ? err.message : err.description ? err.description : "Ocurrió un error en el servicio, intenta nuevamente");
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
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Selecciona',
            buttons: [
                {
                    text: 'Captura',
                    icon: 'ios-camera-outline',
                    handler: function () {
                        _this.takeFoto();
                    }
                },
                {
                    text: 'Selecciona',
                    icon: 'ios-archive-outline',
                    handler: function () {
                        _this.seleccionaImagen();
                    }
                },
                {
                    text: 'Borrar',
                    icon: 'ios-trash-outline',
                    role: 'destructive',
                    handler: function () {
                        _this.photo_url = null;
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'destructive',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    RegistroPage.prototype.takeFoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            mediaType: this.camera.MediaType.PICTURE // Try this
            ,
            sourceType: this.camera.PictureSourceType.CAMERA,
            allowEdit: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            _this.photo_url = "data:image/jpeg;base64," + imageData;
            //this.gotPhoto(imageData, opc);
        }, function (err) {
            // Handle error
        });
    };
    RegistroPage.prototype.seleccionaImagen = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 1,
            outputType: 1,
            quality: 15
        };
        this.imagePicker.getPictures(options).then(function (results) {
            var i = 1;
            try {
                if (results) {
                    results.forEach(function (imageData) {
                        _this.photo_url = "data:image/jpeg;base64," + imageData;
                    });
                }
            }
            catch (error) {
                _this.alertaService.errorAlertGeneric("Ocurrió un error, intenta nuevamente");
            }
        }, function (err) {
            _this.alertaService.errorAlertGeneric("Ocurrió un error, intenta nuevamente");
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
            selector: 'page-registro',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/registro/registro.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Registro {{env.perfil.activo == 2 ? \'proveedor\' : env.perfil.activo == 3 ? \'transportista\' : \'\'}}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n\n  <div class="contenedor-step-3">\n    <div class="sub-contenedor">\n      <div class="avatar">\n        <div class="imagen" (tap)="opcionesDeImagen()">\n          <img src="assets/imgs/perfil/social-media.png" alt="" *ngIf="!photo_url">\n          <img src="{{photo_url}}" alt="" *ngIf="photo_url">\n        </div>\n      </div>\n\n      <div class="formulario">\n        <form [formGroup]="formGroup">\n          <div *ngFor="let dato of objetoRegistro;let i = index" class="contenedor-input">\n            <div style="    width: 100%;\n            font-size: 14px;\n            color: #123;">{{dato.name}}</div>\n            <input class="inp" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}" type="{{dato.type}}"\n              [(ngModel)]="dato.value" [attr.disabled]="dato.disabled ? \'\' : null" placeholder="{{dato.name}}"\n              maxlength="{{dato.length}}" [ngStyle]="{\'width\': dato.name == \'Dirección\' ? \'88%\' : \'100%\'}" *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\'">\n\n            <div class="direc" *ngIf="dato.name == \'Dirección\'" (click)="getMapa()" style="display: inline-block;\n              width: 10%;\n              vertical-align: bottom;"><img\n                src="assets/imgs/direcciones/home-run.png" alt=""></div>\n\n            <ion-datetime class="dt" [(ngModel)]="dato.value" formControlName="{{dato.formName}}" text-left\n              pickerFormat="DD/MM/YYYY" cancelText="Cancelar" doneText="Aceptar" #fechaNac (ionChange)="ejecutaValidator()"\n              *ngIf="dato.type == \'date\'" placeholder="01/12/2020"></ion-datetime>\n\n            <ion-col col-2 class="text-center" *ngIf="dato.type == \'checkbox\'">\n              <ion-checkbox formControlName="{{dato.formName}}" [(ngModel)]="dato.value" (ionChange)="ejecutaValidator()">\n              </ion-checkbox>\n            </ion-col>\n\n            <ion-select *ngIf="dato.type == \'select\'" [(ngModel)]="dato.value" okText="Ok" cancelText="Cancelar"\n              interface="action-sheet" (ionChange)="ejecutaValidator()" [selectOptions]="selectOptions" formControlName="{{dato.formName}}">\n              <ion-option *ngFor="let op of dato.opts" [value]="op.id">\n                {{op.value}}\n              </ion-option>\n            </ion-select>\n\n            <app-control-messages [control]="formGroup.controls[dato.formName]" [clase]="\'validators2\'">\n            </app-control-messages>\n          </div>\n\n        </form>\n\n      </div>\n    </div>\n  </div>\n</ion-content>\n<ion-footer id="el-footer2" class="animated fadeIn" >\n  <ion-toolbar>\n    <div>\n      <button ion-button style="width: 100%;"\n        (click)="registrar()" [disabled]="btnHabilitado">Registrarme</button>\n    </div>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/registro/registro.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_action_sheet__["a" /* ActionSheet */],
            __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_9__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_10__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_image_picker__["a" /* ImagePicker */]])
    ], RegistroPage);
    return RegistroPage;
}());

//# sourceMappingURL=registro.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetalleProductoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_photoswipe__ = __webpack_require__(975);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_photoswipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_photoswipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_photoswipe_dist_photoswipe_ui_default__ = __webpack_require__(976);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_photoswipe_dist_photoswipe_ui_default___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_photoswipe_dist_photoswipe_ui_default__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_auth_service__ = __webpack_require__(124);
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
        this.fromCarritos = false;
        this.productosTemp = [];
        this.verDescripcion = true;
        this.user = null;
        this.color = "#3b64c0";
        this.producto = navParams.get("producto");
        console.log(this.producto);
        this.fromCarritos = navParams.get("fromCarritos");
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
                _this.actualizarCantidad(data.fromLogin);
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
    DetalleProductoPage.prototype.actualizarCantidad = function (fromLogin) {
        var _this = this;
        if (fromLogin === void 0) { fromLogin = false; }
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
        this.events.publish("carritoTab");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["_8" /* ViewChild */])('slides2'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["q" /* Slides */])
    ], DetalleProductoPage.prototype, "slider2", void 0);
    DetalleProductoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'page-detalle-producto',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/detalle-producto/detalle-producto.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>{{producto.proveedor.nombre}}</ion-title>\n\n\n\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="compartir()">\n        <ion-icon name="md-share" style="font-size: 2.4rem;"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div style="text-align: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  font-size: 17px;\n  font-weight: 600;\n  color: #555656;">\n    {{producto.producto.nombre}}\n  </div>\n  <div class="slider-io animated bounceInLeft" *ngIf="producto.photos.length > 0">\n    <ion-slides autoplay="5000" zoom="true" loop="true" #slides2 loop="false">\n      <ion-slide *ngFor="let photo of producto.photos; let i=index" (click)="imagesLoaded(i)">\n        <div>\n          <img src="{{photo.img}}" alt="">\n          <div class="div-foto">\n            <ion-icon ios="ios-images-outline" md="ios-images-outline"></ion-icon>\n            <p>{{i+1}}/{{producto.photos.length}}</p>\n          </div>\n        </div>\n      </ion-slide>\n    </ion-slides>\n    <div class="arrows-lateral" *ngIf="1===2">\n      <div (tap)="prev1()">\n        <ion-icon ios="ios-arrow-back" md="ios-arrow-back"></ion-icon>\n      </div>\n      <div (tap)="next1()">\n        <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward"></ion-icon>\n      </div>\n    </div>\n  </div>\n\n  <div class="descripcion" [ngStyle]="{\'color\': color}">\n    {{producto.precio | currency}} MXN\n  </div>\n\n  <div class="space-desc">\n    <ion-icon name="ios-arrow-up-outline" *ngIf="verDescripcion" (click)="verDes()"></ion-icon>\n    <ion-icon name="ios-arrow-down-outline" *ngIf="!verDescripcion" (click)="verDes()"></ion-icon>\n    <h4>Descripción</h4>\n    <div class="descripcion-gral" *ngIf="verDescripcion">{{producto.producto.descripcion}}</div>\n  </div>\n\n\n\n  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true" style="z-index: 2;">\n\n    <!-- Background of PhotoSwipe. \n         It\'s a separate element, as animating opacity is faster than rgba(). -->\n    <div class="pswp__bg"></div>\n\n    <!-- Slides wrapper with overflow:hidden. -->\n    <div class="pswp__scroll-wrap">\n\n      <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->\n      <!-- don\'t modify these 3 pswp__item elements, data is added later on. -->\n      <div class="pswp__container">\n        <div class="pswp__item"></div>\n        <div class="pswp__item"></div>\n        <div class="pswp__item"></div>\n      </div>\n\n      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->\n      <div class="pswp__ui pswp__ui--hidden">\n\n        <div class="pswp__top-bar" style="opacity: 1;z-index: 99999999;" [ngStyle]="{\'top\': fixedContentTop == \'56\' ? \'56px\' : \'44px\'}">\n\n          <!--  Controls are self-explanatory. Order can be changed. -->\n\n          <div class="pswp__counter"></div>\n\n          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\n\n          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>\n\n          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\n\n          <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->\n          <!-- element will get class pswp__preloader--active when preloader is running -->\n          <div class="pswp__preloader">\n            <div class="pswp__preloader__icn">\n              <div class="pswp__preloader__cut">\n                <div class="pswp__preloader__donut"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\n          <div class="pswp__share-tooltip"></div>\n        </div>\n\n        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">\n        </button>\n\n        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">\n        </button>\n\n        <div class="pswp__caption">\n          <div class="pswp__caption__center"></div>\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n</ion-content>\n<ion-footer class="footer-detalle" *ngIf="!fromCarritos">\n  <div class="cont-e">\n    <div class="suma">\n      <div class="menos" (click)="decrementar(producto)" >\n        <div [ngStyle]="{\'color\': color, \'border-color\': color}">-</div>\n      </div>\n      <div class="cantidad" >\n        <div [ngStyle]="{\'color\': color}">{{producto.cantidad}} {{producto.cantidad == 1 ? \'pza\' : \'pzas\'}}</div>\n      </div>\n      <div class="mas" (click)="incrementa(producto)">\n        <div [ngStyle]="{\'color\': color, \'border-color\': color}">+</div>\n      </div>\n    </div>\n    <button (click)="agregarCarrito(producto)" [ngStyle]="{\'background-color\': color}">\n      Agregar a carrito\n    </button>\n  </div>\n</ion-footer>\n<!-- Root element of PhotoSwipe. Must have class pswp. -->'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/detalle-producto/detalle-producto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_9__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */]])
    ], DetalleProductoPage);
    return DetalleProductoPage;
}());

//# sourceMappingURL=detalle-producto.js.map

/***/ }),

/***/ 57:
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
            'minilengthpass': "Longitud m\u00EDnima requerida 6 caracteres",
            'maxilengthpass': "Longitud m\u00E1xima requerida 10 caracteres",
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
    ValidationService.minLengthPassValidator = function (control) {
        if (control.value) {
            if (control._pendingValue.length >= 6) {
                return null;
            }
            else {
                if (control._pendingValue.length < 6) {
                    return { 'minilengthpass': true };
                }
                else {
                    return null;
                }
            }
        }
    };
    ValidationService.maxLengthPassValidator = function (control) {
        if (control.value) {
            if (control._pendingValue.length <= 10) {
                return null;
            }
            else {
                if (control._pendingValue.length > 10) {
                    return { 'maxilengthpass': true };
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

/***/ 585:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnvioExternoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EnvioExternoPage = /** @class */ (function () {
    function EnvioExternoPage(navCtrl, navParams, genericService, alertaService, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.viewCtrl = viewCtrl;
        this.pedidoProveedor = null;
        this.cp = null;
        this.carga = false;
        this.envios = [];
        this.envio = null;
        this.pedidoProveedor = navParams.get("pedidoProveedor");
        this.cp = navParams.get("cp");
        console.log(this.pedidoProveedor);
    }
    EnvioExternoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.pedidoProveedor.pedidoDetalles) {
            var pesoMayor_1 = 0;
            var inventario_1 = null;
            this.pedidoProveedor.pedidoDetalles.forEach(function (element) {
                if (element.inventario) {
                    if (Number(element.inventario.peso) > pesoMayor_1) {
                        pesoMayor_1 = Number(element.inventario.peso);
                        inventario_1 = element.inventario;
                    }
                }
            });
            console.log(pesoMayor_1);
            console.log(inventario_1);
            var params = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["e" /* HttpParams */]();
            params = params.set('peso', inventario_1.peso);
            params = params.set('alto', inventario_1.alto);
            params = params.set('ancho', inventario_1.ancho);
            params = params.set('largo', inventario_1.largo);
            params = params.set('origen', this.pedidoProveedor.proveedor.direccion.codigoPostal);
            params = params.set('destino', this.cp);
            //params = params.set('servicio', 2);
            console.log(params);
            this.genericService.sendGetParams("" + __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].cotizaciones, params).subscribe(function (response) {
                console.log(response);
                _this.carga = true;
                var id = 1;
                if (response.parameters) {
                    if (response.parameters.estafeta) {
                        response.parameters.estafeta.forEach(function (element) {
                            element.isDHL = false;
                            element.seleccionado = false;
                            element.id = id;
                            id++;
                            _this.envios.push(element);
                        });
                    }
                    if (response.parameters.dhl) {
                        response.parameters.dhl.forEach(function (element) {
                            element.isDHL = true;
                            element.seleccionado = false;
                            element.id = id;
                            id++;
                            _this.envios.push(element);
                        });
                    }
                }
            }, function (error) {
                var err = error.error;
                _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        }
    };
    EnvioExternoPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EnvioExternoPage.prototype.selecciona = function (t) {
        console.log(t);
        //this.limpia();
        //t.seleccionado = true;
        this.envio = t;
        console.log(this.envio);
        this.envios.forEach(function (element) {
            if (element.id != t.id) {
                element.seleccionado = false;
            }
        });
    };
    EnvioExternoPage.prototype.retornarEnvio = function () {
        if (this.envio && this.envio.seleccionado) {
            this.viewCtrl.dismiss({ envio: this.envio });
        }
        else {
            this.alertaService.warnAlertGeneric("Debes seleccionar un envío");
        }
    };
    EnvioExternoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-envio-externo',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/pages/envio-externo/envio-externo.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title >\n      Envío externo\n    </ion-title>\n\n    <ion-buttons start>\n      <button ion-button (click)="dismiss(false)">\n        <span color="secundary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android, windows" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="spinner-carrito" *ngIf="!carga">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <section *ngIf="carga">\n    <ion-list *ngIf="envios && envios?.length > 0">\n      <ion-item class="item-list-card" *ngFor="let t of envios" style="border-bottom: 1px solid #cccccc;"\n      [ngStyle]="{\'display\': t.costoTotal>0 ? \'block\' : \'none\'}">\n        <ion-avatar slot="start" style="vertical-align: middle;">\n          <img src="assets/imgs/servicios-envio/camionEstafeta.png" alt="" *ngIf="!t.isDHL" style="border-radius: 0px;\n          width: auto;"/>\n          <img src="assets/imgs/servicios-envio/camionDHL.png" *ngIf="t.isDHL" style="border-radius: 0px;\n          width: auto;"/>\n        </ion-avatar>\n        <div class="datos-tarjetas" style="    width: 75%;\n        vertical-align: middle;">\n          <div class="name" style="text-overflow: ellipsis;\n          white-space: nowrap;\n          overflow: hidden;\n          width: 100%;\n          font-size: 15px;">$<strong>{{t.costoTotal}}</strong></div>\n          <div class="number"><strong>{{t.producto}}</strong></div>\n        </div>\n        <div style="    display: inline-block;\n        width: 5%;\n        vertical-align: middle;">\n          <input type="checkbox" id="cbox2" [(ngModel)]="t.seleccionado" (change)="selecciona(t)">\n        </div>\n      </ion-item>\n    </ion-list>\n  </section>\n</ion-content>\n\n<ion-footer class="footer-button-class">\n  <button style="width:100%" (click)="retornarEnvio()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    Aceptar</button>\n</ion-footer>\n'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/pages/envio-externo/envio-externo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__app_services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_0__app_services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* ViewController */]])
    ], EnvioExternoPage);
    return EnvioExternoPage;
}());

//# sourceMappingURL=envio-externo.js.map

/***/ }),

/***/ 586:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filtro_producto_filtro_producto__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detalle_producto_detalle_producto__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_action_sheet__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_Seccion__ = __webpack_require__(981);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__models_Proveedor__ = __webpack_require__(982);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__models_Categoria__ = __webpack_require__(983);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__carrito_compras_carrito_compras__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_string_utils_service__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__opciones_menu_opciones_menu__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__categoria_categoria__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__mapa_proveedores_mapa_proveedores__ = __webpack_require__(217);
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
        this.subscribe = null;
        /**Obtenci{on de usuario en sesión */
        this.menuCtrl.enable(true);
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        //this.totalCarrito = this.getTotalCarrito();
        this.events.subscribe("totalCarrito", function (data) {
            try {
                if (data) {
                    _this.totalCarrito = _this.getTotalCarrito(data.fromLogin);
                }
                else {
                    _this.totalCarrito = _this.getTotalCarrito();
                }
            }
            catch (error) {
            }
        });
        this.events.subscribe("totalCarrito2", function (data) {
            try {
                if (data) {
                    _this.totalCarrito = _this.getTotalCarrito(data.fromLogin);
                }
                else {
                    _this.totalCarrito = _this.getTotalCarrito();
                }
            }
            catch (error) {
                console.log(error);
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
        this.events.subscribe("backHome", function (data) {
            try {
                console.log(_this.navCtrl.length());
                //if(this.navCtrl.length()>1){
                _this.navCtrl.pop();
                //}
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    HomePage.prototype.ionViewWillLeave = function () {
        //this.navCtrl.popAll();
    };
    HomePage.prototype.cargaPromociones = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].promociones).subscribe(function (response) {
            _this.promociones = response;
            _this.verificarCarrito();
        }, function (error) {
            _this.promociones = null;
        });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.events.publish("backProveedor");
        this.events.publish("backCarrito");
        this.events.publish("backHistorial");
    };
    HomePage.prototype.getTotalCarrito = function (fromLogin) {
        var _this = this;
        if (fromLogin === void 0) { fromLogin = false; }
        console.log("-----------------------------------");
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].carritoCompras).subscribe(function (response) {
            _this.localStorageEncryptService.setToLocalStorage("" + _this.user.id_token, response);
            _this.totalCarrito = response.length;
        }, function (error) {
        });
    };
    HomePage.prototype.ngOnDestroy = function () {
        this.events.unsubscribe("updateProductos");
        this.events.unsubscribe("totalCarrito2");
        this.events.unsubscribe("totalCarrito");
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
            _this.alertaService.warnAlertGeneric("Agrega artículos al carrito");
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
    HomePage.prototype.borraPalabra = function () {
        this.dataFilter.nombre = "";
        this.buscarPorFiltros();
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
        var params = new __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["e" /* HttpParams */]();
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
        if (this.subscribe) {
            this.subscribe.unsubscribe();
            console.log("<--");
        }
        else {
            console.log("-->");
        }
        this.productosBuscados = [];
        this.subscribe = this.genericService.sendGetParams(__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].proveedorProductos + "/search", params).subscribe(function (response) {
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
                    text: 'Cancelar',
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
        //if (this.genericService.getTotalCarrito() > 0) {
        //nav.pop();
        this.cargarProductosCarrito();
        //}
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
        var productoNew = {
            producto: {
                nombre: "Proveedores"
            }
        };
        if (this.user && this.user.parametros.pantalla_proveedores == "S") {
            console.log(this.productosBuscados);
            var unique = this.productosBuscados.filter(function (valorActual, indiceActual, arreglo) {
                //Podríamos omitir el return y hacerlo en una línea, pero se vería menos legible
                return arreglo.findIndex(function (valorDelArreglo) { return valorDelArreglo.proveedorId === valorActual.proveedorId; }) === indiceActual;
            });
            var proveedoresGroup_1 = [];
            unique.forEach(function (prov) {
                prov.productos = [];
                _this.productosBuscados.forEach(function (element) {
                    if (element.proveedorId == prov.proveedorId) {
                        prov.productos.push(element);
                    }
                });
                proveedoresGroup_1.push(prov);
            });
            console.log(proveedoresGroup_1);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_18__mapa_proveedores_mapa_proveedores__["a" /* MapaProveedoresPage */], { proveedores: proveedoresGroup_1, producto: productoNew, slideProve: true });
        }
        else {
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
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Productos</ion-title>\n\n\n\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="verCarrito()" class="carrito" *ngIf="user">\n        <ion-badge *ngIf="totalCarrito > 0" [ngStyle]="{\'color\': genericService.getColorHex()}">{{totalCarrito}}</ion-badge>\n        <ion-icon name="ios-cart-outline" style="font-size: 2.4rem;"></ion-icon>\n\n      </button>\n\n      <button ion-button icon-only (click)="verOpciones()">\n        <ion-icon name="md-more" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n  <div class="division" [ngStyle]="{\'background-color\': color}">\n    <label for="search"></label>\n    <div class="input-image" (click)="close()" [style.background-image]="\'url(\'+imgBusqueda+\')\'"></div>\n    <input type="text" placeholder="Buscar" class="input-text" id="search" [(ngModel)]="dataFilter.nombre" (keyup)="buscarPorFiltros()">\n    <ion-icon name="close" style="    position: absolute;\n    right: 14px;\n    /* top: 0px; */\n    padding: 8px;\n    font-size: 19px;" (click)="borraPalabra()"></ion-icon>\n  </div>\n</ion-header>\n\n<div class="filtro" *ngIf="1==2">\n  <button ion-button (click)="openFilters()">\n    <ion-icon ios="ios-options" md="ios-options"></ion-icon>\n  </button>\n</div>\n\n<ion-content>\n\n  <div *ngIf="dataFilter.nombre.length > 0" class="contenedor-busqueda">\n    <div class="resultado" *ngFor="let p of productosBuscados" (click)="viewDetail(p)">\n      <div class="c-i "><img src="{{env.getImagenIndividual}}{{p.producto.adjuntoId}}" alt=""></div>\n      <div class="r">{{ p.producto.nombre }} - {{p.proveedor.nombre}}</div>\n    </div>\n\n    <div *ngIf="productosBuscados.length <= 0" class="no-en">\n      No se encontraron resultados\n    </div>\n  </div>\n\n  <div *ngIf="dataFilter.nombre.length<=0">\n    <div style="margin-top: 8px"></div>\n\n    <div class="scrolling-wrapper-flexbox" style="margin-top:0px">\n      <div class="promociones" [style.background-image]="\'url(\'+env.getImagenIndividual+promo.adjuntoId+\')\'" *ngFor="let promo of promociones">\n        <div class="contenedor-imagen">\n          <!-- <img src="assets/imgs/home/images.jpeg" alt=""> -->\n        </div>\n        <div class="info">\n          <p class="titulo">{{promo.titulo}}</p>\n          <p class="subtitulo">{{promo.descripcion}}</p>\n        </div>\n      </div>\n    </div>\n\n    <div class="scrolling-wrapper" style="margin-top: 15px">\n      <div class="buttons">\n        <button [ngStyle]="{\'background-color\': color}" (click)="ordena(1)">\n          <img src="assets/imgs/home/milk.png" alt="">\n          Artículos\n        </button>\n      </div>\n      <div class="buttons">\n        <button [ngStyle]="{\'background-color\': color}" (click)="ordena(2)">\n          <img src="assets/imgs/home/services.png" alt="">\n          Servicios\n        </button>\n      </div>\n\n    </div>\n\n    <div class="card-super" *ngIf="productosCategorias.length > 0">\n      <div class="cont">\n        <div class="principal" (click)="irToCategoria(productosCategorias[0])">\n          <img src="{{env.getImagenIndividual}}{{productosCategorias[0].categoria.adjuntoId}}" alt="">\n          <div class="seccion-principal" [ngStyle]="{\'color\': color}">{{productosCategorias[0].categoria.nombre}}</div>\n        </div>\n\n        <div class="borde-b"></div>\n\n        <div class="contenedor-tres">\n          <div class="contenedor-int" (click)="irToCategoria(cat)" *ngFor="let cat of productosCategoriasSub">\n            <img src="{{env.getImagenIndividual}}{{cat.categoria.adjuntoId}}" alt="">\n            <div class="seccion-sub-principal" [ngStyle]="{\'color\': color}">{{cat.categoria.nombre}}</div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_8__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_14__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_action_sheet__["a" /* ActionSheet */],
            __WEBPACK_IMPORTED_MODULE_15__services_string_utils_service__["a" /* StringUtilsService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltroProductoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
            selector: 'page-filtro-producto',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/filtro-producto/filtro-producto.html"*/'<ion-header>\n  <ion-toolbar color="{{genericService.getColor()}}">\n    <ion-title>Productos: Filtros</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss(false)">\n        <span color="secundary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android, windows" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class="wrapper-frame">\n    <p>Filtra los productos seleccionando lo que más te interese.</p>\n    <div class="block">\n\n      <ion-item>\n        <ion-label floating>Nombre producto</ion-label>\n        <ion-input (keyup)="change()" type="text" [(ngModel)]="filtros.nombre" style="border-bottom: 1px solid #3b64bf;"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Proveedores</ion-label>\n        <ion-select (ionChange)="change()" [(ngModel)]="filtros.idProveedor" okText="Ok" cancelText="Cancelar" interface="action-sheet"\n          [selectOptions]="selectOptions">\n          <ion-option *ngFor="let op of proveedores" [value]="op.id">\n            {{op.nombre}}\n          </ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label>Categorías</ion-label>\n        <ion-select (ionChange)="change()" [(ngModel)]="filtros.idCategoria" okText="Ok" cancelText="Cancelar" interface="action-sheet"\n          [selectOptions]="selectOptions">\n          <ion-option *ngFor="let op of categorias" [value]="op.id">\n            {{op.nombre}}\n          </ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label>Secciones</ion-label>\n        <ion-select (ionChange)="change()" [(ngModel)]="filtros.idSeccion" okText="Ok" cancelText="Cancelar" interface="action-sheet"\n          [selectOptions]="selectOptions">\n          <ion-option *ngFor="let op of secciones" [value]="op.id">\n            <ion-icon name="md-close"></ion-icon>\n            {{op.nombre}}\n          </ion-option>\n        </ion-select>\n      </ion-item>\n\n    </div>\n  </div>\n\n</ion-content>\n<ion-footer class="footer-button">\n  <div class="btn-full" (tap)="dismiss()">\n    <span>Aceptar</span>\n  </div>\n</ion-footer>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/filtro-producto/filtro-producto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */]])
    ], FiltroProductoPage);
    return FiltroProductoPage;
}());

//# sourceMappingURL=filtro-producto.js.map

/***/ }),

/***/ 588:
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

/***/ 589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoriaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__articulo_productos_articulo_productos__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_producto_service__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__detalle_producto_detalle_producto__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__mapa_proveedores_mapa_proveedores__ = __webpack_require__(217);
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
        this.env = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */];
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
                var params = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["e" /* HttpParams */]();
                params = params.set('email', _this.user.email);
                _this.genericService.sendGetRequestParams(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].proveedorProductos + "/producto/" + producto.id, params).subscribe(function (response) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__mapa_proveedores_mapa_proveedores__["a" /* MapaProveedoresPage */], { proveedores: response, producto: producto });
                    _this.loadingService.hide();
                }, function (error) {
                    var err = error.error;
                    _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
            }
            else {
                var params = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["e" /* HttpParams */]();
                params = params.set('email', null);
                _this.genericService.sendGetRequestParams(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].proveedorProductos + "/" + producto.id, params).subscribe(function (response) {
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
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { producto: response });
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
        this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].categoria + this.categoria.categoria.id).
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
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'page-categoria',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/categoria/categoria.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>{{categoria.categoria.nombre}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div class="spinner-carrito" *ngIf="articulos == null">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <div *ngIf="articulos && articulos?.length>0" class="ordenamiento" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <div class="texto-ordena">\n      Ordenar por precio\n    </div>\n    <div class="botones">\n        <button ion-button outline style="width: 48%;" (click)="up()"\n        [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n          <ion-icon name="md-trending-up" class="botonFooter"></ion-icon>\n        </button>\n    </div>\n    <div class="botones">\n        <button ion-button outline style="width: 48%;" (click)="down()"\n        [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n          <ion-icon name="md-trending-down" class="botonFooter"></ion-icon>\n        </button>\n    </div>\n  </div>\n\n  <div *ngFor="let articulo of articulos">\n    <div class="titulo-wrapper">\n      <div class="seccion" [ngStyle]="{\'color\':color}">\n        {{articulo.tipoArticulo.nombre}}\n      </div>\n\n      <div class="ver-todos" (click)="verTodos(articulo)">\n        Ver todos\n      </div>\n    </div>\n    <div class="scrolling-wrapper" *ngIf="articulo.productos">\n      <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of articulo.productos; let i = index"\n        (click)="viewDetail(p)">\n        <div class="container-card">\n\n          <img src="{{env.getImagenIndividual}}{{p.producto.adjuntoId}}" />\n        </div>\n        <div class="container-text">{{p.producto.nombre}}</div>\n        <div class="description">{{p.producto.descripcion}}</div>\n        <div class="precio">{{p.precio | currency}}</div>\n\n        <!-- <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n                      <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n                        <div>-</div>\n                      </div>\n                      <div class="cantidad" *ngIf="p.cantidad > 0">\n                        <div>{{p.cantidad}}</div>\n                      </div>\n                      <div class="mas" (click)="incrementa(p)">\n                        <div>+</div>\n                      </div>\n                    </div> -->\n      </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/categoria/categoria.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_8__services_producto_service__["a" /* ProductoService */],
            __WEBPACK_IMPORTED_MODULE_9__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["e" /* Events */]])
    ], CategoriaPage);
    return CategoriaPage;
}());

//# sourceMappingURL=categoria.js.map

/***/ }),

/***/ 590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticuloProductosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__detalle_producto_detalle_producto__ = __webpack_require__(46);
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
        var params = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["e" /* HttpParams */]();
        params = params.set('sortType', "asc");
        params = params.set('limit', "10");
        params = params.set('page', this.paginaActual.toString());
        params = params.append('sort', "id");
        params = params.append('tipoArticuloId', this.articulo.tipoArticulo.id.toString());
        this.genericService.sendGetParams(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].proveedorProductos + "/search", params).subscribe(function (response) {
            _this.resultadoPost = response;
            response.forEach(function (element) {
                _this.productos.push(element.producto);
                _this.replicaProductos.push(element.producto);
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
            selector: 'page-articulo-productos',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/articulo-productos/articulo-productos.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>{{articulo.tipoArticulo?.nombre}}</ion-title>\n    \n  </ion-navbar>\n  <div class="busca" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n      <input type="text" [(ngModel)]="palabra" placeholder="Escribe aquí tu búsqueda" (keyup)="buscarPorPalabra()">\n    </div>\n</ion-header>\n\n<ion-content padding>\n    <div *ngIf="productos && productos?.length>0" class="ordenamiento" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n        <div class="texto-ordena">\n          Ordenar por precio\n        </div>\n        <div class="botones">\n          <button ion-button outline style="width: 48%;" (click)="up()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n            <ion-icon name="md-trending-up" class="botonFooter"></ion-icon>\n          </button>\n        </div>\n        <div class="botones">\n          <button ion-button outline style="width: 48%;" (click)="down()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n            <ion-icon name="md-trending-down" class="botonFooter"></ion-icon>\n          </button>\n        </div>\n      </div>\n  <div class="spinner-carrito" *ngIf="!productos || productos.length <= 0">\n    <ion-spinner></ion-spinner>\n  </div>\n\n\n\n  <div *ngIf="productos && productos.length > 0">\n    <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of productos; let i = index" (click)="viewDetail(p)">\n      <!-- <div class="tacha">\n                  <div class="mini-tacha">\n                      <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                      <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                  </div>\n                </div> -->\n      <div class="container-card">\n\n        <img src="{{env.getImagenIndividual}}{{p.adjuntoId}}" />\n      </div>\n      <div class="container-text">{{p.nombre}}</div>\n      <div class="description">{{p.descripcion}}</div>\n      <div class="precio">{{p.precio | currency}}</div>\n    </div>\n  </div>\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="resultadoPost.length % 10 == 0">\n    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Cargando...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/articulo-productos/articulo-productos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["e" /* Events */]])
    ], ArticuloProductosPage);
    return ArticuloProductosPage;
}());

//# sourceMappingURL=articulo-productos.js.map

/***/ }),

/***/ 591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_detalle_producto_detalle_producto__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__local_storage_encrypt_service__ = __webpack_require__(9);
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
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_8__local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["e" /* Events */]])
    ], ProductoService);
    return ProductoService;
}());

//# sourceMappingURL=producto.service.js.map

/***/ }),

/***/ 592:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComparaPreciosProveedorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__detalle_producto_detalle_producto__ = __webpack_require__(46);
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
        this.multiple = false;
        this.proveedoresGeolocate = navParams.get("proveedoresGeolocate");
        this.multiple = navParams.get("multiple");
        this.proveedoresGeolocateReplica = this.proveedoresGeolocate;
        console.log(this.proveedoresGeolocate);
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
            selector: 'page-compara-precios-proveedor',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/compara-precios-proveedor/compara-precios-proveedor.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>Comparativa</ion-title>\n\n  </ion-navbar>\n  <div class="busca" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <input type="text" [(ngModel)]="palabra" placeholder="Escribe aquí el proveedor" (keyup)="buscarPorPalabra()">\n  </div>\n</ion-header>\n\n<ion-content padding>\n    <div *ngIf="proveedoresGeolocate && proveedoresGeolocate?.length>0 && !multiple" class="ordenamiento" \n      [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n        <div class="texto-ordena">\n          Ordenar por precio \n        </div>\n        <div class="botones">\n          <button ion-button outline style="width: 48%;" (click)="up()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n            <ion-icon name="md-trending-up" class="botonFooter"></ion-icon>\n          </button>\n        </div>\n        <div class="botones">\n          <button ion-button outline style="width: 48%;" (click)="down()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n            <ion-icon name="md-trending-down" class="botonFooter"></ion-icon>\n          </button>\n        </div>\n      </div>\n\n  <div class="spinner-carrito" *ngIf="!proveedoresGeolocate || proveedoresGeolocate.length <= 0">\n    <ion-spinner></ion-spinner>\n  </div>\n\n\n\n  <div *ngIf="proveedoresGeolocate && proveedoresGeolocate.length > 0 && !multiple" >\n    <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of proveedoresGeolocate; let i = index"\n      (click)="viewDetail(p)">\n      <!-- <div class="tacha">\n                      <div class="mini-tacha">\n                          <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                          <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                      </div>\n                    </div> -->\n      <div class="container-card">\n\n        <img src="{{env.getImagenIndividual}}{{p.producto.adjuntoId}}" />\n      </div>\n      <div class="container-text">{{p.producto.nombre}}</div>\n      <div class="description">{{p.producto.descripcion}}</div>\n      <div class="precio">{{p.producto.precio | currency}}</div>\n\n      <div style="text-align: center;\n      font-weight: 600;">Proveedor:</div>\n      <div style="text-align: center;text-overflow: ellipsis;\n      white-space: nowrap;\n      overflow: hidden;">{{p.proveedor.nombre}}, {{p.proveedor.empresa.nombre}}</div>\n    </div>\n  </div>\n\n  <div *ngIf="proveedoresGeolocate && proveedoresGeolocate.length > 0 && multiple" >\n      <div *ngFor="let pr of proveedoresGeolocate; let i = index">\n          <div class="name-pro" [ngStyle]="{\'color\': genericService.getColorHex()}">{{pr.proveedor.nombre}}</div>\n\n          <div class="scrolling-wrapper">\n              <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of pr.productos; let i = index"\n              (click)="viewDetail(p)">\n              <!-- <div class="tacha">\n                              <div class="mini-tacha">\n                                  <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                                  <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                              </div>\n                            </div> -->\n              <div class="container-card">\n        \n                <img src="{{env.getImagenIndividual}}{{p.producto.adjuntoId}}" />\n              </div>\n              <div class="container-text">{{p.producto.nombre}}</div>\n              <div class="description">{{p.producto.descripcion}}</div>\n              <div class="precio">{{p.producto.precio | currency}}</div>\n        \n              <div style="text-align: center;\n              font-weight: 600;">Proveedor:</div>\n              <div style="text-align: center;text-overflow: ellipsis;\n              white-space: nowrap;\n              overflow: hidden;">{{p.proveedor.nombre}}, {{p.proveedor.empresa.nombre}}</div>\n            </div>\n          </div>\n      </div>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/compara-precios-proveedor/compara-precios-proveedor.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_4__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_5__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* Events */]])
    ], ComparaPreciosProveedorPage);
    return ComparaPreciosProveedorPage;
}());

//# sourceMappingURL=compara-precios-proveedor.js.map

/***/ }),

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistorialPedidosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__historial_pedidos_detail_historial_pedidos_detail__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__opciones_menu_opciones_menu__ = __webpack_require__(90);
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
    function HistorialPedidosPage(navCtrl, navParams, genericService, localStorageEncryptService, alertaService, loadingService, popoverCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.alertaService = alertaService;
        this.loadingService = loadingService;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.user = null;
        this.pedidos = [];
        this.pedidosReplica = [];
        this.env = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */];
        this.botones = {
            boton1: false,
            boton2: false,
            boton3: false
        };
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        this.cargarPedidos(null);
        this.events.subscribe("cargarPedidos", function (data) {
            try {
                _this.cargarPedidos(null);
            }
            catch (error) { }
        });
    }
    HistorialPedidosPage.prototype.ionViewDidEnter = function () {
        this.events.publish("backHome");
        this.events.publish("backCarrito");
        this.events.publish("backProveedor");
    };
    HistorialPedidosPage.prototype.ionViewWillLeave = function () { };
    /**Método que es lanzado al deslizar hacia arriba
     * el usuario puede refrescar cada que haya algun problema con
     * su conexión
     */
    HistorialPedidosPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            _this.cargarPedidos(refresher);
        }, 2000);
    };
    HistorialPedidosPage.prototype.ionViewDidLoad = function () { };
    HistorialPedidosPage.prototype.verOpciones = function () {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_10__opciones_menu_opciones_menu__["a" /* OpcionesMenuPage */], {}, { cssClass: "clase-Pop" });
        popover.present({});
    };
    HistorialPedidosPage.prototype.cargarPedidos = function (refresher) {
        var _this = this;
        if (refresher === void 0) { refresher = null; }
        var params = new __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["e" /* HttpParams */]();
        params = params.set("email", this.user.email);
        console.log(params);
        this.genericService
            .sendGetParams("" + __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].pedidos, params)
            .subscribe(function (response) {
            _this.pedidos = response;
            if (_this.pedidos.length <= 0) {
                _this.pedidos = null;
            }
            _this.pedidosReplica = _this.pedidos;
            if (refresher) {
                refresher.complete();
            }
        }, function (error) {
            if (refresher) {
                refresher.complete();
            }
            var err = error.error;
            _this.pedidos = null;
            _this.alertaService.errorAlertGeneric(err.message
                ? err.message
                : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    HistorialPedidosPage.prototype.viewDetail = function (pedido) {
        var _this = this;
        this.loadingService.show().then(function () {
            _this.genericService
                .sendGetRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].pedidos + "/" + pedido.id)
                .subscribe(function (response) {
                _this.loadingService.hide();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__historial_pedidos_detail_historial_pedidos_detail__["a" /* HistorialPedidosDetailPage */], { pedido: response });
            }, function (error) {
                var err = error.error;
                _this.loadingService.hide();
                _this.alertaService.errorAlertGeneric(err.message
                    ? err.message
                    : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
    };
    HistorialPedidosPage.prototype.ordenPor = function (opc) {
        this.pedidos = this.pedidosReplica;
        //item.fecha = moment(fechaF, 'DD-MM-YYYY HH:mm:ss').format("D [de] MMMM [de] YYYY HH:mm:ss");
        console.log(opc);
        console.log(this.pedidos);
        switch (opc) {
            case 1:
                //fecha solicitud
                this.pedidos.sort(function (mayor, menor) {
                    var dateA = __WEBPACK_IMPORTED_MODULE_9_moment__(mayor.fechaAlta, "DD-MM-YYYY HH:mm:ss").toDate();
                    var dateB = __WEBPACK_IMPORTED_MODULE_9_moment__(menor.fechaAlta, "DD-MM-YYYY HH:mm:ss").toDate();
                    console.log(dateA);
                    console.log(dateB);
                    return dateB - dateA;
                    //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
                });
                this.botones.boton1 = !this.botones.boton1;
                break;
            case 2:
                //fecha entrega
                this.pedidos.sort(function (mayor, menor) {
                    var dateA = __WEBPACK_IMPORTED_MODULE_9_moment__(mayor.fechaEntrega, "DD-MM-YYYY HH:mm:ss").toDate();
                    var dateB = __WEBPACK_IMPORTED_MODULE_9_moment__(menor.fechaEntrega, "DD-MM-YYYY HH:mm:ss").toDate();
                    return dateB - dateA;
                    //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
                });
                this.botones.boton2 = !this.botones.boton2;
                break;
            case 3:
                //estatus
                this.pedidos.sort(function (mayor, menor) {
                    var a = mayor.estatus.nombre;
                    var b = menor.estatus.nombre;
                    console.log(a);
                    console.log(b);
                    if (a > b) {
                        return -1;
                    }
                    if (b > a) {
                        return 1;
                    }
                    return 0;
                });
                this.botones.boton3 = !this.botones.boton3;
                break;
            case 4:
                //fecha solicitud
                this.pedidos.sort(function (mayor, menor) {
                    var dateA = __WEBPACK_IMPORTED_MODULE_9_moment__(mayor.fechaAlta, "DD-MM-YYYY HH:mm:ss").toDate();
                    var dateB = __WEBPACK_IMPORTED_MODULE_9_moment__(menor.fechaAlta, "DD-MM-YYYY HH:mm:ss").toDate();
                    console.log(dateA);
                    console.log(dateB);
                    return dateA - dateB;
                    //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
                });
                this.botones.boton1 = !this.botones.boton1;
                break;
            case 5:
                //fecha entrega
                this.pedidos.sort(function (mayor, menor) {
                    var dateA = __WEBPACK_IMPORTED_MODULE_9_moment__(mayor.fechaEntrega, "DD-MM-YYYY HH:mm:ss").toDate();
                    var dateB = __WEBPACK_IMPORTED_MODULE_9_moment__(menor.fechaEntrega, "DD-MM-YYYY HH:mm:ss").toDate();
                    return dateA - dateB;
                    //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
                });
                this.botones.boton2 = !this.botones.boton2;
                break;
            case 6:
                //estatus
                this.pedidos.sort(function (mayor, menor) {
                    var a = mayor.estatus.nombre;
                    var b = menor.estatus.nombre;
                    console.log(a);
                    console.log(b);
                    if (a < b) {
                        return -1;
                    }
                    if (b < a) {
                        return 1;
                    }
                    return 0;
                });
                this.botones.boton3 = !this.botones.boton3;
                break;
        }
        console.log(this.pedidos);
    };
    HistorialPedidosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: "page-historial-pedidos",template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/historial-pedidos/historial-pedidos.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title *ngIf="env.perfil.activo == 2">Mi historial</ion-title>\n\n    <button ion-button menuToggle *ngIf="env.perfil.activo == 1">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Mi historial</ion-title>\n\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="verOpciones()">\n        <ion-icon name="md-more" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="circles" refreshingText="">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <div class="spinner-carrito" *ngIf="pedidos && pedidos.length <= 0">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <div class="filtros" [ngStyle]="{\'background-color\' : genericService.getColorHex()}" *ngIf="pedidos && pedidos?.length > 0">\n    <button (click)="ordenPor(1)" *ngIf="!botones.boton1">\n      <div style="font-size: 12px;">Fecha solicitud</div>\n      <ion-icon name="ios-calendar-outline"></ion-icon>\n    </button>\n    <button (click)="ordenPor(4)" *ngIf="botones.boton1">\n      <div style="font-size: 12px;">Fecha solicitud</div>\n      <ion-icon name="ios-calendar"></ion-icon>\n    </button>\n    <button (click)="ordenPor(2)" *ngIf="!botones.boton2">\n      <div style="font-size: 12px;">Fecha entrega</div>\n      <ion-icon name="ios-list-box-outline"></ion-icon>\n    </button>\n    <button (click)="ordenPor(5)" *ngIf="botones.boton2">\n      <div style="font-size: 12px;">Fecha entrega</div>\n      <ion-icon name="ios-list-box"></ion-icon>\n    </button>\n    <button (click)="ordenPor(3)" *ngIf="!botones.boton3">\n      <div style="font-size: 12px;">Estatus</div>\n      <ion-icon name="ios-checkbox-outline"></ion-icon>\n    </button>\n    <button (click)="ordenPor(6)" *ngIf="botones.boton3">\n      <div style="font-size: 12px;">Estatus</div>\n      <ion-icon name="ios-checkbox"></ion-icon>\n    </button>\n  </div>\n\n  <ion-list *ngIf="pedidos && pedidos?.length > 0">\n    <ion-item class="item-list-card" *ngFor="let p of pedidos" (click)="viewDetail(p)">\n      <ion-avatar slot="start">\n        <img src="assets/imgs/pedidos/entrega.png" alt="">\n      </ion-avatar>\n      <div class="datos-tarjetas">\n        <div class="name">Pedido Num. <strong>{{p.folio}}</strong></div>\n        <div class="number">Costo <strong>{{p.total | currency}}</strong></div>\n        <div class="number">Fecha Solicitud <strong>{{p.fechaAlta}}</strong></div>\n        <div class="number" *ngIf="p.fechaEntrega">Fecha Entrega <strong>{{p.fechaEntrega}}</strong></div>\n        <div class="number">Estatus <strong>{{p.estatus.nombre}}</strong></div>\n      </div>\n\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/historial-pedidos/historial-pedidos.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["p" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["e" /* Events */]])
    ], HistorialPedidosPage);
    return HistorialPedidosPage;
}());

//# sourceMappingURL=historial-pedidos.js.map

/***/ }),

/***/ 594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecuperaContraseniaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(8);
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
            selector: 'page-recupera-contrasenia',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/recupera-contrasenia/recupera-contrasenia.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Recuperar contraseña</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <div class="correo">\n    <div [ngStyle]="{\'color\': genericService.getColorHex()}">Correo electrónico</div>\n    <input type="text" placeholder="Ingresa aqui" [(ngModel)]="correo">\n  </div>\n  <button class="boton" [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="cambio()">\n    Recibir indicaciones\n  </button>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/recupera-contrasenia/recupera-contrasenia.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */]])
    ], RecuperaContraseniaPage);
    return RecuperaContraseniaPage;
}());

//# sourceMappingURL=recupera-contrasenia.js.map

/***/ }),

/***/ 595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarritoHistoricoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__detalle_producto_detalle_producto__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_validation_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__home_geo_proveedores_home_geo_proveedores__ = __webpack_require__(72);
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
        this.selectOptions = {
            cssClass: 'action-sheet-class'
        };
        this.user = null;
        this.env = __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */];
        this.listaCarrito = null;
        this.productosCarrito = [];
        this.listaCarritoReplica = [];
        this.enCompra = false;
        this.stripe = Stripe(JSON.parse(this.localStorageEncryptService.yayirobe(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].st.keyPublic)));
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
        this.agrupado = [];
        this.totales = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        if (this.user) {
            this.listaCarrito = navParams.get("lista");
            console.log(this.listaCarrito);
            this.listaCarritoReplica = this.listaCarrito;
            this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage("" + this.user.id_token);
            this.getCards();
            this.agruparTotales();
        }
    }
    CarritoHistoricoPage.prototype.agruparTotales = function () {
        var _this = this;
        this.agrupado = [];
        var unique = this.listaCarrito.carritoHistoricoDetalles.filter(function (valorActual, indiceActual, arreglo) {
            //Podríamos omitir el return y hacerlo en una línea, pero se vería menos legible
            return arreglo.findIndex(function (valorDelArreglo) { return valorDelArreglo.productoProveedor.proveedorId === valorActual.productoProveedor.proveedorId; }) === indiceActual;
        });
        unique.forEach(function (prov) {
            prov.carritoAgrupado = [];
            _this.listaCarrito.carritoHistoricoDetalles.forEach(function (element) {
                if (element.productoProveedor.proveedorId == prov.productoProveedor.proveedorId) {
                    prov.carritoAgrupado.push(element);
                }
            });
            _this.agrupado.push(prov);
        });
        console.log(this.agrupado);
        this.getTotales();
    };
    CarritoHistoricoPage.prototype.armaObjRegistro = function () {
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
        ];
        if (this.totales.listHistoricoProveedores.length > 1) {
            this.objetoRegistro.push({
                name: "Dirección",
                required: true,
                length: 200,
                type: "text",
                formName: "direc",
                value: null,
                disabled: true
            });
            this.objetoRegistro.push({
                name: "Código postal",
                required: false,
                length: 6,
                type: "text",
                formName: "cp",
                value: null,
                disabled: false
            });
        }
        else {
            this.objetoRegistro.push({
                name: "Picking",
                required: true,
                length: 11,
                type: "select",
                formName: "sex",
                value: false,
                opts: [
                    {
                        id: false,
                        value: "Entrega a domicilio"
                    },
                    {
                        id: true,
                        value: "Entrega en domicilio de proveedor"
                    }
                ]
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
            this.objetoRegistro.push({
                name: "Código postal",
                required: false,
                length: 6,
                type: "text",
                formName: "cp",
                value: null,
                disabled: false
            });
        }
    };
    CarritoHistoricoPage.prototype.getTotales = function () {
        var _this = this;
        this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].carritoHistoricosProveedor + "/" + this.listaCarrito.id).subscribe(function (response) {
            console.log(response);
            _this.totales = response;
            _this.agrupado.forEach(function (element) {
                if (element.totalAgrupado) {
                    delete element.totalAgrupado;
                }
            });
            _this.totales.listHistoricoProveedores.forEach(function (item) {
                _this.agrupado.forEach(function (element) {
                    if (!element.totalAgrupado && item.proveedor.id == element.productoProveedor.proveedor.id) {
                        element.totalAgrupado = {
                            comisionTransporte: item.comisionTransporte,
                            tiempoEntrega: item.tiempoEntrega,
                            total: item.total,
                            totalProductos: item.totalProductos
                        };
                    }
                });
            });
            _this.armaObjRegistro();
        }, function (error) {
            _this.alertaService.warnAlertGeneric("Agrega artículos al carrito");
        });
    };
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
        this.enCompra = false;
        this.agruparTotales();
    };
    CarritoHistoricoPage.prototype.ionViewDidLoad = function () {
        console.log("---------------------.");
        var claseTabs = document.getElementsByClassName("tabbar");
        console.log(claseTabs);
        claseTabs[0].style.display = "none";
    };
    CarritoHistoricoPage.prototype.ngOnDestroy = function () {
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
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { producto: response, fromCarritos: true });
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
        if (p.cantidad == 0) {
            p.cantidad = 1;
        }
        else {
            this.borrarToCarritoBack(p);
        }
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
        this.getTotales();
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
                _this.verificarCarritoModificarCantidad(producto);
            }
            else {
                _this.verificarCarritoModificarCantidad(producto);
            }
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
        this.enCompra = true;
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
    CarritoHistoricoPage.prototype.closeInfoContact = function (aun) {
        if (aun === void 0) { aun = true; }
        var modal = document.getElementById("myModal2");
        modal.style.display = "none";
        this.objetoRegistro.forEach(function (item) {
            item.value = null;
        });
        this.formGroup = null;
        this.btnHabilitado = true;
        this.enCompra = false;
    };
    CarritoHistoricoPage.prototype.cerrarModal3 = function (aun) {
        if (aun === void 0) { aun = true; }
        var modal = document.getElementById("myModal3");
        modal.style.display = "none";
        if (aun) {
            this.enCompra = false;
        }
    };
    CarritoHistoricoPage.prototype.openModal3 = function () {
        var modal = document.getElementById("myModal3");
        modal.style.display = "block";
    };
    /**Verifica validaciones */
    CarritoHistoricoPage.prototype.ejecutaValidator = function (opc, evt) {
        if (opc === void 0) { opc = false; }
        if (evt === void 0) { evt = null; }
        if (opc) {
            console.log(evt);
            if (!evt) {
                this.objetoRegistro.push({
                    name: "Dirección",
                    required: true,
                    length: 200,
                    type: "text",
                    formName: "direc",
                    value: null,
                    disabled: true
                });
                this.objetoRegistro.push({
                    name: "Código postal",
                    required: false,
                    length: 6,
                    type: "text",
                    formName: "cp",
                    value: null,
                    disabled: false
                });
            }
            else {
                this.objetoRegistro = this.objetoRegistro.slice(0, 4).concat(this.objetoRegistro.slice(4 + 1));
                this.objetoRegistro = this.objetoRegistro.slice(0, 4).concat(this.objetoRegistro.slice(4 + 1));
            }
        }
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
        console.log(validacion);
        if (validacion <= 0) {
            this.btnHabilitado = false;
        }
        else {
            this.btnHabilitado = true;
        }
        if (validacion == 1 && (this.objetoRegistro[3].value == false || this.objetoRegistro[3].value == 'false')) {
            this.btnHabilitado = false;
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
                    if (_this.objetoRegistro[3].value == 'true' ||
                        _this.objetoRegistro[3].value == true ||
                        _this.objetoRegistro[3].value == 'false' ||
                        _this.objetoRegistro[3].value == false) {
                        _this.objetoRegistro[4].value = _this.data.direccion;
                        _this.objetoRegistro[5].value = _this.data.codigoPostal;
                    }
                    else {
                        _this.objetoRegistro[3].value = _this.data.direccion;
                        _this.objetoRegistro[4].value = _this.data.codigoPostal;
                    }
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
        var h = null;
        console.log(this.totales.listHistoricoProveedores);
        if (this.totales.listHistoricoProveedores.length > 1) {
            h = true;
        }
        var body = {
            nombreContacto: this.objetoRegistroCopy[0].value,
            telefonoContacto: this.objetoRegistroCopy[1].value,
            correoContacto: this.objetoRegistroCopy[2].value,
            direccionContacto: this.objetoRegistro[3].value == 'true' ||
                this.objetoRegistro[3].value == true ||
                this.objetoRegistro[3].value == 'false' ||
                this.objetoRegistro[3].value == false || h ? {
                id: this.data.id ? this.data.id : null,
                codigoPostal: this.data.codigoPostal,
                direccion: this.data.direccion,
                latitud: this.data.latitud,
                longitud: this.data.longitud
            } : null,
            productos: []
        };
        if (this.objetoRegistro[3].value == 'true' ||
            this.objetoRegistro[3].value == true ||
            this.objetoRegistro[3].value == 'false' ||
            this.objetoRegistro[3].value == false) {
            body.picking = this.objetoRegistro[3].value;
        }
        else {
            body.picking = false;
        }
        this.agrupado.forEach(function (item) {
            item.carritoAgrupado.forEach(function (element) {
                body.productos.push({
                    cantidad: element.cantidad,
                    productoProveedorId: element.productoProveedorId
                });
            });
        });
        var service = this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].pedidos, body);
        this.loadingService.show().then(function () {
            service.subscribe(function (response) {
                _this.pagoActual = response;
                _this.loadingService.hide();
                //this.comprar();
                _this.closeInfoContact(false);
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
            this.cerrarModal3(false);
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
            Stripe.setPublishableKey(JSON.parse(this.localStorageEncryptService.yayirobe(__WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__["a" /* environment */].st.keyPublic)));
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
                            clase.events.publish("totalCarrito");
                            clase.events.publish("cargarPedidos");
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
    CarritoHistoricoPage.prototype.seleccionar = function (card) {
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
            selector: 'page-carrito-historico',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/carrito-historico/carrito-historico.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>{{listaCarrito.nombre}}</ion-title>\n  </ion-navbar>\n</ion-header>\n<div id="myModal" class="modal">\n\n  <div class="modal-content animated lightSpeedIn">\n\n    <div class="tacha" (click)="cerrar()" [ngStyle]="{\'color\': genericService.getColorHex()}">\n      <ion-icon ios="md-close" md="md-close"></ion-icon>\n    </div>\n    <div class="selecciona" [ngStyle]="{\'color\': genericService.getColorHex()}" *ngIf="cards && cards?.length > 0">Selecciona\n      tu tarjeta</div>\n    <ion-list *ngIf="cards && cards?.length > 0">\n      <ion-item class="item-list-card" *ngFor="let card of cards" [ngClass]="{\'seleccionado\':card.selected}" (click)="seleccionar(card)">\n        <ion-avatar slot="start">\n          <img src="assets/imgs/tarjetas/bank.png" alt="">\n        </ion-avatar>\n        <div class="datos-tarjetas">\n          <div class="name">{{card.alias}}</div>\n          <div class="number">{{card.numeroTarjeta}}</div>\n        </div>\n\n      </ion-item>\n    </ion-list>\n    <div class="ingresa" [ngStyle]="{\'color\': genericService.getColorHex()}" *ngIf="cards && cards?.length > 0">Ó\n      ingresa una para hacer el pago</div>\n    <div class="ingresa" [ngStyle]="{\'color\': genericService.getColorHex()}" *ngIf="!cards || cards?.length <= 0">Ingresa\n      una tarjeta para hacer el pago</div>\n\n\n\n    <div class="form-row">\n      <input type="number" placeholder="N. Tarjeta" id="tarj" [(ngModel)]="dataCard.tarj" style="width: 100%">\n\n      <ion-datetime class="dt" text-left pickerFormat="MM/YY" cancelText="Cancelar" doneText="Aceptar" #fechaNac\n        placeholder="04/24" min="2016" max="2050" id="dtime" [(ngModel)]="dataCard.dtime"></ion-datetime>\n\n      <input type="number" placeholder="CVC" id="cvc" [(ngModel)]="dataCard.cvc">\n\n\n\n\n    </div>\n    <button ion-button block large style="padding: 10px;\n          height: auto;\n          contain: none;\n          margin-top: 15px;font-size: 14px;"\n      [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="confirmar()">Pagar</button>\n  </div>\n</div>\n\n<div id="myModal2" class="modal2">\n\n  <div class="modal-content animated lightSpeedIn">\n\n    <div style="top: 3px;" class="tacha" (click)="closeInfoContact()" [ngStyle]="{\'color\': genericService.getColorHex()}">\n      <ion-icon ios="md-close" md="md-close"></ion-icon>\n    </div>\n\n    <div style="width: 90%;\n        padding: 7px;\n        color: #fff;\n        border-radius: 4px;" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Llena\n      la información de contacto</div>\n    <div class="formulario" *ngIf="formGroup">\n      <form [formGroup]="formGroup">\n        <div *ngFor="let dato of objetoRegistro;let i = index" class="contenedor-input">\n          <!-- <span>{{dato.name}}</span> -->\n\n          <input class="inp" placeholder="{{dato.name}}" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}"\n            type="{{dato.type}}" [(ngModel)]="dato.value" maxlength="{{dato.length}}" [attr.disabled]="dato.disabled ? \'\' : null"\n            *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\'" [ngStyle]="{\'width\': dato.name == \'Dirección\' ? \'88%\' : \'100%\'}">\n\n          <div class="direc" *ngIf="dato.name == \'Dirección\'" (click)="getMapa()"><img src="assets/imgs/direcciones/home-run.png"\n              alt=""></div>\n\n          <ion-datetime class="dt" [(ngModel)]="dato.value" formControlName="{{dato.formName}}" text-left pickerFormat="DD/MM/YYYY"\n            cancelText="Cancelar" doneText="Aceptar" #fechaNac (ionChange)="ejecutaValidator()" *ngIf="dato.type == \'date\'"\n            placeholder="01/12/2020"></ion-datetime>\n\n          <ion-col col-2 class="text-center" *ngIf="dato.type == \'checkbox\'">\n            <ion-checkbox formControlName="{{dato.formName}}" [(ngModel)]="dato.value" (ionChange)="ejecutaValidator()">\n            </ion-checkbox>\n          </ion-col>\n\n          <ion-select *ngIf="dato.type == \'select\'" [(ngModel)]="dato.value" okText="Ok" cancelText="Cancelar"\n            interface="action-sheet" (ionChange)="ejecutaValidator(true,$event)" [selectOptions]="selectOptions"\n            formControlName="{{dato.formName}}">\n            <ion-option *ngFor="let op of dato.opts" [value]="op.id">\n              {{op.value}}\n            </ion-option>\n          </ion-select>\n\n          <app-control-messages [control]="formGroup.controls[dato.formName]" [clase]="\'validators2\'">\n          </app-control-messages>\n        </div>\n      </form>\n\n    </div>\n\n    <button ion-button block large style="padding: 10px;\n            height: auto;\n            contain: none;\n            margin-top: 15px;font-size: 14px;"\n      [disabled]="btnHabilitado" [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="precompra()">Aceptar</button>\n  </div>\n</div>\n\n<div id="myModal3" class="modal3">\n\n  <div class="modal-content animated lightSpeedIn">\n\n    <div class="tacha" (click)="cerrarModal3()" [ngStyle]="{\'color\': genericService.getColorHex()}">\n      <ion-icon ios="md-close" md="md-close"></ion-icon>\n    </div>\n    <div style="width: 90%;\n      padding: 7px;\n      color: #fff;\n      border-radius: 4px;" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Información\n      de pago</div>\n\n    <div class="resumen">Resumen de la compra</div>\n\n    <div class="resumen-proveedor" *ngIf="pagoActual">\n      <div *ngFor="let p of pagoActual.pedidoProveedores" class="separador">\n        <div class="proveedor">\n          <div class="nombre">{{p.proveedor?.nombre}}</div>\n          <div class="precio">{{p.total | currency}}</div>\n\n          <div class="costo-envio">Costo de envío</div>\n          <div class="precio-envio">{{p.comisionTransportista | currency}}</div>\n\n          <div class="costo-subtotal">Subtotal</div>\n          <div class="precio-subtotal">{{p.total + p.comisionTransportista | currency}}</div>\n        </div>\n\n\n      </div>\n\n      <div class="total-pagar">Total a pagar: <strong>{{pagoActual.total | currency}}</strong></div>\n      <div class="iva">*Costos incluyen iva.</div>\n\n      <ion-item>\n        <ion-label>Acepto términos y condiciones</ion-label>\n        <ion-checkbox color="{{genericService.getColor()}}" [(ngModel)]="check"></ion-checkbox>\n      </ion-item>\n    </div>\n\n    <div style="width:100%">\n      <button ion-button block large style="padding: 10px;\n          height: auto;\n          contain: none;\n          margin-top: 15px;font-size: 14px;display: inline-block; width: 49%"\n        [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="cerrarModal3()">Cancelar</button>\n      <button ion-button block large style="padding: 10px;\n            height: auto;\n            contain: none;\n            margin-top: 15px;font-size: 14px;display: inline-block; width: 49%"\n        [ngStyle]="{\'background-color\': genericService.getColorHex()}" (click)="comprar()">Realizar pago</button>\n    </div>\n  </div>\n</div>\n\n\n<ion-content padding>\n  <div *ngIf="2==3 && listaCarrito.carritoHistoricoDetalles && listaCarrito.carritoHistoricoDetalles?.length>0" class="ordenamiento"\n    [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <div class="texto-ordena">\n      Ordenar por precio\n    </div>\n    <div class="botones">\n      <button ion-button outline style="width: 48%;" (click)="up()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n        <ion-icon name="md-trending-up" class="botonFooter"></ion-icon>\n      </button>\n    </div>\n    <div class="botones">\n      <button ion-button outline style="width: 48%;" (click)="down()" [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n        <ion-icon name="md-trending-down" class="botonFooter"></ion-icon>\n      </button>\n    </div>\n  </div>\n\n  <!--<div>\n    <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of listaCarrito.carritoHistoricoDetalles; let i = index">\n     \n      <div class="container-card" (click)="viewDetail(p)">\n\n        <img src="{{env.getImagenIndividual}}{{p.productoProveedor.producto.adjuntoId}}" />\n      </div>\n      <div class="container-text" (click)="viewDetail(p)">{{p.productoProveedor.producto.nombre}}</div>\n      <div class="description" (click)="viewDetail(p)">{{p.productoProveedor.producto.descripcion}}</div>\n      <div class="precio" (click)="viewDetail(p)">{{p.precio | currency}}</div>\n\n      <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n        <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">-</div>\n        </div>\n        <div class="cantidad" *ngIf="p.cantidad > 0">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">{{p.cantidad}}</div>\n        </div>\n        <div class="mas" (click)="incrementa(p)">\n          <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">+</div>\n        </div>\n      </div>\n    </div>\n  </div> -->\n\n  <div>\n\n\n\n    <div *ngFor="let proveedor of agrupado">\n      <div class="name-pro" [ngStyle]="{\'color\': genericService.getColorHex()}" style="color: rgb(240, 124, 27);\n      font-weight: 600;\n      font-size: 17px;\n      text-align: center;">{{proveedor.productoProveedor.proveedor.nombre}}</div>\n\n      <div class="scrolling-wrapper">\n        <div id="card-{{i}}" class="card animated lightSpeedIn" *ngFor="let p of proveedor.carritoAgrupado; let i = index">\n          <!-- <div class="tacha">\n                              <div class="mini-tacha">\n                                  <ion-icon ios="ios-cart-outline" md="ios-cart-outline" style="color: #3b64bf;" *ngIf="!p.carrito" (click)="agregarToCarrito(p)"></ion-icon>\n                                  <ion-icon ios="ios-cart" md="ios-cart" *ngIf="p.carrito" style="color: #3b64bf;" (click)="productoService.deleteFavorito(p)"></ion-icon>\n                              </div>\n                            </div> -->\n          <div class="container-card" (click)="viewDetail(p)">\n\n            <img src="{{env.getImagenIndividual}}{{p.productoProveedor.producto.adjuntoId}}" />\n          </div>\n          <div class="container-text" (click)="viewDetail(p)">{{p.productoProveedor.producto.nombre}}</div>\n          <div class="description" (click)="viewDetail(p)">{{p.productoProveedor.producto.descripcion}}</div>\n          <div class="precio" (click)="viewDetail(p)">{{p.precio | currency}}</div>\n\n          <div class="contenedor-carrito" [ngStyle]="{\'text-align\': !p.cantidad || p.cantidad <= 0 ? \'end\' : \'\'}">\n            <div class="menos" *ngIf="p.cantidad > 0" (click)="decrementar(p)">\n              <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">-</div>\n            </div>\n            <div class="cantidad" *ngIf="p.cantidad > 0">\n              <div [ngStyle]="{\'color\': genericService.getColorHex()}">{{p.cantidad}}</div>\n            </div>\n            <div class="mas" (click)="incrementa(p)">\n              <div [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">+</div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="name-pro" [ngStyle]="{\'color\': genericService.getColorHex()}">Información</div>\n      <div *ngIf="proveedor.totalAgrupado" class="totales" style="    border: 1px solid #b7b7b7;\n      border-style: dashed;">\n          <div class="tot">Total por productos: <strong>{{proveedor.totalAgrupado.totalProductos}}</strong></div>\n          <div class="tot">Comisión de transporte: <strong>{{proveedor.totalAgrupado.comisionTransporte}}</strong></div>\n          <div class="tot" *ngIf="proveedor.totalAgrupado.tiempoEntrega">Tiempo de entrega: <strong>{{proveedor.totalAgrupado.tiempoEntrega}}</strong></div>\n          <div class="tot">Total: <strong>{{proveedor.totalAgrupado.total}}</strong></div>\n    \n        </div>\n    </div>\n\n    <div *ngIf="totales && totales.listHistoricoProveedores?.length > 0" class="totales" style="margin-bottom: 50px;">\n      <div class="tot">Total por productos: <strong>{{totales.totalProductos}}</strong></div>\n      <div class="tot">Comisión de transporte: <strong>{{totales.totalComisionTransporte}}</strong></div>\n      <div class="tot">Comisión por pago con tarjeta: <strong>{{totales.comisionStripe}}</strong></div>\n\n      <div class="borde-total"></div>\n\n      <div class="tot" style="font-size: 17px;">Total: <strong>{{totales.total}}</strong></div>\n    </div>\n  </div>\n</ion-content>\n<ion-footer class="footer-button-class" *ngIf="!enCompra">\n  <button style="width: 100%;" (tap)="infoContact()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Realizar\n    pedido</button>\n</ion-footer>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/carrito-historico/carrito-historico.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_10__angular_common__["c" /* CurrencyPipe */],
            __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* ModalController */]])
    ], CarritoHistoricoPage);
    return CarritoHistoricoPage;
}());

//# sourceMappingURL=carrito-historico.js.map

/***/ }),

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(64);
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
    function DocumentosPage(navCtrl, navParams, genericService, alertaService, camera, actionSheetCtrl, translatePipe) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genericService = genericService;
        this.alertaService = alertaService;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.translatePipe = translatePipe;
        this.documentos = [];
        this.documentosTmp = [];
        this.options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
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
            else {
                console.log("no fue necesario");
                _this.documentos.forEach(function (element) {
                    if (element.adjuntoId) {
                        element.imagen = "" + __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].getImagenIndividual + element.adjuntoId;
                    }
                });
                console.log(_this.documentos);
            }
        }, function (error) {
            var err = error.error;
            _this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
    };
    DocumentosPage.prototype.subirDocumento = function (documento) {
        this.opcionesDeImagen(documento);
    };
    DocumentosPage.prototype.opcionesDeImagen = function (documento) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Selecciona',
            buttons: [
                {
                    text: 'Captura',
                    icon: 'ios-camera-outline',
                    handler: function () {
                        _this.takeFoto(documento);
                    }
                },
                {
                    text: 'Selecciona',
                    icon: 'ios-archive-outline',
                    handler: function () {
                        _this.seleccionaImagen(documento);
                    }
                },
                {
                    text: 'Borrar',
                    icon: 'ios-trash-outline',
                    role: 'destructive',
                    handler: function () {
                        documento.imagen = null;
                    }
                },
                {
                    text: 'Cancel',
                    role: 'destructive',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    DocumentosPage.prototype.takeFoto = function (documento) {
        this.options.sourceType = this.camera.PictureSourceType.CAMERA;
        this.camera.getPicture(this.options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            documento.imagen = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    DocumentosPage.prototype.seleccionaImagen = function (documento) {
        this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        this.camera.getPicture(this.options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            documento.imagen = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    DocumentosPage.prototype.actualizar = function (documento) {
        var _this = this;
        var body = {
            documentoId: documento.documentoId,
            adjunto: {
                fileName: Math.round(new Date().getTime() / 1000) + ".jpg",
                contentType: "jpg",
                size: null,
                file: documento.imagen.split("data:image/jpeg;base64,")[1]
            }
        };
        this.genericService.sendPostRequest("" + __WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].usuarioDocumentos, body).subscribe(function (response) {
            _this.alertaService.successAlertGeneric("Tu documento se actualizó correctamente");
        }, function (error) {
            _this.alertaService.errorAlertGeneric("No se ha podido actualizar tu documento, intenta nuevamente");
        });
    };
    DocumentosPage.prototype.borrar = function (documento) {
        var _this = this;
        this.genericService.sendDeleteRequest(__WEBPACK_IMPORTED_MODULE_4__environments_environment_prod__["a" /* environment */].usuarioDocumentos + "/" + documento.usuarioDocumentoId).subscribe(function (response) {
            _this.alertaService.successAlertGeneric("Tu documento se eliminó correctamente");
        }, function (error) {
            _this.alertaService.errorAlertGeneric("No se ha podido borrar tu documento, intenta nuevamente");
        });
    };
    DocumentosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-documentos',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages-proveedor/documentos/documentos.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title>Documentos</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <div class="spinner-carrito" *ngIf="!documentos || documentos.length <= 0">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <ion-list *ngIf="documentos && documentos?.length > 0">\n    <ion-item-sliding #item *ngFor="let d of documentos">\n      <ion-item class="item-list-card" (click)="subirDocumento(d)" style="border-bottom: 1px solid #ddd;">\n        <ion-avatar slot="start">\n          <img src="assets/imgs/menu/file.png" alt="" *ngIf="!d.imagen">\n          <img src="{{d.imagen}}" alt="" *ngIf="d.imagen">\n        </ion-avatar>\n        <div class="datos-tarjetas" style="vertical-align: top;">\n          <div class="name" style="font-size:14px">Documento</div>\n          <div class="name" style="font-size:14px"><strong>{{d.nombre}}</strong></div>\n        </div>\n\n      </ion-item>\n      <ion-item-options side="right">\n        <button ion-button (click)="actualizar(card)" color="primary">\n          <ion-icon name="ios-create-outline"></ion-icon>\n          Editar\n        </button>\n        <button ion-button (click)="borrar(card)" color="danger">\n          <ion-icon name="ios-trash-outline"></ion-icon>\n          Borrar\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages-proveedor/documentos/documentos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_3__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */]])
    ], DocumentosPage);
    return DocumentosPage;
}());

//# sourceMappingURL=documentos.js.map

/***/ }),

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AcercaDePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_version__ = __webpack_require__(598);
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
            selector: 'page-acerca-de',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/acerca-de/acerca-de.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Acerca de</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="animated fadeIn acerca">\n    <div>\n      <img src="assets/imgs/logo.png" alt="">\n    </div>\n    <strong [ngStyle]="{\'color\':genericService.getColorHex()}">Luegoluego</strong> \n\n    <div>\n      Versión\n\n    </div>\n    <strong [ngStyle]="{\'color\':genericService.getColorHex()}">{{version}}</strong>\n\n    <div>Desarrollado por</div>\n    <img src="assets/imgs/Logo-SharkTech.png" alt="">\n\n    <div><strong [ngStyle]="{\'color\':genericService.getColorHex()}">© Copyright {{anio}}</strong></div>\n  </div>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/acerca-de/acerca-de.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_version__["a" /* AppVersion */]])
    ], AcercaDePage);
    return AcercaDePage;
}());

//# sourceMappingURL=acerca-de.js.map

/***/ }),

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AyudaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
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
            selector: 'page-ayuda',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/ayuda/ayuda.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Ayuda</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="texto">Utiliza nuestros siguientes medios de contacto</div>\n\n  <div class="separado">\n    <div>Telefono: <a href="tel:+527226490730">7226490730</a></div>\n\n    <div>Correo: <a href="mailto:soporte@luegoluego.com.mx">soporte@luegoluego.com.mx</a></div>\n  </div>\n\n  <div class="separado-icons">\n      <div class="icono"><img src="assets/imgs/ayuda/wats.png" alt=""></div>\n\n      <div class="icono"><img src="assets/imgs/ayuda/logo.png" alt=""></div>\n  </div>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/ayuda/ayuda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__services_generic_service__["a" /* GenericService */]])
    ], AyudaPage);
    return AyudaPage;
}());

//# sourceMappingURL=ayuda.js.map

/***/ }),

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_validation_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_action_sheet__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__home_geo_proveedores_home_geo_proveedores__ = __webpack_require__(72);
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
    function PerfilPage(navCtrl, navParams, formBuilder, localStorageEncryptService, camera, translatePipe, actionSheet, alertaService, genericService, loadingService, events, modalController, actionSheetCtrl) {
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
        this.actionSheetCtrl = actionSheetCtrl;
        this.photo_url = null;
        this.selectOptions = {
            cssClass: 'action-sheet-class'
        };
        //this.objetoRegistro[0].value = 
        this.objetoRegistro = [
            {
                name: "Nombre",
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
                else if (__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].perfil.activo == 3) {
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
                    file: _this.photo_url.split("data:image/jpeg;base64,")[1],
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
            else if (__WEBPACK_IMPORTED_MODULE_5__environments_environment_prod__["a" /* environment */].perfil.activo == 3) {
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
    PerfilPage.prototype.opcionesDeImagen = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Selecciona',
            buttons: [
                {
                    text: 'Captura',
                    icon: 'ios-camera-outline',
                    handler: function () {
                        _this.takeFoto();
                    }
                },
                {
                    text: 'Selecciona',
                    icon: 'ios-archive-outline',
                    handler: function () {
                        _this.seleccionaImagen();
                    }
                },
                {
                    text: 'Borrar',
                    icon: 'ios-trash-outline',
                    role: 'destructive',
                    handler: function () {
                        _this.photo_url = null;
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'destructive',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
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
            selector: 'page-perfil',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/perfil/perfil.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Mi perfil</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n\n  <div class="contenedor-step-3">\n    <div class="sub-contenedor">\n      <div class="avatar">\n        <div class="imagen" (tap)="opcionesDeImagen()">\n          <img src="assets/imgs/perfil/social-media.png" alt="" *ngIf="!photo_url && userResponse && !userResponse.adjuntoId">\n          <img src="{{photo_url}}" alt="" *ngIf="photo_url && !userResponse || !userResponse?.adjuntoId">\n          <img src="{{env.getImagenIndividual}}{{userResponse.adjuntoId}}" alt="" *ngIf="userResponse && userResponse.adjuntoId">\n        </div>\n      </div>\n\n      <div class="formulario" *ngIf="formGroup">\n        <form [formGroup]="formGroup">\n          <div *ngFor="let dato of objetoRegistro;let i = index" class="contenedor-input">\n            <div style="    width: 100%;\n            font-size: 14px;\n            color: #123;">{{dato.name}}</div>\n            <input class="inp" [attr.disabled]="dato.disabled ? \'\' : null" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}"\n              type="{{dato.type}}" [(ngModel)]="dato.value" maxlength="{{dato.length}}" *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\'"\n              [ngStyle]="{\'width\': dato.name == \'Dirección\' ? \'88%\' : \'100%\'}" placeholder="{{dato.name}}">\n            <div class="direc" *ngIf="dato.name == \'Dirección\'" (click)="getMapa()" style="display: inline-block;\n                width: 10%;\n                vertical-align: bottom;"><img\n                src="assets/imgs/direcciones/home-run.png" alt=""></div>\n            <ion-datetime class="dt" [(ngModel)]="dato.value" formControlName="{{dato.formName}}" text-left\n              pickerFormat="DD/MM/YYYY" cancelText="Cancelar" doneText="Aceptar" #fechaNac (ionChange)="ejecutaValidator()"\n              *ngIf="dato.type == \'date\'" placeholder="{{dato.name}}"></ion-datetime>\n\n            <ion-col col-2 class="text-center" *ngIf="dato.type == \'checkbox\'">\n              <ion-checkbox formControlName="{{dato.formName}}" [(ngModel)]="dato.value" (ionChange)="ejecutaValidator()">\n              </ion-checkbox>\n            </ion-col>\n\n            <ion-select *ngIf="dato.type == \'select\'" [(ngModel)]="dato.value" okText="Ok" cancelText="Cancelar"\n              interface="action-sheet" (ionChange)="ejecutaValidator()" [selectOptions]="selectOptions" formControlName="{{dato.formName}}">\n              <ion-option *ngFor="let op of dato.opts" [value]="op.id">\n                {{op.value}}\n              </ion-option>\n            </ion-select>\n\n            <app-control-messages [control]="formGroup.controls[dato.formName]" [clase]="\'validators2\'">\n            </app-control-messages>\n          </div>\n          <div class="contenedor-boton">\n            <button [disabled]="btnHabilitado" (click)="cambiarPerfil()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Aceptar</button>\n          </div>\n        </form>\n\n      </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/perfil/perfil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_7__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_action_sheet__["a" /* ActionSheet */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_1__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_2__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* ActionSheetController */]])
    ], PerfilPage);
    return PerfilPage;
}());

//# sourceMappingURL=perfil.js.map

/***/ }),

/***/ 601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TarjetasFrecuentesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__detalle_tarjeta_detalle_tarjeta__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(8);
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
            selector: 'page-tarjetas-frecuentes',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/tarjetas-frecuentes/tarjetas-frecuentes.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title>Tarjetas Frecuentes</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div class="spinner-carrito" *ngIf="!cards">\n        <ion-spinner></ion-spinner>\n    </div>\n    <ion-list>\n        <ion-item-sliding #item *ngFor="let card of cards">\n          <ion-item class="item-list-card" (click)="addCard(card)">\n            <ion-avatar slot="start">\n              <img src="assets/imgs/tarjetas/bank.png" alt="">\n            </ion-avatar>\n            <div class="datos-tarjetas">\n              <div class="name">{{card.alias}}</div>\n              <div class="number">{{card.numeroTarjeta}}</div>\n            </div>\n          </ion-item>\n      \n          <ion-item-options side="right">\n            <button ion-button (click)="borrar(card)" color="danger">\n              <ion-icon name="ios-trash-outline"></ion-icon>\n              Borrar\n            </button>\n          </ion-item-options>\n        </ion-item-sliding>\n      </ion-list>\n</ion-content>\n\n<ion-fab bottom right class="fab-cards animated swing">\n  <button ion-fab (click)="addCard()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">\n    <ion-icon name="add"></ion-icon>\n  </button>\n</ion-fab>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/tarjetas-frecuentes/tarjetas-frecuentes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_0__services_loading_service__["a" /* LoadingService */]])
    ], TarjetasFrecuentesPage);
    return TarjetasFrecuentesPage;
}());

//# sourceMappingURL=tarjetas-frecuentes.js.map

/***/ }),

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetalleTarjetaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_validation_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__environments_environment_prod__ = __webpack_require__(8);
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
            selector: 'page-detalle-tarjeta',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/detalle-tarjeta/detalle-tarjeta.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title *ngIf="card">{{card.alias}}</ion-title>\n    <ion-title *ngIf="!card">Nueva Tarjeta</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="contenedori">\n    <div class="formulario" *ngIf="render">\n      <form [formGroup]="formGroup">\n        <div *ngFor="let dato of objetoRegistro;let i = index" class="contenedor-input">\n          <input class="inp" placeholder="{{dato.name}}" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}" type="{{dato.type}}"\n            [(ngModel)]="dato.value" maxlength="{{dato.length}}" *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\' && dato.formName != \'ccv\'">\n  \n            <input placeholder="{{dato.name}}"  class="inp" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}" type="{{dato.type}}" type="password"\n            [(ngModel)]="dato.value" maxlength="{{dato.length}}" *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\' && dato.formName == \'ccv\'">\n  \n          <ion-datetime class="dt" [(ngModel)]="dato.value" formControlName="{{dato.formName}}" text-left pickerFormat="MM/YY"\n            cancelText="Cancelar" doneText="Aceptar" #fechaNac (ionChange)="ejecutaValidator()" *ngIf="dato.type == \'date\'"\n            placeholder="{{dato.name}}" min="2016" max="2050"></ion-datetime>\n  \n          <app-control-messages [control]="formGroup.controls[dato.formName]" [clase]="\'validators2\'">\n          </app-control-messages>\n        </div>\n        <div class="contenedor-boton">\n          <button [disabled]="btnHabilitado" (click)="guardar()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">Guardar</button>\n        </div>\n      </form>\n    </div>\n  </div>\n  \n</ion-content>\n<ion-footer class="footer-button-class">\n  <div style="text-align: end;" ><img src="assets/imgs/tarjetas/visa.jpg" alt="" style="width:60%"></div>\n</ion-footer>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/detalle-tarjeta/detalle-tarjeta.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_generic_service__["a" /* GenericService */]])
    ], DetalleTarjetaPage);
    return DetalleTarjetaPage;
}());

//# sourceMappingURL=detalle-tarjeta.js.map

/***/ }),

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__terminos_condiciones_terminos_condiciones__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_generic_service__ = __webpack_require__(7);
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
    InfoPage.prototype.irTerminos = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__terminos_condiciones_terminos_condiciones__["a" /* TerminosCondicionesPage */]);
    };
    InfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-info',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/info/info.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Información</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="title" [ngStyle]="{\'color\':genericService.getColorHex()}">Luegoluego</div>\n\n  <div class="texto">Esta aplicación esta diseñada para que los clientes en general puedan realizar sus compras desde la comodidad de su hogar, consultando los articulos de sus proveedores favoritos, garantizando siempre excelencia en el servicio, y con la seguridad que los estaremos acompañando en todo el proceso que dure su compra.</div>\n\n  <div class="ter" (click)="irTerminos()" [ngStyle]="{\'color\':genericService.getColorHex()}">Consulta los términos y condiciones</div>\n</ion-content>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/info/info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_generic_service__["a" /* GenericService */]])
    ], InfoPage);
    return InfoPage;
}());

//# sourceMappingURL=info.js.map

/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(611);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_change_password_change_password__ = __webpack_require__(612);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_transportista_tabs_tabs__ = __webpack_require__(673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_proveedor_documentos_documentos__ = __webpack_require__(596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_acerca_de_acerca_de__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_ayuda_ayuda__ = __webpack_require__(599);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_cambio_contrasenia_cambio_contrasenia__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_perfil_perfil__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_problemas_pedido_problemas_pedido__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_recupera_contrasenia_recupera_contrasenia__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_mapa_proveedores_mapa_proveedores__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_categoria_categoria__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_platform_browser__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_component__ = __webpack_require__(989);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_splash_screen__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_about_about__ = __webpack_require__(991);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_contact_contact__ = __webpack_require__(992);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_home_home__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_tabs_tabs__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ngx_translate_core__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ngx_translate_http_loader__ = __webpack_require__(993);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_common_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_module__ = __webpack_require__(995);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_login_login__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_registro_registro__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_control_messages_control_messages_component__ = __webpack_require__(999);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_gallery_gallery_component__ = __webpack_require__(1000);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_recuperar_password_recuperar_password__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_filtro_producto_filtro_producto__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_detalle_producto_detalle_producto__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_carrito_compras_carrito_compras__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_alta_direcciones_alta_direcciones__ = __webpack_require__(1001);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__directives_scroll_hide_directive__ = __webpack_require__(1002);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_lista_carrito_compras_lista_carrito_compras__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_tarjetas_frecuentes_tarjetas_frecuentes__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_detalle_tarjeta_detalle_tarjeta__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_opciones_menu_opciones_menu__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_home_geo_proveedores_home_geo_proveedores__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_chat_chat__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_articulo_productos_articulo_productos__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_carrito_historico_carrito_historico__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_direcciones_direcciones__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_compara_precios_proveedor_compara_precios_proveedor__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_articulo_proveedores_articulo_proveedores__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_historial_pedidos_historial_pedidos__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_historial_pedidos_detail_historial_pedidos_detail__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_pedidos_detail_pedidos_detail__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_termino_servicio_termino_servicio__ = __webpack_require__(1003);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_terminos_condiciones_terminos_condiciones__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pages_recibo_pago_recibo_pago__ = __webpack_require__(1004);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_info_info__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pages_proveedor_tabs_tabs__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_proveedor_home_proveedor_home_proveedor__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__pages_proveedor_ver_productos_ver_productos__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_qr_qr__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57_angularx_qrcode__ = __webpack_require__(1005);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__pages_lista_chat_lista_chat__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__pages_calificacion_calificacion__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__components_card_producto_card_producto_component__ = __webpack_require__(1010);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__pages_envio_transportista_envio_transportista__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__pages_envio_externo_envio_externo__ = __webpack_require__(585);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























































//import { EmojiPickerModule } from '@ionic-tools/emoji-picker';







function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_22__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_11__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_17__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_registro_registro__["a" /* RegistroPage */],
                __WEBPACK_IMPORTED_MODULE_27__components_control_messages_control_messages_component__["a" /* ControlMessagesComponent */],
                __WEBPACK_IMPORTED_MODULE_28__components_gallery_gallery_component__["a" /* GalleryComponent */],
                __WEBPACK_IMPORTED_MODULE_29__pages_recuperar_password_recuperar_password__["a" /* ProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_filtro_producto_filtro_producto__["a" /* FiltroProductoPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_detalle_producto_detalle_producto__["a" /* DetalleProductoPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_carrito_compras_carrito_compras__["a" /* CarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_alta_direcciones_alta_direcciones__["a" /* AltaDireccionesPage */],
                __WEBPACK_IMPORTED_MODULE_34__directives_scroll_hide_directive__["a" /* ScrollHideDirective */],
                __WEBPACK_IMPORTED_MODULE_35__pages_lista_carrito_compras_lista_carrito_compras__["a" /* ListaCarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_tarjetas_frecuentes_tarjetas_frecuentes__["a" /* TarjetasFrecuentesPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_detalle_tarjeta_detalle_tarjeta__["a" /* DetalleTarjetaPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_opciones_menu_opciones_menu__["a" /* OpcionesMenuPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_home_geo_proveedores_home_geo_proveedores__["a" /* HomeGeoProveedoresPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_categoria_categoria__["a" /* CategoriaPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_articulo_productos_articulo_productos__["a" /* ArticuloProductosPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_carrito_historico_carrito_historico__["a" /* CarritoHistoricoPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_direcciones_direcciones__["a" /* DireccionesPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_mapa_proveedores_mapa_proveedores__["a" /* MapaProveedoresPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_compara_precios_proveedor_compara_precios_proveedor__["a" /* ComparaPreciosProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_articulo_proveedores_articulo_proveedores__["a" /* ArticuloProveedoresPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_historial_pedidos_historial_pedidos__["a" /* HistorialPedidosPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_historial_pedidos_detail_historial_pedidos_detail__["a" /* HistorialPedidosDetailPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_pedidos_detail_pedidos_detail__["a" /* PedidosDetailPage */],
                __WEBPACK_IMPORTED_MODULE_61__pages_envio_transportista_envio_transportista__["a" /* EnvioTransportistaPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_recupera_contrasenia_recupera_contrasenia__["a" /* RecuperaContraseniaPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_termino_servicio_termino_servicio__["a" /* TerminoServicioPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_terminos_condiciones_terminos_condiciones__["a" /* TerminosCondicionesPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_recibo_pago_recibo_pago__["a" /* ReciboPagoPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_problemas_pedido_problemas_pedido__["a" /* ProblemasPedidoPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_info_info__["a" /* InfoPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_cambio_contrasenia_cambio_contrasenia__["a" /* CambioContraseniaPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_ayuda_ayuda__["a" /* AyudaPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_acerca_de_acerca_de__["a" /* AcercaDePage */],
                __WEBPACK_IMPORTED_MODULE_58__pages_lista_chat_lista_chat__["a" /* ListaChatPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_proveedor_tabs_tabs__["a" /* TabsProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_proveedor_home_proveedor_home_proveedor__["a" /* HomeProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_55__pages_proveedor_ver_productos_ver_productos__["a" /* VerProductosPage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_qr_qr__["a" /* QrPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_proveedor_documentos_documentos__["a" /* DocumentosPage */],
                __WEBPACK_IMPORTED_MODULE_59__pages_calificacion_calificacion__["a" /* CalificacionPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_transportista_tabs_tabs__["a" /* TabsTransportistaPage */],
                __WEBPACK_IMPORTED_MODULE_60__components_card_producto_card_producto_component__["a" /* CardProductoComponent */],
                __WEBPACK_IMPORTED_MODULE_0__pages_change_password_change_password__["a" /* ChangePasswordPage */],
                __WEBPACK_IMPORTED_MODULE_62__pages_envio_externo_envio_externo__["a" /* EnvioExternoPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_12__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_13_ionic_angular__["i" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                //EmojiPickerModule,
                __WEBPACK_IMPORTED_MODULE_24__providers_module__["a" /* ProvidersModule */],
                __WEBPACK_IMPORTED_MODULE_57_angularx_qrcode__["a" /* QRCodeModule */],
                __WEBPACK_IMPORTED_MODULE_23__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_21__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_21__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (createTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_23__angular_common_http__["b" /* HttpClient */]]
                    }
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_13_ionic_angular__["g" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_17__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_registro_registro__["a" /* RegistroPage */],
                __WEBPACK_IMPORTED_MODULE_27__components_control_messages_control_messages_component__["a" /* ControlMessagesComponent */],
                __WEBPACK_IMPORTED_MODULE_28__components_gallery_gallery_component__["a" /* GalleryComponent */],
                __WEBPACK_IMPORTED_MODULE_29__pages_recuperar_password_recuperar_password__["a" /* ProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_filtro_producto_filtro_producto__["a" /* FiltroProductoPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_detalle_producto_detalle_producto__["a" /* DetalleProductoPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_carrito_compras_carrito_compras__["a" /* CarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_alta_direcciones_alta_direcciones__["a" /* AltaDireccionesPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_lista_carrito_compras_lista_carrito_compras__["a" /* ListaCarritoComprasPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_tarjetas_frecuentes_tarjetas_frecuentes__["a" /* TarjetasFrecuentesPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_detalle_tarjeta_detalle_tarjeta__["a" /* DetalleTarjetaPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_opciones_menu_opciones_menu__["a" /* OpcionesMenuPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_home_geo_proveedores_home_geo_proveedores__["a" /* HomeGeoProveedoresPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_categoria_categoria__["a" /* CategoriaPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_articulo_productos_articulo_productos__["a" /* ArticuloProductosPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_carrito_historico_carrito_historico__["a" /* CarritoHistoricoPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_direcciones_direcciones__["a" /* DireccionesPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_mapa_proveedores_mapa_proveedores__["a" /* MapaProveedoresPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_compara_precios_proveedor_compara_precios_proveedor__["a" /* ComparaPreciosProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_articulo_proveedores_articulo_proveedores__["a" /* ArticuloProveedoresPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_historial_pedidos_historial_pedidos__["a" /* HistorialPedidosPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_historial_pedidos_detail_historial_pedidos_detail__["a" /* HistorialPedidosDetailPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_pedidos_detail_pedidos_detail__["a" /* PedidosDetailPage */],
                __WEBPACK_IMPORTED_MODULE_61__pages_envio_transportista_envio_transportista__["a" /* EnvioTransportistaPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_recupera_contrasenia_recupera_contrasenia__["a" /* RecuperaContraseniaPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_termino_servicio_termino_servicio__["a" /* TerminoServicioPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_terminos_condiciones_terminos_condiciones__["a" /* TerminosCondicionesPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_recibo_pago_recibo_pago__["a" /* ReciboPagoPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_problemas_pedido_problemas_pedido__["a" /* ProblemasPedidoPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_info_info__["a" /* InfoPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_cambio_contrasenia_cambio_contrasenia__["a" /* CambioContraseniaPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_ayuda_ayuda__["a" /* AyudaPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_acerca_de_acerca_de__["a" /* AcercaDePage */],
                __WEBPACK_IMPORTED_MODULE_58__pages_lista_chat_lista_chat__["a" /* ListaChatPage */],
                __WEBPACK_IMPORTED_MODULE_62__pages_envio_externo_envio_externo__["a" /* EnvioExternoPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_proveedor_tabs_tabs__["a" /* TabsProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_proveedor_home_proveedor_home_proveedor__["a" /* HomeProveedorPage */],
                __WEBPACK_IMPORTED_MODULE_55__pages_proveedor_ver_productos_ver_productos__["a" /* VerProductosPage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_qr_qr__["a" /* QrPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_proveedor_documentos_documentos__["a" /* DocumentosPage */],
                __WEBPACK_IMPORTED_MODULE_59__pages_calificacion_calificacion__["a" /* CalificacionPage */],
                __WEBPACK_IMPORTED_MODULE_60__components_card_producto_card_producto_component__["a" /* CardProductoComponent */],
                __WEBPACK_IMPORTED_MODULE_1__pages_transportista_tabs_tabs__["a" /* TabsTransportistaPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_change_password_change_password__["a" /* ChangePasswordPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_11__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_13_ionic_angular__["h" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 612:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_validation_service__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChangePasswordPage = /** @class */ (function () {
    function ChangePasswordPage(navCtrl, navParams, formBuilder, localStorageEncryptService, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.localStorageEncryptService = localStorageEncryptService;
        this.events = events;
        this.objetoRegistro = [
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
        this.formGroup = null;
        this.btnHabilitado = true;
        this.user = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
        var putObj = {};
        this.objetoRegistro.forEach(function (item) {
            var tmp = [];
            tmp[0] = null;
            tmp[1] = [];
            if (item.required) {
                tmp[1].push(__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required);
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
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
    };
    ChangePasswordPage.prototype.regresar = function () {
        var id = document.getElementById("icn-3");
        id.style.display = "none";
        this.navCtrl.pop();
    };
    ChangePasswordPage.prototype.guardar = function () {
        this.objetoRegistro.forEach(function (item) {
        });
    };
    /**Verifica validaciones */
    ChangePasswordPage.prototype.ejecutaValidator = function () {
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
        //Verificar correo
        if (validacion <= 0) {
            this.btnHabilitado = false;
        }
        else {
            this.btnHabilitado = true;
        }
    };
    ChangePasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-change-password',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/change-password/change-password.html"*/'<ion-icon id="icn-3" name="ios-arrow-back" class="arrow-generada" (click)="regresar()"></ion-icon>\n<ion-content>\n  <div class="contenedor-step-3">\n    <div class="sub-contenedor">\n      <div class="title">\n        <h4>Cambio de contraseña</h4>\n      </div>\n      <div class="formulario">\n        <form [formGroup]="formGroup">\n          <div *ngFor="let dato of objetoRegistro;let i = index" class="contenedor-input">\n            <span>{{dato.name}}</span>\n\n            <input class="inp" (keyup)="ejecutaValidator()" formControlName="{{dato.formName}}" type="{{dato.type}}"\n              [(ngModel)]="dato.value" maxlength="{{dato.length}}"\n              *ngIf="dato.type != \'date\' && dato.type != \'checkbox\' && dato.type != \'select\'">\n\n            <ion-datetime class="dt" [(ngModel)]="dato.value" formControlName="{{dato.formName}}" text-left\n              pickerFormat="DD/MM/YYYY" cancelText="Cancelar" doneText="Aceptar" #fechaNac\n              (ionChange)="ejecutaValidator()" *ngIf="dato.type == \'date\'" placeholder="01/12/2020"></ion-datetime>\n\n            <ion-col col-2 class="text-center" *ngIf="dato.type == \'checkbox\'">\n              <ion-checkbox formControlName="{{dato.formName}}" [(ngModel)]="dato.value"\n                (ionChange)="ejecutaValidator()">\n              </ion-checkbox>\n            </ion-col>\n\n            <ion-select *ngIf="dato.type == \'select\'" [(ngModel)]="dato.value" \n              okText="Ok" cancelText="Cancelar" interface="action-sheet"\n              (ionChange)="ejecutaValidator()" [selectOptions]="selectOptions" \n              formControlName="{{dato.formName}}">\n              <ion-option *ngFor="let op of dato.opts" [value]="op.id">\n                {{op.value}}\n              </ion-option>\n            </ion-select>\n\n            <app-control-messages [control]="formGroup.controls[dato.formName]" [clase]="\'validators2\'">\n            </app-control-messages>\n          </div>\n          <div class="contenedor-boton">\n            <button [disabled]="btnHabilitado" (click)="guardar()">Guardar</button>\n          </div>\n        </form>\n\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/change-password/change-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */]])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());

//# sourceMappingURL=change-password.js.map

/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsTransportistaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_proveedor_home_proveedor_home_proveedor__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsTransportistaPage = /** @class */ (function () {
    function TabsTransportistaPage(genericService, localStorageEncryptService) {
        this.genericService = genericService;
        this.localStorageEncryptService = localStorageEncryptService;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__pages_proveedor_home_proveedor_home_proveedor__["a" /* HomeProveedorPage */];
        this.user = null;
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    }
    TabsTransportistaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages-transportista/tabs/tabs.html"*/'<ion-tabs color="{{genericService.getColor()}}">\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages-transportista/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_0__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */]])
    ], TabsTransportistaPage);
    return TabsTransportistaPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TIME_OUT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenericService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(5);
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
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["e" /* Events */]])
    ], GenericService);
    return GenericService;
}());

//# sourceMappingURL=generic.service.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeGeoProveedoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_leaflet__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_open_native_settings__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_diagnostic__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_android_permissions__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__direcciones_direcciones__ = __webpack_require__(214);
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
                    _this.navCtrl.pop();
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
            //this.getPositionEmulate();
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
    HomeGeoProveedoresPage.prototype.ngOnDestroy = function () {
        var claseTabs = document.getElementsByClassName("tabbar");
        if (claseTabs[0]) {
            claseTabs[0].style.display = "flex";
        }
    };
    HomeGeoProveedoresPage.prototype.getPositionEmulate = function () {
        console.log("emulado");
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
        }, function (err) {
            console.log(err);
        }, { timeout: 10000 });
    };
    HomeGeoProveedoresPage.prototype.getPosition = function () {
        var _this = this;
        console.log("---position---");
        console.log(this.geolocation);
        this.geolocation.getCurrentPosition()
            .then(function (response) {
            console.log(response);
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
            var params = new __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["e" /* HttpParams */]();
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
                    if (results[0]) {
                        _this.data.direccion = results[0].formatted_address;
                        _this.data.codigoPostal = "";
                    }
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
                    var params = new __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["e" /* HttpParams */]();
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
                            if (results[0]) {
                                component.data.direccion = results[0].formatted_address;
                                component.data.codigoPostal = "";
                            }
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
            selector: 'page-home-geo-proveedores',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/home-geo-proveedores/home-geo-proveedores.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title *ngIf="!fromModal">\n      {{!direccion ? \'Alta de dirección\' : \'Actualizar de dirección\'}}\n    </ion-title>\n    <ion-title *ngIf="fromModal">\n      Datos de contacto\n    </ion-title>\n\n    <ion-buttons start *ngIf="fromModal">\n      <button ion-button (click)="dismiss(false)">\n        <span color="secundary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android, windows" style="font-size: 2.4rem;"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <div id="locationField" class="buscador">\n    <input id="autocomplete" placeholder="Buscar" (ionFocus)="geolocate()" type="text" />\n\n    <div *ngIf="!fromModal">\n      <img src="assets/imgs/direcciones/home-run.png" alt="">\n    </div>\n\n    <div *ngIf="fromModal" (click)="selectFrecuente()">\n      <img src="assets/imgs/direcciones/home-run.png" alt="">\n    </div>\n  </div>\n</ion-header>\n\n<ion-content>\n\n  <div class="spinner-carrito" *ngIf="!muestraMapa">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <div id="map_canvas" class="mapita-google"></div>\n\n  <div id="map" style="height: 50%;" *ngIf="1==2"></div>\n\n  <div class="card-proveedor">\n\n  </div>\n</ion-content>\n\n<ion-footer class="footer-button-class" *ngIf="muestraMapa && !fromModal">\n  <button style="width:100%" (tap)="addToList()" [ngStyle]="{\'background-color\': genericService.getColorHex()}">{{!direccion\n    ? \'Agregar\' : \'Actualizar\'}} dirección</button>\n</ion-footer>\n<ion-footer class="footer-button-class" *ngIf="muestraMapa && fromModal">\n  <button style="width:49%" (tap)="addToList()" [ngStyle]="{\'background-color\': genericService.getColorHex()}" *ngIf="!fromRegister">Guardar\n    y aceptar</button>\n  <button style="width:49%" (tap)="backData()" [ngStyle]="{\'background-color\': genericService.getColorHex(), \'width\' : fromRegister ? \'100%\' : \'49%\'}">Aceptar</button>\n</ion-footer>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/home-geo-proveedores/home-geo-proveedores.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_2__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_1__services_loading_service__["a" /* LoadingService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_open_native_settings__["a" /* OpenNativeSettings */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* PopoverController */]])
    ], HomeGeoProveedoresPage);
    return HomeGeoProveedoresPage;
}());

//# sourceMappingURL=home-geo-proveedores.js.map

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export pathPrincipal */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pathChat; });
/* unused harmony export pathLuegoluegoNew */
/* unused harmony export appCliente */
/* unused harmony export appProveedor */
/* unused harmony export appTransportista */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
//export const pathPrincipal = "http://localhost:8080/api/";
/**PATH DEVELOPMENT */
var pathPrincipal = "https://dev-cabasto.sharktech.com.mx/api/";
var pathChat = "https://dev-cabasto.sharktech.com.mx/";
/**PATH PRODUCTIVO */
/* export const pathPrincipal = "https://app.luegoluego.com.mx/api/";
export const pathChat = "https://app.luegoluego.com.mx/";
 */
//export const pathChat = "http://localhost:8080/";
//mod ubuntu
//DEV
//export const pathLuegoluegoNew = "http://localhost:8888/luegoluego/luegoluego/";
//PRO
var pathLuegoluegoNew = "https://custom.luegoluego.com.mx/luegoluego/luegoluego/";
var appCliente = 1;
var appProveedor = 2;
var appTransportista = 3;
var environment = {
    genericQuerie: pathLuegoluegoNew + "generic-querie",
    production: true,
    productos: pathPrincipal + "productos",
    productosCategoria: pathPrincipal + "productos/home",
    //proveedorProductos: `${pathPrincipal}proveedor-productos`,
    proveedorProductos: pathLuegoluegoNew + "proveedor-productos",
    cotizaciones: pathLuegoluegoNew + "cotizaciones",
    categoria: pathPrincipal + "proveedor-productos/categoria/",
    secciones: pathPrincipal + "seccions",
    categorias: pathPrincipal + "categorias",
    proveedores: pathPrincipal + "proveedors",
    //proveedoresFull: `${pathPrincipal}proveedores`,
    proveedoresFull: pathLuegoluegoNew + "proveedores",
    proveedor: pathPrincipal + "proveedor",
    transportista: pathPrincipal + "transportista",
    proveedoresProducto: pathPrincipal + "proveedores/producto/",
    registro: pathLuegoluegoNew + "register",
    //registro: `${pathPrincipal}register`,
    login: pathLuegoluegoNew + "authenticate",
    //login: `${pathPrincipal}authenticate`,
    //carritoCompras: `${pathPrincipal}carrito-compras`,
    carritoCompras: pathLuegoluegoNew + "carrito-compras",
    carritoHistorico: pathPrincipal + "carrito-historicos",
    carritoHistoricoDetalle: pathPrincipal + "carrito-historico-detalles",
    //getImagenIndividual: `${pathPrincipal}adjuntos/download/`,
    getImagenIndividual: pathLuegoluegoNew + "adjuntos/download/",
    promociones: pathLuegoluegoNew + "promociones",
    tarjetas: pathPrincipal + "tarjetas",
    direcciones: pathPrincipal + "usuario-direcciones",
    tipoDirecciones: pathPrincipal + "tipo-direcciones",
    //pedidos: `${pathPrincipal}pedidos`,
    pedidos: pathLuegoluegoNew + "pedidos",
    pedidosProveedor: pathPrincipal + "proveedor/pedidos",
    pedidosTransportista: pathPrincipal + "transportista/pedidos",
    pedidosProveedores: pathLuegoluegoNew + "proveedor/pedido-proveedores",
    pedidosTransportistas: pathPrincipal + "transportista/pedido-proveedores",
    calificacionServicio: pathPrincipal + "pedido-proveedores/calificacion-servicio",
    usuarios: pathPrincipal + "usuarios",
    llegada: pathPrincipal + "transportista/pedido-proveedores/notificacion-llegada",
    queja: pathPrincipal + "quejas",
    usuarioDocumentos: pathPrincipal + "usuario-documentos",
    users: pathPrincipal + "users",
    chats: pathPrincipal + "chats",
    chatsProveedor: pathPrincipal + "proveedor/chats/pedido-proveedor/",
    cambioContraseña: pathPrincipal + "account/change-password",
    //carritoComprasProveedor: `${pathPrincipal}carrito-compras-proveedor`,
    carritoComprasProveedor: pathLuegoluegoNew + "carrito-compras-proveedor",
    carritoHistoricosProveedor: pathPrincipal + "carrito-historicos-proveedores",
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
    keyGoogle: "AIzaSyBTzFU__xJrf9DvyWrVToCVfRWoIUIEmx0",
    //Fines de pruebas
    emulado: true,
    //Aqui "cambiamos" la app en ejecución
    perfil: {
        activo: appCliente,
    },
    st: {
        keyPublic: 'U2FsdGVkX19CQc0Np+So9tyR3R9dAm7lOeyk2UQ+FoHcjsmxFAcZES1Hix101zBa1gljuF7xoHmJQVXb6oP6Mg=='
        //keyPublic: 'U2FsdGVkX1/ADpxluaklCuGOBDdLHN6q44K8U8mHKBbCF95IBvllQPUxmSiAyj9hqImPuFlYzLS2MUFJU9ZOdg==',
    }
};
//# sourceMappingURL=environment.prod.js.map

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageEncryptService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js__ = __webpack_require__(649);
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
        //private secretKey = 'luegoluegoShark';
        this.secretKey = 'RG5vt457u%$5bj78c452YBBc24432c%#T7&$tv657bu6B&BvH76hvv64';
        /**
         * Llave secreta para encriptar y desencriptar la informacion almacenada
         */
        //private secretKey = '23dejulio08F!';
        this.CryptoJSAesJson = {
            stringify: function (cipherParams) {
                var j = { ct: cipherParams.ciphertext.toString(__WEBPACK_IMPORTED_MODULE_1_crypto_js__["enc"].Base64) };
                if (cipherParams.iv)
                    j.iv = cipherParams.iv.toString();
                if (cipherParams.salt)
                    j.s = cipherParams.salt.toString();
                return JSON.stringify(j);
            },
            parse: function (jsonStr) {
                var j = JSON.parse(jsonStr);
                var cipherParams = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["lib"].CipherParams.create({ ciphertext: __WEBPACK_IMPORTED_MODULE_1_crypto_js__["enc"].Base64.parse(j.ct) });
                if (j.iv)
                    cipherParams.iv = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["enc"].Hex.parse(j.iv);
                if (j.s)
                    cipherParams.salt = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["enc"].Hex.parse(j.s);
                return cipherParams;
            }
        };
    }
    LocalStorageEncryptService.prototype.encryptBack = function (data) {
        var encryptedData = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["AES"].encrypt(JSON.stringify(data), this.secretKey, { format: this.CryptoJSAesJson }).toString();
        //console.log(encryptedData);
        return encryptedData;
    };
    LocalStorageEncryptService.prototype.decryptBack = function (data) {
        //let encryptedData: any = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
        return JSON.parse(__WEBPACK_IMPORTED_MODULE_1_crypto_js__["AES"].decrypt(JSON.stringify(data), this.secretKey, { format: this.CryptoJSAesJson }).toString(__WEBPACK_IMPORTED_MODULE_1_crypto_js__["enc"].Utf8));
    };
    /**
     * Almacena encriptado los datos necesarios en el localstorage
     * @param key Llave a almacenar
     * @param data Dato a almacenar
     */
    LocalStorageEncryptService.prototype.setToLocalStorage = function (key, data) {
        var encryptedData = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["AES"].encrypt(JSON.stringify(data), this.secretKey).toString();
        //console.log("encriptado",encryptedData);
        var encryptedKey = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["SHA256"](key).toString();
        encryptedData = JSON.stringify(data);
        encryptedKey = key;
        localStorage.setItem(encryptedKey, encryptedData);
    };
    LocalStorageEncryptService.prototype.yayirobe = function (data) {
        return __WEBPACK_IMPORTED_MODULE_1_crypto_js__["AES"].decrypt(data, this.secretKey).toString(__WEBPACK_IMPORTED_MODULE_1_crypto_js__["enc"].Utf8);
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

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpcionesMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cambio_contrasenia_cambio_contrasenia__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lista_carrito_compras_lista_carrito_compras__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_header_color__ = __webpack_require__(221);
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
    function OpcionesMenuPage(navCtrl, navParams, localStorageEncryptService, alertCtrl, app, viewCtrl, events, genericService, headerColor) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localStorageEncryptService = localStorageEncryptService;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.viewCtrl = viewCtrl;
        this.events = events;
        this.genericService = genericService;
        this.headerColor = headerColor;
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
                this.headerColor.tint("#3b64c0");
                break;
            case 2:
                this.localStorageEncryptService.setToLocalStorage("theme", "#be3b3b");
                this.headerColor.tint("#be3b3b");
                break;
            case 3:
                this.localStorageEncryptService.setToLocalStorage("theme", "#3bb8be");
                this.headerColor.tint("#3bb8be");
                break;
            case 4:
                this.localStorageEncryptService.setToLocalStorage("theme", "#74be3b");
                this.headerColor.tint("#74be3b");
                break;
            case 5:
                this.localStorageEncryptService.setToLocalStorage("theme", "#292929");
                this.headerColor.tint("#292929");
                break;
            case 6:
                this.localStorageEncryptService.setToLocalStorage("theme", "#F07C1B");
                this.headerColor.tint("#F07C1B");
                break;
            default:
                this.localStorageEncryptService.setToLocalStorage("theme", "#3b64c0");
                this.headerColor.tint("#3b64c0");
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
            selector: 'page-opciones-menu',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/opciones-menu/opciones-menu.html"*/'<div>\n  <ion-list>\n    <ion-list-header style="margin: 0px;">General</ion-list-header>\n\n    <!-- <div style="padding: 10px;text-align: center;">Elige un tema</div>\n    <ion-row class="rowi">\n      <ion-col col-2 class="tema-6">\n        <button (click)="change(6)"></button>\n      </ion-col>\n      <ion-col col-2 class="tema-1">\n        <button (click)="change(1)"></button>\n      </ion-col>\n      <ion-col col-2 class="tema-2">\n        <button (click)="change(2)"></button>\n      </ion-col>\n      <ion-col col-2 class="tema-3">\n        <button (click)="change(3)"></button>\n      </ion-col>\n      <ion-col col-2 class="tema-4">\n        <button (click)="change(4)"></button>\n      </ion-col>\n      <ion-col col-2 class="tema-5">\n        <button (click)="change(5)"></button>\n      </ion-col>\n    </ion-row> -->\n\n    <button ion-item (click)="openListCarrito()" *ngIf="user && env.perfil.activo == 1">\n      <ion-icon name="ios-cart-outline" style="font-size: 2.4rem;"></ion-icon>\n      Listas de carrito\n    </button>\n\n    <button ion-item (click)="cambiarContra()" *ngIf="user">\n      <ion-icon name="ios-construct-outline" style="font-size: 2.4rem;"></ion-icon>\n      Cambiar contraseña\n    </button>\n\n    <button ion-item (click)="logout()" *ngIf="user">\n      <ion-icon name="ios-log-out-outline" style="font-size: 2.4rem;"></ion-icon>\n      Cerrar sesión\n    </button>\n\n    <button ion-item (click)="login()" *ngIf="!user">\n      <ion-icon name="ios-log-out-outline" style="font-size: 2.4rem;"></ion-icon>\n      Iniciar sesión\n    </button>\n  </ion-list>\n</div>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/opciones-menu/opciones-menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_header_color__["a" /* HeaderColor */]])
    ], OpcionesMenuPage);
    return OpcionesMenuPage;
}());

//# sourceMappingURL=opciones-menu.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_chat_service__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__ = __webpack_require__(8);
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
        this.activoChat = false;
        this.subscription = null;
        this.chat = navParams.get("chat");
        this.pedido = navParams.get("pedido");
        this.localStorageEncryptService.setToLocalStorage("pedidoChat", this.pedido.id);
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
        this.events.subscribe("updateChat", function (data) {
            try {
                _this.verChat();
            }
            catch (error) {
            }
        });
    }
    ChatPage.prototype.ngOnDestroy = function () {
        this.events.unsubscribe("updateChat");
        var claseTabs = document.getElementsByClassName("tabbar");
        claseTabs[0].style.display = "flex";
        clearInterval(this.intervalo);
        this.intervalo = null;
        this.localStorageEncryptService.clearProperty("pedidoChat");
    };
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
        var dimensions = this.content.getContentDimensions();
        this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
        this.intervalo = setInterval(function () {
            _this.verChat();
        }, 2000);
    };
    ChatPage.prototype.verChat = function () {
        var _this = this;
        switch (__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].perfil.activo) {
            case 1:
                if (this.subscription) {
                    this.subscription.unsubscribe();
                }
                this.subscription = this.genericService.sendGetRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].chats + "/" + this.chat.id).subscribe(function (response) {
                    if (_this.chat.chatDetalles.length < response.chatDetalles) {
                        var dimensions = _this.content.getContentDimensions();
                        _this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
                    }
                    _this.chat = response;
                }, function (error) {
                    var err = error.error;
                    //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
                break;
            case 2:
                if (this.subscription) {
                    this.subscription.unsubscribe();
                }
                this.subscription = this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].chatsProveedor + this.pedido.pedidoProveedores[0].id + "/tipoChat/1").subscribe(function (response) {
                    if (_this.chat.chatDetalles.length < response.chatDetalles) {
                        var dimensions = _this.content.getContentDimensions();
                        _this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
                    }
                    _this.chat = response;
                }, function (error) {
                    var err = error.error;
                    //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
                break;
            case 3:
                if (this.subscription) {
                    this.subscription.unsubscribe();
                }
                this.subscription = this.genericService.sendGetRequest("" + __WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].chatsProveedor + this.pedido.pedidoProveedores[0].id + "/tipoChat/2").subscribe(function (response) {
                    if (_this.chat.chatDetalles.length < response.chatDetalles) {
                        var dimensions = _this.content.getContentDimensions();
                        _this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
                    }
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
        if (!this.activoChat) {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.activoChat = true;
            this.subscription = this.genericService.sendPostRequest(__WEBPACK_IMPORTED_MODULE_6__environments_environment_prod__["a" /* environment */].chats + "/messages", body).subscribe(function (response) {
                _this.chat.chatDetalles.push(response);
                var dimensions = _this.content.getContentDimensions();
                _this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
                _this.mensaje = '';
                _this.activoChat = false;
            }, function (error) {
                _this.activoChat = false;
                _this.alertaService.errorAlertGeneric("No se ha podido enviar tu mensaje, intenta nuevamente");
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Content */])
    ], ChatPage.prototype, "content", void 0);
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/chat/chat.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}" [ngStyle]="{\'background-color\': color}">\n    <ion-title style="text-align:center">Chat</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="contenedor-chat">\n    <div class="cont-msj">\n      <div class="msj" style="margin-bottom: 10px;" [ngClass]="{\'msj\' : user.username == c.usuarioEmisorLogin, \'msj-r\' : user.username != c.usuarioEmisorLogin}"\n        *ngFor="let c of chat.chatDetalles">\n        <div class="{{user.username == c.usuarioEmisorLogin ? genericService.getColorClassChat() : \'m\'}}" [ngStyle]="{\'background-color\': user.username == c.usuarioEmisorLogin ? genericService.getColorHex(): \'\'}">\n          <div>{{c.mensaje}}</div>\n          <div style="font-size:9px">{{c.fecha}}</div>\n        </div>\n      </div>\n    </div>\n    <!-- <div class="uno">\n      <span>\n        <div class="dos">\n          <span class="span1"></span>\n          <span class="span2"></span>\n          <div class="tres">\n              <div class="cuatro">\n                  <div class="cinco">\n                      <div class="seis">\n                        <span>\n                          <span>Hola</span>\n                        </span>\n                      </div>\n                  </div>\n              </div>\n          </div>\n        </div>\n      </span>\n    </div> -->\n  </div>\n\n\n</ion-content>\n<ion-footer class="footer-chat">\n  <div>\n    <!-- <button class="emoji" ion-button clear icon-only (click)="toggled = !toggled" [(emojiPickerIf)]="toggled" [emojiPickerDirection]="\'top\'"\n      (emojiPickerSelect)="handleSelection($event)">\n      <ion-icon name="ios-happy-outline"></ion-icon>\n    </button> -->\n    <input type="text" style="width:89%" placeholder="Escribe un mensaje aquí" [(ngModel)]="mensaje">\n    <div>\n      <button (click)="sendMessage()">\n        <ion-icon name="md-send"></ion-icon>\n      </button>\n    </div>\n  </div>\n</ion-footer>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/chat/chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_5__services_chat_service__["a" /* ChatService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alerta_service__["a" /* AlertaService */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 980:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 456,
	"./af.js": 456,
	"./ar": 457,
	"./ar-dz": 458,
	"./ar-dz.js": 458,
	"./ar-kw": 459,
	"./ar-kw.js": 459,
	"./ar-ly": 460,
	"./ar-ly.js": 460,
	"./ar-ma": 461,
	"./ar-ma.js": 461,
	"./ar-sa": 462,
	"./ar-sa.js": 462,
	"./ar-tn": 463,
	"./ar-tn.js": 463,
	"./ar.js": 457,
	"./az": 464,
	"./az.js": 464,
	"./be": 465,
	"./be.js": 465,
	"./bg": 466,
	"./bg.js": 466,
	"./bm": 467,
	"./bm.js": 467,
	"./bn": 468,
	"./bn.js": 468,
	"./bo": 469,
	"./bo.js": 469,
	"./br": 470,
	"./br.js": 470,
	"./bs": 471,
	"./bs.js": 471,
	"./ca": 472,
	"./ca.js": 472,
	"./cs": 473,
	"./cs.js": 473,
	"./cv": 474,
	"./cv.js": 474,
	"./cy": 475,
	"./cy.js": 475,
	"./da": 476,
	"./da.js": 476,
	"./de": 477,
	"./de-at": 478,
	"./de-at.js": 478,
	"./de-ch": 479,
	"./de-ch.js": 479,
	"./de.js": 477,
	"./dv": 480,
	"./dv.js": 480,
	"./el": 481,
	"./el.js": 481,
	"./en-SG": 482,
	"./en-SG.js": 482,
	"./en-au": 483,
	"./en-au.js": 483,
	"./en-ca": 484,
	"./en-ca.js": 484,
	"./en-gb": 485,
	"./en-gb.js": 485,
	"./en-ie": 486,
	"./en-ie.js": 486,
	"./en-il": 487,
	"./en-il.js": 487,
	"./en-nz": 488,
	"./en-nz.js": 488,
	"./eo": 489,
	"./eo.js": 489,
	"./es": 490,
	"./es-do": 491,
	"./es-do.js": 491,
	"./es-us": 492,
	"./es-us.js": 492,
	"./es.js": 490,
	"./et": 493,
	"./et.js": 493,
	"./eu": 494,
	"./eu.js": 494,
	"./fa": 495,
	"./fa.js": 495,
	"./fi": 496,
	"./fi.js": 496,
	"./fo": 497,
	"./fo.js": 497,
	"./fr": 498,
	"./fr-ca": 499,
	"./fr-ca.js": 499,
	"./fr-ch": 500,
	"./fr-ch.js": 500,
	"./fr.js": 498,
	"./fy": 501,
	"./fy.js": 501,
	"./ga": 502,
	"./ga.js": 502,
	"./gd": 503,
	"./gd.js": 503,
	"./gl": 504,
	"./gl.js": 504,
	"./gom-latn": 505,
	"./gom-latn.js": 505,
	"./gu": 506,
	"./gu.js": 506,
	"./he": 507,
	"./he.js": 507,
	"./hi": 508,
	"./hi.js": 508,
	"./hr": 509,
	"./hr.js": 509,
	"./hu": 510,
	"./hu.js": 510,
	"./hy-am": 511,
	"./hy-am.js": 511,
	"./id": 512,
	"./id.js": 512,
	"./is": 513,
	"./is.js": 513,
	"./it": 514,
	"./it-ch": 515,
	"./it-ch.js": 515,
	"./it.js": 514,
	"./ja": 516,
	"./ja.js": 516,
	"./jv": 517,
	"./jv.js": 517,
	"./ka": 518,
	"./ka.js": 518,
	"./kk": 519,
	"./kk.js": 519,
	"./km": 520,
	"./km.js": 520,
	"./kn": 521,
	"./kn.js": 521,
	"./ko": 522,
	"./ko.js": 522,
	"./ku": 523,
	"./ku.js": 523,
	"./ky": 524,
	"./ky.js": 524,
	"./lb": 525,
	"./lb.js": 525,
	"./lo": 526,
	"./lo.js": 526,
	"./lt": 527,
	"./lt.js": 527,
	"./lv": 528,
	"./lv.js": 528,
	"./me": 529,
	"./me.js": 529,
	"./mi": 530,
	"./mi.js": 530,
	"./mk": 531,
	"./mk.js": 531,
	"./ml": 532,
	"./ml.js": 532,
	"./mn": 533,
	"./mn.js": 533,
	"./mr": 534,
	"./mr.js": 534,
	"./ms": 535,
	"./ms-my": 536,
	"./ms-my.js": 536,
	"./ms.js": 535,
	"./mt": 537,
	"./mt.js": 537,
	"./my": 538,
	"./my.js": 538,
	"./nb": 539,
	"./nb.js": 539,
	"./ne": 540,
	"./ne.js": 540,
	"./nl": 541,
	"./nl-be": 542,
	"./nl-be.js": 542,
	"./nl.js": 541,
	"./nn": 543,
	"./nn.js": 543,
	"./pa-in": 544,
	"./pa-in.js": 544,
	"./pl": 545,
	"./pl.js": 545,
	"./pt": 546,
	"./pt-br": 547,
	"./pt-br.js": 547,
	"./pt.js": 546,
	"./ro": 548,
	"./ro.js": 548,
	"./ru": 549,
	"./ru.js": 549,
	"./sd": 550,
	"./sd.js": 550,
	"./se": 551,
	"./se.js": 551,
	"./si": 552,
	"./si.js": 552,
	"./sk": 553,
	"./sk.js": 553,
	"./sl": 554,
	"./sl.js": 554,
	"./sq": 555,
	"./sq.js": 555,
	"./sr": 556,
	"./sr-cyrl": 557,
	"./sr-cyrl.js": 557,
	"./sr.js": 556,
	"./ss": 558,
	"./ss.js": 558,
	"./sv": 559,
	"./sv.js": 559,
	"./sw": 560,
	"./sw.js": 560,
	"./ta": 561,
	"./ta.js": 561,
	"./te": 562,
	"./te.js": 562,
	"./tet": 563,
	"./tet.js": 563,
	"./tg": 564,
	"./tg.js": 564,
	"./th": 565,
	"./th.js": 565,
	"./tl-ph": 566,
	"./tl-ph.js": 566,
	"./tlh": 567,
	"./tlh.js": 567,
	"./tr": 568,
	"./tr.js": 568,
	"./tzl": 569,
	"./tzl.js": 569,
	"./tzm": 570,
	"./tzm-latn": 571,
	"./tzm-latn.js": 571,
	"./tzm.js": 570,
	"./ug-cn": 572,
	"./ug-cn.js": 572,
	"./uk": 573,
	"./uk.js": 573,
	"./ur": 574,
	"./ur.js": 574,
	"./uz": 575,
	"./uz-latn": 576,
	"./uz-latn.js": 576,
	"./uz.js": 575,
	"./vi": 577,
	"./vi.js": 577,
	"./x-pseudo": 578,
	"./x-pseudo.js": 578,
	"./yo": 579,
	"./yo.js": 579,
	"./zh-cn": 580,
	"./zh-cn.js": 580,
	"./zh-hk": 581,
	"./zh-hk.js": 581,
	"./zh-tw": 582,
	"./zh-tw.js": 582
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
webpackContext.id = 980;

/***/ }),

/***/ 981:
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

/***/ 982:
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

/***/ 983:
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

/***/ 989:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_tarjetas_frecuentes_tarjetas_frecuentes__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_ayuda_ayuda__ = __webpack_require__(599);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_acerca_de_acerca_de__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_perfil_perfil__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_lista_carrito_compras_lista_carrito_compras__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_tabs_tabs__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_login_login__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__models_Menu__ = __webpack_require__(990);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_direcciones_direcciones__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_info_info__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_terminos_condiciones_terminos_condiciones__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__environments_environment_prod__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_proveedor_tabs_tabs__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_recuperar_password_recuperar_password__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_fcm__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_screen_orientation__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_proveedor_documentos_documentos__ = __webpack_require__(596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_header_color__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__services_pushNotifications_service__ = __webpack_require__(202);
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
    function MyApp(platform, statusBar, splashScreen, translateService, localStorageEncryptService, events, app, alertaService, alertCtrl, genericService, fcm, headerColor, screenOrientation, pushNotificationService) {
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
        this.headerColor = headerColor;
        this.screenOrientation = screenOrientation;
        this.pushNotificationService = pushNotificationService;
        this.rootPage = null;
        this.pages = [];
        this.user = null;
        platform.ready().then(function () {
            //eliminar
            var k = "sk_live_fcKnhw5seaKkY2ERdjJcKBOC007a6LoXl0";
            console.log("--------------KEY2--------------");
            console.log(_this.localStorageEncryptService.encryptBack(k));
            //
            _this.user = _this.localStorageEncryptService.getFromLocalStorage("userSession");
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            statusBar.overlaysWebView(false);
            if (_this.platform.is("android")) {
                if (_this.genericService.getColorHex()) {
                    statusBar.backgroundColorByHexString(_this.genericService.getColorHex());
                }
                else {
                    statusBar.backgroundColorByHexString('#F07C1B');
                }
            }
            splashScreen.hide();
            if (_this.platform.is("ios") || _this.platform.is("android")) {
                _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.PORTRAIT);
            }
            if (_this.platform.is("android")) {
                if (_this.genericService.getColorHex()) {
                    _this.headerColor.tint(_this.genericService.getColorHex());
                }
                else {
                    _this.headerColor.tint("#F07C1B");
                }
            }
            _this.initializeLanguage();
            var firstTime = _this.localStorageEncryptService.getFromLocalStorage("firstTime");
            if (!firstTime) {
                _this.localStorageEncryptService.setToLocalStorage("theme", "#F07C1B");
                _this.localStorageEncryptService.setToLocalStorage("firstTime", 1);
            }
            if (!_this.localStorageEncryptService.getFromLocalStorage("phoneToken")) {
                _this.fcm.getToken().then(function (token) {
                    console.log("*********************");
                    console.log(token);
                    //localStorage.setItem("token", token);
                    var body = {
                        login: _this.user.username,
                        token: token
                    };
                    console.log("consumiendo?????");
                    _this.genericService.sendPutRequest(__WEBPACK_IMPORTED_MODULE_19__environments_environment_prod__["a" /* environment */].usuarios, body).subscribe(function (response) {
                        _this.localStorageEncryptService.setToLocalStorage("phoneToken", token);
                        _this.readNotify();
                    }, function (error) {
                        console.log(error);
                    });
                    console.log("*********************");
                });
            }
            else {
                console.log("lectura normal");
                _this.readNotify();
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
                case 3:
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Mi perfil", "assets/imgs/perfil/social-media.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_3__pages_perfil_perfil__["a" /* PerfilPage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Mis documentos", "assets/imgs/menu/file.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_24__pages_proveedor_documentos_documentos__["a" /* DocumentosPage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Acerca de", "assets/imgs/menu/interface.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_2__pages_acerca_de_acerca_de__["a" /* AcercaDePage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Información de la app", "assets/imgs/menu/signs.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_17__pages_info_info__["a" /* InfoPage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Contacto", "assets/imgs/menu/logotype.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_1__pages_ayuda_ayuda__["a" /* AyudaPage */]));
                    _this.pages.push(new __WEBPACK_IMPORTED_MODULE_15__models_Menu__["a" /* Menu */]("Términos y condiciones", "assets/imgs/menu/contrato.png", "#7d3a63", __WEBPACK_IMPORTED_MODULE_18__pages_terminos_condiciones_terminos_condiciones__["a" /* TerminosCondicionesPage */]));
                    break;
            }
            /** LIMPIAR VARIABLES DE NOTIFICACIONES */
            _this.localStorageEncryptService.clearProperty("pedidoChat");
            _this.localStorageEncryptService.clearProperty("pedidoPedido");
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
                case 3:
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
    }
    MyApp.prototype.readNotify = function () {
        var _this = this;
        if (this.platform.is('ios') || this.platform.is('android')) {
            this.fcm.onNotification().subscribe(function (data) {
                _this.pushNotificationService.evaluateNotification(data);
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
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/app.html"*/'<ion-menu [content]="content" *ngIf="user">\n  <ion-header>\n    <ion-item class="item item-thumbnail-left" style="\n                  background-image: url(assets/imgs/menu/market.jpg);\n                  background-size: 100%;\n                  background-position: center center;">\n      <img src="assets/imgs/logo.png" alt="Fry" class="animated myImagen" style="top: 16px !important;left: 16px !important;height: 65px !important;border-radius: 0px !important;width: 67px !important;opacity: -1.6;">\n      <div class="menu-bottom" style="color: rgba(0, 0, 0, 0.99);\n      background-color: rgba(255, 255, 255, 0.74);\n      padding: 7px;\n      font-size: 15px;\n      font-weight: 700;\n      font-family: sans-serif;\n      border-radius: 4px;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      overflow: hidden;">\n        {{user.nombre}}\n      </div>\n    </ion-item>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n\n      <div *ngFor="let p of pages">\n        <ion-item menuClose class="item item-icon-right" (click)="openPage(p)" style="border-top: 1px solid #ddd;box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.07);">\n          <img src="{{p.img}}" alt="logo" style="    /* height: 35%; */\n              width: 11%;\n              /* margin-top: 1px; */\n              position: absolute;" />\n          <h2 style="display: inline-block;\n            margin-left: 44px;\n            margin-top: 8px;\n            font-size: 17px;\n            font-weight: 600;\n            font-family: sans-serif;">{{\n            p.nombre }}</h2>\n        </ion-item>\n      </div>\n    </ion-list>\n  </ion-content>\n  <ion-footer>\n    <ion-toolbar>\n      <div>\n        <button ion-button outline style="width: 48%;" (click)="exitApp()"\n        [ngStyle]="{\'color\': genericService.getColorHex(), \'border-color\': genericService.getColorHex()}">\n          <ion-icon name="close-circle" class="botonFooter"></ion-icon>\n          Salir\n        </button>\n      </div>\n    </ion-toolbar>\n  </ion-footer>\n\n</ion-menu>\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false">\n\n</ion-nav>'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_14__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_6__services_alerta_service__["a" /* AlertaService */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__services_generic_service__["a" /* GenericService */],
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_fcm__["a" /* FCM */],
            __WEBPACK_IMPORTED_MODULE_25__ionic_native_header_color__["a" /* HeaderColor */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_26__services_pushNotifications_service__["a" /* PushNotificationService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 990:
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

/***/ 991:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
            selector: 'page-about',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 992:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
            selector: 'page-contact',template:/*ion-inline-start:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-start></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/jhonny/Documentos/Proyectos externos/Sharkit/Central de abastos/movil/central-abastos/src/app/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 995:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProvidersModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_sqlGenericService__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_alerta_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_loading_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_validation_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_local_storage_encrypt_service__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_generic_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_action_sheet__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__interceptors_request_interceptor_service__ = __webpack_require__(996);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_common_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_auth_service__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_producto_service__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_string_utils_service__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_google_maps__ = __webpack_require__(997);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_geolocation__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_fcm__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_stripe__ = __webpack_require__(998);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_open_native_settings__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_diagnostic__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_android_permissions__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_qr_scanner__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_chat_service__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_common__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_app_version__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_screen_orientation__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_header_color__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_in_app_browser__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_pushNotifications_service__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_file_opener__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_file__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_image_picker__ = __webpack_require__(584);
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_5__services_alerta_service__["a" /* AlertaService */],
                __WEBPACK_IMPORTED_MODULE_6__services_loading_service__["a" /* LoadingService */],
                __WEBPACK_IMPORTED_MODULE_7__services_validation_service__["a" /* ValidationService */],
                __WEBPACK_IMPORTED_MODULE_8__services_local_storage_encrypt_service__["a" /* LocalStorageEncryptService */],
                __WEBPACK_IMPORTED_MODULE_9__services_generic_service__["a" /* GenericService */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_action_sheet__["a" /* ActionSheet */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_13__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_12__interceptors_request_interceptor_service__["a" /* RequestInterceptorService */],
                    multi: true
                },
                __WEBPACK_IMPORTED_MODULE_14__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_15__services_producto_service__["a" /* ProductoService */],
                __WEBPACK_IMPORTED_MODULE_16__services_string_utils_service__["a" /* StringUtilsService */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_fcm__["a" /* FCM */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_stripe__["a" /* Stripe */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_open_native_settings__["a" /* OpenNativeSettings */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_android_permissions__["a" /* AndroidPermissions */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_qr_scanner__["a" /* QRScanner */],
                __WEBPACK_IMPORTED_MODULE_25__services_chat_service__["a" /* ChatService */],
                __WEBPACK_IMPORTED_MODULE_26__angular_common__["c" /* CurrencyPipe */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_app_version__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_header_color__["a" /* HeaderColor */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_31__services_pushNotifications_service__["a" /* PushNotificationService */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_file_opener__["a" /* FileOpener */],
                __WEBPACK_IMPORTED_MODULE_34__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_0__services_sqlGenericService__["a" /* SqlGenericService */]
            ]
        })
    ], ProvidersModule);
    return ProvidersModule;
}());

//# sourceMappingURL=providers.module.js.map

/***/ }),

/***/ 996:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestInterceptorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(5);
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
                    _this.events.publish("startSession");
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
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["e" /* Events */]])
    ], RequestInterceptorService);
    return RequestInterceptorService;
}());

//# sourceMappingURL=request-interceptor.service.js.map

/***/ }),

/***/ 999:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlMessagesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_validation_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(30);
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

/***/ })

},[606]);
//# sourceMappingURL=main.js.map
webpackJsonp([0],{

/***/ 1001:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalificacionPageModule", function() { return CalificacionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__calificacion__ = __webpack_require__(1004);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CalificacionPageModule = /** @class */ (function () {
    function CalificacionPageModule() {
    }
    CalificacionPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__calificacion__["a" /* CalificacionPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__calificacion__["a" /* CalificacionPage */]),
            ],
        })
    ], CalificacionPageModule);
    return CalificacionPageModule;
}());

//# sourceMappingURL=calificacion.module.js.map

/***/ }),

/***/ 1004:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalificacionPage; });
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


/**
 * Generated class for the CalificacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CalificacionPage = /** @class */ (function () {
    function CalificacionPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CalificacionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CalificacionPage');
    };
    CalificacionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-calificacion',template:/*ion-inline-start:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/calificacion/calificacion.html"*/'<ion-header>\n  <ion-navbar color="{{genericService.getColor()}}">\n    <ion-title style="padding: 0px;">Calificar</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div style="text-align: center;\n  padding: 15px;\n  font-size: 20px;\n  font-weight: 400;">{{nombre}}</div>\n  <div class="vendor">\n    <img src="assets/imgs/chat/vendor.png" alt="">\n  </div>\n  <div class="calificacion">\n    <div class="texto">{{calificacionActual}}</div>\n    <div class="contenedor-stars">\n      <div *ngFor="let s of stars" class="estrella" [ngStyle]="{\'color\': genericService.getColorHex()}" (click)="selecciona(s)">\n        <ion-icon name="ios-star" *ngIf="s.selected"></ion-icon>\n        <ion-icon name="ios-star-outline" *ngIf="!s.selected"></ion-icon>\n      </div>\n    </div>\n    <div class="queja">\n      <textarea name="" id="" cols="30" rows="4" [(ngModel)]="queja" placeholder="Escríbe aquí que salió bien o mal"></textarea>\n    </div>\n  </div>\n</ion-content>\n<ion-footer class="footer-button-class">\n  <button (tap)="enviar()" [ngStyle]="{\'background-color\': genericService.getColorHex()}" style="width:100%;font-size: 20px;">Enviar</button>\n</ion-footer>'/*ion-inline-end:"/Users/macpro/Documents/javas/ionic/central-abastos/src/app/pages/calificacion/calificacion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], CalificacionPage);
    return CalificacionPage;
}());

//# sourceMappingURL=calificacion.js.map

/***/ })

});
//# sourceMappingURL=0.js.map
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertaService } from './alerta.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/timeout';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable, TimeoutError } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { environment } from '../../environments/environment.prod';
import { GenericService } from './generic.service';
import { DetalleProductoPage } from '../pages/detalle-producto/detalle-producto';
import { App, Events } from 'ionic-angular';
import { LocalStorageEncryptService } from './local-storage-encrypt.service';
/**Clase provider que es básicamente un servicio generico para las peticiones a servicios */
@Injectable()
export class ProductoService {

    public user: any = null;

    public productosCarrito: any = null;

    constructor(
        private alertaService: AlertaService,
        private loadingService: LoadingService,
        private genericService: GenericService,
        private app: App,
        private localStorageEncryptService: LocalStorageEncryptService,
        private events: Events) {
        this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
        if(this.user){
            this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
        }
    }

    viewDetail(producto: any) {
        //consumir servicio de imagenes completas
        this.loadingService.show().then(() => {
            this.genericService.sendGetRequest(`${environment.proveedorProductos}/${producto.id}`).subscribe((response: any) => {
                console.log(response);
                let nav = this.app.getRootNav();
                nav.push(DetalleProductoPage, { producto: response });
                this.loadingService.hide();
            }, (error: HttpErrorResponse) => {
                this.loadingService.hide();
                let err: any = error.error;
                this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
        //

    }

    getTotalCarrito() {
        let productosCarrito: any = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
        if (productosCarrito) {
            return productosCarrito.length;
        } else {
            return 0;
        }
    }

    deleteFavorito(producto) {
        console.log(producto);
        this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
        let nuevoArrarCarrito: any[] = [];
        let productoDelete: any = null;
        this.productosCarrito.forEach(element => {
            if (producto.id != element.id) {
                nuevoArrarCarrito.push(element);
            } else {
                productoDelete = element;
                productoDelete.carrito = false;
                producto.carrito = false;
            }
        });

        console.log(producto);
        this.productosCarrito = nuevoArrarCarrito;
        this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}`, this.productosCarrito);

        //Llamar a events
        this.events.publish('updateProductos', { productoDelete });

        if (this.productosCarrito.length <= 0) {
            let nav = this.app.getRootNav();
            nav.pop();
        }
    }
}
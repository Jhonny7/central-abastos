import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { LoadingService } from './../../services/loading.service';
import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { DetalleProductoPage } from '../detalle-producto/detalle-producto';
import { User } from '../../models/User';

@Component({
  selector: 'page-articulo-productos',
  templateUrl: 'articulo-productos.html',
})
export class ArticuloProductosPage {
  public productos: any[] = [];

  public replicaProductos: any[] = [];

  public paginaActual: number = 0;

  public articulo: any = null;

  public env: any = environment;

  public resultadoPost: any = [];

  public palabra: string = "";

  public user: User = null;

  public color: any = "#3b64c0";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private alertaService: AlertaService,
    private loadingService: LoadingService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private events: Events) {
    this.articulo = navParams.get("articulo");
    console.log(this.articulo);
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    this.cargarProductosArticulo();

    this.events.subscribe("reloadUser", data => {
      try {
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
      } catch (error) {
      }
    });

    if (this.localStorageEncryptService.getFromLocalStorage("theme")) {
      this.color = this.localStorageEncryptService.getFromLocalStorage("theme");
    }
    this.events.subscribe("changeColor", data => {
      try {
        if (this.localStorageEncryptService.getFromLocalStorage("theme")) {
          this.color = this.localStorageEncryptService.getFromLocalStorage("theme");
        }
      } catch (error) {
      }
    });
  }

  ionViewDidLoad() {

  }

  doInfinite(infinite: any): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.cargarProductosArticulo(infinite);
        resolve();
      }, 500);
    })
  }

  cargarProductosArticulo(resolve: any = null) {
    let params = new HttpParams()
    params = params.set('sortType', "asc");
    params = params.set('limit', "10");
    params = params.set('page', this.paginaActual.toString());
    params = params.append('sort', "id");
    params = params.append('tipoArticuloId', this.articulo.tipoArticulo.id.toString());

    this.genericService.sendGetParams(`${environment.productos}/search`, params).subscribe((response: any) => {
      this.resultadoPost = response;
      response.forEach(element => {
        this.productos.push(element);
        this.replicaProductos.push(element);
      });

      this.paginaActual++;
      if (resolve) {
        resolve.complete();
      }
    }, (error: HttpErrorResponse) => {
      let err: any = error.error;
      this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
    });
  }

  viewDetail(producto: any) {
    //consumir servicio de imagenes completas
    this.loadingService.show().then(() => {
      this.genericService.sendGetRequest(`${environment.proveedorProductos}/${producto.id}`).subscribe((response: any) => {
        console.log(response);

        //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
        //let nav = this.app.getRootNav();
        //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
        if (this.user) {
          let carritos = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
          console.log(carritos);

          if (carritos) {
            let position: any = carritos.findIndex(
              (carrito) => {
                return carrito.id == response.id;
              }
            );

            if (position >= 0) {
              response.cantidad = carritos[position].cantidad;
            }
          }
        }
        this.navCtrl.push(DetalleProductoPage, { producto: response });
        this.loadingService.hide();
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        let err: any = error.error;
        this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
      });
    });
    //

  }

  buscarPorPalabra() {
    this.productos = this.replicaProductos;
    this.productos = this.productos.filter((item: any) => item.nombre.toUpperCase().includes(this.palabra.toUpperCase()));

  }

  up(){
    this.palabra = "";
    this.productos = this.replicaProductos;
    this.productos.sort((mayor,menor)=>{
        return mayor.precio - menor.precio;
      });
  }

  down(){
    this.palabra = "";
    this.productos = this.replicaProductos;
    this.productos.sort((mayor,menor)=>{
        return menor.precio - mayor.precio;
      });
  }
}

import { ArticuloProductosPage } from './../articulo-productos/articulo-productos';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { AlertaService } from './../../services/alerta.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { environment, nuevoBackHabilitado } from '../../../environments/environment.prod';
import { ProductoService } from '../../services/producto.service';
import { LoadingService } from '../../services/loading.service';
import { DetalleProductoPage } from '../detalle-producto/detalle-producto';
import { User } from '../../models/User';
import { MapaProveedoresPage } from '../mapa-proveedores/mapa-proveedores';

@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {

  public categoria: any = null;
  public articulos: any = null;

  public articulosReplica: any = null;

  public env: any = environment;

  public user: any = null;

  public color: any = "#3b64c0";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private productoService: ProductoService,
    private loadingService: LoadingService,
    private alertaService: AlertaService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private events: Events) {
    this.categoria = navParams.get("categoria");
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    this.cargarArticulos();

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
    let tabbar:any = document.getElementsByClassName("tabbar");
    tabbar[0].style.display = "none";
  }

  ionViewDidLeave(){
    let tabbar:any = document.getElementsByClassName("tabbar");
    tabbar[0].style.display = "flex";
  }

  viewDetail(producto: any) {
    //consumir servicio de imagenes completas
    this.loadingService.show().then(() => {
      //this.user.parametros.pantalla_proveedores = "N";
      if (this.user && this.user.parametros.pantalla_proveedores == "S") {
        let params = new HttpParams()
        params = params.set('email', this.user.email);
        this.genericService.sendGetRequestParams(`${environment.proveedorProductos}/producto/${producto.id}`,params).subscribe((response: any) => {
          console.log("from cat");
          console.log(response);
          if(nuevoBackHabilitado){
            producto = {
              producto : producto
            }
          }
          this.navCtrl.push(MapaProveedoresPage, { proveedores: response, producto });
          this.loadingService.hide();
        }, (error: HttpErrorResponse) => {
          this.loadingService.hide();
          let err: any = error.error;
          this.alertaService.errorAlertGeneric(err.description ? err.description : "Ocurrió un error en el servicio, intenta nuevamente");
        });
      } else {
        let params = new HttpParams()
        params = params.set('email', null);
        this.genericService.sendGetRequestParams(`${environment.proveedorProductos}/${producto.id}`,params).subscribe((response: any) => {

          //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
          //let nav = this.app.getRootNav();
          //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
          if (this.user) {
            let carritos = this.localStorageEncryptService.getFromLocalStorage(`${this.user.email}`);

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
          this.alertaService.errorAlertGeneric(err.description ? err.description : "Ocurrió un error en el servicio, intenta nuevamente");
        });
      }
    });
    //

  }

  verTodos(articulo: any) {
    this.navCtrl.push(ArticuloProductosPage, { articulo });
  }

  cargarArticulos() {
    this.genericService.sendGetRequest(`${environment.categoria}${this.categoria.categoria.id}`).
      subscribe((res: any) => {
        console.log(res);
        
        this.articulos = res;
        this.articulosReplica = this.articulos;
      }, (err: HttpErrorResponse) => {

      });
  }

  up() {
    this.articulos = this.articulosReplica;
    this.articulos.forEach(item1 => {
      item1.productos.sort((mayor, menor) => {
        return mayor.precio - menor.precio;
      });
    });
  }

  down() {
    this.articulos = this.articulosReplica;
    this.articulos.forEach(item1 => {
      item1.productos.sort((mayor, menor) => {
        return menor.precio - mayor.precio;
      });
    });
  }
}

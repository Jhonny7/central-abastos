import { ArticuloProductosPage } from './../articulo-productos/articulo-productos';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { AlertaService } from './../../services/alerta.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { environment } from '../../../environments/environment.prod';
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

  public env: any = environment;

  public user: User = null;

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
    console.log(this.categoria);
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
    console.log('ionViewDidLoad CategoriaPage');
  }

  viewDetail(producto: any) {
    //consumir servicio de imagenes completas
    this.loadingService.show().then(() => {
      this.user.parametros.pantalla_proveedores = "N";
      if(this.user.parametros.pantalla_proveedores == "S"){
        this.genericService.sendGetRequest(`${environment.proveedoresProducto}${producto.id}`).subscribe((response: any) => {
          console.log(response);
          this.navCtrl.push(MapaProveedoresPage, { proveedores: response, producto });
          this.loadingService.hide();
        }, (error: HttpErrorResponse) => {
          let err: any = error.error;
          this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
      }else{
        this.genericService.sendGetRequest(`${environment.proveedorProductos}/${producto.id}`).subscribe((response: any) => {
          console.log(response);
  
          //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
          //let nav = this.app.getRootNav();
          //let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
          if (this.user) {
            let carritos = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
            console.log(carritos);
  
            if(carritos){
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
      }
    });
    //

  }

  verTodos(articulo:any){
    this.navCtrl.push(ArticuloProductosPage,{articulo});
  }

  cargarArticulos() {
    console.log("-----");

    this.genericService.sendGetRequest(`${environment.categoria}${this.categoria.categoria.id}`).
      subscribe((res: any) => {
        console.log(res);
        this.articulos = res.productosTipoArticulo;
      }, (err: HttpErrorResponse) => {

      });
  }

}

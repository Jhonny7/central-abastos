import { environment } from './../../../environments/environment.prod';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { GenericService } from '../../services/generic.service';
import { AlertaService } from '../../services/alerta.service';
import { LoadingService } from '../../services/loading.service';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DetalleProductoPage } from '../detalle-producto/detalle-producto';

@Component({
  selector: 'page-articulo-proveedores',
  templateUrl: 'articulo-proveedores.html',
})
export class ArticuloProveedoresPage {
  public productos: any[] = [];

  public replicaProductos: any[] = [];
  
  public palabra: string = "";
  public env: any = environment;

  public proveedor: any = null;

  public fromCliente:boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private alertaService: AlertaService,
    private loadingService: LoadingService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private events: Events
  ) {
    this.proveedor = navParams.get("proveedor");
    this.productos = navParams.get("productos");

    this.fromCliente = navParams.get("fromCliente");

    this.replicaProductos = this.productos;
  }

  ionViewDidLoad() {
  }

  viewDetail(producto: any) {
    //consumir servicio de imagenes completas
    if(!this.fromCliente){
      this.loadingService.show().then(() => {
        this.genericService.sendGetRequest(`${environment.proveedorProductos}/${producto.id}`).subscribe((response: any) => {
        
          this.navCtrl.push(DetalleProductoPage, { producto: response });
          this.loadingService.hide();
        }, (error: HttpErrorResponse) => {
          this.loadingService.hide();
          let err: any = error.error;
          this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
      });
    }
    //

  }

  buscarPorPalabra() {
    this.productos = this.replicaProductos;
    this.productos = this.productos.filter((item: any) => item.producto.nombre.toUpperCase().includes(this.palabra.toUpperCase()));

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

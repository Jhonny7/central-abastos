import { environment } from './../../../environments/environment.prod';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AlertaService } from '../../services/alerta.service';
import { LoadingService } from '../../services/loading.service';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DetalleProductoPage } from '../detalle-producto/detalle-producto';

@Component({
  selector: 'page-compara-precios-proveedor',
  templateUrl: 'compara-precios-proveedor.html',
})
export class ComparaPreciosProveedorPage {

  public proveedoresGeolocate:any = null;
  public proveedoresGeolocateReplica:any = null;
  public env: any = environment;

  public palabra: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private alertaService: AlertaService,
    private loadingService: LoadingService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private events: Events) {
      this.proveedoresGeolocate = navParams.get("proveedoresGeolocate");
      this.proveedoresGeolocateReplica = this.proveedoresGeolocate;
      console.log(this.proveedoresGeolocate);
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComparaPreciosProveedorPage');
  }

  buscarPorPalabra() {
    this.proveedoresGeolocate = this.proveedoresGeolocateReplica;
    this.proveedoresGeolocate = this.proveedoresGeolocate.filter((item: any) => item.proveedor.nombre.toUpperCase().includes(this.palabra.toUpperCase()));

  }

  viewDetail(producto: any) {
    //consumir servicio de imagenes completas
    this.loadingService.show().then(() => {
      this.genericService.sendGetRequest(`${environment.proveedorProductos}/${producto.productoId}`).subscribe((response: any) => {
        
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

  up(){
    this.proveedoresGeolocate = this.proveedoresGeolocateReplica;
    this.proveedoresGeolocate.sort((mayor,menor)=>{
        return mayor.precio - menor.precio;
      });
  }

  down(){
    this.proveedoresGeolocate = this.proveedoresGeolocateReplica;
    this.proveedoresGeolocate.sort((mayor,menor)=>{
        return menor.precio - mayor.precio;
      });
  }
}

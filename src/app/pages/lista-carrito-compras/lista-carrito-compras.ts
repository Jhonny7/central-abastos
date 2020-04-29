import { LoadingService } from './../../services/loading.service';
import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import * as moment from "moment";

@Component({
  selector: 'page-lista-carrito-compras',
  templateUrl: 'lista-carrito-compras.html',
})
export class ListaCarritoComprasPage {

  public listas: any[] = [];
  public renderSlide: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private alertaService: AlertaService,
    private loadingService: LoadingService) {
    this.cargarListas();
  }

  /**Método para cargar productos en base a especificaciones */
  cargarListas() {
    this.genericService.sendGetRequest(environment.carritoHistorico).subscribe((response: any) => {
      console.log(response);
      //quitar
      this.listas = response;
      this.listas.forEach(item => {
        if (item.fechaAlta) {
          let stringF: any = item.fechaAlta.split("T");
          let fechaF: any = `${stringF[0]} ${stringF[1]}`;

          moment.locale("ES");
          item.fecha = moment(fechaF, 'YYYY-MM-DD HH:mm:ss').format("D [de] MMMM [de] YYYY HH:mm:ss");

        }
      });
      this.renderSlide = false;
      if (this.listas.length <= 0) {
        this.alertaService.warnAlertGeneric("Aún no cuentas con listas frecuentes");
      }
    }, (error: HttpErrorResponse) => {
      let err: any = error.error;
      this.renderSlide = false;
      //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaCarritoComprasPage');
  }

  borrar(item:any){
    let position: any = this.listas.findIndex(
      (img) => {
        return img.id == item.id;
      }
    );
    
    this.loadingService.show().then(()=>{
      this.genericService.sendDelete(`${environment.carritoHistorico}/${item.id}`).subscribe((response: any) => {
        this.listas = [...this.listas.slice(0, position), ...this.listas.slice(position + 1)];
        this.loadingService.hide();
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        this.alertaService.errorAlertGeneric("No se ha podido eliminar tu lista, intenta nuevamente");
      });
    });
    
  }

}

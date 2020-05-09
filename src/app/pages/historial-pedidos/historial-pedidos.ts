import { HistorialPedidosDetailPage } from './../historial-pedidos-detail/historial-pedidos-detail';
import { LoadingService } from './../../services/loading.service';
import { AlertaService } from './../../services/alerta.service';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { environment } from '../../../environments/environment.prod';
import { User } from '../../models/User';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from "moment";
import { OpcionesMenuPage } from '../opciones-menu/opciones-menu';

@Component({
  selector: 'page-historial-pedidos',
  templateUrl: 'historial-pedidos.html',
})
export class HistorialPedidosPage {

  public user: User = null;
  public pedidos: any = [];
  public pedidosReplica: any = [];

  public env: any = environment;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private alertaService: AlertaService,
    private loadingService: LoadingService,
    private popoverCtrl: PopoverController) {
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    this.cargarPedidos();
  }

  ionViewDidLoad() {

  }

  verOpciones() {
    let popover = this.popoverCtrl.create(OpcionesMenuPage, {}, { cssClass: "clase-Pop" });
    popover.present({
    });
  }

  cargarPedidos() {
    this.genericService.sendGetRequest(`${environment.pedidos}`).subscribe((response: any) => {
     
      this.pedidos = response;
      if (this.pedidos.length <= 0) {
        this.pedidos = null;
      }
      this.pedidosReplica = this.pedidos;
    }, (error: HttpErrorResponse) => {
      let err: any = error.error;
      this.pedidos = null;
      this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
    });
  }

  viewDetail(pedido: any) {
    this.loadingService.show().then(() => {
      this.genericService.sendGetRequest(`${environment.pedidos}/${pedido.id}`).subscribe((response: any) => {
       
        this.loadingService.hide();
        this.navCtrl.push(HistorialPedidosDetailPage, { pedido: response });
      }, (error: HttpErrorResponse) => {
        let err: any = error.error;
        this.loadingService.hide();
        this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
      });
    });
  }

  ordenPor(opc) {
    this.pedidos = this.pedidosReplica;
    //item.fecha = moment(fechaF, 'DD-MM-YYYY HH:mm:ss').format("D [de] MMMM [de] YYYY HH:mm:ss");
    switch (opc) {
      case 1:
        //fecha solicitud
        this.pedidos.sort((mayor, menor) => {
          var dateA: any = moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate(), dateB: any = moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate();
          return dateA - dateB;
          //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
        });
        break;
      case 2:
        //fecha entrega
        this.pedidos.sort((mayor, menor) => {
          var dateA: any = moment(mayor.fechaEntrega, 'DD-MM-YYYY HH:mm:ss').toDate(), dateB: any = moment(menor.fechaEntrega, 'DD-MM-YYYY HH:mm:ss').toDate();
          return dateA - dateB;
          //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
        });
        break;
      case 3:
        //estatus
        this.pedidos.sort((mayor, menor) => {
          return mayor.estatus.nombre > menor.estatus.nombre;
        });
        break;
    }

  }
}

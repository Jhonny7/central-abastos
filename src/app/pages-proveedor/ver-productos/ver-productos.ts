import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-ver-productos',
  templateUrl: 'ver-productos.html',
})
export class VerProductosPage implements OnDestroy{

  public pedidos: any = null;

  public env:any = environment;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private alertaService: AlertaService) {

    this.pedidos = navParams.get("pedidos");
    this.pedidos.pedidoProveedores[0].pedidoDetalles.forEach(element => {
      element.activado = false;
    });

    console.log(this.pedidos.pedidoProveedores[0].pedidoDetalles);
    
  }

  ionViewDidLoad() {
    let claseTabs: any = document.getElementsByClassName("tabbar");
    claseTabs[0].style.display = "none";
  }

  ngOnDestroy() {
    let claseTabs: any = document.getElementsByClassName("tabbar");
    claseTabs[0].style.display = "flex";
  }

  solicitar() {

  }

  confirmar() {
    let nada: number = 0;
    this.pedidos.pedidoProveedores[0].pedidoDetalles.forEach(element => {
      if (!element.activado) {
        nada++;
      }
    });
    if (nada > 0) {
      this.alertaService.warnAlertGeneric("Debe confirmar cada artículo para poder confirmar su pedido");
    } else {
      switch (environment.perfil.activo) {
        case 2:
          let body: any = {
            pedidoProveedorId: this.pedidos.pedidoProveedores[0].id,
            estatusId: 13
          };

          this.genericService.sendPutRequest(environment.pedidosProveedores, body).subscribe((response1: any) => {

            this.alertaService.successAlertGeneric(`El pedido ha sido confirmado`);
            this.navCtrl.pop();
          }, (error: HttpErrorResponse) => {
            this.alertaService.errorAlertGeneric("Ocurrió un error, por favor intenta nuevamente.");
          });
          break;
        case 3:
          let body2: any = {
            pedidoProveedorId: this.pedidos.pedidoProveedores[0].id,
            estatusId: 14
          };

          this.genericService.sendPutRequest(environment.pedidosProveedores, body2).subscribe((response1: any) => {

            this.alertaService.successAlertGeneric(`El pedido ha sido confirmado`);
            this.navCtrl.pop();
          }, (error: HttpErrorResponse) => {
            this.alertaService.errorAlertGeneric("Ocurrió un error, por favor intenta nuevamente.");
          });
          break;
      }
    }
  }
}
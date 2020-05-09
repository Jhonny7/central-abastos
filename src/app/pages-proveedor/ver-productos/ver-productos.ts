import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-ver-productos',
  templateUrl: 'ver-productos.html',
})
export class VerProductosPage {

  public pedidos: any = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private alertaService: AlertaService) {

      this.pedidos = navParams.get("pedidos");
      this.pedidos.pedidoProveedores[0].pedidoDetalles.forEach(element => {
        element.activado = false; 
      });
  }

  ionViewDidLoad() {
    let claseTabs: any = document.getElementsByClassName("tabbar");
    claseTabs[0].style.display = "none";
  }

  ionViewWillLeave() {
    let claseTabs: any = document.getElementsByClassName("tabbar");
    claseTabs[0].style.display = "flex";
  }

  solicitar(){
    
  }

  confirmar(){
    let nada:number = 0;
    this.pedidos.pedidoProveedores[0].pedidoDetalles.forEach(element => {
      if(!element.activado){
        nada++;
      }
    });
    if(nada>0){
      this.alertaService.warnAlertGeneric("Debe confirmar cada artículo para poder confirmar su pedido");
    }else{
      let body:any = {
        pedidoProveedorId:this.pedidos.pedidoProveedores[0].id,
        estatusId: 13
      };
      
      this.genericService.sendPutRequest(environment.pedidosProveedores, body).subscribe((response1: any) => {
        
        this.alertaService.successAlertGeneric(`El pedido ha sido confirmado, ponte en contacto con ${this.pedidos.cliente.firstName}`);
        this.navCtrl.pop();
      }, (error: HttpErrorResponse) => {
        this.alertaService.errorAlertGeneric("Ocurrió un error, por favor intenta nuevamente.");
      });
    }
  }
}

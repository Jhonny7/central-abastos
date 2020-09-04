import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GenericService } from '../../services/generic.service';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { AlertaService } from '../../services/alerta.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'page-problemas-pedido',
  templateUrl: 'problemas-pedido.html',
})
export class ProblemasPedidoPage {

  public pedido:any = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private genericService: GenericService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private alertaService: AlertaService) {
      this.pedido = navParams.get('pedidoProblem');
  }

  ionViewDidLoad() {
  }

  queja() {
    let body: any = {
      pedidoProveedorId: this.pedido.pedidoProveedores[0].id
    };

    this.genericService.sendPostRequest(`${environment.queja}`, body).subscribe(
      (response: any) => {
        this.alertaService.successAlertGeneric('Un contact center te atenderá en breve');
      },
      (error: HttpErrorResponse) => {
        this.alertaService.errorAlertGeneric('No se ha podido contactar al administrador, intenta nuevamente');
      }
    );
  }

}

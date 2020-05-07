import { AlertaService } from './../../services/alerta.service';
import { LoadingService } from './../../services/loading.service';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-recupera-contrasenia',
  templateUrl: 'recupera-contrasenia.html',
})
export class RecuperaContraseniaPage {

  public correo: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private alertaService: AlertaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperaContraseniaPage');
  }

  cambio() {
    this.loadingService.show().then(() => {
      this.genericService.sendPostRequest(environment.reset, this.correo).subscribe((response: any) => {
        this.alertaService.successAlertGeneric("Siga las indicación que se enviaron a su correo "+this.correo);
        //this.verificarCarritoModificarCantidad(producto);
        this.loadingService.hide();
      }, (error: HttpErrorResponse) => {
        console.log(error);

        this.alertaService.errorAlertGeneric(error.error.title);
        this.loadingService.hide();
      });
    });
  }
}

import { AlertaService } from './../../services/alerta.service';
import { LoadingService } from './../../services/loading.service';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-cambio-contrasenia',
  templateUrl: 'cambio-contrasenia.html',
})
export class CambioContraseniaPage {
  public data: any = {
    oldContrasenia: "",
    contrasenia: "",
    confirm: ""
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private alertaService: AlertaService) {
  }

  ionViewDidLoad() {
  }

  cambio() {

    if (!this.data.confirm.toString().match(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/)) {

      this.alertaService.warnAlertGeneric('Contraseña inválida. La contraseña debe contener mínimo 8 caracteres, por lo menos un valor numérico y mínimo un símbolo.');
    } else if (this.data.confirm.toString().length < 8) {
      this.alertaService.warnAlertGeneric('Contraseña inválida. La contraseña debe contener mínimo 8 caracteres, por lo menos un valor numérico y mínimo un símbolo.');
    } else if (this.data.confirm != this.data.contrasenia) {
      this.alertaService.warnAlertGeneric('La nueva contraseña no coincide con tu confirmación');
    } else {
      this.loadingService.show().then(() => {
        let body: any = {
          currentPassword: this.data.oldContrasenia,
          newPassword: this.data.confirm
        }
        this.genericService.sendPostRequest(environment.cambioContraseña, body).subscribe((response: any) => {
          this.alertaService.successAlertGeneric("Su contraseña cambio exitosamente");
          //this.verificarCarritoModificarCantidad(producto);
          this.loadingService.hide();
        }, (error: HttpErrorResponse) => {
          this.alertaService.errorAlertGeneric(error.error.description);
          this.loadingService.hide();
        });
      });
    }

  }
}

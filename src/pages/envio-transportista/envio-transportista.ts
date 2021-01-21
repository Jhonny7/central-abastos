import { AlertaService } from './../../app/services/alerta.service';
import { GenericService } from './../../app/services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'page-envio-transportista',
  templateUrl: 'envio-transportista.html',
})
export class EnvioTransportistaPage {

  public transportistas: any = null;

  public transportista:any = null;

  private env: any = environment;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private genericService: GenericService,
    private alertaService: AlertaService) {
    this.transportistas = navParams.get("transportistas");
  }

  ionViewDidLoad() {
    this.limpia();
  }

  /**Método para cerrar el modal, sin embargo
   * se envían de vuelta los filtros para manipularlos en la búsqueda
   */
  dismiss() {
    this.viewCtrl.dismiss({});
  }

  limpia() {
    this.transportistas.forEach(element => {
      element.seleccionado = false;
    });
  }

  selecciona(t: any) {
    console.log(t);
    
    //this.limpia();
    //t.seleccionado = true;
    this.transportista = t;
    console.log(this.transportista);
    this.transportistas.forEach(element => {
      if(element.id_transportista != t.id_transportista){
        element.seleccionado = false;
      }
    });
  }

  retornarTransportista(){
    if(this.transportista && this.transportista.seleccionado){
      this.viewCtrl.dismiss({transportista: this.transportista});
    }else{
      this.alertaService.warnAlertGeneric("Debes seleccionar un transportista");
    }
  }

}

import { AlertaService } from './../../app/services/alerta.service';
import { GenericService } from './../../app/services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { environment } from '../../environments/environment.prod';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-envio-externo',
  templateUrl: 'envio-externo.html',
})
export class EnvioExternoPage {

  private pedidoProveedor: any = null;
  private cp: any = null;
  private carga: boolean = false;
  private envios:any = [];
  private envio:any = null;

  private opc:any = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private alertaService: AlertaService,
    private viewCtrl: ViewController) {
      this.pedidoProveedor = navParams.get("pedidoProveedor");
      this.cp = navParams.get("cp");
      this.opc = navParams.get("opc");
    console.log(this.pedidoProveedor);

  }

  ionViewDidLoad() {
    if (this.pedidoProveedor.pedidoDetalles) {
      let pesoMayor: number = 0;
      let inventario: any = null;
      console.log(this.pedidoProveedor.pedidoDetalles);
      
      this.pedidoProveedor.pedidoDetalles.forEach(element => {
        if (element.inventario) {
          if (Number(element.inventario.peso) > pesoMayor) {
            pesoMayor = Number(element.inventario.peso);

            inventario = element.inventario;
          }else if(!element.inventario.peso){ 
            element.inventario.peso = 10;
            element.inventario.alto = 10;
            element.inventario.ancho = 10;
            element.inventario.largo = 10;
            if (Number(element.inventario.peso) > pesoMayor) {
              pesoMayor = Number(element.inventario.peso);
  
              inventario = element.inventario;
            }
          }
        }
      });

      console.log(pesoMayor);
      console.log(inventario);

      let params = new HttpParams();
      params = params.set('peso', inventario.peso);
      params = params.set('alto', inventario.alto);
      params = params.set('ancho', inventario.ancho);
      params = params.set('largo', inventario.largo);
      params = params.set('origen', this.pedidoProveedor.proveedor.direccion.codigoPostal);
      params = params.set('destino', this.cp);
      params = params.set('servicio', this.opc);
      //params = params.set('servicio', 2);
      console.log(params);
      
      this.genericService.sendGetParams(`${environment.cotizaciones}`, params).subscribe((response: any) => {
        console.log(response);
        this.carga = true;
        let id:number = 1;
        if(response.parameters){
          if(response.parameters.estafeta){
            response.parameters.estafeta.forEach(element => {
              element.isDHL = false;
              element.seleccionado = false;
              element.id = id;
              id++;
              this.envios.push(element);
            });
          }

          if(response.parameters.dhl){
            response.parameters.dhl.forEach(element => {
              element.isDHL = true;
              element.seleccionado = false;
              element.id = id;
              id++;
              this.envios.push(element);
            });
          }
        }
      }, (error: HttpErrorResponse) => {
        let err: any = error.error;
        this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  selecciona(t: any) {
    console.log(t);
    
    //this.limpia();
    //t.seleccionado = true;
    this.envio = t;
    console.log(this.envio);
    this.envios.forEach(element => {
      if(element.id != t.id){
        element.seleccionado = false;
      }
    });
  }

  retornarEnvio(){
    if(this.envio && this.envio.seleccionado){
      this.viewCtrl.dismiss({envio: this.envio});
    }else{
      this.alertaService.warnAlertGeneric("Debes seleccionar un envío");
    }
  }

}

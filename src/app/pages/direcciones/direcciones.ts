import { HomeGeoProveedoresPage } from './../home-geo-proveedores/home-geo-proveedores';
import { LoadingService } from './../../services/loading.service';
import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'page-direcciones',
  templateUrl: 'direcciones.html',
})
export class DireccionesPage {

  public listaDirecciones: any = [];

  public render:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private alertaService: AlertaService,
    private loadingService: LoadingService,
    private events: Events) {

    this.cargarDireccionesLista();

    this.events.subscribe('direction', data => {
      console.log(data);

      if (!data.create) {
        let position = this.listaDirecciones.findIndex(
          (img) => {
            return img.id == data.body.id;
          }
        );
        for (let index = 0; index < this.listaDirecciones.length; index++) {
          const element = this.listaDirecciones[index];
          if (element.id == data.body.id) {
            position = index;
          }
        }
        this.listaDirecciones[position] = data.body;
      } else {
        this.listaDirecciones.push(data.body);
      }
      //this.cards = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}-cards`);
    });

    this.events.subscribe('actualizarTarjetas', data => {
      this.cargarDireccionesLista();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DireccionesPage');
  }

  cargarDireccionesLista() {
    this.genericService.sendGetRequest(environment.direcciones).subscribe((response: any) => {
      console.log(response);
      //quitar
      this.listaDirecciones = response;
      this.render = true;
      if (this.listaDirecciones.length <= 0) {
        this.alertaService.warnAlertGeneric("Aún no cuentas con direcciones frecuentes");
      }
    }, (error: HttpErrorResponse) => {
      let err: any = error.error;
      this.listaDirecciones = [];
      this.render = true;
      //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
    });
  }

  borrar(direccion: any) {
    let position: any = this.listaDirecciones.findIndex(
      (img) => {
        return img.id == direccion.id;
      }
    );

    this.loadingService.show().then(() => {
      this.genericService.sendDelete(`${environment.direcciones}/${direccion.id}`).subscribe((response: any) => {
        this.listaDirecciones = [...this.listaDirecciones.slice(0, position), ...this.listaDirecciones.slice(position + 1)];
        this.loadingService.hide();
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        this.alertaService.errorAlertGeneric("No se ha podido eliminar tu dirección, intenta nuevamente");
      });
    });
  }

  view(direccion: any) {
    this.navCtrl.push(HomeGeoProveedoresPage, { direccion });
  }

  nuevaLista(){
    this.navCtrl.push(HomeGeoProveedoresPage);
  }

}

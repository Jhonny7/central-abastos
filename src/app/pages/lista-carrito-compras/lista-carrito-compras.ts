import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { LoadingService } from './../../services/loading.service';
import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment, nuevoBackHabilitado } from '../../../environments/environment.prod';
import * as moment from "moment";
import { CarritoHistoricoPage } from '../carrito-historico/carrito-historico';

@Component({
  selector: 'page-lista-carrito-compras',
  templateUrl: 'lista-carrito-compras.html',
})
export class ListaCarritoComprasPage implements OnDestroy{

  public listas: any[] = [];
  public renderSlide: boolean = true;
  public user:any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private alertaService: AlertaService,
    private loadingService: LoadingService,
    private localStorageEncryptService: LocalStorageEncryptService) {
      this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    this.cargarListas();
  }

  ionViewWillLeave() {
    let claseTabs: any = document.getElementsByClassName("tabbar");
    //claseTabs[0].style.display = "flex";
  }

  ngOnDestroy() {
    let tabbar:any = document.getElementsByClassName("tabbar");
    tabbar[0].style.display = "flex";
  }

  /**Método para cargar productos en base a especificaciones */
  cargarListas() {

    let params = new HttpParams();
    params = params.set("email", this.user.email);
    let sus: any = this.genericService.sendGetRequest(environment.carritoHistorico);
    if (nuevoBackHabilitado) {
      sus = this.genericService.sendGetParams(`${environment.carritoHistorico}`, params);
    }
    sus.subscribe((response: any) => {
      
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
      //this.alertaService.errorAlertGeneric(err.description ? err.description : "Ocurrió un error en el servicio, intenta nuevamente");
    });
  }

  ionViewDidLoad() {
    let tabbar:any = document.getElementsByClassName("tabbar");
    tabbar[0].style.display = "none";
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

  view(lista:any){
    this.navCtrl.push(CarritoHistoricoPage,{lista});
  }
}

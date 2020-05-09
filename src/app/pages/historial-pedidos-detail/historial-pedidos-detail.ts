import { QrPage } from './../qr/qr';
import { ChatPage } from './../chat/chat';
import { LoadingService } from './../../services/loading.service';
import { VerProductosPage } from './../../pages-proveedor/ver-productos/ver-productos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/User';
import { GenericService } from '../../services/generic.service';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { AlertaService } from '../../services/alerta.service';
import { environment } from '../../../environments/environment.prod';
import { PedidosDetailPage } from '../pedidos-detail/pedidos-detail';
import { ProblemasPedidoPage } from '../problemas-pedido/problemas-pedido';
import { HttpErrorResponse } from '@angular/common/http';
declare var google;

@Component({
  selector: 'page-historial-pedidos-detail',
  templateUrl: 'historial-pedidos-detail.html',
})
export class HistorialPedidosDetailPage {
  public user: User = null;
  public pedido: any = null;
  public map: any;

  public tipoUsuario: any = environment.perfil.activo;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private alertaService: AlertaService,
    private loadingService: LoadingService) {
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    this.pedido = navParams.get("pedido");
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let latitude = this.pedido.direccionContacto.latitud;
    let longitude = this.pedido.direccionContacto.longitud;

    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map_canvas');

    // create LatLng object

    let myLatLng = { lat: Number(latitude), lng: Number(longitude) };

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {

      let info: any = `<div>Ejemplo de window</div>`;

      let infowindow: any = new google.maps.InfoWindow({
        content: info
      });
      let component: any = this;

      component.marker = new google.maps.Marker({
        position: myLatLng,//{ lat: -0.179041, lng: -78.499211 },
        map: this.map,
        title: 'Hello World!',
        id: "marcador-1",
        //draggable: true,
        icon: environment.icons['persona'].icon
      });

      component.marker.addListener('click', () => {
        //infowindow.open(this.map, this.marker);
        //component.changeInfoCard();
      });

      /* marker.addEventListener("click", (e: Event) => {
       
        
      }); */

      mapEle.classList.add('show-map');
    });
  }

  verDetalle() {
    this.navCtrl.push(PedidosDetailPage, { detalle: this.pedido.pedidoProveedores, id: this.pedido.id });
  }

  problemasPedido() {
    this.navCtrl.push(ProblemasPedidoPage);
  }

  verProductos() {
    this.navCtrl.push(VerProductosPage, { pedidos: this.pedido });
  }

  terminarServicio(){
    this.navCtrl.push(QrPage,{ pedido: this.pedido });
  }

  enviarPedido() {
    let body: any = {
      pedidoProveedorId: this.pedido.pedidoProveedores[0].id,
      estatusId: 14
    };

    this.genericService.sendPutRequest(environment.pedidosProveedores, body).subscribe((response1: any) => {
      
      this.alertaService.successAlertGeneric(`El pedido ha cambiado su estatus a enviado, ponte en contacto con ${this.pedido.cliente.firstName}`);
    }, (error: HttpErrorResponse) => {
      this.alertaService.errorAlertGeneric("Ocurrió un error, por favor intenta nuevamente.");
    });
  }

  verChat() {
    switch (environment.perfil.activo) {
      case 1:
        if (!this.pedido.pedidoProveedores[0].chatProveedorid) {
          this.alertaService.warnAlertGeneric("El proveedor aun no inicia el chat, espera a que él se comunique contigo");
        } else {
          this.loadingService.show().then(() => {
            this.genericService.sendGetRequest(`${environment.chats}/${this.pedido.pedidoProveedores[0].chatProveedorid}`).subscribe((response: any) => {
             
              this.navCtrl.push(ChatPage, { chat: response, pedido: this.pedido });
              this.loadingService.hide();
            }, (error: HttpErrorResponse) => {
              this.loadingService.hide();
              let err: any = error.error;
              this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
          });
        }
        break;

      case 2:
        this.loadingService.show().then(() => {
          this.genericService.sendGetRequest(`${environment.chatsProveedor}${this.pedido.pedidoProveedores[0].id}/tipoChat/1`).subscribe((response: any) => {
            
            this.navCtrl.push(ChatPage, { chat: response, pedido: this.pedido });
            this.loadingService.hide();
          }, (error: HttpErrorResponse) => {
            this.loadingService.hide();
            let err: any = error.error;
            this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
          });
        });
        break;
    }
  }
}

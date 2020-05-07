import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/User';
import { GenericService } from '../../services/generic.service';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { AlertaService } from '../../services/alerta.service';
import { environment } from '../../../environments/environment.prod';
import { PedidosDetailPage } from '../pedidos-detail/pedidos-detail';
declare var google;

@Component({
  selector: 'page-historial-pedidos-detail',
  templateUrl: 'historial-pedidos-detail.html',
})
export class HistorialPedidosDetailPage {
  public user: User = null;
  public pedido: any = null;
  public map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private alertaService: AlertaService) {
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    this.pedido = navParams.get("pedido");
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let latitude = this.pedido.direccionContacto.latitud;
    let longitude = this.pedido.direccionContacto.longitud;
    console.log(latitude, longitude);

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
        console.log("---->");
        
      }); */

      mapEle.classList.add('show-map');
    });
  }

  verDetalle(){
    this.navCtrl.push(PedidosDetailPage,{detalle: this.pedido.pedidoProveedores, id:this.pedido.id});
  }

}

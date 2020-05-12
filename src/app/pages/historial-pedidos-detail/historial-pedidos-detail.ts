import { ListaChatPage } from './../../pages/lista-chat/lista-chat';
import { QrPage } from './../qr/qr';
import { ChatPage } from './../chat/chat';
import { LoadingService } from './../../services/loading.service';
import { VerProductosPage } from './../../pages-proveedor/ver-productos/ver-productos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { User } from '../../models/User';
import { GenericService } from '../../services/generic.service';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { AlertaService } from '../../services/alerta.service';
import { environment } from '../../../environments/environment.prod';
import { PedidosDetailPage } from '../pedidos-detail/pedidos-detail';
import { ProblemasPedidoPage } from '../problemas-pedido/problemas-pedido';
import { HttpErrorResponse } from '@angular/common/http';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
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
    private loadingService: LoadingService,
    private qrScanner: QRScanner,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private iab: InAppBrowser) {
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    this.pedido = navParams.get("pedido");
    console.log(this.pedido);
    
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

  terminarServicio() {
    this.navCtrl.push(QrPage, { pedido: this.pedido });
  }

  enviarPedido() {
    let body: any = {
      pedidoProveedorId: this.pedido.pedidoProveedores[0].id,
      estatusId: 18 //antes 14
    };

    this.genericService.sendPutRequest(environment.pedidosProveedores, body).subscribe((response1: any) => {

      this.alertaService.successAlertGeneric(`El pedido se ha enviado al transportista`);
    }, (error: HttpErrorResponse) => {
      this.alertaService.errorAlertGeneric("Ocurrió un error, por favor intenta nuevamente.");
    });
  }

  completarServicio(tokenEntrada:any) {
    let body: any = {
      pedidoProveedorId: this.pedido.pedidoProveedores[0].id,
      token: tokenEntrada
    }
    this.loadingService.show().then(()=>{
      this.genericService.sendPutRequest(`${environment.pedidosTransportistas}/terminar-servicio`, body).subscribe((response: any) => {
        this.loadingService.hide();
        this.alertaService.successAlertGeneric("El servició terminó correctamente");
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        this.alertaService.errorAlertGeneric("Ocurrió un error, por favor vuelve a intentarlo");
      });
    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecciona',
      buttons: [
        {
          text: 'Escanear',
          icon: 'ios-barcode-outline',
          handler: () => {
            this.qrScanner.prepare()
              .then((status: QRScannerStatus) => {
                if (status.authorized) {
                  // camera permission was granted


                  // start scanning
                  let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                    console.log('Scanned something', text);
                    ///LOGICA DE ESCANEO Y MANDADO EL TEXTO

                    this.completarServicio(text);
                    ///
                    this.qrScanner.hide(); // hide camera preview
                    scanSub.unsubscribe(); // stop scanning
                  });

                } else if (status.denied) {
                  // camera permission was permanently denied
                  // you must use QRScanner.openSettings() method to guide the user to the settings page
                  // then they can grant the permission from there
                  this.alertaService.warnAlertGeneric("Activa los permisos de cámara en la aplicación para poder escanear el código");
                } else {
                  // permission was denied, but not permanently. You can ask for permission again at a later time.
                  this.alertaService.warnAlertGeneric("Activa los permisos de cámara en la aplicación para poder escanear el código");
                }
              })
              .catch((e: any) => console.log('Error is', e));
          }
        },
        {
          text: 'Ingresar manual',
          icon: 'create',
          handler: () => {
            let alert = this.alertCtrl.create({
              title: 'Escaneo de código',
              inputs: [
                {
                  name: 'token',
                  placeholder: 'Código'
                }
              ],
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  handler: data => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Aceptar',
                  handler: data => {
                    //data.token
                    this.completarServicio(data.token);
                  }
                }
              ]
            });
            alert.present();
          }
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  verMapa() {
    if (environment.perfil.activo == 3) {
      //http://google.com/maps/@?api=1&map_action=map&center=-33.712206,150.311941&zoom=1
      let latitude = this.pedido.direccionContacto.latitud;
      let longitude = this.pedido.direccionContacto.longitud;
      window.open(`https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${latitude},${longitude}&zoom=18`);
    }
  }

  verChat() {
    switch (environment.perfil.activo) {
      case 1:
        if (!this.pedido.pedidoProveedores[0].chatProveedorid) {
          this.alertaService.warnAlertGeneric("El proveedor aun no inicia el chat, espera a que él se comunique contigo");
        } else {
          /* this.loadingService.show().then(() => {
            this.genericService.sendGetRequest(`${environment.chats}/${this.pedido.pedidoProveedores[0].chatProveedorid}`).subscribe((response: any) => {
              */
          this.navCtrl.push(ListaChatPage, { chats: this.pedido.pedidoProveedores, pedido: this.pedido });
          /* this.loadingService.hide();
        }, (error: HttpErrorResponse) => {
          this.loadingService.hide();
          let err: any = error.error;
          this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
      }); */
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
      case 3:
        this.loadingService.show().then(() => {
          this.genericService.sendGetRequest(`${environment.chatsProveedor}${this.pedido.pedidoProveedores[0].id}/tipoChat/2`).subscribe((response: any) => {

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

import { EnvioTransportistaPage } from './../../../pages/envio-transportista/envio-transportista';
import { SqlGenericService } from './../../services/sqlGenericService';
import { ListaChatPage } from './../../pages/lista-chat/lista-chat';
import { QrPage } from './../qr/qr';
import { ChatPage } from './../chat/chat';
import { LoadingService } from './../../services/loading.service';
import { VerProductosPage } from './../../pages-proveedor/ver-productos/ver-productos';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, Platform, ModalController } from 'ionic-angular';
import { User } from '../../models/User';
import { GenericService } from '../../services/generic.service';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { AlertaService } from '../../services/alerta.service';
import { environment } from '../../../environments/environment.prod';
import { PedidosDetailPage } from '../pedidos-detail/pedidos-detail';
import { ProblemasPedidoPage } from '../problemas-pedido/problemas-pedido';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';

import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { ParamSQL } from '../../services/sqlGenericService';
import { FCMData, FCMJson, Notification } from '../../services/pushNotifications.service';

declare var google;

@Component({
  selector: 'page-historial-pedidos-detail',
  templateUrl: 'historial-pedidos-detail.html',
})
export class HistorialPedidosDetailPage implements OnDestroy {
  public user: any = null;
  public pedido: any = null;
  public map: any;

  public tipoUsuario: any = environment.perfil.activo;

  public ref: any;

  public idGenerado: number = 1;

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
    private iab: InAppBrowser,
    private httpClient: HttpClient,
    private platform: Platform,
    private file: File,
    private fileOpener: FileOpener,
    private sqlGenericService: SqlGenericService,
    private modalController: ModalController) {
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    this.pedido = navParams.get("pedido");
    console.log(this.pedido);
    this.idGenerado = Math.floor(new Date().getTime() / 1000.0);
  }

  ngOnDestroy() {
    this.localStorageEncryptService.clearProperty("pedidoPedido");
  }

  ionViewDidLoad() {
    this.loadMap();
    this.localStorageEncryptService.setToLocalStorage("pedidoPedido", this.pedido.id);
  }

  loadMap() {
    let latitude = this.pedido.direccionContacto.latitud;
    let longitude = this.pedido.direccionContacto.longitud;

    // create a new map by passing HTMLElement
    console.log(this.idGenerado);

    let mapEle: HTMLElement = document.getElementById(`${this.idGenerado}-map`);
    console.log(mapEle);

    // create LatLng object

    let myLatLng = { lat: Number(latitude), lng: Number(longitude) };

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });

    console.log(this.map);

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
    this.navCtrl.push(ProblemasPedidoPage, { pedidoProblem: this.pedido });
  }

  terminarPedido() {
    let body: any = {
      pedidoProveedorId: this.pedido.pedidoProveedores[0].id
    };

    this.genericService.sendPutRequest(environment.llegada, body).subscribe(
      (response1: any) => {
        this.alertaService.successAlertGeneric(`Se ha notificado al usuario de tu llegada al domicilio`);
      },
      (error: HttpErrorResponse) => {
        this.alertaService.errorAlertGeneric('Ocurrió un error, por favor intenta nuevamente.');
      }
    );
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

  enviarPedidoMultiple() {
    this.loadingService.show();
    //this.pedido.pedidoProveedores[0].proveedorId
    //console.log(this.pedido);
    /* let objSQL: ParamSQL = {
      table: "proveedor_transportista",
      //selectables: ["id", "json"],
      conditions: {
        id_proveedor: {
          value: this.pedido.pedidoProveedores[0].proveedorId,
        }
      },
      typeSQL: 3
    }; */

    let sql: string = `
    SELECT pt.*, t.*, ju.*, d.*, t.id as idT FROM proveedor_transportista pt
    LEFT JOIN transportista t
    ON (pt.id_transportista = t.id) 
    LEFT JOIN jhi_user ju
    ON (ju.id = t.usuario_id)
    LEFT JOIN direccion d
    ON (d.id = t.direccion_id)
    WHERE pt.id_proveedor = ${this.pedido.pedidoProveedores[0].proveedorId}`;
    console.log(sql);
    //console.log(sql);

    let queryEncrypt: any = this.localStorageEncryptService.encryptBack(sql);
    ////console.log(params);
    let request: any = {
      query: queryEncrypt,
      retorna: 1,
      push: null,
      token: null
    }
    this.genericService.sendPostRequest(environment.genericQuerie, request).subscribe((response: any) => {
      //console.log(response);
      this.loadingService.hide();
      if (response.parameters.length > 0) {
        console.log(response.parameters);
        //this.navCtrl.push(EnvioTransportistaPage, );
        let modal = this.modalController.create(EnvioTransportistaPage,
          { transportistas: response.parameters });
        modal.present();
        modal.onDidDismiss((data) => {
          if (data && data.transportista) {
            console.log(data.transportista);
            let transportista:any = data.transportista;
            ////Notification data

            let notification: Notification = {
              body: `Tienes un nuevo pedido por entregar - PEDIDO ${this.pedido.pedidoProveedores[0].folio}`,
              title: `Pedido ${this.pedido.pedidoProveedores[0].folio}`,
              click_action: "FCM_PLUGIN_ACTIVITY",
              image: null,
              color: "#F07C1B",
              "content-available": true
            };

            let dataFCM: FCMData = {
              body: data.msj,
              title: data.titulo,
              view: 1,
              otherData: null
            };

            let fcmd: FCMJson = {
              to: `${transportista.token}`,
              notification: notification,
              data: dataFCM,
              priority: "high"
            };

            
            //////////////////
            let body: any = {
              pedidoProveedorId: this.pedido.pedidoProveedores[0].id,
              estatusId: 18, //antes 14
              email: this.user.email,
              transportistaId: data.transportista.idT,
              fcmData: fcmd
            };
            this.loadingService.show();
            this.genericService.sendPutRequest(environment.pedidosProveedores, body).subscribe((response1: any) => {
              this.loadingService.hide();
              this.alertaService.successAlertGeneric(response1.description);
              
            }, (error: HttpErrorResponse) => {
              this.loadingService.hide();
              this.alertaService.errorAlertGeneric(error.error.description);
            });

          }
        });
      } else {
        this.alertaService.warnAlertGeneric("No tienes transportistas asignados");
      }
      //this.getMenus();
    }, (error: HttpErrorResponse) => {
      //console.log(error);
      this.loadingService.hide();
      this.alertaService.errorAlertGeneric(error.error.description);
    });
  }

  verRecibo() {
    if (this.pedido.receiptUrl && this.pedido.receiptUrl.length > 0) {
      //this.returnDocument(this.pedido.folio.toString(),this.pedido.receiptUrl,'application/pdf');
      this.aceptarRedirect(this.pedido.receiptUrl);
    } else {
      this.alertaService.warnAlertGeneric("No se ha generado el ticket de tu pedido, contacta al administrador");
    }
    //
  }
  /**Accept redirect android */
  async aceptarRedirectAndroid(linkTemp: any) {
    let script: any = "window.print();"
    let ref = this.iab.create(linkTemp, '_blank', 'location=yes');


    ref.on('loadstop').subscribe((event: InAppBrowserEvent) => {
      console.log("script ejecuta");

      ref.executeScript({ code: script });
    });
    ref.on('exit').subscribe((event: InAppBrowserEvent) => {
    });
    ref.on('loadstart').subscribe((event: InAppBrowserEvent) => {
    });
  }

  /**Accept redirect android */
  async aceptarRedirectIOS(linkTemp: any) {

    if (this.ref) {
      this.ref.close();
      this.ref = undefined;
    }
    this.ref = this.iab.create(linkTemp, '_blank', 'location=yes');


    let script: any = "window.print();"


    this.ref.on('loadstop').subscribe((event: InAppBrowserEvent) => {

      this.ref.executeScript({ code: script });

    });
    this.ref.on('exit').subscribe((event: InAppBrowserEvent) => {

    });
    this.ref.on('loadstart').subscribe((event: InAppBrowserEvent) => {

    });
  }

  /**Método que hace el redirect y genera un autoclick en el formulario que se envia */
  async aceptarRedirect(linkTemp: any) {
    if (this.platform.is("ios")) {
      this.aceptarRedirectIOS(linkTemp);
    } else {
      this.aceptarRedirectAndroid(linkTemp);
    }
  }

  returnDocument(titulo: string, filePath: string, mimeType: string) {
    /* this.fileOpener.open(filePath, mimeType)
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error opening file', e)); */
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');

    this.httpClient.get(filePath, { headers: headers, responseType: 'blob' }).subscribe((resp: any) => {
      console.log(resp);

      let path = null;
      if (this.platform.is('ios')) {
        path = this.file.tempDirectory;
      } else {
        path = this.file.externalRootDirectory;
      }
      console.log(path);

      console.log(this.platform.is('ios'));


      this.file.writeExistingFile(path, `${titulo}.pdf`, resp).then((response) => {
        console.log('successfully wrote to file', response);
        this.fileOpener.open(path + `${titulo}.pdf`, 'application/pdf').then((response) => {
          console.log('opened PDF file successfully', response);
        }).catch((err) => {
          console.log('error in opening pdf file', err);
        });
      }).catch((err) => {
        console.log('error writing to file', err);
      });
    });
  }

  completarServicio(tokenEntrada: any) {
    let body: any = {
      pedidoProveedorId: this.pedido.pedidoProveedores[0].id,
      token: tokenEntrada
    }
    this.loadingService.show().then(() => {
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

import { CalificacionPage } from '../../pages/calificacion/calificacion';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GenericService } from '../../services/generic.service';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { AlertaService } from '../../services/alerta.service';
import { LoadingService } from '../../services/loading.service';
import { QrPage } from '../qr/qr';
import { ListaChatPage } from '../lista-chat/lista-chat';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { ChatPage } from '../chat/chat';
import { VerProductosPage } from '../../pages-proveedor/ver-productos/ver-productos';
import { ArticuloProveedoresPage } from '../articulo-proveedores/articulo-proveedores';

@Component({
  selector: 'page-pedidos-detail',
  templateUrl: 'pedidos-detail.html',
})
export class PedidosDetailPage {

  public detalle: any = null;
  public id: any = null;
  public user:any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private alertaService: AlertaService,
    private loadingService: LoadingService
  ) {
    this.detalle = navParams.get("detalle");
    console.log(this.detalle);

    this.id = navParams.get("id");
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
  }

  ionViewDidLoad() {
  }

  terminarServicio(pedido) {
    this.navCtrl.push(QrPage, { pedido });
  }

  verChatProveedor(pedido: any) {
    console.log(this.detalle);
    console.log(pedido);
    
    if (!pedido.chatProveedorId) {
      this.alertaService.warnAlertGeneric("El proveedor aun no inicia el chat, espera a que él se comunique contigo");
    } else {
      this.loadingService.show().then(() => {
        this.genericService.sendGetRequest(`${environment.chats}/${pedido.chatProveedorId}`).subscribe((response: any) => {
          console.log(response);
          
          this.navCtrl.push(ChatPage, { chat: response[0], pedido: this.detalle });
          this.loadingService.hide();
        }, (error: HttpErrorResponse) => {
          this.loadingService.hide();
          let err: any = error.error;
          this.alertaService.errorAlertGeneric(err.description ? err.description : "Ocurrió un error en el servicio, intenta nuevamente");
        });
      });
    }
  }

  verChatTransportista(pedido: any) {
    if (!pedido.chatTransportistaId) {
      this.alertaService.warnAlertGeneric("El transportista aun no inicia el chat, espera a que él se comunique contigo");
    } else {
      this.loadingService.show().then(() => {
        this.genericService.sendGetRequest(`${environment.chats}/${pedido.chatTransportistaId}`).subscribe((response: any) => {

          this.navCtrl.push(ChatPage, { chat: response, pedido: this.detalle });
          this.loadingService.hide();
        }, (error: HttpErrorResponse) => {
          this.loadingService.hide();
          let err: any = error.error;
          this.alertaService.errorAlertGeneric(err.description ? err.description : "Ocurrió un error en el servicio, intenta nuevamente");
        });
      });
    }
  }

  verProductos(pedido: any) {
    /* this.loadingService.show().then(() => {
      this.genericService.sendGetRequest(`${environment.proveedorProductos}/proveedor/${pedido.proveedorId}`).subscribe((response: any) => {
        

        this.loadingService.hide();
        this.navCtrl.push(ArticuloProveedoresPage, { productos: response, proveedor : pedido.proveedor });
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        let err: any = error.error;
        this.alertaService.errorAlertGeneric(err.description ? err.description : "Ocurrió un error en el servicio, intenta nuevamente");
      });
    }); */
    let productos: any[] = [];
    pedido.pedidoDetalles.forEach(element => {
      productos.push(element.productoProveedor);
    });
    console.log(productos);
    
    this.navCtrl.push(ArticuloProveedoresPage, { productos, proveedor: pedido.proveedor, fromCliente:true });
  }

  calificar(pedido: any){
    this.navCtrl.push(CalificacionPage,{pedido});
  }

  queja(p) {
    let body: any = {
      pedidoProveedorId: p.id,
      email: this.user.email,
      tipoUsuario: this.user.tipo_usuario
    };

    this.genericService.sendPostRequest(`${environment.queja}`, body).subscribe(
      (response: any) => {
        this.alertaService.successAlertGeneric('Un contact center te atenderá en breve');
      },
      (error: HttpErrorResponse) => {
        this.alertaService.errorAlertGeneric('No se ha podido contactar al administrador, intenta nuevamente');
      }
    );
  }

  retornaVal(a:any,b:any){
    return Number(a)+Number(b);
  }
}

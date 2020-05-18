import { LoadingService } from './../../services/loading.service';
import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, MenuController, Events } from 'ionic-angular';
import { OpcionesMenuPage } from '../../pages/opciones-menu/opciones-menu';
import { User } from '../../models/User';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from "moment";
import { HistorialPedidosDetailPage } from '../../pages/historial-pedidos-detail/historial-pedidos-detail';

@Component({
  selector: 'page-home-proveedor',
  templateUrl: 'home-proveedor.html',
})
export class HomeProveedorPage implements OnDestroy{

  public user: User = null;
  public pedidos: any = [];
  public pedidosReplica: any = [];

  public botones: any = {
    boton1: false,
    boton2: false,
    boton3: false
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public menuCtrl: MenuController,
    private localStorageEncryptService: LocalStorageEncryptService,
    private genericService: GenericService,
    private alertaService: AlertaService,
    private loadingService: LoadingService,
    private events: Events) {
    /**Obtenci{on de usuario en sesión */
    this.menuCtrl.enable(true);
    this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);

    this.cargarPedidos();

    this.events.subscribe("cargarPedidos", data => {
      try {
        this.cargarPedidos();
      } catch (error) {
      }
    });
  }

  ngOnDestroy(){
    this.events.unsubscribe("cargarPedidos");
  }


  ionViewDidLoad() {
  }

  verOpciones() {
    let popover = this.popoverCtrl.create(OpcionesMenuPage, {}, { cssClass: "clase-Pop" });
    popover.present({
    });
  }

  cargarPedidos() {

    let path: string = `${environment.pedidosProveedor}`;
    if (environment.perfil.activo == 3) {
      path = `${environment.pedidosTransportista}`;
    }

    this.genericService.sendGetRequest(path).subscribe((response: any) => {

      this.pedidos = response;
      if (this.pedidos.length <= 0) {
        this.pedidos = null;
      }
      this.pedidosReplica = this.pedidos;
    }, (error: HttpErrorResponse) => {
      let err: any = error.error;
      this.pedidos = null;
      this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
    });
  }

  viewDetail(pedido: any) {
    this.navCtrl.push(HistorialPedidosDetailPage, { pedido });
  }

  ordenPor(opc) {
    this.pedidos = this.pedidosReplica;
    //item.fecha = moment(fechaF, 'DD-MM-YYYY HH:mm:ss').format("D [de] MMMM [de] YYYY HH:mm:ss");
    console.log(opc);
    console.log(this.pedidos);

    switch (opc) {
      case 1:
        //fecha solicitud
        this.pedidos.sort((mayor, menor) => {
          let dateA: any = moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate();
          let dateB: any = moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate();
          console.log(dateA);
          console.log(dateB);

          return dateB - dateA;
          //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
        });
        this.botones.boton1 = !this.botones.boton1;
        break;
      case 2:
        //fecha entrega
        this.pedidos.sort((mayor, menor) => {
          let dateA: any = moment(mayor.fechaEntrega, 'DD-MM-YYYY HH:mm:ss').toDate();
          let dateB: any = moment(menor.fechaEntrega, 'DD-MM-YYYY HH:mm:ss').toDate();
          return dateB - dateA;
          //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
        });
        this.botones.boton2 = !this.botones.boton2;
        break;
      case 3:
        //estatus
        this.pedidos.sort((mayor, menor) => {
          let a: any = mayor.estatus.nombre;
          let b: any = menor.estatus.nombre;
          console.log(a);
          console.log(b);
          if (a > b) {
            return -1;
          }
          if (b > a) {
            return 1;
          }
          return 0;
        });
        this.botones.boton3 = !this.botones.boton3;
        break;


      case 4:
        //fecha solicitud
        this.pedidos.sort((mayor, menor) => {
          let dateA: any = moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate();
          let dateB: any = moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate();
          console.log(dateA);
          console.log(dateB);

          return dateA - dateB;
          //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
        });
        this.botones.boton1 = !this.botones.boton1;
        break;
      case 5:
        //fecha entrega
        this.pedidos.sort((mayor, menor) => {
          let dateA: any = moment(mayor.fechaEntrega, 'DD-MM-YYYY HH:mm:ss').toDate();
          let dateB: any = moment(menor.fechaEntrega, 'DD-MM-YYYY HH:mm:ss').toDate();
          return dateA - dateB;
          //return Math.abs(moment(mayor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime() - moment(menor.fechaAlta, 'DD-MM-YYYY HH:mm:ss').toDate().getTime());
        });
        this.botones.boton2 = !this.botones.boton2;
        break;
      case 6:
        //estatus
        this.pedidos.sort((mayor, menor) => {
          let a: any = mayor.estatus.nombre;
          let b: any = menor.estatus.nombre;
          console.log(a);
          console.log(b);
          if (a < b) {
            return -1;
          }
          if (b < a) {
            return 1;
          }
          return 0;
        });
        this.botones.boton3 = !this.botones.boton3;
        break;
    }

    console.log(this.pedidos);
  }

}

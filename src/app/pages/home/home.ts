import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { FiltroProductoPage } from '../filtro-producto/filtro-producto';
import { LoadingService } from '../../services/loading.service';
import { LoginPage } from '../login/login';
import { DetalleProductoPage } from '../detalle-producto/detalle-producto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public productos: any = [{
    "id": 1,
    "nombre": "mobile Fish",
    "descripcion": "Home Loan Account Table Computer",
    "caracteristicas": "Trace",
    "precioSinIva": 33370,
    "precio": 60111,
    "fechaAlta": "2020-04-20T13:32:18Z",
    "fechaModificacion": "2020-04-19T23:58:25Z",
    "adjuntoId": 1,
    "usuarioAltaId": 1,
    "usuarioModificacionId": null,
    "proveedorId": 1,
    "proveedor": {
      "id": 1,
      "nombre": "Developer Shoes Music",
      "fechaAlta": "2020-04-19T22:38:48Z",
      "fechaModificacion": "2020-04-20T05:10:07Z",
      "usuarioAltaId": null,
      "usuarioModificacionId": null,
      "empresaId": null
    },
    "tipoArticuloId": 1,
    "tipoArticulo": {
      "id": 1,
      "nombre": "Canadian Dollar"
    },
    "categoriaId": 1,
    "categoria": {
      "id": 1,
      "nombre": "open-source turn-key",
      "empresaId": null
    },
    "seccionId": 1,
    "seccion": {
      "id": 1,
      "nombre": "bypassing Marketing",
      "empresaId": null
    },
    "estatusId": 1,
    "estatus": {
      "id": 1,
      "tipoEstatus": "ESTATUS_PRODUCTO",
      "nombre": "target Human withdrawal"
    },
    "unidadMedidaId": 1,
    "unidadMedida": {
      "id": 1,
      "nombre": "Small partnerships",
      "descripcion": "Outdoors"
    },
    "empresaId": 1,
    "empresa": {
      "id": 1,
      "nombre": "Intuitive"
    }
  },
  {
    "id": 1,
    "nombre": "mobile Fish",
    "descripcion": "Home Loan Account Table Computer",
    "caracteristicas": "Trace",
    "precioSinIva": 33370,
    "precio": 60111,
    "fechaAlta": "2020-04-20T13:32:18Z",
    "fechaModificacion": "2020-04-19T23:58:25Z",
    "adjuntoId": 1,
    "usuarioAltaId": 1,
    "usuarioModificacionId": null,
    "proveedorId": 1,
    "proveedor": {
      "id": 1,
      "nombre": "Developer Shoes Music",
      "fechaAlta": "2020-04-19T22:38:48Z",
      "fechaModificacion": "2020-04-20T05:10:07Z",
      "usuarioAltaId": null,
      "usuarioModificacionId": null,
      "empresaId": null
    },
    "tipoArticuloId": 1,
    "tipoArticulo": {
      "id": 1,
      "nombre": "Canadian Dollar"
    },
    "categoriaId": 1,
    "categoria": {
      "id": 1,
      "nombre": "open-source turn-key",
      "empresaId": null
    },
    "seccionId": 1,
    "seccion": {
      "id": 1,
      "nombre": "bypassing Marketing",
      "empresaId": null
    },
    "estatusId": 1,
    "estatus": {
      "id": 1,
      "tipoEstatus": "ESTATUS_PRODUCTO",
      "nombre": "target Human withdrawal"
    },
    "unidadMedidaId": 1,
    "unidadMedida": {
      "id": 1,
      "nombre": "Small partnerships",
      "descripcion": "Outdoors"
    },
    "empresaId": 1,
    "empresa": {
      "id": 1,
      "nombre": "Intuitive"
    }
  }];

  private dataFilter: any = {};

  constructor(
    public navCtrl: NavController,
    private modalController: ModalController,
    private loadingService: LoadingService,
    private alertCtrl: AlertController) {

  }

  /**Método que mediante un modal abre una página con los filtros de intereses */
  openFilters() {
    let modal = this.modalController.create(FiltroProductoPage, { dataFilter: this.dataFilter });
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        if (data != null) {
          let valores = data.data;
          this.dataFilter = {
            entretenimiento: valores.entretenimiento,
            restaurantes: valores.restaurantes,
            compras: valores.compras,
            viajes: valores.viajes,
            wellness: valores.wellness,
          }
          //Autoclick
          this.loadingService.show().then(() => {
            this.buscarPorFiltros();
          });
        }
      }
    });
  }

  buscarPorFiltros(){
    this.loadingService.hide();
  }

  logout(){
    let alert = this.alertCtrl.create({
      title: "Confirmación",//this.translatePipe.instant("CONFIRM"),
      message: "¿Estás segur@ de cerrar sesión?",//this.translatePipe.instant("CONFIRM-LOGOUT"),
      buttons: [
        {
          text: "Cancelar",//this.translatePipe.instant("CANCEL"),
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.confirmar();
          }
        }
      ]
    });
    alert.present();
  }

  confirmar() {
    try {
      localStorage.removeItem("userSession");
      this.navCtrl.setRoot(LoginPage);
      
    } catch (error) {
      console.log(error);

    }
  }

  viewDetail(producto:any){
    //consumir servicio de imagenes completas

    //
    this.navCtrl.push(DetalleProductoPage,{producto});
  }

}

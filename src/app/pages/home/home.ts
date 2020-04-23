import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { FiltroProductoPage } from '../filtro-producto/filtro-producto';
import { LoadingService } from '../../services/loading.service';
import { LoginPage } from '../login/login';
import { DetalleProductoPage } from '../detalle-producto/detalle-producto';
import { environment } from '../../../environments/environment.prod';
import { GenericService } from '../../services/generic.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AlertaService } from '../../services/alerta.service';

import { Seccion } from '../../models/Seccion';
import { Proveedor } from '../../models/Proveedor';
import { Categoria } from '../../models/Categoria';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public productos: any = [];

  public categorias: Categoria[] = [];
  public proveedores: Proveedor[] = [];
  public secciones: Seccion[] = [];

  private dataFilter: any = {
    idProveedor: null,
    idSeccion: null,
    idCategoria: null,
    nombre: null
  };

  private objCombos: any = {
    secciones: this.secciones,
    proveedores: this.proveedores,
    categorias: this.categorias
  }

  public env: any = environment;

  constructor(
    public navCtrl: NavController,
    private modalController: ModalController,
    private loadingService: LoadingService,
    private alertCtrl: AlertController,
    private genericService: GenericService,
    private alertaService: AlertaService, ) {
    this.cargarProductos();

    this.cargarProveedores();
    this.cargarSecciones();
    this.cargarCategorias();
  }

  cargarSecciones() {
    this.genericService.sendGetRequest(environment.secciones, Seccion)
      .subscribe((response: any) => {
        this.secciones = response;
        this.objCombos.secciones = this.secciones;
        //quitar
      }, (error: HttpErrorResponse) => {
        let err: any = error.error;
        //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
      });
  }

  cargarProveedores() {
    this.genericService.sendGetRequest(environment.proveedores, Proveedor)
      .subscribe((response: any) => {
        this.proveedores = response;
        this.objCombos.proveedores = this.proveedores;

        //quitar
      }, (error: HttpErrorResponse) => {
        let err: any = error.error;
        //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
      });
  }

  cargarCategorias() {
    this.genericService.sendGetRequest(environment.categorias, Categoria)
      .subscribe((response: any) => {
        this.categorias = response;
        this.objCombos.categorias = this.categorias;
        //quitar
      }, (error: HttpErrorResponse) => {
        let err: any = error.error;
        //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
      });
  }

  /**Método para cargar productos en base a especificaciones */
  cargarProductos() {
    console.log("123");

    this.loadingService.show().then(() => {
      this.genericService.sendGetRequest(environment.productos).subscribe((response: any) => {
        console.log(response);
        //quitar
        this.productos = response;
        console.log(this.productos);

        this.loadingService.hide();
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        let err: any = error.error;
        this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
      });
    });
  }

  /**Método que mediante un modal abre una página con los filtros de intereses */
  openFilters() {
    let modal = this.modalController.create(FiltroProductoPage, { dataFilter: this.dataFilter, objCombos: this.objCombos });
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        if (data != null) {
          let valores = data.data;
          this.dataFilter = {
            idProveedor: valores.idProveedor,
            idSeccion: valores.idSeccion,
            idCategoria: valores.idCategoria,
            nombre: valores.nombre
          }
          //Autoclick
          if (valores.cambio > 0) {
            this.loadingService.show().then(() => {
              this.buscarPorFiltros();
            });
          }
        }
      }
    });
  }

  buscarPorFiltros() {
    let params = new HttpParams()

    if (this.dataFilter.idProveedor) {
      params = params.set('proveedorId', this.dataFilter.idProveedor ? this.dataFilter.idProveedor : "")
    }
    if (this.dataFilter.idSeccion) {
      params = params.set('seccionId', this.dataFilter.idSeccion ? this.dataFilter.idSeccion : "")
    }
    if (this.dataFilter.idCategoria) {
      params = params.set('categoriaId', this.dataFilter.idCategoria ? this.dataFilter.idCategoria : "")
    }
    if (this.dataFilter.nombre) {
      console.log("---");

      params = params.append('nombre', this.dataFilter.nombre);
    }
    console.log(params);


    this.genericService.sendGetParams(`${environment.productos}/search`, params).subscribe((response: any) => {
      console.log(response);
      this.productos = response;
      this.loadingService.hide();
    }, (error: HttpErrorResponse) => {
      this.loadingService.hide();
      let err: any = error.error;
      this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
    });
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: "Confirmación",//this.translatePipe.instant("CONFIRM"),
      message: "¿Estás segur@ de cerrar sesión?",//this.translatePipe.instant("CONFIRM-LOGOUT"),
      cssClass: "alerta-two-button",
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

  viewDetail(producto: any) {
    //consumir servicio de imagenes completas
    this.loadingService.show().then(()=>{
      this.genericService.sendGetRequest(`${environment.productos}/${producto.id}`).subscribe((response: any) => {
        console.log(response);
        this.navCtrl.push(DetalleProductoPage, { producto: response });
        this.loadingService.hide();
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        let err: any = error.error;
        this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
      });
    });
    //
    
  }

}

import { Component, OnDestroy } from '@angular/core';
import { NavController, ModalController, AlertController, Events, App } from 'ionic-angular';
import { FiltroProductoPage } from '../filtro-producto/filtro-producto';
import { LoadingService } from '../../services/loading.service';
import { LoginPage } from '../login/login';
import { DetalleProductoPage } from '../detalle-producto/detalle-producto';
import { environment } from '../../../environments/environment.prod';
import { GenericService } from '../../services/generic.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AlertaService } from '../../services/alerta.service';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { Seccion } from '../../models/Seccion';
import { Proveedor } from '../../models/Proveedor';
import { Categoria } from '../../models/Categoria';
import { CarritoComprasPage } from '../carrito-compras/carrito-compras';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { User } from '../../models/User';
import { ProductoService } from '../../services/producto.service';
import { StringUtilsService } from '../../services/string-utils.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {

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

  public user: User = null;
  constructor(
    public navCtrl: NavController,
    private modalController: ModalController,
    private loadingService: LoadingService,
    private alertCtrl: AlertController,
    private genericService: GenericService,
    private alertaService: AlertaService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private events: Events,
    public productoService: ProductoService,
    private actionSheet: ActionSheet,
    private stringUtilsService: StringUtilsService,
    private app: App) {
    /**Obtenci{on de usuario en sesión */
    this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
    this.cargarProductos();

    this.cargarProveedores();
    this.cargarSecciones();
    this.cargarCategorias();

    this.events.subscribe('updateProductos', data => {
      console.log(data);
      if (data) {
        if (data.productoDelete) {
          this.productos.forEach(element => {
            if (element.id == data.productoDelete.id) {
              element.carrito = data.productoDelete.carrito;
              element.cantidad = data.productoDelete.cantidad;
            }
          });
        }
      }
    });
  }

  ngOnDestroy() {
    this.events.unsubscribe("updateProductos");
  }

  verificarCarrito() {
    let productosStorage: any = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
    console.log(productosStorage);
    
    if (productosStorage) {
      productosStorage.forEach(item => {
        this.productos.forEach(element => {
          if (item.id == element.id) {
            element.carrito = true;
            element.cantidad = item.cantidad;
          }
        });
      });
    }
  }

  verificarCarritoModificarCantidad(element:any) {
    let productosStorage: any = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
    if (productosStorage) {
      productosStorage.forEach(item => {
          if (item.id == element.id) {
            item.cantidad = element.cantidad;
          }
      });
    }
    this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}`, productosStorage);
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

  incrementa(p: any) {
    if (p.cantidad) {
      p.cantidad++;
    } else if (p.cantidad == 0) {
      p.cantidad = 1;
      this.agregarToCarrito(p);
    } else {
      p.cantidad = 1;
      this.agregarToCarrito(p);
    }
    this.verificarCarritoModificarCantidad(p);
  }

  decrementar(p: any) {
    p.cantidad--;
    if (p.cantidad == 0) {
      this.productoService.deleteFavorito(p);
    }
    this.verificarCarritoModificarCantidad(p);
  }

  /**Método para cargar productos en base a especificaciones */
  cargarProductos() {
    this.loadingService.show().then(() => {
      this.genericService.sendGetRequest(environment.productos).subscribe((response: any) => {
        console.log(response);
        //quitar
        this.productos = response;
        console.log(this.productos);
        this.verificarCarrito();
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

  agregarColeccion() {
    let colecciones: any = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}-colecciones`);
    let buttonLabels = [];
    buttonLabels.push("Nueva colección");
    colecciones.forEach(coleccion => {
      buttonLabels.push(coleccion.nombre);
    });
    const options: ActionSheetOptions = {
      title: '',
      subtitle: '',
      buttonLabels: buttonLabels,
      addCancelButtonWithLabel: "Cancelar",
      androidTheme: 1,
      destructiveButtonLast: true
    };
    this.actionSheet.show(options).then((buttonIndex: number) => {
      if (buttonIndex != 0) {
        let coleccion: any = buttonLabels[buttonIndex];
      } else {
        this.nombrarColeccion();
      }
    });
  }

  agregarToCarrito(producto: any) {
    let productosStorage: any = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
    let productos: any = [];
    productos.push(producto);
    if (productosStorage) {
      productosStorage.forEach(element => {
        productos.push(element);
      });
    }
    producto.carrito = true;
    try {
      this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}`, productos);
    } catch (error) {
      producto.carrito = false;
    }
  }

  nombrarColeccion() {
    let alert = this.alertCtrl.create({
      title: 'Colecciones',
      inputs: [
        {
          name: 'coleccion',
          placeholder: 'Nombra tu coleccion'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {

          }
        }
      ]
    });
    alert.present();
  }

  verCarrito() {
    if (this.productoService.getTotalCarrito() > 0) {
      let nav = this.app.getRootNav();
            //nav.pop();
      nav.push(CarritoComprasPage);
    }
  }

}

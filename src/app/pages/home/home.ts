
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController, Events, App, PopoverController, MenuController } from 'ionic-angular';
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
import { OpcionesMenuPage } from '../opciones-menu/opciones-menu';
import { CategoriaPage } from '../categoria/categoria';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy, OnInit {

  public productos: any = [];
  public promociones: any = [];
  public productosBuscados: any = [];
  public productosCategorias: any = [];
  public productosCategoriasSub: any = [];

  public categorias: Categoria[] = [];
  public proveedores: Proveedor[] = [];
  public secciones: Seccion[] = [];

  public imgBusqueda: any = "/assets/imgs/home/search.png";
  public textoBusqueda: string = "";

  public pruebaImg: string = "assets/imgs/home/images.jpeg";

  private dataFilter: any = {
    idProveedor: null,
    idSeccion: null,
    idCategoria: null,
    nombre: ""
  };

  private objCombos: any = {
    secciones: this.secciones,
    proveedores: this.proveedores,
    categorias: this.categorias
  }

  public env: any = environment;

  public user: User = null;

  public totalCarrito: any = 0;

  constructor(
    public navCtrl: NavController,
    private modalController: ModalController,
    private loadingService: LoadingService,
    private alertCtrl: AlertController,
    private genericService: GenericService,
    private alertaService: AlertaService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private events: Events,
    private actionSheet: ActionSheet,
    private stringUtilsService: StringUtilsService,
    private app: App,
    public popoverCtrl: PopoverController,
    public menuCtrl: MenuController) {
    /**Obtenci{on de usuario en sesión */
      this.menuCtrl.enable(true);
    this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
    console.log("------------------");
    //this.totalCarrito = this.getTotalCarrito();

    this.events.subscribe("totalCarrito", data => {
      try {
        this.totalCarrito = this.getTotalCarrito();
      } catch (error) {
      }
    });

    
  }

  cargaPromociones(){
      this.genericService.sendGetRequest(environment.promociones).subscribe((response: any) => {
        this.promociones = response;
        this.verificarCarrito();
      }, (error: HttpErrorResponse) => {
        this.promociones = null;
      });
  }

  getTotalCarrito() {
    this.genericService.sendGetRequest(environment.carritoCompras).subscribe((response: any) => {
      console.log(response);
      this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}`,response);
      this.totalCarrito = response.length;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.events.unsubscribe("updateProductos");
  }

  ngOnInit() {
    this.cargarProductosPorCategoria();
    this.cargaPromociones();
    //this.cargarProductos();

    //this.cargarProveedores();
    //this.cargarSecciones();
    //this.cargarCategorias();

    this.events.subscribe('updateProductos', data => {
      this.getTotalCarrito();
    });

    this.getTotalCarrito();

    //this.cargarProductosCarrito();
  }

  cargarProductosCarrito(){
    this.genericService.sendGetRequest(environment.carritoCompras).subscribe((response: any) => {
      console.log(response);
      let nav = this.app.getRootNav();
      this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}`,response);
      nav.push(CarritoComprasPage);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  buscando() {
    if (this.textoBusqueda.length > 0) {
      this.imgBusqueda = "/assets/imgs/home/close.png";
    } else {
      this.imgBusqueda = "/assets/imgs/home/search.png";
    }
  }

  close() {
    if (this.imgBusqueda == "/assets/imgs/home/close.png") {
      this.imgBusqueda = "/assets/imgs/home/search.png";
      this.textoBusqueda = "";
    }
  }

  verificarCarrito() {
    if (this.user) {
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
  }

  verificarCarritoModificarCantidad(element: any) {
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
    let bandera: boolean = false;
    if (p.cantidad) {
      p.cantidad++;
    } else if (p.cantidad == 0) {
      p.cantidad = 1;
      bandera = true;
    } else {
      p.cantidad = 1;
      bandera = true;
    }
    this.agregarToCarritoBack(bandera, p);
  }

  agregarToCarritoBack(bandera: boolean, producto: any) {
    let body: any = {
      precio: producto.precio,
      productoId: producto.id
    }
    let service: any = this.genericService.sendPostRequest(environment.carritoCompras, body);

    if (producto.cantidad > 1) {
      body.cantidad = producto.cantidad;
      service = this.genericService.sendPutRequest(environment.carritoCompras, body);
    }

    service.subscribe((response: any) => {
      if (bandera) {
        this.agregarToCarrito(producto);
      }
      this.verificarCarritoModificarCantidad(producto);
    }, (error: HttpErrorResponse) => {
      producto.cantidad--;
    });
  }

  /* decrementar(p: any) {
    p.cantidad--;
    this.borrarToCarritoBack(p);
  } */

  /* borrarToCarritoBack(producto: any) {
    let body: any = {
      precio: producto.precio,
      productoId: producto.id
    }
    body.cantidad = producto.cantidad;
    this.genericService.sendPutRequest(environment.carritoCompras, body).subscribe((response1: any) => {
      this.genericService.sendDeleteRequest(`${environment.carritoCompras}/${producto.id}`).subscribe((response2: any) => {
        if (producto.cantidad == 0) {
          this.productoService.deleteFavorito(producto);
          //this.productosCarrito = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}`);
        }
        this.verificarCarritoModificarCantidad(producto);
      }, (error: HttpErrorResponse) => {
        producto.cantidad++;
      });
    }, (error: HttpErrorResponse) => {
      producto.cantidad++;
    });
  } */
  /* borrarToCarritoBack(producto: any) {
    this.genericService.sendDeleteRequest(`${environment.carritoCompras}/${producto.id}`).subscribe((response: any) => {
      if (producto.cantidad == 0) {
        this.productoService.deleteFavorito(producto);
      }
      this.verificarCarritoModificarCantidad(producto);
    }, (error: HttpErrorResponse) => {
      producto.cantidad++;
    });
  } */



  /**Método para cargar productos en base a especificaciones */
  cargarProductos() {
    console.log("in method");

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

  /**Método para cargar productos en base a especificaciones */
  cargarProductosPorCategoria() {
    console.log("in method");

    this.loadingService.show().then(() => {
      this.genericService.sendGetRequest(`${environment.productosCategoria}/1`).subscribe((response: any) => {
        console.log(response);
        //quitar
        this.productosCategorias = response.productosCategoria;
        for (let index = 1; index < this.productosCategorias.length; index++) {
          const element = this.productosCategorias[index];
          this.productosCategoriasSub.push(element);
        }
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


    this.productosBuscados = [];
    this.genericService.sendGetParams(`${environment.productos}/search`, params).subscribe((response: any) => {
      console.log(response);
      this.productosBuscados = response;
      this.loadingService.hide();
    }, (error: HttpErrorResponse) => {
      this.loadingService.hide();
      let err: any = error.error;
      this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
    });
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
    if (this.genericService.getTotalCarrito() > 0) {
      
      //nav.pop();
      this.cargarProductosCarrito();
      
    }
  }

  verOpciones() {
    let popover = this.popoverCtrl.create(OpcionesMenuPage, {}, { cssClass: "clase-Pop" });
    popover.present({
    });
  }

  irToCategoria(categoria: any) {
    let nav: any = this.app.getRootNav();
    this.navCtrl.push(CategoriaPage, { categoria });
  }

  viewDetail(producto: any) {
    //consumir servicio de imagenes completas
    this.loadingService.show().then(() => {
      this.genericService.sendGetRequest(`${environment.productos}/${producto.id}`).subscribe((response: any) => {
        console.log(response);

        //ERROR SERVICIO NO ACTUALIZA CANTIDAD EN CARRITO
        //let nav = this.app.getRootNav();
        let user: any = this.localStorageEncryptService.getFromLocalStorage("userSession");
        if (user) {
          let carritos = this.localStorageEncryptService.getFromLocalStorage(`${user.id_token}`);
          console.log(carritos);

          if(carritos){
            let position: any = carritos.findIndex(
              (carrito) => {
                return carrito.id == response.id;
              }
            );
  
            if (position >= 0) {
              response.cantidad = carritos[position].cantidad;
            }
          }
        }
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

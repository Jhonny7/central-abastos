import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { LoadingService } from './../../services/loading.service';
import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, PopoverController, MenuController, App } from 'ionic-angular';
import { environment, nuevoBackHabilitado } from '../../../environments/environment.prod';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ArticuloProveedoresPage } from '../articulo-proveedores/articulo-proveedores';
import { OpcionesMenuPage } from '../opciones-menu/opciones-menu';
import { CarritoComprasPage } from '../carrito-compras/carrito-compras';

@Component({
  selector: 'page-recuperar-password',
  templateUrl: 'recuperar-password.html',
})
export class ProveedorPage implements OnDestroy{

  public proveedores: any[] = [];
  public proveedoresReplica: any[] = [];
  public palabra: string = "";
  public totalCarrito: any = 0;
  public env: any = environment;
  public user: any = null;

  public fromMenu:any = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private alertaService: AlertaService,
    private loadingService: LoadingService,
    private events: Events,
    public popoverCtrl: PopoverController,
    public menuCtrl: MenuController,
    private localStorageEncryptService: LocalStorageEncryptService,
    private app: App) {

      this.fromMenu = navParams.get("fromMenu");
    this.cargarProveedores();
    this.menuCtrl.enable(true);
    this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
    this.events.subscribe("reloadUser", data => {
      try {
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
      } catch (error) {
      }
    });
    this.events.subscribe("totalCarrito", data => {
      try {
        if (data) {
          this.totalCarrito = this.getTotalCarrito(data.fromLogin);
        } else {
          this.totalCarrito = this.getTotalCarrito();
        }
      } catch (error) {
      }
    });

    this.events.subscribe("totalCarrito2", data => {
      try {
        if (data) {
          this.totalCarrito = this.getTotalCarrito(data.fromLogin);
        } else {
          this.totalCarrito = this.getTotalCarrito();
        }
      } catch (error) {
        console.log(error);

      }
    });
  }

  ionViewDidEnter(){
    this.events.publish("backHome");
    this.events.publish("backCarrito");
    this.events.publish("backHistorial");
  }

  verCarrito() {
    //if (this.genericService.getTotalCarrito() > 0) {

    //nav.pop();
    this.cargarProductosCarrito();

    //}
  }

  cargarProductosCarrito() {
    let params = new HttpParams();
    params = params.set("email", this.user.email);
    let sus: any = this.genericService.sendGetRequest(environment.carritoCompras);
    if (nuevoBackHabilitado) {
      sus = this.genericService.sendGetParams(`${environment.carritoCompras}`, params);
    }
    sus.subscribe((response: any) => {

      let nav = this.app.getRootNav();
      this.localStorageEncryptService.setToLocalStorage(`${this.user.email}`, response);
      nav.push(CarritoComprasPage);
    }, (error: HttpErrorResponse) => {
      this.alertaService.warnAlertGeneric("Agrega artículos al carrito");
    });


  }

  getTotalCarrito(fromLogin: boolean = false) {
    console.log("-----------------------------------");

    this.genericService.sendGetRequest(environment.carritoCompras).subscribe((response: any) => {

      this.localStorageEncryptService.setToLocalStorage(`${this.user.email}`, response);
      this.totalCarrito = response.length;
      console.log(this.totalCarrito);
      
    }, (error: HttpErrorResponse) => {
    });
  }

  verOpciones() {
    let popover = this.popoverCtrl.create(OpcionesMenuPage, {}, { cssClass: "clase-Pop" });
    popover.present({
    });
  }

  ionViewWillLeave() {
    
  }

  cargarProveedores() {
    this.genericService.sendGetRequest(`${environment.proveedoresFull}`).subscribe((response: any) => {
     
      this.proveedores = response;
      console.log(this.proveedores);
      
      this.proveedoresReplica = response;
    }, (error: HttpErrorResponse) => {
      let err: any = error.error;
      this.proveedores = null;
      this.alertaService.errorAlertGeneric(err.description ? err.description : "Ocurrió un error en el servicio, intenta nuevamente");
    });
  }
  ngOnDestroy() {
    let tabbar:any = document.getElementsByClassName("tabbar");
    if(tabbar[0]){
      tabbar[0].style.display = "flex";
    }
  }
  
  ionViewDidLoad() {
    console.log("--->");
    
    this.events.subscribe('updateProductos', data => {
      this.getTotalCarrito();
    });

    if (this.user) {
      this.getTotalCarrito();
    }

    if(this.fromMenu){
      let tabbar:any = document.getElementsByClassName("tabbar");
      tabbar[0].style.display = "none";
    }
  }

  regresar() {
    let id: any = document.getElementById("icn-2");
    id.style.display = "none";
    this.navCtrl.pop();
  }

  cambio() {

  }

  viewDetailAll(proveedor: any) {
    console.log(proveedor);
    
    //consumir servicio de imagenes completas
    this.loadingService.show().then(() => {
      this.genericService.sendGetRequest(`${environment.proveedorProductos}/proveedor/${proveedor.id}`).subscribe((response: any) => {
        console.log(response);
        
        this.loadingService.hide();
        this.navCtrl.push(ArticuloProveedoresPage, { productos: response, proveedor });
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        let err: any = error.error;
        this.alertaService.errorAlertGeneric(err.description ? err.description : "Ocurrió un error en el servicio, intenta nuevamente");
      });
    });
    //

  }

  buscarPorPalabra() {
    this.proveedores = this.proveedoresReplica;
    this.proveedores = this.proveedores.filter((item: any) => item.nombre.toUpperCase().includes(this.palabra.toUpperCase()));

  }

}

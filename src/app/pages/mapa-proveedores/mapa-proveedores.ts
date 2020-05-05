import { User } from './../../models/User';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { ComparaPreciosProveedorPage } from './../compara-precios-proveedor/compara-precios-proveedor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, Events } from 'ionic-angular';
import { GenericService } from '../../services/generic.service';
import { LoadingService } from '../../services/loading.service';
import { AlertaService } from '../../services/alerta.service';
import { Diagnostic } from '@ionic-native/diagnostic';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
declare var google;
import leaflet from 'leaflet';
import leafletKnn from 'leaflet-knn';
import { ArticuloProveedoresPage } from '../articulo-proveedores/articulo-proveedores';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-mapa-proveedores',
  templateUrl: 'mapa-proveedores.html',
})
export class MapaProveedoresPage {

  public emulado: boolean = environment.emulado;
  public muestraMapa: boolean = false;
  public map: any;

  public id: any = null;

  public proveedoresTotal: any = [];

  public proveedoresGeolocate: any = [];

  //public proveedores: any = [];

  public producto: any = null;

  public geo: any = null;

  public proveedorActivo: any = null;

  public env: any = environment;

  public user: User = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private alertaService: AlertaService,
    private alertCtrl: AlertController,
    private diagnostic: Diagnostic,
    private openNativeSettings: OpenNativeSettings,
    private androidPermissions: AndroidPermissions,
    private platform: Platform,
    private events: Events,
    private auth: AuthService,
    private localStorageEncryptService: LocalStorageEncryptService) {
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    this.proveedoresTotal = navParams.get("proveedores");
    //console.log(this.proveedores);

    this.producto = navParams.get("producto");
    console.log(this.producto);

    this.geo = [];
    this.proveedoresTotal.forEach(proveedorT => {

      //this.proveedores.push(proveedor);
      this.geo.push({
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [proveedorT.proveedor.direccion.latitud, proveedorT.proveedor.direccion.longitud]
        },
        "properties": {
          proveedor: proveedorT
        }
      });
    });

  }

  ionViewDidLoad() {
    let claseTabs: any = document.getElementsByClassName("tabbar");
    claseTabs[0].style.display = "none";
    this.obtenerLocalizacion();
  }

  ionViewWillLeave() {
    let claseTabs: any = document.getElementsByClassName("tabbar");
    claseTabs[0].style.display = "flex";
  }


  /**Método que obtiene la geolocalización del usuario
   * se utiliza al hacer click en el boton de posicionamiento
   */
  obtenerLocalizacion() {
    //this.loadingService.show().then(() => {

    if (this.platform.is("android") && !this.emulado) {
      //debugger;
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
        result => {
          //debugger;
          if (!result.hasPermission) {
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then((resReq) => {
              this.loadingService.hide();
            });
          } else {
            this.diagnostic.isLocationAvailable().then((res: any) => {
              //debugger;
              if (!res) {
                this.loadingService.hide();
                //debugger;
                this.openNativeSettings.open("location").then((res2) => {
                  //debugger;
                  this.loadingService.hide();
                  this.diagnostic.isLocationAvailable().then((res: any) => {
                    //debugger;
                    if (!res) {
                      this.loadingService.hide();
                      //aqui apagar geolocation
                      //this.selecciones.cercaDeMi = false;
                    } else {
                      //debugger;
                      this.getPosition();
                    }
                  });
                });
              } else {
                this.getPosition();
              }
            });
          }
        },
        err => {
          this.loadingService.hide();
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)

        }
      );
    } else if (this.platform.is("ios") && !this.emulado) {
      this.diagnostic.isLocationEnabled().then((resIOS: any) => {
        this.loadingService.hide();
        //alert(JSON.stringify(res));

        if (!resIOS) {
          this.loadingService.hide();
          let alert = this.alertCtrl.create({
            title: `<div class='notificacionError'>
                <div><img class='headerImg' src='assets/imgs/alerts/success.png'/></div>
                <div class='textoTitle'>Para acceder a ésta función necesitas habilitar tu <strong>GPS</strong></div>
                <div>`,
            message: null,
            cssClass: this.genericService.getColorClass(),
            buttons: [

              {
                text: 'Cancelar',
                handler: () => {

                }
              },
              {
                text: 'Aceptar',
                handler: () => {
                  this.openLocate();
                }
              }
            ]
          });
          alert.present();
          alert.onDidDismiss(res => {

          });
        } else {
          this.getPosition();
        }
      });


    } else {
      this.getPosition();
    }
    //});

  }

  /**Metodo que se ejecuta solo en ios para pedir abrir localizacion*/
  openLocate() {
    this.loadingService.hide();
    //debugger;
    this.openNativeSettings.open("locations").then((res2) => {
      //debugger;
      this.diagnostic.isLocationEnabled().then((res: any) => {
        //debugger;
        if (!res) {
          //aqui apagar geolocation
          //this.selecciones.cercaDeMi = false;
        } else {
          //debugger;
          this.getPosition();
        }
      });
    });
  }

  getPosition(): any {
    this.geolocation.getCurrentPosition()
      .then(response => {
        this.loadMap(response);
      })
      .catch(error => {
        console.log(error);
      })
  }

  loadMap(position: Geoposition) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);

    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map_canvas');

    let myLatLng = { lat: latitude, lng: longitude };

    console.log(this.geo);

    var gj = leaflet.geoJson(this.geo);
    var nearest = leafletKnn(gj).nearest([latitude, longitude], 50, 5000);//punto de partida, estaciones máximas a encontrar, diámetro de busqueda en metros
    console.log(nearest);

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });

    this.muestraMapa = true;
    google.maps.event.addListenerOnce(this.map, 'idle', () => {

      nearest.forEach(item => {
        console.log(item);
        this.proveedoresGeolocate.push(item.layer.feature.properties.proveedor);
        let ll = { lat: Number(item.lon), lng: Number(item.lat) };

        let info: any = `
        <div>
          <div style="    text-align: center;
          font-weight: 700;
          font-size: 19px;
      ">${item.layer.feature.properties.proveedor.proveedor.nombre}</div>
          <div style="width:100%; text-align: center">
            <div ><strong>Dirección</strong></div>
            <div >${item.layer.feature.properties.proveedor.proveedor.direccion.direccion}</div>
          </div>
          <div style="width:100%; text-align: center">
            <div ><strong>Empresa</strong></div>
            <div >${item.layer.feature.properties.proveedor.proveedor.empresa.nombre}</div>
          </div>
        </div>`;

        let infowindow: any = new google.maps.InfoWindow({
          content: info
        });

        console.log(ll);

        console.log(item.layer.feature.properties);

        let marker = new google.maps.Marker({
          position: ll,//{ lat: -0.179041, lng: -78.499211 },
          map: this.map,
          title: item.layer.feature.properties.proveedor.proveedor.nombre,
          id: `${item.layer.feature.properties.proveedor.id}`,
          //draggable: true,
          icon: environment.icons['proveedor'].icon
        });

        console.log(marker);


        //this.map.setCenter(marker.position);
        marker.setMap(this.map);

        let componente: any = this;
        marker.addListener('click', () => {
          infowindow.open(this.map, marker);
          componente.changeInfoCard(marker);
        });
      });

      mapEle.classList.add('show-map');
    });
  }

  changeInfoCard(marker: any) {
    let position: any = this.proveedoresTotal.findIndex(
      (carrito) => {
        return carrito.id == marker.id;
      }
    );

    console.log(position);
    this.proveedorActivo = this.proveedoresTotal[position];
    console.log(this.proveedorActivo);

  }

  comparativa() {
    this.navCtrl.push(ComparaPreciosProveedorPage, { proveedoresGeolocate: this.proveedoresGeolocate });
  }

  viewDetailAll(proveedor: any) {
    //consumir servicio de imagenes completas
    this.loadingService.show().then(() => {
      this.genericService.sendGetRequest(`${environment.proveedorProductos}/proveedor/${proveedor.proveedorId}`).subscribe((response: any) => {
        console.log(response);

        this.loadingService.hide();
        this.navCtrl.push(ArticuloProveedoresPage, { productos: response, proveedor });
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        let err: any = error.error;
        this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
      });
    });
    //

  }

  agregarCarrito() {
    this.loadingService.show().then(() => {
      //this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
      if (this.user) {
        let body: any = {
          precio: this.proveedorActivo.precio,
          productoProveedorId: this.proveedorActivo.id,
          cantidad: 1
        }
        this.genericService.sendPostRequest(environment.carritoCompras, body).subscribe((response: any) => {
          body.cantidad = 1;
          this.loadingService.hide();
          this.alertaService.successAlertGeneric("Tu articulo se agregó al carrito con éxito");
          this.events.publish("totalCarrito");
          //this.verificarCarritoModificarCantidad(producto);
        }, (error: HttpErrorResponse) => {
          console.log(error);
          this.alertaService.errorAlertGeneric(error.error.title);
          this.loadingService.hide();
        });
      } else {
        this.auth.events.publish("startSession");
      }
    });
  }


}



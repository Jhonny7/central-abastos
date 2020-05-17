import { AlertaService } from './../../services/alerta.service';
import { LoadingService } from './../../services/loading.service';
import { GenericService } from './../../services/generic.service';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, Events, ViewController, PopoverController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';

import leaflet from 'leaflet';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { DireccionesPage } from '../direcciones/direcciones';


declare var google;
@Component({
  selector: 'page-home-geo-proveedores',
  templateUrl: 'home-geo-proveedores.html',
})
export class HomeGeoProveedoresPage implements OnDestroy{

  public map: any;

  public marker: any;

  public mapa: any;

  public autocomplete: any;

  public emulado: boolean = environment.emulado;

  public componentForm: any = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  public data: any = {};

  public muestraMapa: boolean = false;

  public tipoDirecciones: any = [];

  public direccion: any = null;

  public edit: boolean = false;

  public fromModal: any = null;

  public fromRegister: any = null;
  
  public listaDirecciones: any = [];

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
    private viewCtrl: ViewController,
    private popoverCtrl: PopoverController) {
    this.direccion = navParams.get("direccion");
    this.fromModal = navParams.get("fromModal");
    this.fromRegister = navParams.get("fromRegister");
    if (this.direccion) {
      this.edit = true;
      /*
              codigoPostal: "89670"
              direccion: "Ocampo 508, Zona Centro, Aldama, Tamaulipas, México"
              latitud: "22.9221196"
              longitud: "-98.0690771"
              */
      this.data.codigoPostal = this.direccion.direccion.codigoPostal;
      this.data.direccion = this.direccion.direccion.direccion;
      this.data.latitud = this.direccion.direccion.latitud;
      this.data.longitud = this.direccion.direccion.longitud;

    }

    this.cargarTipoDirecciones();

    if (this.fromModal && !this.fromRegister) {
      this.cargarDireccionesLista();
    }
  }

  /**Método para cerrar el modal, sin embargo
   * se envían de vuelta los filtros para manipularlos en la búsqueda
   */
  dismiss() {
    this.viewCtrl.dismiss({});
  }

  cargarDireccionesLista() {
    this.genericService.sendGetRequest(environment.direcciones).subscribe((response: any) => {
      this.listaDirecciones = response;
    }, (error: HttpErrorResponse) => {
      let err: any = error.error;
      this.listaDirecciones = [];
      //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
    });
  }

  selectFrecuente() {
    let popover = this.popoverCtrl.create(DireccionesPage, { fromPop: true }, { cssClass: "clase-Pop-direcciones" });
    popover.present({
    });
    popover.onDidDismiss((data) => {
      if (data) {
        if (data != null) {
          /*
              codigoPostal: "89670"
              direccion: "Ocampo 508, Zona Centro, Aldama, Tamaulipas, México"
              latitud: "22.9221196"
              longitud: "-98.0690771"
              */
          this.data.codigoPostal = data.direccion.direccion.codigoPostal;
          this.data.direccion = data.direccion.direccion.direccion;
          this.data.latitud = data.direccion.direccion.latitud;
          this.data.longitud = data.direccion.direccion.longitud;
          this.data.id = data.direccion.direccion.id;
          this.viewCtrl.dismiss({ data: this.data });
        }
      }
    });
  }

  cargarTipoDirecciones() {
    this.genericService.sendGetRequest(environment.tipoDirecciones).subscribe((response: any) => {
      this.tipoDirecciones = response;

    }, (error: HttpErrorResponse) => {
    });
  }

  ionViewDidLoad() {
    let claseTabs: any = document.getElementsByClassName("tabbar");
    if(claseTabs[0]){
      claseTabs[0].style.display = "none";
    }
    this.obtenerLocalizacion();
    let as: any = document.getElementById('autocomplete');


    this.autocomplete = new google.maps.places.Autocomplete(
      as, { types: ['geocode'] });

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(['address_component', 'geometry', 'name']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    let componente: any = this;
    this.autocomplete.addListener('place_changed', function () {
      componente.fillInAddress(componente);
    });

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
            this.navCtrl.pop();
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

  ngOnDestroy() {
    let claseTabs: any = document.getElementsByClassName("tabbar");
    if(claseTabs[0]){
      claseTabs[0].style.display = "flex";
    }
  }

  getPosition(): any {
    this.geolocation.getCurrentPosition()
      .then(response => {
        this.loadMap(response);
      })
      .catch(error => {
      })
  }

  loadMap(position: Geoposition) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map_canvas');

    // create LatLng object
    if (this.edit) {

      latitude = Number(this.direccion.direccion.latitud);
      longitude = Number(this.direccion.direccion.longitud);
    }
    let myLatLng = { lat: latitude, lng: longitude };

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });

    this.muestraMapa = true;
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
        draggable: true,
        icon: environment.icons['casa'].icon
      });

      this.data.latitud = latitude;
      this.data.longitud = longitude;
      let params = new HttpParams()
      params = params.set('latlng', `${this.data.latitud},${this.data.longitud}`);
      params = params.set('key', environment.keyGoogle);


      this.genericService.sendGetParams(`${environment.geocodeGoogle}`, params).subscribe((response: any) => {
       
        this.loadingService.hide();
        this.map.setCenter(this.marker.position);
        this.marker.setMap(this.map);

        let results: any = response.results;
        if (results) {
          /*
          codigoPostal: "89670"
          direccion: "Ocampo 508, Zona Centro, Aldama, Tamaulipas, México"
          latitud: "22.9221196"
          longitud: "-98.0690771"
          */
          this.data.direccion = results[0].formatted_address;
          this.data.codigoPostal = "";
        }
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        this.marker.setPosition(myLatLng);

        this.map.setCenter(myLatLng);
        this.marker.setMap(this.map);


        this.alertaService.errorAlertGeneric("No se obtuvo información del marcador, intenta nuevamente");
      });

      component.marker.addListener('click', () => {
        //infowindow.open(this.map, this.marker);
        //component.changeInfoCard();
      });

      google.maps.event.addListener(component.marker, 'dragend', function (evt) {
       
        component.data.latitud = evt.latLng.lat().toString();
        component.data.longitud = evt.latLng.lng().toString();


        component.loadingService.show().then(() => {
          let params = new HttpParams()
          params = params.set('latlng', `${component.data.latitud},${component.data.longitud}`);
          params = params.set('key', environment.keyGoogle);

          component.genericService.sendGetParams(`${environment.geocodeGoogle}`, params).subscribe((response: any) => {
           
            component.loadingService.hide();
            component.map.setCenter(component.marker.position);
            component.marker.setMap(component.map);

            let results: any = response.results;
            if (results) {
              /*
              codigoPostal: "89670"
              direccion: "Ocampo 508, Zona Centro, Aldama, Tamaulipas, México"
              latitud: "22.9221196"
              longitud: "-98.0690771"
              */
              component.data.direccion = results[0].formatted_address;
              component.data.codigoPostal = "";
            }
          }, (error: HttpErrorResponse) => {
            component.loadingService.hide();
            component.marker.setPosition(myLatLng);

            component.map.setCenter(myLatLng);
            component.marker.setMap(component.map);


            component.alertaService.errorAlertGeneric("No se obtuvo información del marcador, intenta nuevamente");
          });
        });

        //'<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
      });

      /* marker.addEventListener("click", (e: Event) => {
        
      }); */

      mapEle.classList.add('show-map');
    });
  }

  changeInfoCard() {
    
  }

  loadMapLeaflet() {
    this.mapa = leaflet.map(`map`).setView([40.7127837, -74.0059413], 18);

    //let contributions
    // set map tiles source
    //leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    leaflet.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
      attribution: 'Central de Abastos &copy; <a href="https://www.sharkit.com/">Shark IT</a>',
      maxZoom: 20,
      zoom: 14
    }).addTo(this.mapa);

    let contributions: any = document.getElementsByClassName("leaflet-control-attribution");
    contributions[0].removeChild(contributions[0].childNodes[0]);

    this.mapa.locate({
      setView: true,
      maxZoom: 20,
      zoom: 14
    }).on('locationfound', (e) => {
      // add marker to the map
      var greenIcon = leaflet.icon({
        iconUrl: 'assets/images/marker.png',
        //shadowUrl: 'assets/images/marker.png',

        iconSize: [38, 38], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      });

      let marker = leaflet.marker([40.7127837, -74.0059413], { icon: greenIcon }).addTo(this.mapa);
      // add popup to the marker  
      var infoWindowContent = `<div class="contenedor">
                                  <div class="img">
                                    <img src="assets/imgs/home/basket.png" alt="">
                                  </div>
                                  <div class="titulo">Titulo de proveedor</div>
                                </div>`;
      marker.bindPopup(infoWindowContent).openPopup();
    }).on('locationerror', (err) => {
      //this.alertaService.errorAlert(this.alertaService.mensajeError, this.translatePipe.instant("ENABLED-GEOLOCATION"), null);
    })
  }

  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };


        var circle = new google.maps.Circle(
          { center: geolocation, radius: position.coords.accuracy });
        this.autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  getData() {
    return this.data;
  }

  cleanData() {
    this.data = {};
  }

  backData() {
    
    this.viewCtrl.dismiss({ data: this.data });
  }

  guardar(body: any) {
    if (!this.edit) {
      this.loadingService.show().then(() => {
        this.genericService.sendPostRequest(environment.direcciones, body).subscribe((response: any) => {

          this.loadingService.hide();
          this.events.publish("direction", { body, create: true });
          if (!this.fromModal) {
            this.alertaService.successAlertGeneric("Dirección agregada con éxito");
            this.navCtrl.pop();
          } else {
            this.viewCtrl.dismiss({ data: this.data });
          }
        }, (error: HttpErrorResponse) => {
          this.loadingService.hide();
          this.alertaService.errorAlertGeneric("No se ha podido agregar tu dirección frecuente, intenta nuevamente");
        });
      });
    } else {
      this.loadingService.show().then(() => {
        this.genericService.sendPutRequest(environment.direcciones, body).subscribe((response: any) => {
          this.alertaService.successAlertGeneric("Dirección modificada con éxito");
          this.loadingService.hide();
          this.events.publish("direction", { body, create: false });
          this.navCtrl.pop();
        }, (error: HttpErrorResponse) => {
          this.loadingService.hide();
          this.alertaService.errorAlertGeneric("No se ha podido modificar tu dirección frecuente, intenta nuevamente");
        });
      });
    }
  }

  fillInAddress(componente: any) {

    // Get the place details from the autocomplete object.
    var place = componente.autocomplete.getPlace();

    var lat = place.geometry.location.lat(),
      lng = place.geometry.location.lng();
    componente.cleanData();
    componente.marker.position = place.geometry.location;

    var latlng = new google.maps.LatLng(lat, lng);
    componente.marker.setPosition(latlng);


    componente.map.setCenter(place.geometry.location);

    componente.marker.setMap(componente.map);

    componente.getData().latitud = lat ? lat.toString() : "";
    componente.getData().longitud = lng ? lng.toString() : "";


    let completa: any = document.getElementById("autocomplete");
    componente.getData().direccion = completa ? completa.value.toString() : "";

    for (var component in componente.componentForm) {
      let a: any = document.getElementById(component);
      if (a) {
        a.value = '';
      }
      let b: any = document.getElementById(component);
      if (b) {
        b.disabled = false;
      }
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    if (place) {
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        
        if (componente.componentForm[addressType]) {
          var val = place.address_components[i][componente.componentForm[addressType]];

          switch (addressType) {
            case "postal_code":
              componente.getData().codigoPostal = val ? val.toString() : "";
              break;

            default:
              break;
          }
          let c: any = document.getElementById(addressType);
          if (c) {
            c.value = val;
          }
        }
      }
    }

  }

  addToList() {
    let buttons: any = [
      {
        text: "Agregar",
        handler: (data: any) => {
          let input: any = document.getElementById("input-name");
          let selectDireccion: any = document.getElementById("select-direccion");

          if (input.value.length <= 0) {
            this.alertaService.warnAlertGeneric("Por favor ingresa un nombre a tu dirección");
          } else {
            let body: any = {
              alias: input.value,
              direccion: {
                codigoPostal: "",
                direccion: "",
                latitud: "",
                longitud: ""
              },
              tipodireccionId: selectDireccion.value
            };

            if (this.edit) {
              body.direccionId = this.direccion.direccionId;
              body.id = this.direccion.id;
            }
            /*
            codigoPostal: "89670"
            direccion: "Ocampo 508, Zona Centro, Aldama, Tamaulipas, México"
            latitud: "22.9221196"
            longitud: "-98.0690771"
            */
            body.direccion.codigoPostal = this.data.codigoPostal ? this.data.codigoPostal : "";
            body.direccion.direccion = this.data.direccion ? this.data.direccion : "";
            body.direccion.latitud = this.data.latitud ? this.data.latitud : "";
            body.direccion.longitud = this.data.longitud ? this.data.longitud : "";

            this.guardar(body);

          }
        }
      }
    ];
    let data: any = {
      title: "Mi dirección frecuente",
      message: `Ingresa un alias y selecciona el tipo de dirección`,

    }

    let alert = this.alertCtrl.create({
      title: data.title,
      cssClass: this.genericService.getColorClass(),
      message: data.message,
      inputs: data.inputs,
      buttons: buttons
    });
    alert.present().then((res) => {
      let a: any = document.getElementsByClassName("alert-message");


      let div2 = document.createElement("div");
      div2.id = `div-name-2`;

      let input: any = `<input placeholder="Ingresa el nombre" id="input-name"></input>`;
      div2.innerHTML = input;

      div2.setAttribute("class", "clase-select animated fadeIn");

      a[0].appendChild(div2);

      let div = document.createElement("div");
      div.id = `div-name-1`;

      let select: any = "<select id='select-direccion'>";
      this.tipoDirecciones.forEach(element => {
        select += `<option value="${element.id}">${element.nombre}</option>`;
      });
      select += "</select>"
      div.innerHTML = select;

      div.setAttribute("class", "clase-select animated fadeIn");

      a[0].appendChild(div);

      if (this.edit) {
        let input: any = document.getElementById("input-name");
        let selectDireccion: any = document.getElementById("select-direccion");
        input.value = this.direccion.alias;
        selectDireccion.value = this.direccion.tipodireccionId;
      }


    });
  }
}

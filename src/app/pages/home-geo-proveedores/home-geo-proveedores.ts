import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import leaflet from 'leaflet';

@Component({
  selector: 'page-home-geo-proveedores',
  templateUrl: 'home-geo-proveedores.html',
})
export class HomeGeoProveedoresPage {

  map: GoogleMap;

  public mapa: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadMapLeaflet();
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

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // Now you can use all methods safely.
        this.getPosition();
      })
      .catch(error => {
        console.log(error);
      });

  }

  getPosition(): void {
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
        this.map.addMarker({
          title: `<div class="contenedor">
                  <div class="img">
                    <img src="assets/imgs/home/basket.png" alt="">
                  </div>
                  <div class="titulo">Titulo de proveedor</div>
                </div>`,
          icon: 'blue',
          animation: 'DROP',
          position: response.latLng
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

}

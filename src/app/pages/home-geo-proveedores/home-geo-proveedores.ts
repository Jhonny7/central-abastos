import { GenericService } from './../../services/generic.service';
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

import { Geolocation, Geoposition } from '@ionic-native/geolocation';

import leaflet from 'leaflet';
import { environment } from '../../../environments/environment.prod';

declare var google;
@Component({
  selector: 'page-home-geo-proveedores',
  templateUrl: 'home-geo-proveedores.html',
})
export class HomeGeoProveedoresPage {

  public map: any;
  public mapa: any;

  public autocomplete: any;

  public componentForm: any = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  public muestraMapa:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private genericService: GenericService) {
  }

  ionViewDidLoad() {
    let claseTabs:any = document.getElementsByClassName("tabbar");
    claseTabs[0].style.display = "none";
    this.getPosition();
    
  }

  ionViewWillLeave(){
    let claseTabs:any = document.getElementsByClassName("tabbar");
    claseTabs[0].style.display = "flex";
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

    // create LatLng object
    let myLatLng = { lat: latitude, lng: longitude };

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });

    this.muestraMapa = true;

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), { types: ['geocode'] });

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(['address_component']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    let componente:any = this;
    this.autocomplete.addListener('place_changed', this.fillInAddress(componente));
    google.maps.event.addListenerOnce(this.map, 'idle', () => {

      let info: any = `<div>Ejemplo de window</div>`;

      let infowindow: any = new google.maps.InfoWindow({
        content: info
      });
      let component: any = this;

      let marker = new google.maps.Marker({
        position: myLatLng,//{ lat: -0.179041, lng: -78.499211 },
        map: this.map,
        title: 'Hello World!',
        id: "marcador-1",
        draggable: true,
        icon: environment.icons['casa'].icon
      });

      marker.addListener('click', () => {
        infowindow.open(this.map, marker);
        component.changeInfoCard();
      });

      google.maps.event.addListener(marker, 'dragend', function (evt) {
        console.log(evt.latLng.lat());
        console.log(evt.latLng.lng());
        component.map.setCenter(marker.position);
        marker.setMap(component.map);
        //'<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
      });

      /* marker.addEventListener("click", (e: Event) => {
        console.log("---->");
        
      }); */

      mapEle.classList.add('show-map');
    });
  }

  changeInfoCard() {
    console.log("Hola mundo 1");

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

  fillInAddress(componente:any) {
    // Get the place details from the autocomplete object.
    var place = componente.autocomplete.getPlace();

    for (var component in componente.componentForm) {
      let a: any = document.getElementById(component);
      a.value = '';
      let b: any = document.getElementById(component);
      b.disabled = false;
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componente.componentForm[addressType]) {
        var val = place.address_components[i][componente.componentForm[addressType]];
        let c: any = document.getElementById(addressType);
        c.value = val;
      }
    }
  }
}

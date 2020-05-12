import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-calificacion',
  templateUrl: 'calificacion.html',
})
export class CalificacionPage {

  public calificacionActual: string = "Excelente";

  public stars: any[] = [];

  public queja: string = "";

  public nombre: string = "Juan López Sarrelangue";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService) {
    this.stars.push({
      selected: true,
      id: 1
    });
    this.stars.push({
      selected: true,
      id: 2
    });
    this.stars.push({
      selected: true,
      id: 3
    });
    this.stars.push({
      selected: true,
      id: 4
    });
    this.stars.push({
      selected: true,
      id: 5
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalificacionPage');
  }

  selecciona(star: any) {
    this.stars.forEach(element => {
      element.selected = false;
    });

    for (let index = 0; index < this.stars.length; index++) {
      const element = this.stars[index];
      if (element.id <= star.id) {
        element.selected = true;
      }
    }

    switch (star.id) {
      case 1:
        this.calificacionActual = "Pésimo";
        break;
      case 2:
        this.calificacionActual = "Malo";
        break;
      case 3:
        this.calificacionActual = "Regular";
        break;
      case 4:
        this.calificacionActual = "Bueno";
        break;
      case 5:
        this.calificacionActual = "Excelente";
        break;
    }
  }
}

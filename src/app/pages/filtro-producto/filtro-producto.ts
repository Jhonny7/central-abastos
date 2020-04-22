import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-filtro-producto',
  templateUrl: 'filtro-producto.html',
})
export class FiltroProductoPage {

  public filtros: any = null;

  public selectOptions: any = {
    cssClass: 'action-sheet-class'
  };

  
  public articulos:any = null;
  public categorias:any = null;
  public secciones:any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private events: Events) {
    this.filtros = navParams.get('dataFilter');
    this.events.subscribe('closedAlerts', data => {
      try {
        this.viewCtrl.dismiss();
      } catch (error) {
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltroProductoPage');
  }

  /**Método para cerrar el modal, sin embargo
   * se envían de vuelta los filtros para manipularlos en la búsqueda
   */
  dismiss() {
    this.viewCtrl.dismiss({data:this.filtros});
  }

  /**
   * Método que cambia el valor del checkbox seleccionado
   */
  evaluateAttribute(atributo:boolean){
    atributo = !atributo; 
  }

}

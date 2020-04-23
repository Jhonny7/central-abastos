import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-filtro-producto',
  templateUrl: 'filtro-producto.html',
})
export class FiltroProductoPage {

  public filtros: any = {};

  public selectOptions: any = {
    cssClass: 'action-sheet-class'
  };



  
  public proveedores:any = null;
  public categorias:any = null;
  public secciones:any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private events: Events) {
    this.filtros = navParams.get('dataFilter');
    
    let objCombos:any = navParams.get('objCombos');
    if(objCombos){
      this.secciones = objCombos.secciones;
      this.proveedores = objCombos.proveedores;
      this.categorias = objCombos.categorias;
    }
    this.events.subscribe('closedAlerts', data => {
      try {
        this.viewCtrl.dismiss();
      } catch (error) {
      }
    });
  }

  ionViewDidLoad() {
    this.filtros.cambio = 0;
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

  change(){
    this.filtros.cambio++;
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detalle-producto',
  templateUrl: 'detalle-producto.html',
})
export class DetalleProductoPage {

  public producto:any = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.producto = navParams.get("producto");
      console.log(this.producto);
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleProductoPage');
  }

  regresar(){
    let id:any = document.getElementById("icn-p");
    id.style.display = "none";
    this.navCtrl.pop();
  }

}

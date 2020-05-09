import { GenericService } from './../../services/generic.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html',
})
export class QrPage {

  public qrCode: any = "aaaa";
  public pedido:any = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private genericService: GenericService) {
      this.pedido = navParams.get("pedido");
      this.qrCode = this.pedido.folio;
  }

  ionViewDidLoad() {
    console.log(this.qrCode);
    
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GenericService } from '../../services/generic.service';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { AlertaService } from '../../services/alerta.service';

@Component({
  selector: 'page-problemas-pedido',
  templateUrl: 'problemas-pedido.html',
})
export class ProblemasPedidoPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private genericService: GenericService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private alertaService: AlertaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProblemasPedidoPage');
  }

}

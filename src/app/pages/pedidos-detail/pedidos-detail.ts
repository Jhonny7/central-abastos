import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GenericService } from '../../services/generic.service';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { AlertaService } from '../../services/alerta.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'page-pedidos-detail',
  templateUrl: 'pedidos-detail.html',
})
export class PedidosDetailPage {

  public detalle:any = null;
  public id:any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private alertaService: AlertaService,
    private loadingService: LoadingService
  ) {
    this.detalle = navParams.get("detalle");
    this.id = navParams.get("id");
  }

  ionViewDidLoad() {
  }

}

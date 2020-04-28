import { LoadingService } from './../../services/loading.service';
import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App } from 'ionic-angular';
import { DetalleTarjetaPage } from '../detalle-tarjeta/detalle-tarjeta';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-tarjetas-frecuentes',
  templateUrl: 'tarjetas-frecuentes.html',
})
export class TarjetasFrecuentesPage implements OnDestroy {

  public cards: any = null;
  public user: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localStorageEncryptService: LocalStorageEncryptService,
    private events: Events,
    private app: App,
    private genericService: GenericService,
    private alertaService: AlertaService,
    private loadingService: LoadingService) {
    this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);

    this.events.subscribe('card', data => {
      console.log(data);

      if (!data.create) {
        let position = this.cards.findIndex(
          (img) => {
            return img.id == data.response.id;
          }
        );
        for (let index = 0; index < this.cards.length; index++) {
          const element = this.cards[index];
          if (element.id == data.response.id) {
            position = index;
          }
        }
        this.cards[position] = data.response;
      } else {
        this.cards.push(data.response);
      }
      //this.cards = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}-cards`);
    });

    this.events.subscribe('actualizarTarjetas', data => {
      this.getCards();
    });
  }

  getCards() {
    this.genericService.sendGetRequest(environment.tarjetas).subscribe((response: any) => {
      console.log(response);
      //quitar
      this.cards = response;
      if (this.cards.length <= 0) {
        this.alertaService.warnAlertGeneric("Aún no cuentas con tarjetas frecuentes");
      }
    }, (error: HttpErrorResponse) => {
      let err: any = error.error;
      this.cards = null;
      //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
    });
  }

  ngOnDestroy() {
    this.events.unsubscribe("card");
  }

  ionViewDidLoad() {
    this.getCards();
  }

  addCard(card: any = null) {
    let nav: any = this.app.getRootNav();
    let position: any;
    if (this.cards && card) {
      position = this.cards.findIndex(
        (img) => {
          return img.id == card.id;
        }
      );
    } else {
      position = -1;
    }
    console.log(position);

    nav.push(DetalleTarjetaPage, { card, position, cards: this.cards, edit: card ? true : false });
  }

  borrar(item: any) {
    let position: any = this.cards.findIndex(
      (img) => {
        return img.id == item.id;
      }
    );

    this.loadingService.show().then(() => {
      this.genericService.sendDelete(`${environment.tarjetas}/${item.id}`).subscribe((response: any) => {
        this.cards = [...this.cards.slice(0, position), ...this.cards.slice(position + 1)];
        this.loadingService.hide();
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        this.alertaService.errorAlertGeneric("No se ha podido eliminar tu tarjeta, intenta nuevamente");
      });
    });

  }
}

import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';
import { ChatService } from '../../services/chat.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  public chat: any = null;

  public pedido: any = null;

  public user: any = null;

  public color: any = "#3b64c0";

  public mensaje: string = "";

  public toggled: boolean = false;
  public emojitext: string;


  public env: any = environment;

  public intervalo: any = null;


  @ViewChild(Content) content: Content;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localStorageEncryptService: LocalStorageEncryptService,
    private events: Events,
    private genericService: GenericService,
    private chatService: ChatService,
    private alertaService: AlertaService) {
    this.chat = navParams.get("chat");
    this.pedido = navParams.get("pedido");

    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");

    if (this.localStorageEncryptService.getFromLocalStorage("theme")) {
      this.color = this.localStorageEncryptService.getFromLocalStorage("theme");
    }
    this.events.subscribe("changeColor", data => {
      try {
        if (this.localStorageEncryptService.getFromLocalStorage("theme")) {
          this.color = this.localStorageEncryptService.getFromLocalStorage("theme");
        }
      } catch (error) {
      }
    });
  }

  handleSelection(event) {
    this.mensaje = this.mensaje + " " + event.char;
  }

  ionViewDidLoad() {
    this.chatService.connect();

    this.chatService.receive().subscribe(message => {
    });

    let claseTabs: any = document.getElementsByClassName("tabbar");
    claseTabs[0].style.display = "none";

    this.intervalo = setInterval(() => {
      this.verChat();
    }, 2000);
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
  }


  ionViewWillLeave() {
    let claseTabs: any = document.getElementsByClassName("tabbar");
    claseTabs[0].style.display = "flex";
    clearInterval(this.intervalo);
    this.intervalo = null;
  }

  verChat() {
    switch (environment.perfil.activo) {
      case 1:
        this.genericService.sendGetRequest(`${environment.chats}/${this.chat.id}`).subscribe((response: any) => {
          this.chat = response;
        }, (error: HttpErrorResponse) => {
          let err: any = error.error;
          //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
        break;

      case 2:
        this.genericService.sendGetRequest(`${environment.chatsProveedor}${this.pedido.pedidoProveedores[0].id}/tipoChat/1`).subscribe((response: any) => {
          this.chat = response;
        }, (error: HttpErrorResponse) => {
          let err: any = error.error;
          //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
        break;
      case 3:
        this.genericService.sendGetRequest(`${environment.chatsProveedor}${this.pedido.pedidoProveedores[0].id}/tipoChat/2`).subscribe((response: any) => {
          this.chat = response;
        }, (error: HttpErrorResponse) => {
          let err: any = error.error;
          //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
        break;
    }
  }

  sendMessage() {
    if (this.mensaje.length === 0) {
      return;
    }

    //this.chatService.sendMessage(this.mensaje);
    let body: any = {
      chatId: this.chat.id,
      from: this.user.username,

      text: this.mensaje.toString()
    };

    if (environment.perfil.activo == 1) {
      body.to = `${this.chat.chatDetalles[0].usuarioEmisorLogin}`;
    } else if (environment.perfil.activo == 2) {
      body.to = `${this.pedido.cliente.login}`;
    }

    this.genericService.sendPostRequest(`${environment.chats}/messages`, body).subscribe((response: any) => {
      this.chat.chatDetalles.push(response);
      let dimensions = this.content.getContentDimensions();
      this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
      this.mensaje = '';
    }, (error: HttpErrorResponse) => {
      this.alertaService.errorAlertGeneric("No se ha podido enviar tu mensaje, intenta nuevamente");
    });

  }

}

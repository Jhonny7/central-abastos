import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';
import { ChatService } from '../../services/chat.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage implements OnDestroy {

  public chat: any = null;

  public pedido: any = null;

  public user: any = null;

  public color: any = "#3b64c0";

  public mensaje: string = "";

  public toggled: boolean = false;
  public emojitext: string;


  public env: any = environment;

  public intervalo: any = null;

  public activoChat:boolean = false;

  @ViewChild(Content) content: Content;

  public subscription: any = null;

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
    this.localStorageEncryptService.setToLocalStorage("pedidoChat", this.pedido.id);
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


    this.events.subscribe("updateChat", data => {
      try {
        this.verChat();
      } catch (error) {
      }
    });
  }

  ngOnDestroy() {
    this.events.unsubscribe("updateChat");
    let claseTabs: any = document.getElementsByClassName("tabbar");
    claseTabs[0].style.display = "flex";
    clearInterval(this.intervalo);
    this.intervalo = null;
    this.localStorageEncryptService.clearProperty("pedidoChat");
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
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);

    this.intervalo = setInterval(() => {
      this.verChat();
    }, 2000);
  }


  verChat() {
    switch (environment.perfil.activo) {
      case 1:
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
        this.subscription = this.genericService.sendGetRequest(`${environment.chats}/${this.chat.id}`).subscribe((response: any) => {
          if (this.chat.chatDetalles.length < response.chatDetalles) {
            let dimensions = this.content.getContentDimensions();
            this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
          }
          this.chat = response;

        }, (error: HttpErrorResponse) => {
          let err: any = error.error;
          //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
        break;

      case 2:
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
        this.subscription = this.genericService.sendGetRequest(`${environment.chatsProveedor}${this.pedido.pedidoProveedores[0].id}/tipoChat/1`).subscribe((response: any) => {
          if (this.chat.chatDetalles.length < response.chatDetalles) {
            let dimensions = this.content.getContentDimensions();
            this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
          }
          this.chat = response;
        }, (error: HttpErrorResponse) => {
          let err: any = error.error;
          //this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
        });
        break;
      case 3:
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
        this.subscription = this.genericService.sendGetRequest(`${environment.chatsProveedor}${this.pedido.pedidoProveedores[0].id}/tipoChat/2`).subscribe((response: any) => {
          if (this.chat.chatDetalles.length < response.chatDetalles) {
            let dimensions = this.content.getContentDimensions();
            this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
          }
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

   if(!this.activoChat){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.activoChat = true;
    this.subscription = this.genericService.sendPostRequest(`${environment.chats}/messages`, body).subscribe((response: any) => {
      this.chat.chatDetalles.push(response);
      let dimensions = this.content.getContentDimensions();
      this.content.scrollTo(0, dimensions.scrollHeight + 100, 100);
      this.mensaje = '';
      this.activoChat = false;
    }, (error: HttpErrorResponse) => {
      this.activoChat = false;
      this.alertaService.errorAlertGeneric("No se ha podido enviar tu mensaje, intenta nuevamente");
    });
   }

  }

}

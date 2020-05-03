import { GenericService } from './../../services/generic.service';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  public chat: any = {};

  public color: any = "#3b64c0";

  public mensaje: string = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localStorageEncryptService: LocalStorageEncryptService,
    private events: Events,
    private genericService: GenericService,
    private chatService: ChatService) {

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

  ionViewDidLoad() {
    this.chatService.connect();

    this.chatService.receive().subscribe(message => {
      console.log(message);

    });
  }

  sendMessage() {
    if (this.mensaje.length === 0) {
      return;
    }

    this.chatService.sendMessage(this.mensaje);
    this.mensaje = '';
  }

}

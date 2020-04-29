import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  public chat:any = {};

  public color: any = "#3b64c0";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private localStorageEncryptService: LocalStorageEncryptService,
    private events:Events) {

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
    console.log('ionViewDidLoad ChatPage');
  }

}

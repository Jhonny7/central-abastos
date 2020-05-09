import { LocalStorageEncryptService } from './local-storage-encrypt.service';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { Location } from '@angular/common';


import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import { User } from '../models/User';
import { environment, pathPrincipal, pathChat } from '../../environments/environment.prod';

@Injectable()
export class ChatService {
  stompClient = null;
  subscriber = null;
  connection: Promise<any>;
  connectedPromise: any;
  listener: Observable<any>;
  listenerObserver: Observer<any>;
  alreadyConnectedOnce = false;
  private subscription: Subscription;

  public user: User = null;
  constructor(
    private location: Location,
    private localStorageEncryptService: LocalStorageEncryptService
  ) {
    this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
    this.connection = this.createConnection();
    this.listener = this.createListener();
  }

  connect() {
    if (this.connectedPromise === null) {
      this.connection = this.createConnection();
    }
    // building absolute path so that websocket doesn't fail when deploying with a context path
    let url = 'websocket/chat';
    
    let urlComplete:any = `${pathChat}${url}`;
    const authToken = this.user.id_token;
    if (authToken) {
      url += '?access_token=' + authToken;
    }
    
    const socket = new SockJS(urlComplete);
    this.stompClient = Stomp.over(socket);
    const headers = {};
    this.stompClient.connect(headers, () => {
      this.connectedPromise('success');
      this.connectedPromise = null;
      this.subscribe();
      if (!this.alreadyConnectedOnce) {
        this.alreadyConnectedOnce = true;
      }
    });
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
      this.stompClient = null;
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.alreadyConnectedOnce = false;
  }

  receive() {
    return this.listener;
  }

  sendMessage(message) {
    if (this.stompClient !== null && this.stompClient.connected) {
      this.stompClient.send(
        '/chat', // destination
        JSON.stringify({ message }), // body
        {} // header
      );
    }
  }

  subscribe() {
    this.connection.then(() => {
      this.subscriber = this.stompClient.subscribe('/chat/public', data => {
        this.listenerObserver.next(JSON.parse(data.body));
      });
    });
  }

  unsubscribe() {
    if (this.subscriber !== null) {
      this.subscriber.unsubscribe();
    }
    this.listener = this.createListener();
  }

  private createListener(): Observable<any> {
    return new Observable(observer => {
      this.listenerObserver = observer;
    });
  }

  private createConnection(): Promise<any> {
    return new Promise((resolve, reject) => (this.connectedPromise = resolve));
  }
}

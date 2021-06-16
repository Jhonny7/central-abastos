import { CalificacionPage } from "../pages/calificacion/calificacion";
import { AlertaService } from "./alerta.service";
import { LocalStorageEncryptService } from "./local-storage-encrypt.service";
import { GenericService } from "./generic.service";
import { LoadingService } from "./loading.service";
import { Injectable } from "@angular/core";
import {
  LoadingController,
  AlertController,
  Events,
  App,
  Nav
} from "ionic-angular";
import {
  environment,
  nuevoBackHabilitado
} from "../../environments/environment.prod";
import { HistorialPedidosDetailPage } from "../pages/historial-pedidos-detail/historial-pedidos-detail";
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { ChatPage } from "../pages/chat/chat";
import { ListaChatPage } from "../pages/lista-chat/lista-chat";

export interface FCMJson {
  to: string;
  notification: Notification;
  data: FCMData;
  priority: string;
}

export interface Notification {
  body: string;
  title: string;
  click_action: string;
  image: string;
  color: string;
  "content-available": boolean;
}

export interface FCMData {
  body: string;
  title: string;
  view: number;
  otherData?: any;
}

@Injectable()
export class PushNotificationService {
  public user: any = null;
  private chatId: any = null;
  constructor(
    private loadingService: LoadingService,
    private genericService: GenericService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private alertCtrl: AlertController,
    private events: Events,
    private alertaService: AlertaService,
    private app: App
  ) {
    this.user = this.localStorageEncryptService.getFromLocalStorage(
      "userSession"
    );
  }

  goToPedido(id: any, goToChat: boolean = false) {
    this.loadingService.show().then(() => {
      let path: any = `${environment.pedidos}/`;
      if (environment.perfil.activo == 2) {
        path = `${environment.proveedor}/pedidos/`;
      } else if (environment.perfil.activo == 3) {
        path = `${environment.transportista}/pedidos/`;
      }

      let params = new HttpParams();
      params = params.set("email", this.user.email);
      let sus: any = this.genericService.sendGetRequest(`${path}${id}`);
      if (nuevoBackHabilitado) {
        sus = this.genericService.sendGetParams(`${path}${id}`, params);
      }
      sus.subscribe(
        (response: any) => {
          if (goToChat) {
            this.verChat(response);
          } else {
            this.loadingService.hide();
            let nav: any = this.app.getActiveNav();
            nav.push(HistorialPedidosDetailPage, { pedido: response });
          }
        },
        (error: HttpErrorResponse) => {
          this.loadingService.hide();
          let err: any = error.error;
          this.alertaService.errorAlertGeneric(
            err.message
              ? err.message
              : "Ocurrió un error en el servicio, intenta nuevamente"
          );
        }
      );
    });
  }

  goToPedidoCalificar(id: any) {
    this.loadingService.show().then(() => {
      let path: any = `${environment.pedidos}/`;
      if (environment.perfil.activo == 2 || environment.perfil.activo == 3) {
        path = `${environment.proveedor}/pedidos/`;
      }
      let params = new HttpParams();
      params = params.set("email", this.user.email);
      let sus: any = this.genericService.sendGetRequest(`${path}${id}`);
      if (nuevoBackHabilitado) {
        sus = this.genericService.sendGetParams(`${path}${id}`, params);
      }
      sus.subscribe(
        (response: any) => {
          this.loadingService.hide();
          let nav: any = this.app.getActiveNav();
          nav.push(CalificacionPage, { pedido: response });
        },
        (error: HttpErrorResponse) => {
          this.loadingService.hide();
          let err: any = error.error;
          this.alertaService.errorAlertGeneric(
            err.message
              ? err.message
              : "Ocurrió un error en el servicio, intenta nuevamente"
          );
        }
      );
    });
  }

  alertaChat(mensaje: string, idPedido: any) {
    let alert = this.alertCtrl.create({
      title: `<div class='notificacionError'>
            <div><img class='headerImg' src='assets/imgs/alerts/success.png'/></div>
            <div class='textoTitle'>${mensaje}</div>
            <div>`,
      cssClass: this.genericService.getColorClassTWO(),
      message: null,
      buttons: [
        {
          text: "Cancelar",
          handler: () => {}
        },
        {
          text: "Aceptar",
          handler: () => {
            this.goToPedido(idPedido, true);
          }
        }
      ]
    });
    alert.present().then((result: any) => {});
    alert.onDidDismiss(() => {});
  }

  verChat(pedido: any) {
    let nav: any = this.app.getActiveNav();
    switch (environment.perfil.activo) {
      case 1:
        this.genericService
          .sendGetRequest(`${environment.chats}/${this.chatId}`)
          .subscribe(
            (response: any) => {
              nav.push(ChatPage, { chat: response, pedido });
              //this.navCtrl.push(ListaChatPage, { chats: this.pedido.pedidoProveedores, pedido: this.pedido });
              this.loadingService.hide();
            },
            (error: HttpErrorResponse) => {
              this.loadingService.hide();
              let err: any = error.error;
              this.alertaService.errorAlertGeneric(
                err.message
                  ? err.message
                  : "Ocurrió un error en el servicio, intenta nuevamente"
              );
            }
          );

        break;

      case 2:
        this.genericService
          .sendGetRequest(
            `${environment.chatsProveedor}${pedido.pedidoProveedores[0].id}/tipoChat/1`
          )
          .subscribe(
            (response: any) => {
              nav.push(ChatPage, { chat: response, pedido });
              this.loadingService.hide();
            },
            (error: HttpErrorResponse) => {
              this.loadingService.hide();
              let err: any = error.error;
              this.alertaService.errorAlertGeneric(
                err.message
                  ? err.message
                  : "Ocurrió un error en el servicio, intenta nuevamente"
              );
            }
          );
        break;
      case 3:
        this.genericService
          .sendGetRequest(
            `${environment.chatsProveedor}${pedido.pedidoProveedores[0].id}/tipoChat/2`
          )
          .subscribe(
            (response: any) => {
              nav.push(ChatPage, { chat: response, pedido });
              //this.navCtrl.push(ChatPage, { chat: response, pedido: this.pedido });
              this.loadingService.hide();
            },
            (error: HttpErrorResponse) => {
              this.loadingService.hide();
              let err: any = error.error;
              this.alertaService.errorAlertGeneric(
                err.message
                  ? err.message
                  : "Ocurrió un error en el servicio, intenta nuevamente"
              );
            }
          );
        break;
    }
  }

  lecturaBackground(data: any) {
    let currentPageName: any = this.app.getActiveNav();
    let currentPage: any = "";
    if (currentPageName.viewCtrl) {
      currentPage = currentPageName.viewCtrl.name;
    } else if (currentPageName.root) {
      currentPage = currentPageName.root.name;
    }

    //Notification was received on device tray and tapped by the user.
    this.user = this.localStorageEncryptService.getFromLocalStorage(
      "userSession"
    );
    switch (Number(data.view)) {
      case 1:
        ///Primera pantalla pago a proveedor
        if (this.user && environment.perfil.activo == 2) {
          let pedido: any = JSON.parse(data.pedidoId);
          this.events.publish("cargarPedidos");
          let alert = this.alertCtrl.create({
            title: "Confirmación",
            message: "Recibiste un nuevo pedido, deseas ir a verlo?",
            cssClass: this.genericService.getColorClassTWO(),
            buttons: [
              {
                text: "Cancelar",
                role: "cancel",
                handler: () => {}
              },
              {
                text: "Aceptar",
                handler: () => {
                  try {
                    alert.dismiss();
                  } catch (error) {}
                  this.goToPedido(Number(pedido));
                  //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                }
              }
            ]
          });
          alert.present();
        } else if (!this.user && environment.perfil.activo == 2) {
          this.alertaService.warnAlertGeneric(
            "Debes iniciar sesión para poder visualizar tus pedidos"
          );
        }
        //this.navCtrl.push(HistorialPedidosDetailPage, { pedido });
        break;
      case 10:
        let idPedidoFromChat: any = this.localStorageEncryptService.getFromLocalStorage(
          "pedidoChat"
        );
        let chatId: any = JSON.parse(data.chatId);
        let pedidoId: any = JSON.parse(data.pedidoId);

        let pedidoReal: boolean = false;

        if (idPedidoFromChat) {
          if (idPedidoFromChat == pedidoId) {
            pedidoReal = true;
          } else {
            pedidoReal = false;
          }
        }

        if (this.user && !pedidoReal) {
          this.chatId = chatId;
          if (currentPage == "ChatPage" && !pedidoReal) {
            this.alertaService.successAlertGeneric(data.body);
            this.events.publish("updateChat");
          } else if (!pedidoReal) {
            this.alertaChat(`${data.title}: ${data.body}`, pedidoId);
          }
        } else if (!this.user) {
          this.alertaService.warnAlertGeneric(
            "Debes iniciar sesión para poder ver los chats"
          );
        } else {
          this.events.publish("updateChat");
        }

        break;
      case 2:
        //Notificación confirmación pedido
        let pedidoPedido: any = this.localStorageEncryptService.getFromLocalStorage(
          "pedidoPedido"
        );
        let pedido: any = JSON.parse(data.pedidoId);
        let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);

        let pedidoPedidoR: boolean = false;

        if (pedidoPedido) {
          if (pedidoPedido == pedido) {
            pedidoPedidoR = true;
          } else {
            pedidoPedidoR = false;
          }
        }

        if (
          this.user &&
          (environment.perfil.activo == 1 || environment.perfil.activo == 3) &&
          !pedidoPedidoR &&
          currentPage != "HistorialPedidosDetailPage"
        ) {
          this.events.publish("cargarPedidos");
          let alert = this.alertCtrl.create({
            title: "Confirmación",
            message: `${data.title}, deseas ir a verlo?`,
            cssClass: this.genericService.getColorClassTWO(),
            buttons: [
              {
                text: "Cancelar",
                role: "cancel",
                handler: () => {}
              },
              {
                text: "Aceptar",
                handler: () => {
                  try {
                    alert.dismiss();
                  } catch (error) {}
                  this.goToPedido(Number(pedido));
                  //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                }
              }
            ]
          });
          alert.present();
        } else if (
          !this.user &&
          (environment.perfil.activo == 1 || environment.perfil.activo == 3) &&
          !pedidoPedidoR
        ) {
          this.alertaService.warnAlertGeneric(
            "Debes iniciar sesión para poder visualizar tus pedidos"
          );
        } else {
          this.events.publish("cargarPedidos");
        }
        break;
      case 3:
        let pedidoPedido3: any = this.localStorageEncryptService.getFromLocalStorage(
          "pedidoPedido"
        );
        let pedido3: any = JSON.parse(data.pedidoId);
        let pedidoProveedor3: any = JSON.parse(data.pedidoProveedorId);

        let pedidoPedidoR3: boolean = false;

        if (pedidoPedido3) {
          if (pedidoPedido3 == pedido3) {
            pedidoPedidoR3 = true;
          } else {
            pedidoPedidoR3 = false;
          }
        }

        if (
          this.user &&
          environment.perfil.activo == 3 &&
          !pedidoPedidoR3 &&
          currentPage != "HistorialPedidosDetailPage"
        ) {
          let pedido: any = pedido3;
          let pedidoProveedor: any = pedidoProveedor3;
          this.events.publish("cargarPedidos");
          let alert = this.alertCtrl.create({
            title: "Confirmación",
            message: `${data.title}, deseas ir a verlo?`,
            cssClass: this.genericService.getColorClassTWO(),
            buttons: [
              {
                text: "Cancelar",
                role: "cancel",
                handler: () => {}
              },
              {
                text: "Aceptar",
                handler: () => {
                  try {
                    alert.dismiss();
                  } catch (error) {}
                  this.goToPedido(Number(pedido));
                  //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                }
              }
            ]
          });
          alert.present();
        } else if (
          !this.user &&
          environment.perfil.activo == 3 &&
          !pedidoPedidoR3
        ) {
          this.alertaService.warnAlertGeneric(
            "Debes iniciar sesión para poder visualizar tus pedidos"
          );
        } else {
          this.events.publish("cargarPedidos");
        }
        break;
      case 6:
        let pedidoPedido6: any = this.localStorageEncryptService.getFromLocalStorage(
          "pedidoPedido"
        );
        let pedido6: any = JSON.parse(data.pedidoId);
        let pedidoProveedor6: any = JSON.parse(data.pedidoProveedorId);

        let pedidoPedidoR6: boolean = false;

        if (pedidoPedido6) {
          if (pedidoPedido6 == pedido6) {
            pedidoPedidoR6 = true;
          } else {
            pedidoPedidoR6 = false;
          }
        }
        if (
          this.user &&
          (environment.perfil.activo == 3 || environment.perfil.activo == 2) &&
          !pedidoPedidoR6 &&
          currentPage != "HistorialPedidosDetailPage"
        ) {
          let pedido: any = pedido6;
          //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
          this.events.publish("cargarPedidos");
          let alert = this.alertCtrl.create({
            title: "Confirmación",
            message: `${data.title}, deseas ver tu pedido?`,
            cssClass: this.genericService.getColorClassTWO(),
            buttons: [
              {
                text: "Cancelar",
                role: "cancel",
                handler: () => {}
              },
              {
                text: "Aceptar",
                handler: () => {
                  try {
                    alert.dismiss();
                  } catch (error) {}
                  this.goToPedido(Number(pedido));
                  //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                }
              }
            ]
          });
          alert.present();
        } else if (
          !this.user &&
          (environment.perfil.activo == 3 || environment.perfil.activo == 2) &&
          !pedidoPedidoR6
        ) {
          this.alertaService.warnAlertGeneric(
            "Debes iniciar sesión para poder visualizar tus pedidos"
          );
        } else {
          this.events.publish("cargarPedidos");
        }
        break;

      case 4:
        if (this.user && environment.perfil.activo == 1) {
          let pedido: any = JSON.parse(data.pedidoId);
          //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
          this.events.publish("cargarPedidos");
          let alert = this.alertCtrl.create({
            title: "Pedido Entregado",
            message: `${data.title}`,
            cssClass: this.genericService.getColorClassTWO(),
            buttons: [
              {
                text: "Cancelar",
                role: "cancel",
                handler: () => {}
              },
              {
                text: "Aceptar",
                handler: () => {
                  try {
                    alert.dismiss();
                  } catch (error) {}
                  this.goToPedidoCalificar(Number(pedido));
                  //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                }
              }
            ]
          });
          alert.present();
        } else if (!this.user && environment.perfil.activo == 1) {
          this.alertaService.warnAlertGeneric(
            "Debes iniciar sesión para poder visualizar tus pedidos"
          );
        }
        break;

      case 12:
      console.log("caso 12");
      
        let pedidoPedido7: any = this.localStorageEncryptService.getFromLocalStorage(
          "pedidoPedido"
        );
        let pedido7: any = JSON.parse(data.pedidoId);
        let pedidoProveedor7: any = JSON.parse(data.pedidoProveedorId);

        let pedidoPedidoR7: boolean = false;

        if (pedidoPedido7) {
          if (pedidoPedido7 == pedido7) {
            pedidoPedidoR7 = true;
          } else {
            pedidoPedidoR7 = false;
          }
        }
        if (
          this.user &&
          (environment.perfil.activo == 1) &&
          !pedidoPedidoR7 &&
          currentPage != "HistorialPedidosDetailPage"
        ) {
          let pedido: any = pedido7;
          //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
          this.events.publish("cargarPedidos");
          let alert = this.alertCtrl.create({
            title: "Confirmación",
            message: `El transportista está en tu domicilio, deseas ver tu pedido?`,
            cssClass: this.genericService.getColorClassTWO(),
            buttons: [
              {
                text: "Cancelar",
                role: "cancel",
                handler: () => {}
              },
              {
                text: "Aceptar",
                handler: () => {
                  try {
                    alert.dismiss();
                  } catch (error) {}
                  this.goToPedido(Number(pedido));
                  //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                }
              }
            ]
          });
          alert.present();
        } else if (
          !this.user &&
          (environment.perfil.activo == 1) &&
          !pedidoPedidoR6
        ) {
          this.alertaService.warnAlertGeneric(
            "Debes iniciar sesión para poder visualizar tus pedidos"
          );
        } else {
          this.events.publish("cargarPedidos");
        }
        break;
    }
  }

  lecturaForeground(data: any) {
    this.user = this.localStorageEncryptService.getFromLocalStorage(
      "userSession"
    );
    let currentPageName: any = this.app.getActiveNav();

    let currentPage: any = "";
    if (currentPageName.viewCtrl) {
      currentPage = currentPageName.viewCtrl.name;
    } else if (currentPageName.root) {
      currentPage = currentPageName.root.name;
    }

    console.log(currentPage);

    //let parseado:any = JSON.parse(data.pedido);
    //Notification was received in foreground. Maybe the user needs to be notified.
    try {
      switch (Number(data.view)) {
        case 1:
          ///Primera pantalla pago a proveedor
          if (this.user && environment.perfil.activo == 2) {
            console.log(data);
            console.log("..................");
            console.log(data.data);
            console.log("..................");

            let pedido: any = JSON.parse(data.pedidoId);
            console.log(pedido);

            this.events.publish("cargarPedidos");

            /* if (currentPage == "TabsProveedorPage") {
                            this.alertaService.successAlertGeneric("Recibiste un nuevo pedido y hemos actualizado tu lista, para que puedas verlo");
                        } else { */
            let alert = this.alertCtrl.create({
              title: "Confirmación",
              message: "Recibiste un nuevo pedido, deseas ir a verlo?",
              cssClass: this.genericService.getColorClassTWO(),
              buttons: [
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () => {}
                },
                {
                  text: "Aceptar",
                  handler: () => {
                    try {
                      alert.dismiss();
                    } catch (error) {}
                    this.goToPedido(Number(pedido));
                    //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                  }
                }
              ]
            });
            alert.present();
            //}
          } else if (!this.user && environment.perfil.activo == 2) {
            this.alertaService.warnAlertGeneric(
              "Debes iniciar sesión para poder visualizar tus pedidos"
            );
          }
          //this.navCtrl.push(HistorialPedidosDetailPage, { pedido });
          break;
        case 10:
          let idPedidoFromChat: any = this.localStorageEncryptService.getFromLocalStorage(
            "pedidoChat"
          );
          let chatId: any = JSON.parse(data.chatId);
          let pedidoId: any = JSON.parse(data.pedidoId);

          let pedidoReal: boolean = false;

          if (idPedidoFromChat) {
            if (idPedidoFromChat == pedidoId) {
              pedidoReal = true;
            } else {
              pedidoReal = false;
            }
          }

          if (this.user && !pedidoReal) {
            this.chatId = chatId;
            if (currentPage == "ChatPage" && !pedidoReal) {
              this.alertaService.successAlertGeneric(data.body);
              this.events.publish("updateChat");
            } else if (!pedidoReal) {
              this.alertaChat(`${data.title}: ${data.body}`, pedidoId);
            }
          } else if (!this.user) {
            this.alertaService.warnAlertGeneric(
              "Debes iniciar sesión para poder ver los chats"
            );
          } else {
            this.events.publish("updateChat");
          }

          break;
        case 2:
          //Notificación confirmación pedido
          let pedidoPedido: any = this.localStorageEncryptService.getFromLocalStorage(
            "pedidoPedido"
          );
          let pedido: any = JSON.parse(data.pedidoId);
          let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);

          let pedidoPedidoR: boolean = false;

          if (pedidoPedido) {
            if (pedidoPedido == pedido) {
              pedidoPedidoR = true;
            } else {
              pedidoPedidoR = false;
            }
          }

          if (
            this.user &&
            environment.perfil.activo == 1 &&
            !pedidoPedidoR &&
            currentPage != "HistorialPedidosDetailPage"
          ) {
            this.events.publish("cargarPedidos");
            let alert = this.alertCtrl.create({
              title: "Confirmación",
              message: `${data.title}, deseas ir a verlo?`,
              cssClass: this.genericService.getColorClassTWO(),
              buttons: [
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () => {}
                },
                {
                  text: "Aceptar",
                  handler: () => {
                    try {
                      alert.dismiss();
                    } catch (error) {}
                    this.goToPedido(Number(pedido));
                    //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                  }
                }
              ]
            });
            alert.present();
          } else if (
            !this.user &&
            environment.perfil.activo == 1 &&
            !pedidoPedidoR
          ) {
            this.alertaService.warnAlertGeneric(
              "Debes iniciar sesión para poder visualizar tus pedidos"
            );
          } else {
            this.events.publish("cargarPedidos");
          }
          break;
        case 3:
          let pedidoPedido3: any = this.localStorageEncryptService.getFromLocalStorage(
            "pedidoPedido"
          );
          let pedido3: any = JSON.parse(data.pedidoId);
          let pedidoProveedor3: any = JSON.parse(data.pedidoProveedorId);

          let pedidoPedidoR3: boolean = false;

          if (pedidoPedido3) {
            if (pedidoPedido3 == pedido3) {
              pedidoPedidoR3 = true;
            } else {
              pedidoPedidoR3 = false;
            }
          }

          if (
            this.user &&
            environment.perfil.activo == 3 &&
            !pedidoPedidoR3 &&
            currentPage != "HistorialPedidosDetailPage"
          ) {
            let pedido: any = pedido3;
            let pedidoProveedor: any = pedidoProveedor3;
            this.events.publish("cargarPedidos");
            let alert = this.alertCtrl.create({
              title: "Confirmación",
              message: `${data.title}, deseas ir a verlo?`,
              cssClass: this.genericService.getColorClassTWO(),
              buttons: [
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () => {}
                },
                {
                  text: "Aceptar",
                  handler: () => {
                    try {
                      alert.dismiss();
                    } catch (error) {}
                    this.goToPedido(Number(pedido));
                    //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                  }
                }
              ]
            });
            alert.present();
          } else if (
            !this.user &&
            environment.perfil.activo == 3 &&
            !pedidoPedidoR3
          ) {
            this.alertaService.warnAlertGeneric(
              "Debes iniciar sesión para poder visualizar tus pedidos"
            );
          } else {
            this.events.publish("cargarPedidos");
          }
          break;
        case 6:
          let pedidoPedido6: any = this.localStorageEncryptService.getFromLocalStorage(
            "pedidoPedido"
          );
          let pedido6: any = JSON.parse(data.pedidoId);
          let pedidoProveedor6: any = JSON.parse(data.pedidoProveedorId);

          let pedidoPedidoR6: boolean = false;

          if (pedidoPedido6) {
            if (pedidoPedido6 == pedido6) {
              pedidoPedidoR6 = true;
            } else {
              pedidoPedidoR6 = false;
            }
          }
          if (
            this.user &&
            (environment.perfil.activo == 3 ||
              environment.perfil.activo == 2) &&
            !pedidoPedidoR6 &&
            currentPage != "HistorialPedidosDetailPage"
          ) {
            let pedido: any = pedido6;
            //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
            this.events.publish("cargarPedidos");
            let alert = this.alertCtrl.create({
              title: "Confirmación",
              message: `${data.title}, deseas ver tu pedido?`,
              cssClass: this.genericService.getColorClassTWO(),
              buttons: [
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () => {}
                },
                {
                  text: "Aceptar",
                  handler: () => {
                    try {
                      alert.dismiss();
                    } catch (error) {}
                    this.goToPedido(Number(pedido));
                    //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                  }
                }
              ]
            });
            alert.present();
          } else if (
            !this.user &&
            (environment.perfil.activo == 3 ||
              environment.perfil.activo == 2) &&
            !pedidoPedidoR6
          ) {
            this.alertaService.warnAlertGeneric(
              "Debes iniciar sesión para poder visualizar tus pedidos"
            );
          } else {
            this.events.publish("cargarPedidos");
          }
          break;
        case 4:
          if (this.user && environment.perfil.activo == 1) {
            let pedido: any = JSON.parse(data.pedidoId);
            //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
            this.events.publish("cargarPedidos");
            let alert = this.alertCtrl.create({
              title: "Pedido Entregado",
              message: `${data.title}`,
              cssClass: this.genericService.getColorClassTWO(),
              buttons: [
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () => {}
                },
                {
                  text: "Aceptar",
                  handler: () => {
                    try {
                      alert.dismiss();
                    } catch (error) {}
                    this.goToPedidoCalificar(Number(pedido));
                    //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                  }
                }
              ]
            });
            alert.present();
          } else if (!this.user && environment.perfil.activo == 1) {
            this.alertaService.warnAlertGeneric(
              "Debes iniciar sesión para poder visualizar tus pedidos"
            );
          }
          break;

        case 12:
          let pedidoPedido7: any = this.localStorageEncryptService.getFromLocalStorage(
            "pedidoPedido"
          );
          let pedido7: any = JSON.parse(data.pedidoId);
          let pedidoProveedor7: any = JSON.parse(data.pedidoProveedorId);

          let pedidoPedidoR7: boolean = false;

          if (pedidoPedido7) {
            if (pedidoPedido7 == pedido6) {
              pedidoPedidoR7 = true;
            } else {
              pedidoPedidoR7 = false;
            }
          }
          if (
            this.user &&
            (environment.perfil.activo == 1) &&
            !pedidoPedidoR7 &&
            currentPage != "HistorialPedidosDetailPage"
          ) {
            let pedido: any = pedido7;
            //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
            this.events.publish("cargarPedidos");
            let alert = this.alertCtrl.create({
              title: "Confirmación",
              message: `El transportista está en tu domicilio, deseas ver tu pedido?`,
              cssClass: this.genericService.getColorClassTWO(),
              buttons: [
                {
                  text: "Cancelar",
                  role: "cancel",
                  handler: () => {}
                },
                {
                  text: "Aceptar",
                  handler: () => {
                    try {
                      alert.dismiss();
                    } catch (error) {}
                    this.goToPedido(Number(pedido));
                    //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                  }
                }
              ]
            });
            alert.present();
          } else if (
            !this.user &&
            (environment.perfil.activo == 1) &&
            !pedidoPedidoR6
          ) {
            this.alertaService.warnAlertGeneric(
              "Debes iniciar sesión para poder visualizar tus pedidos"
            );
          } else {
            this.events.publish("cargarPedidos");
          }
          break;
      }
    } catch (error) {
      console.log(error);
    }
    //this.alertaService.alertaBasica("Soy Luz Radio Notifica", data.body, null);
  }

  evaluateNotification(data: any) {
    if (data.wasTapped) {
      this.lecturaBackground(data);
    } else {
      this.lecturaForeground(data);
    }
  }
}

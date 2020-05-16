import { CalificacionPage } from '../pages/calificacion/calificacion';
import { AlertaService } from './alerta.service';
import { LocalStorageEncryptService } from './local-storage-encrypt.service';
import { GenericService } from './generic.service';
import { LoadingService } from './loading.service';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, Events, App, Nav } from 'ionic-angular';
import { environment } from '../../environments/environment.prod';
import { HistorialPedidosDetailPage } from '../pages/historial-pedidos-detail/historial-pedidos-detail';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatPage } from '../pages/chat/chat';
import { ListaChatPage } from '../pages/lista-chat/lista-chat';

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
        private app: App,
    ) {
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    }

    goToPedido(id: any, goToChat: boolean = false) {
        this.loadingService.show().then(() => {

            let path: any = `${environment.pedidos}/`;
            if (environment.perfil.activo == 2 || environment.perfil.activo == 3) {
                path = `${environment.proveedor}/pedidos/`;
            }

            this.genericService.sendGetRequest(`${path}${id}`).subscribe((response: any) => {

                if (goToChat) {
                    this.verChat(response);
                } else {
                    this.loadingService.hide();
                    let nav: any = this.app.getActiveNav();
                    nav.push(HistorialPedidosDetailPage, { pedido: response });
                }
            }, (error: HttpErrorResponse) => {
                this.loadingService.hide();
                let err: any = error.error;
                this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
        });
    }

    goToPedidoCalificar(id: any) {
        this.loadingService.show().then(() => {

            let path: any = `${environment.pedidos}/`;
            if (environment.perfil.activo == 2 || environment.perfil.activo == 3) {
                path = `${environment.proveedor}/pedidos/`;
            }

            this.genericService.sendGetRequest(`${path}${id}`).subscribe((response: any) => {

                this.loadingService.hide();
                let nav: any = this.app.getActiveNav();
                nav.push(CalificacionPage, { pedido: response });

            }, (error: HttpErrorResponse) => {
                this.loadingService.hide();
                let err: any = error.error;
                this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
            });
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
                    text: 'Cancelar',
                    handler: () => {

                    }
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.goToPedido(idPedido, true);
                    }
                }
            ]
        });
        alert.present().then((result: any) => {

        });
        alert.onDidDismiss(() => {
        });
    }

    verChat(pedido: any) {
        let nav: any = this.app.getActiveNav();
        switch (environment.perfil.activo) {
            case 1:
                this.genericService.sendGetRequest(`${environment.chats}/${this.chatId}`).subscribe((response: any) => {

                    nav.push(ChatPage, { chat: response, pedido });
                    //this.navCtrl.push(ListaChatPage, { chats: this.pedido.pedidoProveedores, pedido: this.pedido });
                    this.loadingService.hide();
                }, (error: HttpErrorResponse) => {
                    this.loadingService.hide();
                    let err: any = error.error;
                    this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });

                break;

            case 2:
                this.genericService.sendGetRequest(`${environment.chatsProveedor}${pedido.pedidoProveedores[0].id}/tipoChat/1`).subscribe((response: any) => {

                    nav.push(ChatPage, { chat: response, pedido });
                    this.loadingService.hide();
                }, (error: HttpErrorResponse) => {
                    this.loadingService.hide();
                    let err: any = error.error;
                    this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
                break;
            case 3:
                this.genericService.sendGetRequest(`${environment.chatsProveedor}${pedido.pedidoProveedores[0].id}/tipoChat/2`).subscribe((response: any) => {
                    nav.push(ChatPage, { chat: response, pedido });
                    //this.navCtrl.push(ChatPage, { chat: response, pedido: this.pedido });
                    this.loadingService.hide();
                }, (error: HttpErrorResponse) => {
                    this.loadingService.hide();
                    let err: any = error.error;
                    this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
                });
                break;
        }
    }

    evaluateNotification(data: any) {
        if (data.wasTapped) {
            console.log(data);
            console.log("-----------------------------------------------");
            //Notification was received on device tray and tapped by the user.
            switch (Number(data.view)) {
                case 1:
                    ///Primera pantalla pago a proveedor
                    if (this.user && environment.perfil.activo == 2) {
                        let pedido: any = JSON.parse(data.data);
                        this.events.publish("cargarPedidos");
                        let alert = this.alertCtrl.create({
                            title: 'Confirmación',
                            message: 'Recibiste un nuevo pedido, deseas ir a verlo?',
                            cssClass: this.genericService.getColorClassTWO(),
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    handler: () => {
                                    }
                                },
                                {
                                    text: 'Aceptar',
                                    handler: () => {
                                        try {
                                            alert.dismiss();
                                        } catch (error) {
                                            
                                        }
                                        this.goToPedido(Number(pedido));
                                        //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                    }
                                }
                            ]
                        });
                        alert.present();
                    } else if (!this.user && environment.perfil.activo == 2) {
                        this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                    }
                    //this.navCtrl.push(HistorialPedidosDetailPage, { pedido });
                    break;
                case 10:

                    if (this.user) {
                        let chatId: any = JSON.parse(data.chatId);
                        let pedidoId: any = JSON.parse(data.pedidoId);
                        console.log(data);

                        this.chatId = chatId;
                        this.alertaChat(`${data.title}: ${data.body}`, pedidoId);
                    } else if (!this.user) {
                        this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder ver los chats");
                    }

                    break;
                case 2:
                    //Notificación confirmación pedido
                    if (this.user && environment.perfil.activo == 1) {
                        let pedido: any = JSON.parse(data.pedidoId);
                        let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
                        this.events.publish("cargarPedidos");
                        let alert = this.alertCtrl.create({
                            title: 'Confirmación',
                            message: `${data.title}, deseas ir a verlo?`,
                            cssClass: this.genericService.getColorClassTWO(),
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    handler: () => {
                                    }
                                },
                                {
                                    text: 'Aceptar',
                                    handler: () => {
                                        try {
                                            alert.dismiss();
                                        } catch (error) {
                                            
                                        }
                                        this.goToPedido(Number(pedido));
                                        //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                    }
                                }
                            ]
                        });
                        alert.present();
                    } else if (!this.user && environment.perfil.activo == 1) {
                        this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                    }
                    break;
                case 3:
                    if (this.user && environment.perfil.activo == 3) {
                        let pedido: any = JSON.parse(data.pedidoId);
                        let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
                        this.events.publish("cargarPedidos");
                        let alert = this.alertCtrl.create({
                            title: 'Confirmación',
                            message: `${data.title}, deseas ir a verlo?`,
                            cssClass: this.genericService.getColorClassTWO(),
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    handler: () => {
                                    }
                                },
                                {
                                    text: 'Aceptar',
                                    handler: () => {
                                        try {
                                            alert.dismiss();
                                        } catch (error) {
                                            
                                        }
                                        this.goToPedido(Number(pedido));
                                        //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                    }
                                }
                            ]
                        });
                        alert.present();
                    } else if (!this.user && environment.perfil.activo == 3) {
                        this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                    }
                    break;
                case 6:
                    if (this.user && environment.perfil.activo == 3 || environment.perfil.activo == 2) {
                        let pedido: any = JSON.parse(data.pedido);
                        //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
                        this.events.publish("cargarPedidos");
                        let alert = this.alertCtrl.create({
                            title: 'Confirmación',
                            message: `${data.title}, deseas ir a verlo?`,
                            cssClass: this.genericService.getColorClassTWO(),
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    handler: () => {
                                    }
                                },
                                {
                                    text: 'Aceptar',
                                    handler: () => {
                                        try {
                                            alert.dismiss();
                                        } catch (error) {
                                            
                                        }
                                        this.goToPedido(Number(pedido));
                                        //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                    }
                                }
                            ]
                        });
                        alert.present();
                    } else if (!this.user && environment.perfil.activo == 3 || environment.perfil.activo == 2) {
                        this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                    }
                    break;

                case 4:
                    if (this.user && environment.perfil.activo == 1) {
                        let pedido: any = JSON.parse(data.pedidoId);
                        //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
                        this.events.publish("cargarPedidos");
                        let alert = this.alertCtrl.create({
                            title: 'Confirmación',
                            message: `${data.title}`,
                            cssClass: this.genericService.getColorClassTWO(),
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    handler: () => {
                                    }
                                },
                                {
                                    text: 'Aceptar',
                                    handler: () => {
                                        try {
                                            alert.dismiss();
                                        } catch (error) {
                                            
                                        }
                                        this.goToPedidoCalificar(Number(pedido));
                                        //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                    }
                                }
                            ]
                        });
                        alert.present();
                    } else if (!this.user && environment.perfil.activo == 1) {
                        this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                    }
                    break;
            }
        } else {

            console.log("-----------------------------------------------");

            console.log(data);

            let currentPageName: any = this.app.getActiveNav();
            console.log(currentPageName);


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
                            let pedido: any = JSON.parse(data.data);
                            this.events.publish("cargarPedidos");

                            /* if (currentPage == "TabsProveedorPage") {
                                this.alertaService.successAlertGeneric("Recibiste un nuevo pedido y hemos actualizado tu lista, para que puedas verlo");
                            } else { */
                            let alert = this.alertCtrl.create({
                                title: 'Confirmación',
                                message: 'Recibiste un nuevo pedido, deseas ir a verlo?',
                                cssClass: this.genericService.getColorClassTWO(),
                                buttons: [
                                    {
                                        text: 'Cancelar',
                                        role: 'cancel',
                                        handler: () => {
                                        }
                                    },
                                    {
                                        text: 'Aceptar',
                                        handler: () => {
                                            try {
                                                alert.dismiss();
                                            } catch (error) {
                                                
                                            }
                                            this.goToPedido(Number(pedido));
                                            //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                        }
                                    }
                                ]
                            });
                            alert.present();
                            //}

                        } else if (!this.user && environment.perfil.activo == 2) {
                            this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                        }
                        //this.navCtrl.push(HistorialPedidosDetailPage, { pedido });
                        break;
                    case 10:

                        if (this.user) {
                            let chatId: any = JSON.parse(data.chatId);
                            let pedidoId: any = JSON.parse(data.pedidoId);
                            console.log(data);

                            this.chatId = chatId;
                            if (currentPage == "ChatPage") {
                                this.alertaService.successAlertGeneric(data.body);
                                this.events.publish("updateChat");
                            } else {
                                this.alertaChat(`${data.title}: ${data.body}`, pedidoId);
                            }

                        } else if (!this.user) {
                            this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder ver los chats");
                        }

                        break;
                    case 2:
                        //Notificación confirmación pedido
                        if (this.user && environment.perfil.activo == 1) {
                            let pedido: any = JSON.parse(data.pedidoId);
                            let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
                            this.events.publish("cargarPedidos");
                            if (currentPage == "HistorialPedidosDetailPage") {
                                this.alertaService.successAlertGeneric(data.title);
                            } else {
                                let alert = this.alertCtrl.create({
                                    title: 'Confirmación',
                                    message: `${data.title}, deseas ir a verlo?`,
                                    cssClass: this.genericService.getColorClassTWO(),
                                    buttons: [
                                        {
                                            text: 'Cancelar',
                                            role: 'cancel',
                                            handler: () => {
                                            }
                                        },
                                        {
                                            text: 'Aceptar',
                                            handler: () => {
                                                try {
                                                    alert.dismiss();
                                                } catch (error) {
                                                    
                                                }
                                                this.goToPedido(Number(pedido));
                                                //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                            }
                                        }
                                    ]
                                });
                                alert.present();
                            }
                        } else if (!this.user && environment.perfil.activo == 1) {
                            this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                        }
                        break;
                    case 3:
                        if (this.user && environment.perfil.activo == 3) {
                            let pedido: any = JSON.parse(data.pedidoId);
                            let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
                            this.events.publish("cargarPedidos");
                            if (currentPage == "HistorialPedidosDetailPage") {
                                this.alertaService.successAlertGeneric(data.title);
                            } else {
                                let alert = this.alertCtrl.create({
                                    title: 'Confirmación',
                                    message: `${data.title}, deseas ir a verlo?`,
                                    cssClass: this.genericService.getColorClassTWO(),
                                    buttons: [
                                        {
                                            text: 'Cancelar',
                                            role: 'cancel',
                                            handler: () => {
                                            }
                                        },
                                        {
                                            text: 'Aceptar',
                                            handler: () => {
                                                try {
                                                    alert.dismiss();
                                                } catch (error) {
                                                    
                                                }
                                                this.goToPedido(Number(pedido));
                                                //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                            }
                                        }
                                    ]
                                });
                                alert.present();
                            }
                        } else if (!this.user && environment.perfil.activo == 3) {
                            this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                        }
                        break;
                    case 6:
                        if (this.user && environment.perfil.activo == 3 || environment.perfil.activo == 2) {
                            let pedido: any = JSON.parse(data.pedido);
                            //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
                            this.events.publish("cargarPedidos");
                            if (currentPage == "HistorialPedidosDetailPage") {
                                this.alertaService.successAlertGeneric(data.title);
                            } else {
                                let alert = this.alertCtrl.create({
                                    title: 'Confirmación',
                                    message: `${data.title}, deseas ir a verlo?`,
                                    cssClass: this.genericService.getColorClassTWO(),
                                    buttons: [
                                        {
                                            text: 'Cancelar',
                                            role: 'cancel',
                                            handler: () => {
                                            }
                                        },
                                        {
                                            text: 'Aceptar',
                                            handler: () => {
                                                try {
                                                    alert.dismiss();
                                                } catch (error) {
                                                    
                                                }
                                                this.goToPedido(Number(pedido));
                                                //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                            }
                                        }
                                    ]
                                });
                                alert.present();
                            }
                        } else if (!this.user && environment.perfil.activo == 3 || environment.perfil.activo == 2) {
                            this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                        }
                        break;
                    case 4:
                        if (this.user && environment.perfil.activo == 1) {
                            let pedido: any = JSON.parse(data.pedidoId);
                            //let pedidoProveedor: any = JSON.parse(data.pedidoProveedorId);
                            this.events.publish("cargarPedidos");
                            let alert = this.alertCtrl.create({
                                title: 'Confirmación',
                                message: `${data.title}`,
                                cssClass: this.genericService.getColorClassTWO(),
                                buttons: [
                                    {
                                        text: 'Cancelar',
                                        role: 'cancel',
                                        handler: () => {
                                        }
                                    },
                                    {
                                        text: 'Aceptar',
                                        handler: () => {
                                            try {
                                                alert.dismiss();
                                            } catch (error) {
                                                
                                            }
                                            this.goToPedidoCalificar(Number(pedido));
                                            //this.app.getActiveNav().push(HistorialPedidosDetailPage, { pedido });
                                        }
                                    }
                                ]
                            });
                            alert.present();
                        } else if (!this.user && environment.perfil.activo == 1) {
                            this.alertaService.warnAlertGeneric("Debes iniciar sesión para poder visualizar tus pedidos");
                        }
                        break;
                }
            } catch (error) {
                console.log(error);

            }
            //this.alertaService.alertaBasica("Soy Luz Radio Notifica", data.body, null);
        }
    }
}

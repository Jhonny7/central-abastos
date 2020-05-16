import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { GenericService } from '../../services/generic.service';
import { AlertaService } from '../../services/alerta.service';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-documentos',
  templateUrl: 'documentos.html',
})
export class DocumentosPage {

  public documentos: any[] = [];

  public documentosTmp: any[] = [];

  public options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private alertaService: AlertaService,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private translatePipe: TranslateService) {
    this.documentosTmp.push({
      documentoId: 1,
      nombre: "IFE",
      adjuntoId: null,
      usuarioDocumentoId: null,
      imagen: null
    });
    this.documentosTmp.push({
      documentoId: 2,
      nombre: "Comprobante de domicilio",
      adjuntoId: null,
      usuarioDocumentoId: null,
      imagen: null
    });
    this.documentosTmp.push({
      documentoId: 3,
      nombre: "Estado de cuenta",
      adjuntoId: null,
      usuarioDocumentoId: null,
      imagen: null
    });
    this.documentosTmp.push({
      documentoId: 4,
      nombre: "Foto de la fachada",
      adjuntoId: null,
      usuarioDocumentoId: null,
      imagen: null
    });
  }

  ionViewDidLoad() {
    this.cargarDocs();
  }

  cargarDocs() {
    this.genericService.sendGetRequest(`${environment.usuarioDocumentos}`).subscribe((response: any) => {
      console.log(response);
      this.documentos = response;
      if (this.documentos.length <= 0) {
        //this.documentos = null;
        this.documentos = this.documentosTmp;
        console.log(this.documentos);
        
      }else{
        console.log("no fue necesario");
        this.documentos.forEach(element => {
          if(element.adjuntoId){
            element.imagen = `${environment.getImagenIndividual}${element.adjuntoId}`;
          }
        });
        console.log(this.documentos);
        
      }
    }, (error: HttpErrorResponse) => {
      let err: any = error.error;
      this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
    });
  }

  subirDocumento(documento:any){
    this.opcionesDeImagen(documento);
  }

  opcionesDeImagen(documento:any) {
    
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecciona',
      buttons: [
        {
          text: 'Captura',
          icon: 'ios-camera-outline',
          handler: () => {
            this.takeFoto(documento);
          }
        },
        {
          text: 'Selecciona',
          icon: 'ios-archive-outline',
          handler: () => {
            this.seleccionaImagen(documento);
          }
        },
        {
          text: 'Borrar',
          icon: 'ios-trash-outline',
          role: 'destructive',
          handler: () => {
            documento.imagen = null;
          }
        },
        {
          text: 'Cancel',
          role: 'destructive',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  takeFoto(documento:any) {
    this.options.sourceType = this.camera.PictureSourceType.CAMERA;
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      documento.imagen = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  seleccionaImagen(documento:any) {
    this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      documento.imagen = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  actualizar(documento:any){
    let body:any = {
      documentoId: documento.documentoId,
      adjunto: {
        fileName: `${Math.round(new Date().getTime() / 1000)}.jpg`,
        contentType: "jpg",
        size: null,
        file: documento.imagen.split("data:image/jpeg;base64,")[1]
      }
    }

    this.genericService.sendPostRequest(`${environment.usuarioDocumentos}`, body).subscribe((response: any) => {
      this.alertaService.successAlertGeneric("Tu documento se actualizó correctamente");
    }, (error: HttpErrorResponse) => {
      this.alertaService.errorAlertGeneric("No se ha podido actualizar tu documento, intenta nuevamente");
    });
  }

  borrar(documento:any){
    this.genericService.sendDeleteRequest(`${environment.usuarioDocumentos}/${documento.usuarioDocumentoId}`).subscribe((response: any) => {
      this.alertaService.successAlertGeneric("Tu documento se eliminó correctamente");
    }, (error: HttpErrorResponse) => {
      this.alertaService.errorAlertGeneric("No se ha podido borrar tu documento, intenta nuevamente");
    });
  }
}

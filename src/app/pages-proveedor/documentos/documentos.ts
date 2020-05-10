import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GenericService } from '../../services/generic.service';
import { AlertaService } from '../../services/alerta.service';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-documentos',
  templateUrl: 'documentos.html',
})
export class DocumentosPage {

  public documentos: any[] = [];

  public documentosTmp: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genericService: GenericService,
    private alertaService: AlertaService) {
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
        
      }
    }, (error: HttpErrorResponse) => {
      let err: any = error.error;
      this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
    });
  }
}

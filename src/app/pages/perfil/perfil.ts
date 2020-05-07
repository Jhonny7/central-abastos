import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { LoadingService } from './../../services/loading.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheet, Events } from 'ionic-angular';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  public photo_url: string = null;

  public selectOptions: any = {
    cssClass: 'action-sheet-class'
  };

  //this.objetoRegistro[0].value = 
  public objetoRegistro: any[] = [
    {
      name: "Nombre del cliente",
      required: true,
      length: 50,
      type: "text",
      formName: "name",
      value: null
    },
    {
      name: "Apellido paterno",
      required: true,
      length: 50,
      type: "text",
      formName: "ap",
      value: null
    },
    {
      name: "Apellido materno",
      required: true,
      length: 50,
      type: "text",
      formName: "am",
      value: null
    },
    {
      name: "Fecha de nacimiento",
      required: true,
      length: 10,
      type: "date",
      formName: "fecha",
      value: null
    },
    {
      name: "Teléfono",
      required: true,
      length: 10,
      type: "number",
      formName: "tel",
      value: null
    },
    {
      name: "Género",
      required: true,
      length: 11,
      type: "select",
      formName: "sex",
      value: 0,
      opts: [
        {
          id: 0,
          value: "[--Selecciona--]"
        },
        {
          id: "M",
          value: "Hombre"
        },
        {
          id: "F",
          value: "Mujer"
        }
      ]
    },
    {
      name: "Correo electrónico",
      required: true,
      length: 100,
      type: "email",
      formName: "email",
      value: null
    }
  ];

  public options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  public formGroup: FormGroup = null;

  public btnHabilitado: boolean = true;

  public user: any = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private localStorageEncryptService: LocalStorageEncryptService,
    private camera: Camera,
    private translatePipe: TranslateService,
    private actionSheet: ActionSheet,
    private alertaService: AlertaService,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private events: Events) {
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    let putObj: any = {};
    this.objetoRegistro.forEach(item => {
      console.log(item);

      let tmp: any[] = [];
      tmp[0] = null;
      tmp[1] = [];
      if (item.required) {
        tmp[1].push(Validators.required);
      }

      if (item.type == "number") {
        tmp[1].push(ValidationService.phoneValidator);
        tmp[1].push(ValidationService.maxLengthValidator);
        tmp[1].push(ValidationService.minLengthValidator);
      }

      if (item.type == "email") {
        tmp[1].push(ValidationService.emailValidator);
      }

      if (item.type == "password") {
        tmp[1].push(ValidationService.passwordValidator);
      }

      if (item.type == "select") {
        tmp[0] = item.opts[0].value;
      }

      if (this.user) {

      }

      putObj[item.formName] = tmp;
    });

    this.formGroup = this.formBuilder.group(
      putObj
    );

    this.events.subscribe("reloadUser", data => {
      try {
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
      } catch (error) {
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  cambiarPerfil() {
    this.loadingService.show().then(() => {
      let body: any = {
        login: "proveedor2",
        firstName: "Proveedor",
        lastName: "Dos",
        motherLastName: "Tres",
        telefono: "8877665544",
        genero: "M",
        fechaNacimiento: "20/11/1979",
      };

      this.genericService.sendPutRequest(environment.usuarios, body).subscribe((response: any) => {
        this.alertaService.successAlertGeneric("Perfil modificado con éxito");
        this.loadingService.hide();
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        this.alertaService.errorAlertGeneric("No se ha podido modificar tu perfil, intenta nuevamente");
      });
    });
  }
}

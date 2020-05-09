import { AlertaService } from './../../services/alerta.service';
import { GenericService } from './../../services/generic.service';
import { LoadingService } from './../../services/loading.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';
import { ValidationService } from '../../services/validation.service';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import * as moment from "moment";
import { HomeGeoProveedoresPage } from '../home-geo-proveedores/home-geo-proveedores';

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

  public userResponse: any = null;

  public env: any = environment;

  public data: any = null;
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
    private events: Events,
    private modalController: ModalController) {
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    this.getDataUsuario();

    this.events.subscribe("reloadUser", data => {
      try {
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
      } catch (error) {
      }
    });
  }

  ionViewDidLoad() {
    moment.locale("ES");
  }

  getDataUsuario() {
    this.loadingService.show().then(() => {
      this.genericService.sendGetRequest(`${environment.users}/${this.user.username}`).subscribe((response: any) => {

        this.objetoRegistro[0].value = response.firstName;
        this.objetoRegistro[1].value = response.lastName;
        this.objetoRegistro[2].value = response.motherLastName;
        this.objetoRegistro[3].value = moment(response.fechaNacimiento, "DD/MM/YYYY").toDate().toISOString();
        this.objetoRegistro[4].value = response.telefono;
        this.objetoRegistro[5].value = response.genero;

        if (environment.perfil.activo == 2) {
          this.objetoRegistro.push({
            name: "Tipo persona",
            required: true,
            length: 11,
            type: "select",
            formName: "typpe",
            value: response.tipoPersonaId,
            opts: [
              {
                id: 0,
                value: "[--Tipo persona--]"
              },
              {
                id: 1,
                value: "Persona física"
              },
              {
                id: 2,
                value: "Persona moral"
              }
            ]
          });

          this.objetoRegistro.push({
            name: "Razón Social",
            required: true,
            length: 50,
            type: "text",
            formName: "rz",
            value: response.razonSocial
          });

          this.objetoRegistro.push({
            name: "Dirección",
            required: true,
            length: 200,
            type: "text",
            formName: "direc",
            value: response.direccion ? response.direccion.direccion : null,
            disabled: true
          });
        }

        this.userResponse = response;

        let putObj: any = {};
        this.objetoRegistro.forEach(item => {

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



          putObj[item.formName] = tmp;
        });

        this.formGroup = this.formBuilder.group(
          putObj
        );
        this.btnHabilitado = false;

        this.loadingService.hide();
      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        let err: any = error.error;
        this.alertaService.errorAlertGeneric(err.message ? err.message : "Ocurrió un error en el servicio, intenta nuevamente");
      });
    });
  }

  cambiarPerfil() {
    this.loadingService.show().then(() => {

      /**
       this.objetoRegistro[0].value = response.firstName;
        this.objetoRegistro[1].value = response.lastName;
        this.objetoRegistro[2].value = response.motherLastName;
        this.objetoRegistro[3].value = moment(response.fechaNacimiento, "DD/MM/YYYY").toDate().toISOString();
        this.objetoRegistro[4].value = response.telefono;
        this.objetoRegistro[5].value = response.genero;
       */
      let body: any = {
        login: this.user.username,
        firstName: this.objetoRegistro[0].value,
        lastName: this.objetoRegistro[1].value,
        motherLastName: this.objetoRegistro[2].value,
        telefono: this.objetoRegistro[4].value,
        genero: this.objetoRegistro[5].value,
        fechaNacimiento: moment(this.objetoRegistro[3].value.split("T")[0], "YYYY-MM-DD").format("DD/MM/YYYY"),
        adjunto: this.photo_url == null || this.photo_url == "null" ? null : {
          contentType: "image/jpeg",
          file: this.photo_url,
          fileName: Math.floor(new Date().getTime() / 1000.0).toString(),
          size: 0
        },
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

  /**Verifica validaciones */
  ejecutaValidator() {
    let validacion: number = 0;
    for (const name in this.formGroup.controls) {
      let n: any = this.formGroup.controls[name];

      if (n.value === 0) {
        validacion++;
      }
      if (n.errors) {
        validacion++;
      }
      /*
      if (n.value && (n.value === 0 || n.value.length === 0) && n.invalid) {
        invalid.push(this.translatePipe.instant(String(name).toUpperCase()));
        fields += `${this.translatePipe.instant(String(name).toUpperCase())}, `;
      } */
    }
    if (validacion <= 0) {
      this.btnHabilitado = false;
    } else {
      this.btnHabilitado = true;
    }
  }

  opcionesDeImagen() {
    let buttonLabels = [this.translatePipe.instant("CAPTURE"), this.translatePipe.instant("SELECT")];
    const options: ActionSheetOptions = {
      title: '',
      subtitle: '',
      buttonLabels: buttonLabels,
      addCancelButtonWithLabel: this.translatePipe.instant("CANCEL"),
      addDestructiveButtonWithLabel: this.translatePipe.instant("DELETE"),
      androidTheme: 1,
      destructiveButtonLast: true
    };
    this.actionSheet.show(options).then((buttonIndex: number) => {
      switch (buttonIndex) {
        case 1:
          this.takeFoto();
          break;
        case 2:
          this.seleccionaImagen();
          break;
        case 3:
          this.photo_url = null;
          break;
      }
    });
  }

  takeFoto() {
    this.options.sourceType = this.camera.PictureSourceType.CAMERA;
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.photo_url = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  seleccionaImagen() {
    this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.photo_url = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  getMapa() {
    let modal = this.modalController.create(HomeGeoProveedoresPage,
      { fromModal: true, fromRegister: true });
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        if (data != null) {
          console.log(data.data);

          this.data = data.data;
          this.objetoRegistro[this.objetoRegistro.length - 1].value = this.data.direccion;
          /*this.objetoRegistro[4].value = this.data.codigoPostal; */
          setTimeout(() => {
            this.ejecutaValidator();
          }, 1000);
        }
      }
    });
  }
}

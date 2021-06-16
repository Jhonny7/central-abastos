import { Component } from '@angular/core';
import { NavController, NavParams, Events, ModalController, ActionSheetController } from 'ionic-angular';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { TranslateService } from '@ngx-translate/core';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { AlertaService } from '../../services/alerta.service';
import { GenericService } from '../../services/generic.service';
import { LoadingService } from '../../services/loading.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import * as moment from "moment";
import { HomeGeoProveedoresPage } from '../home-geo-proveedores/home-geo-proveedores';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  public photo_url: string = null;

  public selectOptions: any = {
    cssClass: 'action-sheet-class'
  };

  public objetoRegistro: any[] = [
    {
      name: "Nombre",
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
          value: "[--Género--]"
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
    },
    {
      name: "Contraseña",
      required: true,
      length: 50,
      type: "password",
      formName: "pass",
      value: null
    },
    {
      name: "Confirmar contraseña",
      required: true,
      length: 50,
      type: "password",
      formName: "passC",
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

  public data: any = null;

  public env:any = environment;
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
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private imagePicker: ImagePicker) {

    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
    let putObj: any = {};

    switch (environment.perfil.activo) {
      case 2:
        this.objetoRegistro.splice(7, 0, {
          name: "Tipo persona",
          required: true,
          length: 11,
          type: "select",
          formName: "typpe",
          value: 0,
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

        this.objetoRegistro.splice(8, 0, {
          name: "Razón Social",
          required: true,
          length: 50,
          type: "text",
          formName: "rz",
          value: null
        });

        this.objetoRegistro.push({
          name: "Dirección",
          required: true,
          length: 200,
          type: "text",
          formName: "direc",
          value: null,
          disabled: true
        });
        break;

      case 3:
        this.objetoRegistro.splice(7, 0, {
          name: "Tipo persona",
          required: true,
          length: 11,
          type: "select",
          formName: "typpe",
          value: 0,
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

        this.objetoRegistro.splice(8, 0, {
          name: "Razón Social",
          required: true,
          length: 50,
          type: "text",
          formName: "rz",
          value: null
        });
        break;
    }

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
        tmp[1].push(ValidationService.minLengthPassValidator);
        tmp[1].push(ValidationService.maxLengthPassValidator);
        //tmp[1].push(ValidationService.passwordValidator);
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
    moment.locale("ES");
  }

  regresar() {
    let id: any = document.getElementById("icn-1");
    id.style.display = "none";
    this.navCtrl.pop();
  }

  registrarOld() {
    console.log(this.objetoRegistro);
    if (environment.perfil.activo == 1 && this.objetoRegistro[7].value != this.objetoRegistro[8].value) {
      this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
    } else if (environment.perfil.activo == 2 && this.objetoRegistro[9].value != this.objetoRegistro[10].value) {
      this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
    } else if (environment.perfil.activo == 3 && this.objetoRegistro[9].value != this.objetoRegistro[10].value) {
      this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
    } else {


      let body: any = null;

      switch (environment.perfil.activo) {
        case 1:
          body = {
            login: this.objetoRegistro[6].value,
            email: this.objetoRegistro[6].value,
            firstName: this.objetoRegistro[0].value,
            lastName: this.objetoRegistro[1].value,
            motherLastName: this.objetoRegistro[2].value,

            telefono: this.objetoRegistro[4].value,
            fechaNacimiento: moment(this.objetoRegistro[3].value, "YYYY-MM-DD").format("DD/MM/YYYY"),

            genero: this.objetoRegistro[5].value,
            password: this.objetoRegistro[7].value,


            activated: true,// por default en la app

            adjunto: this.photo_url == null || this.photo_url == "null" ? null : {
              contentType: "image/jpeg",
              file: this.photo_url.split("data:image/jpeg;base64,")[1],
              fileName: Math.floor(new Date().getTime() / 1000.0).toString(),
              size: 0
            },
            
          };
          break;

        case 2:
          body = {
            login: this.objetoRegistro[6].value,
            email: this.objetoRegistro[6].value,
            firstName: this.objetoRegistro[0].value,
            lastName: this.objetoRegistro[1].value,
            motherLastName: this.objetoRegistro[2].value,

            telefono: this.objetoRegistro[4].value,
            fechaNacimiento: moment(this.objetoRegistro[3].value, "YYYY-MM-DD").format("DD/MM/YYYY"),

            genero: this.objetoRegistro[5].value,
            password: this.objetoRegistro[9].value,

            tipoPersona: this.objetoRegistro[7].value,
            razonSocial: this.objetoRegistro[8].value,

            activated: true,// por default en la app

            adjunto: this.photo_url == null || this.photo_url == "null" ? null : {
              contentType: "image/jpeg",
              file: this.photo_url,
              fileName: Math.floor(new Date().getTime() / 1000.0).toString(),
              size: 0
            },

            direccion: {
              codigoPostal: this.data.codigoPostal,
              direccion: this.data.direccion,
              latitud: this.data.latitud,
              longitud: this.data.longitud
            }
          };
          break;
        case 3:
          body = {
            login: this.objetoRegistro[6].value,
            email: this.objetoRegistro[6].value,
            firstName: this.objetoRegistro[0].value,
            lastName: this.objetoRegistro[1].value,
            motherLastName: this.objetoRegistro[2].value,

            telefono: this.objetoRegistro[4].value,
            fechaNacimiento: moment(this.objetoRegistro[3].value, "YYYY-MM-DD").format("DD/MM/YYYY"),

            genero: this.objetoRegistro[5].value,
            password: this.objetoRegistro[9].value,

            tipoPersona: this.objetoRegistro[7].value,
            razonSocial: this.objetoRegistro[8].value,

            activated: true,// por default en la app

            adjunto: this.photo_url == null || this.photo_url == "null" ? null : {
              contentType: "image/jpeg",
              file: this.photo_url,
              fileName: Math.floor(new Date().getTime() / 1000.0).toString(),
              size: 0
            }
          };
          break;
      }

      let path: string = environment.registro;

      if (environment.perfil.activo == 2) {
        body.tipoPersona = 2;
        path = `${environment.registro}/proveedor`;
      }
      if (environment.perfil.activo == 3) {
        body.tipoPersona = 3;
        path = `${environment.registro}/transportista`;
      }

      if (environment.perfil.activo == 2 && this.objetoRegistro[this.objetoRegistro.length - 1].value.length <= 0) {
        this.alertaService.warnAlertGeneric("Es necesario que ingreses tu dirección");
      } else {
        this.loadingService.show().then(() => {


          this.genericService.sendPostRequest(path, body).subscribe((response: any) => {

            this.loadingService.hide();
            this.alertaService.successAlertGeneric("Registro exitoso");
            this.navCtrl.pop();
          }, (error: HttpErrorResponse) => {
            this.loadingService.hide();
            let err: any = error.error;
            this.alertaService.errorAlertGeneric(err.description ? err.description : "Ocurrió un error en el servicio, intenta nuevamente");
          });
        });
      }
    }

  }

  registrar() {
    console.log(this.objetoRegistro);
    if (environment.perfil.activo == 1 && this.objetoRegistro[7].value != this.objetoRegistro[8].value) {
      this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
    } else if (environment.perfil.activo == 2 && this.objetoRegistro[9].value != this.objetoRegistro[10].value) {
      this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
    } else if (environment.perfil.activo == 3 && this.objetoRegistro[9].value != this.objetoRegistro[10].value) {
      this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
    } else {


      let body: any = null;

      switch (environment.perfil.activo) {
        case 1:
          body = {
            login: this.objetoRegistro[6].value,
            email: this.objetoRegistro[6].value,
            firstName: this.objetoRegistro[0].value,
            lastName: this.objetoRegistro[1].value,
            motherLastName: this.objetoRegistro[2].value,

            telefono: this.objetoRegistro[4].value,
            fechaNacimiento: moment(this.objetoRegistro[3].value, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm:ss"),

            genero: this.objetoRegistro[5].value,
            password: this.objetoRegistro[7].value,


            activated: true,// por default en la app

            adjunto: this.photo_url == null || this.photo_url == "null" ? null : {
              contentType: "image/jpeg",
              file: this.photo_url,
              fileName: Math.floor(new Date().getTime() / 1000.0).toString(),
              size: 0
            },

            tipoUsuario: 2
          };
          break;

        case 2:
          body = {
            login: this.objetoRegistro[6].value,
            email: this.objetoRegistro[6].value,
            firstName: this.objetoRegistro[0].value,
            lastName: this.objetoRegistro[1].value,
            motherLastName: this.objetoRegistro[2].value,

            telefono: this.objetoRegistro[4].value,
            fechaNacimiento: moment(this.objetoRegistro[3].value, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm:ss"),

            genero: this.objetoRegistro[5].value,
            password: this.objetoRegistro[9].value,

            tipoPersona: this.objetoRegistro[7].value,
            razonSocial: this.objetoRegistro[8].value,

            activated: true,// por default en la app

            adjunto: this.photo_url == null || this.photo_url == "null" ? null : {
              contentType: "image/jpeg",
              file: this.photo_url,
              fileName: Math.floor(new Date().getTime() / 1000.0).toString(),
              size: 0
            },

            direccion: {
              codigoPostal: this.data.codigoPostal,
              direccion: this.data.direccion,
              latitud: this.data.latitud,
              longitud: this.data.longitud
            },

            tipoUsuario: 3
          };
          break;
        case 3:
          body = {
            login: this.objetoRegistro[6].value,
            email: this.objetoRegistro[6].value,
            firstName: this.objetoRegistro[0].value,
            lastName: this.objetoRegistro[1].value,
            motherLastName: this.objetoRegistro[2].value,

            telefono: this.objetoRegistro[4].value,
            fechaNacimiento: moment(this.objetoRegistro[3].value, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm:ss"),

            genero: this.objetoRegistro[5].value,
            password: this.objetoRegistro[9].value,

            tipoPersona: this.objetoRegistro[7].value,
            razonSocial: this.objetoRegistro[8].value,

            activated: true,// por default en la app

            adjunto: this.photo_url == null || this.photo_url == "null" ? null : {
              contentType: "image/jpeg",
              file: this.photo_url,
              fileName: Math.floor(new Date().getTime() / 1000.0).toString(),
              size: 0
            },

            tipoUsuario: 4
          };
          break;
      }

      let path: string = environment.registro;

      /* if (environment.perfil.activo == 2) {
        body.tipoPersona = 2;
        path = `${environment.registro}/proveedor`;
      }
      if (environment.perfil.activo == 3) {
        body.tipoPersona = 3;
        path = `${environment.registro}/transportista`;
      } */

      if (environment.perfil.activo == 2 && this.objetoRegistro[this.objetoRegistro.length - 1].value.length <= 0) {
        this.alertaService.warnAlertGeneric("Es necesario que ingreses tu dirección");
      } else {
        this.loadingService.show().then(() => {


          this.genericService.sendPostRequest(path, body).subscribe((response: any) => {

            this.loadingService.hide();
            this.alertaService.successAlertGeneric("Registro exitoso");
            this.navCtrl.pop();
          }, (error: HttpErrorResponse) => {
            this.loadingService.hide();
            let err: any = error.error;
            this.alertaService.errorAlertGeneric(err.description ? err.description : err.description ? err.description : "Ocurrió un error en el servicio, intenta nuevamente");
          });
        });
      }
    }

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

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecciona',
      buttons: [
        {
          text: 'Captura',
          icon: 'ios-camera-outline',
          handler: () => {
            this.takeFoto();
          }
        },
        {
          text: 'Selecciona',
          icon: 'ios-archive-outline',
          handler: () => {
            this.seleccionaImagen();
          }
        },
        {
          text: 'Borrar',
          icon: 'ios-trash-outline',
          role: 'destructive',
          handler: () => {
            this.photo_url = null;
          }
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  takeFoto() {

    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL
      , mediaType: this.camera.MediaType.PICTURE // Try this
      , sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.photo_url = `data:image/jpeg;base64,${imageData}`;
      //this.gotPhoto(imageData, opc);
    }, (err) => {
      // Handle error
    });
  }

  seleccionaImagen() {
    let options: ImagePickerOptions = {
      maximumImagesCount: 1,
      outputType: 1,
      quality: 15
    };
    this.imagePicker.getPictures(options).then((results) => {
      let i: number = 1;
      try {
        if (results) {
          results.forEach(imageData => {
            this.photo_url = `data:image/jpeg;base64,${imageData}`;
          });
        }
      } catch (error) {
        this.alertaService.errorAlertGeneric("Ocurrió un error, intenta nuevamente");
      }
    }, (err) => {
      this.alertaService.errorAlertGeneric("Ocurrió un error, intenta nuevamente");
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

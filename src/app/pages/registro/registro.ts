import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { TranslateService } from '@ngx-translate/core';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { AlertaService } from '../../services/alerta.service';

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
      name: "Nombre del cliente",
      required: true,
      length: 50,
      type: "text",
      formName: "name",
      value: null
    },
    {
      name: "Apellido",
      required: true,
      length: 100,
      type: "text",
      formName: "ap",
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
          id: "Hombre",
          value: "Hombre"
        },
        {
          id: "Mujer",
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private localStorageEncryptService: LocalStorageEncryptService,
    private camera: Camera,
    private translatePipe: TranslateService,
    private actionSheet: ActionSheet,
    private alertaService: AlertaService) {

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
  }

  ionViewDidLoad() {
  }

  regresar() {
    let id: any = document.getElementById("icn-1");
    id.style.display = "none";
    this.navCtrl.pop();
  }

  registrar() {

    if(this.objetoRegistro[7].value != this.objetoRegistro[8].value){
      this.alertaService.warnAlertGeneric("Las contraseñas no coinciden");
    }
    let body:any = {
      login: "",
      email: "",
      firstName: "",
      lastName:"",
      motherLastName:"",
      password:"",
      activated: true// por default en la app
    };
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
    console.log(this.formGroup.controls);

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
          this.photo_url = "";
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

}

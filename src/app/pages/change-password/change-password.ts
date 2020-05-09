import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  public objetoRegistro: any[] = [
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

  public formGroup: FormGroup = null;

  public btnHabilitado: boolean = true;

  public user: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private localStorageEncryptService: LocalStorageEncryptService,
    private events:Events) {
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
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
  }

  regresar() {
    let id: any = document.getElementById("icn-3");
    id.style.display = "none";
    this.navCtrl.pop();
  }

  guardar() {
    this.objetoRegistro.forEach(item => {
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
    //Verificar correo
    if (validacion <= 0) {
      this.btnHabilitado = false;
    } else {
      this.btnHabilitado = true;
    }
  }
}

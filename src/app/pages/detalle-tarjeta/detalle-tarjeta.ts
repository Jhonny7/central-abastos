import { GenericService } from './../../services/generic.service';
import { LoadingService } from './../../services/loading.service';
import { AlertaService } from './../../services/alerta.service';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ValidationService } from '../../services/validation.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-detalle-tarjeta',
  templateUrl: 'detalle-tarjeta.html',
})
export class DetalleTarjetaPage {

  public card: any = null;

  public cards: any = null;

  public btnHabilitado: boolean = true;

  public user: any = null;

  public position: any = null;

  public objetoRegistro: any[] = [
    {
      name: "Nombre de la tarjeta",
      required: true,
      length: 50,
      type: "text",
      formName: "name",
      value: null,
      tag: "alias"
    },
    {
      name: "Número de tarjeta",
      required: true,
      length: 20,
      type: "number",
      formName: "card",
      value: null,
      tag: "numeroTarjeta"
    },
    {
      name: "Fecha de expiración",
      required: true,
      length: 50,
      type: "date",
      formName: "fecha",
      value: null,
      tag: "fechaCaducidad"
    },
    {
      name: "Pin/CCV",
      required: true,
      length: 3,
      type: "number",
      formName: "ccv",
      value: null,
      tag: "numeroSeguridad"
    }];

  public formGroup: FormGroup = null;

  public render: boolean = false;
  public edit: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private localStorageEncryptService: LocalStorageEncryptService,
    private alertaService: AlertaService,
    private events: Events,
    private loadingService: LoadingService,
    private genericService: GenericService) {

      this.card = navParams.get("card");
      this.edit = navParams.get("edit");
    this.cards = navParams.get("cards");
    this.position = navParams.get("position");

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

        if (item.formName == "ccv") {
          tmp[1].push(ValidationService.maxLengthCCV);
        }

        if (item.formName == "card") {
          tmp[1].push(ValidationService.creditCardValidator);
          tmp[1].push(ValidationService.maxLengthCard);
        }
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

      if (this.card) {
        console.log(item.tag);
        
        item.value = this.card[item.tag];
        tmp[0] = this.card[item.tag];
        this.btnHabilitado = true;
      }

      putObj[item.formName] = tmp;
    });
    console.log(putObj);

    this.formGroup = this.formBuilder.group(
      putObj
    );
    console.log("--------");
      
    this.render = true;

    this.events.subscribe("reloadUser", data => {
      try {
        this.user = this.localStorageEncryptService.getFromLocalStorage("userSession");
      } catch (error) {
      }
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
    console.log(this.formGroup.controls);

    if (validacion <= 0) {
      this.btnHabilitado = false;
    } else {
      this.btnHabilitado = true;
    }
  }

  ionViewDidLoad() {
  }

  guardar() {
    //let cards: any = this.localStorageEncryptService.getFromLocalStorage(`${this.user.id_token}-cards`);

    /**Evaluar si hay tarjeta con mismo numero y nombre */
    let banderaRepetido: boolean = false;
    this.cards.forEach(element => {
      if (element.tarjeta == this.objetoRegistro[1].value &&
        element.alias == this.objetoRegistro[0].value) {
        banderaRepetido = true;
      }
    });

    if (banderaRepetido) {
      this.alertaService.warnAlertGeneric("Ya cuentas con una tarjeta con mismo nombre y número");
    } else {
      if (this.edit) {
        console.log("-.-.-.-.-.-.-.-.-.--.-..-.-.-.-");
        

        let tarjeta: any = {
          alias: this.objetoRegistro[0].value,
          numeroTarjeta: this.objetoRegistro[1].value,
          fechaCaducidad: this.objetoRegistro[2].value,
          numeroSeguridad: this.objetoRegistro[3].value,
          id: this.card.id
        }
        this.loadingService.show().then(() => {
          this.genericService.sendPutRequest(environment.tarjetas, tarjeta).subscribe((response: any) => {
            this.alertaService.successAlertGeneric("Tarjeta frecuente modificada con éxito");
            this.loadingService.hide();
            this.navCtrl.pop();
            this.events.publish("card",{response, create:false});
            
          }, (error: HttpErrorResponse) => {
            this.loadingService.hide();
            this.alertaService.errorAlertGeneric("No se ha podido modificar tu tarjeta frecuente, intenta nuevamente");
          });
        });
        
      } else {
        if (this.objetoRegistro[3].value.length < 3) {
          this.alertaService.warnAlertGeneric("El CCV debe contener 3 dígitos");
        } else {

          //arma tarjeta//
          let tarjeta: any = {
            alias: this.objetoRegistro[0].value,
            numeroTarjeta: this.objetoRegistro[1].value,
            fechaCaducidad: this.objetoRegistro[2].value,
            numeroSeguridad: this.objetoRegistro[3].value
          }
          //
          this.loadingService.show().then(() => {
            this.genericService.sendPostRequest(environment.tarjetas, tarjeta).subscribe((response: any) => {
              this.alertaService.successAlertGeneric("Tarjeta frecuente agregada con éxito");
              this.loadingService.hide();
              this.events.publish("card",{response, create:true});
              this.navCtrl.pop();
            }, (error: HttpErrorResponse) => {
              this.loadingService.hide();
              this.alertaService.errorAlertGeneric("No se ha podido agregar tu tarjeta frecuente, intenta nuevamente");
            });
          });

          /* if (!cards) {
            cards = [];
          }
          cards.push(tarjeta);
          this.localStorageEncryptService.setToLocalStorage(`${this.user.id_token}-cards`, cards); */

        }
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/**Clase Servicio que sirve para mostrar y ocultar un spinner
 * de carga en peticiones de servicios back o en donde se requiera
 */
@Injectable()
export class LoadingService {
  /**Variable que tiene la referencia del spinner */
  private loading: any;
  /**Constructor donde se hace la inyección del 
   * controlador de loading
   */
  constructor(private loadingController: LoadingController) { }

  /**Método que se encarga de mostrar el loader */
  async show(message: any = null) {
    try {
      let params: any = {

      };
      if (message) {
        params.message = message;
      }
      this.hide();
      this.loading = await this.loadingController.create(params);
      await this.loading.present();
    } catch (error) {
      console.log("pdo en el ejido");
      console.log(error);

    }
  }

  /**Método que se encarga de ocultar el loader */
  hide() {
    try {
      if (this.loading) {
        this.loading.dismiss();
      } else {
        if (this.loading != undefined) {
          this.loading.dismiss();
        }
      }
    } catch (error) {
      console.log("---->");

      console.log(error);

    }
  }
}

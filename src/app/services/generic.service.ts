import { HttpHeaders } from '@angular/common/http';
import { AlertaService } from './alerta.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/timeout';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable, TimeoutError } from 'rxjs';

export const TIME_OUT = 1000 * 60 * 1; //ultimo número define en minutos
/**Clase provider que es básicamente un servicio generico para las peticiones a servicios */
@Injectable()
export class GenericService {
    
    constructor(
        private readonly http: HttpClient,
        private alertaService: AlertaService) {
            
    }

    /**Método que hace peticiones tipo GET */
    sendGetRequest(webservice_URL: string) {
        return this.http.get(webservice_URL);
    }

    /**Método que hace peticiones tipo GET  con parámetros*/
    sendGetRequestParams(webservice_URL: string, params: any) {
        //return this.http.get(webservice_URL, params).timeout(TIME_OUT);
        return this.http.get(webservice_URL, params)
    }

    /**Método que hace peticiones tipo GET  con parámetros*/
    sendGetParams(webservice_URL: string, params: any) {
        //return this.http.get(webservice_URL, params).timeout(TIME_OUT);
        let options:any={};
        options.params = params;
        return this.http.get(webservice_URL, options);
    }

    /**Método que hace peticiones tipo POST  con parámetros específicos*/
    sendPostRequestParams(webservice_URL: string, params: any, httpOptions: any) {
        //return this.http.post(webservice_URL, params, httpOptions).timeout(TIME_OUT);
        return this.http.post(webservice_URL, params, httpOptions);
    }

    /**Método que hace peticiones tipo POST */
    sendPostRequest(webservice_URL: string, request: {}) {
        //return this.http.post(webservice_URL, request).timeout(TIME_OUT);
        return this.http.post(webservice_URL, request);
    }

    /**Método que hace peticiones tipo PUT */
    sendPutRequest(webservice_URL: string, request: {} = {}) {
        //return this.http.post(webservice_URL, request).timeout(TIME_OUT);
        return this.http.put(webservice_URL, request);
    }

    /**Método que hace peticiones tipo DELETE */
    sendDeleteRequest(webservice_URL: string) {
        //return this.http.delete(webservice_URL).timeout(TIME_OUT);
        return this.http.delete(webservice_URL);
    }

}
import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { TimeoutError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { GenericService } from '../services/generic.service';
import { LocalStorageEncryptService } from '../services/local-storage-encrypt.service';
import { a } from '@angular/core/src/render3';
import { Events } from 'ionic-angular';

/**Clase provider que intercepta las llamadas o peticiones a los servicios back-end y en caso de que el usuario
 * se encuentre en sesión añade los header de token
 */
@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  constructor(
    public auth: AuthService,
    private events: Events) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log("---------------------------------");
    console.log(request);

    let chequeo: any = this.auth.getToken();
    let headers: any = {
      'Content-Type': 'application/json'
    };
    if (chequeo && request.url != "https://maps.googleapis.com/maps/api/geocode/json") {
      headers.Authorization = `Bearer ${this.auth.getToken()}`;
    }
    
    if(request.url == "https://maps.googleapis.com/maps/api/geocode/json"){
      return next.handle(request);
    }else{
      request = request.clone({
        setHeaders: headers
      });
  
  
      return next.handle(request).pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          let error :any = null;
          try {
            error = (typeof errorResponse !== 'object') ? JSON.parse(errorResponse) : errorResponse;
          } catch (error) {
            error = errorResponse;
          }
  
          if (error && error.status == 401 &&
            error.error.title == "Unauthorized" ||
            error.error.title == "El cliente es requerido") {
            this.auth.events.publish("startSession");
            return Observable.throw(error);
          } else {
            return next.handle(request);
          }
        })
      );
    }
  }
}
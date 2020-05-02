import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { GenericService } from '../../services/generic.service';
import { LoadingService } from '../../services/loading.service';
import { LocalStorageEncryptService } from '../../services/local-storage-encrypt.service';

/**Componente que se encarga de mostrar las card 
 * en cada vista requerida
 */
@Component({
  selector: 'cmpt-card-producto',
  templateUrl: 'card-producto.html' 
})
export class CardProductoComponent implements OnInit {

  /**Propiedades de configuracion para el contenido */
  @Input() cards;
  @Input() showSpinner:boolean = true;
  @Input() titleUp:boolean = false;
  @Input() showButton:boolean = true;
  @Input() isEntertaiment:boolean = false;
  @Input() isEntertaimentPromotion:boolean = false;
  @Input() isEntertaimentExperience:boolean = false;

  @Output()
  retornarImagen = new EventEmitter<string>();
  /**Variable que funciona como temporizador */
  public tooltipDelay: number = 1;
  public url:string = "https://santandertwist.com.mx/storage/app/uploads/public/5ca/e04/9e8/5cae049e8505c908712807.png";

  public user = null;

  @ViewChild(Slides)
  slider: Slides;
  
  public imagen:string = "";

  //Arrows
  public rigthArrow:boolean = true;
  public leftArrow:boolean = false;
  
  /**Constructor de la clase
   * con la inyección de los servicios necesarios
   */
  constructor(
    public navCtrl: NavController,
    private loadingService: LoadingService,
    private genericService: GenericService,
    private localStorageEncryptService: LocalStorageEncryptService
  ) {
    /*Se obtiene la instancia mas reciente del objeto usuario guardado en localstorage */
    this.user = this.localStorageEncryptService.getFromLocalStorage(`userSession`);
    //this.imagen = this.cards[0].url;
  }

  /**Metodo que retorna la imagen seleccionada */
  changeImage(event: any) {
    this.imagen = this.cards[event].url;
  }

  /** init pages*/
  ngOnInit() {
   this.imagen = this.cards[0].url;
  }

  /**Metodo para verificar la imagen anterior */
  prev(){
    this.slider.slidePrev();
  }

  /**Metodo para verificar la imagen posterior */
  next(){
    this.slider.slideNext();
  }

  /**Método que captura el evento del cambio en el slide de promociones*/
  didChange(event: any) {
    if(event.realIndex === 0){
      this.leftArrow = false;
    }else{
      this.leftArrow = true;
    }
    if(event.realIndex+1 === this.cards.length){
      this.rigthArrow = false;
    }else{
      this.rigthArrow = true;
    }
  }

}

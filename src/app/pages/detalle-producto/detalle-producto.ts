import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";

@Component({
  selector: 'page-detalle-producto',
  templateUrl: 'detalle-producto.html',
})
export class DetalleProductoPage {

  public producto: any = null;

  public productosTemp: any = [];
  public gallery: any;

  @ViewChild('slides2')
  slider2: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.producto = navParams.get("producto");
    this.producto.photos = [];
    if(this.producto.imagenes){
      this.producto.imagenes.forEach(element => {
        this.producto.photos.push({
          id : element.id,
          img: `data:image/jpeg;base64,${element.file}`
        });
      });
    }
  }

  /**Métodos de navegacion del slide */
  next1() {
    console.log("next");

    this.slider2.slideNext();
  }

  prev1() {
    this.slider2.slidePrev();
  }

  ionViewDidLoad() {
    this.producto.photos.forEach(phot => {
      let img: any = new Image();
      img.src = phot.img;
      img.onload = () => {
        this.productosTemp.push({ img: phot.img, w: img.width, h: img.height, i:phot.id });
        console.log(this.productosTemp);
        
      }
    });
  }

  regresar() {
    let id: any = document.getElementById("icn-p");
    id.style.display = "none";
    this.navCtrl.pop();
  }

  imagesLoaded(i: number): void {
    console.log(i);
    let pswpElement: any = document.querySelectorAll('.pswp')[0];
    console.log(this.productosTemp);
    
    this.productosTemp.sort((a, b) => (a.i > b.i) ? 1 : -1)
    console.log(this.productosTemp);
    
    // build items array
    let items: any[] = [];

    this.productosTemp.forEach(photo => {
      //console.log(photo);

      items.push({ src: photo.img, w: photo.w, h: photo.h });

    });

    console.log(items);


    // define options (if needed)
    let options = {
      // optionName: 'option value'
      // for example:
      index: i // start at first slide
    };

    // Initializes and opens PhotoSwipe
    this.gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    this.gallery.init();
  }
}

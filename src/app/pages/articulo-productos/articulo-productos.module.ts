import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticuloProductosPage } from './articulo-productos';

@NgModule({
  declarations: [
    ArticuloProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticuloProductosPage),
  ],
})
export class ArticuloProductosPageModule {}

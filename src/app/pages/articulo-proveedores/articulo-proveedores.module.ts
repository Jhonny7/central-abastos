import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticuloProveedoresPage } from './articulo-proveedores';

@NgModule({
  declarations: [
    ArticuloProveedoresPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticuloProveedoresPage),
  ],
})
export class ArticuloProveedoresPageModule {}

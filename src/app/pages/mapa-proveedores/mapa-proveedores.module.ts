import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaProveedoresPage } from './mapa-proveedores';

@NgModule({
  declarations: [
    MapaProveedoresPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaProveedoresPage),
  ],
})
export class MapaProveedoresPageModule {}

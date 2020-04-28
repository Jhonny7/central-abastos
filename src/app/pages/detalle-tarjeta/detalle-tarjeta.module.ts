import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleTarjetaPage } from './detalle-tarjeta';

@NgModule({
  declarations: [
    DetalleTarjetaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleTarjetaPage),
  ],
})
export class DetalleTarjetaPageModule {}

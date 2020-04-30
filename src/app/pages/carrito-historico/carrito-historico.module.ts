import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarritoHistoricoPage } from './carrito-historico';

@NgModule({
  declarations: [
    CarritoHistoricoPage,
  ],
  imports: [
    IonicPageModule.forChild(CarritoHistoricoPage),
  ],
})
export class CarritoHistoricoPageModule {}

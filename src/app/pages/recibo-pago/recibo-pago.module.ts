import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReciboPagoPage } from './recibo-pago';

@NgModule({
  declarations: [
    ReciboPagoPage,
  ],
  imports: [
    IonicPageModule.forChild(ReciboPagoPage),
  ],
})
export class ReciboPagoPageModule {}

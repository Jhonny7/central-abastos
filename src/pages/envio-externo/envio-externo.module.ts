import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnvioExternoPage } from './envio-externo';

@NgModule({
  declarations: [
    EnvioExternoPage,
  ],
  imports: [
    IonicPageModule.forChild(EnvioExternoPage),
  ],
})
export class EnvioExternoPageModule {}

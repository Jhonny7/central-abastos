import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaDireccionesPage } from './alta-direcciones';

@NgModule({
  declarations: [
    AltaDireccionesPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaDireccionesPage),
  ],
})
export class AltaDireccionesPageModule {}

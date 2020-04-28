import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpcionesMenuPage } from './opciones-menu';

@NgModule({
  declarations: [
    OpcionesMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(OpcionesMenuPage),
  ],
})
export class OpcionesMenuPageModule {}

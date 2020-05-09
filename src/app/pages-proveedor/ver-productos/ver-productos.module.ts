import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerProductosPage } from './ver-productos';

@NgModule({
  declarations: [
    VerProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(VerProductosPage),
  ],
})
export class VerProductosPageModule {}

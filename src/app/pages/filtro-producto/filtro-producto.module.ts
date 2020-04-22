import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltroProductoPage } from './filtro-producto';

@NgModule({
  declarations: [
    FiltroProductoPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltroProductoPage),
  ],
})
export class FiltroProductoPageModule {}

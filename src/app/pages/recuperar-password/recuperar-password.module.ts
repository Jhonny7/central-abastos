import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProveedorPage } from './recuperar-password';

@NgModule({
  declarations: [
    ProveedorPage,
  ],
  imports: [
    IonicPageModule.forChild(ProveedorPage),
  ],
})
export class RecuperarPasswordPageModule {}

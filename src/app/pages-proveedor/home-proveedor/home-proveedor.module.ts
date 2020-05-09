import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeProveedorPage } from './home-proveedor';

@NgModule({
  declarations: [
    HomeProveedorPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeProveedorPage),
  ],
})
export class HomeProveedorPageModule {}

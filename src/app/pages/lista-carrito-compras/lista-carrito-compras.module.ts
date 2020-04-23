import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaCarritoComprasPage } from './lista-carrito-compras';

@NgModule({
  declarations: [
    ListaCarritoComprasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaCarritoComprasPage),
  ],
})
export class ListaCarritoComprasPageModule {}

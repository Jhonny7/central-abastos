import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistorialPedidosDetailPage } from './historial-pedidos-detail';

@NgModule({
  declarations: [
    HistorialPedidosDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HistorialPedidosDetailPage),
  ],
})
export class HistorialPedidosDetailPageModule {}

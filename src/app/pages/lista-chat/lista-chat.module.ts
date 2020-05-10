import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaChatPage } from './lista-chat';

@NgModule({
  declarations: [
    ListaChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaChatPage),
  ],
})
export class ListaChatPageModule {}

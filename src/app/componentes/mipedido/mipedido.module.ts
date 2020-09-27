import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MipedidoPageRoutingModule } from './mipedido-routing.module';

import { MipedidoPage } from './mipedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MipedidoPageRoutingModule
  ],
  declarations: [MipedidoPage]
})
export class MipedidoPageModule {}

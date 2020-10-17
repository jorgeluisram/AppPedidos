import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoEntregadoPageRoutingModule } from './pedido-entregado-routing.module';

import { PedidoEntregadoPage } from './pedido-entregado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoEntregadoPageRoutingModule
  ],
  declarations: [PedidoEntregadoPage]
})
export class PedidoEntregadoPageModule {}

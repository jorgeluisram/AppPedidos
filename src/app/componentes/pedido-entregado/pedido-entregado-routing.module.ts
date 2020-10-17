import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoEntregadoPage } from './pedido-entregado.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoEntregadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoEntregadoPageRoutingModule {}

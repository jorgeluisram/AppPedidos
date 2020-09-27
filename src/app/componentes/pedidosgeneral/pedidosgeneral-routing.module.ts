import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosgeneralPage } from './pedidosgeneral.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosgeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosgeneralPageRoutingModule {}

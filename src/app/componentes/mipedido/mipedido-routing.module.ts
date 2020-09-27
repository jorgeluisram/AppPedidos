import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MipedidoPage } from './mipedido.page';

const routes: Routes = [
  {
    path: '',
    component: MipedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MipedidoPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedirproductoPage } from './pedirproducto.page';

const routes: Routes = [
  {
    path: '',
    component: PedirproductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedirproductoPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedirproductoPageRoutingModule } from './pedirproducto-routing.module';

import { PedirproductoPage } from './pedirproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedirproductoPageRoutingModule
  ],
  declarations: [PedirproductoPage]
})
export class PedirproductoPageModule {}

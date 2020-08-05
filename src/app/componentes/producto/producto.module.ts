import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoPageRoutingModule } from './producto-routing.module';

import { ProductoPage } from './producto.page';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalInputModule } from '../modal-input/modal-input.module';
import { ModalInputComponent } from '../modal-input/modal-input.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoPageRoutingModule,
    NgbModule,
    ModalInputModule
  ],
  entryComponents:[ModalInputComponent],
  declarations: [ProductoPage]
})
export class ProductoPageModule {}

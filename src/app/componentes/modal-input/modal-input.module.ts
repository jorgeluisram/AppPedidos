import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInputComponent } from './modal-input.component';



@NgModule({
  declarations: [ModalInputComponent],
  exports:[ModalInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ModalInputModule { }

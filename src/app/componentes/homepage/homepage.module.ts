import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomepageComponent } from './homepage.component';



@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
  ],
  entryComponents:[],
  declarations: [
    
    HomepageComponent
  ],
  
})
export class HomepageModule { }

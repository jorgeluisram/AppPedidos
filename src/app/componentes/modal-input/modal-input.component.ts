import { Item, QueryService } from './../../service/query.service';

import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.scss'],
})
export class ModalInputComponent implements OnInit {
  @Input()item:Item;
  
  constructor(public ModalController:ModalController,
              private con:QueryService,) { }

  ngOnInit() {
    this.item
    
  }
  EditForm(){
    this.con.edit(this.item)
  }
  dismissModal(){
    this.ModalController.dismiss();
  }
  handleFirstNameValue(event) {
     this.item = event.target.value;
  }

}

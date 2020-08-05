import { Item } from './../../services/con.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.scss'],
})
export class ModalInputComponent implements OnInit {
  @Input()item:Item;
  constructor(public ModalController:ModalController) { }

  ngOnInit() {
    this.item
    
  }

  dismissModal(){
    this.ModalController.dismiss();
  }
  handleFirstNameValue(event) {
    debugger
    this.item = event.target.value;
  }

}

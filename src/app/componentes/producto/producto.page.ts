//import { ModalInputComponent } from './../modal-input/modal-input.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ConService } from '../../services/con.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';//modal
import { ModalController } from '@ionic/angular';
import { ModalInputComponent } from '../modal-input/modal-input.component';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {


  items:any;
  itemEdit:any={Producto:'',
                Presentacion:''}
  item:any={Producto:'',
            Presentacion:''};
  closeResult: string;
  constructor(
    private router: Router,
    private con:ConService,
    public firestore: AngularFirestore,
    private modalService: NgbModal,
    public ModalController: ModalController
    ) { 
     
    
  }

  ngOnInit() {
    this.getdata()
  }

  getdata(){
    //this.items = this.firestore.collection('producto').valueChanges();
    this.con.retornalItems().subscribe(items=>{
      this.items=items;
      this.processdata();
      console.log(this.items)
    })
  
  }

  processdata(){
    this.items.forEach(element => {
      
    });
  }
  goBack() {    this.router.navigate(['/home']);      }
  Agregar(){
    this.con.addItem(this.item);
  }
  delete(id){
    this.con.delete(id);
  }
  edit(item){
      this.itemEdit = item;
  }
  EditForm(){
    this.con.edit(this.itemEdit)
  }
  async OpenModal(item){
    let showModal = await this.ModalController.create({
      component:ModalInputComponent,
      backdropDismiss:true,
      componentProps:{item:item}
    })
    await showModal.present();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



}

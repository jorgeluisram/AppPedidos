import { QueryService } from './../../service/query.service';
//import { ModalInputComponent } from './../modal-input/modal-input.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';//modal
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
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
    private con:QueryService,
    public firestore: AngularFirestore,
    private modalService: NgbModal,
    public ModalController: ModalController,
    public loadingController: LoadingController,
    public alertController: AlertController
    ) { 
     
    
  }

  ngOnInit() {
    this.getdata()
    //this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere',
      
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Cargado');
  }

  async getdata(){
    //this.items = this.firestore.collection('producto').valueChanges();
    //encendido
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere',
      
    });
    await loading.present();
    this.con.retornalItems().subscribe(async items=>{
      if(items.length==0){}
      this.items=items;
      await loading.dismiss() //apagado
      //this.processdata();
      console.log(this.items)
    })
  
  }

  async  DeleteButton(id,product) {
    const alert = await this.alertController.create({
      header: 'Eliminar Producto',
      message: 'Desea eliminar el producto "'+product+'" de la lista productos',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancelar',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si',
          handler: () => {
            this.delete(id)
          }
        }
      ]
    });

    await alert.present();
  }

  processdata(){
    this.items.forEach(element => {
      
    });
  }
  goBack() {    this.router.navigate(['/home']);      }
  Agregar(){
    let scope=this
    this.con.addItem(this.item).then( function(){
      console.log("Bien desde frontend");
      scope.item.Producto="";
      scope.item.Presentacion="";
      
    })
    .catch(function(error){
      console.log("Error"+error);
    })
    
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

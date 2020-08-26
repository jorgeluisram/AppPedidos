import { QueryService } from './../../service/query.service';
//import { ModalInputComponent } from './../modal-input/modal-input.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';//modal
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { ModalInputComponent } from '../modal-input/modal-input.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import * as firebase from "firebase";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  profileUrl: Observable<string | null>;
  fb;
  file:any;
  items:any;
  itemEdit:any={Producto:'',
                Presentacion:''}
                
  item:any={Producto:'',
            Presentacion:'',
            Estado:'',
            Imagen:''};
  closeResult: string;
 
  constructor(
    private router: Router,
    private con:QueryService,
    public firestore: AngularFirestore,
    private modalService: NgbModal,
    public ModalController: ModalController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private storage: AngularFireStorage
    ) { 
     
    
  }

  ngOnInit() {
    
    this.getdata()
    //this.presentLoading();
  }
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(`productos/${this.item.Producto}.png`);
    const task = this.storage.upload(`productos/${this.item.Producto}.png`,file);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb+"coso1");
            
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url+"coso2");
          
        }
      });
  }
  uploadFile(event) {
    let scope=this
    this.file = event.target.files[0];
    
    const ref = this.storage.ref(`productos/${this.item.Producto}.png`);
    const task = ref.put(this.file);
    const perc = this.storage.upload(`productos/${this.item.Producto}.png`, this.file);
    this.profileUrl = ref.getDownloadURL();
    // observe percentage changes
    this.uploadPercent = perc.percentageChanges();
    // get notified when the download URL is available
   
    perc.snapshotChanges().pipe(
      finalize(()=> this.downloadURL = ref.getDownloadURL() )
    ).subscribe()
    
   
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

  async  DeleteButton(id,product,url) {
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
            this.delete(id);
            this.deleteImg(url);
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
    
   
    this.item.Imagen= this.fb
    this.con.addItem(this.item).then( function(){
      console.log("Bien desde frontend");
      scope.item.Producto="";
      scope.item.Presentacion="";
      scope.file="";
     
    })
    .catch(function(error){
      console.log("Error"+error);
    })
    
    
  
    
  }
  delete(id){
    this.con.delete(id);
   
  }
  deleteImg(downloadUrl) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
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

import { Injectable } from '@angular/core';

import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastController, LoadingController } from '@ionic/angular';

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private itemsCollection : AngularFirestoreCollection<Item>;
  public itemsCollection2 : AngularFirestoreCollection<Item>;
  private itemDoc         : AngularFirestoreDocument<Item>;
  items: Observable<Item[]>;
  itemsUser: Observable<any[]>;
  constructor(private afs: AngularFirestore,
    public db: AngularFirestore,
    public toastController: ToastController,
    public loadingController: LoadingController,) {
    this.itemsCollection = afs.collection<Item>('producto');
    //this.items = this.itemsCollection.valueChanges();
    //valueChanges cambios de los valores
    //Snapshot toma una captura de la imagen
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }
  ngOnInit() {
  }
  
  getdataUser(id){
    debugger
    this.itemsCollection2=this.afs.collection('users', ref => ref.where('uid', '==', id))

    this.itemsUser = this.itemsCollection2.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  

  }
  retornalUser(){
    return this.itemsUser;
  }
  retornalItems(){
    return this.items;
  }
  async addItem(item: Item) {
    let scope=this
      const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere' });
      await loading.present();
    this.itemsCollection.add(item) .then(async function(){
      console.log("bueno");
      
      scope.presentAlert('Su producto a sido agregado','true')
      await loading.dismiss() //apagado
    })
    .catch(function(error){
      console.log("Error"+error);
    })
  }
  delete(id){
    this.itemDoc = this.afs.doc<Item>("producto/"+id);
    this.itemDoc.delete();//Funcion para borrar
  }
  
  async presentAlert(message,type) {
    const toast = await this.toastController.create({
      color: type =='true'?'success':"danger",
      message: message,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }
  edit(item){
    let scope=this
    this.itemDoc = this.afs.doc<Item>("producto/"+item.id);
    this.itemDoc.update(item)//Actualizar
    .then(function(){
      console.log("bueno")
      scope.presentAlert('Su producto editado exitosamente','true')
    })
    .catch(function(error){
      console.log("Error"+error);
    })
  }
}

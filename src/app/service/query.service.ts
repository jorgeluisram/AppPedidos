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
  private itemsCollectionUser : AngularFirestoreCollection<Item>;
  private itemsCollectionSend : AngularFirestoreCollection<Item>;
  public itemsCollection2 : AngularFirestoreCollection<Item>;
  public userCollection : AngularFirestoreCollection<Item>;
  public pedidoCollection : AngularFirestoreCollection<Item>;//obtener pedidos
  public pedidoCollectionG : AngularFirestoreCollection<Item>;//obtener pedidos
  public productbyActive : AngularFirestoreCollection<Item>;
  private itemDoc         : AngularFirestoreDocument<Item>;
  private itemPedido         : AngularFirestoreDocument<Item>;
  private itemUser         : AngularFirestoreDocument<Item>;
  items: Observable<Item[]>;
  itemsUser: Observable<any[]>;
  itemsPedido: Observable<any[]>;//Items para pedidos
  itemsPedidoG: Observable<any[]>;//Items para pedidos General
  itemsUserGeneral: Observable<any[]>;
  itemproductbyActive: Observable<any[]>;
  constructor(private afs: AngularFirestore,
    public db: AngularFirestore,
    public toastController: ToastController,
    public loadingController: LoadingController,) {
    this.itemsCollection = afs.collection<Item>('producto');
    this.itemsCollectionSend = afs.collection<Item>('pedido');
    
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
  getdataproductbyActive(){
    
    this.productbyActive=this.afs.collection('producto', ref => ref.where('Estado', '==', 'Activo'))

    this.itemproductbyActive = this.productbyActive.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  
  }
  retornalproductbyActive(){
    return this.itemproductbyActive;
  }
  getdataUser(id){
    
    this.userCollection=this.afs.collection('users', ref => ref.where('uid', '==', id))

    this.itemsUser = this.userCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  
  }
  getPedido(id){
    //Funcion para obtener el pedido del usuario segun su uid que es unico
    
    this.pedidoCollection=this.afs.collection('pedido', ref => ref.where('iduser', '==', id))

    this.itemsPedido = this.pedidoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  
  }
  retornalPedidoList(){
    return this.itemsPedido;
  }
  getPedidoGeneral(status){
    //Funcion para obtener el pedido del usuario segun su uid que es unico
    
    this.pedidoCollectionG=this.afs.collection('pedido', ref => ref.where('status', '==', status))

    this.itemsPedidoG = this.pedidoCollectionG.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  
  }
  retornalPedidoListGeneral(){
    return this.itemsPedidoG;
  }
  getDataUserList(){
    this.itemsCollectionUser = this.afs.collection<Item>('users');
  
    this.itemsUserGeneral = this.itemsCollectionUser.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  retornalUserList(){
    return this.itemsUserGeneral;
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
  async SendPedido(item: Item) {
    let scope=this
      const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere' });
      await loading.present();
    this.itemsCollectionSend.add(item) .then(async function(){
      console.log("bueno");
      
      scope.presentAlert('Su pedido a sido agregado','true')
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
  deletePedido(id){
    
    this.itemPedido = this.afs.doc<Item>("pedido/"+id);
    this.itemPedido.delete();//Funcion para borrar
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
  async editUser(item){
    
    let scope=this
    //encendido
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere' });
      await loading.present();
      //_____________
    this.itemUser = this.afs.doc<Item>("users/"+item.id);
    this.itemUser.update(item)//Actualizar
    .then(async function(){
      console.log("bueno")
      await loading.dismiss() //apagado
      scope.presentAlert('Perfil actualizado exitosamente','true')

    })
    .catch(async function(error){
      await loading.dismiss() //apagado
      console.log("Error"+error);
    })
  }
  async UpdatePedido(item){
    
    let scope=this
    //encendido
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere' });
      await loading.present();
      //_____________
    this.itemUser = this.afs.doc<Item>("pedido/"+item.id);
    this.itemUser.update(item)//Actualizar
    .then(async function(){
      console.log("bueno")
      await loading.dismiss() //apagado
      scope.presentAlert('Se actualizo el pedido','true')

    })
    .catch(async function(error){
      await loading.dismiss() //apagado
      console.log("Error"+error);
    })
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

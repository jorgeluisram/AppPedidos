import { Injectable } from '@angular/core';

import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private itemsCollection : AngularFirestoreCollection<Item>;
  private itemDoc         : AngularFirestoreDocument<Item>;
  items: Observable<Item[]>;
  constructor(private afs: AngularFirestore) {
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
  retornalItems(){
    return this.items;
  }
  addItem(item: Item) {
    this.itemsCollection.add(item);
  }
  delete(id){
    this.itemDoc = this.afs.doc<Item>("producto/"+id);
    this.itemDoc.delete();//Funcion para borrar
  }
  edit(item){
    this.itemDoc = this.afs.doc<Item>("producto/"+item.id);
    this.itemDoc.update(item)//Actualizar
    .then(function(){
      console.log("bueno")
    })
    .catch(function(error){
      console.log("Error"+error);
    })
  }
}

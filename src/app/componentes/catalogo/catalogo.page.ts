import { Component, OnInit } from '@angular/core';

import { QueryService } from 'src/app/service/query.service';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  items:any;

  constructor(
    public query:QueryService,
    public loadingController: LoadingController,
    ) { }

  ngOnInit() {
    this.getproductbyActive();
  }
  async getproductbyActive(){
    this.query.getdataproductbyActive();
    
  
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere',
      
    });
    await loading.present();
    this.query.retornalproductbyActive().subscribe(async items=>{
      if(items.length==0){}
      debugger
      
      this.items=items;
      await loading.dismiss() //apagado
      //this.processdata();
      console.log(this.items)
    })
  
    }
   

}

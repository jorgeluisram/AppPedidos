import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/service/query.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController,  AlertController } from '@ionic/angular';
@Component({
  selector: 'app-mipedido',
  templateUrl: './mipedido.page.html',
  styleUrls: ['./mipedido.page.scss'],
})
export class MipedidoPage implements OnInit {
  itemsPedido:any;//array de pedidos
  itemsList:[];//array de pedidos
  
  constructor(
    public query : QueryService,
    public loadingController: LoadingController,
    private router: Router,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    if(localStorage.uid==undefined){
      this.router.navigate(['/login']);
    }
    else{this.getpedido(localStorage.uid);}
    
  }
  async getpedido(id){
    let scope=this
    //encendido
    const loading = await this.loadingController.create({
     cssClass: 'my-custom-class',
     message: 'Por favor espere',
   });
   await loading.present();
      this.query.getPedido(id);
      this.query.retornalPedidoList().subscribe(async items=>{
        
        if(items.length==0){
         
        }else{
          
          this.itemsPedido = items
          this.itemsPedido.forEach(element => {
            
            if(element.status=="Entregado"){element.btnDelete=true}
            else{element.btnDelete=false}
            
          });
         
          }
              
              
        //this.processdata();
       
        await loading.dismiss() //apagado
      })
 }
 async  DeleteButton(id,user) {
  const alert = await this.alertController.create({
    header: 'Eliminar Producto',
    message: '¿Desea eliminar el pedido de"'+user+'" de la lista de pedidos?',
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
          this.deletePedido(id);
          
        }
      }
    ]
  });

  await alert.present();
}
deletePedido(id){
    this.query.deletePedido(id);
  
  }
}

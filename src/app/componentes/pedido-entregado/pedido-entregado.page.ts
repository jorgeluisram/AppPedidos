import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/service/query.service';

import { ModalController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pedido-entregado',
  templateUrl: './pedido-entregado.page.html',
  styleUrls: ['./pedido-entregado.page.scss'],
})
export class PedidoEntregadoPage implements OnInit {
  itemsPedido:any;
  constructor(
    public query : QueryService,
    public loadingController: LoadingController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getpedido();
  }

  async getpedido(){
    let scope=this
    //encendido
    const loading = await this.loadingController.create({
     cssClass: 'my-custom-class',
     message: 'Por favor espere',
   });
   await loading.present();
      this.query.getPedidoGeneral('Entregado');
      this.query.retornalPedidoListGeneral().subscribe(async items=>{
        
        if(items.length==0){
         
        }else{
          
          this.itemsPedido = items
         /*  this.itemsPedido.forEach(element => {
            element.list.forEach(element => {
              let obj:any={
                producto:element.producto

              }
              scope.itemsList.push(obj)
  
            });
                      });
 */        }
              
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

  refreshStatus(item:any){
    
   
      let itemEdit={status:item.status,
                
                 id:item.id}
     this.query.UpdatePedido(itemEdit) 
   }

}

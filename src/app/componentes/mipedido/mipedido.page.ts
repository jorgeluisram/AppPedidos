import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/service/query.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
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
          debugger
          this.itemsPedido = items
         /*  this.itemsPedido.forEach(element => {debugger
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
}

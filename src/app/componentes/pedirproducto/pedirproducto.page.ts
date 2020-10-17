import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from 'src/app/service/query.service';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-pedirproducto',
  templateUrl: './pedirproducto.page.html',
  styleUrls: ['./pedirproducto.page.scss'],
})
export class PedirproductoPage implements OnInit {
  items:any;
  myDate: String = new Date().toISOString();
  itemsend:any={iduser:'',
                nameUser:'',
                Rol:'',
                Client:'',
                Address:'',
                nit:'',
                day:'',
                month:'',
                comment:'',
                status:'',
                list:[]
              }

              
 
  
  constructor(
    private router: Router,
    public query:QueryService,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.getproductbyActive()
  }

  goBack() {    this.router.navigate(['/home']);      }
 async getproductbyActive(){
  
 
  this.itemsend.Address= localStorage.addresClient
  this.query.getdataproductbyActive();
  

  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Por favor espere',
    
  });
  await loading.present();
  this.query.retornalproductbyActive().subscribe(async items=>{
    if(items.length==0){}
    
    items.forEach(element => {
      element.cantidad=0
      
    });
    this.items=items;
    await loading.dismiss() //apagado
    //this.processdata();
    console.log(this.items)
  })

  }
  AgregarCarrito(producto:any,presentacion:any,cantidad:any){
    
    let obj={producto:producto,
              presentacion:presentacion,
              cantidad:cantidad

    }
    this.itemsend.list.push(obj)
    //obj={}
  }
  processlist(){
    this.items.forEach(element => {
      if(element.cantidad!=0){
        let obj={producto:element.Producto,
          presentacion:element.Presentacion,
          cantidad:element.cantidad

          }
          this.itemsend.list.push(obj)
        }
      
    });
    
  }

  enviarpedido(){
    let scope=this
    
    this.processlist();
    this.itemsend.iduser= localStorage.uid
    this.itemsend.Rol= localStorage.Rol
    this.itemsend.nameUser= localStorage.nameUser
    
    
    this.itemsend.status= 'Enviado';
    //this.itemsend.list=
    this.query.SendPedido(this.itemsend).then( function(){
      console.log("Bien desde frontend");
      scope.itemsend.Client="";
      scope.itemsend.Address ="";
      scope.itemsend.nit ="";
      scope.itemsend.comment ="";
      //scope.item={}
    })
    .catch(function(error){
      console.log("Error"+error);
    })
  }

  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { QueryService } from 'src/app/service/query.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  public uid:any;
  itemsUser:any;

  public admon:boolean = false;
  public client:boolean = false;
  public seller:boolean = false;

  constructor( 
    private router: Router,
    public query:QueryService,
    public loadingController: LoadingController,
    ) { }

  ngOnInit() {
    this.uid= JSON.parse(localStorage.getItem("uid"))     
    
    this.getuser(this.uid)
  }
 
  goProduct() {this.router.navigate(['/producto']); }
  goUser() {this.router.navigate(['/usuario']); }
  async getuser(id){
     //encendido
     const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere',
      
    });
    await loading.present();
    this.query.getdataUser(id);
    this.query.retornalUser().subscribe(async items=>{
      if(items.length==0){
        this.router.navigate(['/login']); 

      }else{
      this.itemsUser=items[0].rol
      
      switch (this.itemsUser) {
        case "Administrador":
            this.admon  =false;
            this.client =false;
            //this.seller =false;
          break;
        
          case "Cliente":
            this.admon  =true;
            this.client =false;
            //this.seller =false;
          break;

          case "Vendedor":
            this.admon  =true;
            this.client =false;
            //this.seller =false;
          break;
      
        default:
          break;
      }
      
      }
            
      //this.processdata();
      console.log(this.itemsUser)
      await loading.dismiss() //apagado
    })
  }

}

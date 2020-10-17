import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { QueryService } from 'src/app/service/query.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  selectTabs = 'all';
  email   :string;
  password:string;
  name    :string;
  LastName:string;
  rol     :string;
  items:any;
  Imagen:String ="assets/icon/Perfil.png";
  constructor(private router: Router,
    public authService: AuthService,
    public query : QueryService,
    public loadingController: LoadingController,
    
    ) { }

  ngOnInit() {
      this.getlistuser()
    
  }
  refresh(item:any){
    
   
      let itemEdit={status:item.status,
                
                 id:item.id}
     this.query.editUser(itemEdit) 
   }

  goBack() {    this.router.navigate(['/home']);      }
  deleteuser(uid){
    this.authService.UpdateUser(uid)
  }
  signup() {
    let firstLogin="Si"
    let Imagen= '';
    let numberPhone=''
    
    let adress='';
    let status='Activo';
    this.authService.signup(this.email, this.password,this.name,this.rol,firstLogin,Imagen ,numberPhone,this.LastName,adress,status)
  
    this.email ='', this.password = '', this.rol = '', firstLogin = '';
  }
  async getlistuser(){
    this.query.getDataUserList()
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere',
      
    });
    await loading.present();
    this.query.retornalUserList().subscribe(async items=>{
      this.items=items
      
      this.items.forEach(element => {
        if (element.Imagen==""){
          element.Imagen=this.Imagen
        }
        
      });
      console.log(items)
      await loading.dismiss() //apagado
     
    })
  }
  

}

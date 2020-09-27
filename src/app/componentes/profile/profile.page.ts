import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/service/query.service';
import { LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public uid:any;
  itemsUser:any;
  name:String;
  LastName:String;
  numberPhone:String;
  adress: String;
  Imagen:String ="assets/icon/Perfil.png";
  id:String;//ID del usuario

  Rol:String;
  urlPhoto;
  //Foto
  downloadURL: Observable<string>;
  profileUrl: Observable<string | null>;
  uploadPercent: Observable<number>;

  constructor( 
    public query : QueryService,
    public loadingController: LoadingController,
    private storage: AngularFireStorage,
    
    ) { }

  ngOnInit() {
    this.uid= JSON.parse(localStorage.getItem("uid"))     
    this.getuser(this.uid)
  }
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
   
    const fileRef = this.storage.ref(`/usuarios/${this.uid}.png`);
    const task = this.storage.upload(`/usuarios/${this.uid}.png`,file);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.urlPhoto = url;
              this.Imagen= this.urlPhoto
              debugger
           
            }
           
          });
        })
      )
      .subscribe(url => {
        if (url) {
          
          
        }
      });
  }

  async getuser(id){
    //encendido
    const loading = await this.loadingController.create({
     cssClass: 'my-custom-class',
     message: 'Por favor espere',
   });
   await loading.present();
      this.query.getdataUser(id);
      this.query.retornalUser().subscribe(async items=>{
        debugger
        if(items.length==0){
         
        }else{
        this.name=items[0].name
        this.Rol=items[0].rol
        this.id=items[0].id
        this.LastName =items[0].LastName
        this.adress =items[0].adress
        this.numberPhone =items[0].numberPhone
        if(items[0].Imagen==""){
         
          this.Imagen="assets/icon/Perfil.png"}
        else{this.Imagen=items[0].Imagen}
        
        }
              
        //this.processdata();
        console.log(this.itemsUser)
        await loading.dismiss() //apagado
      })
 }

 refresh(){
   let itemEdit={Imagen:this.Imagen,
                LastName:this.LastName,
                adress:this.adress,
                name:this.name,
                numberPhone:this.numberPhone,
                id:this.id}
    this.query.editUser(itemEdit)
  }

}

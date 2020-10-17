import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AngularFirestore} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    public ToastControlleroller: ToastController,
    private db:AngularFirestore
    )
             {
    this.user = firebaseAuth.authState;
    
  }

  signup(email: string, password: string,name: string,rol: string,firstLogin: string,Imagen: String,
    numberPhone: String,
    LastName: String,
    adress: String,status:String) {
     this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        const uid = value.user.uid
        this.db.collection('users').doc(uid).set({
          name:name,
          uid : uid,
          rol : rol,
          firstLogin : firstLogin,
          Imagen : Imagen,
          numberPhone : numberPhone,
          LastName : LastName,
          adress : adress,
          email : email,
          status: status

        })
        console.log('Success!', value);
        this.presentAlert('El usuario fue creado exitosamente','true');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.presentAlert('Intente nuevamente','');
      });  

    
  }
  UpdateUser(uid:string){
    /*  this.firebaseAuth.updateCurrentUser() 
      */
    
/* 
    this.firebaseAuth.updateCurrentUser( uid, {
      email: 'modifiedUser@example.com',
      phoneNumber: '+11234567890',
      emailVerified: true,
      password: 'newPassword',
      displayName: 'Jane Doe',
      photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: true
    })

   this.firebaseAuth.updateCurrentUser({
    displayName: 'Jane Doe',
    photoURL: 'http://www.example.com/12345678/photo.png'
    
   })
   
    admin.auth().updateUser(uid, {
      email: 'modifiedUser@example.com',
      phoneNumber: '+11234567890',
      emailVerified: true,
      password: 'newPassword',
      displayName: 'Jane Doe',
      photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: true
    })
      .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully updated user', userRecord.toJSON());
      })
      .catch(function(error) {
        console.log('Error updating user:', error);
      }); */

  }

  async presentAlert(message,type) {
    const toast = await this.ToastControlleroller.create({
      color: type =='true'?'success':"danger",
      message: message,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

  login(email: string, password: string) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
      // .then(value => {
      //   console.log('Nice, it worked!');
      // })
      // .catch(err => {
      //   console.log('Something went wrong:', err.message);
      // });
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  resetPassword(email:string){
    return this.firebaseAuth.sendPasswordResetEmail(email);
  }
}
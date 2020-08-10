import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth,
            public ToastControlleroller: ToastController) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
     this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.presentAlert('El usuario Fue creado exitosamente','true');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.presentAlert('Intente nuevamente','');
      });  

     /* this.firebaseAuth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
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
}
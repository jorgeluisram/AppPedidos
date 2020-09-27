import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;



  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
    private router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    localStorage.clear();
   
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Contraseña incorrecta',
      subHeader: '',
      message: 'Por favor intenta de nuevo.',
      buttons: ['Cerrar']
    });

    await alert.present();
  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Usuario Desactivado',
      subHeader: '',
      message: 'Este usuario esta desactivado contacte a administración',
      buttons: ['Cerrar']
    });

    await alert.present();
  }
  async login() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere',
      
    });
    await loading.present();
    debugger
    this.authService.login(this.email, this.password)
    .then(async user => {
      debugger
      localStorage.setItem("uid",JSON.stringify(user.user.uid) )
      console.log("Go to another page");
      await loading.dismiss()
      this.router.navigate(['/home']);
    }).catch(async error => {
      console.log(error);
      let nameError = error['code']
      
      debugger
     
      await loading.dismiss()

      switch (nameError) {
        case "auth/wrong-password":
          this.presentAlert()
          break;
        
          case "auth/user-disabled":
            this.presentAlert2();
            break;
        default:
          break;
      }
      
    })
    this.password = '';
  }

  logout() {

    localStorage.clear();
    this.authService.logout();
    
  }

}

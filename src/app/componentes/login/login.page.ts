import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    public alertController: AlertController
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

 /*  signup() {
    let user = this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  } */
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Contraseña incorrecta',
      subHeader: '',
      message: 'Por favor intenta de nuevo.',
      buttons: ['Cerrar']
    });

    await alert.present();
  }
  login() {
    this.authService.login(this.email, this.password)
    .then(user => {
      
      localStorage.setItem("uid",JSON.stringify(user.user.uid) )
      console.log("Go to another page");
      this.router.navigate(['/home']);
    }).catch(error => {
        
      
      console.log("stop at login");
      this.presentAlert()
      
    })
    this.email = this.password = '';
  }

  logout() {

    localStorage.clear();
    this.authService.logout();
    
  }

}

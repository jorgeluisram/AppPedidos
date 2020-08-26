import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {
  public email:string =""

  constructor(
    private router: Router,
    private AuthService: AuthService
    ) { }

  ngOnInit() {
  }

  goBack() {    this.router.navigate(['/login']);      }

  resetMyPass(){
    this.AuthService.resetPassword(this.email).then(()=>{
        this.AuthService.presentAlert('Se a enviado un correo, por favor verifique','true')
      }).catch(()=>{
        this.AuthService.presentAlert('A ocurrido un error verifique su correo','')
      })
  }

}

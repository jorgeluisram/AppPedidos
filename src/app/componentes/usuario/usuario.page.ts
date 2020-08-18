import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  email: string;
  password: string;
  name:string;
  rol:string;
  constructor(private router: Router,
    public authService: AuthService,
    ) { }

  ngOnInit() {
  }

  goBack() {    this.router.navigate(['/home']);      }
  signup() {debugger
    this.authService.signup(this.email, this.password,this.name,this.rol)
  
    this.email ='', this.password = '', this.rol = '';
  }

}

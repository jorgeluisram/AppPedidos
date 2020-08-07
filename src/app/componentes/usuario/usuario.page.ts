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
  constructor(private router: Router,
    public authService: AuthService,
    ) { }

  ngOnInit() {
  }

  goBack() {    this.router.navigate(['/home']);      }
  signup() {
    this.authService.signup(this.email, this.password)
  
    this.email = this.password = '';
  }

}

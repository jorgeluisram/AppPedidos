import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pedirproducto',
  templateUrl: './pedirproducto.page.html',
  styleUrls: ['./pedirproducto.page.scss'],
})
export class PedirproductoPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goBack() {    this.router.navigate(['/home']);      }



}

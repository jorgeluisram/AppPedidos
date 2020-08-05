import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'user',
    loadChildren: () => import('./componentes/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./componentes/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./componentes/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

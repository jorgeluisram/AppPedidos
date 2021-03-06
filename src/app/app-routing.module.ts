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
  {
    path: 'pedirproducto',
    loadChildren: () => import('./componentes/pedirproducto/pedirproducto.module').then( m => m.PedirproductoPageModule)
  },
  {
    path: 'reset-pass',
    loadChildren: () => import('./componentes/reset-pass/reset-pass.module').then( m => m.ResetPassPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./componentes/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'mipedido',
    loadChildren: () => import('./componentes/mipedido/mipedido.module').then( m => m.MipedidoPageModule)
  },
  {
    path: 'pedidosgeneral',
    loadChildren: () => import('./componentes/pedidosgeneral/pedidosgeneral.module').then( m => m.PedidosgeneralPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./componentes/catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },
  {
    path: 'pedido-entregado',
    loadChildren: () => import('./componentes/pedido-entregado/pedido-entregado.module').then( m => m.PedidoEntregadoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

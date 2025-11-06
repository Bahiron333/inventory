import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userGuard } from './Auth/Guard/user.guard';
 
const routes: Routes = [
  
  { path: 'dashboard/:id', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate:[userGuard] },
  { path:'auth', loadChildren: () => import('./Auth/auth.module').then(m=>m.AuthModule)},
  { path:'cliente/:idcliente/:id', loadChildren: ()=> import('./dashboard/clientes/cliente.module').then(m=>m.ClienteModule), canActivate:[userGuard]},
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

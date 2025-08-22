import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'auth/login', pathMatch:'full'},
  { path: 'dashboard/:id', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path:'auth', loadChildren: () => import('./Auth/auth.module').then(m=>m.AuthModule)},
  { path: '**', redirectTo:'auth/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

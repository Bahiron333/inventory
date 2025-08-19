import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { MiembrosComponent } from './miembros/miembros.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { userGuard } from '../Auth/Guard/user.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [userGuard],
    children: [
      { path: 'cliente', component: ClientesComponent },
      { path: 'miembros', component: MiembrosComponent },
      { path: 'cuenta', component: CuentaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}

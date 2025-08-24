import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { userGuard } from '../Auth/Guard/user.guard';
import { CrearclienteComponent } from './clientes/crearcliente/crearcliente.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate:[userGuard]},
  {path: 'cliente/:idCliente', component: ClientesComponent, canActivate:[userGuard]},
  {path: 'create', component:CrearclienteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}

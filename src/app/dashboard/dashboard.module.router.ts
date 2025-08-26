import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CrearclienteComponent } from './clientes/crearcliente/crearcliente.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'create', component:CrearclienteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}

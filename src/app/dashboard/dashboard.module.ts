import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { MiembrosComponent } from './miembros/miembros.component';
import { CuentaComponent } from './cuenta/cuenta.component'; 
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard.module.router';

@NgModule({
  declarations: [
    DashboardComponent,
    ClientesComponent,
    MiembrosComponent,
    CuentaComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    DashboardRoutingModule
],
  exports:[
    DashboardComponent,
    ClientesComponent,
    MiembrosComponent,
    CuentaComponent
  ]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { MiembrosComponent } from './miembros/miembros.component';
import { CuentaComponent } from './cuenta/cuenta.component'; 
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard.module.router';
import { CrearclienteComponent } from './clientes/crearcliente/crearcliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    ClientesComponent,
    CrearclienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DashboardRoutingModule,
    ReactiveFormsModule
],
  exports:[
    DashboardComponent,
    ClientesComponent
  ]
})
export class DashboardModule { }

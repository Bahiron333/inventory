import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard.module.router';
import { CrearclienteComponent } from './clientes/crearcliente/crearcliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteModule } from './clientes/cliente.module';

@NgModule({
  declarations: [
    DashboardComponent,
    CrearclienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    ClienteModule
],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }

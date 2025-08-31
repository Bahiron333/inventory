import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacionComponent } from './informacion/informacion.component';
import { UsersComponent } from './users/users.component';
import { InventarioComponent } from './inventario/inventario.component';
import { MiembrosComponent } from './miembros/miembros.component';
import { clienteRoutingModule } from './cliente.routing.module';
import { RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { FormsModule } from '@angular/forms';
import { ModificarMiembroComponent } from './miembros/modificar-miembro/modificar-miembro.component';



@NgModule({
  declarations: [
    InformacionComponent,
    UsersComponent,
    InventarioComponent,
    MiembrosComponent,
    ClientesComponent,
    ModificarMiembroComponent
  ],
  imports: [
    CommonModule,
    clienteRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class ClienteModule { }

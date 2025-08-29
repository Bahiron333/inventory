import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacionComponent } from './informacion/informacion.component';
import { UsersComponent } from './users/users.component';
import { MiembrosComponent } from '../miembros/miembros.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ClientesComponent } from './clientes.component';
import { userGuard } from '../../Auth/Guard/user.guard';



const routes: Routes = [
  {
    path: 'informacion', 
    component: ClientesComponent,
    children: [
        {path: '',component: InformacionComponent},
        {path: 'users', component: UsersComponent},
        {path: 'inventario', component: InventarioComponent},
        {path: 'miembros', component: MiembrosComponent},
    ],
    canActivate:[userGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class clienteRoutingModule {}

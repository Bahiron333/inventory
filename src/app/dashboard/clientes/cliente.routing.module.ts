import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacionComponent } from './informacion/informacion.component';
import { UsersComponent } from './users/users.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ClientesComponent } from './clientes.component';
import { userGuard } from '../../Auth/Guard/user.guard';
import { MiembrosComponent } from './miembros/miembros.component';
import { suspendidoGuard } from '../../Auth/Guard/suspendido.guard';
import { guardUsuariosGuard } from '../../Auth/Guard/guard-usuarios.guard';
import { guardInventarioGuard } from '../../Auth/Guard/guard-inventario.guard';
import { guardMiembrosGuard } from '../../Auth/Guard/guard-miembros.guard';
import { CrearActivoComponent } from './inventario/crear-activo/crear-activo.component';
import { VerActivoComponent } from './inventario/ver-activo/ver-activo.component';



const routes: Routes = [
  {
    path: 'cliente/:idcliente', 
    component: ClientesComponent,
    children: [
        {path: 'informacion',component: InformacionComponent},
        {path: 'users', component: UsersComponent, canActivate:[guardUsuariosGuard]},
        {path: 'inventario', component: InventarioComponent,canActivate:[guardInventarioGuard]},
        {path: 'miembros', component: MiembrosComponent, canActivate:[guardMiembrosGuard]},
        {path: 'crear-activo',component:CrearActivoComponent, canActivate:[guardMiembrosGuard]},
        {path:':id_inventario/ver-activo/:idActivo',component:VerActivoComponent, canActivate:[guardMiembrosGuard]}
    ],
    canActivate:[userGuard,suspendidoGuard]
  },
  { path: '**', redirectTo:'informacion'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class clienteRoutingModule {}

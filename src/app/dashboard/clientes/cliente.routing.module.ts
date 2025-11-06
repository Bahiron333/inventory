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
import { CrearUsuarioComponent } from './users/crear-usuario/crear-usuario.component';



const routes: Routes = [
  {
    path: '', 
    component: ClientesComponent,
    children: [
        {path: 'informacion',component: InformacionComponent},
        {path: 'users', component: UsersComponent, canActivate:[guardUsuariosGuard,suspendidoGuard]},
        {path: 'users/crear-usuario', component: CrearUsuarioComponent, canActivate:[guardUsuariosGuard,suspendidoGuard]},
        {path: 'inventario', component: InventarioComponent,canActivate:[guardInventarioGuard,suspendidoGuard]},
        {path: 'miembros', component: MiembrosComponent, canActivate:[guardMiembrosGuard,suspendidoGuard]},
        {path: 'crear-activo',component:CrearActivoComponent, canActivate:[guardMiembrosGuard,suspendidoGuard]},
        {path:':id_inventario/ver-activo/:idActivo',component:VerActivoComponent, canActivate:[guardMiembrosGuard,suspendidoGuard]}
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

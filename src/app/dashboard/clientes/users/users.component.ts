import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { ComponenteBase } from '../../../componentBase';
import { UsuarioService } from '../../../services/usuarios/usuario.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent extends ComponenteBase implements OnInit{

  constructor(private clienteService:ClienteService, routeActive:ActivatedRoute,protected userService:UsuarioService){
    super(routeActive)
  }
  

  ngOnInit(): void {
    this.userService.UserCliente(this.id, this.idCliente).subscribe({
      next:(usuarios:any) => this.users = usuarios.users,
      error:(err) => console.log(err.error)
    })
  }

  routerInfUsers(idUser:string){
    this.mostrarInfUsuario=true;
    this.userService.verInfUsuario(idUser,this.idCliente).subscribe({
      next:(usuario:any) => this.user = usuario.user,
      error:(err) => console.log(err.error)
    })
  } 
  
  cerrarVentanaInfUsuario = () => this.mostrarInfUsuario=false;

  eliminarUsers(id:string){

  }
 
  get CrearUsuario(){
    return this.crearUsuario;
  }

  set CrearUsuario(valor:boolean){
    this.crearUsuario = valor;
  } 

  set CerrarVentanaCrearUsuario(valor:boolean){
    this.crearUsuario = false;
  }
  
  set Editar(valor:boolean) {
    this.editarInfUser = valor
  }

  guardarInfUser(){
    this.userService.updateUser(this.user, this.idCliente).subscribe({
      next:() => this.editarInfUser = false,
      error:(err) => console.log(err.error)
    })
  }

  protected users:any = [];
  protected user:any = null;
  protected crearUsuario:boolean = false;
  protected mostrarInfUsuario:boolean = false;
  //es para editar la informacion del usuario
  protected editarInfUser:boolean = false;
  //estados del usuario
  protected estados = ["activo","suspendido","vacaciones","Inactivo"]
  
}

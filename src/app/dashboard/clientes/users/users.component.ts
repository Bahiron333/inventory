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

  } 
  
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

  protected users:any = [];
  protected crearUsuario:boolean = false;
}

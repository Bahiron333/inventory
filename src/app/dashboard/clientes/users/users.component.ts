import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponenteBase } from '../../../componentBase';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { AuthService } from '../../../services/Auth/auth.service';
import { FotoService } from '../../../services/foto/foto.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent extends ComponenteBase implements OnInit{

  constructor(routeActive:ActivatedRoute, protected userService:UsuarioService, authService:AuthService, fotoService?:FotoService, private routersNavegate?:Router, location?:Location){
    super(routeActive,fotoService,authService, location);
  }

  ngOnInit(): void {
    this.getUsers();
    this.permisos = this.authService?.getPermisos();
  }

  getUsers(){
    this.userService.UserCliente(this.id, this.idCliente).subscribe({
      next:(usuarios:any) => this.users = usuarios.users,
      error:(err) => console.log(err.error)
    })
  }

  routerInfUsers(idUser:string){
    this.limpiarDatos();
    this.mostrarInfUsuario=true;
    this.userService.verInfUsuario(idUser,this.idCliente).subscribe({
      next:(usuario:any) =>{ 
        this.user = usuario.user;
        this.verActivosUsuario();
      },
      error:(err) => console.log(err.error)
    })

  } 

  navigateCrearUsuario(){
    this.routersNavegate?.navigate(['cliente',this.idCliente,this.id,'users','crear-usuario']);
  }

  verActivosUsuario(){
    try{
      this.viewActivos=null;
      this.userService.verActivoUser(this.user?._id).subscribe({
          next:(data) => {
            this.viewActivos = data.activos;
            this.catidadActivosUser = this.viewActivos.reduce((acc:any, item:any) => {
                acc[item.tipo] = (acc[item.tipo] || 0) + 1;
                  return acc;
                }, {});
          },
          error:(err) => {
            console.log(err.error);
            this.catidadActivosUser.hardware = 0;
            this.catidadActivosUser.software = 0;
          }
      })
    }catch(err){
      console.log(err)
    }
  }
  
  cerrarVentanaInfUsuario = () => {
    this.mostrarInfUsuario=false;
    this.MostrarActivos(false,'');
  }

  cerrarVentanaInfActivos = () => this.MostrarActivos(false,'');

  eliminarUsers(id:string){
    this.userService.DeleteUser(id).subscribe({
        next:(mensaje) => {
          alert(mensaje);
          this.getUsers();  
        },
        error:(err) => console.log(err.error)
      })
  }

  eliminarActivoUsers(idActivo:string){
      this.userService.DeleteActivoUser(this.user._id,idActivo).subscribe({
        next:() => {
          this.verActivosUsuario();
        },
        error:(err) => console.log(err.error)
      })
  }
 
  limpiarDatos(){
    this.user = null;
    this.catidadActivosUser = null;
  }

  MostrarActivos(valor:boolean,tipo:string){
    this.mostrarActivos = valor;
    this.tipoActivo = tipo;
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
  //variables controladoras de flujo
  protected mostrarInfUsuario:boolean = false;
  protected mostrarActivos: boolean = false;
  //es para editar la informacion del usuario
  protected editarInfUser:boolean = false;
  //estados del usuario
  protected estados:any = ["activo","suspendido","vacaciones","Inactivo"];
  //activos usuario
  protected viewActivos:any = null;
  protected catidadActivosUser:any = null;
  protected tipoActivo:string = "";
  
}

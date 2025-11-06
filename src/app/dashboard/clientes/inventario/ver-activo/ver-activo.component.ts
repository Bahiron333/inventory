import { Component, OnInit } from '@angular/core';
import { ComponenteBase } from '../../../../componentBase';
import { InventarioService } from '../../../../services/inventario/inventario.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { FotoService } from '../../../../services/foto/foto.service';
import { AuthService } from '../../../../services/Auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ver-activo',
  standalone: false,
  templateUrl: './ver-activo.component.html',
  styleUrl: './ver-activo.component.scss'
})
export class VerActivoComponent extends ComponenteBase implements OnInit{

  constructor(private inventarioService:InventarioService, router:ActivatedRoute,private userService:UsuarioService, auth:AuthService,foto:FotoService, location:Location){
    super(router,foto,auth,location);
  }

  ngOnInit(): void {
    this.permisos = this.authService?.getPermisos();
    this.router?.paramMap.subscribe(params=>{
       this.idActivo = params.get('idActivo');
    });

    this.inventarioService.getActivo(this.idCliente,this.idActivo).subscribe({
        next:(activo:any)=>{
          this.activo = activo.activoEnviar;
          Object.entries( this.activo.campos_adicionales[0]).forEach(([key,value])=>{
              this.camposAdicionales.push({
                nombre: key,
                valor: value
              });
          });
        },
        error:(err) => console.log(err.error)
    });

    this.getUsers();

  }

  getUsers(){
    this.userService.getUsersActivo(this.idActivo).subscribe({
      next:(users:any)=>{
        this.users = users.usuarios;
        this.userAgregados = users.cantidad_usuarios;
      },
      error:(err) => console.log(err.error)
    })
  }

  DeleteUSer(id:string){
     this.userService.DeleteActivoUser(id,this.idActivo).subscribe({
      next:()=>{
        this.users = null;
        this.userAgregados = 0;
        this.getUsers();
      },
      error:(err) => console.log(err.error)
    })
  }

  protected activo:any = null;
  protected idActivo:any = null;
  protected camposAdicionales:any = [];

  //usuarios 
  protected userAgregados:number = 0;
  protected users:any = [];
  
}

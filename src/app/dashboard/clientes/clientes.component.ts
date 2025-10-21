import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements OnInit{

  constructor(private clienteService:ClienteService, private routerActive:ActivatedRoute, private authService:AuthService){}
  
  ngOnInit(): void {
    //accede a las rutas de las variables del padre y del hijo
    this.routerActive.paramMap.subscribe(params=>{
      //obtenemos los datos de la ruta url
      this.idCliente = params.get('idcliente');
      this.id = params.get('id');
      //llamamos al servicio para obtener los datos del servidor
      this.clienteService.InformacionCliente(this.id,this.idCliente).subscribe({
      next: (data:any)=>{
        this.authService.guardarPermisosLocal(this.idCliente,this.id)
        this.nombreEmpresa = data.cliente.nombre;
      }, error: err => console.log(err.error)
    })
    }) 

  }

  permisoUsuario():boolean{
    return localStorage.getItem("permisosUsuario")==="true";
  }

  permisoInventario():boolean{
    return localStorage.getItem("permisosInventario")==="true";
  }

  permisoMiembro():boolean{
    return localStorage.getItem("permisosMiembro")==="true";
  }

  protected nombreEmpresa:string = "";
  protected idCliente:any = null;
  protected id:any = null;
}

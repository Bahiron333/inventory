import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  constructor(private clienteService:ClienteService, private routeActive:ActivatedRoute){
      routeActive.parent?.paramMap.subscribe(params=>{
        this.id = params.get('id')
        this.idCliente = params.get('idcliente');
    })
  }

  ngOnInit(): void {
    this.clienteService.UserCliente(this.id, this.idCliente).subscribe({
      next:(usuarios:any) => this.users = usuarios.users,
      error:(err) => console.log(err.error)
    })
  }

  routerInfUsers(idUser:string){

  } 

  trackById = (index:number, user:any) => user.id; //filtra por el id
  
  eliminarUsers(id:string){

  }

  get usuariosFiltrados(){
    return this.textBuscar != "" ? this.users.filter((x:any)=>
      x.id.includes(this.textBuscar) ||
      x.nombre.toLowerCase().includes(this.textBuscar.toLocaleLowerCase()) ||
      x.estado.toLowerCase().includes(this.textBuscar.toLocaleLowerCase()) ||
      x.departamento.toLowerCase().includes(this.textBuscar.toLocaleLowerCase())
  ) : this.users;
}

  

  protected users:any = [];
  protected textBuscar: string = "";
  protected id:any = null;
  protected idCliente:any = null;
}

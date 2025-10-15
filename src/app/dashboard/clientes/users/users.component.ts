import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { ComponenteBase } from '../../../componentBase';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent extends ComponenteBase implements OnInit{

  constructor(private clienteService:ClienteService, routeActive:ActivatedRoute){
    super(routeActive)
  }
  

  ngOnInit(): void {
    this.clienteService.UserCliente(this.id, this.idCliente).subscribe({
      next:(usuarios:any) => this.users = usuarios.users,
      error:(err) => console.log(err.error)
    })
  }

  routerInfUsers(idUser:string){

  } 
  
  eliminarUsers(id:string){

  }
 

  protected users:any = [];
}

import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/Dashboard/dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  constructor(private dashboardService:DashboardService, private router:ActivatedRoute){}

  ngOnInit(): void {

    //obtenemos el id del usuario por medio de la ruta
    this.router.paramMap.subscribe(params=>{
      this.id = params.get('id')
    });

    //enviamos el id del usuario y el servidor trae los clientes asociados con el id
    this.dashboardService.informacionClientes(this.id).subscribe({
      next:(data)=>{
        this.empresas = data.clientes;
        this.cantidadclientes = this.empresas.length;
        console.log(this.empresas)
      },
      error: ()=> console.log("Error la obtener los datos") 
     })
  }

  protected empresas:any = null;
  protected cantidadclientes:number = 0;
  protected id:any = null;
}

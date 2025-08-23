import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/Dashboard/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  constructor(private dashboardService:DashboardService, private router:ActivatedRoute, private routerNavigate:Router){}

  ngOnInit(): void {

    //obtenemos el id del usuario por medio de la ruta
    this.router.paramMap.subscribe(params=>{
      this.id = params.get('id')
    });

    //enviamos el id del usuario y el servidor trae los clientes asociados con el id
    this.dashboardService.informacionClientes(this.id).subscribe({
      next:(data)=>{
        this.empresas = data.clientes;
        this.user = data.user;
        this.cantidadclientes = this.empresas.length;
     
        //esta parte controla que solo el administrador cree usuarios 
        if(this.user['role']=="admin") {
            console.log(this.user)
            this.agregarCliente=true;
            this.eliminarCliente=true;
        }else{
            this.agregarCliente=false;
            this.eliminarCliente=false;
        }
      },
      error: ()=> console.log("Error la obtener los datos") 
     })
  }

  routerCliente(idCliente:string){ 
    this.routerNavigate.navigate(['dashboard',this.id,'cliente',idCliente]); 
  }

  mostrarVentanaAgregar(){
    this.ControlMostrarVentanaAgregar = !this.ControlMostrarVentanaAgregar;
  }

  eliminarcliente(idCliente:string){
    this.dashboardService.eliminarcliente(this.id,idCliente).subscribe({
      next: (data)=>{
        alert(data.mensaje);
         console.log(this.empresas)
      }, error: (err)=>{
        alert(err.error['mensaje']);
      }
    })
  }

  //datos de la empresa
  protected empresas:any = null;
  protected cantidadclientes:number = 0;
  protected id:any = null;

  //variables de control de flujo
  protected ControlMostrarVentanaAgregar:boolean = false;
  protected agregarCliente:boolean = false;
  protected eliminarCliente:boolean = false;
  protected user:any = null;

}

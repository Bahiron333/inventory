import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/Dashboard/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FotoService } from '../services/foto/foto.service';
import { AuthService } from '../services/Auth/auth.service';
import { ComponenteBase } from '../componentBase';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends ComponenteBase implements OnInit{

  constructor(private dashboardService:DashboardService, router:ActivatedRoute, private routerNavigate:Router, fotoService:FotoService,
              authService:AuthService
  ){
    super(router,fotoService,authService);
  }

  ngOnInit(): void {

    //enviamos el id del usuario y el servidor trae los clientes asociados con el id
    this.dashboardService.informacionClientes(this.id).subscribe({
      next:(data)=>{
        this.empresas = data.clientes;
        this.user = data.user;
        this.cantidadclientes = this.empresas.length;
      },
      error: ()=> console.log("Error la obtener los datos") 
     })
  }

  routerCliente(idCliente:string){ 
    this.authService?.isSuspendido(idCliente,this.id).then((suspendido)=>{
      if(!suspendido){
        this.routerNavigate.navigate(['cliente',idCliente,this.id,'informacion']); 
      }else{
        alert("su usuario a sido suspendido de esta empresa, para mas informacion, comunicarse con el administrador")
      }
    });
  }

  mostrarVentanaAgregar(){
    this.ControlMostrarVentanaAgregar = !this.ControlMostrarVentanaAgregar;
  }

  eliminarcliente(idCliente:string){
    this.dashboardService.eliminarcliente(this.id,idCliente).subscribe({
      next: (data)=>{
        alert(data.mensaje);
        this.empresas = this.empresas.filter((m:any)=>m.id!=idCliente);
        this.cantidadclientes = this.empresas.length;
      }, error: (err)=>{
        alert(err.error['mensaje']);
      }
    })
  }

  unierseCliente(){
    this.dashboardService.unirseCliente(this.codigo, this.id).subscribe({
      next:(data)=>{
        alert(data.menssage);
        window.location.reload();
      },error: (err)=>{
        alert("hubo un error en el procesamiento de los datos");
        console.log(err.error)
      }
    })
  }

  redirigirCrearCliente(){
    this.routerNavigate.navigate(['dashboard',this.id,'create'])
  }

  //datos para unirse a una nueva empresa 
  protected codigo:string = "";

  //datos de la empresa
  protected empresas:any = null;
  protected cantidadclientes:number = 0;

  //variables de control de flujo
  protected ControlMostrarVentanaAgregar:boolean = false;
  protected agregarCliente:boolean = false;
  protected eliminarCliente:boolean = false;
  protected user:any = null;

}

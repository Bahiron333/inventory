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
      this.id = params.get('id');
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
        alert("Se agrego el cliente exitosamente");
        this.empresas.push(data.empresa);
        this.cantidadclientes = this.empresas.length;
      },error: (err)=>{
        alert(err.error);
      }
    })
  }

  redirigirCrearCliente(){
    this.routerNavigate.navigate(['dashboard',this.id,'create'])
  }

  get clientesFiltrados(){
    if(this.textBuscar==''){
      return this.empresas;
    }else{
      //filtra los datos en la busqueda por el nombre, representante o id
      return this.empresas.filter((c:any)=>
          c.nombre.toLowerCase().includes(this.textBuscar.toLowerCase()) || 
          c.id.toLowerCase().includes(this.textBuscar.toLowerCase()) ||
          c.representante.toLowerCase().includes(this.textBuscar.toLowerCase())
    );
    }
  }

  trackById(index:number, cliente:any):number{
    return cliente.id;
  }
   
  //datos para unirse a una nueva empresa 
  protected codigo:string = "";

  //datos de la empresa
  protected empresas:any = null;
  protected cantidadclientes:number = 0;
  protected id:any = null;

  //variables de control de flujo
  protected ControlMostrarVentanaAgregar:boolean = false;
  protected agregarCliente:boolean = false;
  protected eliminarCliente:boolean = false;
  protected user:any = null;

  //busqueda
  protected textBuscar:string = "";

}

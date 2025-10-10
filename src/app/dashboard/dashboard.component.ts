import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/Dashboard/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FotoService } from '../services/foto/foto.service';
import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  constructor(private dashboardService:DashboardService, private router:ActivatedRoute, private routerNavigate:Router, protected fotoService:FotoService,
              private authService:AuthService
  ){}

  ngOnInit(): void {

    //obtenemos el id del usuario por medio de la ruta
    this.router.paramMap.subscribe(params=>{
      this.id = params.get('id');
      localStorage.setItem('id',this.id);
    });

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
    this.authService.isSuspendido(idCliente,this.id).then((suspendido)=>{
      if(!suspendido){
        this.routerNavigate.navigate(['dashboard',this.id,'cliente',idCliente, 'informacion']); 
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
        alert(data.message);
        this.empresas.push(data.empresa);
        this.cantidadclientes = this.empresas.length;
      },error: (err)=>{
        alert("hubo un error en el procesamiento de los datos");
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
   
  //dar un valor a la foto
  Foto(url:any,id:any){
    //si no se encontro la foto, no se sobre escribe
    if(this.foto[id]!="icono-foto.png"){
      this.foto[id] = url;
    }
    return this.foto[id];
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

  //mostrarFoto
  private foto:any = [];

  //busqueda
  protected textBuscar:string = "";

}

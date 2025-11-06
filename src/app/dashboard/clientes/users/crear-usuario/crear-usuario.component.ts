import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersComponent } from '../users.component';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { InventarioService } from '../../../../services/inventario/inventario.service';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { AuthService } from '../../../../services/Auth/auth.service';
import { FotoService } from '../../../../services/foto/foto.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crear-usuario',
  standalone: false,
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss'
})
export class CrearUsuarioComponent extends UsersComponent implements OnInit{
  
  constructor(
    routerActive:ActivatedRoute,private inventarioService:InventarioService,
    userService:UsuarioService, authService:AuthService, fotoService:FotoService, location?:Location,){
    super(routerActive, userService, authService, fotoService, undefined,location);
  }

  override ngOnInit(): void {
    this.getActivos("software");
  }

  getActivos(tipoActivo:string){
    this.Mostrar = "agregar"
    this.tipoActivo = tipoActivo;
    this.inventarioService.getActivosDisponibles(this.idCliente, this.tipoActivo).subscribe({
      next:(activosDB:any)=>{
        this.activos = Object.values(activosDB.activos);
      },
      error:(err) => {
        console.log(err.error);
        this.activos = null;
      }
    });
  }

  activosFiltrados(){
    let resultado:any = null;

    if(this.activos!=null){
      const activosIds = this.activos_agregados.map((x: any) => x.id);
      if(this.mostrar=="agregados"){
        resultado = this.activos_agregados;
      }else if(this.mostrar=="agregar"){
        resultado = this.activos.filter((x: any) =>  !activosIds.includes(x.id));
      }
    }
    this.catidad_activos = resultado.length;
    return resultado;
  }

  agregarActivoUsuario(idActivo:string){
    this.activos_agregados.push(...this.activos.filter((x:any)=>x.id==idActivo));
    this.catidad_activos_agregados =  this.activos_agregados.length;
  }
  
  MostrarActivo( ){
    this.mostrar = "agregados"
  }

  eliminarActivo(id:String){
    this.activos_agregados =  this.activos_agregados.filter((x:any)=>x.id!=id);
    this.catidad_activos_agregados =  this.activos_agregados.length;
 
  }

  guardarInformacion(){
    if(this.validarInformacion()){
      this.userService.getNewUser(this.idCliente,this.infUsuario,this.activos_agregados).subscribe({
        next:(data)=> {
          alert("se agrego el nuevo usuario exitosamente")
          this.location?.back()
        },
        error: (err)=> console.log(err)
      })
     
    }else{
      alert("Llene los campos faltantes para poder enviar la informacion");
    }
  }

  validarInformacion(){
    let result = true;
    Object.entries(this.infUsuario).forEach(([key,value])=>{
      if(value=="") result = false;
    })
    return result;
  }

  set Mostrar(value:string){
    this.mostrar = value;
  }

  Cancelar = () => this.location?.back();

  protected activos:any = [];
  protected infUsuario:any = {
    nombre: "",
    direccion: "",
    area:"",
    estado:"activo",
    correo:""
  }

  protected catidad_activos_agregados:number = 0 ;
  protected catidad_activos:number = 0 ;
  protected activos_agregados:any = []
  protected mostrarActivosAgregados:boolean = false;
  protected mostrarTipoActivoAgregado:string = "";
  protected mostrar:string = "";
}

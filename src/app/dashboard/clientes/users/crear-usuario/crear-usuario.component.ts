import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersComponent } from '../users.component';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { InventarioComponent } from '../../inventario/inventario.component';
import { InventarioService } from '../../../../services/inventario/inventario.service';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  standalone: false,
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss'
})
export class CrearUsuarioComponent extends UsersComponent implements OnInit{

  @Output() cerrarVentana = new EventEmitter();
  
  constructor(clienteService:ClienteService,routerActive:ActivatedRoute,private inventarioService:InventarioService, userService:UsuarioService){
    super(clienteService,routerActive, userService);
  }

  override ngOnInit(): void {
    this.getActivos("software");
  }

  getActivos(tipoActivo:string){
    this.tipoActivo = tipoActivo;
    this.inventarioService.getActivosDisponibles(this.idCliente, this.tipoActivo).subscribe({
      next:(activosDB:any)=>{
        this.activos = Object.values(activosDB.activoEnviar);
      },
      error:(err) => console.log(err.error)
    });
  }

  activosFiltrados(mostrar:string){
    const hardwareIds = this.activos_agregados.id_hardware_agregado.map((x: any) => x);
    const softwareIds = this.activos_agregados.id_software_agregado.map((x: any) => x);
    let resultado:any = null;

    if(mostrar=="agregados"){
      resultado = this.activos.filter((x: any) =>
        this.mostrarTipoActivoAgregado=="hardware" ? hardwareIds.includes(x.id) : softwareIds.includes(x.id)
      );

    }else if(mostrar=="agregar"){
      resultado = this.activos.filter((x: any) =>
          !hardwareIds.includes(x.id) && !softwareIds.includes(x.id)
      );
    }
  

    return resultado;
  }

  agregarActivoUsuario(idActivo:string){
    if(this.tipoActivo=="hardware"){
      this.activos_agregados.id_hardware_agregado.push(idActivo);
      this.catidad_activos_agregados.cantidad_hardware_agregado =  this.activos_agregados.id_hardware_agregado.length;
    }else if(this.tipoActivo=="software"){
      this.activos_agregados.id_software_agregado.push(idActivo);
      this.catidad_activos_agregados.cantidad_software_agregado = this.activos_agregados.id_software_agregado.length;
    }
  }
  
  MostrarActivo(tipo:string){
    this.mostrarTipoActivoAgregado=tipo;
    this.mostrarActivosAgregados = !this.mostrarActivosAgregados;
  }

  eliminarActivo(id:String,tipo:string){
    if(tipo=="hardware"){
      this.activos_agregados.id_hardware_agregado =  this.activos_agregados.id_hardware_agregado.filter((x:any)=>{x!=id});
    }else if(tipo=="software"){
      this.activos_agregados.id_software_agregado = this.activos_agregados.id_software_agregado.filter((x:any)=>{x!=id})
    }
  }

  guardarInformacion(){
    if(this.validarInformacion()){
      this.userService.getNewUser(this.idCliente,this.infUsuario,this.activos_agregados).subscribe({
        next:(data)=> {
          alert(data);
          this.cerrarVentana.emit();
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

  Cancelar = () => this.cerrarVentana.emit();

  protected activos:any = [];
  protected infUsuario:any = {
    nombre: "",
    direccion: "",
    area:"",
    estado:"activo",
    correo:""
  }

  protected catidad_activos_agregados:any = {
    cantidad_hardware_agregado:0,
    cantidad_software_agregado: 0
  }

  protected activos_agregados:any = {
    id_hardware_agregado:[],
    id_software_agregado: []
  }

  protected tipoActivo = "";
  protected mostrarActivosAgregados:boolean = false;
  protected mostrarTipoActivoAgregado:string = "";
}

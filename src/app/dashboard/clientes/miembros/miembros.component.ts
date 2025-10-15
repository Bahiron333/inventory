import { Component, Input } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { FotoService } from '../../../services/foto/foto.service';
import { DashboardService } from '../../../services/Dashboard/dashboard.service';
import { AuthService } from '../../../services/Auth/auth.service';
import { ComponenteBase } from '../../../componentBase';

@Component({
  selector: 'app-miembros',
  standalone: false,
  templateUrl: './miembros.component.html',
  styleUrl: './miembros.component.scss'
})
export class MiembrosComponent extends ComponenteBase{
  
  @Input() idMiembro:any = null

  constructor(private clienteService:ClienteService, routeActive:ActivatedRoute, fotoService:FotoService,
    private dashboardService:DashboardService, private authService:AuthService){
    super(routeActive,fotoService)
  }

  ngOnInit(): void {
    
    this.authService.permisosMiembro(this.id,this.idCliente).subscribe({
      next:(data:any)=>{
        this.permisos = data.miembro;
      }, error:(err)=>console.log(err)
    });

    this.clienteService.MiembrosCliente(this.id, this.idCliente).subscribe({
      next:(usuarios:any) => this.miembros = usuarios.miembros,
      error:(err) => console.log(err.error)
    })
  }
 
  
  eliminarMiembro(id:string){
    this.dashboardService.eliminarcliente(id,this.idCliente).subscribe({
      next:(data)=> {
        alert(data.mensaje);
        this.miembros = this.miembros.filter((x:any)=>x.id!=id);
      },
      error:(err)=> console.log(err.error)
    });
  }

  //miembro seleccionado para ver sus propiedades
  IdMimebroSelecionado(id:string):void{
    this.idMimebroSelecionado = id;
    console.log(this.permisos)
    if(this.permisos.rol=="administrador"||this.permisos.permisos[2].modificar){
        this.modificarMiembroVentanaShow = true;
    }else{
      this.modificarMiembroVentanaShow = false;
    }
  }
    
  cerrarVentanaModificarMiembro = () => this.modificarMiembroVentanaShow = false;

  protected miembros:any = [];
  protected idMimebroSelecionado:string = ""; //para pasar los datos al hijo le agregamos el miembro
  protected modificarMiembroVentanaShow:boolean = false; //para mostrar y ocultar la ventana
  protected permisos:any = null;
}

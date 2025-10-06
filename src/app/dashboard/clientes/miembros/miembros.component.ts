import { Component, Input } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { FotoService } from '../../../services/foto/foto.service';

@Component({
  selector: 'app-miembros',
  standalone: false,
  templateUrl: './miembros.component.html',
  styleUrl: './miembros.component.scss'
})
export class MiembrosComponent {
  
  @Input() idMiembro:any = null

  constructor(private clienteService:ClienteService, routeActive:ActivatedRoute, protected fotoService:FotoService){
      routeActive.parent?.paramMap.subscribe(params=>{
        this.id = params.get('id')
        this.idCliente = params.get('idcliente');
    })
  }

  ngOnInit(): void {
    this.clienteService.MiembrosCliente(this.id, this.idCliente).subscribe({
      next:(usuarios:any) => this.miembros = usuarios.miembros,
      error:(err) => console.log(err.error)
    })
  }
 
  trackById = (index:number, user:any) => user.id; //filtra por el id
  
  eliminarMiembro(id:string){
    this.clienteService.deleteMiembro(this.idMiembro,this.idCliente).subscribe({
      next:()=> {
        alert("Miembro eliminado"),
        this.miembros = this.miembros.filter((x:any)=>x.id!=id);
      },
      error:(err)=> console.log(err.error)
    });
  }

  get MiembrosFiltrados(){
    return this.textBuscar != "" ? this.miembros.filter((x:any)=>
      x.id.includes(this.textBuscar) ||
      x.nombre.toLowerCase().includes(this.textBuscar.toLocaleLowerCase()) ||
      x.estado.toLowerCase().includes(this.textBuscar.toLocaleLowerCase()) ||
      x.area.toLowerCase().includes(this.textBuscar.toLocaleLowerCase())
  ) : this.miembros;
}

  //miembro seleccionado para ver sus propiedades
  IdMimebroSelecionado(id:string):void{
    this.idMimebroSelecionado = id;
    this.modificarMiembroVentanaShow = true;
  }
    
  cerrarVentanaModificarMiembro = () => this.modificarMiembroVentanaShow = false;

  
    //dar un valor a la foto
  Foto(url:any){
    //si no se encontro la foto, no se sobre escribe
    if(this.foto!="icono-foto.png"){
      this.foto = url;
    }
    return this.foto;
  }


  protected miembros:any = [];
  protected textBuscar: string = "";
  protected id:any = null;
  protected idCliente:any = null; //id donde se encuentra el cliente
  protected idMimebroSelecionado:string = ""; //para pasar los datos al hijo le agregamos el miembro
  protected modificarMiembroVentanaShow:boolean = false; //para mostrar y ocultar la ventana
  protected foto:any = null;
}

import { Component, Input } from '@angular/core';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-activos',
  standalone: false,
  templateUrl: './lista-activos.component.html',
  styleUrl: './lista-activos.component.scss'
})
export class ListaActivosComponent {

    @Input() tipoActivo:string = "";
    @Input() categoria:string = "";

    constructor(private clienteService:ClienteService, private routeActive:ActivatedRoute){

      routeActive.parent?.paramMap.subscribe(params=>{
        this.idCliente = params.get('idcliente');
    })
    console.log(this.tipoActivo)
  }

  ngOnInit(): void {
    this.clienteService.getActivos(this.idCliente, this.categoria ,this.tipoActivo).subscribe({
      next:(activos:any)=>{
        this.activos = activos.activo;
      },
      error:(err) => console.log(err.error)
    })
  }


  trackById = (index:number, user:any) => user.id; //filtra por el id
  
  eliminarActivo(id:string){

  }

  get activosFiltrados(){
    return this.textBuscar != "" ? this.activos.filter((x:any)=>
      x.id.includes(this.textBuscar) ||
      x.nombre.toLowerCase().includes(this.textBuscar.toLocaleLowerCase()) ||
      x.estado.toLowerCase().includes(this.textBuscar.toLocaleLowerCase()) ||
      x.usuario.toLowerCase().includes(this.textBuscar.toLocaleLowerCase())
  ) : this.activos;
}

  

  protected activos:any = [];
  protected textBuscar: string = "";
  protected idCliente:any = null;
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../services/cliente/cliente.service';

@Component({
  selector: 'app-inventario',
  standalone: false,
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent implements OnInit{

  constructor(private activeRoute:ActivatedRoute, private clienteService:ClienteService){
    activeRoute.parent?.paramMap.subscribe(params=>{
      this.idCliente = params.get('idcliente');
    })
  }

  ngOnInit(): void {
    this.clienteService.Inventario(this.idCliente).subscribe({
      next:(data:any)=>{
        this.hardware = data.hardware;
        this.software = data.software;
        this.mostrarDatos();
      }, error: (err)=> console.log(err.error)
    })
  }

  mostrarDatos(){
    if(this.mostrarHardware){
      this.datos = this.hardware;
    }

    if(this.mostrarSoftware){
      this.datos = this.software;
    }
    console.log(this.datos)
    this.cantidad = this.datos.length;
  }

  cambiarActivos(tipoActivo:string){
    if(tipoActivo=="hardware"){
      this.mostrarSoftware = false;  
      this.mostrarHardware = true; 
    }else if(tipoActivo=="software"){
      this.mostrarSoftware = true;  
      this.mostrarHardware = false;  
    }

    this.mostrarDatos();
  }

  protected cantidad:number = 0;
  protected idCliente:any = null;
  protected hardware:any = [];
  protected software:any = [];

  //esto nos sirve para controlar el flujo de ejecucion
  protected mostrarHardware:boolean = true;
  protected mostrarSoftware:boolean = false;

  //estos son los datos a mostrar de cada uno
  protected datos:any = [];
}

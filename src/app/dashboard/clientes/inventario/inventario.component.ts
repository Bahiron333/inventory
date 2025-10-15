import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { ComponenteBase } from '../../../componentBase';

@Component({
  selector: 'app-inventario',
  standalone: false,
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent extends ComponenteBase implements OnInit{

  constructor(activeRoute:ActivatedRoute, private clienteService:ClienteService,private routers:Router){
    super(activeRoute)
  }

  ngOnInit(): void {
    this.clienteService.Inventario(this.idCliente).subscribe({
      next:(data:any)=>{
        this.hardware = data.hardware;
        this.software = data.software;
        this.CalcularNumeroMinStock(this.hardware);
        this.CalcularNumeroMinStock(this.software);
        this.mostrarDatos();
      }, error: (err)=> console.log(err.error)
    })
  }

  mostrarDatos(){
    if(this.mostrarHardware) this.datos = this.hardware;
    if(this.mostrarSoftware) this.datos = this.software;
    
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

  mostrarInventario(tipo:any,id:any){
    this.mostrarActivos  = !this.mostrarActivos;
    this.categoria = tipo;
    this.id_inventario = id;
    this.mostrarSoftware ? this.tipoActivo = "software" : this.tipoActivo = "hardware";
  }

  CalcularNumeroMinStock(activo:any){
    let numeroAux = 0;
    activo.forEach((element:any) => {
      numeroAux = ((element.numero_minimo_stock * 30) / 100)  + element.numero_minimo_stock;
      if(element.numero_minimo_stock > element.cantidad){
        element["color"] = "activo-red";
      }if(element.cantidad <= numeroAux && element.cantidad > element.numero_minimo_stock || element.numero_minimo_stock == element.cantidad){
        element["color"] = "activo-naranja";
      }if(element.cantidad > numeroAux && element.cantidad > element.numero_minimo_stock){
        element["color"] = "activo-verde";
      }

    });
  }

  navigateCrearActivo(){
    this.routers.navigate(['dashboard',this.id,'cliente', this.idCliente, 'crear-activo'])
    .then(success => console.log(success))
    .catch(err => console.error(err));
  }

  //opciones de cantidad
  protected cantidad:number = 0;
  protected disponible:number = 0;
  protected asignado:number = 0;
  protected hardware:any = [];
  protected software:any = [];

  //esto es el color del contenedor 
  protected color: string = "";

  //esta sesion va para el componente hijo lista inventario 
  protected categoria:any = null;
  protected tipoActivo:any = null;
  protected id_inventario:any = null;

  //esto nos sirve para controlar el flujo de ejecucion
  protected mostrarHardware:boolean = true;
  protected mostrarSoftware:boolean = false;
  protected mostrarActivos:boolean = false;

  //estos son los datos a mostrar de cada uno
  protected datos:any = [];
}

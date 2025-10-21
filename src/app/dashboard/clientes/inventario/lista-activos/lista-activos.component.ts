import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioService } from '../../../../services/inventario/inventario.service';
import { ComponenteBase } from '../../../../componentBase';

@Component({
  selector: 'app-lista-activos',
  standalone: false,
  templateUrl: './lista-activos.component.html',
  styleUrl: './lista-activos.component.scss'
})
export class ListaActivosComponent extends ComponenteBase{

    @Input() tipoActivo:string = "";
    @Input() categoria:string = "";
    @Input() id_inventario:string = "";

    constructor(private inventarioService:InventarioService, routeActive:ActivatedRoute, private routers:Router){
      super(routeActive)
  }

  ngOnInit(): void {

    this.inventarioService.getCamposAdicionales(this.categoria).subscribe({
      next:(camposAdicional:any)=>{
        this.camposAdicionales = camposAdicional;
        Object.entries(this.camposAdicionales).forEach(([key,value]:[string,any])=>{
           if (!this.campoAdicionalNuevoValor[value.nombre]&&value.multiple_valor) {
              if(value.multiple_valor){
                this.campoAdicionalNuevoValor[value.nombre] = []; // inicializa como array 
              }else{
                this.campoAdicionalNuevoValor[value.nombre] = [""]; // inicializa como array 
              }
            }
        })
      },
      error:(err) => console.log(err.error)
    });

    this.obtenerActivos();
  }
  
  eliminarActivo(id:string){
    this.inventarioService.deleteActivo(this.idCliente,id).subscribe({
      next:(mensaje:any)=>{
        alert(mensaje);
        this.obtenerActivos();
      },
      error:(err) => console.log(err.error)
    });
  }

  set CrearActivo(valor:boolean){
    this.crearActivo = valor;
  }

  agregarValor(nombre:string,valor:any){
    if(valor!=""){ 
      this.campoAdicionalNuevoValor[nombre].push(valor);
      this.contador[nombre] = this.campoAdicionalNuevoValor[nombre].length;
    }
  }

  guardar(){
    if(this.comprobarValor()){
        this.activosEnviar["nombre"] = this.nombre;
        this.activosEnviar["estado"] = this.estado;
        this.activosEnviar["cantidad_usuarios"] = this.cantidad_usuarios;
        this.activosEnviar["campos_adicionales"] = this.campoAdicionalNuevoValor
        this.inventarioService.NewActivo(this.idCliente,this.id_inventario,this.activosEnviar).subscribe({
          next:(data:any)=>{
            console.log(data.menssage);
            this.obtenerActivos();
            this.crearActivo = false;
          },
          error:(err) => console.log(err.error)
        });
        
    }else{
      alert("por favor rellenar todos los campos antes de guardarlos en el inventario");
    }
    this.contadorCamposVacios=0;
  }

  comprobarValor():Boolean{
      
    Object.entries(this.campoAdicionalNuevoValor).forEach(([key,value]:[string,any])=>{
      if(this.campoAdicionalNuevoValor[key].length<=0){
        this.contadorCamposVacios++;
      }
    });

    if(this.nombre=="") this.contadorCamposVacios++;
    return this.contadorCamposVacios == 0;
  }

  cancelar = () => this.crearActivo=false; //cerrar ventana

  obtenerActivos(){

    this.inventarioService.getActivos(this.idCliente, this.id_inventario).subscribe({
      next:(activosDB:any)=>{
        console.log(activosDB)
        this.activos = Object.values(activosDB.activo);
      },
      error:(err) => console.log(err.error)
    });
  }

  navigateVerActivo(id:any){
    this.routers.navigate(['dashboard',this.id,'cliente', this.idCliente, this.id_inventario, 'ver-activo', id])
    .then(success => console.log(success))
    .catch(err => console.error(err));
  }

  protected activos:any[] = []; 
  protected camposAdicionales:any = null;
  //elementos a enviar al servidor
  protected nombre: string ="";
  protected estado:string = "activo";
  protected activosEnviar:any = {};
  protected cantidad_usuarios:number = 1;
  //nuevos campos
  protected campoAdicionalNuevoValor:any = {};
  protected contador:any = [];
  protected contadorCamposVacios = 0;
  //variables controladoras de flujo
  protected crearActivo:boolean=false;
  protected VerActivo:boolean=true;
}

import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

    constructor(private inventarioService:InventarioService, routeActive:ActivatedRoute){
      super(routeActive)
  }

  ngOnInit(): void {

    this.inventarioService.getActivos(this.idCliente, this.categoria ,this.tipoActivo).subscribe({
      next:(activos:any)=>{
        this.activos = activos.activo
      },
      error:(err) => console.log(err.error)
    });

    this.inventarioService.getCamposAdicionales(this.idCliente, this.categoria).subscribe({
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
    })
  }
  
  eliminarActivo(id:string){

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
        Object.entries(this.campoAdicionalNuevoValor).forEach(([key,value]:[string,any])=>{
          this.activosEnviar[key]=value;
        });
        this.activosEnviar["nombre"] = this.nombre;
        this.activosEnviar["estado"] = this.estado;
        this.inventarioService.NewActivo(this.idCliente,this.id_inventario,this.activosEnviar).subscribe({
          next:(data:any)=>console.log(data.menssage),
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

  protected activos:any = null; 
  protected camposAdicionales:any = null;
  //elementos a enviar al servidor
  protected nombre: string ="";
  protected estado:string = "activo";
  protected activosEnviar:any = {};
  //nuevos campos
  protected campoAdicionalNuevoValor:any = {};
  protected contador:any = [];
  protected contadorCamposVacios = 0;
  //variables controladoras de flujo
  protected crearActivo:boolean=false;
  protected VerActivo:boolean=true;
}

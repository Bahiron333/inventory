import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../../../services/inventario/inventario.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crear-activo',
  standalone: false,
  templateUrl: './crear-activo.component.html',
  styleUrl: './crear-activo.component.scss'
})
export class CrearActivoComponent implements OnInit{

  constructor(private inventarioService:InventarioService, private activeRoute:ActivatedRoute, private location:Location){}

  ngOnInit(): void {
    this.activeRoute.parent?.paramMap.subscribe(params=>{
      this.idEmpresa = params.get('idcliente');
       this.id = params.get('id');
    });
  }

  agregarCampo(){
    if(this.valorCampo!=""){
      this.activo.campos_adicionales.push({
        "valorCampo" : this.valorCampo,
      });
    }
  }

  EnviarInformacion(){
    if(this.activo.nombre!=""){
      this.inventarioService.getNewActivo(this.idEmpresa,this.activo).subscribe({
       next:(data)=>{alert(data.menssage);this.location.back()},
       error: (err)=>console.log(err.error)})
    }else{
      alert("agrege un nombre al activo")
    }
  }

  Cancelar = () =>this.location.back();

  CamposAdicionales():any{
    return this.activo.campos_adicionales;
  }

  
  Volver = () =>this.location?.back();
  
  //variables para la foto 
  protected activo:any = {
    nombre:"",
    tipo:"hardware",
    cantidad:0,
    numero_minimo_stock:1,
    estado:"activo",
    campos_adicionales: []
  }

  protected valorCampo:string = "";
  protected idEmpresa:any=null;
  protected id:any=null;
}

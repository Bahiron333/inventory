import { Component, OnInit } from '@angular/core';
import { ComponenteBase } from '../../../../componentBase';
import { InventarioService } from '../../../../services/inventario/inventario.service';
import { ActivatedRoute } from '@angular/router';
import { UsersComponent } from '../../users/users.component';
import { ClienteService } from '../../../../services/cliente/cliente.service';

@Component({
  selector: 'app-ver-activo',
  standalone: false,
  templateUrl: './ver-activo.component.html',
  styleUrl: './ver-activo.component.scss'
})
export class VerActivoComponent extends ComponenteBase implements OnInit{

  constructor(private inventarioService:InventarioService, router:ActivatedRoute){
    super(router);
  }

  ngOnInit(): void {
       
    this.router?.paramMap.subscribe(params=>{
       this.idActivo = params.get('idActivo');
    });

    this.inventarioService.getActivo(this.idCliente,this.idActivo).subscribe({
        next:(activo:any)=>{
          this.activo = activo.activoEnviar;
          Object.entries( this.activo.campos_adicionales[0]).forEach(([key,value])=>{
              this.camposAdicionales.push({
                nombre: key,
                valor: value
              });
          });
        },
        error:(err) => console.log(err.error)
    });

  }

  protected activo:any = null;
  protected idActivo:any = null;
  protected camposAdicionales:any = [];

  //usuarios 
  protected userAgregados:number = 0;
  protected users:any = null;
  
}

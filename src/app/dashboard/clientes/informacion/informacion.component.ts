import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { FotoService } from '../../../services/foto/foto.service';
import { ComponenteBase } from '../../../componentBase';

@Component({
  selector: 'app-informacion',
  standalone: false,
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.scss'
})
export class InformacionComponent extends ComponenteBase implements OnInit {

  constructor(private clienteService:ClienteService,routerActive:ActivatedRoute, fotoService:FotoService){
    super(routerActive,fotoService)
  }

  ngOnInit(): void {
    
    //accede a las rutas de las variables del padre y del hijo
    this.router?.parent?.paramMap.subscribe(params=>{
      //obtenemos los datos de la ruta url
      this.id=params.get('id');
      this.idCliente = params.get('idcliente');
      //llamamos al servicio para obtener los datos del servidor
      this.clienteService.InformacionCliente(this.id,this.idCliente).subscribe({
      next: (data:any)=>{
        this.dataInformacion = data.cliente;
        this.roleUSer = data.userRole; 
      }, error: err => console.log(err.error)
    })
    }) 

  }
 
  protected dataInformacion: any = null;
  protected roleUSer:any = null;
   
}

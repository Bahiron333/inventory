import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-informacion',
  standalone: false,
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.scss'
})
export class InformacionComponent implements OnInit {

  constructor(private clienteService:ClienteService, private routerActive:ActivatedRoute){
  }

  ngOnInit(): void {
    
    let id:any = null;
    let idCliente:any = null;

    //accede a las rutas de las variables del padre y del hijo
    this.routerActive.parent?.paramMap.subscribe(params=>{
      //obtenemos los datos de la ruta url
      id=params.get('id');
      idCliente = params.get('idcliente');
      //llamamos al servicio para obtener los datos del servidor
      this.clienteService.InformacionCliente(id,idCliente).subscribe({
      next: (data:any)=>{
        this.dataInformacion = data.cliente;
        console.log(data.cliente);
      }, error: err => console.log(err.error)
    })
    }) 

  }
  protected dataInformacion: any = null;
}

import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { FotoService } from '../../../services/foto/foto.service';

@Component({
  selector: 'app-informacion',
  standalone: false,
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.scss'
})
export class InformacionComponent implements OnInit {

  constructor(private clienteService:ClienteService, private routerActive:ActivatedRoute, protected fotoService:FotoService){
  }

  ngOnInit(): void {
    
    let id:any = null;

    //accede a las rutas de las variables del padre y del hijo
    this.routerActive.parent?.paramMap.subscribe(params=>{
      //obtenemos los datos de la ruta url
      id=params.get('id');
      this.idCliente = params.get('idcliente');
      //llamamos al servicio para obtener los datos del servidor
      this.clienteService.InformacionCliente(id,this.idCliente).subscribe({
      next: (data:any)=>{
        this.dataInformacion = data.cliente;
        this.roleUSer = data.userRole;
      }, error: err => console.log(err.error)
    })
    }) 

  }

    //dar un valor a la foto
  Foto(url:any){
    //si no se encontro la foto, no se sobre escribe
    if(this.foto!="icono-foto.png"){
      this.foto = url;
    }
    return this.foto;
  }

  protected dataInformacion: any = null;
  protected foto:string = "";
  protected idCliente:any;
  protected roleUSer:any = null;
}

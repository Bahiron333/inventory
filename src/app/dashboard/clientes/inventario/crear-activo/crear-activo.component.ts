import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-activo',
  standalone: false,
  templateUrl: './crear-activo.component.html',
  styleUrl: './crear-activo.component.scss'
})
export class CrearActivoComponent implements OnInit{

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.formActivo = this.fb.group({
        nombre:['',Validators.required],
        tipo: ['',Validators.required],
        numeroMinimoStock: ['',Validators.required],
    });
  }

  mostrarImagen(event:any){
    //de toda la lista de archivo seleccionamos el primero
    const file:File = event.target.files[0];

    //si se seleciono algun archivo 
    if(file){
        if(!file.type.startsWith('image/')){
          alert("Archivo no valido");
          return;
        }
    }

    //guardamos el archivo 
    this.foto = file;

    //convertimos la foto en url para que pueda ser mstrada
    const reader = new FileReader;
    reader.onload = e => this.vistaImagen = reader.result; //lee el archivo
    reader.readAsDataURL(this.foto); //convierte el archivo en una url
  }

  protected formActivo:any = null;

  //variables para la foto 
  protected foto:any = null;
  protected vistaImagen: string | ArrayBuffer | null = "icono-foto.png";
}

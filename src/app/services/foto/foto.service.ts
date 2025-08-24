import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  constructor() { }

    
  subirImagen(event:any){
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
    return this.foto;     
  }
  
  private foto: any;
}

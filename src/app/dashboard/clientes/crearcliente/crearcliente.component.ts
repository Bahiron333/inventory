import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../../services/Dashboard/dashboard.service';
import { FotoService } from '../../../services/foto/foto.service';
import { buffer } from 'rxjs';

@Component({
  selector: 'app-crearcliente',
  standalone: false,
  templateUrl: './crearcliente.component.html',
  styleUrl: './crearcliente.component.scss'
})
export class CrearclienteComponent implements OnInit{

  constructor(private activeRouter:ActivatedRoute, private fb:FormBuilder, private routerNavigate:Router, 
    private dasboardService:DashboardService, private fotoService:FotoService){

    this.formCrearcliente = fb.group({
      nombre:['',Validators.required],
      descripcion: ['',Validators.required],
      direccion: ['',Validators.required],
      correo: ['',[Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/)]],
      numero: ['',[Validators.required,Validators.minLength(10),Validators.pattern(/^[0-9]+$/)]]
    })
  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((params)=>{
      this.idUser = params.get('id');
    })
  }

  AgregarCliente(){ 
    if(this.formCrearcliente?.valid){
      this.dasboardService.createCliente(this.formCrearcliente.value,this.idUser).subscribe({
        next:(data)=>{
          alert("El cliente se creo exitosamente");
          this.routerNavigate.navigate(['dashboard',this.idUser]);  
        }, 
        error: (err)=> console.log(err)
      })
    }else{ 
      alert("Corriga los errores antes de enviar el formulario")
      Object.keys(this.formCrearcliente.controls).forEach(key=>{
         const campo = this.formCrearcliente.get(key);  
         if(campo?.invalid && campo){
            this.campoErrores[key] = true;
         }else{
            this.campoErrores[key] = false;
         }
      });
    }
  }

  Cancelar(){
    this.routerNavigate.navigate(['dashboard',this.idUser]);
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

  protected idUser:any = "";
  protected formCrearcliente:any = "";
  protected foto:any = null;
  protected vistaImagen: string | ArrayBuffer | null = "icono-foto.png";
  protected campoErrores:any = {
      nombre: false,
      descripcion: false,
      direccion: false,
      correo: false,
      numero: false,
      representante: this.idUser,
      fecha_asociacion: new Date().toLocaleDateString()
  }
}

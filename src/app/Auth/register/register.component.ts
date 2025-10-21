import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { FotoService } from '../../services/foto/foto.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  constructor(private router:Router, private fb:FormBuilder, private Auth:AuthService, private fotoService:FotoService){
     //formulario de registro
    this.register = fb.group({
      nombre: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
      direccion: [''],
      telefono: ['',[Validators.minLength(10),Validators.pattern(/^[0-9]+$/)]],
      password: ['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*+-._#@%&$!]).{8,}$/)]],
      confirmPassword: ['',Validators.required],    
    })

    //formulario de correo
    this.cuenta = fb.group({
      correo: ['',[Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/)]],
      codigo:['',Validators.required]
    })
  }

  Cancelar(){
    this.router.navigate(['auth/login'])
  }

  //metodo para registro
  Registrarse(){
    //valida los datos antes de enviar
    if(this.validarInformacion()){
      this.enviarInformacionServidor(this.guardarInfomacion());
    }else{
      alert("Corriga los errores antes de enviar los datos");
    }
  }

  guardarInfomacion(){
      //guardamos la informacion
      this.data = {
        nombre: this.register.get('nombre')?.value,
        correo:this.cuenta.get('correo')?.value,
        direccion:this.register.get('direccion')?.value,
        telefono:this.register.get('telefono')?.value,
        password: this.register.get('password')?.value
      }

      const guardarArchivo = new FormData();

      guardarArchivo.append('nombre',this.data.nombre);
      guardarArchivo.append('correo',this.data.correo);
      guardarArchivo.append('direccion',this.data.direccion);
      guardarArchivo.append('telefono',this.data.telefono);
      guardarArchivo.append('password',this.data.password);
      guardarArchivo.append('foto',this.foto);

      return guardarArchivo;
  }

  enviarInformacionServidor(datos:any){
    for (let pair of datos.entries()) {
  console.log(pair[0] + ':', pair[1]);
}
      this.Auth.Register(datos).subscribe({
        next:()=>{
          console.log("datos enviados exitosamente");
          this.router.navigate(['login']);
        },
        error:(err)=>{
          alert("Error al enviar los datos");
          console.log(err)
        }
      })
  }

  validarInformacion(){

    //error nombre
    this.register.get('nombre')?.invalid  ? this.errorNombre = true : this.errorNombre = false;
    //error telefono   
    this.register.get('telefono')?.invalid ? this.errorTelefono = true : this.errorTelefono = false;
    //error password
    this.register.get('password')?.invalid ? this.errorPassword = true : this.errorPassword = false;
    //error contraseñas iguales
    this.register.get('confirmPassword')?.value != this.register.get('password')?.value ? this.errorConfirmPassword = true : this.errorConfirmPassword = false;

    return !this.register.invalid && this.register.get('confirmPassword')?.value == this.register.get('password')?.value;
  }

  //combrobar que el correo sea valido
  validarCorreo(){
    if(this.cuenta.get('correo')?.invalid){
      this.errorCorreo = true;
      this.mostrarCodigo = false; 
    }else{
      this.Auth.codigo(this.cuenta.get('correo')?.value).subscribe({
        next: ()=>{
          this.errorCorreo = false;   
          this.mostrarCodigo = true;  
        }, error: ()=>{
          this.errorMensajeCorreo = "Este correo ya existe";
        }
      })
    }
  }

  validarCodigo(){
     this.Auth.verificarCodigo(this.cuenta.get('codigo')?.value,this.cuenta.get('correo')?.value).subscribe({
      next:(data:any)=>{
        this.EstadoBotonRegistro = data.permiso;
      },
      error:()=>{
        this.EstadoBotonRegistro = false;
        console.log("Error al validar codigo")
      }
     })
  }
  
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
    //convertimos la foto en url para que pueda ser mstrada
    const reader = new FileReader;
    reader.onload = e => this.vistaImagen = reader.result; //lee el archivo
    reader.readAsDataURL(this.foto); //convierte el archivo en una url

  }

  //informacion
  protected nombre:string = "";
  protected direccion:string = "";
  protected telefono:string = "";

  //contraseña
  protected password:string = "";
  protected confirmPassword:string = "";

  //correo
  protected correo:string  = "";
  protected codigo:string = "";

   //registro de formularios
  public register:FormGroup;
  public cuenta:FormGroup;
 
  //foto
  protected foto:any;
  protected vistaImagen: string | ArrayBuffer | null = "icono-foto.png";

  //controladores de errores 
  protected errorNombre:boolean = false;
  protected errorTelefono:boolean = false;
  protected errorPassword:boolean = false;
  protected errorConfirmPassword:boolean = false;

  //validacion de correo
  protected mostrarCodigo:boolean = false;
  protected errorMensajeCorreo:String = "";
  protected errorCorreo:boolean = false;
  protected correoValido:boolean = false; //verifica que el correo ya no este registrado 

  //desactivar boton de registro true:Desactivado false:Activado
  protected EstadoBotonRegistro:boolean = false;

  //informacion para enviar al backend
  protected data:any = {
    nombre:'',
    correo:'',
    direccion:'',
    telefono:'',
    password:'',
    foto:null
  }

}

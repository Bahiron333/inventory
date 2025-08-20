import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  constructor(private router:Router, private fb:FormBuilder, private Auth:AuthService){
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
      correo: ['',Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/)],
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
      this.mensaje=""
    }else{
      this.mensaje="Corriga los errores antes de enviar los datos"
    }
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
        next: (data)=>{
          this.codigo = data;
          this.errorCorreo = false;   
          this.mostrarCodigo = true;
          console.log(this.codigo)
          this.mensaje = "";
        }, error: (err)=>{
          this.errorMensajeCorreo = err.error;
        }
      })
    }
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

    const reader = new FileReader();
    reader.onload = e => this.vistaImagen = reader.result;
    reader.readAsDataURL(file);
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

  //mensaje de error
  protected mensaje:string = "";

  //desactivar boton de registro true:Desactivado false:Activado
  protected EstadoBotonRegistro:boolean = true;

}

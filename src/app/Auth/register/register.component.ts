import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  constructor(private router:Router, private fb:FormBuilder){
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
      this.errorCorreo = false;
      this.mostrarCodigo = true; 
    }
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

  //controladores de errores 
  protected errorNombre:boolean = false;
  protected errorTelefono:boolean = false;
  protected errorPassword:boolean = false;
  protected errorConfirmPassword:boolean = false;

  //validacion de correo
  protected mostrarCodigo:boolean = false;
  protected errorCorreo:boolean = false;

  //mensaje de error
  protected mensaje:string = "";

}

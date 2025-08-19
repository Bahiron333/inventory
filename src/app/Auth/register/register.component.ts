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
    console.log(this.register.value);
    this.validarInformacion();
  }

  validarInformacion(){
    if(this.register.get('nombre')?.invalid){
      this.errorNombre = true;
      return false;
    }if(this.register.get('telefono')?.invalid){
      this.errorDireccion = true;
      return false;
    }if(this.register.get('password')?.invalid){
      this.errorPassword = true;
      return false;
    }if(this.register.get('confirmPassword')?.value != this.register.get('password')?.value){
        this.errorPassword = true;
        this.errorConfirmPassword = true;
      return false;
    }
    return true;
  }

  //combrobar que el correo sea valido
  validarCorreo(){
    if(this.cuenta.get('correo')?.invalid){
      this.errorCorreo = true;
      return false;
    }else{
      return true;
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
  protected errorDireccion:boolean = false;
  protected errorPassword:boolean = false;
  protected errorConfirmPassword:boolean = false;
  protected errorCorreo:boolean = false;

}

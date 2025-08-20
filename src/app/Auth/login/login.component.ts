import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Output() sesionIniciada = new EventEmitter<boolean>
  
  constructor(private router:Router, private auth:AuthService, private fb:FormBuilder){

    this.login = fb.group({
      correo: ['', Validators.required],
      password: ['',Validators.required]
    })
  }

  //inicia sesion y guarda el token
  RedirigirDashboard(){
    this.auth.Login(this.login.get('correo')?.value, this.login.get('password')?.value).subscribe({
      next: (data)=>{
        localStorage.setItem('token',data.token);
        this.sesionIniciada.emit(true);
        this.router.navigate(['dashboard']);
        this.mensaje="";
      },
      error: ()=>{
        this.mensaje = "El correo o las credenciales son incorrectas";
      }
    })
    
  }

  RedirigirRegister(){
    this.router.navigate(['auth/register']);
  }

  protected login:FormGroup;
  protected mensaje: string = "";
}

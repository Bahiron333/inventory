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
        console.log(data)
        localStorage.setItem('token',data.token);
        localStorage.setItem('id',data.user.user_id)
        this.router.navigate(['dashboard',data.user.user_id]);
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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router:Router, private auth:AuthService){

  }

  //inicia sesion y guarda el token
  RedirigirDashboard(){
    this.auth.Login(this.correo, this.password).subscribe({
      next: (data)=>{
        localStorage.setItem('token',data.token);
      },
      error: (err)=>{
        this.mensaje = err.error;
      }
    })
    this.router.navigate(['dashboard']);
  }

  RedirigirRegister(){
    this.router.navigate(['auth/register']);
  }
  protected correo: string = "";
  protected password: string = "";
  protected mensaje: string = "";
}

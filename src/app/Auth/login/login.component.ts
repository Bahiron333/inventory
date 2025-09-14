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
   
  constructor(private router: Router, private auth: AuthService, private fb: FormBuilder) {

    this.login = fb.group({
     correo: ['', [Validators.required, Validators.email]],
     contrasena: ['', Validators.required]
    });
  }

  // inicia sesión y guarda info del cliente
  RedirigirDashboard() {
    const correo = this.login.get('correo')?.value;
    const contrasena = this.login.get('contrasena')?.value;

    if (!correo || !contrasena) {
      this.mensaje = "Por favor completa todos los campos";
      return;
    }

    this.auth.Login(correo, contrasena).subscribe({
      next: (data) => {
        if (data.success) {
          // Guardamos info del cliente en localStorage
          localStorage.setItem('cliente', JSON.stringify(data.cliente));

          // Redirigimos a dashboard, puedes usar data.cliente.clienteid si lo necesitas
          this.router.navigate(['dashboard']);
          this.mensaje = "";
        } else {
          this.mensaje = data.error || "Correo o contraseña incorrectos";
        }
      },
      error: (err) => {
  console.error(err);

  if (err.status === 0) {
    // No hay conexión con el backend
    this.mensaje = "No se puede conectar con el servidor. ¿Está corriendo?";
  } else if (err.status === 401 || err.status === 404) {
    // Credenciales incorrectas o usuario no encontrado
    this.mensaje = "Correo o contraseña incorrectos";
  } else {
    // Otros errores
    this.mensaje = "Ocurrió un error inesperado";
  }
}
    });
  }

  // Registro: se mantiene igual
  RedirigirRegister() {
    this.router.navigate(['auth/register']);
  }

  protected login: FormGroup;
  protected mensaje: string = "";
}


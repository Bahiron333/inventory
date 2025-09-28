import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // 🔑 Login (el componente lo llama como "Login")
  Login(correo: string, contrasena: string): Observable<any> {
    const data = { correo, contrasena };
    return this.http.post(`${this.apiUrl}/auth/login`, { data });
  }

  Register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, { data });
  }

  // 📩 Enviar código (el componente lo llama como "codigo")
  codigo(correo: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/enviar-codigo`, { correo });
  }

  // ✅ Verificar código (el componente lo llama con un solo argumento: codigo)
  verificarCodigo(codigo: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register/codigo/verificar`, { codigo });
  }
}

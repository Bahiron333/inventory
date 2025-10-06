import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http:HttpClient) { }

  Login(correo:string, password:string):Observable<any>{
    return this.http.post<any>('http://localhost:3000/auth/login',{correo,password});
  }

  //servicios de registro
  Register(data:FormData):Observable<any>{
    return this.http.post<any>('http://localhost:3000/auth/register',data);
  }

  //enviamos correo y el backend realiza la comprobacion
  codigo(correo:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/auth/register/codigo',{correo});
  }

  //codigo verificacion
  verificarCodigo(codigo:string,correo:String):Observable<boolean>{
    return this.http.post<any>('http://localhost:3000/auth/register/codigo/verificar',{codigo, correo});
  }
}

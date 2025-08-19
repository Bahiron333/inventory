import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http:HttpClient) { }

  Login(correo:string, password:string):Observable<any>{
    const data = {correo,password};
    return this.http.post('http//localhost:3000/auth/login',data);
  }

  Register(data:any):Observable<any>{
    return this.http.post<any>('http//localhost:3000/auth/register',data);
  }
}

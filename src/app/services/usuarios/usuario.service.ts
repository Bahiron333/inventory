import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 
  constructor(private http:HttpClient) {
      this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
   }

  getNewUser(idCliente:string, infUsuario:any, activosAgregados:any):Observable<any>{
    return this.http.post(`http://localhost:3000/cliente/${idCliente}/user/crear`,{infUsuario,activosAgregados},{headers: this.headers});
  }

  UserCliente(id:string,idCliente:string):Observable<any>{
    return this.http.get(`http://localhost:3000/user/${id}/cliente/${idCliente}/users`,{headers: this.headers});
  }
  
  private headers:any = null;
  private token = localStorage.getItem('token');
}

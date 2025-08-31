import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { 
     this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }

  InformacionCliente(id:string,idCliente:string):Observable<any>{
    return this.http.get(`http://localhost:3000/user/${id}/cliente/${idCliente}/informacion`,{headers: this.headers});
  }

  UserCliente(id:string,idCliente:string):Observable<any>{
    return this.http.get(`http://localhost:3000/user/${id}/cliente/${idCliente}/users`,{headers: this.headers});
  }

  MiembrosCliente(id:string,idCliente:string):Observable<any>{
    return this.http.get(`http://localhost:3000/user/${id}/cliente/${idCliente}/miembros`,{headers: this.headers});
  }

  //esta sesion es para la modificacion, eliminacion o creacion del miembro
  miebroCliente(idMiembro:string, idCliente:string){
    return this.http.get(`http://localhost:3000/cliente/${idCliente}/miembro/${idMiembro}`,{headers: this.headers});
  }

  updateMiembro(miembro:any, idCliente:string){
    return this.http.put(`http://localhost:3000/cliente/${idCliente}/miembro`,{miembro},{headers: this.headers});
  }

  deleteMiembro(id_miembro:any, idCliente:string){
      return this.http.delete(`http://localhost:3000/cliente/${idCliente}/miembro/${id_miembro}`,{headers: this.headers});
  }

  private headers:any = null;
  private token = localStorage.getItem('token');
}

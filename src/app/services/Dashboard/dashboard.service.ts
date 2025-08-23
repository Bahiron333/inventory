import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { 
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }

  informacionClientes(idUser:string):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/clientes/${idUser}`,{headers: this.headers})
  }

  eliminarcliente(idUser:string,idcliente:string):Observable<any>{
    return this.http.delete(`http://localhost:3000/clientes/${idUser}`,{
      headers:this.headers,
      body: {
        id_cliente: idcliente
      }
    });
  }

  private token = localStorage.getItem('token')?.toString();
  private headers:any;
}

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

  unirseCliente(codigo:string, idUser:string):Observable<any>{
    return this.http.put(`http://localhost:3000/clientes/unirse/${idUser}`,{codigo},{headers:this.headers});
  }

  
  createCliente(dataCliente:any,idUser:string):Observable<any>{
    return this.http.post(`http://localhost:3000/clientes/create/${idUser}`,{dataCliente},{
      headers: this.headers
    })
  }
  
  private token = localStorage.getItem('token')?.toString();
  private headers:any;
}

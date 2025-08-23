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

  private token = localStorage.getItem('token')?.toString();
  private headers:any;
}

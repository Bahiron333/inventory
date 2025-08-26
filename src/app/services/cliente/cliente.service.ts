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

  private headers:any = null;
  private token = localStorage.getItem('token');
}

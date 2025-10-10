import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http:HttpClient) {
      this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
   }

  getNewActivo(idCliente:string, activo:any):Observable<any>{
    return this.http.post(`http://localhost:3000/cliente/${idCliente}/inventario/crearInventario`,{activo},{headers: this.headers});
  }

  private headers:any = null;
  private token = localStorage.getItem('token');
}

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
  
  NewActivo(idCliente:string, idInventario:string,newActivo:any):Observable<any>{
    const activo = JSON.stringify(newActivo);
    return this.http.post<any>(`http://localhost:3000/${idCliente}/inventario/${idInventario}/crear_activo`,{activo:activo},{headers: this.headers});
  }

  //esta sesion es para los activos 
  getActivos(idCliente:string, categoria:string):Observable<any>{
    return this.http.get(`http://localhost:3000/cliente/${idCliente}/inventario/${categoria}`,{headers: this.headers});
  }

  getCamposAdicionales(categoria:string):Observable<any>{
    return this.http.get(`http://localhost:3000/inventario/${categoria}/camposAdicionales`,{headers: this.headers});
  }

  deleteActivo(idCliente:string, id:string):Observable<any>{
    return this.http.delete(`http://localhost:3000/${idCliente}/activo/${id}`,{headers: this.headers});
  }

  getActivo(idCliente:string, id:string):Observable<any>{
    return this.http.get(`http://localhost:3000/${idCliente}/activo/${id}`,{headers: this.headers});
  }

  
  getActivosDisponibles(idCliente:string, tipo:string):Observable<any>{
    return this.http.get(`http://localhost:3000/${idCliente}/activos/${tipo}`,{headers: this.headers});
  }
  
  private headers:any = null;
  private token = localStorage.getItem('token');
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient, private heard:HttpHeaders) { 
     this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }

  private headers:any = null;
  private token = localStorage.getItem('token');
}

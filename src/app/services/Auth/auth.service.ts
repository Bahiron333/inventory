import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    constructor(private http:HttpClient) { 
     this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }

  Login(correo:string, password:string):Observable<any>{
    return this.http.post<any>('http://localhost:3000/auth/login',{correo,password});
  }

  //servicios de registro
  Register(data:FormData):Observable<any>{
    return this.http.post<any>('http://localhost:3000/auth/register',data);
  }

  //enviamos correo y el backend realiza la comprobacion
  codigo(correo:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/auth/register/codigo',{correo});
  }

  //codigo verificacion
  verificarCodigo(codigo:string,correo:String):Observable<boolean>{
    return this.http.post<any>('http://localhost:3000/auth/register/codigo/verificar',{codigo, correo});
  }

  permisosMiembro(id:string,idCliente:String):Observable<boolean>{
    return this.http.get<any>(`http://localhost:3000/cliente/${idCliente}/miembros/${id}/permisos`,{headers:this.headers});
  }

  infoUsuario(id:string):Observable<boolean>{
    return this.http.get<any>(`http://localhost:3000/user/informacion/${id}`,{headers:this.headers});
  }

  PermisosCuenta(id:string,idCliente:string){ 
        this.permisosMiembro(id,idCliente).subscribe({
            next:(data:any)=>{
              localStorage.setItem('permisos',JSON.stringify(data.miembro.permisos));
              localStorage.setItem('suspendido',data.miembro.suspendido);
            }, error:(err)=>{
              console.log(err);
            }
        });
    }

  isLogin():boolean{
    const isLogin = !! localStorage.getItem('token') && 
                      localStorage.getItem('token') != null &&
                      localStorage.getItem('token') != ""

    return isLogin;
  }

  suspendido():any{
    return localStorage.getItem('suspendido');
  }

  getPermisos(){
      let permisosUsuario:any =  localStorage.getItem('permisos');
      permisosUsuario = JSON.parse(permisosUsuario);
      return permisosUsuario;
  }

   async isSuspendido(idCliente:string,idUser:string):Promise<boolean>{
    try{
      const data:any = await firstValueFrom(this.permisosMiembro(idUser,idCliente));
      localStorage.setItem('suspendido',data.miembro.suspendido);
      return data.miembro.suspendido;
    }catch(err){
      console.log(err);
      return false;
    }   
 
  }
  private headers:any = null;
  private token = localStorage.getItem('token');
  
}

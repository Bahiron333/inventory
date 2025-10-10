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
    return this.http.get<any>(`http://localhost:3000/cliente/${idCliente}/miembro/${id}/permisos`,{headers:this.headers});
  }

  infoUsuario(id:string):Observable<boolean>{
    return this.http.get<any>(`http://localhost:3000/user/informacion/${id}`,{headers:this.headers});
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

  guardarPermisosLocal(idCliente:string,idUser:string){
    this.permisosMiembro(idUser,idCliente).subscribe({
      next:(data:any)=>{
        console.log(data.miembro.permisos[0].ver)
        localStorage.setItem('permisosUsuario',data.miembro.permisos[0].ver);
         localStorage.setItem('permisosInventario',data.miembro.permisos[1].ver);
          localStorage.setItem('permisosMiembro',data.miembro.permisos[2].ver);
      },error: (err)=>{
        console.log("Error en guardar los datos");
        console.log(err)
      }
    })
  } 

  isLogin():boolean{
    const isLogin = !! localStorage.getItem('token') && 
                      localStorage.getItem('token') != null &&
                      localStorage.getItem('token') != ""

    return isLogin;
  }

  private headers:any = null;
  private token = localStorage.getItem('token');
}

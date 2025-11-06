import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from './services/Auth/auth.service';
import { FotoService } from './services/foto/foto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{

  @ViewChild('contentCerrarSesion') contentCerrarSesion!: ElementRef;
  
  constructor(private elementRef:ElementRef, private router:Router, protected auth:AuthService,  protected fotoService:FotoService){}

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.auth.infoUsuario(this.id).subscribe({
      next:(data:any)=>{
        this.nombreUser = data.envio_user.nombre;
        this.correoElectronico = data.envio_user.correo;
      }, error: (err) => {
        console.log("error en recibir la informacion del usuario");
      }
    })
  }

  ngAfterViewInit(){
    this.divInicializado = true;
  }

  VentanaOpcionCuenta():void {
    this.venatanOpcionesCuenta = true;
  }

  redirirInicio(){
    if(this.auth.isLogin()){
      this.router.navigate(['dashboard',this.id]);
    }else{
      this.venatanOpcionesCuenta=false;
      this.router.navigate(['login']);
    }
  }

  cerrarSesion(){
    window.location.reload();
    this.venatanOpcionesCuenta=false;
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }

  //dar un valor a la foto
  Foto(url:any){
    //si no se encontro la foto, no se sobre escribe
    if(this.foto!="icono-foto.png"){
      this.foto = url;
    }
    return this.foto;
  }

  @HostListener('document:click', ['$event.target'])
  clickFuera(target: HTMLElement) {

    if (!this.divInicializado || !this.contentCerrarSesion) return;

    const clicDentro = this.contentCerrarSesion.nativeElement.contains(target);
    console.log(clicDentro)
    if (!clicDentro) {
      this.venatanOpcionesCuenta = false;  
    }
  }

  protected venatanOpcionesCuenta:boolean = false;
  protected mostrarFoto:boolean = false;
  protected id:any = null;
  protected foto:string = "";
  protected title = 'Inventory';
  protected nombreUser = "";
  protected correoElectronico = ""
  private divInicializado = false;
}

import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  constructor(private elementRef:ElementRef, private router:Router, private auth:AuthService){}

  ngOnInit(): void {
     
  }

  title = 'Inventory';
  nombreUser = "bahiron abraham dueñas jimenez S.A.S"

  VentanaOpcionCuenta():void {
    this.venatanOpcionesCuenta = !this.venatanOpcionesCuenta;
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }

  @HostListener('document:click', ['$event'])
  clickFuera(event: MouseEvent) {
    const clicDentro = this.elementRef.nativeElement.contains(event.target);
    if (!clicDentro) {
      this.venatanOpcionesCuenta = false;  
    }
  }
  protected venatanOpcionesCuenta:boolean = false;
  protected mostrarFoto:boolean = false;
}

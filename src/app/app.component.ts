import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private elementRef:ElementRef){}

  title = 'Inventory';
  nombreUser = "bahiron abraham dueñas jimenez S.A.S"

  VentanaOpcionCuenta():void {
    this.venatanOpcionesCuenta = !this.venatanOpcionesCuenta;
  }

  @HostListener('document:click', ['$event'])
  clickFuera(event: MouseEvent) {
    const clicDentro = this.elementRef.nativeElement.contains(event.target);
    if (!clicDentro) {
      this.venatanOpcionesCuenta = false;  
    }
  }
  protected venatanOpcionesCuenta:boolean = false;
}

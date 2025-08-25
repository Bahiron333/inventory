import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {

  protected nombreEmpresa:string = "Cosidic";
}

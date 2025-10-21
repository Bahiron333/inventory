import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClienteService } from '../../../../services/cliente/cliente.service';

@Component({
  selector: 'app-modificar-miembro',
  standalone: false,
  templateUrl: './modificar-miembro.component.html',
  styleUrl: './modificar-miembro.component.scss'
})
export class ModificarMiembroComponent implements OnInit{

  @Input() miembro_id:any = null;
  @Input() cliente_id:any = null;
  @Output() cerrarVentana = new EventEmitter();

  constructor(private ClienteService:ClienteService){}

  ngOnInit(): void {
    this.ClienteService.miembroCliente(this.miembro_id,this.cliente_id).subscribe({
      next: (data:any) => {
        this.miembro = data.miembro;
      },
      error: (erro)=>console.log(erro.error)
    });
  }

  guardar(){
    this.ClienteService.updateMiembro(this.miembro, this.cliente_id).subscribe({
      next:()=>{
        alert("El miembro fue modificado exitosamente");
        this.cerrarVentana.emit();
        window.location.reload();
      },
      error: (err)=> console.log(err.error) 
    });
  }

  cancelar = () => this.cerrarVentana.emit(); //cerrar ventana

  protected miembro:any = {};
}

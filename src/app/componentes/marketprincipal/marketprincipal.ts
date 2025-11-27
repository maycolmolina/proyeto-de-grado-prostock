import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Realtime } from '../../services/realtime';
import { ProveedoresAu } from '../proveedores-au/proveedores-au';


@Component({
  selector: 'app-marketprincipal',
  imports: [RouterLink, NgClass,ProveedoresAu],
  templateUrl: './marketprincipal.html',
  styleUrl: './marketprincipal.css'
})
export class Marketprincipal implements OnInit {
 
  vista='desc'
  plantillas: any[] = [];

  cambiar_vista(cadena:string){
    this.vista=cadena
  }
   ngOnInit(): void {
    this.cargarpro();
  } 
  async cargarpro(){
    this.plantillas= await this.realtime.getPlantillas()
  }




  descargarArchivo(enlace:string) {
  const link = document.createElement('a');
  link.href = enlace;
  link.download = 'plantilla.pdf'; // nombre sugerido
  link.target = '_blank'; // abre en nueva pestaña
  link.setAttribute('rel', 'noopener noreferrer');
  link.click();
  }

  constructor(private realtime:Realtime){}

}

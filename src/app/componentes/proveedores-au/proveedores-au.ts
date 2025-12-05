import { NgStyle } from '@angular/common';
import { Component, runInInjectionContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Switalert2Service } from '../../services/switalert2.service';
import { Realtime } from '../../services/realtime';
import { dominio } from '../../../environments/environment';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-proveedores-au',
  imports: [FormsModule, NgStyle],
  templateUrl: './proveedores-au.html',
  styleUrl: './proveedores-au.css',
})
export class ProveedoresAu {
  nombrebusqueda = '';
  mensajeDeBusqueda = '';
  usuarios: any[] = [];

  verperfil(e: any) {
     const id = e.target.id;
     this.rutas.navigate(['../visitarperfil/'+id])
     
  }
  async buscar() {
    let np = /^(\s*\S\s*){3,}$/;
    if (this.nombrebusqueda == '') {
      this.alerta.alertasencilla('No hay nada escrito en tu busqueda');
      return;
    }

    if (!np.test(this.nombrebusqueda)){
      this.alerta.alertasencilla('Has una busqueda mas especifica');
      return;
    }


    this.mensajeDeBusqueda='buscando....';
    this.usuarios=await this.realtime.getUsuarios(this.nombrebusqueda);
    this.mensajeDeBusqueda=''
  }
  constructor(private alerta: Switalert2Service,private realtime:Realtime,private rutas:Router) {}
}

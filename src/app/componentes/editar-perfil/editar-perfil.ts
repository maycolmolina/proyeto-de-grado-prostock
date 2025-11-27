import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StorageService } from '../../services/localstorage.service';
import { Realtime } from '../../services/realtime';
import { ComponenteCarga } from '../componente-carga/componente-carga';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,           
  imports: [FormsModule,ComponenteCarga],   
  templateUrl: './editar-perfil.html',
  styleUrls: ['./editar-perfil.css']
})
export class EditarPerfilComponent implements OnInit {
  cargando=false;
  usuario: any ;

  tipos = [
    { value: 'admin', label: 'admin' },
    { value: 'cliente', label: 'Cliente' },
  ];

  constructor(private local: StorageService,private real:Realtime) {}
  ngOnInit(): void {
    
    this.usuario=this.local.getItem('user');
  }


  onCancelar() {
    console.log('Edición cancelada');
  }

  async onSubmit(form: NgForm) {
    this.cargando=true
    if (form.valid) {

      await this.real.modificarUser(this.usuario)
    }
    this.cargando=false;
  }

}

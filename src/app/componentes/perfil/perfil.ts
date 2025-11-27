import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../services/localstorage.service';
import { Switalert2Service } from '../../services/switalert2.service';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  urli='https://tse3.mm.bing.net/th/id/OIP.Dcmvj77Aeroc6HDfO26jlQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  usuario = {
    nombre: '',
    tipo: '',
    numero: '',
    correo: '',
    urlimg:''
  };
  accesos = [
    { titulo: 'Ingresar Productos', link: '../ingresarpro', texbtn: 'publicar' },
    { titulo: 'Mi Inventario', link: '../gestionpro', texbtn: 'ver Insumos' },
    { titulo: 'Compartir perfil', texbtn: 'Copiar'}
  ];

  copiarLink() {
    const link = 'http://localhost:4200/visitarperfil/'+this.local.getItem('key')
    navigator.clipboard
      .writeText(link)
      .then(() => this.alerta.alertaExito('Link copiado al portapapeles'))
      .catch((err) => console.error('Error al copiar: ', err));
  }
  ngOnInit(): void {
    this.usuario = this.local.getItem('user');
    if(this.usuario.urlimg!=''){
      this.urli=this.usuario.urlimg;
    }
    if (this.usuario === null) {
      this.ruta.navigate(['../']);
    }
  }
  constructor(private local: StorageService, private ruta: Router,private alerta:Switalert2Service) {}
}

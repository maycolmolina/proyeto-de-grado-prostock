import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/localstorage.service';
import { Router, RouterLink } from '@angular/router';
import { PiePagina } from '../../pie-pagina/pie-pagina';
@Component({
  selector: 'app-inicio',
  imports: [RouterLink,PiePagina],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit{

  ngOnInit(): void {
      if(this.local.getItem('user')===null){
        
      }else{this.ruta.navigate(['perfil'])}
  }
  constructor(private local:StorageService, private ruta:Router){}

}

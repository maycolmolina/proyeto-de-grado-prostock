import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StorageService } from '../services/localstorage.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-menu-navegacion',
  imports: [RouterLink, RouterLinkActive,NgClass],
  templateUrl: './menu-navegacion.html',
  styleUrl: './menu-navegacion.css',
})
export class MenuNavegacion {
  menuAbierto = false;

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  user: any;

  constructor(private local: StorageService) {}
  
  islogin() {
    this.user = this.local.getItem('user');
    if (this.user !== null) {
      return true;
    } else {
      return false;
    }
  }
}

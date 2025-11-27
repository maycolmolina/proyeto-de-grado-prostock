import { Component } from '@angular/core';
import { loginservice } from '../../services/login.service';
import { Switalert2Service } from '../../services/switalert2.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ajustes',
  imports: [RouterLink],
  templateUrl: './ajustes.html',
  styleUrl: './ajustes.css',
})
export class Ajustes {
  constructor(
    private login: loginservice,
    private alerta: Switalert2Service,
    private rutas: Router
  ) {}
  toggleDarkMode(isDark: boolean) {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
  async cerrarsession() {
    this.login
      .logout()
      .then(() => {
        localStorage.clear();
        this.rutas.navigate(['../']);
      })
      .catch((error) => {
        this.alerta.alertaerror('Error al cerrar sesión');
      })
      .finally(() => {
        window.location.reload();
      });
  }
}

import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Switalert2Service } from './switalert2.service';
import { Realtime } from './realtime';
import { StorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class loginservice {
  private auth = inject(Auth);
  constructor(
    private alerta: Switalert2Service,
    private realtime: Realtime,
    private local: StorageService,
    private ruta:Router
  ) {}
  async login(email: string, password: string) {
    try {
      const usercredential = signInWithEmailAndPassword(this.auth, email, password);
      const id = (await usercredential).user.uid;
      const user = await this.realtime.getUsuarioPorId(id);
      const data = user.val();
      data.contrasenia="";
        if (data) {
          this.local.setItem('user', data);
          this.local.setItem('key', id);
          this.ruta.navigate(['perfil']);
        } else {
          this.alerta.info('ha courrido un error');
          return;
        }
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          this.alerta.alertaerror('El correo no está registrado');
          break;
        case 'auth/invalid-credential':
          this.alerta.alertaerror('credenciales invalidas');
          break;
        case 'auth/wrong-password':
          this.alerta.alertaerror('La contraseña es incorrecta');
          break;
        case 'auth/invalid-email':
          this.alerta.alertaerror('El formato del correo no es válido');
          break;
        case 'auth/user-disabled':
          this.alerta.alertaerror('Este usuario está deshabilitado');
          break;
        default:
          this.alerta.alertaerror('se ha generado un error desconocido');
          console.log(error.code);
          break;
      }
    }
  }
  async logout() {
    try {
      await signOut(this.auth);
      return true;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return false;
    }
  }
}

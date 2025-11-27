import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { StorageService } from '../../services/localstorage.service';
import { Switalert2Service } from '../../services/switalert2.service';
import { GlobalbaseService } from '../../services/storage.service';
import { Realtime } from '../../services/realtime';
import { ComponenteCarga } from '../componente-carga/componente-carga';

@Component({
  selector: 'app-cambiofotoperfil',
  imports: [ComponenteCarga],
  templateUrl: './cambiofotoperfil.html',
  styleUrl: './cambiofotoperfil.css',
})
export class Cambiofotoperfil {
  urlimgactual = '';
  imag:any;
  cargando=false;
  ngOnInit(): void {

    if(this.local.getItem('user').urlimg===""){
      this.urlimgactual="https://firebasestorage.googleapis.com/v0/b/proyecto-chat-e71cc.appspot.com/o/sin-foto-hombre.jpg?alt=media&token=9cc33480-0043-4339-9af0-a8db9a261805"
    }else{
      this.urlimgactual=this.local.getItem('user').urlimg;
    }
  }
  cargarImagen(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imag = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.urlimgactual = reader.result as string;
      };
      reader.readAsDataURL(this.imag);
    }
  }
  async mandarImg() {
    if(!this.imag){
      this.alerta.alertasencilla('no has seleccionado una imagen de perfil')
      return;
    }
    let nombreImg='';
    const usu=this.local.getItem('user');
    nombreImg=this.local.getItem('key');
    try{
      this.cargando=true;
      let url=await this.storage.subirImagenPerfil(this.imag,nombreImg,usu.urlimg);
      usu.urlimg=url;
      this.realtime.modificarUser(usu)
    }catch{
      this.alerta.alertaerror('no se pudo subir la imagen');
    }finally{this.cargando=false;}
  }

  constructor(private local:StorageService,private alerta:Switalert2Service,private storage:GlobalbaseService,private realtime:Realtime) {}
}

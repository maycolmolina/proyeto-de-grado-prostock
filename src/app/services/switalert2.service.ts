import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class Switalert2Service {

  constructor() { }
  alertasencilla(cadena:string){
    Swal.fire(cadena);
  }
  errorConexion(cadena:string){
    Swal.fire({
      title: "mala conexion",
      text: cadena,
      icon: "question"
    });
  }
  alertaExito(cadena:string){
    Swal.fire({
      icon: "success",
      title: "listo",
      text: cadena,
    });
  }
  info(cadena:string){
    Swal.fire({
      icon: 'info',
      title: "!hey",
      text: cadena,
    });
  }
  alertaerror(cadena:string){
    Swal.fire({
      icon: "error",
      title: "Error",
      text: cadena,
    });
  }
  Errorconenlace(titulo:string,texto:string,enlace:string){
    Swal.fire({
      icon: "error",
      title: titulo,
      text: texto,
      footer: '<a href="'+enlace+'">Why do I have this issue?</a>'
    });
  }
  alertaconimagen(urlImagen:string,alt:string){
    Swal.fire({
      imageUrl: urlImagen,
      imageHeight: 1500,
      imageAlt: alt
    });
  }
  alertacompleja(){
    Swal.fire({
      title: "<strong><u>example</u></strong>",
      icon: "info",
      html: `
        You can use <b>bold text</b>,
        <a href="#">links</a>,
        and other HTML tags
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
        <i class="fa fa-thumbs-down"></i>
      `,
      cancelButtonAriaLabel: "Thumbs down"
    });
  }
  alertacontiempo(tiempo:number,texto:string){
    Swal.fire({
      position: "top-end",
      icon: 'question',
      title:texto,
      showConfirmButton: false,
      timer: tiempo
    });
  }
  imagenConInformacion(titulo:string,urlImagen:string,texto:string,alt:string){
    Swal.fire({
      title: titulo,
      text: texto,
      imageUrl:urlImagen,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: alt
    });
  }
  alertaModificable(titulo:string,background:string,texto:string,alt:string){
    Swal.fire({
      title: titulo,
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    });
    
  }
}

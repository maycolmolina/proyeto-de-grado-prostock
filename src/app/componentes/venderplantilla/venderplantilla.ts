import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Switalert2Service } from '../../services/switalert2.service';
import { GlobalbaseService } from '../../services/storage.service';
import { StorageService } from '../../services/localstorage.service';
import { Realtime } from '../../services/realtime';

@Component({
  selector: 'app-venderplantilla',
  imports: [FormsModule],
  templateUrl: './venderplantilla.html',
  styleUrl: './venderplantilla.css',
})
export class Venderplantilla implements OnInit{
  plantilla: any = {
    nombre: '',
    descripcion:'',
    categoria: 'Textil',
    descargasTotales: 0,
    gratis: true,
    precio: 0,
    urlFile: '',
    idUsuario: '',
  };
  file: File | undefined;

  capturarFile(e: any) {
    this.file = e.target.files[0];
  }
  async enviar() {
    if (this.file == undefined) {
      this.alerta.info('necesitas seleccionar la plantilla para publicarla');
      return;
    }
    if(this.plantilla.gratis===true){
      this.plantilla.precio=0;
    }
    try{
      this.plantilla.urlFile=await this.global.subirImagen(this.file)
      await this.realtime.platilla(this.plantilla,'plantillas');
      this.alerta.alertaExito('tu platilla ya esta publicada');
    }catch{

    }
    

  }
  constructor(private local:StorageService,private alerta: Switalert2Service, private global:GlobalbaseService,private realtime:Realtime) {}
  ngOnInit(): void {
    this.plantilla.idUsuario=this.local.getItem('key');
  }
}

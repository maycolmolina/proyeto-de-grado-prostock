import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/localstorage.service';
import { Switalert2Service } from '../../services/switalert2.service';
import { GlobalbaseService } from '../../services/storage.service';
import { Realtime } from '../../services/realtime';
import { Router } from '@angular/router';
import { ComponenteCarga } from '../componente-carga/componente-carga';

@Component({
  selector: 'app-ingreso-producto',
  imports: [FormsModule,CommonModule,ComponenteCarga],
  templateUrl: './ingreso-producto.html',
  styleUrl: './ingreso-producto.css'
})
export class IngresoProducto implements OnInit{
  cargando=false;
  // constantes de la clase
  categorias = [
  'Alimentos y Bebidas',
  'Moda y Textiles',
  'Artesanías y Cuero',
  'Madera y Carpintería',
  'Tecnología y Electrónica',
  'Hogar y Decoración',
  'Salud y Belleza',
  'Limpieza y Cuidado del Hogar',
  'Herramientas y Construcción',
  'Otros'
];

  urlimgactual = ''
  imag: File | undefined;
  producto = {
    nombre: '',
    categoria: '',
    proveedor: '',
    costo: null as number | null,
    precio_venta: null as number | null,
    cantidad: 0,
    urlimg: '',
    idUsuario:''
  };

  // funciones de la clase

  cargarImagen(e: any) {
    this.imag = e.target.files[0];
    if (this.imag) {
      this.urlimgactual = URL.createObjectURL(this.imag);
    }
  }
  async onSubmit() {
    if(this.imag==undefined){
      this.alerta.info('necesitas seleccionar un imagen para publicar el producto')
      return
    }
    this.cargando=true;
    try{
    const uriImg= await this.global.subirImagen(this.imag);
    const hoy = new Date().toISOString().split('T')[0];
    const pro:any={
      cantidadInicial:this.producto.cantidad,
      fecha:hoy,
      nombre: this.producto.nombre,
      categoria: this.producto.categoria,
      proveedor: this.producto.proveedor,
      costo: this.producto.costo,
      precio_venta: this.producto.precio_venta,
      cantidad: this.producto.cantidad,
      urlimg: uriImg,
      idUsuario:this.producto.idUsuario
    }
    await this.realtime.mandarPro(pro);
    this.alerta.alertaExito('el producto se guardo correctamente')
    this.ruta.navigate(['../perfil']);
    }catch(e){
      console.log(e)
      this.alerta.alertaerror('El porducto no se guardo correctamente');
    }
    finally{
      this.cargando=false;
    }
    
  }

  resetForm(form: any) {
    form.resetForm();
    this.producto = {
      nombre: '',
      categoria: '',
      proveedor: '',
      costo: null,
      precio_venta: null,
      cantidad: 0,
      urlimg: '',
      idUsuario:this.local.getItem('key')
    };
  }


  ngOnInit(): void {
    this.producto.idUsuario=this.local.getItem('key');
  }
  constructor(private ruta:Router, private realtime:Realtime, private global:GlobalbaseService,private local:StorageService,private alerta:Switalert2Service){}
}

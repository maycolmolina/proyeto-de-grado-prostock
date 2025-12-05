import { Component, OnInit } from '@angular/core';
import { Realtime } from '../../services/realtime';
import { NgClass } from '@angular/common';
import { ComponenteCarga } from '../componente-carga/componente-carga';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  imports: [NgClass, ComponenteCarga, FormsModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {
  mesSeleccionado = '';
  vista = 'productos';
  cargando = false;
  mostrarGanancias = false;
  gananciaMes = 0;
  misproductosv: any[] = [];
  RegistroVenta: any = [];
  gananciaTotal = 0;
  gananaciaPorDia = 0;
  diaG='';
  cambiarMostrarG() {
    this.mostrarGanancias = !this.mostrarGanancias;
  }
  cambiarvista(cadena: string) {
    this.cargando = true;
    this.vista = cadena;
    if (cadena === 'productos') {
      this.cargarmipro();
    }else if (cadena === 'ventasRealizadas') {
      this.obtenerVentapro();
    }else if (cadena === 'GRAFICO') {
      this.cargando = false;
    }
  }
  
  async obtenerVentapro() {
    this.RegistroVenta = await this.realtime.obtenerventasPro();
    if (this.gananciaTotal === 0) {
      for (let x = 0; x < this.RegistroVenta.length; x++) {
        this.gananciaTotal = this.gananciaTotal + this.RegistroVenta[x].ganancia;
      }
    }
    this.cargando = false;
  }
  async cargarmipro() {
    this.misproductosv = await this.realtime.getMiProducto();
    this.cargando = false;
  }
  verGananciasPorDia() {
    this.gananaciaPorDia = 0;
    
    for (let x = 0; x < this.RegistroVenta.length; x++) {
      let dia = this.RegistroVenta[x].fecha;
      if (dia === this.diaG) {
        this.gananaciaPorDia = this.gananaciaPorDia + this.RegistroVenta[x].ganancia;
      }
    }
    console.log(this.gananaciaPorDia);
  }

  verGananciaDeMes() {
    this.gananciaMes = 0;
    for (let x = 0; x < this.RegistroVenta.length; x++) {
      let mes = this.obtenerMesDeFecha(this.RegistroVenta[x].fecha);
      if (mes === this.mesSeleccionado) {
        this.gananciaMes = this.gananciaMes + this.RegistroVenta[x].ganancia;
      }
    }
  }

  obtenerMesDeFecha(fecha: string): string {
    // Divide la fecha por los guiones
    const partes = fecha.split('-');
    // La posición 1 (índice 1) corresponde al mes
    const mes = partes[1];
    // Retorna el mes como string (por ejemplo "10")
    return mes;
  }
  constructor(private realtime: Realtime) {}
  ngOnInit(): void {
    this.cargarmipro();
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculadora',
  imports: [],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.css'
})
export class Calculadora {
  constructor(private ruta:Router){}

  ir(cadena:string){
    this.ruta.navigate([cadena]);
  }
}

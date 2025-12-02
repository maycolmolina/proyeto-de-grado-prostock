import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Chat } from '../../services/chat';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { StorageService } from '../../services/localstorage.service';
import { Realtime } from '../../services/realtime';
@Component({
  selector: 'app-asistente',
  imports: [FormsModule, NgClass, MarkdownModule],
  templateUrl: './asistente.html',
  styleUrl: './asistente.css',
})
export class Asistente implements AfterViewChecked, OnInit {
  userPrompt = '';
  response: string | null = null;
  isLoading = false;
  mensajes: Array<any> = [];
  name = '';
  constructor(
    private geminiService: Chat,
    private localstorage: StorageService,
    private realtime: Realtime
  ) {}
  ngOnInit(): void {
    this.name = this.localstorage.getItem('user').nombre;
    const mensaje = {
      sms: 'hola en que puedo ayudarte ' + this.name,
      user: 'bot',
    };
    this.mensajes.push(mensaje);
  }
  @ViewChild('chatcont') private scrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  revisandoI=false;
  async generarconsejo(tipo:string) {
    this.revisandoI=true;
    const llave = this.localstorage.getItem('key');
    const misdatos = await this.realtime.recoleccionDatos(llave);
    // 3. Convertir el objeto a cadena JSON
    const datosCadena = JSON.stringify(misdatos, null, 2); // el 2 es para formato legible
    if(tipo==='recomendaciones'){
      const mensajeIA = `Hola IA, analiza estos datos de mi gestión:\n${datosCadena}\n Dame un análisis y recomendaciones sobre cómo puedo mejorar o si voy por buen camino que no sea largo si no puntual.`;
      await this.Sugestion(mensajeIA);
    }else if(tipo==='ahorro'){
      const mensajeIA = `Hola IA, analiza estos datos de mi gestión:\n${datosCadena}\n dame pautas de que como puedo ahorrar costos que no sea largo si no puntual`;
      await this.Sugestion(mensajeIA);
    }else{
      const mensajeIA = `Hola IA, analiza estos datos de mi gestión:\n${datosCadena}\n como puedo optimizar mis procesos un parrafo corto `;
      await this.Sugestion(mensajeIA);
    }
    this.revisandoI=false;
  }

  async sendMessage() {
    if (!this.userPrompt.trim()) return;

    const mensaje = {
      sms: this.userPrompt,
      user: 'user',
    };
    this.mensajes.push(mensaje);

    this.isLoading = true;
    this.response = null;
    const prompt = this.userPrompt;
    this.userPrompt = '';

    try {
      this.response = await this.geminiService.generateText(prompt);
      const mensaje = {
        sms: this.response,
        user: 'bot',
      };
      this.mensajes.push(mensaje);
    } finally {
      this.isLoading = false;
    }
  }
  async Sugestion(cadena: string) {
    const mensaje = {
      sms: 'Dame consejos con respecto a mi actividad',
      user: 'user',
    };
    this.mensajes.push(mensaje);

    this.isLoading = true;
    this.response = null;
    const prompt = cadena;

    try {
      this.response = await this.geminiService.generateText(prompt);
      const mensaje = {
        sms: this.response,
        user: 'bot',
      };
      this.mensajes.push(mensaje);
    } finally {
      this.isLoading = false;
    }
  }
}

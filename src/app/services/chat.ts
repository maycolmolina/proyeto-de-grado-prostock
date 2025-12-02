// src/app/services/gemini.service.ts
import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { claveapi } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Chat {
  private model: any;

  constructor() {}

  async generateText(prompt: string): Promise<string> {
    try {
      if(!this.model){
        const genAI = new GoogleGenerativeAI(claveapi);
        this.model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        console.log('se inicio geminis actualmente')
      }
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error al conectar con la API de Gemini:', error);
      return 'Hubo un error al generar la respuesta.';
    }
  }
}

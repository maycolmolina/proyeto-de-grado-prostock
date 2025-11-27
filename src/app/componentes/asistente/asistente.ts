import { Component, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Chat } from '../../services/chat';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
@Component({
  selector: 'app-asistente',
  imports: [FormsModule, NgClass, MarkdownModule],
  templateUrl: './asistente.html',
  styleUrl: './asistente.css',
})
export class Asistente implements AfterViewChecked {
  userPrompt = '';
  response: string | null = null;
  isLoading = false;
  mensajes: Array<any> = [];

  constructor(private geminiService: Chat) {}

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
  async Sugestion(cadena:string) {
    const mensaje = {
      sms: cadena,
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

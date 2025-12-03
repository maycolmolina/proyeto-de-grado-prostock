import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Switalert2Service } from './switalert2.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class GlobalbaseService {
  private static supabaseInstance: SupabaseClient;
  private supabase!: SupabaseClient;
  constructor(
    private ruta: Router,
    private Httpservice: HttpClient,
    private alerta: Switalert2Service
  ) {
    // aseguramos singleton para no crear varias conexiones
    // if (!GlobalbaseService.supabaseInstance) {
    //   GlobalbaseService.supabaseInstance = createClient(
    //     'https://kdhmnxsrabnysftbdzgo.supabase.co',
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkaG1ueHNyYWJueXNmdGJkemdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2OTQ4NDQsImV4cCI6MjA3MzI3MDg0NH0.r5mLB3674rgLa4izzHYSM57dEyrtdgEBr8aiS057P50'
    //   );
    // }
    // this.supabase = GlobalbaseService.supabaseInstance;
  }

  async repairData(data: any) {
    try {
      const datagood: any[] = [];
      data.forEach((dato: any) => {
        const key = dato.key;
        let datolisto = dato.val();
        datolisto.id = key;
        datagood.push(datolisto);
      });
      return datagood;
    } catch (error) {
      throw new Error('Error procesando datos: ' + error);
    }
  }

  cliente(): SupabaseClient {
    return this.supabase;
  }

  async subirImagen(file: File) {
    const nombre = this.generarNombreAleatorio();
    const extension = file.name.split('.').pop();
    const ruta = `${nombre}.${extension}`;
    const supabase = this.cliente();

    // subir archivo (v1)
    const { data, error } = await supabase.storage
      .from('lexnova')
      .upload(ruta, file, { cacheControl: '3600', upsert: false });

    if (error) {
      throw error;
    }

    // obtener URL pública (v1)
    const { publicURL, error: urlError } = supabase.storage.from('lexnova').getPublicUrl(ruta);

    if (urlError) {
      throw urlError;
    }

    return publicURL;
  }

  async subirImagenPerfil(file: File, nombre: string, urlimga: string) {
    if (urlimga != '') {
      await this.eliminarImg(urlimga);
    }
    const extension = file.name.split('.').pop();
    const ruta = `${nombre}.${extension}`;
    const supabase = this.cliente();
    // subir archivo (v1)
    const { data, error } = await supabase.storage
      .from('lexnova')
      .upload(ruta, file, { cacheControl: '3600', upsert: false });

    if (error) {
      throw error;
    }

    // obtener URL pública (v1)
    const { publicURL, error: urlError } = supabase.storage.from('lexnova').getPublicUrl(ruta);

    if (urlError) {
      throw urlError;
    }

    return publicURL;
  }

  async eliminarImg(url: any) {
    const bucket = 'lexnova';
    const base = `https://kdhmnxsrabnysftbdzgo.supabase.co/storage/v1/object/public/${bucket}/`;
    const ruta = await url.replace(base, '');
    console.log(ruta);
    const { data, error } = await this.supabase.storage.from(bucket).remove([ruta]);

    if (error) throw error;

    return data;
  }

  generarNombreAleatorio(): string {
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    let nombreAleatorio = '';
    // Genera 30 letras aleatorias
    for (let i = 0; i < 30; i++) {
      const letraAleatoria = letras.charAt(Math.floor(Math.random() * letras.length));
      nombreAleatorio += letraAleatoria;
    }
    // Genera 5 números aleatorios
    for (let i = 0; i < 5; i++) {
      const numeroAleatorio = numeros.charAt(Math.floor(Math.random() * numeros.length));
      nombreAleatorio += numeroAleatorio;
    }
    return nombreAleatorio;
  }
}

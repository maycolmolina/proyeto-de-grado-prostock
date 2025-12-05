import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Realtime } from '../../services/realtime';
import { RouterLink } from '@angular/router';
import { ComponenteCarga } from '../componente-carga/componente-carga';

@Component({
  selector: 'app-marketplace',
  imports: [FormsModule, RouterLink, ComponenteCarga],
  templateUrl: './marketplace.html',
  styleUrl: './marketplace.css',
})
export class Marketplace implements OnInit {
  cargando = false;
  placeholder = 'https://via.placeholder.com/600x400?text=No+image';
  q = '';
  categoriaFiltro = '';
  productoSeleccionado: any | null = null;
  productos: any[] = [];
  get categorias() {
    const s = new Set<string>();
    this.productos.forEach((p) => s.add(p.categoria));
    return Array.from(s);
  }
  productosFiltrados() {
    const q = this.q.trim().toLowerCase();
    return this.productos.filter((p) => {
      const matchQ =
        !q || p.nombre.toLowerCase().includes(q) || (p.proveedor || '').toLowerCase().includes(q);
      const matchCat = !this.categoriaFiltro || p.categoria === this.categoriaFiltro;
      return matchQ && matchCat;
    });
  }

  verProducto(p: any) {
    this.productoSeleccionado = p;
  }
  comprarAhora(p: any) {
    alert(`Comprar ahora: ${p.nombre}`);
  }
  ngOnInit(): void {
    this.obtenerpro();
  }
  constructor(private global: Realtime) {}
  async obtenerpro() {
    this.cargando = true;
    const snapshot = await this.global.getProductos('productos');
    if (snapshot.exists()) {
      this.productos = [];
      snapshot.forEach((dato) => {
        const item = dato.val();
        item.id = dato.key;
        this.productos.push(item);
      });
    }
    this.cargando = false;
  }
  async pedirporwhatsapp(pro: any) {
    const user = await this.global.traerUsuario(pro.idUsuario);
    if (!user) {
      return;
    }
    const mensaje =
      `👋 Hola ${user.nombre.trim()},\n\n` +
      `Estoy interesado en el producto que publicaste:\n\n` +
      `🧾 *${pro.nombre}*\n` +
      `💲 Precio de venta: ${pro.precio_venta}\n` +
      `🏷️ Categoría: ${pro.categoria}\n\n` +
      `📅 Fecha de publicación: ${pro.fecha}\n\n` +
      `🖼️ Imagen del producto:\n${pro.urlimg}`;

    const url = `https://wa.me/${user.numero}?text=${encodeURIComponent(mensaje)}`;

    // Abres WhatsApp con el mensaje
    window.open(url, '_blank');
  }
}

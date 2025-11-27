import { CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/localstorage.service';
import { Realtime } from '../../services/realtime';
import { GlobalbaseService } from '../../services/storage.service';
import { Switalert2Service } from '../../services/switalert2.service';
import { ComponenteCarga } from '../componente-carga/componente-carga';

@Component({
  selector: 'app-gestion-productos',
  imports: [FormsModule, CommonModule, ComponenteCarga],
  templateUrl: './gestion-productos.html',
  styleUrl: './gestion-productos.css',
})
export class GestionProductos implements OnInit {
  // para cuando una ventana esta cargado o se esta haciendo una silicitud
  cargando = false;
  // clave unica del administrador
  keyuser: any;
  // cuando pulsamos a vender un producto guardamos ese producto aca
  productoVentaActiva: any;
  // este es el producto original
  originalProductoVenta: any;
  // donde se guarde el nombre del cliente en caso de realizar una venta
  nombreCliente = '';
  // fecha de realizacion de la venta
  fecha: string = '';
  // dependiendo la vista es lo que se mostrara en el template
  vista = 'productoventa';
  // mostrar el formulario para reslizar venta
  ventaMostrar = false;
  filtro: string = '';
  // donse se guardara el producto que verremos con la opcion ver
  productounico: any;
  // controlador que si el administrador esta viendo un producto
  vistapro: boolean = false;
  // arreglo donde estaran almacenados todos mis productos qe publique o puse a le venta
  productos: any[] = [];
  // donde obtengo mis plantillas
  plantillas: any[] = [];
  // mostrar una targeta o formulario para vender un producto
  venserProVentana = false;

  // descargar las plantillas para observar que he subido yo en mis plantillas
  descargarArchivo(enlace: string) {
    const link = document.createElement('a');
    link.href = enlace;
    link.download = 'plantilla.pdf'; // nombre sugerido
    link.target = '_blank'; // abre en nueva pestaña
    link.setAttribute('rel', 'noopener noreferrer');
    link.click();
  }

  mostrarVenderProducto(id: any) {
    this.ventaMostrar = true;
    this.fecha = '';
    this.nombreCliente = '';
    const producto = this.productos.find((p) => p.id === id);
    this.productoVentaActiva = { ...producto, cantidad: 1 };
    this.originalProductoVenta = { ...producto };
  }

  // funcion para realizar la venra del producto

  async venderProdcuto() {
    if (this.originalProductoVenta.cantidad < this.productoVentaActiva.cantidad) {
      this.alerta.alertaerror('no tienes suficientes existencias para realizar esta venta');
      return;
    }
    if (this.productoVentaActiva.cantidad <= 0) {
      this.alerta.alertaerror('ingrese una cantidad valida');
      return;
    }
    if (
      this.productoVentaActiva.precio_venta === null ||
      this.productoVentaActiva.precio_venta <= 0
    ) {
      this.alerta.alertaerror('ingrese un precio mayor a 0');
      return;
    }
    if (this.originalProductoVenta.costo > this.productoVentaActiva.precio_venta) {
      const confirmar = confirm(
        `El precio de venta (C$${this.productoVentaActiva.precio_venta}) es menor al costo (C$${this.originalProductoVenta.costo}).\n¿Deseas continuar de todos modos?`
      );

      if (!confirmar) {
        this.alerta.alertaerror('Venta cancelada ');
        return;
      }
    }

    if (this.nombreCliente === '') {
      this.alerta.alertaerror('ingresa el nombre del cliente al cual se le realizara la venta');
      return;
    }

    if (this.fecha === '') {
      this.alerta.alertaerror('especifica la fecha de la venta');
      return;
    }
    this.cargando = true;
    try {
      const venta = {
        id_producto: this.productoVentaActiva.id,
        id_usuario: this.keyuser,
        cantidad: this.productoVentaActiva.cantidad,
        precio_venta: this.productoVentaActiva.precio_venta,
        fecha: this.fecha,
        ganancia:
          this.productoVentaActiva.precio_venta * this.productoVentaActiva.cantidad -
          this.productoVentaActiva.cantidad * this.originalProductoVenta.costo,
        precio_total: this.productoVentaActiva.precio_venta * this.productoVentaActiva.cantidad,
      };
      const nueva_existencia =this.originalProductoVenta.cantidad - this.productoVentaActiva.cantidad;
      await this.global.setventa(venta, nueva_existencia);
      this.alerta.alertaExito('la venta fue resgistrada a:  ' + this.nombreCliente);
      await this.obtenerpro();
    } catch {
      this.alerta.alertaerror('ha ocurrido un error');
    } finally {
      this.cargando = false;
    }
  }

  // cerrar ventana de la venta que se esta realizando

  cerrarVenta() {
    this.ventaMostrar = false;
  }

  // cambiar la vista de los insumos que se estan viendo
  async cambiarvista(cadena: string) {
    this.cargando = true;
    this.vista = cadena;
    if (cadena === 'plantillas') {
      this.plantillas = await this.global.getMiplantilla();
      this.cargando = false;
    } else {
      this.obtenerpro();
      this.cargando = false;
    }
  }

  // obtner los productos que el admin a publicado para vender
  async obtenerpro() {
    const cadena = this.local.getItem('key');
    const snapshot = await this.global.getMiPro(cadena, 'productos');
    if (snapshot.exists()) {
      this.productos = [];
      snapshot.forEach((dato) => {
        const item = dato.val();
        item.id = dato.key;
        this.productos.push(item);
      });
    }
  }
  // ver detalles de un solo producto que tiene el admin a la venta
  verProducto(producto: any) {
    this.productounico = {};
    this.productounico = this.productos.find((p) => p.id === producto.id);
    this.vistapro = true;
  }
  cerra() {
    this.vistapro = false;
  }

  // eliminar producto o plantilla publicada anterior mente
  async eliminarProducto(e: any, url: any, nodo: string) {
    if (confirm(`¿Deseas eliminar el producto definitivamente?`)) {
      // ANTES DE ELIMINAR CONFIRMAMOS SI NO TENEMOS VENTAS ASOCIADAS
      if (nodo === 'productos') {
        const verificar = await this.global.verificarVentaDeProducto(e);
        if (verificar === true) {
          this.alerta.info('no puedes eliminar este producto ya que tienes ventas asociadas a el ');
          return;
        } else if (verificar === 'Error') {
          return;
        }
      }
      await this.storage.eliminarImg(url);
      await this.global.remove(e, nodo);
      if (nodo === 'plantillas') {
        this.plantillas = this.plantillas?.filter((p) => p.id !== e) || [];
        this.global.setPlantilla(this.plantillas);
      } else {
        this.productos = this.productos?.filter((p) => p.id !== e) || [];
      }
    }
  }

  ngOnInit(): void {
    this.obtenerpro();
    this.keyuser = this.local.getItem('key');
  }

  constructor(
    private alerta: Switalert2Service,
    private global: Realtime,
    private local: StorageService,
    private storage: GlobalbaseService
  ) {}
}

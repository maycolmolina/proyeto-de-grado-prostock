import { Injectable } from '@angular/core';
import { Usuario } from '../objetos';
import { Switalert2Service } from '../services/switalert2.service';
import { StorageService } from '../services/localstorage.service';
import {
  update,
  remove,
  Database,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  push,
  set,
} from '@angular/fire/database';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class Realtime {
  token = '';
  async remove(key: string, nodo: string) {
    const referencia = ref(this.db, nodo + '/' + key);
    await remove(referencia)
      .then(() => {
        this.alerta.alertaExito('Producto eliminado correctamente');
      })
      .catch((error) => {
        this.alerta.alertaerror('Error al eliminar el producto:');
      });
  }
  mandarPro(pro: any) {
    const productosRef = ref(this.db, 'productos');
    const newRef = push(productosRef);
    return set(newRef, pro);
  }

  async platilla(pro: any, nodo: string) {
    try {
      const productosRef = ref(this.db, nodo);
      const newRef = push(productosRef);
      await set(newRef, pro);
      return newRef.key;
    } catch (error) {
      console.error('Error al guardar producto:', error);
      return '';
    }
  }
  // __________________________________funcion para obtener la plantillas__________________

  plantillas: Array<any> = [];
  async getPlantillas() {
    if (this.plantillas.length != 0) {
      return this.plantillas;
    }
    const referencia = ref(this.db, 'plantillas');
    const consulta = query(referencia);
    const snap = await get(consulta);
    if (snap.exists()) {
      snap.forEach((shild) => {
        const plantilla = shild.val();
        plantilla.id = shild.key;
        this.plantillas.push(plantilla);
      });
    }
    return this.plantillas;
  }

  // __________________________________funcion para obtener la plantillas__________________

  async createuser(usuario: Usuario) {
    try {
      const userc = await createUserWithEmailAndPassword(
        this.auth,
        usuario.correo,
        usuario.contrasenia
      );

      const uid = userc.user.uid;
      const usuarioref = ref(this.db, 'usuarios/' + uid);
      usuario.contrasenia = '';
      await set(usuarioref, usuario);

      this.alerta.alertaExito('El usuario ha sido registrado correctamente');
      usuario.contrasenia = '';
      this.local.setItem('user', usuario);
      this.local.setItem('key', uid);
      this.ruta.navigate(['perfil']);
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.alerta.alertaerror('El correo ya está registrado, intenta iniciar sesión.');
          break;
        case 'auth/invalid-email':
          this.alerta.alertaerror('Por favor ingresa un correo válido.');
          break;
        case 'auth/weak-password':
          this.alerta.alertaerror('La contraseña debe tener al menos 6 caracteres.');
          break;
        default:
          this.alerta.alertaerror('Ocurrió un error: ' + error.message);
          break;
      }
    }
  }
  getMiPro(idavisitar: string, nodo: string) {
    const referencia = ref(this.db, nodo);
    const consulta = query(referencia, orderByChild('idUsuario'), equalTo(idavisitar));
    return get(consulta);
  }

  // recoleccion de datos para anailizis de la ia
  datosIA: any = {
    productos: [],
    ventas: [],
    compras: ['esto se refiere a cuando adquiero los productos , por ende esta en porductos estos datos'],
    plantillas: [],
  };
  async recoleccionDatos(idUsuario: string) {
    if (this.datosIA.productos.length != 0) {
      return this.datosIA;
    }
    try {
      // Obtener productos del usuario
      const productosSnap = await this.getMiPro(idUsuario, 'productos');
      if (productosSnap.exists()) {
        const productosData = productosSnap.val();
        // Convertir el objeto de Firebase a array
        this.datosIA.productos = Object.keys(productosData).map((key) => ({
          id: key,
          ...productosData[key],
        }));
      } else {
        this.alerta.info(
          'no hay productos por lo tanto no puedo realizar un analizis de tu activida'
        );
        return;
      }
      // obtener las ventas
      const ventas = await this.obtenerventasPro();
      this.datosIA.ventas = ventas;
      // obtener plantillas
      const plantillas = await this.getPlantillas();
      this.datosIA.plantillas = plantillas;
      return this.datosIA;
    } catch (error) {
      console.error('Error recolectando datos:', error);
      this.alerta.alertaerror('ha ocurrido un error');
      return 0;
    }
  }

  async verificarVentaDeProducto(id_pro: any): Promise<boolean | 'Error'> {
    try {
      const referencia = ref(this.db, 'Ventas');
      const consulta = query(referencia, orderByChild('id_producto'), equalTo(id_pro));
      const res = await get(consulta);
      return res.exists();
    } catch (error) {
      console.error('Error al verificar venta de producto:', error);
      this.alerta.alertaerror('Algo salió mal');
      return 'Error';
    }
  }

  // registrar un venta de un producto publicado_______________________________

  async setventa(venta: any, cantidad_nueva: any) {
    try {
      const referencia = ref(this.db, `productos/${venta.id_producto}`);
      await update(referencia, { cantidad: cantidad_nueva });

      const productosRef = ref(this.db, 'Ventas');
      const newRef = push(productosRef);
      await set(newRef, venta);
      this.Ventas = [];
      return newRef.key;
    } catch (error) {
      this.alerta.alertaerror('a ocurrido un error al registrar la venta');
      console.error('Error al guardar producto:', error);
      return '';
    } finally {
    }
  }

  // obtener mis productos de realtima de ser necesario__________________
  Misproductos: Array<any> = [];
  async getMiProducto() {
    if (this.Misproductos.length != 0) {
      return this.Misproductos;
    }
    const mikey = this.local.getItem('key');
    const referencia = ref(this.db, 'productos');
    const consulta = query(referencia, orderByChild('idUsuario'), equalTo(mikey));
    const snap = await get(consulta);

    if (snap.exists()) {
      snap.forEach((shild) => {
        const pro = shild.val();
        pro.id = shild.key;
        this.Misproductos.push(pro);
      });
    }
    return this.Misproductos;
  }
  // obtener unicamente mis plantillas publicadas_________________________
  Misplantillas: Array<any> = [];

  setPlantilla(plantill: any) {
    this.Misplantillas = [];
    this.Misplantillas = plantill;
  }
  async getMiplantilla() {
    if (this.Misplantillas.length != 0) {
      return this.Misplantillas;
    }
    const mikey = this.local.getItem('key');
    const referencia = ref(this.db, 'plantillas');
    const consulta = query(referencia, orderByChild('idUsuario'), equalTo(mikey));
    const snap = await get(consulta);

    if (snap.exists()) {
      snap.forEach((shild) => {
        const plantilla = shild.val();
        plantilla.id = shild.key;
        this.Misplantillas.push(plantilla);
      });
    }
    return this.Misplantillas;
  }

  // incio de obtener mis ventasd_________________________

  Ventas: Array<any> = [];
  async obtenerventasPro() {
    if (this.Ventas.length != 0) {
      return this.Ventas;
    }
    try {
      // obtengo mi id
      const mikey = this.local.getItem('key');
      const referencia = ref(this.db, 'Ventas');
      const consulta = query(referencia, orderByChild('id_usuario'), equalTo(mikey));
      const snap = await get(consulta);
      if (snap.exists()) {
        const ventasArray: any = [];
        snap.forEach((shildsnap) => {
          ventasArray.push(shildsnap.val());
        });
        for (const venta of ventasArray) {
          const prodcutoRef = ref(this.db, `productos/${venta.id_producto}`);
          const producto = await get(prodcutoRef);

          if (producto.exists()) {
            const pro = producto.val();
            const ventaPro = {
              nombre: pro.nombre,
              costo: pro.costo,
              proveedor: pro.proveedor,
              cantidad: venta.cantidad,
              fecha: venta.fecha,
              ganancia: venta.ganancia,
              precio_total: venta.precio_total,
              precio_unidad: venta.precio_venta,
            };
            this.Ventas.push(ventaPro);
          } else {
            this.alerta.alertaerror('No has realizado ninguna venta');
          }
        }
      }
    } catch (e) {
      this.alerta.alertaerror('a ocurrido un error');
    } finally {
      return this.Ventas;
    }
  }

  async traerUsuario(id: any) {
    try {
      const referencia = ref(this.db, `usuarios/${id}`); // ruta al nodo del usuario
      const snapshot = await get(referencia);
      if (snapshot.exists()) {
        const usuario = snapshot.val();
        return usuario;
      } else {
        this.alerta.alertaerror('Usuario no encontrado');
        return null;
      }
    } catch (error) {
      console.error('Error al traer el usuario:', error);
      return null;
    }
  }
  // __________________________________________________________________
  getProductos(nodo: string) {
    const referencia = ref(this.db, nodo);
    return get(referencia);
  }
  async obtenerusuario(correo: string): Promise<any> {
    const usuariosRef = ref(this.db, 'usuarios');
    const q = query(usuariosRef, orderByChild('correo'), equalTo(correo));
    const snapshot = await get(q);
    return snapshot;
  }
  async modificarUser(data: any) {
    try {
      const p = this.local.getItem('key');
      console.log(p);
      const userRef = ref(this.db, `usuarios/${p}`);
      await update(userRef, data);
      this.local.setItem('user', data);
      this.alerta.alertaExito('usuario modificado');
    } catch (e) {
      console.log(e);
      this.alerta.alertaerror('Ha ocurrido un error');
    }
  }

  async getUsuarioPorId(idUsuario: string) {
    const referencia = ref(this.db, 'usuarios/' + idUsuario);
    const snapshot = await get(referencia);
    return snapshot;
  }

  constructor(
    private ruta: Router,
    private db: Database,
    private alerta: Switalert2Service,
    private local: StorageService,
    private auth: Auth
  ) {}
}

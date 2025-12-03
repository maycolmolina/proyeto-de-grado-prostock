import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../../services/localstorage.service';
import { Realtime } from '../../services/realtime';
import { ComponenteCarga } from "../componente-carga/componente-carga";

@Component({
  selector: 'app-ingresar-negocio',
  imports: [ReactiveFormsModule, ComponenteCarga],
  templateUrl: './ingresar-negocio.html',
  styleUrl: './ingresar-negocio.css',
})
export class IngresarNegocio implements OnInit {
  negocioForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    direccion: new FormControl('', Validators.required),
    departamento: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
  });
  enviando=false;
   ngOnInit() {
    // Revisar si hay datos en localStorage
    const negocioGuardado = localStorage.getItem('negocio');
    if (negocioGuardado) {


      const negocio = JSON.parse(negocioGuardado);
      // Rellenar el formulario con los datos existentes
      this.negocioForm.patchValue({
        nombre: negocio.nombre || '',
        descripcion: negocio.descripcion || '',
        direccion: negocio.direccion || '',
        departamento: negocio.departamento || '',
        // ciudad: negocio.ciudad || ''
      });
      this.onDepartamentoChange();
      this.negocioForm.patchValue({
        ciudad: negocio.ciudad || ''
      });
    }
  }

  // Array de departamentos con sus municipios (para @for)
  departamentosArray = [
    {
      nombre: 'Managua',
      municipios: [
        'Managua',
        'Tipitapa',
        'Ciudad Sandino',
        'Mateare',
        'San Rafael del Sur',
        'Ticuantepe',
        'El Crucero',
        'Villa El Carmen',
      ],
    },
    {
      nombre: 'León',
      municipios: [
        'León',
        'Nagarote',
        'La Paz Centro',
        'Telica',
        'Quezalguaque',
        'El Sauce',
        'Achuapa',
        'Santa Rosa del Peñón',
        'Malpaisillo',
      ],
    },
    {
      nombre: 'Chinandega',
      municipios: [
        'Chinandega',
        'El Viejo',
        'Corinto',
        'Chichigalpa',
        'Somotillo',
        'Puerto Morazán',
        'San Pedro del Norte',
        'Villanueva',
        'Posoltega',
      ],
    },
    {
      nombre: 'Masaya',
      municipios: [
        'Masaya',
        'Nindirí',
        'Tisma',
        'Catarina',
        'Niquinohomo',
        'San Juan de Oriente',
        'Masatepe',
        'La Concepción',
      ],
    },
    { nombre: 'Granada', municipios: ['Granada', 'Nandaime', 'Diriomo', 'Diriá'] },
    {
      nombre: 'Rivas',
      municipios: [
        'Rivas',
        'San Juan del Sur',
        'Tola',
        'Belén',
        'Potosí',
        'Buenos Aires',
        'Cárdenas',
        'Moyogalpa',
        'Altagracia',
      ],
    },
    {
      nombre: 'Carazo',
      municipios: [
        'Jinotepe',
        'Diriamba',
        'San Marcos',
        'Dolores',
        'Santa Teresa',
        'La Conquista',
        'El Rosario',
      ],
    },
    {
      nombre: 'Matagalpa',
      municipios: [
        'Matagalpa',
        'San Ramón',
        'San Dionisio',
        'Esquipulas',
        'Río Blanco',
        'Sébaco',
        'Terrabona',
        'Rancho Grande',
        'El Tuma-La Dalia',
        'Muy Muy',
      ],
    },
    {
      nombre: 'Jinotega',
      municipios: [
        'Jinotega',
        'San Rafael del Norte',
        'San Sebastián de Yalí',
        'La Concordia',
        'El Cuá',
        'Wiwilí',
        'Santa María de Pantasma',
      ],
    },
    { nombre: 'Boaco', municipios: ['Boaco', 'Camoapa', 'San Lorenzo', 'Santa Lucía', 'Teustepe'] },
    {
      nombre: 'Chontales',
      municipios: [
        'Juigalpa',
        'Acoyapa',
        'Comalapa',
        'Villa Sandino',
        'La Libertad',
        'Santo Domingo',
        'El Coral',
      ],
    },
    {
      nombre: 'Estelí',
      municipios: ['Estelí', 'Condega', 'Pueblo Nuevo', 'San Juan de Limay', 'La Trinidad'],
    },
    {
      nombre: 'Madriz',
      municipios: [
        'Somoto',
        'San Lucas',
        'Palacagüina',
        'Yalagüina',
        'Totogalpa',
        'San José de Cusmapa',
        'Las Sabanas',
      ],
    },
    {
      nombre: 'Nueva Segovia',
      municipios: [
        'Ocotal',
        'Jalapa',
        'Santa María',
        'Dipilto',
        'Mozonte',
        'Macuelizo',
        'Murra',
        'Quilalí',
        'Wiwilí de Nueva Segovia',
      ],
    },
    {
      nombre: 'Río San Juan',
      municipios: ['San Carlos', 'El Castillo', 'San Miguelito', 'Morrito', 'San Juan del Norte'],
    },
    {
      nombre: 'RACCN',
      municipios: ['Bilwi', 'Waspam', 'Prinzapolka', 'Rosita', 'Bonanza', 'Siuna', 'Waslala'],
    },
    {
      nombre: 'RACCS',
      municipios: [
        'Bluefields',
        'Laguna de Perlas',
        'Kukra Hill',
        'El Ayote',
        'Nueva Guinea',
        'Desembocadura del Río Grande',
        'Corn Island',
      ],
    },
  ];

  municipios: string[] = [];

  onDepartamentoChange() {
    const depName = this.negocioForm.get('departamento')?.value;
    const depto = this.departamentosArray.find((d) => d.nombre === depName);
    this.municipios = depto ? depto.municipios : [];
    this.negocioForm.get('ciudad')?.setValue('');
  }

  async guardar() {
    this.enviando=true;
    if (this.negocioForm.valid) {
      const negocio = this.negocioForm.value;
      const id=this.local.getItem('key')
      const ne = {
        ...this.negocioForm.value,
        fechaRegistro: new Date().toISOString().split('T')[0],
        like:0
      };
      await this.realtime.crearNegocio(id,ne);
      this.enviando=false;
    }
  }
  constructor(private local : StorageService,private realtime:Realtime){}
}

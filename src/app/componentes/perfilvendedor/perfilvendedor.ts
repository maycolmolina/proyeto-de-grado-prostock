import { Component } from '@angular/core';
import { Switalert2Service } from '../../services/switalert2.service';
import { ActivatedRoute } from '@angular/router';
import { Realtime } from '../../services/realtime';

@Component({
  selector: 'app-perfilvendedor',
  imports: [],
  templateUrl: './perfilvendedor.html',
  styleUrl: './perfilvendedor.css'
})


export class Perfilvendedor  {
  id:string='';
  constructor(private alerta:Switalert2Service, private rutas: ActivatedRoute,private global:Realtime){}
  usuarioActual:any={
    nombre:"",
    contrasenia:"",
    correo:"",
    numero:"",
    urlimg:"",
    tipo:''
  }
  mostrar=false;
  urlImg="https://firebasestorage.googleapis.com/v0/b/proyecto-chat-e71cc.appspot.com/o/sin-foto-hombre.jpg?alt=media&token=9cc33480-0043-4339-9af0-a8db9a261805";
  productosOfer:any[]=[];

  ngOnInit(): void {
    this.cargar();
  }
  async cargar(){
    this.id=this.rutas.snapshot.params['id'];
    const user= await this.global.getUsuarioPorId(this.id);
    const data=user.val();
    if(data){
      this.usuarioActual=data;
      if(this.usuarioActual.urlimg!=''){
        this.urlImg=this.usuarioActual.urlimg;
      }
      this.mostrar=true
    }
  }
  cargar_productos(){
    this.global.getMiPro(this.id,'productos').then(
      objetoCom=>{
        if(objetoCom.exists()){
          this.mostrar=true;
          this.productosOfer= Object.values(objetoCom.val()).slice().reverse();
        }else{
          this.alerta.info('este usuario no tiene productos en venta')
        }
      }
    ).catch(
      error=>{
        this.alerta.errorConexion('error al cargar este usuario');
      }
    );
  }



}

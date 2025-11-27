export interface Usuario {
    nombre:string,
    contrasenia:string,
    correo:string,
    numero:string,
    urlimg:string,
    tipo:string
}
export class usuario {
    contrasenia:string="";
    correo:string="";
    nombre:string="";
    numero:string="";
    tipo:string="";    
    urlimg="";
  }

import { Routes } from '@angular/router';
import { Ajustes } from './componentes/ajustes/ajustes';
import { Calculadora } from './componentes/funcionalidades/calculadora';
import { Inicio } from './componentes/inicio/inicio';
import { Marketplace } from './componentes/marketplace/marketplace';
import { Reportes } from './componentes/reportes/reportes';
import { SectorProducto } from './componentes/sector-producto/sector-producto';
import { Login } from './componentes/login/login';
import { Registro } from './registro/registro';
import { Perfil } from './componentes/perfil/perfil';
import { Asistente } from './componentes/asistente/asistente';
import { IngresoProducto } from './componentes/ingreso-producto/ingreso-producto';
import { GestionProductos } from './componentes/gestion-productos/gestion-productos';
import { Perfilvendedor } from './componentes/perfilvendedor/perfilvendedor';
import { Marketprincipal } from './componentes/marketprincipal/marketprincipal';
import { Venderplantilla } from './componentes/venderplantilla/venderplantilla';
import { Notfound } from './componentes/notfound/notfound';
import { clienteRestriccionGuard } from './guard/cliente-restriccion-guard';
import { NoAutorizado } from './componentes/no-autorizado/no-autorizado';
import { loginRestriccionGuard } from './guard/login-restriccion-guard';
import { SuperAdmin } from './componentes/super-admin/super-admin';
import { EditarPerfilComponent } from './componentes/editar-perfil/editar-perfil';
import { Cambiofotoperfil } from './componentes/cambiofotoperfil/cambiofotoperfil';

export const routes: Routes = [
    {path:'ajustes', component:Ajustes},
    {path:'', component:Inicio},
    {path:'calculadora', component:Calculadora,canActivate:[clienteRestriccionGuard]},
    {path:'asistente', component:Asistente,canActivate:[clienteRestriccionGuard]},
    {path:'login', component:Login,canActivate:[loginRestriccionGuard]},
    {path:'marketplace', component:Marketplace},
    {path:'reportes', component:Reportes,canActivate:[clienteRestriccionGuard]},
    {path:'sectorpro', component:SectorProducto,canActivate:[loginRestriccionGuard]},
    {path:'registro', component:Registro,canActivate:[loginRestriccionGuard]},
    {path:'perfil', component:Perfil},
    {path:'ingresarpro', component:IngresoProducto,canActivate:[clienteRestriccionGuard]},
    {path:'visitarperfil/:id', component:Perfilvendedor},
    {path:'gestionpro', component:GestionProductos,canActivate:[clienteRestriccionGuard]},
    {path:'marketprincipal', component:Marketprincipal},
    {path:'venderplantilla', component:Venderplantilla,canActivate:[clienteRestriccionGuard]},
    {path:'no-autorizado', component:NoAutorizado},
    {path:'editar_P', component:EditarPerfilComponent},
    {path:'superadmin', component:SuperAdmin},
    {path:'fotoPerfil', component:Cambiofotoperfil},
    {path:'**', component:Notfound}
];

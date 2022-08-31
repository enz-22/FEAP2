import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PorfolioComponent } from './componentes/porfolio/porfolio.component';
import { GuardGuard } from './servicios/guard.guard';


const routes: Routes = [
  {path:'porfolio',component:PorfolioComponent, canActivate: [GuardGuard]},
  {path:'iniciar-sesion',component:IniciarSesionComponent},
  {path:'inicio',component:InicioComponent},
  {path:'',redirectTo:'inicio',pathMatch:'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

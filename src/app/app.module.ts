import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { AcercadeComponent } from './componentes/acercade/acercade.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HardComponent } from './componentes/hard/hard.component';
import { ProyectoComponent } from './componentes/proyecto/proyecto.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PorfolioComponent } from './componentes/porfolio/porfolio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './servicios/interceptor.service';
import { PorfolioService } from './servicios/porfolio.service';
import { InicioComponent } from './componentes/inicio/inicio.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AcercadeComponent,
    ExperienciaComponent,
    EducacionComponent,
    HardComponent,
    ProyectoComponent,
    FooterComponent,
    IniciarSesionComponent,
    PorfolioComponent,
    InicioComponent,
   
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({}),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule


   
    
  ],
  providers: [PorfolioService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

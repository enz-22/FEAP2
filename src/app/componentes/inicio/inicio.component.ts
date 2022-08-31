import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Acerca } from 'src/app/models/acerca.models';
import { Educacion } from 'src/app/models/educacion.models';
import { Experiencia } from 'src/app/models/experiencia.models';
import { Skill } from 'src/app/models/hard.models';
import { Proyecto } from 'src/app/models/proyecto.models';
import { AcercaService } from 'src/app/servicios/acerca.service';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { HardService } from 'src/app/servicios/hard.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  acerca: Acerca[]=[];
  experiencia:Experiencia[]=[];
  educacion: Educacion[]=[];
  skill: Skill [] = [];
  proyecto: Proyecto [] = [];

  constructor(public acercaService: AcercaService,
    public experienciaService: ExperienciaService,
    public educacionService: EducacionService,
    public hardService: HardService,
    public proyectoService : ProyectoService,
    ) { }

  ngOnInit(): void {
    this.getAcerca();
    this.getExperiencia();
    this.getEducacion();
    this.getSkill();
    this.getProyecto();

  }

  goToLink(url: string){ 
    window.open(url, "_blank");
  }

  public getAcerca():void{
    this.acercaService.getAcerca().subscribe({
      next:(Response:Acerca[])=>{
        this.acerca=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    })
  }

  public getExperiencia():void{
    this.experienciaService.getExperiencia().subscribe({
      next:(Response:Experiencia[])=>{
        this.experiencia=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    })
  }

  public getEducacion():void{
    this.educacionService.getEducacion().subscribe({
      next:(Response: Educacion[])=>{
        this.educacion=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public getSkill():void{
    this.hardService.getSkill().subscribe({
      next:(Response: Skill[]) =>{
        this.skill = Response;
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

  public getProyecto():void{
    this.proyectoService.getProyecto().subscribe({
      next:(Response: Proyecto[]) =>{
        this.proyecto = Response;
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/models/experiencia.models';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experiencia:Experiencia[]=[];
  editExperiencia: Experiencia | undefined;
  deleteExperiencia: Experiencia | undefined;

  constructor(public experienciaService: ExperienciaService) { }

  ngOnInit(): void {
    this.getExperiencia();
  }

  public getExperiencia():void{
    this.experienciaService.getExperiencia().subscribe({
      next:(Response: Experiencia[])=>{
        this.experiencia=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    })
  }

  public onOpenModal(mode:String, expe?: Experiencia):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-bs-target', '#addExperienciaModal');
    }else if(mode==='delete'){
      this.deleteExperiencia=expe;
      button.setAttribute('data-bs-target','#deleteExperienciaModal');
    }else if(mode==='edit'){
      this.editExperiencia=expe;
      button.setAttribute('data-bs-target','#editExperienciaModal');
    };
    container?.appendChild(button);
    button.click();
  }

  public onAddExperiencia(addForm: NgForm):void{
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.addExperiencia(addForm.value).subscribe({
      next:(Response:Experiencia)=>{
        console.log(Response);
        this.getExperiencia();
        addForm.reset();
        
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
        this.getExperiencia();
      }
    })
  }

  public onUpdateExperiencia(experiencia:Experiencia):void{
    this.editExperiencia=experiencia;
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.updateExperiencia(experiencia).subscribe({
      next:(Response:Experiencia)=>{
        console.log(Response);
        this.getExperiencia();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        this.getExperiencia();
      }
    })
  }

  public onDeleteExperiencia(idExp:number):void{
    this.experienciaService.deleteExperiencia(idExp).subscribe({
      next:(Response:void)=>{
        console.log(Response);
        this.getExperiencia();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        this.getExperiencia();
      }
    })
  }

}

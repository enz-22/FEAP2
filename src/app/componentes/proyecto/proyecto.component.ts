import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyecto } from 'src/app/models/proyecto.models';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
})
export class ProyectoComponent implements OnInit {

  proyecto: Proyecto [] = [];
  editProyecto: Proyecto | undefined;
  deleteProyecto: Proyecto | undefined;
  form: any;
    
 constructor(public proyectoService : ProyectoService) {}

  ngOnInit(): void {
    this.getProyecto();
         
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

  public onOpenModal(mode:String, proy?: Proyecto):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-bs-target','#addProyectoModal');
    }else if(mode==='delete'){
      this.deleteProyecto=proy;
      button.setAttribute('data-bs-target','#deleteProyectoModal');
    }else if(mode==='edit'){
      this.editProyecto=proy;
      button.setAttribute('data-bs-target','#editProyectoModal')
    };
    container?.appendChild(button);
    button.click();
  }

  public onAddProyecto(addForm: NgForm):void{
    document.getElementById('add-proyecto-form')?.click();
    this.proyectoService.addProyecto(addForm.value).subscribe({
      next:(Response: Proyecto)=>{
        console.log(Response);
        this.getProyecto();
        addForm.reset();
        
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
        this.getProyecto();
      }
    })
  }

  public onUpdateProyecto(proyecto: Proyecto):void{
    this.editProyecto=proyecto;
    document.getElementById('add-proyecto-form')?.click();
    this.proyectoService.updateProyecto(proyecto).subscribe({
      next: (Response: Proyecto)=>{
        console.log(Response);
        
        this.getProyecto();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        this.getProyecto();
      }
    })
  }

  public onDeleteProyecto(idPro: number):void{
    this.proyectoService.deleteProyecto(idPro).subscribe({
      next: (Response: void) =>{
        console.log(Response);
        this.getProyecto();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        this.getProyecto();
      }
    })
  }
 
  get Titulo()
  {
    return this.form.get('titulo');
  }
}

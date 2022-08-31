import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/models/educacion.models';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  educacion: Educacion[]=[];
  editEducacion: Educacion | undefined;
  deleteEducacion: Educacion | undefined;

  constructor(public educacionService: EducacionService) { }

  ngOnInit(): void {
    this.getEducacion();
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

  public onOpenModal(mode:String, educ?: Educacion):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-bs-target', '#addEducacionModal');
    }else if(mode==='delete'){
      this.deleteEducacion=educ;
      button.setAttribute('data-bs-target','#deleteEducacionModal');
    }else if(mode==='edit'){
      this.editEducacion=educ;
      button.setAttribute('data-bs-target', '#editEducacionModal');
    };
    container?.appendChild(button);
    button.click();
  }

  public onAddEducacion(addForm: NgForm):void{
    document.getElementById('add-educacion-form')?.click();
    this.educacionService.addEducacion(addForm.value).subscribe({
      next:(Response:Educacion)=>{
        console.log(Response);
        this.getEducacion();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
        this.getEducacion();
      }
    })
  }

  public onUpdateEducacion(educacion: Educacion):void{
    this.editEducacion=educacion;
    document.getElementById('add-educacion-form')?.click();
    this.educacionService.updateEducacion(educacion).subscribe({
      next:(Response:Educacion)=>{
        console.log(Response);
        this.getEducacion();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        this.getEducacion();
      }
    })
  }

  public onDeleteEducacion(idEdu:number):void{
    this.educacionService.deleteEducacion(idEdu).subscribe({
      next:(Response:void)=>{
        console.log(Response);
        this.getEducacion();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        this.getEducacion();
      }
    })
  }

}

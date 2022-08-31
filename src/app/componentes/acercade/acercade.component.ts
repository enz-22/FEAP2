import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Acerca } from 'src/app/models/acerca.models';
import { AcercaService } from 'src/app/servicios/acerca.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {

  acerca: Acerca[]=[];
  editAcerca: Acerca | undefined;
  deleteAcerca: Acerca | undefined;
  miPorfolio: any;
  
  constructor(public acercaService: AcercaService, private datosPorfolio:PorfolioService) { }

  ngOnInit(): void {

    this.datosPorfolio.obtenerDatos().subscribe(data=>{
      console.log("acerca de" + JSON.stringify(data));
      this.miPorfolio=data[2];
    })

    this.getAcerca();
   
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

  public onOpenModal(mode:String, acer?:Acerca):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-bs-target', '#addAcercaModal');
    }else if(mode==='delete'){
      this.deleteAcerca=acer;
      button.setAttribute('data-bs-target', '#deleteAcercaModal');
    }else if(mode==='edit'){
      this.editAcerca=acer;
      button.setAttribute('data-bs-target','#editAcercaModal');
    };
    container?.appendChild(button);
    button.click();
  }

  public onAddAcerca(addForm: NgForm):void{
    document.getElementById('add-acerca-form')?.click();
    this.acercaService.addAcerca(addForm.value).subscribe({
      next:(Response:Acerca)=>{
        console.log(Response);
        this.getAcerca();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
        this.getAcerca();
      }
    })
  }

  public onUpdateAcerca(acerca:Acerca):void{
    this.editAcerca=acerca;
    document.getElementById('add-acerca-form')?.click();
    this.acercaService.updateAcerca(acerca).subscribe({
      next:(Response:Acerca)=>{
        console.log(Response);
        this.getAcerca();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        this.getAcerca();
      }
    })
  }

  public onDeleteAcerca(idacerca:number):void{
    this.acercaService.deleteAcerca(idacerca).subscribe({
      next:(Response:void)=>{
        console.log(Response);
        this.getAcerca();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        this.getAcerca();
      }
    })
  }

}

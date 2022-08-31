import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skill } from 'src/app/models/hard.models';
import {HardService} from 'src/app/servicios/hard.service'

@Component({
  selector: 'app-hard',
  templateUrl: './hard.component.html',
  styleUrls: ['./hard.component.css']
})
export class HardComponent implements OnInit {

  skill: Skill [] = [];
  editSkill: Skill | undefined;
  deleteSkill: Skill | undefined;
    

  constructor(public hardService: HardService) {}

  ngOnInit(): void {
    this.getSkill();
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

  public onOpenModal(mode:String, ski?: Skill):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-bs-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-bs-target','#addSkillModal');
    }else if(mode==='delete'){
      this.deleteSkill=ski;
      button.setAttribute('data-bs-target','#deleteSkillModal');
    }else if(mode==='edit'){
      this.editSkill=ski;
      button.setAttribute('data-bs-target','#editSkillModal');
    };
    container?.appendChild(button);
    button.click();
  }

  public onAddSkill(addForm: NgForm):void{
    document.getElementById('add-skill-form')?.click();
    this.hardService.addSkill(addForm.value).subscribe({
      next:(Response: Skill) =>{
        console.log(Response);
        this.getSkill();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
        this.getSkill();
      }
    })
  }

  public onUpdateSkill(skill: Skill):void{
    this.editSkill=skill;
    document.getElementById('add-skill-form')?.click();
    this.hardService.updateSkill(skill).subscribe({
      next:(Response: Skill)=>{
        console.log(Response);
        this.getSkill();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        this.getSkill();
      }
    })
  }

  public onDeleteSkill(idSkill:number):void{
    this.hardService.deleteSkill(idSkill).subscribe({
      next: (Response:void)=>{
        console.log(Response);
        this.getSkill();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        this.getSkill();
      }
    })
  }

}

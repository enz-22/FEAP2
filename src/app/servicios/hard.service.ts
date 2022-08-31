import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/hard.models';


@Injectable({
    providedIn: 'root'
  })

export class HardService{
    private URLS='https://appi2206.herokuapp.com/api/skills/'

    constructor(private http: HttpClient) { }

    public getSkill(): Observable<Skill[]>{
        return this.http.get<Skill[]>(`${this.URLS}all`);
      }
    
      public addSkill(skill: Skill):Observable<Skill>{
        return this.http.post<Skill>(`${this.URLS}add`, skill);
      }
    
      public updateSkill(skill: Skill):Observable<Skill>{
        return this.http.put<Skill>(`${this.URLS}update`,skill);
      }
    
      public deleteSkill(idSkill: number):Observable<void>{
        return this.http.delete<void>(`${this.URLS}delete/${idSkill}`);
      }
}
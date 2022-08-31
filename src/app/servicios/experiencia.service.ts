import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia.models';

@Injectable({
    providedIn: 'root'
})

export class ExperienciaService{
    
    private URLEX='https://appi2206.herokuapp.com/api/experiencia/'

    constructor(private http: HttpClient){}

    public getExperiencia():Observable<Experiencia[]>{
        return this.http.get<Experiencia[]>(`${this.URLEX}all`);
    }

    public addExperiencia(experiencia:Experiencia):Observable<Experiencia>{
        return this.http.post<Experiencia>(`${this.URLEX}add`, experiencia);
    }

    public updateExperiencia(experiencia:Experiencia):Observable<Experiencia>{
        return this.http.put<Experiencia>(`${this.URLEX}update`, experiencia);
    }

    public deleteExperiencia(idExp:number):Observable<void>{
        return this.http.delete<void>(`${this.URLEX}delete/${idExp}`);
    }
}
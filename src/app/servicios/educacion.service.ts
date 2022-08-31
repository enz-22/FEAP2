import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../models/educacion.models';

@Injectable({
    providedIn: 'root'
})

export class EducacionService{
    
    private URLED='https://appi2206.herokuapp.com/api/educacion/'

    constructor(private http: HttpClient){}

    public getEducacion(): Observable<Educacion[]>{
        return this.http.get<Educacion[]>(`${this.URLED}all`);
    }

    public addEducacion(educacion:Educacion):Observable<Educacion>{
        return this.http.post<Educacion>(`${this.URLED}add`, educacion);
    }

    public updateEducacion(educacion:Educacion):Observable<Educacion>{
        return this.http.put<Educacion>(`${this.URLED}update`,educacion);
    }

    public deleteEducacion(idEdu:number):Observable<void>{
        return this.http.delete<void>(`${this.URLED}delete/${idEdu}`);
    }


}
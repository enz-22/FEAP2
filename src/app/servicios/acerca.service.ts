import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acerca } from '../models/acerca.models';

@Injectable({
    providedIn: 'root'
})

export class AcercaService{
    private URLA='https://appi2206.herokuapp.com/api/acerca/'

    constructor(private http:HttpClient){}

    public getAcerca():Observable<Acerca[]>{
        return this.http.get<Acerca[]>(`${this.URLA}all`);
    }

    public addAcerca(acerca:Acerca):Observable<Acerca>{
        return this.http.post<Acerca>(`${this.URLA}add`, acerca);
    }

    public updateAcerca(acerca:Acerca):Observable<Acerca>{
        return this.http.put<Acerca>(`${this.URLA}update`,acerca);
    }

    public deleteAcerca(idacerca:number):Observable<void>{
        return this.http.delete<void>(`${this.URLA}delete/${idacerca}`);
    }
}
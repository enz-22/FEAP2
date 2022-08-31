import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private URLP = 'https://appi2206.herokuapp.com/api/proyecto/'
  
  constructor(private http: HttpClient) { }

  public getProyecto(): Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(`${this.URLP}all`);
  }

  public addProyecto(proyecto: Proyecto):Observable<Proyecto>{
    return this.http.post<Proyecto>(`${this.URLP}add`, proyecto);
  }

  public updateProyecto(proyecto: Proyecto):Observable<Proyecto>{
    return this.http.put<Proyecto>(`${this.URLP}update`,proyecto);
  }

  public deleteProyecto(id: number):Observable<void>{
    return this.http.delete<void>(`${this.URLP}delete/${id}`);
  }
}
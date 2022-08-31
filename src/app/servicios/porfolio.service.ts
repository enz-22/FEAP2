import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {

  URLpor = 'https://appi2206.herokuapp.com/api/';

  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any>
  {
    return this.http.get<any>(`${this.URLpor}acerca/all`);
  }
}

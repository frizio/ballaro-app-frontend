import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Coltivazione} from '../interfaces/coltivazione';

@Injectable({
  providedIn: 'root'
})
export class ColtivazioniService {

  BASE_URL = 'https://ballaro.herokuapp.com/api';

  constructor(
    private http: HttpClient
  ) {  }

  getColtivazioni(provincia: string): Observable<Coltivazione[]> {
    return this.http.get<Coltivazione[]>(`${this.BASE_URL}/coltivazioni/${provincia}/10`);
  }
}

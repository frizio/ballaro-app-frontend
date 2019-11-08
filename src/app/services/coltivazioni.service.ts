import { Coltivazione } from './../interfaces/coltivazione';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColtivazioniService {

  BASE_URL = 'https://ballaro.herokuapp.com/api';

  maxNumero = 10;

  constructor(
    private http: HttpClient
  ) {  }

  getColtivazioni(county: string): Observable<Coltivazione[]> {
    return this.http.get<Coltivazione[]>(`${this.BASE_URL}/coltivazioni/${county}/${this.maxNumero}`);
  }

}

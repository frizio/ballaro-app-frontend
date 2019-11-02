import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColtivazioniService {

  BASE_URL = 'https://ballaro.herokuapp.com/api';

  constructor(
    private http: HttpClient
  ) {  }

  getColtivazioni(provincia: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/coltivazioni/${provincia}/10`);
  }
}

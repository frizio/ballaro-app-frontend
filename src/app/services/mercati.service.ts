import { Mercato } from '../interfaces/mercato';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MercatiService {

  BASE_URL = 'https://ballaro.herokuapp.com/api';

  constructor(
    private http: HttpClient
  ) {  }

  getMercati(): Observable<Mercato[]> {
    return this.http.get<Mercato[]>(`${this.BASE_URL}/mercati`);
  }
}

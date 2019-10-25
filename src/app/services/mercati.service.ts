import { Mercati } from './../interfaces/mercati';
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

  getMercati(): Observable<Mercati[]> {
    return this.http.get<Mercati[]>(`${this.BASE_URL}/product`);
  }
}

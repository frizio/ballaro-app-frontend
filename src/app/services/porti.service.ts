import { Porto } from './../interfaces/porto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortiService {

  BASE_URL = 'https://ballaro.herokuapp.com/api';

  constructor(
    private http: HttpClient
  ) {  }

  getPorti(): Observable<Porto[]> {
    return this.http.get<Porto[]>(`${this.BASE_URL}/porti`);
  }

}

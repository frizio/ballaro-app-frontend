import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  // https://nominatim.openstreetmap.org/reverse?format=json&lat=38.0817&lon=13.5067

  BASE_URL = 'https://nominatim.openstreetmap.org';

  constructor(
    private http: HttpClient
  ) {  }

  reverse(lat: number, lon: number): Observable<any> {
    const paramsUrl = `format=json&lat=${lat}&lon=${lon}`;
    return this.http.get<any>(`${this.BASE_URL}/reverse?${paramsUrl}`);
  }
}

import { PositionInfo } from './../interfaces/position-info';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { GeocodeService } from './geocode.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private currentPositionSubject = new BehaviorSubject<PositionInfo>(null);

  public currentPosition$: Observable<PositionInfo> = this.currentPositionSubject.asObservable();

  constructor(
    private geocodeService: GeocodeService
  ) { }

  private watchPosition(): Observable<Position> {
    return new Observable((observer: Observer<Position>) => {
        navigator.geolocation.watchPosition(
            (position: Position) => {
                // console.log(position);
                observer.next(position);
                observer.complete();
            },
            (error: PositionError) => {
                console.log('Geolocation service: ' + error.message);
                observer.error(error);
            }
        );
    });
  }

  public currentPosition() {
    let currentPosition: PositionInfo;
    if (navigator.geolocation) {
      this.watchPosition().subscribe(
            (position: Position) => {
            // console.log(position);
            currentPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              village: '',
              county: '',
              state: '',
              country: ''
            };
          },
          (error: PositionError) => {
              console.log(error);
              if (error.code > 0) {
                  switch (error.code) {
                    case error.PERMISSION_DENIED:
                      return 'User denied the request for Geolocation.';
                  case error.POSITION_UNAVAILABLE:
                      return 'Location information is unavailable.';
                  case error.TIMEOUT:
                      return 'The request to get user location timed out.';
                  }
              }
          },
          () => {
            console.log('Geolocation service: completed.');
            // console.log(currentPosition);
            this.currentPositionSubject.next(currentPosition);
            // console.log(this.currentPositionSubject.getValue());
            this.reverseGeocodingPosition();
          }
      );
    }
  }

  public reverseGeocodingPosition() {
  const currentPosition = this.currentPositionSubject.getValue();
  this.geocodeService.reverse(currentPosition.latitude, currentPosition.longitude).subscribe(
    res => {
      // console.log(res.address);
      currentPosition.village = res.address.village;
      currentPosition.county = res.address.county;
      currentPosition.state = res.address.state;
      currentPosition.country = res.address.country;
    },
    err => {
      console.log(err);
      alert('Errore in reverse Geocoding');
    },
    () => {
      console.log('Reverse Geocodoing complete');
      this.currentPositionSubject.next(currentPosition);
      // console.log(this.currentPositionSubject.getValue());
    }
  );
  }

}

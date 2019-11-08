import { Injectable } from '@angular/core';
import {LocationInfo} from '../interfaces/location-info';
import {GeocodeService} from './geocode.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  currentLocation: LocationInfo;

  constructor(private geocodeService: GeocodeService) {
    console.log('Location Service Init');
    // Default Values
    this.currentLocation = {
      latitude: 38.12809405,
      longitude: 13.2895060005596,
      village: '',
      county: 'Palermo',
      state: 'Sicilia',
      country: 'Italia'
    };
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position: Position) => {
          console.log('Position change', position);
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.currentLocation = {
            latitude: lat,
            longitude: lon,
            village: '',
            county: '',
            state: '',
            country: ''
          };
          this.geocodeService.reverse(lat, lon).subscribe(
            res => {
              // console.log(res.address);
              this.currentLocation.village = res.address.village;
              this.currentLocation.county = res.address.county;
              this.currentLocation.state = res.address.state;
              this.currentLocation.country = res.address.country;
              // console.log(this.currentLocation);
            },
            err => {
              console.log(err);
              alert('Errore in reverse Geocoding');
            }
          );
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
        }
      );
    } else {
      console.log('browser doesn\'t support geolocation');
    }
  }
}

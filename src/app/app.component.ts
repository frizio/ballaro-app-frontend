import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentLocation = {};

  constructor(
    private swUpdate: SwUpdate
  ) {}

  async ngOnInit() {
    if ( this.swUpdate.isEnabled ) {
      this.swUpdate.available.subscribe(
        () => {
          if ( confirm('Nuova versione di Ballaro\' disponibile. Caricare la nuova versione?') ) {
            window.location.reload();
          }
        }
      );
    }

    const currentPosition = await this.getCurrentPosition();
    this.currentLocation = {
      latitude: currentPosition.coords.latitude,
      longitude: currentPosition.coords.longitude
    };
  }

  getCurrentPosition(options = {}): Promise<Position> {
    return new Promise(
      () => {
        navigator.geolocation.getCurrentPosition(this.resolvePosition, this.rejectPosition, options);
      }
    );
  }

  private resolvePosition(position: Position) {
    if (position) {
      const location = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
      };
      // console.log(position);
      // console.log(location);
    }
  }

  private rejectPosition(error: any) {
    console.log(error);
    switch (error.code) {
        case error.PERMISSION_DENIED:
            return 'User denied the request for Geolocation.';
        case error.POSITION_UNAVAILABLE:
            return 'Location information is unavailable.';
        case error.TIMEOUT:
            return 'The request to get user location timed out.';
        case error.UNKNOWN_ERROR:
            return 'An unknown error occurred.';
    }
  }

}

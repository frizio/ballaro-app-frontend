import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, marker, icon, Map } from 'leaflet';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {

  theMap: Map;

  currentLocation = {};

  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                          {
                            detectRetina: true,
                            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          }
  );

  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
                      {
                        detectRetina: true,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      }
  );

  // Marker for my home
  home = marker(
    [ 38.108, 13.335 ],
    {
      icon: icon(
        {
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png'
        }
      )
    }
);

  // Layers control object with our two base layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    },
    overlays: {
      'My Home': this.home,
      'I Mercati': this.home,
      'I Porti': this.home,
    }
  };

  options = {
    layers: [ this.streetMaps ],
    zoom: 8,
    center: latLng([38.088, 13.155])
  };

  async ngOnInit() {
    console.log('Map ngOnInit');
    const currentPosition = await this.getCurrentPosition();
    this.currentLocation = {
      latitude: currentPosition.coords.latitude,
      longitude: currentPosition.coords.longitude
    };
    console.log(this.currentLocation);
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


  onMapReady(map: Map) {
    console.log('Callback metodo onMapReady');
    this.theMap = map;
  }

  onMapClick(infoClick: any) {
    console.log('Callback metodo onMapClick()');
    console.log(infoClick);
  }

  onMapMove() {
    console.log('Callback metodo onMapMove()');
  }

  onMapZoom() {
    console.log('Callback metodo onMapZoom()');
  }

}



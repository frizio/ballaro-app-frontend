import { MercatiService } from './../../services/mercati.service';
import { Mercato } from './../../interfaces/mercato';
import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, marker, icon, Map, Marker, LatLng } from 'leaflet';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {

  mercati: Mercato[];

  theMap: Map;

  currentLocation = {};
  location: number[] = [];

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

  constructor(
    private mercatiService: MercatiService
  ) {

  }

  ngOnInit() {
    console.log('Map ngOnInit');
    /*
    const currentPosition = await this.getCurrentPosition();
    this.currentLocation = {
      latitude: currentPosition.coords.latitude,
      longitude: currentPosition.coords.longitude
    };
    */
    this.location[0] = + localStorage.getItem('latitude');
    this.location[1] = + localStorage.getItem('longitude');

    this.getMercati();
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
    const locationMarker = this.generateMarker(this.location, 'orange');
    locationMarker.addTo(this.theMap);
    this.theMap.setView(new LatLng(this.location[0], this.location[1]), 9);
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

  generateMarker(position: number[], color: string): Marker {
    return marker(
      [ position[0], position[1] ],
      {
        icon: icon(
          {
            iconUrl: `assets/leaflet-color-markers/img/marker-icon-${color}.png`,
            shadowUrl: 'assets/leaflet-color-markers/img/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          }
        )
      }
    );
  }

  getMercati() {
    this.mercatiService.getMercati().subscribe(
      res => {
        // console.log('OK');
        this.mercati = res;
        this.mercati.forEach(mercato => {
          // console.log(mercato);
          const theMarker = this.generateMarker([mercato.longitude, mercato.latitude], 'green');
          const template = `<table><tr><th>Nome</th><th>${mercato.nome}</th></tr><tr><td>Citta</td><td>${mercato.comune}</td></tr></table>`;
          theMarker.bindPopup(template).openPopup();
          theMarker.addTo(this.theMap);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

}



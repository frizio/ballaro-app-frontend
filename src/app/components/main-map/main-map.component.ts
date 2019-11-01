import { ColtivazioniService } from './../../services/coltivazioni.service';
import { LocationInfo } from '../../interfaces/location-info';
import { GeocodeService } from './../../services/geocode.service';
import { Porto } from './../../interfaces/porto';
import { PortiService } from './../../services/porti.service';
import { Observable, Observer } from 'rxjs';
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
  porti: Porto[];

  theMap: Map;

  currentLocation: LocationInfo;

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
    private mercatiService: MercatiService,
    private portiService: PortiService,
    private coltivazioniService: ColtivazioniService,
    private geocodeService: GeocodeService
  ) {  }

  ngOnInit() {
    console.log('Map ngOnInit');
    this.getMercati();
    this.getPorti();
 }

  getCurrentPosition(): Observable<Position> {
    return new Observable((observer: Observer<Position>) => {
        // Invokes getCurrentPosition method of Geolocation API.
        navigator.geolocation.watchPosition(
            (position: Position) => {
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

  onMapReady(map: Map) {
    console.log('Callback metodo onMapReady');
    this.theMap = map;

    if (navigator.geolocation) {
      this.getCurrentPosition().subscribe(
            (position: Position) => {
            // console.log(position);
            this.currentLocation = {
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

            this.geocodeService.reverse(this.currentLocation.latitude, this.currentLocation.longitude).subscribe(
              res => {
                // console.log(res.address);
                this.currentLocation.village = res.address.village;
                this.currentLocation.county = res.address.county;
                this.currentLocation.state = res.address.state;
                this.currentLocation.country = res.address.country;
                console.log(this.currentLocation);
              },
              err => {
                console.log(err);
              },
              () => {
                console.log('Reverse Geocodoing complete');
                let tmp: any;
                this.coltivazioniService.getColtivazioni(this.currentLocation.county).subscribe(
                  res => {
                    tmp = res;
                  },
                  err => {
                    console.log(err);
                  },
                  () => {
                    // console.log(tmp);
                    const locationMarker = this.generateMarker([this.currentLocation.latitude, this.currentLocation.longitude], 'orange');
                    let template = `<h5>Prodotti più coltivati nei dintorni (quintali)</h5>`;
                    template += '<table>';
                    for (let i = 0; i < tmp.length; i++) {
                      const row = `<tr><td>${tmp[i].tipo}</td><td>${tmp[i].quantita}</td></tr>`;
                      template += row;
                    }
                    template += '</table>';
                    locationMarker.bindPopup(template);
                    locationMarker.addTo(this.theMap);
                    this.theMap.setView(new LatLng(this.currentLocation.latitude, this.currentLocation.longitude), 9);
                  }
                );
              }
            );
          }
        );
      } else {
        console.log('browser doesn\'t support geolocation');
    }

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
          const theMarker = this.generateMarker([mercato.latitude, mercato.longitude], 'green');
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

  getPorti() {
    this.portiService.getPorti().subscribe(
      res => {
        // console.log('OK');
        this.porti = res;
        this.porti.forEach(porto => {
          // console.log(mercato);
          const theMarker = this.generateMarker([porto.latitude, porto.longitude], 'blue');
          const template = `<table><tr><th>Nome</th><th>${porto.nome}</th></tr><tr><td>Citta</td><td>${porto.id}</td></tr></table>`;
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



import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, marker, icon } from 'leaflet';

declare var ol: any;

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {

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
      'My Home': this.home
    }
  };

  options = {
    layers: [ this.streetMaps ],
    zoom: 11,
    center: latLng([38.088, 13.155])
  };
  ngOnInit(): void {
    
  }

}



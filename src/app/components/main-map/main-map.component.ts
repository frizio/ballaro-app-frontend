import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';

declare var ol: any;

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {

  options = {
    layers: [
      tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {maxZoom: 19, attribution: '&copy; OpenStreetMap contributors'}
      )
    ],
    zoom: 11,
    center: latLng([38.088, 13.155])
  };

  ngOnInit(): void {
    
  }

}



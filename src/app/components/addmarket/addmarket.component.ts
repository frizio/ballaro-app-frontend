import { Component, OnInit } from '@angular/core';
import {FormBuilder, NgModel} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { PositionInfo } from './../../interfaces/position-info';
import { tileLayer, latLng, marker, icon, Map, Marker, LatLng, LayerGroup, Control, Layer, TileLayer } from 'leaflet';
import {PositionService} from '../../services/position.service';

@Component({
  selector: 'app-add-market',
  templateUrl: './addmarket.component.html',
  styleUrls: ['./addmarket.component.css']
})
export class AddMarketComponent implements OnInit {
  checkoutForm;

  theMap: Map;
  currentPosition: PositionInfo = null;
  selected = 'Everyday';
  marker: any;

  // Define our base layers so we can reference them multiple times
  streetMaps: TileLayer = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  );

  wMaps: TileLayer = new TileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
    {
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  );

  layersControl: Control.Layers = new Control.Layers();

  options = {
    layers: [ this.streetMaps ],
    zoom: 6,
    center: latLng([40.995, 12.076])
  };

  constructor(
    private positionService: PositionService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.positionService.currentPosition();
    this.checkoutForm = this.formBuilder.group({
      market: '',
      day: this.selected,
      other: '',
      lat: '',
      lon: ''
    });
  }

  ngOnInit() {
    console.log('Map ngOnInit');
    this.positionService.currentPosition$.subscribe(pos => {
      if (pos !== null) {
        if (this.currentPosition === null && this.theMap !== undefined) {
          this.marker = this.generateMarker([pos.latitude, pos.longitude], 'red').addTo(this.theMap);
          this.theMap.setView(new LatLng(pos.latitude, pos.longitude), 15);
        }
        this.currentPosition = pos;
      }
    });
  }

  onMapReady(map: Map) {
    console.log('Callback metodo onMapReady');
    this.theMap = map;
    map.zoomControl.remove();
    this.layersControl.addBaseLayer(this.streetMaps, 'Streets Maps');
    this.layersControl.addBaseLayer(this.wMaps, 'Wikimedia Maps');
    this.layersControl.addTo(this.theMap);

    if (this.currentPosition) {
      this.marker = this.generateMarker([this.currentPosition.latitude, this.currentPosition.longitude], 'red').addTo(this.theMap);
      this.theMap.setView(new LatLng(this.currentPosition.latitude, this.currentPosition.longitude), 15);
    }
  }

  onMapClick(infoClick: any) {
    console.log('Callback metodo onMapClick()');
    this.theMap.removeLayer(this.marker);
    this.marker = this.generateMarker([infoClick.latlng.lat, infoClick.latlng.lng], 'red').addTo(this.theMap);
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

  onProfileChange(value) {
    this.checkoutForm.day = value;
  }

  onSubmit(marketData) {
    marketData.lat = this.marker._latlng.lat;
    marketData.lon = this.marker._latlng.lng;
    console.log(marketData);
    this.http.post('https://ballaro.herokuapp.com/api/add-market', marketData).subscribe(
      data => {
        this.snackBar.open('Success', null, {
          duration: 3000,
        });
      },
      error => {
        this.snackBar.open('Error', null, {
          duration: 3000,
        });
      }
    );
    // Process checkout data here
    console.warn('Market data has been submitted', marketData);

    this.checkoutForm.reset();
    this.selected = 'Everyday';
    this.checkoutForm.day = this.selected;
  }
}

import { PositionInfo } from './../../interfaces/position-info';
import { PositionService } from './../../services/position.service';
import { ColtivazioniService } from './../../services/coltivazioni.service';
import { GeocodeService } from './../../services/geocode.service';
import { Porto } from './../../interfaces/porto';
import { PortiService } from './../../services/porti.service';
import { Observable, Observer } from 'rxjs';
import { MercatiService } from './../../services/mercati.service';
import { Mercato } from './../../interfaces/mercato';
import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, marker, icon, Map, Marker, LatLng, LayerGroup, Control, Layer, TileLayer } from 'leaflet';

declare var ol: any;

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {

  mercati: Mercato[];
  mercatiLayerGroup: LayerGroup;

  porti: Porto[];
  portiLayerGroup: LayerGroup;

  theMap: Map;

  currentPosition: PositionInfo;
  currentPositionMarker: any;

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
    zoom: 8,
    center: latLng([38.088, 13.155])
  };

  constructor(
    private positionService: PositionService,
    private mercatiService: MercatiService,
    private portiService: PortiService,
    private coltivazioniService: ColtivazioniService,
    private geocodeService: GeocodeService
  ) {  }

  ngOnInit() {
    console.log('Map ngOnInit');
    this.getMercati();
    this.getPorti();
    this.positionService.currentPosition$.subscribe(
      pos => this.currentPosition = pos
    );
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
    map.zoomControl.remove();
    this.layersControl.addBaseLayer(this.streetMaps, 'Streets Maps');
    this.layersControl.addBaseLayer(this.wMaps, 'Wikimedia Maps');
    this.layersControl.addTo(this.theMap);

    this.currentPositionMarker =
      this.generateMarker([this.currentPosition.latitude, this.currentPosition.longitude], 'red').addTo(this.theMap);
    let tmp: any;
    this.coltivazioniService.getColtivazioni(this.currentPosition.county).subscribe(
      res => {
        tmp = res;
      },
      err => {
        console.log(err);
      },
      () => {
        // console.log(tmp);
        let template = `<h5>Prodotti più coltivati nei dintorni (quintali)</h5>`;
        template += '<table>';
        for (const t of tmp) {
          const row = `<tr><td>${t.tipo}</td><td>${t.quantita}</td></tr>`;
          template += row;
        }
        template += '</table>';
        this.currentPositionMarker.bindPopup(template);
        this.currentPositionMarker.addTo(this.theMap);
        this.theMap.setView(new LatLng(this.currentPosition.latitude, this.currentPosition.longitude), 9);
      }
    );
  }

  onMapClick(infoClick: any) {
    console.log('Callback metodo onMapClick()');
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
    const tmp = [];
    this.mercatiService.getMercati().subscribe(
      res => {
        // console.log('OK');
        this.mercati = res;
        this.mercati.forEach(mercato => {
          // console.log(mercato);
          const theMarker = this.generateMarker([mercato.latitude, mercato.longitude], 'green');
          const template = `<table><tr><th>Nome</th><th>${mercato.nome}</th></tr><tr><td>Citta</td><td>${mercato.comune}</td></tr></table>`;
          theMarker.bindPopup(template).openPopup();
          // theMarker.addTo(this.theMap);
          tmp.push(theMarker);
        });
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('Mercati received');
        this.mercatiLayerGroup = new LayerGroup(tmp);
        this.layersControl.addOverlay(this.mercatiLayerGroup, 'Mercati');
        this.mercatiLayerGroup.addTo(this.theMap);
      }
    );
  }

  getPorti() {
    const tmp = [];
    this.portiService.getPorti().subscribe(
      res => {
        // console.log('OK');
        this.porti = res;
        this.porti.forEach(porto => {
          const theMarker = this.generateMarker([porto.latitude, porto.longitude], 'blue').bindTooltip(porto.nome);
          // const template = `<table><tr><th>Nome</th><th>${porto.nome}</th></tr><tr><td>Citta</td><td>${porto.id}</td></tr></table>`;
          // theMarker.bindPopup(template).openPopup();
          theMarker.on('click', this.onPortoClick, this);
          // theMarker.addTo(this.theMap)
          tmp.push(theMarker);
        });
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('Porti received');
        this.portiLayerGroup = new LayerGroup(tmp);
        this.layersControl.addOverlay(this.portiLayerGroup, 'Porti');
        this.portiLayerGroup.addTo(this.theMap);
      }
    );
  }

  onPortoClick(event: any) {
    // console.log(event);
    const theMarker = event.target;
    const porto = theMarker.getTooltip().getContent().trim();
    // console.log(nomePorto);
    // theMarker.bindPopup('Porto details').openPopup();
    this.portiService.getPescatoPerPorto(porto).subscribe(
      (res) => {
        // console.log(res);
        if (res) {
          let template = `<h5>Porto di ${porto} - Quantità pescato (quintali)</h5>`;
          template += '<table>';
          for (const pescato of res) {
            const row = `<tr><td>${pescato.specie}</td><td>${pescato.quantita}</td></tr>`;
            template += row;
          }
          template += '</table>';
          theMarker.bindPopup(template).openPopup();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}



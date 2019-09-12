import { Component, OnInit } from '@angular/core';

declare var ol: any;

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {

  latitude  = 41.6561;
  longitude = 12.4073;

  map: any;


  ngOnInit() {

    //
    this.map = new ol.Map(
      {
        target: 'map',
        layers: [
          new ol.layer.Tile( { source: new ol.source.OSM() } )
        ],
        view:
          new ol.View(
            {
              center: ol.proj.fromLonLat([this.longitude, this.latitude]),
              zoom: 6
            }
          )
      }
    );

    //
    this.map.on(
      'click',
      (args: any) => {
        console.log(args.coordinate);
        const lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
        console.log(lonlat);
        const lon = lonlat[0];
        const lat = lonlat[1];
        alert(`latitude: ${lat} longitude: ${lon}`);
    });

  }

  //
  setCenter() {
    const view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(8);
  }

}



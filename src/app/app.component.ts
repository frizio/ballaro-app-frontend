import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {LocationService} from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private swUpdate: SwUpdate,
    private location: LocationService
  ) {}

  ngOnInit() {
    if ( this.swUpdate.isEnabled ) {
      this.swUpdate.available.subscribe(
        () => {
          if ( confirm('Nuova versione di Ballaro\' disponibile. Caricare la nuova versione?') ) {
            window.location.reload();
          }
        }
      );
    }
  }
}

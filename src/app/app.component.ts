import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private swUpdate: SwUpdate
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

    // Usato solamente per richiedere l'accesso alla posizione all'apertura dell'app
    this.getLocation();
  }


  private getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.onLocationFound, this.onLocationError);
    } else {
        console.log('Attivare il sensore GPS del dispositivo per utilizzare l\'app');
    }
  }
  private onLocationFound(event: any) {
    // console.log(event);
  }
  private onLocationError(event: any) {
    alert(event.message);
  }

}

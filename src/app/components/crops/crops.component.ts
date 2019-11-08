import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../services/location.service';
import {ColtivazioniService} from '../../services/coltivazioni.service';
import {Coltivazione} from '../../interfaces/coltivazione';

@Component({
  selector: 'app-crops',
  templateUrl: './crops.component.html',
  styleUrls: ['./crops.component.css']
})
export class CropsComponent implements OnInit {

  provincia = '';
  displayedColumns: string[] = ['id', 'provincia', 'quantita', 'tipo'];
  dataSource: Coltivazione[] = [];

  constructor(private coltivazioniService: ColtivazioniService,
              private locationService: LocationService) {
    this.provincia = locationService.currentLocation.county;
  }

  ngOnInit() {
    this.coltivazioniService.getColtivazioni(this.locationService.currentLocation.county).subscribe(
      res => {
        this.dataSource = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}

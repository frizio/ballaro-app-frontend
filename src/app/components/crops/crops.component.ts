import { DataStoreService } from './../../services/data-store.service';
import { Coltivazione } from './../../interfaces/coltivazione';
import { PositionInfo } from './../../interfaces/position-info';
import { ColtivazioniService } from './../../services/coltivazioni.service';
import { PositionService } from './../../services/position.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crops',
  templateUrl: './crops.component.html',
  styleUrls: ['./crops.component.css']
})
export class CropsComponent implements OnInit {

  provincia: string;
  coltivazioni: Coltivazione[];

  displayedColumns: string[] = ['tipo', 'quantita'];

  constructor(
    private positionService: PositionService,
    private coltivazioniService: ColtivazioniService,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    this.positionService.currentPosition$.subscribe( pos => this.provincia = pos.county );
    this.coltivazioniService.getColtivazioni(this.provincia).subscribe( colt => this.coltivazioni = colt );
  }

  goToMercatiMap() {
    console.log('Vai alla mappa');
    this.dataStoreService.navFlag = 'mercati';
  }

}

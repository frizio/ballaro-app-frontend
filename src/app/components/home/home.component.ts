import { DataStoreService } from './../../services/data-store.service';
import { Observable } from 'rxjs';
import { PositionInfo } from './../../interfaces/position-info';
import { PositionService } from './../../services/position.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentPosition$: Observable<PositionInfo>;

  constructor(
    private positionService: PositionService,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    this.positionService.currentPosition();
    this.currentPosition$ = this.positionService.currentPosition$;
    this.dataStoreService.getMercati();
    this.dataStoreService.getPorti();
  }

}

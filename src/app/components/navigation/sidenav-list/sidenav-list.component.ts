import { DataStoreService } from './../../../services/data-store.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output()
  closeSidenav = new EventEmitter<void>();

  constructor(
    private router: Router,
    private dataStore: DataStoreService
  ) { }

  ngOnInit() {
  }

  onClose(page: string) {
    this.closeSidenav.emit();

    if (page === 'map') {
      this.dataStore.navFlag = page;
    }

    this.router.navigate([page], { replaceUrl: true, state: {data: 'ciao'} });
  }

}

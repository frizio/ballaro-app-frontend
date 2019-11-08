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
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClose(page: string) {
    this.closeSidenav.emit();

    //this.router.navigate([page], { replaceUrl: true, state: {data: 'ciao'} });
  }

}

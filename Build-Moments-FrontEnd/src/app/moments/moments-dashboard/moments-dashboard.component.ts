import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moments-dashboard',
  templateUrl: './moments-dashboard.component.html',
  styleUrls: ['./moments-dashboard.component.scss'],
})
export class MomentsDashboardComponent {
  opened: boolean = true;
  panelOpenState: boolean = false;

  constructor() {}
}

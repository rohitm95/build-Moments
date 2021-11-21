import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  opened:boolean = true;
  panelOpenState:boolean = false;
  
  constructor() {}

  ngOnInit(): void {}
}



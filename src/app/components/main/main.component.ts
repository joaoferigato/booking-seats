import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  selectedSeat: Event;

  receiveSelectSeat(event): void {
    this.selectedSeat = event;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

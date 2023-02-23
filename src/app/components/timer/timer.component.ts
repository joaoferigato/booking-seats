import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  minutes: number = 5
  seconds: number = (this.minutes * 60)
  counter: number = this.seconds
  counterObs: Observable<number> = interval(1000)
  timer: Subscription

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.timer = this.counterObs.subscribe(val => {
      let count = this.seconds
      count -= val
      this.counter = count
      if (count <= 0) {
        location.reload()
      }
    })
  }

  ngOnDestroy(): void {
    this.timer.unsubscribe()
  }

}
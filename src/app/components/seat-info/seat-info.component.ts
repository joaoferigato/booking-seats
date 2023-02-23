import { Component, Input, OnChanges, Renderer2, ViewChild } from '@angular/core';
import { DataShareService } from './../../services/data-share.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seat-info',
  templateUrl: './seat-info.component.html',
  styleUrls: ['./seat-info.component.css']
})
export class SeatInfoComponent implements OnChanges {

  @Input() selectedSeat: Event;
  totSelSeats = 0;
  seatsArr: Array<string> = [];
  seatsList: string;

  row = {
    left: 18,
    center: 20,
    right: 18
  }

  constructor(
    private dataShare: DataShareService,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.dataShare.currentMessage.subscribe(data => {
      if (data && data.clicked) {
        this.totSelSeats = 0
        this.seatsArr = [];
        this.seatsList = ''
      }
    })

  }
  
  ngOnChanges(): void {

    if (this.selectedSeat) {

      const el = this.selectedSeat.target as HTMLElement
      const elClass = el.className
      const seatNum = el.innerText    
      
      if (elClass === 'seat') {
        this.render.removeClass(el, 'seat')
        this.render.addClass(el, 'seat-selected')
        this.totSelSeats++
        this.seatsArr.push(seatNum)
      } else if (elClass === 'seat-selected') {
        this.render.removeClass(el, 'seat-selected')
        this.render.addClass(el, 'seat')
        this.totSelSeats--
        if (this.seatsArr.indexOf(seatNum) >= 0) {
          this.seatsArr.splice(this.seatsArr.indexOf(seatNum), 1)
        }
      }

      this.seatsList = this.seatsArr.join(', ')

    }

  }

  @ViewChild('form') form: NgForm

  changeRows(): void {
    this.dataShare.changeMessage({row: this.row})
    this.render.setProperty(this.form.form, 'pristine', true)
  }

}

import { Component, Output, EventEmitter, ViewChild, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { DataShareService } from './../../services/data-share.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})

export class SeatSelectionComponent implements AfterViewInit {
  
  @Output() sendSelectedSeat = new EventEmitter<Event>();
  
  @ViewChild('leftSection') leftSection: ElementRef;
  @ViewChild('centerSection') centerSection: ElementRef;
  @ViewChild('rightSection') rightSection: ElementRef;

  initialLeftRows: number = 18;
  initialCenterRows: number = 20;
  initialRightRows: number = 18;

  constructor(
    private renderer: Renderer2,
    private dataService: DataShareService) {
  }

  ngAfterViewInit(): void {
    this.renderSeats(this.leftSection, 'A', this.initialLeftRows, 6);
    this.renderSeats(this.centerSection, 'B', this.initialCenterRows, 8);
    this.renderSeats(this.rightSection, 'C', this.initialRightRows, 6);

    this.dataService.currentMessage.subscribe(data => {
      if (data && data.row) {
        this.updateRows(data.row.left, data.row.center, data.row.right)
      }
    })
  }

  selectSeat(event): void {
    this.sendSelectedSeat.emit(event);
  }

  renderSeats(section: ElementRef, sectionLetter: string, rows: number, seats: number): void {
    let startingLetter = `A`;

    for (let r = 0; r < rows; r++) {

      const ul = this.renderer.createElement('ul');
      this.renderer.addClass(ul, 'seats-row');
      this.renderer.appendChild(section.nativeElement, ul);

      for (let s = 0; s < seats; s++) {

        const li = this.renderer.createElement('li');
        this.renderer.addClass(li, 'seat');
        this.renderer.listen(li, 'click', (event) => {
          this.selectSeat(event);
        });

        const p = this.renderer.createElement('p');
        this.renderer.addClass(p, 'seat-text');
        this.renderer.setProperty(p, 'innerText', `${sectionLetter}${startingLetter}${s + 1}`);
        this.renderer.appendChild(li, p);

        this.renderer.appendChild(ul, li);

      }

      startingLetter = String.fromCharCode(startingLetter.charCodeAt(startingLetter.length - 1) + 1);

    }
  }

  updateRows(rowsLeft: number, rowsCenter: number, rowsRight: number): void {
    this.renderer.setProperty(this.leftSection.nativeElement, 'innerHTML', '')
    this.renderer.setProperty(this.centerSection.nativeElement, 'innerHTML', '')
    this.renderer.setProperty(this.rightSection.nativeElement, 'innerHTML', '')
    this.renderSeats(this.leftSection, 'A', rowsLeft, 6);
    this.renderSeats(this.centerSection, 'B', rowsCenter, 8);
    this.renderSeats(this.rightSection, 'C', rowsRight, 6);
    this.dataService.changeMessage({clicked: true})
  }

}
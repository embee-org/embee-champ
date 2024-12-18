import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-win-points',
  imports: [CommonModule],
  templateUrl: './win-points.component.html',
  styleUrl: './win-points.component.css',
})
export class WinPointsComponent {
  view = false;
  name?: string;
  points?: number;
  timer?: any;

  private initTimeOut(): void {
    this.timer = setTimeout(() => {
      this.view = false;
    }, 1200);
  }

  show(name: string, points: number): void {
    clearInterval(this.timer);
    this.view = false;
    this.name = name;
    this.points = points;
    this.view = true;
    this.initTimeOut();
  }
}

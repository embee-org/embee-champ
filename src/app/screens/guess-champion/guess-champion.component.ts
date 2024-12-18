import { Winner } from '@/models/types/winner.type';
import { GuessChampsService } from '@/services/guess-champs.service';
import { StepsService } from '@/services/steps.service';
import { Component, OnInit } from '@angular/core';

type Ranking = {
  name: string;
  position: number;
};

@Component({
  selector: 'app-guess-champion',
  imports: [],
  templateUrl: './guess-champion.component.html',
  styleUrl: './guess-champion.component.css',
})
export class GuessChampionComponent implements OnInit {
  ranking: Ranking[] = [];

  constructor(
    private guessChampsService: GuessChampsService,
    private stepService: StepsService
  ) {}

  ngOnInit(): void {
    this.initListener();
    this.initRanking();
  }

  private initRanking(): void {
    const ranks = this.guessChampsService.winners
      .sort((a, b) => b.points - a.points)
      .slice(0, 3);
    this.ranking = ranks.map((rank) =>
      this.winnerByRank(rank, ranks.indexOf(rank) + 1)
    );
  }

  private initListener(): void {
    setTimeout(() => {
      this.guessChampsService.reset();
      this.stepService.initialStep();
    }, 15000);
  }

  winnerByRank(winner: Winner, position: number): Ranking {
    return {
      name: winner?.name,
      position,
    };
  }
}

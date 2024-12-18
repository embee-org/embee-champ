import { Champ } from '@/models/types/champ.type';
import { Winner } from '@/models/types/winner.type';
import { Injectable } from '@angular/core';

@Injectable()
export class GuessChampsService {
  champs: Champ[];
  winners: Winner[] = [];

  constructor() {
    this.champs = [];
    this.winners = [];
  }

  getPoints(quantitySkillsShow: number): number {
    if (quantitySkillsShow === 1) return 50;
    if (quantitySkillsShow === 2) return 40;
    if (quantitySkillsShow === 3) return 30;
    if (quantitySkillsShow === 4) return 20;
    return 10;
  }

  initGame(allChamps: Champ[]): void {
    const randomChamps = allChamps.sort(() => Math.random() - 0.5).slice(0, 1);
    this.champs = randomChamps;
    this.winners = [];
  }

  guessedChampion(name: string, points: number): void {
    this.champs = this.champs.filter((_, idx) => idx !== 0);
    if (this.winners.some((winner) => winner.name === name)) {
      this.winners = this.winners.map((winner) => {
        if (winner.name === name) winner.points = winner.points + points;
        return winner;
      });
      return;
    }
    this.winners.push({ name, points });
  }

  reset(): void {
    this.champs = [];
    this.winners = [];
  }
}

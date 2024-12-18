import { Injectable } from '@angular/core';

@Injectable()
export class StepsService {
  private step = 0;

  initialStep(): void {
    this.step = 0;
  }

  guessChampStep(): void {
    this.step = 1;
  }

  finishGameStep(): void {
    this.step = 2;
  }

  get isInitialStep(): boolean {
    return this.step === 0;
  }

  get isGuessChampStep(): boolean {
    return this.step === 1;
  }

  get isFinishGameStep(): boolean {
    return this.step === 2;
  }
}

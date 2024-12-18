import { Champ } from '@/models/types/champ.type';
import { GamePresentationComponent } from '@/screens/game-presentation/game-presentation.component';
import { GameRankingComponent } from '@/screens/game-ranking/game-ranking.component';
import { GuessChampionComponent } from '@/screens/guess-champion/guess-champion.component';
import { ChampsService } from '@/services/champs.service';
import { GuessChampsService } from '@/services/guess-champs.service';
import { StepsService } from '@/services/steps.service';
import { TmiClientService } from '@/services/tmi-client.service';
import { SubscriptionManager } from '@/utils/subscription-manager';
import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    GamePresentationComponent,
    GameRankingComponent,
    GuessChampionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    TmiClientService,
    StepsService,
    ChampsService,
    GuessChampsService,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  champs: Champ[] = [];
  winner?: string;
  subscriptionManager = new SubscriptionManager();

  constructor(
    private champService: ChampsService,
    private tmiClientService: TmiClientService,
    private stepsService: StepsService
  ) {}

  ngOnInit(): void {
    this.getChamps();
    this.initListener();
  }

  ngOnDestroy(): void {
    this.tmiClientService.disconnect();
    this.subscriptionManager.destroy();
  }

  private getChamps(): void {
    this.subscriptionManager.add(
      this.champService.get().subscribe(({ champs }) => (this.champs = champs))
    );
  }

  private initListener(): void {
    this.tmiClientService
      .connect()
      .then(() => this.tmiClientService.isConnected.next(true));
  }

  get isInitialStep(): boolean {
    return this.stepsService.isInitialStep;
  }

  get isGuessChampStep(): boolean {
    return this.stepsService.isGuessChampStep;
  }

  get isFinishGameStep(): boolean {
    return this.stepsService.isFinishGameStep;
  }
}

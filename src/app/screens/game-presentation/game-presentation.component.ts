import { StepsService } from '@/services/steps.service';
import { TmiClientService } from '@/services/tmi-client.service';
import { SubscriptionManager } from '@/utils/subscription-manager';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-presentation',
  imports: [],
  templateUrl: './game-presentation.component.html',
  styleUrl: './game-presentation.component.css',
})
export class GamePresentationComponent implements OnInit, OnDestroy {
  subscriptionManager = new SubscriptionManager();

  constructor(
    private tmiClientService: TmiClientService,
    private stepService: StepsService
  ) {}

  ngOnInit(): void {
    this.initListener();
  }

  ngOnDestroy(): void {
    this.subscriptionManager.destroy();
  }

  private initListener(): void {
    this.subscriptionManager.add(
      this.tmiClientService.isConnected.subscribe((isConnected) => {
        if (isConnected) this.listenerMessages();
      })
    );
  }

  private listenerMessages(): void {
    this.tmiClientService.client.on(
      'message',
      (_channel, _tags, message, self) => {
        if (self) return;
        if (message === '!champs') this.stepService.guessChampStep();
      }
    );
  }
}

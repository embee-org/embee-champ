import { ViewSkillComponent } from '@/components/view-skill/view-skill.component';
import { WinPointsComponent } from '@/components/win-points/win-points.component';
import { Champ } from '@/models/types/champ.type';
import { Skill } from '@/models/types/skill.type';
import { GuessChampsService } from '@/services/guess-champs.service';
import { SkillsService } from '@/services/skills.service';
import { StepsService } from '@/services/steps.service';
import { TmiClientService } from '@/services/tmi-client.service';
import { SubscriptionManager } from '@/utils/subscription-manager';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-ranking',
  imports: [CommonModule, ViewSkillComponent, WinPointsComponent],
  templateUrl: './game-ranking.component.html',
  styleUrl: './game-ranking.component.css',
  providers: [SkillsService],
})
export class GameRankingComponent implements OnInit, OnDestroy {
  @Input() allChamps: Champ[] = [];
  @ViewChild('winPoints') winPoints?: WinPointsComponent;
  subscriptionManager = new SubscriptionManager();

  constructor(
    private tmiClientService: TmiClientService,
    private guessChampsService: GuessChampsService,
    private skillsService: SkillsService,
    private stepService: StepsService
  ) {}

  ngOnInit(): void {
    this.initGame();
    this.initListener();
  }

  ngOnDestroy(): void {
    this.subscriptionManager.destroy();
    this.skillsService.destroy();
  }

  private initListener(): void {
    this.tmiClientService.client.on('message', (_channel, tags, message) => {
      const champ = this.champs[0];
      if (champ && message.toLowerCase() === champ.name.toLowerCase()) {
        const points = this.guessChampsService.getPoints(
          this.skills.filter((skill) => skill.show).length
        );
        this.winPoints?.show(tags['username'] ?? 'Anonymous', points);
        this.guessChampsService.guessedChampion(
          tags['username'] ?? 'Anonymous',
          points
        );
        this.skillsService.reset();
        this.skillsService.init();
        if (!this.champs.length) this.stepService.finishGameStep();
      }
    });
  }

  private initGame(): void {
    this.guessChampsService.initGame(this.allChamps);
    this.skillsService.init();
  }

  get skills(): Skill[] {
    return this.skillsService.skills;
  }

  get champs(): Champ[] {
    return this.guessChampsService.champs;
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessChampionComponent } from './guess-champion.component';

describe('GuessChampionComponent', () => {
  let component: GuessChampionComponent;
  let fixture: ComponentFixture<GuessChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessChampionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

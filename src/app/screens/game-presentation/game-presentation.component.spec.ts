import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePresentationComponent } from './game-presentation.component';

describe('GamePresentationComponent', () => {
  let component: GamePresentationComponent;
  let fixture: ComponentFixture<GamePresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

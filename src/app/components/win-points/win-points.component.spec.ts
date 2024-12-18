import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinPointsComponent } from './win-points.component';

describe('WinPointsComponent', () => {
  let component: WinPointsComponent;
  let fixture: ComponentFixture<WinPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutetrackerComponent } from './routetracker.component';

describe('RoutetrackerComponent', () => {
  let component: RoutetrackerComponent;
  let fixture: ComponentFixture<RoutetrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutetrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutetrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProconComponent } from './procon.component';

describe('ProconComponent', () => {
  let component: ProconComponent;
  let fixture: ComponentFixture<ProconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

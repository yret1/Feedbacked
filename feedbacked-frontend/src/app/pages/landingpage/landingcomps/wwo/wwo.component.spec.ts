import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WwoComponent } from './wwo.component';

describe('WwoComponent', () => {
  let component: WwoComponent;
  let fixture: ComponentFixture<WwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

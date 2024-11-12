import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderboxComponent } from './headerbox.component';

describe('HeaderboxComponent', () => {
  let component: HeaderboxComponent;
  let fixture: ComponentFixture<HeaderboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

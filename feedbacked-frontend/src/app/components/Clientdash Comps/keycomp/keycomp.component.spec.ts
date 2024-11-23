import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeycompComponent } from './keycomp.component';

describe('KeycompComponent', () => {
  let component: KeycompComponent;
  let fixture: ComponentFixture<KeycompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeycompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeycompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

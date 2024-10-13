import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientissuesComponent } from './clientissues.component';

describe('ClientissuesComponent', () => {
  let component: ClientissuesComponent;
  let fixture: ComponentFixture<ClientissuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientissuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientissuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

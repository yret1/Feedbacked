import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientoverviewmodalComponent } from './clientoverviewmodal.component';

describe('ClientoverviewmodalComponent', () => {
  let component: ClientoverviewmodalComponent;
  let fixture: ComponentFixture<ClientoverviewmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientoverviewmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientoverviewmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagedisplayboxComponent } from './messagedisplaybox.component';

describe('MessagedisplayboxComponent', () => {
  let component: MessagedisplayboxComponent;
  let fixture: ComponentFixture<MessagedisplayboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagedisplayboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagedisplayboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

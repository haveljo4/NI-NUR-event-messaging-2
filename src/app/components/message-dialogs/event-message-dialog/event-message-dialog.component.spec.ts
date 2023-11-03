import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMessageDialogComponent } from './event-message-dialog.component';

describe('EventMessageDialogComponent', () => {
  let component: EventMessageDialogComponent;
  let fixture: ComponentFixture<EventMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventMessageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

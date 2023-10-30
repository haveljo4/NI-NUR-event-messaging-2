import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseEventsComponent } from './database-events.component';

describe('DatabaseEventsComponent', () => {
  let component: DatabaseEventsComponent;
  let fixture: ComponentFixture<DatabaseEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

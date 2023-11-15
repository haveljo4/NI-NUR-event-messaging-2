import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMessageDialogComponent } from './group-message-dialog.component';

describe('GroupMessageDialogComponent', () => {
  let component: GroupMessageDialogComponent;
  let fixture: ComponentFixture<GroupMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupMessageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

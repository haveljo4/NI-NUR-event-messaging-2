import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DatabaseGroupsComponent } from "./database-groups.component";

describe("DatabaseGroupsComponent", () => {
  let component: DatabaseGroupsComponent;
  let fixture: ComponentFixture<DatabaseGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

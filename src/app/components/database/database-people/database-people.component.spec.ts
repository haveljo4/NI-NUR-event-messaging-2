import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DatabasePeopleComponent } from "./database-people.component";

describe("DatabasePeopleComponent", () => {
  let component: DatabasePeopleComponent;
  let fixture: ComponentFixture<DatabasePeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabasePeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabasePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

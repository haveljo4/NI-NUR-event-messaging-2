import { Component, OnInit, ViewChild } from "@angular/core";

import { MatTabChangeEvent } from "@angular/material/tabs";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";

import { Group } from "../models/group";
import { Person } from "../models/person";
import { PersonForm } from "../models/forms/person-form";
import { GroupsService } from "../services/groups.service";
import { PeopleService } from "../services/people.service";
import { DatabasePeopleComponent } from "./database-people/database-people.component";
import { DatabaseGroupsComponent } from "./database-groups/database-groups.component";
import { PersonDialogComponent } from "./person-dialog/person-dialog.component";
import { FormType } from "../models/enums/form-type";
import { TabType } from "../models/enums/tab-type";
import { PersonDialogInject } from "../models/dialog-injects/person-dialog-inject";
import { GroupDialogComponent } from "./group-dialog/group-dialog.component";
import { GroupDialogInject } from "../models/dialog-injects/group-dialog-inject";

@Component({
  selector: "app-database",
  templateUrl: "./database.component.html",
  styleUrls: ["./database.component.scss"]
})
export class DatabaseComponent implements OnInit {

  groups: Group[] = [];
  people: Person[] = [];
  selectedTab: TabType = TabType.PEOPLE;
  filterIsShowed = false;
  @ViewChild(DatabasePeopleComponent) databasePeopleComponent!: DatabasePeopleComponent;
  @ViewChild(DatabaseGroupsComponent) databaseGroupsComponent!: DatabaseGroupsComponent;
  deleteIsShowed = false;
  editIsShowed = false;

  constructor(
    private _groupsService: GroupsService,
    private _peopleService: PeopleService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._loadData();
  }

  onSelectedTabChanged(event: MatTabChangeEvent): void {
    switch (event.index) {
      case 0:
        this.selectedTab = TabType.PEOPLE;
        break;
      case 1:
        this.selectedTab = TabType.GROUPS;
        break;
    }
  }

  showAddDialog(): void {
    switch (this.selectedTab) {
      case TabType.PEOPLE:
        this.showAddPersonDialog();
        break;
      case TabType.GROUPS:
        this.showAddGroupDialog();
        break;
    }
  }

  showAddPersonDialog(): void {
    const dialog = this._dialog.open(PersonDialogComponent, {
      data: {
        groups: this.groups,
        type: FormType.ADD
      } as PersonDialogInject
    });
    dialog.afterClosed().subscribe((person?: PersonForm) => {
      if (person) {
        this._peopleService.addPerson(person).subscribe((newPerson: Person) => {
          this.people = this.people.slice(); // cloning because change occurred (===)
          newPerson.groupName = this.groups.filter((group) => group.id === person.groupId)[0].name;
          this.people.push(newPerson);
          this._snackBar.open("Person added!");
        });
      }
    });
  }

  showAddGroupDialog(): void {
    const dialog = this._dialog.open(GroupDialogComponent, {
      data: {
        type: FormType.ADD
      } as GroupDialogInject
    });
    dialog.afterClosed().subscribe((group?: Group) => {
      if (group) {
        this._groupsService.addGroup(group).subscribe((newGroup: Group) => {
          this.groups = this.groups.slice(); // cloning because change occurred (===)
          this.groups.push(newGroup);
          this._snackBar.open("Group added!");
        });
      }
    });
  }

  getAddToolTip(): string {
    switch (this.selectedTab) {
      case TabType.PEOPLE:
        return "Add new person";
      case TabType.GROUPS:
        return "Add new group";
    }
  }

  onFilterIsShowedChange(event: MatSlideToggleChange): void {
    this.databasePeopleComponent.filterInput = "";
    this.databasePeopleComponent.applyFilter();
    this.databaseGroupsComponent.filterInput = "";
    this.databaseGroupsComponent.applyFilter();
  }

  private _loadData(): void {
    this._groupsService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
      this._peopleService.getAllPeople().subscribe((people) => {
        this.people = people.map((person) => {
          person.groupName = groups.filter((group) => group.id === person.groupId)[0].name;
          return person;
        });
      });
    });
  }
}

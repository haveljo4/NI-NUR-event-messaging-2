import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";

import { Person } from "src/app/models/person";
import { Group } from "src/app/models/group";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { PeopleService } from "src/app/services/people.service";
import { ConfirmDialogComponent } from "src/app/components/confirm-dialog/confirm-dialog.component";
import { PersonDialogComponent } from "../person-dialog/person-dialog.component";
import { FormType } from "src/app/models/enums/form-type";
import { PersonDialogInject } from "src/app/models/dialog-injects/person-dialog-inject";
import { GroupsService } from "src/app/services/groups.service";
import {PersonDialogData} from "../../../models/dialog-data/person-dialog-data";
import {GlobalDialogCreator} from "../../../services/global.dialog.creator.service";

@Component({
  selector: "app-database-people",
  templateUrl: "./database-people.component.html",
  styleUrls: ["./database-people.component.scss"]
})
export class DatabasePeopleComponent implements OnInit, AfterViewInit {

  private _people: Person[] = [];
  set people(value: Person[]) {
    this._people = value;
    this.dataSource.data = this._people;
  }
  get people(): Person[] {
    return this._people;
  }
  private _groups: Group[] = [];
  set groups(value: Group[]) {
    this._groups = value;
  }
  get groups(): Group[] {
    return this._groups;
  }
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "phoneNumber",
    "group",
    "editButton",
    "deleteButton"
  ];
  filterInput = "";
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Person> = new MatTableDataSource(this._people);
  pageSizeOptions = [10, 25, 100];
  pageSize = this.pageSizeOptions[0];

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _peopleService: PeopleService,
    private _groupsService: GroupsService
  ) {
    GlobalDialogCreator.setShowPersonDialogCallback(this.showAddDialog)
  }

  ngOnInit(): void {
    this._loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(): void {
    this.dataSource.filter = this.filterInput.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showAddDialog(): void {
    const dialog = this._dialog.open(PersonDialogComponent, {
      disableClose: true,
      data: {
        groups: this.groups,
        type: FormType.ADD
      } as PersonDialogInject
    });
    dialog.afterClosed().subscribe((data?: PersonDialogData) => {
      if (data?.person) {
        this._peopleService.add(data.person);
        this.people = this._peopleService.getAll();
        this._snackBar.open("Person added!");
      }
    });
  }

  showDeleteDialog(person: Person): void {
    const dialog = this._dialog.open(ConfirmDialogComponent, {
      data: `Are you sure you want to delete person ${person.firstName} ${person.lastName}?`
    });
    dialog.afterClosed().subscribe((confirmed?: boolean) => {
      if (confirmed) {
        this._peopleService.deleteElem(person.id);
        this.people = this._peopleService.getAll();
        this._snackBar.open("Person deleted!");
      }
    });
  }

  showEditPersonDialog(person: Person): void {
    const dialog = this._dialog.open(PersonDialogComponent, {
      disableClose: true,
      data: {
        person: { ...person },
        groups: this.groups,
        type: FormType.EDIT
      } as PersonDialogInject
    });
    dialog.afterClosed().subscribe(( data?: PersonDialogData) => {
      if (data?.person) {
        this._snackBar.open("Person dited!: " + data.person.id +" " + data.person.groupIds)
        this._peopleService.editElem(data.person);
        this.people = this._peopleService.getAll();
        // this._snackBar.open("Person edited!");
      }
    });
  }

  private _loadData(): void {
    this.groups = this._groupsService.getAll();
    this.people = this._peopleService.getAll();
    // this.people = this._peopleService.getAll().map((person) => {
    //   person.groupName = this.groups.filter((group) => group.id === person.groupId)[0].name;
    //   return person;
    // });
  }
}

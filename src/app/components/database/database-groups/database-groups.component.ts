import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";

import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";

import {Group} from "src/app/models/group";
import {GroupsService} from "src/app/services/groups.service";
import {GroupDialogComponent} from "../group-dialog/group-dialog.component";
import {FormType} from "src/app/models/enums/form-type";
import {GroupDialogInject} from "src/app/models/dialog-injects/group-dialog-inject";

@Component({
  selector: "app-database-groups",
  templateUrl: "./database-groups.component.html",
  styleUrls: ["./database-groups.component.scss"]
})
export class DatabaseGroupsComponent implements OnInit, AfterViewInit {

  private _groups: Group[] = [];
  set groups(value: Group[]) {
    this._groups = value;
    this.dataSource.data = this._groups;
  }
  get groups(): Group[] {
    return this._groups;
  }
  displayedColumns: string[] = [
    "name", "messageButton", "editButton", "deleteButton"
  ];
  filterInput = "";
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Group> = new MatTableDataSource(this._groups);

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _groupsService: GroupsService
  ) { }

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
    const dialog = this._dialog.open(GroupDialogComponent, {
      data: {
        type: FormType.ADD
      } as GroupDialogInject
    });
    dialog.afterClosed().subscribe((group?: Group) => {
      if (group) {
        this._groupsService.addGroup(group);
        this.groups = this._groupsService.getAllGroups();
        this._snackBar.open("Group added!");
      }
    });
  }

  deleteGroup(group: Group): void {
      this._groupsService.deleteGroup(group.id);
      this.groups = this._groupsService.getAllGroups();
      this._snackBar.open("Group deleted!"); // TODO undo
  }

  showMessageGroupDialog(group: Group): void {
    this._snackBar.open("Not implemented"); // TODO
  }

  showEditGroupDialog(group: Group): void {
    const dialog = this._dialog.open(GroupDialogComponent, {
      data: {
        group: { ...group },
        type: FormType.EDIT
      } as GroupDialogInject
    });
    dialog.afterClosed().subscribe((afterCloseGroup?: Group) => {
      if (afterCloseGroup) {
        this._groupsService.editGroup(afterCloseGroup);
        this.groups = this._groupsService.getAllGroups();
        this._snackBar.open("Group edited!");
      }
    });
  }

  private _loadData(): void {
    this.groups = this._groupsService.getAllGroups();
  }
}

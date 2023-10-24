import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";

import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";

import { Group } from "src/app/models/group";
import { GroupsService } from "src/app/services/groups.service";
import { ConfirmDialogComponent } from "src/app/confirm-dialog/confirm-dialog.component";
import { GroupDialogComponent } from "../group-dialog/group-dialog.component";
import { FormType } from "src/app/models/enums/form-type";
import { GroupDialogInject } from "src/app/models/dialog-injects/group-dialog-inject";

@Component({
  selector: "app-database-groups",
  templateUrl: "./database-groups.component.html",
  styleUrls: ["./database-groups.component.scss"]
})
export class DatabaseGroupsComponent implements OnInit, AfterViewInit {

  private _groups: Group[] = [];
  @Input() set groups(value: Group[]) {
    this._groups = value;
    this.dataSource.data = this._groups;
  }
  get groups(): Group[] {
    return this._groups;
  }
  displayedColumns: string[] = [
    "name"
  ];
  private readonly _specialColumns = {
    editButton: "editButton",
    deleteButton: "deleteButton"
  };
  filterInput = "";
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Group> = new MatTableDataSource(this._groups);
  @Input() filterIsShowed!: boolean;
  _deleteIsShowed = false;
  @Input() set deleteIsShowed(value: boolean) {
    this._deleteIsShowed = value;
    if (this._deleteIsShowed) {
      this.displayedColumns.push(this._specialColumns.deleteButton);
    } else {
      this.displayedColumns = this.displayedColumns
        .filter((column) => column !== this._specialColumns.deleteButton);
    }
  }
  get deleteIsShowed(): boolean {
    return this._deleteIsShowed;
  }
  _editIsShowed = false;
  @Input() set editIsShowed(value: boolean) {
    this._editIsShowed = value;
    if (this._editIsShowed) {
      if (this.displayedColumns.length === 2) {
        this.displayedColumns.splice(1, 0, this._specialColumns.editButton);
      } else {
        this.displayedColumns.push(this._specialColumns.editButton);
      }
    } else {
      this.displayedColumns = this.displayedColumns
        .filter((column) => column !== this._specialColumns.editButton);
    }
  }
  get editIsShowed(): boolean {
    return this._editIsShowed;
  }

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _groupService: GroupsService
  ) { }

  ngOnInit(): void {
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

  showDeleteDialog(group: Group): void {
    const dialog = this._dialog.open(ConfirmDialogComponent, {
      data: `Are you sure you want to delete group ${group.name}?`
    });
    dialog.afterClosed().subscribe((confirmed?: boolean) => {
      if (confirmed) {
        this._groupService.deleteGroup(group.id).subscribe(() => {
          this._snackBar.open("Group deleted!");
          this.groups = this.groups.filter((filterGroup) => filterGroup.id !== group.id);
        });
      }
    });
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
        this._groupService.editGroup(afterCloseGroup).subscribe((newGroup: Group) => {
          const index = this.groups.findIndex((findPerson) => findPerson.id === newGroup.id);
          this.groups[index] = newGroup;
          this._snackBar.open("Group edited!");
          this.groups = this.groups.slice();
        });
      }
    });
  }
}

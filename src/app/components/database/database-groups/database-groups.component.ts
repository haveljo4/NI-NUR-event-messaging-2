import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";

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
import {GroupMessageDialogComponent} from "../../message-dialogs/group-message-dialog/group-message-dialog.component";
import {MessagesService} from "../../../services/messages.service";
import {MessageForm} from "../../../models/forms/message-form";
import {GroupMessageDialogInject} from "../../../models/dialog-injects/group-message-dialog-inject";

@Component({
  selector: "app-database-groups",
  templateUrl: "./database-groups.component.html",
  styleUrls: ["./database-groups.component.scss"]
})
export class DatabaseGroupsComponent implements OnInit, AfterViewInit {

  private _groups: Group[] = [];
  @Input() set groups(value: Group[]) {
    this.dataSource.data = value;
    this._groups = this._groups.slice();
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
    private _groupsService: GroupsService,
    private _messagesService: MessagesService
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
        this._groupsService.add(group);
        this.groups = this._groupsService.getAll();
        this._snackBar.open("Group added!");
      }
    });
  }

  deleteGroup(group: Group): void {
      this._groupsService.deleteElem(group.id);
      this.groups = this._groupsService.getAll();
      this._snackBar.open("Group deleted!"); // TODO undo
  }

  showMessageGroupDialog(group: Group): void {
    const dialog = this._dialog.open(GroupMessageDialogComponent, {data: {state: "send"} as GroupMessageDialogInject})
    dialog.afterClosed().subscribe((message?: MessageForm) => {
      if (message) {
        this._messagesService.add(message);
        this._snackBar.open("Message sent!");
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
        this._groupsService.editElem(afterCloseGroup);
        this.groups = this._groupsService.getAll();
        this._snackBar.open("Group edited!");
      }
    });
  }

  private _loadData(): void {
    this.groups = this._groupsService.getAll();
  }
}

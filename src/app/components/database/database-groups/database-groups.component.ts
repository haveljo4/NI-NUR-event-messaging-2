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
import {GroupDialogData} from "../../../models/dialog-data/group-dialog-data";
import {PeopleService} from "../../../services/people.service";

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
    private _messagesService: MessagesService,
    private _peopleService: PeopleService
  ) {
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
    const dialog = this._dialog.open(GroupDialogComponent, {
      disableClose: true,
      data: {
        type: FormType.ADD
      } as GroupDialogInject
    });
    // dialog.disableClose().subscr
    dialog.afterClosed().subscribe((data?: GroupDialogData) => {
      if (data?.group) {
        this._groupsService.add(data.group);
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
    const dialog = this._dialog.open(GroupMessageDialogComponent, {
      disableClose: true,
      data: {state: "send"} as GroupMessageDialogInject
    });
    dialog.afterClosed().subscribe((message?: MessageForm) => {
      if (message) {
        this._messagesService.add(message);
        this._snackBar.open("Message sent!");
      }
    });
  }

  showEditGroupDialog(group: Group): void {
    const dialog = this._dialog.open(GroupDialogComponent, {
      disableClose: true,
      data: {
        group: {...group},
        type: FormType.EDIT
      } as GroupDialogInject
    });
    dialog.afterClosed().subscribe((afterClose: GroupDialogData) => {
      if (!afterClose) {
        return;
      }

      if (afterClose.group) {
        this._groupsService.editElem(afterClose.group);
        this.groups = this._groupsService.getAll();
        this._snackBar.open("Group edited!");
      }

      // remove the unassigned people from the group
      const assigned = this._peopleService.getAll().filter(p => p.groupIds.includes(afterClose.group.id));
      assigned.filter(p => !afterClose.membersIds.includes(p.id)).forEach(p => {
        p.groupIds = p.groupIds.filter(id => id !== afterClose.group.id);
        this._peopleService.editElem(p);
      });

      // add the newly assigned people to the group
      afterClose.membersIds.filter(id => !assigned.map(p => p.id).includes(id)).forEach(id => {
        const person = this._peopleService.getElem(id);
        if (person) {
          person.groupIds.push(afterClose.group.id);
          this._peopleService.editElem(person);
        }
      });
    });
  }

  private _loadData(): void {
    this.groups = this._groupsService.getAll();
  }
}

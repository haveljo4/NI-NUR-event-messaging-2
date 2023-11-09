import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Group} from "../../models/group";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GroupsService} from "../../services/groups.service";
import {GroupDialogComponent} from "../database/group-dialog/group-dialog.component";
import {FormType} from "../../models/enums/form-type";
import {GroupDialogInject} from "../../models/dialog-injects/group-dialog-inject";
import {MessagesService} from "../../services/messages.service";
import {Message} from "../../models/message";
import {EventsService} from "../../services/events.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewInit {

  private _messages: Message[] = [];
  set messages(value: Message[]) {
    this._messages = value;
    this.dataSource.data = this._messages;
  }
  get messages(): Message[] {
    return this._messages;
  }
  displayedColumns: string[] = [
    "subject", "groups", "event", "date", "time", "details"
  ];
  filterInput = "";
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Message> = new MatTableDataSource(this._messages);

  constructor(
    private _dialog: MatDialog,
    private _groupsService: GroupsService,
    private _eventsService: EventsService,
    private _messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this._loadData();
  }

  getMessageGroups(type: string, ids: number[]) {
    let groupIds: number[] = [];
    let idsCopy = ids.slice();
    if (type === "event") {
      const id = idsCopy.pop();
      if (!id) return;
      const event =  this._eventsService.getElem(id);
      if (!event) return;
      groupIds = event.participantGroupIds;
    }
    else {
      groupIds = idsCopy;
    }

    const groupNames = groupIds.map(id => {
      const group = this._groupsService.getElem(id);
      if (!group) return "";
      return group.name;
    });

    return groupNames.join(", ");
  }

  getEventName(type: string, ids: number[]) {
      let idsCopy = ids.slice();
      if (type === "event") {
          const id = idsCopy.pop();
          if (!id) return "no id";
          const event =  this._eventsService.getElem(id);
          if (!event) return "no event";
          return event.name;
      }
      return "";
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

  showMessageDetailDialog(group: Group): void {
    // TODO
    const dialog = this._dialog.open(GroupDialogComponent, {
      data: {
        group: { ...group },
        type: FormType.EDIT
      } as GroupDialogInject
    });
  }

  private _loadData(): void {
    this.messages = this._messagesService.getAll();
  }

}

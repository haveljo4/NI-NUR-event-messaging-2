import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {GroupsService} from "../../services/groups.service";
import {MessagesService} from "../../services/messages.service";
import {Message} from "../../models/message";
import {EventsService} from "../../services/events.service";
import {EventMessageDialogComponent} from "../message-dialogs/event-message-dialog/event-message-dialog.component";
import {EventMessageDialogInject} from "../../models/dialog-injects/event-message-dialog-inject";
import {GroupMessageDialogComponent} from "../message-dialogs/group-message-dialog/group-message-dialog.component";
import {GroupMessageDialogInject} from "../../models/dialog-injects/group-message-dialog-inject";

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
    "subject", "groups", "event", "time", "details"
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

  getMessageGroups(type: string, ids: number[]) : string {
    let groupIds: number[] = [];
    let idsCopy = ids.slice();
    if (type === "event") {
      const id = idsCopy.pop();
      if (!id) return "";
      const event =  this._eventsService.getElem(id);
      if (!event) return "";
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
          if (!id) return "";
          const event =  this._eventsService.getElem(id);
          if (!event) return "";
          return event.name;
      }
      return "";
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      const value = (data as {[key: string]: any})[sortHeaderId];

      if (sortHeaderId === 'subject') {
        return data.subject.toLowerCase();
      }

      if (sortHeaderId === 'groups') {
        return this.getMessageGroups(data.type, data.eventOrGroupIds)?.toLowerCase();
      }

      if (sortHeaderId === 'event') {
        return this.getEventName(data.type, data.eventOrGroupIds).toLowerCase();
      }

      if (sortHeaderId === 'time') {
        return data.dateTime.toLocaleString();
      }

      return value;
    };
    this.sort.sort({ id: 'time', start: 'desc', disableClear: false});
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: Message, filter: string) => {

      return data.subject.toLowerCase().startsWith(filter.toLowerCase()) // filter by subject
        || this.getMessageGroups(data.type, data.eventOrGroupIds).toLowerCase().includes(filter.toLowerCase()) // filter by groups
        || this.getEventName(data.type, data.eventOrGroupIds).toLowerCase().includes(filter.toLowerCase()); // filter by event
    };
  }

  applyFilter(): void {
    this.dataSource.filter = this.filterInput.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showMessageDetailDialog(message: Message): void {
    if (message.type === "event") {
      const dialog = this._dialog.open(EventMessageDialogComponent, {
        data: {
          message: message,
          state: "view"
        } as EventMessageDialogInject
      });
    }
    else { // group message
      const dialog = this._dialog.open(GroupMessageDialogComponent, {
        data: {
          message: message,
          state: "view"
        } as GroupMessageDialogInject
      });
    }
  }

  private _loadData(): void {
    this.messages = this._messagesService.getAll();
  }

}

import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";

import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";

import { ConfirmDialogComponent } from "src/app/components/confirm-dialog/confirm-dialog.component";
import { EventDialogComponent } from "../event-dialog/event-dialog.component";
import { FormType } from "src/app/models/enums/form-type";
import { WorkEvent } from "src/app/models/workEvent";
import {EventsService} from "../../../services/events.service";
import {EventDialogInject} from "../../../models/dialog-injects/event-dialog-inject";
import {EventDialogData} from "../../../models/dialog-data/event-dialog-data";
import {GroupMessageDialogComponent} from "../../message-dialogs/group-message-dialog/group-message-dialog.component";
import {GroupMessageDialogInject} from "../../../models/dialog-injects/group-message-dialog-inject";
import {MessageForm} from "../../../models/forms/message-form";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: "app-database-events",
  templateUrl: "./database-events.component.html",
  styleUrls: ["./database-events.component.scss"]
})
export class DatabaseEventsComponent  implements OnInit, AfterViewInit {
  private _events: WorkEvent[] = [];
  @Input() set events(value: WorkEvent[]) {
    this.dataSource.data = value;
    this._events = this._events.slice();
  }
  get events(): WorkEvent[] {
    return this._events;
  }

  displayedColumns: string[] = [
    "name", "date", "description", "status", "messageButton", "editButton", "deleteButton"
  ];
  filterInput = "";
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<WorkEvent> = new MatTableDataSource(this._events);

  constructor(
      private snackBar: MatSnackBar,
      private _dialog: MatDialog,
      private _snackBar: MatSnackBar,
      private _messagesService: MessagesService,
      private _eventService: EventsService
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
    const dialog = this._dialog.open(EventDialogComponent, {
      disableClose: true,
      data: {
        type: FormType.ADD
      } as EventDialogInject
    });
    dialog.afterClosed().subscribe((data?: EventDialogData) => {
      if (data?.event){
        this._eventService.add(data.event);
        this.events = this._eventService.getAll();
        this._snackBar.open("Event added!");
      }
    });
  }

  showDeleteDialog(event: WorkEvent): void {
    const dialog = this._dialog.open(ConfirmDialogComponent, {
      data: `Are you sure you want to delete event ${event.name}?`
    });
    dialog.afterClosed().subscribe((confirmed?: boolean) => {
      if (confirmed) {
        this._eventService.deleteElem(event.id);
        this.events = this._eventService.getAll();
        this._snackBar.open("Event deleted!");
      }
    });
  }

  showEditEventDialog(event: WorkEvent): void {
    const dialog = this._dialog.open(EventDialogComponent, {
      disableClose: true,
      data: {
        event: { ...event },
        type: FormType.EDIT
      } as EventDialogInject
    });
    dialog.afterClosed().subscribe((afterCloseEvent?: EventDialogData) => {
      if (afterCloseEvent?.event) {
        this._eventService.editElem(afterCloseEvent.event);
        this.events = this._eventService.getAll();
        this._snackBar.open("Event edited!");
      }
    });
  }

  private _loadData(): void {
    this.events = this._eventService.getAll();
  }

  showMessageEventDialog(event: WorkEvent): void {
    const dialog = this._dialog.open(GroupMessageDialogComponent, {
      disableClose: true,
      data: {state: "send"} as GroupMessageDialogInject
    });
    dialog.afterClosed().subscribe((message?: MessageForm) => {
      if (message) {
        message.eventOrGroupIds.push(event.id)
        message.type = "event"
        this._messagesService.add(message);
        this._snackBar.open("Message sent!");
      }
    });
  }
}

import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";

import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";

import { GroupsService } from "src/app/services/groups.service";
import { ConfirmDialogComponent } from "src/app/components/confirm-dialog/confirm-dialog.component";
import { EventDialogComponent } from "../event-dialog/event-dialog.component";
import { FormType } from "src/app/models/enums/form-type";
import { WorkEvent } from "src/app/models/workEvent";
import {EventsService} from "../../../services/events.service";
import {EventDialogInject} from "../../../models/dialog-injects/event-dialog-inject";


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
    "name", "date", "description", "status", "deleteButton", "editButton"
  ];
  filterInput = "";
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<WorkEvent> = new MatTableDataSource(this._events);

  constructor(
      private _dialog: MatDialog,
      private _snackBar: MatSnackBar,
      private _groupService: GroupsService,
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
      data: {
        type: FormType.ADD
      } as EventDialogInject
    });
    dialog.afterClosed().subscribe((event?: WorkEvent) => {
      if (event) {
        this._eventService.add(event);
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
      data: {
        event: { ...event },
        type: FormType.EDIT
      } as EventDialogInject
    });
    dialog.afterClosed().subscribe((afterCloseEvent?: WorkEvent) => {
      if (afterCloseEvent) {
        this._eventService.editElem(afterCloseEvent);
        this.events = this._eventService.getAll();
        this._snackBar.open("Event edited!");
      }
    });
  }

  private _loadData(): void {
    this.events = this._eventService.getAll();
  }
}

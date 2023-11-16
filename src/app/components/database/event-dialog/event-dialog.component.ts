import { Component, Inject, OnInit } from "@angular/core";

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {EventForm} from "../../../models/forms/event-form";
import {EventDialogInject} from "../../../models/dialog-injects/event-dialog-inject";
import {EventDialogData} from "../../../models/dialog-data/event-dialog-data";
import {EventsService} from "../../../services/events.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: "app-event-dialog",
  templateUrl: "./event-dialog.component.html",
  styleUrls: ["./event-dialog.component.scss"]
})
export class EventDialogComponent implements OnInit {

  // event: EventForm = {};

  data: EventDialogData;

  constructor(private snackBar: MatSnackBar, public dialogRef: MatDialogRef<EventDialogData>,@Inject(MAT_DIALOG_DATA) public inject: EventDialogInject,
              public eventsService: EventsService,
  ) {
    if (inject.event) {
      this.data = {
        event: inject.event,
        membersIds: this.getGetGroupsToEvents(inject.event.id)
      };
    } else {
      this.data = {
        event: {
          id: 0,
          name: "",
          status: "canceled",
          description: "",
          participantGroupIds: [],
          dateTime: ""
        },
        membersIds: []
      };
    }
  }

  addNewGroup(): void {
    // TODO
    console.log("addNewGroup");
  }


  validateAndClose(): void {
    if (
        this.data.event.name && this.data.event.name != "" &&
        // this.data.event.description && this.data.event.description != "" &&
        this.data.event.participantGroupIds
        // &&
        // this.data.event.dateTime && this.data.event.dateTime != "" &&
        // this.data.event.status && this.data.event.status != ""
    ) {
      this.dialogRef.close(this.data.event);
    } else {
      this.snackBar.open("Please fill all required fields.")
    }
  }
  getGetGroupsToEvents(eventId: number): number[] {
    // @ts-ignore
    return this.eventsService.getElem(eventId).participantGroupIds;
  }

  saveMemberIds(ids: number[]): void {
    this.data.membersIds = ids;
  }

  ngOnInit(): void {
    // if (this.data.event) {
    //   this.event = this.data.event;
    // }
  }

}

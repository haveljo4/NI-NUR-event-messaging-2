import { Component, Inject, OnInit } from "@angular/core";

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {EventDialogInject} from "../../../models/dialog-injects/event-dialog-inject";
import {EventDialogData} from "../../../models/dialog-data/event-dialog-data";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GroupsService} from "../../../services/groups.service";
import {GlobalDialogCreator} from "../../../services/global.dialog.creator.service";

@Component({
  selector: "app-event-dialog",
  templateUrl: "./event-dialog.component.html",
  styleUrls: ["./event-dialog.component.scss"]
})
export class EventDialogComponent implements OnInit {

  data: EventDialogData;

  constructor(private snackBar: MatSnackBar, public dialogRef: MatDialogRef<EventDialogData>, @Inject(MAT_DIALOG_DATA) public inject: EventDialogInject,
              public groupsService: GroupsService,
              // private _groupsDb: DatabaseGroupsComponent
              // private dialog: MatDialog,

  ) {
    if (inject.event) {
      this.data = {
        event: inject.event,
        membersIds: inject.event.participantGroupIds
      };
    } else {
      this.data = {
        event: {
          id: 0,
          name: "",
          status: "Scheduled",
          description: "",
          participantGroupIds: [],
          dateTime: ""
        },
        membersIds: []
      };
    }
  }


  addNewGroup(): void {
    GlobalDialogCreator.showGroupDialogCallback()
  }


  validateAndClose(): void {
    if (
        this.data.event.name && this.data.event.name != "" &&
        this.data.event.participantGroupIds

    ) {
      this.dialogRef.close(this.data);
    } else {
      this.snackBar.open("Please fill all required fields.")
    }
  }

  saveMemberIds(ids: number[]): void {
    this.data.event.participantGroupIds = ids;
  }

  ngOnInit(): void {
    // if (this.data.event) {
    //   this.event = this.data.event;
    // }
  }

}

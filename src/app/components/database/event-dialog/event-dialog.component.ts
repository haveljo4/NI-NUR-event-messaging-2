import { Component, Inject, OnInit } from "@angular/core";

import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import {EventForm} from "../../../models/forms/event-form";
import {EventDialogInject} from "../../../models/dialog-injects/event-dialog-inject";

@Component({
  selector: "app-event-dialog",
  templateUrl: "./event-dialog.component.html",
  styleUrls: ["./event-dialog.component.scss"]
})
export class EventDialogComponent implements OnInit {

  event: EventForm = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: EventDialogInject) { }

  ngOnInit(): void {
    if (this.data.event) {
      this.event = this.data.event;
    }
  }

}

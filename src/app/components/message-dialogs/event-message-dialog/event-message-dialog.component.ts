import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GroupMessageDialogInject} from "../../../models/dialog-injects/group-message-dialog-inject";

@Component({
  selector: 'app-event-message-dialog',
  templateUrl: './event-message-dialog.component.html',
  styleUrls: ['./event-message-dialog.component.scss']
})
export class EventMessageDialogComponent implements OnInit {

  subject = "";
  message = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: GroupMessageDialogInject) { }

  ngOnInit(): void {
  }

}

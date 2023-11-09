import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GroupMessageDialogInject} from "../../../models/dialog-injects/group-message-dialog-inject";
import {MessageForm} from "../../../models/forms/message-form";

@Component({
  selector: 'app-group-message-dialog',
  templateUrl: './group-message-dialog.component.html',
  styleUrls: ['./group-message-dialog.component.scss']
})
export class GroupMessageDialogComponent implements OnInit {

  message: MessageForm = {
    id: undefined,
    type: "group",
    message: "",
    subject: "",
    dateTime: new Date(),
    eventOrGroupIds: [],
    email: false,
    sms: false,
    slack: false,
    whatsapp: false
  };

  state: "send" | "view" = "send";

  constructor(@Inject(MAT_DIALOG_DATA) public data: GroupMessageDialogInject) { }

  ngOnInit(): void {
    if (this.data.message)
      this.message = this.data.message;
    this.state = this.data.state;
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GroupMessageDialogInject} from "../../../models/dialog-injects/group-message-dialog-inject";

@Component({
  selector: 'app-group-message-dialog',
  templateUrl: './group-message-dialog.component.html',
  styleUrls: ['./group-message-dialog.component.scss']
})
export class GroupMessageDialogComponent implements OnInit {

  subject = "";
  message = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: GroupMessageDialogInject) { }

  ngOnInit(): void {
  }

}

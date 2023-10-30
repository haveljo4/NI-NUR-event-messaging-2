import { Component, Inject, OnInit } from "@angular/core";

import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { GroupForm } from "src/app/models/forms/group-form";
import { GroupDialogInject } from "src/app/models/dialog-injects/group-dialog-inject";

@Component({
  selector: "app-group-dialog",
  templateUrl: "./group-dialog.component.html",
  styleUrls: ["./group-dialog.component.scss"]
})
export class GroupDialogComponent implements OnInit {

  group: GroupForm = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: GroupDialogInject) { }

  ngOnInit(): void {
    if (this.data.group) {
      this.group = this.data.group;
    }
  }

}

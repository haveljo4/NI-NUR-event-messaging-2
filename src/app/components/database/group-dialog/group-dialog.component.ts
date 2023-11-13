import {Component, Inject, OnInit} from "@angular/core";

import {MAT_DIALOG_DATA} from "@angular/material/dialog";

import {GroupForm} from "src/app/models/forms/group-form";
import {GroupDialogInject} from "src/app/models/dialog-injects/group-dialog-inject";
import {PeopleService} from "../../../services/people.service";
import {Person} from "../../../models/person";

@Component({
  selector: "app-group-dialog",
  templateUrl: "./group-dialog.component.html",
  styleUrls: ["./group-dialog.component.scss"]
})
export class GroupDialogComponent implements OnInit {

  group: GroupForm = {};
  membersIds: number[] = [];
  createLabel: (el: Person) => string = (el: Person) => `${el.firstName} ${el.lastName}`;

  constructor(@Inject(MAT_DIALOG_DATA) public data: GroupDialogInject,
              public peopleService: PeopleService,
  ) {
  }

  ngOnInit(): void {
    if (this.data.group) {
      this.group = this.data.group;
    }
  }

}

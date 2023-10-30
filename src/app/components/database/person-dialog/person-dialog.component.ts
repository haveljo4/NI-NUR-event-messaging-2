import { Component, Inject, OnInit } from "@angular/core";

import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { PersonForm } from "src/app/models/forms/person-form";
import { PersonDialogInject } from "src/app/models/dialog-injects/person-dialog-inject";

@Component({
  selector: "app-person-dialog",
  templateUrl: "./person-dialog.component.html",
  styleUrls: ["./person-dialog.component.scss"]
})
export class PersonDialogComponent implements OnInit {

  person: PersonForm = {};
  keyVerb = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: PersonDialogInject) { }

  ngOnInit(): void {
    if (this.data.person) {
      this.person = this.data.person;
    }
  }

}

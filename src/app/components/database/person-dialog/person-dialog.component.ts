import { Component, Inject, OnInit } from "@angular/core";

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import { PersonDialogInject } from "src/app/models/dialog-injects/person-dialog-inject";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PersonDialogData} from "../../../models/dialog-data/person-dialog-data";
import {GroupsService} from "../../../services/groups.service";
import {GlobalDialogCreator} from "../../../services/global.dialog.creator.service";



@Component({
  selector: "app-person-dialog",
  templateUrl: "./person-dialog.component.html",
  styleUrls: ["./person-dialog.component.scss"]
})
export class PersonDialogComponent {

  data: PersonDialogData
  constructor(private snackBar: MatSnackBar, public dialogRef: MatDialogRef<PersonDialogComponent>, @Inject(MAT_DIALOG_DATA) public inject: PersonDialogInject,
              public groupsService: GroupsService,
  ) {
    if (inject.person) {
      this.data = {
        person: inject.person,
        // groupIds: this.peopleService.getElem(inject.person.id)?.groupIds
        groupIds: inject.person.groupIds
      };
    }
    else {
        this.data = {
            person: {
                id: 0,
                groupIds: [],
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: ""
                // groupNames: [],
            },
            groupIds: []
        };
    }
  }

  validateAndClose(): void {
    if (
      this.data.person.firstName && this.data.person.firstName != ""
        &&
      this.data.person.lastName && this.data.person.lastName != ""

    ) {
      this.dialogRef.close(this.data);
    } else {
      this.snackBar.open("Please fill all required fields.")
    }
  }

  addNewGroup(): void {
      GlobalDialogCreator.showGroupDialogCallback()
  }

  // getGroupsForPerson(groupIds: number[]): number[] {
    // return this.groupsService.getAll().filter(p => p.groupIds.includes(groupId || -1)).map(p => p.id);
  // }

  saveMemberIds(ids: number[]): void {
    this.data.person.groupIds = ids;
  }

}

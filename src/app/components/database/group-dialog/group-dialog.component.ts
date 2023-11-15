import {Component, Inject} from "@angular/core";

import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GroupDialogInject} from "src/app/models/dialog-injects/group-dialog-inject";
import {PeopleService} from "../../../services/people.service";
import {GroupDialogData} from "../../../models/dialog-data/group-dialog-data";

@Component({
  selector: "app-group-dialog",
  templateUrl: "./group-dialog.component.html",
  styleUrls: ["./group-dialog.component.scss"]
})
export class GroupDialogComponent {

  data: GroupDialogData;

  constructor(@Inject(MAT_DIALOG_DATA) public inject: GroupDialogInject,
              public peopleService: PeopleService,
  ) {
    if (inject.group) {
      this.data = {
        group: inject.group,
        membersIds: this.getPeopleInGroupIds(inject.group.id)
      };
    }
    else {
      this.data = {
        group: {id: 0, name: ""},
        membersIds: []
      };
    }
  }

  addNewPerson(): void {
    // TODO
    console.log("addNewPerson");
  }

  getPeopleInGroupIds(groupId: number): number[] {
    return this.peopleService.getAll().filter(p => p.groupIds.includes(groupId || -1)).map(p => p.id);
  }

  saveMemberIds(ids: number[]): void {
    this.data.membersIds = ids;
  }
}

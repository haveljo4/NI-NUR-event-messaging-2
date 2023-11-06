import { Component, OnInit } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Group } from "src/app/models/group";
import { GroupsService } from "src/app/services/groups.service";
import { ConfirmDialogComponent } from "src/app/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-send",
  templateUrl: "./send.component.html",
  styleUrls: ["./send.component.scss"]
})
export class SendComponent implements OnInit {

  groups: Group[] = [];
  selectedGroup?: Group;
  messageText = "";

  constructor(
    private _groupsService: GroupsService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.groups = this._groupsService.getAll();
  }

  showSendDialog(): void {
    const dialog = this._dialog.open(ConfirmDialogComponent, {
      data: `Are you sure you want to send this message to members of ${this.selectedGroup?.name} group?`
    });
    dialog.afterClosed().subscribe((confirmed?: boolean) => {
      if (confirmed) {
        this._snackBar.open("Message sent!", undefined, {
          duration: 4000,
          horizontalPosition: "start"
        });
        this.messageText = "";
        this.selectedGroup = undefined;
      }
    });
  }
}

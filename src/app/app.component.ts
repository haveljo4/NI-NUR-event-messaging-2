import {Component, ComponentFactoryResolver, OnInit, ViewContainerRef} from "@angular/core";
import { Title } from "@angular/platform-browser";

import { UserService } from "./services/user.service";
import {GroupDialogComponent} from "./components/database/group-dialog/group-dialog.component";
import {DatabaseGroupsComponent} from "./components/database/database-groups/database-groups.component";
import {PersonDialogComponent} from "./components/database/person-dialog/person-dialog.component";
import {DatabasePeopleComponent} from "./components/database/database-people/database-people.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  title = "event-messaging";

  constructor(
    private _titleService: Title,
    public userService: UserService,
    public viewContainerRef: ViewContainerRef
  ) {
    // TODO not a nice way how to make the Create new group work (need to init the component to register a callback)
    viewContainerRef.createComponent(DatabaseGroupsComponent).destroy()
    viewContainerRef.createComponent(DatabasePeopleComponent).destroy()
    // componentFactoryResolver.resolveComponentFactory(DatabaseGroupsComponent).create()
  }

  ngOnInit(): void {
    this._titleService.setTitle("Organizer 2000");
    this.userService.check();
  }

  logout(): void {
    this.userService.logout();
  }
}

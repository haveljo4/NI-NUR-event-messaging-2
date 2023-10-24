import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  title = "event-messaging";

  constructor(
    private _titleService: Title,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this._titleService.setTitle("Organizer 2000");
    this.userService.check();
  }

  logout(): void {
    this.userService.logout();
  }
}

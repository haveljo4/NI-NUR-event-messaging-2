import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  title = "messaging-angular";

  constructor(
    private _titleService: Title,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this._titleService.setTitle("Samanet | Messaging");
    this.userService.check();
  }

  logout(): void {
    this.userService.logout();
  }
}

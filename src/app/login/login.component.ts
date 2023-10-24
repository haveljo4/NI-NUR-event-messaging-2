import { Component, OnInit } from "@angular/core";

import { MatSnackBar } from "@angular/material/snack-bar";

import { CredentialsForm } from "../models/forms/credentials-form";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  credentialsForm: CredentialsForm = {};
  isLogging = false;

  constructor(
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.isLogging = true;
    this._userService.login(this.credentialsForm).then((success) => {
      this.isLogging = false;
      this._snackBar.open("User logged in!");
    });
  }

}

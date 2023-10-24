import { Injectable } from "@angular/core";

import { CredentialsForm } from "../models/forms/credentials-form";
import { FakeHttpService } from "./fake-http.service";

@Injectable({
  providedIn: "root"
})
export class UserService {

  isLogged = false;
  username?: string;

  constructor(private _fakeHttp: FakeHttpService) {
    this.check();
  }

  async login(credentials: CredentialsForm): Promise<boolean> {
    // mock credentials
    credentials.username = "admin";
    credentials.password = "develop123";

    if (credentials.username && credentials.password) {
      await this._fakeHttp.send<string>("POST", "/api/login", "OK", credentials);
      this.isLogged = true;
      this.username = credentials.username;
      return true;
    } else {
      return false;
    }
  }

  async check(): Promise<boolean> {
    this.isLogged = await this._fakeHttp.send<boolean>("GET", "/api/isLogged", true);
    if (this.isLogged) {
      this.username = await this._fakeHttp.send<string>("GET", "/api/logged", "admin");
    }
    return true;
  }

  async logout(): Promise<boolean> {
    await this._fakeHttp.send<string>("GET", "/api/logout", "OK");
    this.isLogged = false;
    return Promise.resolve(true);
  }
}

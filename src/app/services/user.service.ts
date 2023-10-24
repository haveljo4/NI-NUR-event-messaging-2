import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { CredentialsForm } from "../models/forms/credentials-form";


@Injectable({
  providedIn: "root"
})
export class UserService {

  isLogged = false;
  username?: string;

  constructor(private _http: HttpClient) {
    this.check();
  }

  async login(credentials: CredentialsForm): Promise<boolean> {
    if (credentials.username && credentials.password) {
      await this._http.post<string>("/api/login", credentials).toPromise();
      this.isLogged = true;
      this.username = credentials.username;
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }

  async check(): Promise<boolean> {
    this.isLogged = await this._http.get<boolean>("/api/isLogged").toPromise();
    if (this.isLogged) {
      this.username = await this._http.get<string>("/api/logged").toPromise();
    }
    return Promise.resolve(true);
  }

  async logout(): Promise<boolean> {
    await this._http.get<string>("/api/logout").toPromise();
    this.isLogged = false;
    return Promise.resolve(true);
  }
}

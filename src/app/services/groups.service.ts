import { Injectable } from "@angular/core";

import { Observable, from } from "rxjs";

import { Group } from "../models/group";
import { GroupForm } from "../models/forms/group-form";
import { MessageResponse } from "../models/responses/message-response";
import { FakeHttpService } from "./fake-http.service";

import { GROUPS } from "../mocks/groups";

@Injectable({
  providedIn: "root"
})
export class GroupsService {

  constructor(private _fakeHttp: FakeHttpService) { }

  getAllGroups(): Observable<Group[]> {
    return from(this._fakeHttp.send<Group[]>("GET", "/api/allGroups", GROUPS));
  }

  getGroup(id: number): Observable<Group | undefined> {
    return from(
      this._fakeHttp.send<Group | undefined>(
        "GET",
        `/api/group/${id}`,
        GROUPS.find((group) => group.id === id))
    );
  }

  addGroup(group: GroupForm): Observable<Group> {
    return from(this._fakeHttp.send<Group>("GET", "/api/addGroup", group as Group, group));
  }

  editGroup(group: Group): Observable<Group> {
    return from(this._fakeHttp.send<Group>("PUT", "/api/editGroup", group, group));
  }

  deleteGroup(id: number): Observable<MessageResponse> {
    return from(this._fakeHttp.send<MessageResponse>("DELETE", `api/deleteGroup/${id}`, { message: "Group deleted" }));
  }
}

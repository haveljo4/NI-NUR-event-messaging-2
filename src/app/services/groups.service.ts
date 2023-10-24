import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";

import { Group } from "../models/group";
import { GroupForm } from "../models/forms/group-form";
import { MessageResponse } from "../models/responses/message-response";

@Injectable({
  providedIn: "root"
})
export class GroupsService {

  constructor(private _http: HttpClient) { }

  getAllGroups(): Observable<Group[]> {
    return this._http.get<Group[]>("/api/allGroups");
  }

  getGroup(id: number): Observable<Group> {
    return this._http.get<Group>(`/api/group/${id}`);
  }

  addGroup(group: GroupForm): Observable<Group> {
    return this._http.post<Group>("/api/addGroup", group);
  }

  editGroup(group: Group): Observable<Group> {
    return this._http.put<Group>("/api/editGroup", group);
  }

  deleteGroup(id: number): Observable<MessageResponse> {
    return this._http.delete<MessageResponse>(`api/deleteGroup/${id}`);
  }
}

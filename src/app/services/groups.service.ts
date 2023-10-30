import { Injectable } from "@angular/core";

import { Group } from "../models/group";
import { GroupForm } from "../models/forms/group-form";

import { GROUPS } from "../mocks/groups";

@Injectable({
  providedIn: "root"
})
export class GroupsService {

  private _groups: Group[] = GROUPS;
  private _maxId = Math.max(...GROUPS.map((group) => group.id), 0);

  constructor() { }

  private _findIndex(groupId: number): number {
     return this._groups.findIndex((group) => group.id === groupId);
  }

  getAllGroups(): Group[] {
    return this._groups.slice();
  }

  getGroup(id: number): Group | undefined {
    return this._groups.find((group) => group.id === id);
  }

  addGroup(group: GroupForm): void {
    if (!group.name) {
      throw new Error("Missing name in group");
    }

    this._groups.push({ id: ++this._maxId, name: group.name });
  }

  editGroup(group: Group): void {
    this._groups[this._findIndex(group.id)] = group;
  }

  deleteGroup(id: number): void {
    this._groups = this._groups.filter((group) => group.id !== id);
  }
}

import { Injectable } from "@angular/core";
import { Group } from "../models/group";
import { GroupForm } from "../models/forms/group-form";
import {AbstractDataService} from "./abstract-data.service";
import {GROUPS} from "../mocks/GroupsData";

@Injectable({
  providedIn: "root"
})
export class GroupsService extends AbstractDataService<Group, GroupForm>{
    constructor() {
        super(GROUPS);
    }

    override add(group: GroupForm): void {
    if (!group.name) {
        group.name = "undefined"
      // throw new Error("Missing name in group");
    }

    this._elems.push({ id: ++this._maxId, name: group.name });
  }


  convertElementToString(elem: Group): string {
    return elem.name;
  }
}

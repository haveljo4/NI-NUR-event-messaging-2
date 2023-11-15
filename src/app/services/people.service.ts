import { Injectable } from "@angular/core";

import { Person } from "../models/person";
import { PersonForm } from "../models/forms/person-form";
import { GroupsService } from "./groups.service";

import {AbstractDataService} from "./abstract-data.service";
import {PEOPLE} from "../mocks/PeopleData";

@Injectable({
  providedIn: "root"
})
export class PeopleService extends AbstractDataService<Person, PersonForm>{
  constructor(private _groupsService: GroupsService) {
    super(PEOPLE);
  }


  override add(person: PersonForm): void {
    if (!person.groupId || !person.firstName || !person.lastName || !person.phoneNumber) {
      throw new Error("Person's required properties are undefined");
    }

    // TODO implement support for multiple groups
    // let groupNames : string  []  = [];
    // person.groupId.forEach( i => groupNames.push(<string>this._groupsService.getElem(i)?.name))

    const group = this._groupsService.getElem(person.groupId);
    if (!group) {
      throw new Error("GroupId does not exist");
    }

    this._elems.push({
      id: ++super._maxId,
      groupIds: [person.groupId],
      firstName: person.firstName,
      lastName: person.lastName,
      phoneNumber: person.phoneNumber,
      email: person.email,
      groupNames: [group.name]
    });
  }


  convertElementToString(elem: Person): string {
    return `${elem.firstName} ${elem.lastName}`;
  }
}

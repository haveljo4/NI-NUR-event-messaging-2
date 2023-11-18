import { Injectable } from "@angular/core";

import { Person } from "../models/person";
import { PersonForm } from "../models/forms/person-form";
import { GroupsService } from "./groups.service";

import {AbstractDataService} from "./abstract-data.service";
import {PEOPLE} from "../mocks/PeopleData";

@Injectable({
  providedIn: "root"
})
export class PeopleService extends AbstractDataService<Person>{
  constructor(private _groupsService: GroupsService) {
    super(PEOPLE);
  }


  override add(person: Person): number {
    this._elems.push({
      id: ++this._maxId,
      groupIds: person.groupIds,
      firstName: person.firstName,
      lastName: person.lastName,
      phoneNumber: person.phoneNumber,
      email: person.email
      // TODO maybe not necessary to show
      // groupNames: person
    });
    return this._maxId;
  }


  convertElementToString(elem: Person): string {
    return `${elem.firstName} ${elem.lastName}`;
  }
}

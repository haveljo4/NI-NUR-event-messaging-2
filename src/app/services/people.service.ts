import { Injectable } from "@angular/core";

import { Person } from "../models/person";
import { PersonForm } from "../models/forms/person-form";
import { GroupsService } from "./groups.service";

import { PEOPLE } from "../mocks/people";

@Injectable({
  providedIn: "root"
})
export class PeopleService {

  private _people: Person[] = PEOPLE;
  private _maxId = Math.max(...PEOPLE.map((group) => group.id), 0);

  constructor(private _groupsService: GroupsService) { }

  private _findIndex(personId: number): number {
    return this._people.findIndex((group) => group.id === personId);
  }

  getAllPeople(): Person[] {
    return this._people.slice();
  }

  getPerson(id: number): Person | undefined {
    return this._people.find((person) => person.id === id);
  }

  addPerson(person: PersonForm): void {
    if (!person.groupId || !person.firstName || !person.lastName || !person.phoneNumber) {
      throw new Error("Person's required properties are undefined");
    }
    const group = this._groupsService.getGroup(person.groupId);
    if (!group) {
      throw new Error("GroupId does not");
    }

    this._people.push({
      id: ++this._maxId,
      groupId: person.groupId,
      firstName: person.firstName,
      lastName: person.lastName,
      phoneNumber: person.phoneNumber,
      email: person.email,
      groupName: group.name,
    });
  }

  editPerson(person: Person): void {
    this._people[this._findIndex(person.id)] = person;
  }

  deletePerson(id: number): void {
    this._people = this._people.filter((person) => person.id !== id);
  }
}

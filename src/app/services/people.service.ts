import { Injectable } from "@angular/core";

import { Observable, from } from "rxjs";

import { Person } from "../models/person";
import { PersonForm } from "../models/forms/person-form";
import { MessageResponse } from "../models/responses/message-response";
import { FakeHttpService } from "./fake-http.service";

import { PEOPLE } from "../mocks/people";
import { GROUPS } from "../mocks/groups";

@Injectable({
  providedIn: "root"
})
export class PeopleService {

  constructor(private _fakeHttp: FakeHttpService) { }

  getAllPeople(): Observable<Person[]> {
    return from(this._fakeHttp.send<Person[]>("GET", "/api/allPeople", PEOPLE));
  }

  getPerson(id: number): Observable<Person | undefined> {
    return from(
      this._fakeHttp.send<Person | undefined>(
        "GET",
        `/api/person/${id}`,
        PEOPLE.find((person) => person.id === id)
      )
    );
  }

  addPerson(person: PersonForm): Observable<Person> {
    return from(
      this._fakeHttp.send<Person>(
        "POST",
        "/api/addPerson",
        { ...person, groupName: GROUPS.find((group) => group.id === person.id) } as Person,
        person
      )
    );
  }

  editPerson(person: Person): Observable<Person> {
    return from(this._fakeHttp.send<Person>("PUT", "/api/editPerson", person, person));
  }

  deletePerson(id: number): Observable<MessageResponse> {
    return from(
      this._fakeHttp.send<MessageResponse>("DELETE", `api/deletePerson/${id}`, { message: "Person deleted" })
    );
  }
}

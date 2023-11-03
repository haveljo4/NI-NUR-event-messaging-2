import { Injectable } from '@angular/core';
import {from, Observable} from "rxjs";
import {Person} from "../models/person";
import {Group} from "../models/group";
import {WorkEvent} from "../models/workEvent";
import {Message} from "../models/message";
import {PEOPLE} from "../mocks/people";
import {PersonForm} from "../models/forms/person-form";
import {GROUPS} from "../mocks/groups";
import {MessageResponse} from "../models/responses/message-response";
import {people} from "../mocked-data/PeopleData";
import {groups} from "../mocked-data/GroupsData";
import {messages} from "../mocked-data/Messages";
import {events} from "../mocked-data/EventsData";

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private persons: Person[] = people.slice();
  private groups: Group[] = groups.slice();
  private messages: Message[] = messages.slice();
  private events: WorkEvent[] = events.slice();
  private nextPersonId: number = people.length + 1;
  private nextGroupId: number = groups.length + 1;
  private nextMessageId: number = messages.length + 1;
  private nextEventId: number = events.length + 1;


  constructor() {
  //   Load initial data

  }




  // Add a new Person to the collection
  addPerson(person: Person): Person {
    person.id = this.nextPersonId++;
    this.persons.push(person);
    return person;
  }

  // Get all persons in the collection
  getAllPeople(): Person[] {
    return this.persons;
  }

  // Get a specific Person by ID
  getPersonById(id: number): Person | undefined {
    return this.persons.find(person => person.id === id);
  }

  // Edit an existing Person in the collection
  editPerson(updatedPerson: Person): Person | undefined {
    const index = this.persons.findIndex(person => person.id === updatedPerson.id);
    if (index !== -1) {
      this.persons[index] = updatedPerson;
      return updatedPerson;
    }
    return undefined;
  }

  // Remove a Person from the collection
  removePerson(id: number): boolean {
    const index = this.persons.findIndex(person => person.id === id);
    if (index !== -1) {
      this.persons.splice(index, 1);
      return true;
    }
    return false;
  }

  // CRUD operations for Group collection
  addGroup(group: Group): Group {
    group.id = this.nextGroupId++;
    this.groups.push(group);
    return group;
  }

  getAllGroups(): Group[] {
    return this.groups;
  }

  getGroupById(id: number): Group | undefined {
    return this.groups.find(group => group.id === id);
  }

  editGroup(updatedGroup: Group): Group | undefined {
    const index = this.groups.findIndex(group => group.id === updatedGroup.id);
    if (index !== -1) {
      this.groups[index] = updatedGroup;
      return updatedGroup;
    }
    return undefined;
  }

  removeGroup(id: number): boolean {
    const index = this.groups.findIndex(group => group.id === id);
    if (index !== -1) {
      this.groups.splice(index, 1);
      return true;
    }
    return false;
  }

  // CRUD operations for Message collection
  addMessage(message: Message): Message {
    message.id = this.nextMessageId++;
    this.messages.push(message);
    return message;
  }

  getAllMessages(): Message[] {
    return this.messages;
  }

  getMessageById(id: number): Message | undefined {
    return this.messages.find(message => message.id === id);
  }

  // CRUD operations for Event collection
  addEvent(event: WorkEvent): WorkEvent {
    event.id = this.nextEventId++;
    this.events.push(event);
    return event;
  }

  getAllEvents(): WorkEvent[] {
    return this.events;
  }

  getEventById(id: number): WorkEvent | undefined {
    return this.events.find(event => event.id === id);
  }

}

import { Injectable } from "@angular/core";
import {AbstractDataService} from "./abstract-data.service";
import {WorkEvent} from "../models/workEvent";
import {EVENTS} from "../mocks/EventsData";
import {EventForm} from "../models/forms/event-form";

@Injectable({
  providedIn: "root"
})
export class EventsService extends AbstractDataService<WorkEvent, WorkEvent>{
  constructor() {
    super(EVENTS);
  }
  override add(event: EventForm): void {
    super._elems.push(<WorkEvent>{id: ++this._maxId, dateTime: "", description: "", name: event.name, participantGroupIds: [], status: ""});
  }
}

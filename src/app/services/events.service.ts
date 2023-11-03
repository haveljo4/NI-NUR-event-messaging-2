import { Injectable } from "@angular/core";
import {AbstractDataService} from "./abstract-data.service";
import {WorkEvent} from "../models/workEvent";

@Injectable({
  providedIn: "root"
})
export class GroupsService extends AbstractDataService<WorkEvent, WorkEvent>{

  override add(event: WorkEvent): void {
    super._elems.push(event);
  }
}

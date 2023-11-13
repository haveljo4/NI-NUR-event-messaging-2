import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class FakeHttpService {

  constructor() { }

  async send<T>(type: string, url: string, response: T, body?: any): Promise<T> {
    return response;
  }
}

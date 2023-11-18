import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalDialogCreator {
  static showGroupDialogCallback: (() => void)= () => {};
  static showAddPersonDialogCallback: (() => void)= () => {};

  constructor() { }

  public static setShowGroupDialogCallback (f : (() => void)) : void {
    this.showGroupDialogCallback = f;
  }

  public static setShowPersonDialogCallback (f : (() => void)) : void {
    this.showAddPersonDialogCallback = f;
  }
}


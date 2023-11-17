import {DataElement} from "../models/DataElement";

/**
 * T is a type of element stored in the store
 */
export abstract class AbstractDataService<T extends DataElement> {

  protected _elems: T[] = [];
  protected _maxId = 0;

  constructor(initialData: T[]) {
    if (initialData) {
      this._elems = initialData.slice();
    }
    this._maxId = Math.max(...this._elems.map((elem) => elem.id), 0);
  }

  private _findIndex(groupId: number): number {
    return this._elems.findIndex((group) => group.id === groupId);
  }

  getAll(): T[] {
    return this._elems;
  }

  getElem(id: number): T | undefined {
    return this._elems.find((group) => group.id === id);
  }

  // Returns id of the last added elem
  abstract add(form: T): number;

  editElem(elem: T): void {
    this._elems[this._findIndex(elem.id)] = elem;
  }

  deleteElem(id: number): void {
    this._elems = this._elems.filter((elem) => elem.id !== id);
  }

  abstract convertElementToString(elem: T): string;
}

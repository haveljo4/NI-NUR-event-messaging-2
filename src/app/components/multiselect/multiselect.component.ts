import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {AbstractDataService} from "../../services/abstract-data.service";
import {DataElement} from "../../models/DataElement";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: "app-multiselect",
  templateUrl: "./multiselect.component.html",
  styleUrls: ["./multiselect.component.scss"],
})
export class MultiselectComponent<T extends DataElement, R> implements OnInit {
  @Input() elementService!: AbstractDataService<T, R>; // Must be initialized, otherwise 💩
  @Input() searchLabel = "";
  @Input() buttonLabel = "";
  @Input() preselectedIds: number[] = [];
  @Input() isReadOnly = false;
  @Output() selectedIds = new EventEmitter<number[]>();

  searchControl = new FormControl<string | T>("");
  allItems: T[] = [];
  filteredOptions: Observable<T[]> = new Observable<T[]>(); // assign in ngOnInit()
  selectedItems: T[] = [];
  displayedChips: T[] = [];
  chipsFilter = "";
  convertElementToString: (el: T) => string = (el: T) => "";
  @Input() buttonFunction = () => {};

  ngOnInit(): void {
    this.convertElementToString = this.elementService.convertElementToString;
    this.allItems = this.elementService.getAll();
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(""),
      map(value => {
        if (value === null) {
          return this.allItems;
        }
        const label = typeof value === "string" ? value : this.convertElementToString(value);
        return this._filter(label);
      })
    );
    this._preselectItems();
  }

  private _filter(value: string): T[] {
    if (value === "") {
      return this.allItems;
    }
    const filterValue = value.toLowerCase();
    return this.allItems.filter(el => this.convertElementToString(el).toLowerCase().includes(filterValue));
  }

  private _preselectItems(): void {
    if (this.preselectedIds) {
      this.preselectedIds.forEach(id => {
        const item = this.allItems.find(i => i.id === id);
        if (item) {
          this.selectedItems.push(item);
        }
      });
    }
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const item = event.option.value as T;
    const index = this.allItems.indexOf(item);
    if (index >= 0) {
      const removed = this.allItems.splice(index, 1);
      removed.forEach(el => this.selectedItems.push(el));
    }
    this.displayedChips = this.selectedItems;
    this.chipsFilter = "";
    this.searchControl.setValue(null);
    this._filter("");
    this.emitSelectedIds();
  }

  emitSelectedIds(): void {
    const ids = this.selectedItems.map(item => item.id);
    this.selectedIds.emit(ids);
  }

  filterChips(): void {
    if (this.chipsFilter === "") {
      this.displayedChips = this.selectedItems;
    } else {
      this.displayedChips = this.selectedItems.filter(item =>
        this.convertElementToString(item).toLowerCase().includes(this.chipsFilter.toLowerCase())
      );
    }
  }

  removeSelectedItem(item: T): void {
    const index = this.selectedItems.indexOf(item);

    if (index >= 0) {
      const removed = this.selectedItems.splice(index, 1);
      removed.forEach(el => this.allItems.push(el));
    }
  }

  callButtonFunction(): void {
    this.buttonFunction();
    // TODO Renew data from service
  }
}

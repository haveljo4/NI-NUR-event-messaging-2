import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MessagesComponent } from './components/messages/messages.component';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { DatabasePeopleComponent } from "./components/database/database-people/database-people.component";
import { DatabaseGroupsComponent } from "./components/database/database-groups/database-groups.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { PersonDialogComponent } from "./components/database/person-dialog/person-dialog.component";
import { GroupDialogComponent } from "./components/database/group-dialog/group-dialog.component";
import { LoginComponent } from "./components/login/login.component";
import { PhoneNumberPipe } from "./pipes/phone-number.pipe";
import { DatabaseEventsComponent } from "./components/database/database-events/database-events.component";
import {EventDialogComponent} from "./components/database/event-dialog/event-dialog.component";
import { GroupMessageDialogComponent } from './components/message-dialogs/group-message-dialog/group-message-dialog.component';
import { EventMessageDialogComponent } from './components/message-dialogs/event-message-dialog/event-message-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DatabasePeopleComponent,
    DatabaseGroupsComponent,
    PageNotFoundComponent,
    ConfirmDialogComponent,
    PersonDialogComponent,
    GroupDialogComponent,
    EventDialogComponent,
    LoginComponent,
    PhoneNumberPipe,
    DatabaseEventsComponent,
    GroupMessageDialogComponent,
    EventMessageDialogComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        horizontalPosition: "start",
        duration: 4000
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { DatabaseComponent } from "./database/database.component";
import { DatabasePeopleComponent } from "./database/database-people/database-people.component";
import { DatabaseGroupsComponent } from "./database/database-groups/database-groups.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SendComponent } from "./send/send.component";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { PersonDialogComponent } from "./database/person-dialog/person-dialog.component";
import { GroupDialogComponent } from "./database/group-dialog/group-dialog.component";
import { LoginComponent } from "./login/login.component";
import { PhoneNumberPipe } from "./pipes/phone-number.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DatabaseComponent,
    DatabasePeopleComponent,
    DatabaseGroupsComponent,
    PageNotFoundComponent,
    SendComponent,
    ConfirmDialogComponent,
    PersonDialogComponent,
    GroupDialogComponent,
    LoginComponent,
    PhoneNumberPipe
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
    MatSlideToggleModule
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

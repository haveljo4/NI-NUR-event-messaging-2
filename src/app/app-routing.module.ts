import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { SendComponent } from "./components/send/send.component";
import { DatabaseGroupsComponent } from "./components/database/database-groups/database-groups.component";
import { DatabasePeopleComponent } from "./components/database/database-people/database-people.component";
import { DatabaseEventsComponent } from "./components/database/database-events/database-events.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "people", component: DatabasePeopleComponent },
  { path: "groups", component: DatabaseGroupsComponent },
  { path: "events", component: DatabaseEventsComponent },
  { path: "messages", component: SendComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

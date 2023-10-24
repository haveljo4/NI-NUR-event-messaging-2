import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { DatabaseComponent } from "./database/database.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SendComponent } from "./send/send.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "database", component: DatabaseComponent },
  { path: "send", component: SendComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

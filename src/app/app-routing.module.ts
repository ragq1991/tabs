import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {TabsComponent} from "./tabs/tabs.component"; // CLI imports router

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'navigator', component: TabsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

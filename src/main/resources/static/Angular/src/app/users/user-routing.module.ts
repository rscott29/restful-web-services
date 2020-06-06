import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UserListComponent} from "./user-list/user-list.component";


const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

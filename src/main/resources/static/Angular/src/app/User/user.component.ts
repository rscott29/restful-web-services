import {Component, Input, OnInit} from "@angular/core";

import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {User} from "./User";

@Component({
  selector: 'app-user',
  template: '<app-user-list></app-user-list> <app-add-user></app-add-user>',

})
export class UserComponent implements OnInit {


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {

  }

}

import {Component, OnInit} from "@angular/core";



@Component({
  selector: 'app-user',
  template: '<app-user-list></app-user-list> <app-add-user></app-add-user>',

})
export class UserComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {}

}

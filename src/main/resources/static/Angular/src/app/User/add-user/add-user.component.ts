import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ngx-custom-validators";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      'name':  ['', [Validators.required, Validators.minLength(2)]],
      'birthDate': ['', [Validators.required, CustomValidators.maxDate(Date.now()) ]]
    });
  }

  add(): void {
    this.userService.create(this.userForm.value);
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }
}

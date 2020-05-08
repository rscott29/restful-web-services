import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ngx-custom-validators";
import {NbToastrService} from "@nebular/theme";
import {MessageService} from "../../message/message.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy{
  userForm: FormGroup;
  message: any = {};
  subscription: Subscription
  constructor(private userService: UserService, private fb: FormBuilder, private toastrService: NbToastrService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      'name':  ['', [Validators.required, Validators.minLength(2)]],
      'birthDate': ['', [Validators.required, CustomValidators.maxDate(Date.now()) ]]
    });

  }

  add(): void {
    this.userService.create(this.userForm.value);
    this.showToast('top-right', 'success')
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }
  showToast(position, status) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.message = message;
      this.toastrService.show(
          this.message.text || 'Success',
          `Success`,
          {position, status});

    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}

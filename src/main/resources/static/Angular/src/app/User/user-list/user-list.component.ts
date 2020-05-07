import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../user.service";
import {combineLatest, Observable, pipe} from "rxjs";
import {User} from "../User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, startWith, tap} from "rxjs/operators";
import {NbAutocompleteComponent, NbFlipCardComponent} from "@nebular/theme";
import {CustomValidators} from "ngx-custom-validators";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(NbFlipCardComponent) flip: NbFlipCardComponent;
  @ViewChild(NbAutocompleteComponent) searchBox: NbAutocompleteComponent<any>;
  $users: Observable<User[]>
  filteredUsers$: Observable<User[]>;
  filter: FormControl;
  filter$: Observable<string>;
  userEditForm: FormGroup;


  constructor(private userService: UserService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.userEditForm = this.fb.group({
      'editName':  ['', [Validators.required, Validators.minLength(2)]],
      'editBirthDate': ['', [Validators.required, CustomValidators.maxDate(Date.now()) ]]
    });
    this.userService.loadAll();
    this.$users = this.userService.users
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredUsers$ = combineLatest([this.$users, this.filter$]).pipe(
      map(([users, filterString]) => users.filter(
        user => user.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    );
  }
  ngAfterViewInit() {
    this.flip.showToggleButton = false;
    this.searchBox.selectedChange.subscribe( x => {

      this.flip.toggle();
      this.flip.showToggleButton = true;

    })

  }

  update(user: User) {
      user.name = this.userEditForm.controls['editName'].value;
      this.userService.update(user);
  }

  delete(id: number) {
    this.userService.remove(id);
  }
}

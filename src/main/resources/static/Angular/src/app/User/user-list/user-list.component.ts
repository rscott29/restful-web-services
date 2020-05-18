import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../user.service";
import {combineLatest, Observable, Subscription} from "rxjs";
import {User} from "../User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {NbAutocompleteComponent, NbFlipCardComponent, NbToastrService} from "@nebular/theme";
import {CustomValidators} from "ngx-custom-validators";
import {MessageService} from "../../message/message.service";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(NbFlipCardComponent) flipCard: NbFlipCardComponent;
    @ViewChild(NbAutocompleteComponent) searchBox: NbAutocompleteComponent<any>;

    $users: Observable<User[]>
    user: any = {};
    id: number;
    filteredUsers$: Observable<User[]>;
    filter: FormControl;
    filter$: Observable<string>;
    userEditForm: FormGroup;
    message: any = {};
    subscription: Subscription;

    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private toastrService: NbToastrService,
        private messageService: MessageService) {

    }

    ngOnInit(): void {

        this.userEditForm = this.fb.group({
            'editName': ['', [Validators.required, Validators.minLength(2)]],
            'editBirthDate': ['', [Validators.required, CustomValidators.maxDate(Date.now())]]
        });
        this.userService.loadAll();
        this.$users = this.userService.users
        this.filter = new FormControl('');
        this.filter$ = this.filter.valueChanges.pipe(startWith(''));
        this.filteredUsers$ = combineLatest([this.$users, this.filter$]).pipe(
            map(([users, filterString]) => users.filter(
                user => user.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
        )
    }

    ngAfterViewInit() {
        this.flipCard.showToggleButton = false;
        this.searchBox.selectedChange.subscribe(() => {

            this.flipCard.toggle();
            this.flipCard.showToggleButton = true;

        });
        this.filteredUsers$.subscribe((user) => {
            user.map(user => {
                this.user = {...user};
            })

        })
    }

    update(user: User) {

        user.name = this.userEditForm.controls['editName'].value;
        user.permissions = ['foo']
        user.permissionList = ['something']
        user.rolesList = ['faraer']
        user.roles = ['bar']
        this.userService.update(user);
        this.flipCard.toggle();
        this.showToast('top-left', 'success')
    }

    delete(id: number) {
        this.userService.remove(id);
        this.flipCard.toggle();
    }

    showToast(position, status) {
        this.subscription = this.messageService.getMessage().subscribe(message => {
            this.message = message;
            this.toastrService.show(
                this.message.text || 'Success',
                `Success`,
                {position, status, preventDuplicates: true});
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

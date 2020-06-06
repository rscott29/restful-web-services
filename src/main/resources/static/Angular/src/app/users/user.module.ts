import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from "./user-list/user-list.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {
    NbAutocompleteModule,
    NbCardModule,
    NbDatepickerModule,
    NbListModule,
    NbUserModule
} from "@nebular/theme";
import {MessageComponent} from "../message/message.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        UserListComponent,
        AddUserComponent,
        MessageComponent
    ],
    imports: [
        CommonModule,
        NbUserModule,
        NbCardModule,
        NbListModule,
        NbDatepickerModule,
        NbAutocompleteModule,
        SharedModule

    ]
})
export class UserModule {
}

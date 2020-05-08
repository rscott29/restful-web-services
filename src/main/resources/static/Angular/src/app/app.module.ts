import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MessageComponent} from './message/message.component';
import {HttpClientModule} from "@angular/common/http";
import {AddUserComponent} from './User/add-user/add-user.component';
import {UserListComponent} from './User/user-list/user-list.component';
import {UserComponent} from "./User/user.component";
import {UserService} from "./User/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {CustomFormsModule} from "ngx-custom-validators";


import {
    NbActionsModule,
    NbAutocompleteModule,
    NbButtonModule,
    NbCardModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbListModule,
    NbMenuModule,
    NbSelectModule,
    NbSidebarModule,
    NbSidebarService,
    NbThemeModule,
    NbToastrModule,
    NbUserModule
} from '@nebular/theme';


import {NbEvaIconsModule} from '@nebular/eva-icons';
import {LayoutComponent} from './layout/layout.component';
import {MessageService} from "./message/message.service";


@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        UserComponent,
        AddUserComponent,
        UserListComponent,
        LayoutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        CustomFormsModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        NbThemeModule.forRoot({name: 'corporate'}),
        NbMenuModule.forRoot(),
        NbEvaIconsModule,
        NbInputModule,
        NbLayoutModule,
        NbSidebarModule,
        NbButtonModule,
        NbEvaIconsModule,
        NbSidebarModule,
        NbActionsModule,
        NbCardModule,
        NbMenuModule,
        NbIconModule,
        NbSelectModule,
        NbListModule,
        NbUserModule,
        NbDatepickerModule.forRoot(),
        NbToastrModule.forRoot(),
        NbAutocompleteModule
    ],
    providers: [
        UserService,
        NbSidebarService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

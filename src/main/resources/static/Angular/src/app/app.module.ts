import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import {HttpClientModule} from "@angular/common/http";
import { AddUserComponent } from './User/add-user/add-user.component';
import { UserListComponent } from './User/user-list/user-list.component';
import {UserComponent} from "./User/user.component";
import {UserService} from "./User/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CustomFormsModule} from "ngx-custom-validators";

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbSidebarService,
  NbButtonModule,
  NbActionsModule,
  NbCardModule,
  NbMenuModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbUserModule,
  NbInputModule,
  NbDatepickerModule, NbAutocompleteModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LayoutComponent } from './layout/layout.component';
import {NbMenuInternalService} from "@nebular/theme/components/menu/menu.service";



@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    UserComponent,
    AddUserComponent,
    UserListComponent,
    LayoutComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    MatCheckboxModule,
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
    NbAutocompleteModule,

  ],
  providers: [
    UserService,
    NbSidebarService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

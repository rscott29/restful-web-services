import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule} from "@nebular/theme";
import {AuthRoutingModule} from "./auth-routing.module";
import { NbAuthModule } from '@nebular/auth';
import {AuthGuard} from "./auth.guard";


@NgModule({
  declarations: [LoginComponent],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,
    NbAuthModule,
  ],
  providers: [
      AuthGuard
  ]
})
export class AuthModule { }

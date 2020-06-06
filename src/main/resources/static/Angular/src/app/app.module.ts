import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule, HttpResponse} from "@angular/common/http";
import {UserService} from "./users/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CustomFormsModule} from "ngx-custom-validators";
import {

    NbMenuModule,
    NbSidebarService,
    NbThemeModule,
    NbToastrModule,

} from '@nebular/theme';

import {MessageService} from "./message/message.service";
import {AuthModule} from "./auth/auth.module";
import {

    NbAuthJWTToken,
    NbAuthModule,
    NbAuthService,
    NbPasswordAuthStrategy,
    NbTokenService,

} from "@nebular/auth";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {FlexLayoutModule} from "@angular/flex-layout";



@NgModule({
    declarations: [
        AppComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NbEvaIconsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CustomFormsModule,
        BrowserAnimationsModule,
        AuthModule,
        FormsModule,
        NbAuthModule.forRoot({
            strategies: [
                NbPasswordAuthStrategy.setup({
                    name: 'email',
                    baseEndpoint: 'http://localhost:5000',
                    login: {

                        endpoint: '/login',
                        redirect: {
                            success: '/home',
                            failure: '/register',
                        }
                    },
                    logout: {
                        endpoint: '',
                    },
                    token: {
                        class: NbAuthJWTToken ,
                        getter: (module: string, res: HttpResponse<Object>) => res.headers.get('Authorization'),
                        key: 'token',
                    }
                }),
            ],
            forms: {},
        }),
        NbThemeModule.forRoot({name: 'corporate'}),
        NbMenuModule.forRoot(),
        NbToastrModule.forRoot(),

    ],
    providers: [
       {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        UserService,
        NbSidebarService,
        MessageService,
        NbAuthService,
        NbTokenService,

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

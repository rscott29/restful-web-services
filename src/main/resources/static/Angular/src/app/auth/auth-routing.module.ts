import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NbAuthComponent} from "@nebular/auth";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
    {
        path: 'auth',
        component: NbAuthComponent,
        loadChildren: '../auth/auth.module#AuthModule',

    },
    {
        path: '',
        component: NbAuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            }
        ],
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}

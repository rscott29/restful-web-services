import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./User/user-list/user-list.component";
import {LayoutComponent} from "./layout/layout.component";


const routes: Routes = [
    {
        path: 'home',
        component: LayoutComponent,
        children: [
            {
                path: 'users',
                component: UserListComponent,
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

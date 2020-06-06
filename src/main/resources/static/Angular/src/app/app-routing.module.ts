import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";


const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
        canActivate: [ AuthGuard]
    },
    {
        path: 'home',
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
        canActivate: [AuthGuard]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

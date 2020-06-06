import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {ModuleMapLoaderModule} from "@nguniversal/module-map-ngfactory-loader";

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        ModuleMapLoaderModule // Add this line // TODO: Check how to add this line - lazy loading is at the moment not supported!
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {
}
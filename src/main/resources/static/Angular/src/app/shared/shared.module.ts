import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NbButtonModule, NbInputModule} from "@nebular/theme";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NbInputModule,
        NbButtonModule
    ],
    exports: [
        ReactiveFormsModule,
        NbInputModule,
        FlexLayoutModule,
        NbButtonModule
    ]
})
export class SharedModule {
}

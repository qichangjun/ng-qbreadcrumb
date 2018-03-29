import {NgModule} from "@angular/core";
import {BreadcrumbComponent} from "./breadcrumb.component";
import {CommonModule} from "@angular/common";
import {BreadcrumbService} from "./breadcrumb.service";

@NgModule({
    declarations: [
        BreadcrumbComponent
    ],
    providers: [
        BreadcrumbService
    ],
    imports: [
        CommonModule
    ],
    exports: [BreadcrumbComponent]
})
export class BreadcrumbsModule {
    constructor() {}

}
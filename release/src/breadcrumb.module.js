"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var breadcrumb_component_1 = require("./breadcrumb.component");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var breadcrumb_service_1 = require("./breadcrumb.service");
var BreadcrumbsModule = (function () {
    function BreadcrumbsModule() {
    }
    BreadcrumbsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        breadcrumb_component_1.BreadcrumbComponent
                    ],
                    providers: [
                        breadcrumb_service_1.BreadcrumbService
                    ],
                    imports: [
                        platform_browser_1.BrowserModule,
                        common_1.CommonModule
                    ],
                    exports: [breadcrumb_component_1.BreadcrumbComponent]
                },] },
    ];
    /** @nocollapse */
    BreadcrumbsModule.ctorParameters = function () { return []; };
    return BreadcrumbsModule;
}());
exports.BreadcrumbsModule = BreadcrumbsModule;
//# sourceMappingURL=breadcrumb.module.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/catch");
require("rxjs/Rx");
var option_class_1 = require("./option.class");
var breadcrumb_service_1 = require("./breadcrumb.service");
var BreadcrumbComponent = (function () {
    function BreadcrumbComponent(http, breadcrumbService) {
        this.http = http;
        this.breadcrumbService = breadcrumbService;
        this.options = {
            keyId: 'id',
            requestId: 'id',
            keyTitle: 'name',
            method: 'get',
            additionalParam: {},
            url: '',
            requestCallBack: function (res) { return res; }
        };
        this.breadNodeClickEvent = new core_1.EventEmitter();
        this.rootClickEvent = new core_1.EventEmitter();
        this.breadCrumbData = [];
    }
    BreadcrumbComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-breadcrumb',
                    template: "\n    <span *ngFor=\"let rooNode of breadcrumbService.getRootNodes()\" \n    (click)=\"clickRootNode(rooNode)\"\n    >\n      {{rooNode}} > \n    </span>\n\n    <span *ngFor=\"let breadData of breadCrumbData\">\n      \n      <span [hidden]=\"breadcrumbService.isRouteHidden(breadData[options.keyTitle])\"\n        (click)=\"breadNodeClick(breadData)\">\n        {{breadData[options.keyTitle]}} >\n      </span>\n    </span>\n  ",
                    styles: ["\n  "],
                },] },
    ];
    /** @nocollapse */
    BreadcrumbComponent.ctorParameters = function () { return [
        { type: http_1.Http, },
        { type: breadcrumb_service_1.BreadcrumbService, },
    ]; };
    BreadcrumbComponent.propDecorators = {
        "ids": [{ type: core_1.Input },],
        "options": [{ type: core_1.Input },],
        "breadNodeClickEvent": [{ type: core_1.Output },],
        "rootClickEvent": [{ type: core_1.Output },],
    };
    return BreadcrumbComponent;
}());
exports.BreadcrumbComponent = BreadcrumbComponent;
//# sourceMappingURL=breadcrumb.component.js.map
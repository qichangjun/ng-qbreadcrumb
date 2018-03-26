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
    BreadcrumbComponent.prototype.breadNodeClick = function (node) {
        for (var i = 0; i < this.ids.length; i++) {
            if (this.ids[i] == node[this.options.keyId]) {
                this.ids.splice(i + 1, this.ids.length - i);
                break;
            }
        }
        var ids = [];
        for (var i = 0; i < this.ids.length; i++) {
            ids.push(this.ids[i]);
        }
        this.breadNodeClickEvent.emit({ type: 'click', node: node, ids: ids });
    };
    BreadcrumbComponent.prototype.clickRootNode = function (rootNode) {
        this.rootClickEvent.emit({ type: 'click', node: rootNode });
    };
    BreadcrumbComponent.prototype.updateData = function (ids) {
        var _this = this;
        if (!this.options || !this.options.url)
            return;
        var params = new http_1.URLSearchParams();
        params.set(this.options.requestId, ids);
        for (var key in this.options.additionalParam) {
            params.set(key, this.options.additionalParam[key]);
        }
        this.http.get(this.options.url, { search: params })
            .toPromise()
            .then(function (res) {
            var body = res.json();
            _this.breadCrumbData = _this.options.requestCallBack(body);
        })
            .catch(function (error) {
            return console.error(error);
        });
    };
    BreadcrumbComponent.prototype.ngOnChanges = function (changes) {
        if (changes['ids']) {
            this.updateData(this.ids);
        }
    };
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
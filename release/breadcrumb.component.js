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
                    template: "\n  <ol class=\"doc-breadcrumb pull-left list-unstyled\">\n    <li class=\"doc-breadcrumb__li\" >\n      <span *ngFor=\"let rooNode of breadcrumbService.getRootNodes();let i = index\" \n        (click)=\"clickRootNode(rooNode)\"\n      >\n        <span class=\"doc-breadcrumb__li__click__title\">{{rooNode}}</span>\n        <span *ngIf=\"i != breadcrumbService.getRootNodes().length - 1 || breadCrumbData.length != 0\" class=\"fa fa-angle-right\" ></span>\n      </span>\n    </li>\n   \n    <ng-container *ngIf=\"breadCrumbData.length < 5\">\n      <li class=\"doc-breadcrumb__li\" *ngFor=\"let breadNode of breadCrumbData; let i = index\" >\n        <span *ngIf=\"i < breadCrumbData.length-1\" >\n            <a (click)=\"breadNodeClick(breadNode)\" class=\"doc-breadcrumb__li__click\"  >\n              <span class=\"doc-breadcrumb__li__click__title\">{{breadNode[options.keyTitle]}}</span></a>\n                <span class=\"fa fa-angle-right\" ></span>\n        </span>\n        \n        <span *ngIf=\"i == breadCrumbData.length-1\">\n              <span >{{breadNode[options.keyTitle]}}</span>\n        </span>\n      </li>\n    </ng-container>\n    <ng-container *ngIf=\"breadCrumbData.length >= 5\">\n      <li class=\"doc-breadcrumb__li\" *ngFor=\"let breadNode of breadCrumbData; let i = index\" >\n        <span *ngIf=\"i < 1 \">\n            <a (click)=\"breadNodeClick(breadNode)\" class=\"doc-breadcrumb__li__click\"  >\n              <span class=\"doc-breadcrumb__li__click__title\">{{breadNode[options.keyTitle]}}</span></a>\n                <span class=\"fa fa-angle-right\" ></span>\n        </span>\n\n        <span *ngIf=\"i==2\">...</span>\n        <span *ngIf=\"breadCrumbData.length - 1 > i && i > breadCrumbData.length - 3\">\n        \n           <a (click)=\"breadNodeClick(breadNode)\" class=\"doc-breadcrumb__li__click\"  >\n              <span class=\"doc-breadcrumb__li__click__title\">{{breadNode[options.keyTitle]}}</span></a>\n                <span class=\"fa fa-angle-right\" ></span>\n          </span>\n\n        <span *ngIf=\"i == breadCrumbData.length-1\">\n          <span >{{breadNode[options.keyTitle]}}</span>\n        </span>\n      </li>     \n    </ng-container>\n  </ol>\n  ",
                    styles: ["\n  :host{\n    display: block;\n    float: left;\n    width: 100%;\n  }\n  .doc-breadcrumb-container {\n      padding-left: 14px;\n      display: inline-block;\n      vertical-align: middle;\n      margin-top: 6px; }\n    \n    .doc-breadcrumb-container .doc-breadcrumb {\n      margin-bottom: 0;\n      color: #999; }\n    \n    @media (max-width: 1440px) {\n      .doc-breadcrumb-container .doc-breadcrumb {\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis; } }\n    .doc-breadcrumb {\n      height: 32px; }\n    \n    .doc-breadcrumb .doc-breadcrumb__li {\n      float: left;\n      cursor: pointer;\n      line-height: 32px;\n      padding-right: 5px; }\n      .doc-breadcrumb .doc-breadcrumb__li a {\n        color: #337ab7; }\n    \n    .doc-breadcrumb__li .doc-breadcrumb__li__click--first {\n      font-weight: 900;\n      cursor: default;\n      color: #000000 !important; }\n      .doc-breadcrumb__li .doc-breadcrumb__li__click--first a {\n        cursor: default;\n        color: #000000; }\n      .doc-breadcrumb__li .doc-breadcrumb__li__click--first .breadcrumb--right--iocn {\n        font-weight: normal; }\n    \n    .doc-breadcrumb .doc-breadcrumb__li.last {\n      cursor: default; }\n    \n    .doc-breadcrumb .doc-breadcrumb__li.last a {\n      color: #000000;\n      cursor: default; }\n    \n    .doc-breadcrumb .doc-breadcrumb__li.last .doc-breadcrumb__li__rgticon {\n      visibility: hidden; }\n    \n    .doc-breadcrumb a {\n      color: #000000; }\n    \n    .doc-breadcrumb__li__click__title {\n      display: inline-block;\n      max-width: 150px;\n      height: 15px;\n      line-height: 15px;\n      vertical-align: text-bottom;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n    \n    .fa-angle-right {\n      font-size: 14px;\n      color: #999; }\n    \n    .curSelectedNode {\n      color: red !important; }\n    \n    /*# sourceMappingURL=breadCrumb.component.css.map */\n    \n  "]
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
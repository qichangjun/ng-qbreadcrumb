"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BreadcrumbService = (function () {
    function BreadcrumbService() {
        this.hideNodes = new Array();
        this.rootNodes = new Array();
    }
    /**
     * 指定一个你不像显示的面包屑
     */
    /**
         * 指定一个你不像显示的面包屑
         */
    BreadcrumbService.prototype.hideRoute = /**
         * 指定一个你不像显示的面包屑
         */
    function (name) {
        if (this.hideNodes.indexOf(name) === -1) {
            this.hideNodes.push(name);
        }
    };
    /**
     * 查看该节点是否显示
     */
    /**
         * 查看该节点是否显示
         */
    BreadcrumbService.prototype.isRouteHidden = /**
         * 查看该节点是否显示
         */
    function (name) {
        var hide = this.hideNodes.indexOf(name) > -1;
        return hide;
    };
    /**
     * 设置root节点
     */
    /**
         * 设置root节点
         */
    BreadcrumbService.prototype.setRootNode = /**
         * 设置root节点
         */
    function (name) {
        this.rootNodes = typeof name == 'string' ? [name] : name;
    };
    BreadcrumbService.prototype.getRootNodes = function () {
        return this.rootNodes;
    };
    BreadcrumbService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    BreadcrumbService.ctorParameters = function () { return []; };
    return BreadcrumbService;
}());
exports.BreadcrumbService = BreadcrumbService;
//# sourceMappingURL=breadcrumb.service.js.map
import { EventEmitter, SimpleChange } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { Options } from './option.class';
import { BreadcrumbService } from './breadcrumb.service';
export declare class BreadcrumbComponent {
    private http;
    breadcrumbService: BreadcrumbService;
    ids: Array<any>;
    options: Options;
    breadNodeClickEvent: EventEmitter<any>;
    rootClickEvent: EventEmitter<any>;
    breadCrumbData: Array<any>;
    constructor(http: Http, breadcrumbService: BreadcrumbService);
    breadNodeClick(node: any): void;
    clickRootNode(rootNode: any): void;
    updateData(ids: any): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
}

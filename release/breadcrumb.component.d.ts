import { EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { Options } from './option.class';
import { BreadcrumbService } from './breadcrumb.service';
export declare class BreadcrumbComponent {
    private http;
    private breadcrumbService;
    ids: Array<any>;
    options: Options;
    breadNodeClickEvent: EventEmitter<any>;
    rootClickEvent: EventEmitter<any>;
    breadCrumbData: Array<any>;
    constructor(http: Http, breadcrumbService: BreadcrumbService);
}
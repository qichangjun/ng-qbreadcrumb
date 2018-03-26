import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Http, Headers, Response,URLSearchParams,RequestOptionsArgs,RequestOptions,ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'

import { Options } from './option.class';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <span *ngFor="let rooNode of breadcrumbService.getRootNodes()" 
    (click)="clickRootNode(rooNode)"
    >
      {{rooNode}} > 
    </span>

    <span *ngFor="let breadData of breadCrumbData">
      
      <span [hidden]="breadcrumbService.isRouteHidden(breadData[options.keyTitle])"
        (click)="breadNodeClick(breadData)">
        {{breadData[options.keyTitle]}} >
      </span>
    </span>
  `,
  styles: [`
  `],
})
export class BreadcrumbComponent {  
  @Input() ids : Array<any>;
  @Input() options : Options = {
    keyId : 'id',
    requestId : 'id',
    keyTitle : 'name',
    method : 'get',
    additionalParam : {},
    url : '',
    requestCallBack : res => res
  }
  @Output() breadNodeClickEvent : EventEmitter<any> = new EventEmitter();
  @Output() rootClickEvent : EventEmitter<any> = new EventEmitter();

  breadCrumbData : Array<any> = [];

  constructor(
    private http : Http,
    private breadcrumbService : BreadcrumbService
  ) {
  }

 
}



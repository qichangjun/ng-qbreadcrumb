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

  breadNodeClick(node : any){
    for (let i = 0 ; i < this.ids.length;i++) {      
      if (this.ids[i] == node[this.options.keyId]) {
        this.ids.splice(i+1,this.ids.length - i);
        break;
      }
    }
    let ids = [];
    for (let i = 0 ; i < this.ids.length;i++) {
      ids.push(this.ids[i])
    }       
    this.breadNodeClickEvent.emit({type:'click',node:node,ids:ids})
  }

  clickRootNode(rootNode : any){
    this.rootClickEvent.emit({type:'click',node:rootNode})
  }
  
  updateData(ids : any){    
    if (!this.options || !this.options.url) return     
    let params = new URLSearchParams();    
    params.set(this.options.requestId,ids)
    for(let key in this.options.additionalParam){
      
      params.set(key,this.options.additionalParam[key])
    }
    this.http.get(this.options.url ,{search : params})
                    .toPromise()
                    .then(res => {
                      let body = res.json();    
                      this.breadCrumbData = this.options.requestCallBack(body)                      
                    })
                    .catch(error =>
                      console.error(error)
                    );
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){    
    if (changes['ids']) {          
      this.updateData(this.ids)  
    }
  }
 
}



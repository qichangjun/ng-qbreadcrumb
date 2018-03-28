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
  <ol class="doc-breadcrumb pull-left list-unstyled">
    <li class="doc-breadcrumb__li" >
      <span *ngFor="let rooNode of breadcrumbService.getRootNodes();let i = index" 
        (click)="clickRootNode(rooNode)"
      >
        <span class="doc-breadcrumb__li__click__title">{{rooNode}}</span>
        <span *ngIf="i != breadcrumbService.getRootNodes().length - 1 || breadCrumbData.length != 0" class="fa fa-angle-right" ></span>
      </span>
    </li>
   
    <ng-container *ngIf="breadCrumbData.length < 5">
      <li class="doc-breadcrumb__li" *ngFor="let breadNode of breadCrumbData; let i = index" >
        <span *ngIf="i < breadCrumbData.length-1" >
            <a (click)="breadNodeClick(breadNode)" class="doc-breadcrumb__li__click"  >
              <span class="doc-breadcrumb__li__click__title">{{breadNode[options.keyTitle]}}</span></a>
                <span class="fa fa-angle-right" ></span>
        </span>
        
        <span *ngIf="i == breadCrumbData.length-1">
              <span >{{breadNode[options.keyTitle]}}</span>
        </span>
      </li>
    </ng-container>
    <ng-container *ngIf="breadCrumbData.length >= 5">
      <li class="doc-breadcrumb__li" *ngFor="let breadNode of breadCrumbData; let i = index" >
        <span *ngIf="i < 1 ">
            <a (click)="breadNodeClick(breadNode)" class="doc-breadcrumb__li__click"  >
              <span class="doc-breadcrumb__li__click__title">{{breadNode[options.keyTitle]}}</span></a>
                <span class="fa fa-angle-right" ></span>
        </span>

        <span *ngIf="i==2">...</span>
        <span *ngIf="breadCrumbData.length - 1 > i && i > breadCrumbData.length - 3">
        
           <a (click)="breadNodeClick(breadNode)" class="doc-breadcrumb__li__click"  >
              <span class="doc-breadcrumb__li__click__title">{{breadNode[options.keyTitle]}}</span></a>
                <span class="fa fa-angle-right" ></span>
          </span>

        <span *ngIf="i == breadCrumbData.length-1">
          <span >{{breadNode[options.keyTitle]}}</span>
        </span>
      </li>     
    </ng-container>
  </ol>
  `,
  styles:[`
  :host{
    display: block;
    float: left;
    width: 100%;
  }
  .doc-breadcrumb-container {
      padding-left: 14px;
      display: inline-block;
      vertical-align: middle;
      margin-top: 6px; }
    
    .doc-breadcrumb-container .doc-breadcrumb {
      margin-bottom: 0;
      color: #999; }
    
    @media (max-width: 1440px) {
      .doc-breadcrumb-container .doc-breadcrumb {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis; } }
    .doc-breadcrumb {
      height: 32px; }
    
    .doc-breadcrumb .doc-breadcrumb__li {
      float: left;
      cursor: pointer;
      line-height: 32px;
      padding-right: 5px; }
      .doc-breadcrumb .doc-breadcrumb__li a {
        color: #337ab7; }
    
    .doc-breadcrumb__li .doc-breadcrumb__li__click--first {
      font-weight: 900;
      cursor: default;
      color: #000000 !important; }
      .doc-breadcrumb__li .doc-breadcrumb__li__click--first a {
        cursor: default;
        color: #000000; }
      .doc-breadcrumb__li .doc-breadcrumb__li__click--first .breadcrumb--right--iocn {
        font-weight: normal; }
    
    .doc-breadcrumb .doc-breadcrumb__li.last {
      cursor: default; }
    
    .doc-breadcrumb .doc-breadcrumb__li.last a {
      color: #000000;
      cursor: default; }
    
    .doc-breadcrumb .doc-breadcrumb__li.last .doc-breadcrumb__li__rgticon {
      visibility: hidden; }
    
    .doc-breadcrumb a {
      color: #000000; }
    
    .doc-breadcrumb__li__click__title {
      display: inline-block;
      max-width: 150px;
      height: 15px;
      line-height: 15px;
      vertical-align: text-bottom;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; }
    
    .fa-angle-right {
      font-size: 14px;
      color: #999; }
    
    .curSelectedNode {
      color: red !important; }
    
    /*# sourceMappingURL=breadCrumb.component.css.map */
    
  `]
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
    public breadcrumbService : BreadcrumbService
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



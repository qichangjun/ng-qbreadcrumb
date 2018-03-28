# ng2-qbreadcrumb
[![npm version](https://badge.fury.io/js/ng2-breadcrumbs.svg)](https://badge.fury.io/js/ng2-breadcrumbs)

ng2-qbreadrumb is a component for [Angular](https://angular.io/) 

# Demo

![](http://7xpyje.com1.z0.glb.clouddn.com/QQ20180328-111402-HD.mp4)


# Install
You can get it on npm.
```shell
npm install ng-qbreadcrumb --save
```

# Setup

You'll need to add `BreadCrumbModule` to your application module.

```typescript
import { BreadcrumbsModule } from 'ng-qbreadcrumb';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BreadCrumbModule,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
```

```typescript
@Component({
  selector: 'sample',
  template:`
  <div>
    <app-breadcrumb [options]="breadCrumbOptions" #breadCrumb [ids]="ids" (rootClickEvent)="rootClickEvent($event)" (breadNodeClickEvent)="clickBreadcrumb($event)"></app-breadcrumb>
  </div>
  `
})
class Sample {}
```

# Usage
```typescript
import { Options as breadcrumbOption }  from 'ng-qbreadcrumb';

@Component({
  selector: 'sample',
  template:`
  <div>
    <app-breadcrumb [options]="breadCrumbOptions" #breadCrumb [ids]="ids" (rootClickEvent)="rootClickEvent($event)" (breadNodeClickEvent)="clickBreadcrumb($event)"></app-breadcrumb>
  </div>
  `
})
class Sample {
   breadCrumbOptions : breadcrumbOption = {
    keyId : 'r_object_id',    //property id for each breadcrumb node
    requestId : 'ids',        //request params id for backend api
    keyTitle : 'object_name', //which property to show of your data
    url:'api/breadcrumbs',    //request url
    additionalParam : {        
      customParams : 'helloWorld' //additional parameter to request,usage for user info
    },
    requestCallBack : res => res.data //do something after get response,should return the breadcrumb data,default is : res => res 
  }  
}
```

## Directive
```html
<app-breadcrumb [options]="breadCrumbOptions" #breadCrumb [ids]="ids" (rootClickEvent)="rootClickEvent($event)" (breadNodeClickEvent)="clickBreadcrumb($event)"></app-breadcrumb>
```

## Input
| Property Name |      Type      |  Description |
| :-------------: |:-------------:| -----|
| ids | Array<any> | the breadcrumb component will watch ids's change and update data or send request |
| options | Options | set your own breadcrumb option |

###Options
```typescript
{  
    keyId : string;             //节点的objectId字段
    url : string;               //http请求的接口地址
    requestId? : string;        //请求的id对应的参数名
    keyTitle? : string;         //面包屑上显示的字段属性名
    method? : 'get' | 'post';       //请求的方法
    additionalParam? : any;  //额外需要添加的请求参数
    requestCallBack?(res : any) : any; //接口返回后的数据处理
}
```

## Output
| Property Name |      Type      |  Description |
| :-------------: |:-------------:| -----|
| rootClickEvent | Function | call this Function when user click root event,usage for when you set root node |
| breadNodeClickEvent | Function | call this Function when user click breadcrumb node |


## `BreadcrumbService`
This service exposes a few different methods with which you can interact with `ng-qbreadcrumb`.

### `BreadcrumbService.hideRoute(name: string)`
hide a node which you do not want to show 

### `BreadcrumbService.isRouteHidden(name: string)`
check the node is hide or not 

### `BreadcrumbService.setRootNode(name: Array<string> | string)`
set root node/nodes for breadcrumb,can be the `string` for single root or `Array`

### `BreadcrumbService.getRootNodes()`
get root of the breadcrumb


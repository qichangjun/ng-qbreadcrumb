# ng2-qbreadcrumb
[![npm version](https://badge.fury.io/js/ng2-breadcrumbs.svg)](https://badge.fury.io/js/ng2-breadcrumbs)

ng2-qbreadrumb is a component for [Angular](https://angular.io/) 

# Demo

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
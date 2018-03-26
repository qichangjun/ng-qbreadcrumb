import {Injectable} from "@angular/core";

@Injectable()
export class BreadcrumbService {
   
    private hideNodes: any = new Array<string>();
    private rootNodes: any = new Array<string>();
    /**
     * 指定一个你不像显示的面包屑
     */
    hideRoute(name: string): void {
        if (this.hideNodes.indexOf(name) === -1) {
            this.hideNodes.push(name);
        }
    }
 
    /**
     * 查看该节点是否显示
     */
    isRouteHidden(name: string): boolean {        
        let hide = this.hideNodes.indexOf(name) > -1;
        return hide;
    }

    /**
     * 设置root节点
     */
    setRootNode(name: Array<string> | string): void {        
        this.rootNodes = typeof name == 'string' ? [name] : name 
    }

    getRootNodes(): Array<string> {
        return this.rootNodes
    }
}
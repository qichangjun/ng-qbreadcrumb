export declare class BreadcrumbService {
    private hideNodes;
    private rootNodes;
    /**
     * 指定一个你不像显示的面包屑
     */
    hideRoute(name: string): void;
    /**
     * 查看该节点是否显示
     */
    isRouteHidden(name: string): boolean;
    /**
     * 设置root节点
     */
    setRootNode(name: Array<string> | string): void;
    getRootNodes(): Array<string>;
}

export declare class Options {
    keyId: string;
    url: string;
    requestId?: string;
    keyTitle?: string;
    method?: 'get' | 'post';
    additionalParam?: any;
    requestCallBack?(res: any): any;
}

export class Options {  
    keyId : string;             //节点的objectId字段
    url : string;               //http请求的接口地址
    requestId? : string;        //请求的id对应的参数名
    keyTitle? : string;         //面包屑上显示的字段属性名
    method? : 'get' | 'post';       //请求的方法
    additionalParam? : Object;  //额外需要添加的请求参数
    requestCallBack?(res : any) : any; //接口返回后的数据处理
}
  
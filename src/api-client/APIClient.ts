import { Application } from "../application";
import { APIClientSdk } from "../sdk/APIClient";
import { notification } from 'antd';


export class APIClient extends APIClientSdk {
    app: Application;
    /** 该值会在 AntdAppProvider 中被重新赋值 */
    notification: any = notification;
    constructor(options?: any) {
        super()
    }
}
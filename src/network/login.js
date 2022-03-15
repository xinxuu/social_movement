import { request } from "./request";

export function getCode(phone) {
    console.log('ccccccccccc');
    return request({
        url:'/api/message',
        params: {
            phone: phone
        }
    })
}
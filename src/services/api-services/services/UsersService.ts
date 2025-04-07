/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiUsers(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Users',
        });
    }

    /**
     * @param emailPrefix 
     * @returns any OK
     * @throws ApiError
     */
    public static getApiUsers1(
emailPrefix: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Users/{emailPrefix}',
            path: {
                'emailPrefix': emailPrefix,
            },
        });
    }

}

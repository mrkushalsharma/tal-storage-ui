/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ForgotPasswordRequest } from '../models/ForgotPasswordRequest';
import type { LoginRequestDto } from '../models/LoginRequestDto';
import type { RegisterUserDto } from '../models/RegisterUserDto';
import type { ResetPasswordRequest } from '../models/ResetPasswordRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccountService {

    /**
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public static postApiAccountRegister(
requestBody?: RegisterUserDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Account/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public static postApiAccountLogin(
requestBody?: LoginRequestDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Account/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public static postApiAccountForgotPassword(
requestBody?: ForgotPasswordRequest,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Account/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public static postApiAccountResetPassword(
requestBody?: ResetPasswordRequest,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Account/reset-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}

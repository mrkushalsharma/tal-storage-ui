/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeneratePresignedUrlViewModel } from '../models/GeneratePresignedUrlViewModel';
import type { ShareFileRequest } from '../models/ShareFileRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FileUploadService {

    /**
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public static postApiFileUpload(
requestBody?: GeneratePresignedUrlViewModel,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/FileUpload',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param fileName 
     * @returns any OK
     * @throws ApiError
     */
    public static getApiFileUploadGeneratePresignedUrl(
fileName?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/FileUpload/generate-presigned-url',
            query: {
                'fileName': fileName,
            },
        });
    }

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiFileUploadGetMyFiles(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/FileUpload/get-my-files',
        });
    }

    /**
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public static postApiFileUploadShare(
requestBody?: ShareFileRequest,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/FileUpload/share',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiFileUploadFilesCount(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/FileUpload/files_count',
        });
    }

}

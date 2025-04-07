/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileAccessAs } from './FileAccessAs';

export type ShareFileRequest = {
    fileId?: string;
    sharedWith?: string | null;
    fileAccessAs?: FileAccessAs;
};

import {RequestHandler} from 'express-serve-static-core';

export type FileUploadHandler = RequestHandler;

export interface MovieObj {
    title: string;
    description?: string;
    release?: string;
}
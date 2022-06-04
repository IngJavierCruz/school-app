// ANGULAR
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// INTERCEPTORS
import { BasicInterceptor } from './basic-interceptor/basic-interceptor';

export const interceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: BasicInterceptor, multi: true }
];
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';
import { PLATFORM_ID, Inject, Injector } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';

import { CookieService } from 'ngx-cookie';


@Injectable({
    providedIn: 'root'
})
export class AuthIntercepterServer implements HttpInterceptor  {

    constructor(public router: Router,
                private authService: AuthService, @Inject(PLATFORM_ID)
                private platformId: string,
                private cookieService: CookieService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!isPlatformBrowser(this.platformId)) {
            const authHeaders = this.authService.getAuthHeaders();
            request = request.clone({
                setHeaders: authHeaders
            });
        }
        return next.handle(request);
    }
}

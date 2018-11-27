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
import {AuthService} from './auth.service';
import {NotFoundComponent} from '../../../projects/static-pages/src/lib/containers/not-found/not-found.component';
import {GatewayTimeoutComponent} from '../../../projects/static-pages/src/lib/containers/gateway-timeout/gateway-timeout.component';
import {of, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthInteceptor implements HttpInterceptor  {

    constructor(public router: Router, private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).do((event: HttpEvent<any>) => {
            // Carry on
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.authService.loginRedirect();
                }
            }
        });
    }
}

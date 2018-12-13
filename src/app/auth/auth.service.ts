import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import * as jwtDecode from 'jwt-decode';
import { ConfigService } from '../config.service';
import { RedirectionService } from '../routing/redirection.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    COOKIE_KEYS;
    user

    constructor(private configService: ConfigService,
        private cookieService: CookieService,
        private redirectionService: RedirectionService) {
        this.COOKIE_KEYS = {
            TOKEN: this.configService.config.cookies.token,
            USER: this.configService.config.cookies.userId,
            ROLE: this.configService.config.cookies.roles,
        };
    }

    generateLoginUrl() {
        const base = this.configService.config.services.idam_web;
        const clientId = this.configService.config.idam_client;
        const callback = `${this.configService.config.api_base_url}/${this.configService.config.oauth_callback_url}`;
        return `${base}/login?response_type=code&client_id=${clientId}&redirect_uri=${callback}`;
    }

    getAuthHeaders() {
        interface HeaderObject {
            [key: string]: string;
        }
        const headers: HeaderObject = {
            Authorization: this.cookieService.get(this.COOKIE_KEYS.TOKEN),
            [this.COOKIE_KEYS.USER]: this.cookieService.get(this.COOKIE_KEYS.USER),
        };
        return headers;
    }

    loginRedirect() {
        this.redirectionService.redirect(this.generateLoginUrl());
    }

    decodeJwt(jwt) {
        return jwtDecode(jwt);
    }

    isAuthenticated(): boolean {
        const jwt = this.cookieService.get(this.COOKIE_KEYS.TOKEN);
        if (!jwt) { return false; }
        const jwtData = this.decodeJwt(jwt);
        const expired = jwtData.exp > new Date().getTime();
        // do stuff!!
        return !expired;
    }


    public getUserRoles(): string[] {

        // if (this.user) {
        //     return this.user
        // } else {
        // this.user = this.httpCilent.get('/api/user').map(response => {
        //     return response
        // })
        //mock it while idam is down
        // this.user = of({ roles: ['caseworker-probatex', 'xadmin'] })


        //return this.user

        let roles = this.cookieService.get(this.COOKIE_KEYS.ROLE).split(',');
        console.log('@@COOKIE:', roles)
        return roles
        //}
    }


    isRoleAuthorised(guardRoles: string[]) {
        // return this.getUser().toPromise().then(user => {
        //     let roleExists = user.roles.some(r => guardRoles.includes(r))
        //     return roleExists;
        // })


        // return this.getUserRoles().toPromise().then(user => {
        let roleExists = this.getUserRoles().some(r => guardRoles.includes(r))
        return roleExists;
        //})
        // return true;
    }

}

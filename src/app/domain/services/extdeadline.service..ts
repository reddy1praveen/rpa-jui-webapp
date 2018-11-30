import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import 'rxjs-compat/add/observable/of';
import { ConfigService } from '../../config.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ExtdeadlineService {
    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    generateDecisionUrl(jurId: string, caseId: string, pageId: string, caseType: string) {
        console.log(`${this.configService.config.api_base_url}/api/decisions/state/${jurId}/${caseType}/${caseId}/${pageId}`);
        return `${this.configService.config.api_base_url}/api/decisions/state/${jurId}/${caseType}/${caseId}/${pageId}`;
    }

    fetch(jurId: string, caseId: string, pageId: string, caseType: string): Observable<any> {

        const url = this.generateDecisionUrl(jurId, caseId, pageId, caseType);
        console.log('url = ', url);
        return this.httpClient.get(url);
    }

    submitDecisionDraft(jurId: string, caseId: string, pageId: string, caseType: string, body: any): Observable<any> {
        const url = this.generateDecisionUrl(jurId, caseId, pageId, caseType);
        console.log('Submit', url, jurId, caseId, pageId, caseType, body);
        return this.httpClient.post(url, body);
    }







}

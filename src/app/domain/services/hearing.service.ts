import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config.service';

@Injectable({
    providedIn: 'root'
})
export class HearingService {
    private messageSource = new BehaviorSubject('');
    currentMessage = this.messageSource.asObservable();

    constructor(private httpClient: HttpClient, private configService: ConfigService) { }

    generateHearingsUrl(caseId: string) {
        return `${this.configService.config.api_base_url}/api/decisions/${caseId}/hearing/relist`;
    }

    changeMessage(message: string) {
        this.messageSource.next(message);
    }

    listForHearing(caseId: string, relistReason: string): Observable<any> {
        const url = this.generateHearingsUrl(caseId);

        const body = {
            //TODO: For now let's send in issued from here, these should be in constants here.
            state: 'issued',
            reason: relistReason,
        };

        return this.httpClient.put(url, body);
    }
}

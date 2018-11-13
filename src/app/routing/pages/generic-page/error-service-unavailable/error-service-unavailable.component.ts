import { ErrorHandler, Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {RedirectionService} from '../../../redirection.service';
import {ActivatedRoute} from '@angular/router';

@Injectable()

@Component({
  selector: 'app-error-service-unavailable',
  templateUrl: './error-service-unavailable.component.html',
  styleUrls: ['./error-service-unavailable.component.scss']
})

export class ErrorServiceUnavailableComponent implements OnInit, ErrorHandler {
    status; // Default case in case 404
    constructor(private redirectionService: RedirectionService,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe(data => {
                console.log(data.status);
                this.status = data.status;
            }
        );
    }

    handleError(error) {
        console.warn('Handler caught an error', error);
       // alert(error.status);
        if (error.status === 400) {
            this.status = 400;
            this.redirectionService.redirect(`404`);
        }
        if (error.status === 504) {
            this.status = 504;
            this.redirectionService.redirect(`504`);
        }
        // Rethrow error in case we want to handle it somewhere else
        //throw error;
    }

}

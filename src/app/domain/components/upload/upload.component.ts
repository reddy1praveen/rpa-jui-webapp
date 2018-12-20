import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DocumentStoreService} from '../../../shared/services/documentStore/document-store.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    redirect = '/';
    uploadForm: FormGroup;
    inputFile: File = null;
    caseId: string;

    userNotSelectedFileError: boolean;

    /**
     * Generic human readable upload error message.
     */
    systemFailedToUploadError: boolean;

    constructor(private documentService: DocumentStoreService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.parent.params.subscribe(parentParams => {
            this.caseId = parentParams['case_id'];
        });
    }

    /**
     * inputFileHandler
     *
     * @param file
     */
    inputFileHandler(file: File) {

        this.inputFile = file;

        this.userNotSelectedFileError = false;
        this.systemFailedToUploadError = false;
    }

    /**
     * uploadDocument
     *
     * @param file
     */
    uploadDocument(file: File) {

        if (file) {
            this.postFile(file);
        } else {
            this.userNotSelectedFileError = true;
        }
    }

    /**
     * postFile
     *
     * We currently POST the file to the DM Store.
     *
     * @param file
     */
    postFile(file: File) {

        const metadataObj: Map<string, string> = new Map<string, string>();

        this.documentService.postFileAndAssociateWithCase('PRIVATE', metadataObj, file, this.caseId)
            .subscribe((response) => {
                    console.log(response);
                    //TODO: Where should we redirect to on success?
                },
                (error) => {
                    console.log(error);
                    this.systemFailedToUploadError = true;
                }
            );
    }

    // testFunction() {
    //     return false;
    // }

    // gotoRedirect() {
    //     console.log('Uploaded?');
    //     // this.redirectionService.redirect(this.redirect);
    // }

    // cancelUpload() {
    //     this.gotoRedirect();
    // }
}

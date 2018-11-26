import {TestBed, inject} from '@angular/core/testing';

import {HtmlService} from './html.service';

fdescribe('HtmlService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HtmlService]
        });
    });

    it('should be created', inject([HtmlService], (service: HtmlService) => {
        expect(service).toBeTruthy();
    }));

    it('should be able to find the index of the separator.',
        inject([HtmlService], (service: HtmlService) => {

            const findIndexOfSeparator = (plainTextTitle) => {

                const SEPARATOR = ' v ';
                return plainTextTitle.indexOf(SEPARATOR);
            };

            const plainTextTitle = 'firstName lastName v firstName lastName';

            expect(service.findIndexOfSeparator(plainTextTitle)).toEqual(findIndexOfSeparator(plainTextTitle));
        }));

    it('should wrap text in <b></b> tags.',
        inject([HtmlService], (service: HtmlService) => {

            const wrapTextInBoldTag = (text) => {

                return `<b>${text}</b>`;
            };

            const text = 'textToWrap';

            expect(service.wrapTextInBoldTag(text)).toEqual(wrapTextInBoldTag(text));
        }));

    it('should take in the title as plain text, and bold the first persons and second person name.',
        inject([HtmlService], (service: HtmlService) => {

            const plainTextTitle = 'firstName1 lastName1 v firstName2 lastName2';
            const expectedTitle = '<b>firstName1 lastName1</b> v <b>firstName2 lastName2</b>';

            expect(service.getHtmlCaseTitle(plainTextTitle)).toEqual(expectedTitle);
        }));
});

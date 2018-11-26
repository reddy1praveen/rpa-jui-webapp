import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class HtmlService {

    SEPARATOR = ' v ';

    /**
     * getHtmlCaseTitle
     *
     * Returns a html representation of the plain case title, where the parties names are bold, and the
     * v is not.
     *
     * @param plainCaseTitle - bear kurran v hen kurran
     *
     * @return {boolean} - <b>Test Smith</b> v <b>Agent Smith</b>
     */
    getHtmlCaseTitle(plainTextTitle) {

        const firstParty = plainTextTitle.slice(0, this.findIndexOfSeparator(plainTextTitle));
        const secondParty = plainTextTitle.slice(this.findIndexOfSeparator(plainTextTitle) + this.SEPARATOR.length,
                                plainTextTitle.length);
        const firstPartyInBold = this.wrapTextInBoldTag(firstParty);
        const secondPartyInBold = this.wrapTextInBoldTag(secondParty);

        return firstPartyInBold + this.SEPARATOR + secondPartyInBold;
    }

    findIndexOfSeparator = (plainTextTitle) => {

        return plainTextTitle.indexOf(this.SEPARATOR);
    }

    wrapTextInBoldTag = (text) => {

        return `<b>${text}</b>`;
    }
}

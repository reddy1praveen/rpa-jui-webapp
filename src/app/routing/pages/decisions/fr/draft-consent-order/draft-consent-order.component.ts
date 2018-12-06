import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DecisionService} from '../../../../../domain/services/decision.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsService} from '../../../../../shared/services/forms.service';
import {ConfigService} from '../../../../../config.service';

@Component({
  selector: 'app-draft-consent-order',
  templateUrl: './draft-consent-order.component.html',
  styleUrls: ['./draft-consent-order.component.scss']
})
export class DraftConsentOrderComponent implements OnInit {
    draftConsentOrderForm: FormGroup;
    options: any;
    decision: any;
    request: any;
    pageValues: any = null;
    case: any;
    consentDocumentUrl: string;
    allowAnnotations = true;
    typeId: string;

    @Input() pageitems;
    constructor( private activatedRoute: ActivatedRoute,
                 private router: Router,
                 private decisionService: DecisionService,
                 private formsService: FormsService) {}
    createForm(pageitems, pageValues) {
        this.draftConsentOrderForm = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));
    }
    ngOnInit() {
        this.activatedRoute.parent.data.subscribe(data => {
            this.case = data.caseData;
            this.consentDocumentUrl = this.decisionService.findConsentOrderDocumentUrl(this.case);
        });
        const caseId = this.case.id;
        const pageId = 'draft-consent-order';
        const jurId = this.case.case_jurisdiction;
        this.typeId = this.case.case_type_id;

        this.decisionService.fetch(jurId, caseId, pageId, this.typeId).subscribe(decision => {
            this.decision = decision;
            this.pageitems = this.decision.meta;
            this.pageValues = this.decision.formValues;

            console.log('pageitems', this.pageitems);
            console.log('pageValues', this.pageValues);

            this.createForm(this.pageitems, this.pageValues) ;
        });
    }
    onSubmit() {
        const event = this.draftConsentOrderForm.value.createButton.toLowerCase();
        delete this.draftConsentOrderForm.value.createButton;
        this.request = { formValues: this.draftConsentOrderForm.value, event: event };
        this.pageValues.visitedPages['draft-consent-order'] = true;
        this.request.formValues.visitedPages = this.pageValues.visitedPages;
        console.log(this.pageitems.name, this.request);
        this.decisionService.submitDecisionDraft('fr', this.activatedRoute.snapshot.parent.data.caseData.id, this.pageitems.name, this.typeId, this.request).subscribe(decision => {
            console.log(decision.newRoute);
            this.router.navigate([`../${decision.newRoute}`], {relativeTo: this.activatedRoute});
        });
    }

}

import { Component, Attribute, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DecisionService } from '../../../../../domain/services/decision.service';
import { FormsService } from '../../../../../shared/services/forms.service';
import { ValidationService } from '../../../../../shared/services/validation.service';

@Component({
  selector: 'app-reasons-co-not-approved',
  templateUrl: './reasons-co-not-approved.component.html',
  styleUrls: ['./reasons-co-not-approved.component.scss']
})

export class ReasonsCoNotApprovedComponent implements OnInit {

    rejectReasonsForm: FormGroup;
    Object = Object;
    options: any;
    decision: any;
    request: any;
    pageValues: any = null;
    case: any;
    pageitems;

    /**
     * showValidation
     *
     * As per the prototype, initially we do not show validation, only when the user clicks on 'Continue' should we
     * show the validation issues, for each control.
     *
     * @type {boolean}
     */
    useValidation = false;

    constructor( @Attribute('data-children-of') private type: string,
                 private activatedRoute: ActivatedRoute,
                 private router: Router,
                 private decisionService: DecisionService,
                 private formsService: FormsService,
                 private validationService: ValidationService) {}

    createForm(pageitems, pageValues) {

        //So we need to go through all the validators, and then we need to get formGroupValidators back

        /**
         * Creates Form Group with Controls.
         */
        this.rejectReasonsForm = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));

        // const checkboxes: Array<string> = ['partiesNeedAttend', 'NotEnoughInformation', 'orderNotAppearOfS25ca1973', 'd81',
        //     'pensionAnnex', 'applicantTakenAdvice', 'respondentTakenAdvice', 'Other2'];

        console.log('pageitems');
        console.log(pageitems);

        // const checkboxes: Array<string> = pageitems.formGroupLevelValidators.checkboxes;

        // const validationIdentifier = 'reasonsConstentOrderNotApproved';

        /**
         * Form Group Validators are used for validation that involves more than one control. ie. When a control
         * depends on another, or we need to validate a group of controls together.
         *
         * The validation is required on the common ancestor as per
         * @see https://angular.io/guide/form-validation#adding-to-reactive-forms-1
         * to validate multiply controls.
         *
         * All for group validators should have the type of ValidationFn.
         *
         * A dev would add validators here, each validator, would have a name assigned to it.
         */
        // const formGroupValidators = [this.validationService.isAnyCheckboxChecked(this.rejectReasonsForm, checkboxes, validationIdentifier)];

        const formGroupValidators = this.validationService.createFormGroupValidators(this.rejectReasonsForm, pageitems.formGroupValidators);

        this.rejectReasonsForm.setValidators(formGroupValidators);
    }
    ngOnInit() {
        this.rejectReasonsForm = null;
        this.activatedRoute.parent.data.subscribe(data => {
            this.case = data.caseData;
        });
        const caseId = this.case.id;
        const pageId = 'reject-reasons';
        const jurId = 'fr';
        this.decisionService.fetch(jurId, caseId, pageId).subscribe(decision => {
            this.decision = decision;
            this.pageitems = this.decision.meta;
            this.pageValues = this.decision.formValues;

            // console.log("pageitems", this.pageitems);
            // console.log("pageValues", this.pageValues);

            this.createForm(this.pageitems, this.pageValues) ;
        });
    }
    onSubmit() {
        const event = this.rejectReasonsForm.value.createButton.toLowerCase();
        delete this.rejectReasonsForm.value.createButton;

        this.request = { formValues: this.rejectReasonsForm.value, event: event };
        console.log(this.pageitems.name, this.request);
        this.pageValues.visitedPages['reject-reasons'] = true;
        this.request.formValues.visitedPages = this.pageValues.visitedPages;

        console.log('Form is valid:', this.rejectReasonsForm.valid);

        if (this.rejectReasonsForm.invalid) {
            this.useValidation = true;
            return;
        } else {
            this.decisionService.submitDecisionDraft('fr', this.activatedRoute.snapshot.parent.data.caseData.id, this.pageitems.name, this.request).subscribe(decision => {
                console.log(decision.newRoute);
                this.router.navigate([`../${decision.newRoute}`], {relativeTo: this.activatedRoute});
            });
        }
    }
}



import { Component, Attribute, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DecisionService } from '../../../../domain/services/decision.service';
import { FormsService } from '../../../../shared/services/forms.service';
import { ValidationService } from '../../../../shared/services/validation.service';


@Component({
  selector: 'app-extreq',
  templateUrl: './extensionrequest.component.html',
  styleUrls: ['./extensionrequest.component.scss']
})
export class ExtensionrequestComponent implements OnInit {

  //rejectReasonsForm: FormGroup;
  extensionRequestForm: FormGroup;

  Object = Object;
  options: any;
  decision: any;
  request: any;
  pageValues: any = null;
  case: any;
  dynamic: string;


  pageitems = {
    ExtensionDeadline: {
      create: {
        idPrefix: 'create',
        name: 'create',
        header: 'Do you want to approve the draft consent order?',
        groups: [
          {
            fieldset: [
              {
                radios: {
                  control: 'approveDraftConsent',
                  radioGroup: [
                    {
                      value: 'yes',
                      text: 'Yes',
                      hiddenAccessibilityText: 'some hidden text',
                      groups: [
                        {
                          legend: {
                            text: 'Choose a color',
                            isPageHeading: true,
                            classes: 'govuk-fieldset__legend--m'
                          }
                        },
                        {
                          radios: {
                            control: 'favoriteColor',
                            radioGroup: [
                              {
                                value: 'black',
                                text: 'Black',
                                hiddenAccessibilityText: 'some hidden text',
                                groups: [
                                  {
                                    legend: {
                                      text: 'Please confirm your choice',
                                      isPageHeading: true,
                                      classes: 'govuk-fieldset__legend--m'
                                    }
                                  },
                                  {
                                    radios: {
                                      control: 'pleaseConfirm',
                                      radioGroup: [
                                        {
                                          value: 'yes',
                                          text: 'Yes',
                                          hiddenAccessibilityText: 'some hidden text'
                                        },
                                        {
                                          value: 'no',
                                          text: 'No',
                                          hiddenAccessibilityText: 'some hidden text'
                                        }
                                      ]
                                    }
                                  }
                                ]
                              },
                              {
                                value: 'white',
                                text: 'White',
                                hiddenAccessibilityText: 'some hidden text',
                                groups: [
                                  {
                                    legend: {
                                      text: 'This is Legend element',
                                      isPageHeading: true,
                                      classes: 'govuk-fieldset__legend--m'
                                    }
                                  },
                                  {
                                    input: {
                                      label: {
                                        text: 'Estimate length of hearing in minutes',
                                        classes: 'govuk-label--m'
                                      },
                                      control: 'estimateLengthOfHearing',
                                      classes: 'govuk-input--width-3'
                                    }
                                  }
                                ]
                              },
                              {
                                value: 'red',
                                text: 'Red',
                                hiddenAccessibilityText: 'some hidden text'
                              }
                            ]
                          }
                        }
                      ]
                    },
                    {
                      value: 'no',
                      text: 'No',
                      hiddenAccessibilityText: 'some hidden text'
                    }
                  ]
                }
              }
            ]
          },
          {
            button: {
              control: 'createButton',
              value: 'Continue',
              type: 'submit',
              classes: '',
              onEvent: 'continue'
            }
          }
        ]
      }
    }
  };




  useValidation = false;

  constructor(@Attribute('data-children-of') private type: string,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private decisionService: DecisionService,
    private formsService: FormsService,
    private validationService: ValidationService) { }

  createForm(pageitems, pageValues) {

    /**
     * Creates Form Group with Controls.
     */
    this.extensionRequestForm = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));

    const checkboxes: Array<string> = ['Other2'];

    const validationIdentifier = 'reasonsConstentOrderNotApproved';

    /**
     * Form Group Validators, are used for validation that involves one control, being dependent upon another,
     * or on a group of other controls.
     *
     * Validation is required on the common ancestor as per
     * @see https://angular.io/guide/form-validation#adding-to-reactive-forms-1
     * to validate multiply controls.
     *
     * TODO: So over here, you can place in multiply validators for the page.
     * So over here you need to pass in the checkboxes. how would you do this?
     *
     * Therefore isAnyCheckboxChecked needs to return an object that is of signature of ValidationFn.
     *
     * So a dev would add validators here, each validator, would have a name
     * So you should be able to pass in.
     *
     */
    const formGroupValidators = [this.validationService.isAnyCheckboxChecked(this.extensionRequestForm, checkboxes, validationIdentifier)];

    /**
     * Sets up Forms top most validators, ie. validators that depend on multiply controls. ie.
     * to check if one of multiply checkboxes are checked.
     *
     * Note : set Validations takes objects with a signature of ValidationFn
     */
    this.extensionRequestForm.setValidators(formGroupValidators);
  }
  ngOnInit() {
    this.extensionRequestForm = null;
    this.activatedRoute.parent.data.subscribe(data => {
      this.case = data.caseData;
    });
    const caseId = this.case.id;
    const pageId = 'extension-request';
    const jurId = 'fr';
    this.decisionService.fetch(jurId, caseId, pageId).subscribe(decision => {
      this.decision = decision;
      this.pageitems = this.decision.meta;
      this.pageValues = this.decision.formValues;

      // console.log("pageitems", this.pageitems);
      // console.log("pageValues", this.pageValues);

      this.createForm(this.pageitems, this.pageValues);
    });
  }
  onSubmit() {
    const event = this.extensionRequestForm.value.createButton.toLowerCase();
    delete this.extensionRequestForm.value.createButton;

    this.request = { formValues: this.extensionRequestForm.value, event: event };
    // **
    console.log(this.pageitems.ExtensionDeadline.create.name, this.request);
    this.pageValues.visitedPages['extension-request'] = true;
    this.request.formValues.visitedPages = this.pageValues.visitedPages;

    console.log('Form is valid:', this.extensionRequestForm.valid);

    if (this.extensionRequestForm.invalid) {
      this.useValidation = true;
      return;
    } else {
      this.decisionService.submitDecisionDraft('fr', this.activatedRoute.snapshot.parent.data.caseData.id, this.pageitems.ExtensionDeadline.create.name, this.request, 'x').subscribe(decision => {
        console.log(decision.newRoute);
        this.router.navigate([`../${decision.newRoute}`], { relativeTo: this.activatedRoute });
      });
    }
  }
}

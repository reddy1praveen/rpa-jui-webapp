import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DecisionService } from './../../../domain/services/decision.service';
import { FormsService } from './../../../shared/services/forms.service';


@Component({
  selector: 'app-extensionrequest',
  templateUrl: './extensionrequest.component.html',
  styleUrls: ['./extensionrequest.component.scss']
})
export class ExtensionrequestComponent implements OnInit {

  formDraft: FormGroup;

  Object = Object;
  options: any;
  decision: any;
  request: any;
  pageValues: any = {}//null;
  case: any;
  dynamic: string;

  // ExtensionDeadline: {




  pageitems = {
    idPrefix: 'extension-request',
    name: 'extension-request',
    header: 'Extend the deadline?',
    groups: [
      {
        fieldset: [
          {
            legend: {
              text: 'Appellants reason',
              isPageHeading: true,
              classes: 'govuk-fieldset__legend--m'
            }
          },
          {
            hint: {
              text: 'I am unable to meet the deadline as I am still waiting for the report from my GP',
              classes: 'govuk-hint'
            }
          },
          {
            legend: {
              text: 'Deadline data theyve asked for',
              isPageHeading: true,
              classes: 'govuk-fieldset__legend--m'
            }
          },
          {
            hint: {
              text: ' #### date here ###',
              classes: 'govuk-hint'
            }
          },
          {
            legend: {
              text: 'What do you want to do?',
              isPageHeading: true,
              classes: 'govuk-fieldset__legend--m'
            }
          },
          {
            validationError: {
              value: 'Select reasons the consent order was not approved',
              identifier: 'reasonsConstentOrderNotApproved'
            }
          },
          {
            radios: {
              control: 'approveDraftConsent',
              radioGroup: [
                {
                  value: 'extenddefaultdate',
                  text: 'Extend the deadline to xxx',
                  hiddenAccessibilityText: 'some hidden text'
                },
                {
                  value: 'extenddate',
                  text: 'Extend to a different data',
                  hiddenAccessibilityText: 'some hidden text',
                  groups: [
                    {
                      legend: {
                        text: 'End date',
                        isPageHeading: true,
                        classes: 'govuk-fieldset__legend--m'
                      }
                    },
                    {
                      hint: {
                        text: 'For example, 12 4 2019',
                        classes: 'govuk-hint'
                      }
                    },
                    {
                      date: {
                        formName: 'endDate',
                        day: {
                          input: {
                            label: {
                              text: 'Day',
                              classes: 'govuk-date-input__label'
                            },
                            control: 'awardEndDateDay',
                            classes: 'govuk-date-input__input govuk-input--width-2'
                          }
                        },
                        month: {
                          input: {
                            label: {
                              text: 'Month',
                              classes: 'govuk-date-input__label'
                            },
                            control: 'awardEndDateMonth',
                            classes: 'govuk-date-input__input govuk-input--width-2'
                          }
                        },
                        year: {
                          input: {
                            label: {
                              text: 'Year',
                              classes: 'govuk-date-input__label'
                            },
                            control: 'awardEndDateYear',
                            classes: 'govuk-date-input__input govuk-input--width-4'
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  value: 'dont_extend',
                  text: 'Dont extend the deadline',
                  hiddenAccessibilityText: 'some hidden text',
                  groups: [
                    {
                      textarea: {
                        label: {
                          text: 'Reason for not extending the deadline',
                          classes: 'govuk-label--m'
                        },
                        control: 'Reason',
                        value: ''
                      }
                    }
                  ]
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





  useValidation = false;

  constructor(

    private activatedRoute: ActivatedRoute,
    private router: Router,
    private decisionService: DecisionService,
    private formsService: FormsService

  ) { }




  createForm(pageitems, pageValues) {
    this.formDraft = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));
  }


  ngOnInit() {
    this.formDraft = null;
    this.activatedRoute.parent.data.subscribe(data => {
      this.case = data.caseData;
    });

    const caseId = this.case.id;
    const pageId = 'extension-request';
    const jurId = 'fr';

    // this.decisionService.fetch(jurId, caseId, pageId, null).subscribe(decision => {
    //   this.decision = decision;
    //   this.pageitems = this.decision.meta;
    //   this.pageValues = this.decision.formValues;




    console.log("pageitems", this.pageitems);
    console.log("pageValues", this.pageValues);

    //   this.createForm(this.pageitems, this.pageValues);
    // });


    this.createForm(this.pageitems, this.pageValues);
  }
  onSubmit() {
    const event = this.formDraft.value.createButton.toLowerCase();
    delete this.formDraft.value.createButton;

    this.request = { formValues: this.formDraft.value, event: event };
    // **
    //console.log(this.pageitems.ExtensionDeadline.create.name, this.request);
    this.pageValues.visitedPages['extension-request'] = true;
    this.request.formValues.visitedPages = this.pageValues.visitedPages;

    console.log('Form is valid:', this.formDraft.valid);

    if (this.formDraft.invalid) {
      this.useValidation = true;
      return;
    } else {

      // this.decisionService.submitDecisionDraft('fr', this.activatedRoute.snapshot.parent.data.caseData.id, this.pageitems.ExtensionDeadline.create.name, this.request, 'x').subscribe(decision => {
      //   console.log(decision.newRoute);
      //   this.router.navigate([`../${decision.newRoute}`], { relativeTo: this.activatedRoute });
      // });

    }
  }


}

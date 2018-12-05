//
// The data below is a stub of ui Controls data
// Data structure
// Judistdiction =>> page_id ==> pagedata
// api URL http://localhost:3000/api/decisions/state/fr/1536577824150765/create
//

module.exports = {
    financialremedymvp2: {
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
                                classes: 'govuk-radios--inline',
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
                    button: {
                        control: 'createButton',
                        value: 'Continue',
                        type: 'submit',
                        classes: '',
                        onEvent: 'continue'
                    }
                }
            ]
        },
        'reject-reasons': {
            idPrefix: 'reject-reasons',
            name: 'reject-reasons',
            formGroupValidators: [
                {
                    validatorFunc: 'isAnyCheckboxChecked',
                    validationErrorId: 'reasonsConstentOrderNotApproved',
                    checkboxes: [
                        'partiesNeedAttend', 'NotEnoughInformation', 'orderNotAppearOfS25ca1973', 'd81',
                        'pensionAnnex', 'applicantTakenAdvice', 'respondentTakenAdvice', 'Other2'
                    ]
                }
            ],
            validationHeaderErrorMessages: [
                {
                    validationLevel: 'formControl',
                    controlId: 'informationNeeded',
                    text: 'Enter what information is needed',
                    href: '#'
                },
                {
                    validationLevel: 'formControl',
                    controlId: 'includeAnnotatedVersionDraftConsOrder',
                    text: 'Select yes if you want to include an annotated version of the draft consent order',
                    href: '#'
                },
                {
                    validationLevel: 'formControl',
                    controlId: 'Directions',
                    text: 'Enter the directions',
                    href: '#'
                },
                {
                    validationLevel: 'formGroup',
                    formGroupValidationErrorId: 'reasonsConstentOrderNotApproved',
                    text: 'Select reasons the consent order was not approved',
                    href: '#'
                }
            ],
            header: 'What should appear in the directions order?',
            groups: [
                {
                    fieldset: [
                        {
                            legend: {
                                text: 'Reasons the consent order was not approved',
                                isPageHeading: true,
                                classes: 'govuk-fieldset__legend--m'
                            }
                        },
                        {
                            hint: {
                                text: 'Select all that applys.',
                                classes: 'govuk-hint'
                            }
                        },
                        {
                            validationError: {
                                value: 'Select reasons the consent order was not approved',
                                identifier: 'reasonsConstentOrderNotApproved'
                            }
                        },
                        {
                            checkbox: {
                                control: 'partiesNeedAttend',
                                value: false,
                                text: 'The parties need to attend a hearing',
                                validators: [
                                    {
                                        validator: 'required'
                                    },
                                    {
                                        validator: 'custom',
                                        customValidator: 'oneOfGroupIsSelected'
                                    }
                                ]
                            }
                        },
                        {
                            checkbox: {
                                control: 'NotEnoughInformation',
                                value: false,
                                text: 'Not enough information was supplied to decide if the order is fair',
                                groups: [
                                    {
                                        fieldset: [
                                            {
                                                legend: {
                                                    text: 'Information required',
                                                    isPageHeading: false,
                                                    classes: 'govuk-fieldset__legend--m'
                                                }
                                            },
                                            {
                                                checkbox: {
                                                    control: 'capitalPositions',
                                                    value: false,
                                                    text: 'The parties’ capital positions if the order were to take effect'
                                                }
                                            },
                                            {
                                                checkbox: {
                                                    control: 'partiesHousingNeeds',
                                                    value: false,
                                                    text: 'The parties’ housing needs and whether they are met by the order'
                                                }
                                            },
                                            {
                                                checkbox: {
                                                    control: 'justificationDeparture',
                                                    value: false,
                                                    text: 'The justification for departure from equality of capital'
                                                }
                                            },
                                            {
                                                checkbox: {
                                                    control: 'partiesPensionProvision',
                                                    value: false,
                                                    text: 'The parties’ pension provision if the order were to take effect'
                                                }
                                            },
                                            {
                                                checkbox: {
                                                    control: 'childrensHousingNeeds',
                                                    value: false,
                                                    text: 'The children’s housing needs and whether they are met by the order'
                                                }
                                            },
                                            {
                                                checkbox: {
                                                    control: 'netEffectOrder',
                                                    value: false,
                                                    text: 'The net effect of the order'
                                                }
                                            },
                                            {
                                                checkbox: {
                                                    control: 'Other',
                                                    value: false,
                                                    text: 'Other',
                                                    groups: [
                                                        {
                                                            textarea: {
                                                                label: {
                                                                    text: 'What information is needed?',
                                                                    classes: 'govuk-label--m'
                                                                },
                                                                validationError: {
                                                                    value: 'Enter what information is needed'
                                                                },
                                                                control: 'informationNeeded',
                                                                value: ''
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            checkbox: {
                                control: 'orderNotAppearOfS25ca1973',
                                value: false,
                                text: 'The order doesn’t appear fair taking account of S25 Matrimonial Causes Act 1973'
                            }
                        },
                        {
                            checkbox: {
                                control: 'd81',
                                value: false,
                                text: 'The D81 form is incomplete'
                            }
                        },
                        {
                            checkbox: {
                                control: 'pensionAnnex',
                                value: false,
                                text: 'The pension annex was not attached'
                            }
                        },
                        {
                            checkbox: {
                                control: 'applicantTakenAdvice',
                                value: false,
                                text: 'It’s not clear if the applicant has taken independent legal advice'
                            }
                        },
                        {
                            checkbox: {
                                control: 'respondentTakenAdvice',
                                value: false,
                                text: 'It’s not clear if the respondent has taken independent legal advice'
                            }
                        },
                        {
                            checkbox: {
                                control: 'Other2',
                                value: false,
                                text: 'Other',
                                groups: [
                                    {
                                        textarea: {
                                            label: {
                                                text: 'Reason',
                                                classes: 'govuk-label--m'
                                            },
                                            control: 'Reason',
                                            value: ''
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    textarea: {
                        label: {
                            text: 'Directions',
                            classes: 'govuk-label--m'
                        },
                        validationError: {
                            value: 'Enter the directions that are required',
                            controlId: 'Directions'
                        },
                        control: 'Directions',
                        value: '',
                        validators: ['required']
                    }
                },
                {
                    fieldset: [
                        {
                            legend: {
                                text: 'Do you want to include an annotated version of the draft consent order?',
                                isPageHeading: true,
                                classes: 'govuk-fieldset__legend--m'
                            }
                        },
                        {
                            hint: {
                                text: 'You can use this to illustrate any detailed points or feedback for the parties.',
                                classes: 'govuk-hint'
                            }
                        },
                        {
                            radios: {
                                control: 'includeAnnotatedVersionDraftConsOrder',
                                classes: 'govuk-radios--inline',
                                validationError: {
                                    value: 'Select yes if you want to include an annotated version of the draft consent order',
                                    controlId: 'includeAnnotatedVersionDraftConsOrder'
                                },
                                radioGroup: [
                                    {
                                        value: 'yes',
                                        text: 'Yes',
                                        hiddenAccessibilityText: ', send an annotated version of the draft consent order to the parties'
                                    },
                                    {
                                        value: 'no',
                                        text: 'No',
                                        hiddenAccessibilityText: ', I don’t want to send an annotated version of the draft consent order to the parties'
                                    }
                                ],
                                validators: ['required']
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
        },
        'notes-for-court-administrator': {
            idPrefix: 'notes-for-court-administrator',
            name: 'notes-for-court-administrator',
            header: 'Notes for court administrator (optional)',
            hint: 'This won’t be seen by the parties.',
            groups: [
                {
                    textarea: {
                        label: 'Notes for court administrator',
                        control: 'notesForAdmin',
                        value: ''
                    }
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
        },
        check: {
            idPrefix: 'check',
            header: 'Check your decision',
            name: 'check',
            groups: [
                {
                    header: 'Draft consent order',
                    page: 'create',
                    contents: [
                        {
                            title: 'Decision',
                            details: [
                                {
                                    control: 'approveDraftConsent',
                                    type: 'radio',
                                    no: 'Consent order not approved',
                                    yes: 'Consent order approved'
                                }
                            ],
                            link: {
                                text: 'Change',
                                event: 'create',
                                hiddenAccessibilityText: 'reasons'
                            }
                        }
                    ]
                },
                {
                    header: 'Notes for court administrator',
                    page: 'notes-for-court-administrator',
                    contents: [
                        {
                            title: 'Notes',
                            details: [
                                {
                                    control: 'notesForAdmin',
                                    type: 'textarea'
                                }
                            ],
                            link: {
                                text: 'Change',
                                event: 'notes-for-court-administrator',
                                hiddenAccessibilityText: 'notes'
                            }
                        }
                    ]
                },
                {
                    header: 'Directions order',
                    page: 'reject-reasons',
                    contents: [
                        {
                            title: 'Reasons',
                            details: [
                                {
                                    control: 'partiesNeedAttend',
                                    type: 'checkbox',
                                    true: 'The parties need to attend a hearing'
                                },
                                {
                                    type: 'checkbox',
                                    control: 'NotEnoughInformation',
                                    true: 'Not enough information was supplied to decide if the order is fair:'
                                },
                                {
                                    ul: {
                                        classes: 'govuk-list--bullet',
                                        li: [
                                            {
                                                type: 'checkbox',
                                                control: 'capitalPositions',
                                                true: 'The parties’ capital positions if the order were to take effect'
                                            },
                                            {
                                                type: 'checkbox',
                                                control: 'partiesHousingNeeds',
                                                true: 'The parties’ housing needs and whether they are met by the order'
                                            },
                                            {
                                                type: 'checkbox',
                                                control: 'justificationDeparture',
                                                true: 'The justification for departure from equality of capital'
                                            },
                                            {
                                                type: 'checkbox',
                                                control: 'partiesPensionProvision',
                                                true: 'The parties’ pension provision if the order were to take effect'
                                            },
                                            {
                                                type: 'checkbox',
                                                control: 'childrensHousingNeeds',
                                                true: 'The children’s housing needs and whether they are met by the order'
                                            },
                                            {
                                                type: 'checkbox',
                                                control: 'netEffectOrder',
                                                true: 'The net effect of the order'
                                            },
                                            {
                                                type: 'checkbox',
                                                control: 'Other'
                                            },
                                            {
                                                control: 'informationNeeded',
                                                type: 'textarea'
                                            }
                                        ]
                                    }
                                },
                                {
                                    type: 'checkbox',
                                    control: 'orderNotAppearOfS25ca1973',
                                    true: 'The order doesn’t appear fair taking account of S25 Matrimonial Causes Act 1973'
                                },
                                {
                                    type: 'checkbox',
                                    control: 'd81',
                                    true: 'The D81 form is incomplete'
                                },
                                {
                                    type: 'checkbox',
                                    control: 'pensionAnnex',
                                    true: 'The pension annex was not attached'
                                },
                                {
                                    type: 'checkbox',
                                    control: 'applicantTakenAdvice',
                                    true: 'It’s not clear if the applicant has taken independent legal advice'
                                },
                                {
                                    control: 'Reason',
                                    type: 'textarea'
                                }
                            ],
                            link: {
                                text: 'Change',
                                event: 'reject-reasons',
                                hiddenAccessibilityText: 'reasons'
                            }
                        },
                        {
                            title: 'Directions',
                            details: [
                                {
                                    control: 'Directions',
                                    type: 'textarea'
                                }
                            ],
                            link: {
                                text: 'Change',
                                event: 'reject-reasons',
                                hiddenAccessibilityText: 'reasons'
                            }
                        },
                        {
                            title: 'Include an annotated version of the draft consent order?',
                            details: [
                                {
                                    control: 'includeAnnotatedVersionDraftConsOrder',
                                    type: 'radio',
                                    no: 'No',
                                    yes: 'Yes'
                                }
                            ],
                            link: {
                                text: 'Change',
                                event: 'reject-reasons',
                                hiddenAccessibilityText: 'reasons'
                            }
                        }
                    ]
                },
                {
                    header: 'Comments on draft consent order',
                    page: 'draft-consent-order',
                    contents: [
                        {
                            title: 'Comments',
                            details: [
                                {
                                    type: 'comment'
                                }
                            ],
                            link: {
                                text: 'Change',
                                event: 'draft-consent-order',
                                hiddenAccessibilityText: 'draft-consent-order'
                            }
                        }
                    ]
                },
                {
                    header: 'Hearing details',
                    page: 'hearing-details',
                    contents: [
                        {
                            title: 'Estimate length of hearing in minutes',
                            details: [
                                {
                                    control: 'estimateLengthOfHearing',
                                    type: 'input'
                                }
                            ],
                            link: {
                                text: 'Change',
                                event: 'hearing-details',
                                hiddenAccessibilityText: 'reasons'
                            }
                        },
                        {
                            title: 'When should the hearing take place?',
                            details: [
                                {
                                    control: 'whenHearingPlaced',
                                    type: 'input'
                                }
                            ],
                            link: {
                                text: 'Change',
                                event: 'hearing-details',
                                hiddenAccessibilityText: 'reasons'
                            }
                        },
                        {
                            title: 'Which court?',
                            details: [
                                {
                                    control: 'whichCourt',
                                    type: 'radio',
                                    southWest: 'South West Divorce Centre'
                                },
                                {
                                    control: 'whichCourt',
                                    type: 'radio',
                                    eastMidlands: 'East Midlands Divorce Centre'
                                },
                                {
                                    control: 'whichCourt',
                                    type: 'radio',
                                    westMidlands: 'West Midlands Divorce Centre'
                                },
                                {
                                    control: 'whichCourt',
                                    type: 'radio',
                                    northWest: 'North West Divorce Centre'
                                }
                            ],
                            link: {
                                text: 'Change',
                                event: 'hearing-details',
                                hiddenAccessibilityText: 'reasons'
                            }
                        },
                        {
                            title: 'Any other hearing details (optional)',
                            details: [
                                {
                                    control: 'otherHearingDetails',
                                    type: 'input'
                                }
                            ],
                            link: {
                                text: 'Change',
                                event: 'hearing-details',
                                hiddenAccessibilityText: 'reasons'
                            }
                        }
                    ]
                }
            ],
            buttons: [
                {
                    control: 'createButton',
                    value: 'Submit',
                    onEvent: 'continue'
                }
            ]
        },
        'decision-confirmation': {
            idPrefix: 'decision-confirmation',
            name: 'decision-confirmation',
            buttons: [
                {
                    control: 'createButton',
                    value: 'Continue',
                    onEvent: 'continue'
                }
            ]
        },
        'draft-consent-order': {
            idPrefix: 'draft-consent-order',
            name: 'draft-consent-order',
            header: 'Add or change comments',
            buttons: [
                {
                    control: 'createButton',
                    value: 'Continue',
                    onEvent: 'continue'
                }
            ]
        },
        'hearing-details': {
            idPrefix: 'hearing-details',
            name: 'hearing-details',
            header: 'Hearing details',
            groups: [
                {
                    input: {
                        label: {
                            text: 'Estimate length of hearing in minutes',
                            classes: 'govuk-label--m'
                        },
                        control: 'estimateLengthOfHearing',
                        classes: 'govuk-input--width-3'
                    }
                },
                {
                    input: {
                        label: {
                            text: 'When should the hearing take place?',
                            classes: 'govuk-label--m'
                        },
                        hint: {
                            text: 'For example, ‘fix hearing for first available date’',
                            classes: 'govuk-hint'
                        },
                        control: 'whenHearingPlaced',
                        classes: ''
                    }
                },
                {
                    fieldset: [
                        {
                            legend: {
                                text: 'Which court?',
                                isPageHeading: true,
                                classes: 'govuk-fieldset__legend--m'
                            }
                        },
                        {
                            radios: {
                                control: 'whichCourt',
                                radioGroup: [
                                    {
                                        value: 'southWest',
                                        text: 'South West Divorce Centre',
                                        hint: { text: 'Southampton' }
                                    },
                                    {
                                        value: 'eastMidlands',
                                        text: 'East Midlands Divorce Centre',
                                        hint: { text: 'Nottingham' }
                                    },
                                    {
                                        value: 'westMidlands',
                                        text: 'West Midlands Divorce Centre',
                                        hint: { text: 'Stoke' }
                                    },
                                    {
                                        value: 'northWest',
                                        text: 'North West Divorce Centre',
                                        hint: { text: 'Liverpool' }
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    textarea: {
                        label: 'Any other hearing details (optional)',
                        hint: {
                            text: 'For example, if you need to hear the case. Or if you need to transfer either the financial remedy or entire divorce case to another court.'
                        },
                        control: 'otherHearingDetails',
                        value: 'Other hearing details text'
                    }
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
}

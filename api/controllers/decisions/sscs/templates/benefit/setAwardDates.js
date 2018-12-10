module.exports = {
    idPrefix: 'set-award-dates',
    name: 'set-award-dates',
    header: 'Do you want to approve the draft consent order?',
    formGroupValidators: [
        {
            validatorFunc: 'isAnyInputsNotFilledIn',
            validationErrorId: 'awardEndDateInvalid',
            controlIds: ['awardEndDateDay', 'awardEndDateMonth', 'awardEndDateYear']
        }
    ],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formGroup',
            formGroupValidationErrorId: 'awardEndDateInvalid',
            text: 'Enter a Day, Month and Year',
            href: '#'
        },
        {
            validationLevel: 'formControl',
            controlId: 'approveDraftConsent',
            text: 'Select the end date',
            href: '#'
        },
        {
            validationLevel: 'formControl',
            controlId: 'awardEndDateDay',
            text: 'Select Award End Date Day',
            href: '#'
        }
    ],
    groups: [
        {
            legend: {
                text: 'Start date',
                isPageHeading: true,
                classes: 'govuk-fieldset__legend--m'
            }
        },
        {
            hint: {
                text: 'For example, 12 4 2018',
                classes: 'govuk-hint'
            }
        },
        {
            date: {
                formName: 'startDate',
                validators: [
                    {
                        validator: 'required'
                    }
                ],
                day: {
                    input: {
                        label: {
                            text: 'Day',
                            classes: 'govuk-date-input__label'
                        },
                        validators: ['required'],
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
        },
        {
            fieldset: [
                {
                    radios: {
                        control: 'approveDraftConsent',
                        validators: ['required'],
                        validationError: {
                            value: 'Select the end date',
                            controlId: 'approveDraftConsent'
                        },
                        radioGroup: [
                            {
                                value: 'endDate',
                                text: 'Set end date',
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
                                value: 'indefinite',
                                text: 'Indefinite award',
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

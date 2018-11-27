module.exports = {
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
                                                    date: {
                                                            formName: 'form1',
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
                                                            year:{
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

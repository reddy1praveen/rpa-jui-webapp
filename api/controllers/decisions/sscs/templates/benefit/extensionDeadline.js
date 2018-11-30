module.exports = {
    idPrefix: 'preliminary-advanced',
    name: 'preliminary-advanced',
    header: 'Select awards gghghgh',
    groups: [
        {
            fieldset: [
                {
                    legend: {
                        text: 'What are you considering awarding for daily living?',
                        isPageHeading: true,
                        classes: 'govuk-fieldset__legend--m'
                    }
                },
                {
                    radios: {
                        control: 'forDailyLiving',
                        radioGroup: [
                            {
                                value: 'noAward',
                                text: 'No award',
                                hiddenAccessibilityText: ' for daily living'
                            },
                            {
                                value: 'standardRate',
                                text: 'Standard rate',
                                hiddenAccessibilityText: ' for daily living'
                            },
                            {
                                value: 'enhancedRate',
                                text: 'Enhanced rate',
                                hiddenAccessibilityText: ' for daily living'
                            }
                        ]
                    }
                },
                {
                    legend: {
                        text: 'What are you considering awarding for mobility?',
                        isPageHeading: true,
                        classes: 'govuk-fieldset__legend--m'
                    }
                },
                {
                    radios: {
                        control: 'forMobility',
                        radioGroup: [
                            {
                                value: 'noAward',
                                text: 'No award',
                                hiddenAccessibilityText: '  for mobility'
                            },
                            {
                                value: 'standardRate',
                                text: 'Standard rate',
                                hiddenAccessibilityText: '  for mobility'
                            },
                            {
                                value: 'enhancedRate',
                                text: 'Enhanced rate',
                                hiddenAccessibilityText: '  for mobility'
                            }
                        ]
                    }
                },
                {
                    legend: {
                        text: 'How would this new award compare to the original DWP award?',
                        isPageHeading: true,
                        classes: 'govuk-fieldset__legend--m'
                    }
                },
                {
                    radios: {
                        control: 'compareToDWPAward',
                        radioGroup: [
                            {
                                value: 'Higher',
                                text: 'Higher',
                                hiddenAccessibilityText: ' as Department for Work and Pensions orignal decision'
                            },
                            {
                                value: 'Same',
                                text: 'Same',
                                hiddenAccessibilityText: ' as Department for Work and Pensions orignal decision'
                            },
                            {
                                value: 'Lower',
                                text: 'Lower',
                                hiddenAccessibilityText: ' as Department for Work and Pensions orignal decision'
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

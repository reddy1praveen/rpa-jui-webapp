module.exports = {
    idPrefix: 'ManagingToilet',
    name: 'ManagingToilet',
    header: 'Managing toilet needs or incontinence',
    caption: {
        classes: 'govuk-caption-xl',
        text: 'Daily living'
    },
    groups: [
        {
            fieldset: [
                {
                    legend: {
                        text: 'Select your new score',
                        isPageHeading: true,
                        classes: 'govuk-fieldset__legend--m'
                    }
                },
                {
                    radios: {
                        control: 'dailyLivingManagingToilet',
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can manage toilet needs or incontinence unaided',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2',
                                text: 'Needs to use an aid or appliance to be able to manage toilet needs or incontinence',
                                hint: {
                                    text: '2 point',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2',
                                text: 'Needs supervision or prompting to be able to manage toilet needs',
                                hint: {
                                    text: '2 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs assistance to be able to manage toilet needs',
                                hint: {
                                    text: '4 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '6',
                                text: 'Needs assistance to be able to manage incontinence of either bladder and bowel',
                                hint: {
                                    text: '6 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'Needs assistance to be able to manage incontinence of both bladder and bowel',
                                hint: {
                                    text: '8 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
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

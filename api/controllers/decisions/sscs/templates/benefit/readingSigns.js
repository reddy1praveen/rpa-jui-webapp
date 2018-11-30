module.exports = {
    idPrefix: 'ReadingSigns',
    name: 'ReadingSigns',
    header: 'Reading and understanding signs, symbols and words',
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
                        control: 'dailyLivingReadingSigns',
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can read and understand basic and complex written information either unaided or using spectacles or contact lenses',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2',
                                text: 'Needs to use an aid or appliance, other than spectacles or contact lenses, to be able to read or understand either basic or complex written information',
                                hint: {
                                    text: '2 point',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2',
                                text: 'Needs prompting to be able to read or understand complex written information',
                                hint: {
                                    text: '2 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs prompting to be able to read or understand basic written information',
                                hint: {
                                    text: '4 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'Cannot read or understand signs, symbols or words at all',
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

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
}

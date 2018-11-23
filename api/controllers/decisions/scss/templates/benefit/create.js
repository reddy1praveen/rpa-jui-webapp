module.exports = {
    idPrefix: 'create',
    name: 'create',
    header: 'What do you want to send to the parties?',
    groups: [
        {
            fieldset: [
                {
                    radios: {
                        control: 'preliminaryView',
                        radioGroup: [
                            {
                                value: 'yes',
                                text: 'Preliminary view',
                                hiddenAccessibilityText: 'some hidden text'
                            },
                            {
                                value: 'no',
                                text: 'Final decision',
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

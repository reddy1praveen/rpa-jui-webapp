module.exports = {
    idPrefix: 'check-tribunal',
    header: 'Check view before sending',
    name: 'check-tribunal',
    formGroupValidators: [],
    validationHeaderErrorMessages: [],
    groups: [
        {
            inset: {
                text: 'This will be sent to both the appellant and DWP.'
            }
        },
        {
            hr: {}
        },
        {
            heading: {
                text: 'The tribunal’s view on your appeal',
                classes: 'govuk-heading-l'
            }
        },
        {
            information: [
                {
                    text: 'The tribunal have considered all the information submitted by you and DWP.'
                },
                {
                    text: 'Their view is that you’re entitled to PIP at the rate below from 3 October 2017 until 3 March 2020.'
                },
                {
                    'govuk-table': {

                    }
                }
            ]
        }
    ],
    buttons: [
        {
            control: 'createButton',
            value: 'Submit',
            onEvent: 'submit'
        }
    ]
}

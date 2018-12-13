module.exports = {
    idPrefix: 'check',
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
            heading: {
                text: 'The tribunal’s view on your appeal',
                classes: 'govuk-heading-l'
            }
        }
    ]
}

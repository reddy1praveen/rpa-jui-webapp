module.exports = {
    idPrefix: 'final-decision',
    name: 'final-decision',
    header: 'Make final decision',
    groups: [
        {
            textarea: {
                label: 'Enter decision notes',
                control: 'decisionNotes',
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
}

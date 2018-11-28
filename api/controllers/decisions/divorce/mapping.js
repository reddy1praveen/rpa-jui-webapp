// event : event name
// state | states : one state or many states for  event
// condition | conditions : one condition or many conditions for state
// result state to enter

//  condition :
//      variableName,  value

// event  --> state/states | result
// state/states ---> condition/conditions -> result

module.export = [
    {
        event: 'change',
        result: '[state]'
    },
    {
        event: 'continue',
        states: [
            {
                state: 'create',
                conditions: [
                    {
                        condition: [{ approveDraftConsent: 'yes' }],
                        result: 'notes-for-court-administrator'
                    },
                    {
                        condition: [{ approveDraftConsent: 'no' }],
                        result: 'reject-reasons'
                    }
                ]
            },
            {
                state: 'reject-reasons',
                conditions: [
                    {
                        condition: [{ includeAnnotatedVersionDraftConsOrder: 'yes' }],
                        result: 'draft-consent-order'
                    },
                    {
                        condition: [{ partiesNeedAttend: true }],
                        result: 'hearing-details'
                    },
                    {
                        condition: [{ partiesNeedAttend: false }],
                        result: 'notes-for-court-administrator'
                    }
                ]
            },
            {
                state: 'draft-consent-order',
                conditions: [
                    {
                        condition: [{ partiesNeedAttend: true }],
                        result: 'hearing-details'
                    },
                    {
                        condition: [{ partiesNeedAttend: false }],
                        result: 'notes-for-court-administrator'
                    }
                ]
            },
            {
                state: 'hearing-details',
                result: 'notes-for-court-administrator'
            }
        ]
    }
]

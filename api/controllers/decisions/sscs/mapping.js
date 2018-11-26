// event : event name
// state | states : one state or many states for  event
// condition | conditions : one condition or many conditions for state
// result state to enter

//  condition :
//      variableName,  value

// event  --> state/states | result
// state/states ---> condition/conditions -> result

// [state] and [end] are special casess

const mapping = [
    ({
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
                        condition: [{ preliminaryView: 'yes' }],
                        result: 'preliminary-advanced'
                    },
                    {
                        condition: [{ preliminaryView: 'no' }],
                        result: 'final-decision'
                    }
                ]
            }
        ]
    })
]

module.exports = mapping

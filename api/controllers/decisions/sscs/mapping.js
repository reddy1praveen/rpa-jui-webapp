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
                        condition: [{ preliminaryView: 'yes' }],
                        result: 'preliminary-advanced'
                    },
                    {
                        condition: [{ preliminaryView: 'no' }],
                        result: 'final-decision'
                    }
                ]
            },
            {
                state: 'preliminary-advanced',
                result: 'set-award-dates'
            },
            {
                state: 'set-award-dates',
                result: 'scores'
            },
            {
                state: 'scores',
                result: 'communicating-verbally'
            },
            {
                state: 'communicating-verbally',
                result: 'dressing-undressing'
            },
            {
                state: 'dressing-undressing',
                result: 'engaging-face'
            },
            {
                state: 'engaging-face',
                result: 'budgeting-decisions'
            },
            {
                state: 'budgeting-decisions',
                result: 'managing-therapy'
            },
            {
                state: 'managing-therapy',
                result: 'managing-toilet'
            },
            {
                state: 'managing-toilet',
                result: 'moving-around'
            },
            {
                state: 'moving-around',
                result: 'planning-journeys'
            },
            {
                state: 'planning-journeys',
                result: 'preparing-food'
            },
            {
                state: 'preparing-food',
                result: 'reading-signs'
            },
            {
                state: 'reading-signs',
                result: 'taking-nutrition'
            },
            {
                state: 'taking-nutrition',
                result: 'washing-bathing'
            }

        ]
    }
]

module.exports = mapping

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
                result : {
                    communicatingVerbally: true - communicating-verbally
                    dressingUndressing: true - dressing-undressing
                    engagingWithOtherPeople: true - engaging-face
                    makingBudgetingDecisions: true - budgeting-decisions
                    managingTherapy: true - managing-therapy
                    managingToilet: true - managing-toilet
                    movingAround: true - moving-around
                    planningFollowingJourneys: true - planning-journeys
                    preparingFood: true - preparing-food
                    readingAndUnderstanding: true - reading-signs
                    takingNutrition: true - taking-nutrition
                    washingBathing: true - washing-bathing
                }
            }
        ]
    }
]

module.exports = mapping

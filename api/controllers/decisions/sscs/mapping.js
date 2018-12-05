// event : event name
// state | states : one state or many states for  event
// condition | conditions : one condition or many conditions for state
// result state to enter

//  condition :
//      variableName,  value

// event  --> state/states | result
// state/states ---> condition/conditions -> result

// [state] and [end] are special casess

// result:
// string , "some- page" , a page to go to
// array , a list of pages to add to a register and the next page is first on register stack
// string , "." pop next page of register stack

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
                result: [
                    { communicatingVerbally: 'communicating-verbally' },
                    { dressingUndressing: 'dressing-undressing' },
                    { engagingWithOtherPeople: 'engaging-face' },
                    { makingBudgetingDecisions: 'budgeting-decisions' },
                    { managingTherapy: 'managing-therapy' },
                    { managingToilet: 'managing-toilet' },
                    { movingAround: 'moving-around' },
                    { planningFollowingJourneys: 'planning-journeys' },
                    { preparingFood: 'preparing-food' },
                    { readingAndUnderstanding: 'reading-signs' },
                    { takingNutrition: 'taking-nutrition' },
                    { washingBathing: 'washing-bathing' }
                ],
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

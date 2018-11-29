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
    ],
    idPrefix: 'scores',
    name: 'scores',
    header: 'Which activities were relevant for the tribunal?',
    groups: [
      {
        fieldset: [
          {
              legend: {
                  text: 'Daily living',
                  isPageHeading: true,
                  classes: 'govuk-fieldset__legend--m'
              }
          },
          {
              hint: {
                  text: 'Select all that apply.',
                  classes: 'govuk-hint'
              }
          },
          {
              checkbox: {
                  control: 'preparingFood',
                  value: false,
                  text: 'Preparing food'
              }
          },
          {
              checkbox: {
                  control: 'takingNutrition',
                  value: false,
                  text: 'Taking nutrition'
              }
          },
          {
              checkbox: {
                  control: 'managingTherapy',
                  value: false,
                  text: 'Managing therapy or monitoring a health condition'
              }
          },
          {
              checkbox: {
                  control: 'washingBathing',
                  value: false,
                  text: 'Washing and bathing'
              }
          },
          {
              checkbox: {
                  control: 'managingToilet',
                  value: false,
                  text: 'Managing toilet needs or incontinence'
              }
          },
          {
              checkbox: {
                  control: 'dressingUndressing',
                  value: false,
                  text: 'Dressing and undressing'
              }
          },
          {
              checkbox: {
                  control: 'communicatingVerbally',
                  value: false,
                  text: 'Communicating verbally'
              }
          },
          {
              checkbox: {
                  control: 'readingAndUnderstanding',
                  value: false,
                  text: 'Reading and understanding signs, symbols and words'
              }
          },
          {
              checkbox: {
                  control: 'engagingWithOtherPeople',
                  value: false,
                  text: 'Engaging with other people face to face'
              }
          },
          {
              checkbox: {
                  control: 'makingBudgetingDecisions',
                  value: false,
                  text: 'Making budgeting decisions'
              }
          }
        ]
      },
      {
        fieldset: [
          {
              legend: {
                  text: 'Mobility',
                  isPageHeading: true,
                  classes: 'govuk-fieldset__legend--m'
              }
          },
          {
              hint: {
                  text: 'Select all that apply.',
                  classes: 'govuk-hint'
              }
          },
          {
              checkbox: {
                  control: 'planningFollowingJourneys',
                  value: false,
                  text: 'Planning and following journeys'
              }
          },
          {
              checkbox: {
                  control: 'movingAround',
                  value: false,
                  text: 'Moving around'
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
    ],
    idPrefix: 'scores',
    name: 'scores',
    header: 'Preparing food',
    caption: {
      classes: 'govuk-caption-xl',
      text: 'Daily living'
    },
    groups: [
      {
        fieldset: [
          {
              legend: {
                  text: 'Select your new score',
                  isPageHeading: true,
                  classes: 'govuk-fieldset__legend--m'
              }
          },
          {
              radios: {
                  control: 'dailyLiving',
                  radioGroup: [
                      {
                          value: '0',
                          text: 'Can prepare and cook a simple meal unaided',
                          hint: {
                            text: '0 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '2',
                          text: 'Needs to use an aid or appliance to be able to either prepare or cook a simple meal',
                          hint: {
                            text: '2 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '2',
                          text: 'Cannot cook a simple meal using a conventional cooker but is able to do so using a microwave',
                          hint: {
                            text: '2 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '2',
                          text: 'Needs prompting to be able to either prepare or cook a simple meal',
                          hint: {
                            text: '2 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '4',
                          text: 'Needs supervision or assistance to either prepare or cook a simple meal',
                          hint: {
                            text: '4 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '8',
                          text: 'Cannot prepare and cook food',
                          hint: {
                            text: '8 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
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

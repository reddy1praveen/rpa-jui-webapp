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
                  control: 'dailyLivingPreparingFood',
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
    ],
    header: 'Taking nutrition',
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
                  control: 'dailyLivingTakingNutrition',
                  radioGroup: [
                      {
                          value: '0',
                          text: 'Can take nutrition unaided',
                          hint: {
                            text: '0 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '2',
                          text: 'Needs either:',
                          hint: {
                            text: '2 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          },
                          list: {
                            classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                            text: [
                              'to use an aid or appliance to be able to take nutrition',
                              'supervision to be able to take nutrition',
                              'assistance to be able to cut up food'
                            ]
                          }
                      },
                      {
                          value: '2',
                          text: 'Needs a therapeutic source to be able to take nutrition',
                          hint: {
                            text: '2 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '4',
                          text: 'Needs prompting to be able to take nutrition',
                          hint: {
                            text: '4 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '6',
                          text: 'Needs assistance to be able to manage a therapeutic source to take nutrition',
                          hint: {
                            text: '6 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '8',
                          text: 'Cannot convey food and drink to their mouth and needs another person to do so',
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
    ],
    header: 'Managing therapy or monitoring a health condition',
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
                  control: 'dailyLivingManagingTherapy',
                  radioGroup: [
                      {
                          value: '0',
                          text: 'Either:',
                          hint: {
                            text: '0 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          },
                          list: {
                            classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                            text: [
                              'does not receive medication or therapy or need to monitor a health condition',
                              'or can manage medication or therapy or monitor a health condition unaided'
                            ]
                          }
                      },
                      {
                          value: '1',
                          text: 'Needs either:',
                          hint: {
                            text: '1 point',
                            classes: 'govuk-hint govuk-radios__hint'
                          },
                          list: {
                            classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                            text: [
                              'to use an aid or appliance to be able to manage medication',
                              'supervision, prompting or assistance to be able to manage medication or monitor a health condition',
                              'supervision, prompting or assistance to be able to monitor a health condition'
                            ]
                          }
                      },
                      {
                          value: '2',
                          text: 'Needs supervision, prompting or assistance to be able to manage therapy that takes no more than 3.5 hours a week',
                          hint: {
                            text: '2 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '4',
                          text: 'Needs supervision, prompting or assistance to be able to manage therapy that takes more than 3.5 but no more than 7 hours a week',
                          hint: {
                            text: '4 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '6',
                          text: 'Needs supervision, prompting or assistance to be able to manage therapy that takes more than 7 but no more than 14 hours a week',
                          hint: {
                            text: '6 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '8',
                          text: 'Needs supervision, prompting or assistance to be able to manage therapy that takes more than 14 hours a week',
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
    ],
    header: 'Washing and bathing',
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
                  control: 'dailyLivingWashingBathing',
                  radioGroup: [
                      {
                          value: '0',
                          text: 'Can wash and bathe unaided',
                          hint: {
                            text: '0 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '2',
                          text: 'Needs to use an aid or appliance to be able to wash or bathe',
                          hint: {
                            text: '2 point',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '2',
                          text: 'Needs supervision or prompting to be able to wash or bathe',
                          hint: {
                            text: '2 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '2',
                          text: 'Needs assistance to be able to wash either their hair or body below the waist',
                          hint: {
                            text: '2 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '3',
                          text: 'Needs assistance to be able to get in or out of a bath or shower',
                          hint: {
                            text: '3 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '4',
                          text: 'Needs assistance to be able to wash their body between the shoulders and waist',
                          hint: {
                            text: '4 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '8',
                          text: 'Cannot wash and bathe at all and needs another person to wash their entire body',
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
    ],
    header: 'Managing toilet needs or incontinence',
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
                  control: 'dailyLivingManagingToilet',
                  radioGroup: [
                      {
                          value: '0',
                          text: 'Can manage toilet needs or incontinence unaided',
                          hint: {
                            text: '0 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '2',
                          text: 'Needs to use an aid or appliance to be able to manage toilet needs or incontinence',
                          hint: {
                            text: '2 point',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '2',
                          text: 'Needs supervision or prompting to be able to manage toilet needs',
                          hint: {
                            text: '2 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '4',
                          text: 'Needs assistance to be able to manage toilet needs',
                          hint: {
                            text: '4 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '6',
                          text: 'Needs assistance to be able to manage incontinence of either bladder and bowel',
                          hint: {
                            text: '6 points',
                            classes: 'govuk-hint govuk-radios__hint'
                          }
                      },
                      {
                          value: '8',
                          text: 'Needs assistance to be able to manage incontinence of both bladder and bowel',
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

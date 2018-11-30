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
    ],
    header: 'Dressing and undressing',
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
                        control: 'dailyLivingDressingUndressing',
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can dress and undress unaided',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2',
                                text: 'Needs to use an aid or appliance to be able to dress or undress',
                                hint: {
                                    text: '2 point',
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
                                        'prompting to be able to dress, undress or determine appropriate circumstances for remaining clothed',
                                        'prompting or assistance to be able to select appropriate clothing'
                                    ]
                                }
                            },
                            {
                                value: '2',
                                text: 'Needs assistance to be able to dress or undress their lower body',
                                hint: {
                                    text: '2 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs assistance to be able to dress or undress their upper body',
                                hint: {
                                    text: '4 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'Cannot dress or undress at all',
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
    header: 'Communicating verbally',
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
                        control: 'dailyLivingCommunicatingVerbally',
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can express and understand verbal information unaided',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2',
                                text: 'Needs to use an aid or appliance to be able to speak or hear',
                                hint: {
                                    text: '2 point',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs communication support to be able to express or understand complex verbal information',
                                hint: {
                                    text: '4 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'Needs communication support to be able to express or understand basic verbal information',
                                hint: {
                                    text: '8 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '12',
                                text: 'Cannot express or understand verbal information at all even with communication support',
                                hint: {
                                    text: '12 points',
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
    header: 'Reading and understanding signs, symbols and words',
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
                        control: 'dailyLivingReadingSigns',
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can read and understand basic and complex written information either unaided or using spectacles or contact lenses',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2',
                                text: 'Needs to use an aid or appliance, other than spectacles or contact lenses, to be able to read or understand either basic or complex written information',
                                hint: {
                                    text: '2 point',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2',
                                text: 'Needs prompting to be able to read or understand complex written information',
                                hint: {
                                    text: '2 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs prompting to be able to read or understand basic written information',
                                hint: {
                                    text: '4 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'Cannot read or understand signs, symbols or words at all',
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
    header: 'Engaging with other people face to face',
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
                                text: 'Can engage with other people unaided',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2',
                                text: 'Needs prompting to be able to engage with other people',
                                hint: {
                                    text: '2 point',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs social support to be able to engage with other people',
                                hint: {
                                    text: '4 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'Cannot engage with other people due to such engagement causing either:',
                                list: {
                                    classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                                    text: [
                                        'overwhelming psychological distress to the claimant',
                                        'the claimant to exhibit behaviour which would result in a substantial risk of harm to the claimant or another person'
                                    ]
                                },
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
    header: 'Making budgeting decisions',
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
                        control: 'dailyLivingMakingBudgetDecisions',
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can manage complex budgeting decisions unaided',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2',
                                text: 'Needs prompting or assistance to be able to make complex budgeting decisions',
                                hint: {
                                    text: '2 point',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs prompting or assistance to be able to make simple budgeting decisions',
                                hint: {
                                    text: '4 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '6',
                                text: 'Cannot make any budgeting decisions at all',
                                hint: {
                                    text: '6 points',
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
    header: 'Planning and following journeys',
    caption: {
        classes: 'govuk-caption-xl',
        text: 'Mobility'
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
                        control: 'MobilityPlanningJourneys',
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can plan and follow the route of a journey unaided',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs prompting to be able to undertake any journey to avoid overwhelming psychological distress to the claimant',
                                hint: {
                                    text: '4 point',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'For reasons other than psychological distress, cannot plan the route of a journey',
                                hint: {
                                    text: '8 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '10',
                                text: 'For reasons other than psychological distress, cannot follow the route of an unfamiliar journey without another person, assistance dog or orientation aid',
                                hint: {
                                    text: '10 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '10',
                                text: 'Cannot undertake any journey because it would cause overwhelming psychological distress to the claimant',
                                hint: {
                                    text: '10 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '12',
                                text: 'For reasons other than psychological distress, cannot follow the route of a familiar journey without another person, an assistance dog or an orientation aid',
                                hint: {
                                    text: '12 points',
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
    header: 'Moving around',
    caption: {
        classes: 'govuk-caption-xl',
        text: 'Mobility'
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
                        control: 'MobilityMovingAround',
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can stand and then move more than 200 metres, either aided or unaided',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Can stand and then move more than 50 metres but no more than 200 metres, either aided or unaided',
                                hint: {
                                    text: '4 point',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'Can stand and then move unaided more than 20 metres but no more than 50 metres',
                                hint: {
                                    text: '8 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '10',
                                text: 'Can stand and then move using an aid or appliance more than 20 metres but no more than 50 metres',
                                hint: {
                                    text: '10 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '12',
                                text: 'Can stand and then move more than 1 metre but no more than 20 metres, either aided or unaided',
                                hint: {
                                    text: '12 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '12',
                                text: 'Cannot, either aided or unaided:',
                                hint: {
                                    text: '12 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                },
                                list: {
                                    classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                                    text: [
                                        'stand',
                                        'move more than 1 metre'
                                    ]
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

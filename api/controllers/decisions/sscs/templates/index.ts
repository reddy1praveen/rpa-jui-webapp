
export const templates: any = {}

// Define all the case type template includes, right now benefit

templates.benefit = {}

// end case type definition

// Define all the pages for a case type

templates.benefit.create = require('./benefit/create')
templates.benefit['preliminary-advanced'] = require('./benefit/preliminaryAdvanced')
templates.benefit['final-decision'] = require('./benefit/finalDecision')
templates.benefit['set-award-dates'] = require('./benefit/setAwardDates')

templates.benefit.scores = require('./benefit/scores')
templates.benefit['communicating-verbally'] = require('./benefit/scores')
templates.benefit['dressing-undressing'] = require('./benefit/scores')
templates.benefit['engaging-face'] = require('./benefit/scores')
templates.benefit['budgeting-decisions'] = require('./benefit/scores')
templates.benefit['managing-therapy'] = require('./benefit/scores')
templates.benefit['managing-toilet'] = require('./benefit/scores')
templates.benefit['moving-around'] = require('./benefit/scores')
templates.benefit['planning-journeys'] = require('./benefit/scores')
templates.benefit['preparing-food'] = require('./benefit/scores')
templates.benefit['reading-signs'] = require('./benefit/scores')
templates.benefit['taking-nutrition'] = require('./benefit/scores')
templates.benefit['washing-bathing'] = require('./benefit/scores')


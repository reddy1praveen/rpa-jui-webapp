
const templates = {}

// Define all the case type template includes, right now benefit

templates.benefit = {}

// end case type definition

// Define all the pages for a case type

templates.benefit.create = require('./benefit/create')
templates.benefit['preliminary-advanced'] = require('./benefit/preliminaryAdvanced')
templates.benefit['final-decision'] = require('./benefit/finalDecision')
templates.benefit['set-award-dates'] = require('./benefit/setAwardDates')

module.exports = templates

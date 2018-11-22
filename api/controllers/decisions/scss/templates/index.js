const templates = {}

// Define all the case type template includes, right now benefit
templates.benefit = {}
// end case type definition

// Define all the pages for a case type
templates.benefit.create = require('./benefit/create')

module.exports = templates

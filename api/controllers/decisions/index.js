const cohDecisionsRoutes = require('./cohDecisions')
const states = require('./states')

module.exports = app => {
    cohDecisionsRoutes(app)
    states(app)
}

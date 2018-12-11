import * as coh from '../../../services/coh'
import * as Mapping from './mapping'
import * as  Templates from './templates'


export const mapping = Mapping.mapping
export const templates = Templates.templates

export async function payload(req, res, payload) {
    console.log('payload')

    //create decision in COH

    const hearingId = await coh.updateOrCreateDecision(req.params.caseId, req.auth.userId)

    if (hearingId) {
        // okay lets add questions to this
        Object.keys(payload).forEach(variable => {
            coh.storeQuestion(hearingId, req.auth.userId, variable)

        })

    }

    return 'decision-confirmation'
}

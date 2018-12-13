import { Store } from '../../../lib/store/store'
import * as coh from '../../../services/coh'
import * as Mapping from './mapping'
import * as  Templates from './templates'

export const mapping = Mapping.mapping
export const templates = Templates.templates

export async function init(req, res) {

    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId.toLowerCase()

    const hearingId = await coh.getOrCreateDecision(req.params.caseId, req.auth.userId)

    return hearingId
}

export async function payload(req, res, data) {

    console.log('payload', payload)
    return 'decision-confirmation'
}

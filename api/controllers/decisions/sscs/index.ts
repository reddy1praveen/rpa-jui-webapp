import * as draftStore from '../../../services/draftStore'
const draft = require('../../../services/draft-store-api/draft-store-api')
import * as Mapping from './mapping'
import * as  Templates from './templates'

export const mapping = Mapping.mapping
export const templates = Templates.templates

export async function payload(req, res) {
    console.log('payload')

    const options = draft.getOptions(req)
    const data = await draft.createDraft(draft.getOptions(req))
    console.log(data)
    // draft.getAllDrafts(draft.getOptions(req)).then(data =>{
    //     console.log(data)
    // })
    // draftStore.setConfig(res)
    // draftStore.createDraft()

    return 'decision-confirmation'
}

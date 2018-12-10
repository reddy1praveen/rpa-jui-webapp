import axios, { AxiosInstance } from 'axios'
import * as moment from 'moment'
import { config } from '../../config'

const http: AxiosInstance = axios.create({})
export const url = config.services.coh.corApi

interface DateTimeObject {
    date: string
    dateUtc: string
    time: string
}

function convertDateTime(dateObj: string): DateTimeObject {
    const conDateTime = moment(dateObj)
    const dateUtc = conDateTime.utc().format()
    const date = conDateTime.format('D MMMM YYYY')
    const time = conDateTime.format('h:mma')

    return { date, dateUtc, time }
}

function mergeCohEvents(eventsJson: any): any[] {
    const history = eventsJson.online_hearing.history
    const questionHistory = eventsJson.online_hearing.questions
        ? eventsJson.online_hearing.questions
              .map(arr => arr.history)
              .reduce((historyArray, item) => historyArray.concat(item), [])
        : []

    const answersHistory = eventsJson.online_hearing.answers
        ? eventsJson.online_hearing.answers.map(arr => arr.history).reduce((historyArray, item) => historyArray.concat(item), [])
        : []

    const decisionHistory = eventsJson.online_hearing.decision ? eventsJson.online_hearing.decision.history : []
    return [...history, ...questionHistory, ...answersHistory, ...decisionHistory]
}

export async function createHearing(caseId: string, userId: string, jurisdictionId: string = 'SSCS'): Promise<string> {
    const response = await http.post(`${url}/continuous-online-hearings`, {
        case_id: caseId,
        jurisdiction: jurisdictionId,
        panel: [{ identity_token: 'string', name: userId }],
        start_date: new Date().toISOString(),
    })

    return response.data.online_heading_id
}

export async function getHearing(caseId: string): Promise<any> {
    const response = await http.get(`${url}/continuous-online-hearings?case_id=${caseId}`)
    return response.data
}

export async function getHearingByCase(caseId: string): Promise<any> {
    const response = await http.get(`${url}/continuous-online-hearings?case_id=${caseId}`)
    return response.data
}

export async function getEvents(caseId: string, userId: string): Promise<any[]> {
    let hearingId

    const hearing = await getHearing(caseId)

    if (hearing) {
        hearingId = hearing.online_hearings[0] ? hearing.online_hearings[0].online_hearing_id : null
    } else {
        hearingId = await createHearing(caseId, userId)
    }

    const response = await http.get(`${url}/continuous-online-hearings/${hearingId}/conversations`)

    return mergeCohEvents(response.data).map(event => {
        const dateObj = convertDateTime(event.state_datetime)
        const dateUtc = dateObj.dateUtc
        const date = dateObj.date
        const time = dateObj.time

        return {
            by: 'coh',
            date,
            dateUtc,
            documents: [],
            time,
            title: event.state_desc,
        }
    })
}

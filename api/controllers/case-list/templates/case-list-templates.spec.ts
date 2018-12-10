import 'mocha'
import * as chai from 'chai'
const expect = chai.expect

describe('case list templates spec', () => {
    const module = require('./index')

    const defaultTemplate = {
        columns: [
            {
                label: 'Case Reference',
                case_field_id: 'case_ref',
                value: '$.id'
            },
            {
                label: 'Parties',
                case_field_id: 'parties',
                value: []
            },
            {
                label: 'Type',
                case_field_id: 'type',
                value: ['$.jurisdiction', ' (', '$.case_type_id', ') ']
            },
            {
                label: 'Decision needed on',
                case_field_id: 'status',
                value: '$.state'
            },
            {
                label: 'Case received',
                case_field_id: 'createdDate',
                value: '$.created_date',
                date_format: 'd MMM yyyy'
            },
            {
                label: 'Date of Last Action',
                case_field_id: 'lastModified',
                value: '$.last_modified',
                date_format: 'd MMM yyyy'
            }
        ]
    }

    const scssTemplate = {
        columns: [
            {
                label: 'Case Reference',
                case_field_id: 'case_ref',
                value: '$.case_data.caseReference'
            },
            {
                label: 'Parties',
                case_field_id: 'parties',
                value: [
                    '$.case_data.appeal.appellant.name.firstName',
                    ' ',
                    '$.case_data.appeal.appellant.name.lastName',
                    ' ',
                    'v',
                    ' ',
                    'DWP'
                ]
            },
            {
                label: 'Type',
                case_field_id: 'type',
                value: '$.case_data.appeal.benefitType.code'
            },
            {
                label: 'Decision needed on',
                case_field_id: 'status',
                value: '$.state|case_status_processor'
            },
            {
                label: 'Case received',
                case_field_id: 'createdDate',
                value: '$.created_date',
                date_format: 'd MMM yyyy'
            },
            {
                label: 'Date of last event',
                case_field_id: 'lastModified',
                value: '$.last_modified',
                date_format: 'd MMM yyyy'
            }
        ]
    }
    
    it('should expose module', () => {
        expect(module).to.be.ok
    })

    it('should return default template', () => {
        expect(module('x', 'x')).to.deep.equal(defaultTemplate)
    })

    it('should return correct object for sscs.benefit', () => {
        expect(module('sscs', 'benefit')).to.deep.equal(scssTemplate)
    })

})
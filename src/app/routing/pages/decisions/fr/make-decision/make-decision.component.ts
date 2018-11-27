import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DecisionService} from '../../../../../domain/services/decision.service';
import {FormsService} from '../../../../../shared/services/forms.service';

@Component({
  selector: 'app-make-decision',
  templateUrl: './make-decision.component.html',
  styleUrls: ['./make-decision.component.scss']
})
export class MakeDecisionComponent implements OnInit {
    formDraft: FormGroup;
    draft: string;
    options: any;
    decision: any;
    request: any;
    pageValues: any;
    case: any;
    typeId: string;
    jurId: string;

    @Input() pageitems;

    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        public decisionService: DecisionService,
        private formsService: FormsService
    ) {}
    createForm(pageitems, pageValues) {
        this.formDraft = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));
    }
    ngOnInit() {
        this.activatedRoute.parent.data.subscribe(data => {
            this.case = data.caseData;
        });

        const pageId = this.activatedRoute.snapshot.url[0].path;
        const caseId = this.case.id;
        //const pageId = 'create';
        //const jurId = 'fr';

        this.jurId = this.case.case_jurisdiction;
        this.typeId = this.case.case_type_id;

        this.decisionService.fetch(this.jurId, caseId, pageId, this.typeId).subscribe(decision => {
            this.decision = decision;
            this.pageitems = this.decision.meta;
            this.pageValues = this.decision.formValues;

            console.log('decision is = >', decision);

            this.createForm(this.pageitems, this.pageValues) ;
        });
    }
    onSubmit() {
        const event = this.formDraft.value.createButton.toLowerCase();
        delete this.formDraft.value.createButton;
        this.request = { formValues: this.formDraft.value, event: event };
        this.pageValues.visitedPages = {};
        this.pageValues.visitedPages['create'] = true;
        this.request.formValues.visitedPages = this.pageValues.visitedPages;
        this.decisionService.submitDecisionDraft(
            this.jurId,
            this.activatedRoute.snapshot.parent.data.caseData.id,
            this.pageitems.name,
            this.typeId,
            this.request)
            .subscribe(decision => {
            console.log(decision.newRoute);
            this.router.navigate([`../${decision.newRoute}`], {relativeTo: this.activatedRoute});
        });
    }
}

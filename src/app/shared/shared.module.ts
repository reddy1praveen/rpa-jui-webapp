import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {DocumentViewerModule} from './components/document-viewer/document-viewer.module';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {GovukModule} from '../govuk/govuk.module';
import {HmctsModule} from '../hmcts/hmcts.module';
import {TimelineComponent} from './components/timeline/timeline.component';
import {QuestionListComponent} from './components/question-list/question-list.component';
import {QuestionComponent} from './components/question/question.component';
import {ReversePipe} from './pipes/array-reverse/reverse.pipe';
import {CaseStatusGoto} from './pipes/case-status-goto/case.status.goto';
import { TabsComponent } from './components/tabs/tabs.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { StatusComponent } from './components/status/status.component';
import { CaseActionAlertComponent } from './components/case-action-alert/case-action-alert.component';
import {CaseActionsComponent} from './components/case-actions/case-actions.component';
import { RadiobuttonComponent } from './components/radiobutton/radiobutton.component';
import { TextareasComponent } from './components/textareas/textareas.component';
import { LabelComponent } from './components/label/label.component';
import { FieldsetComponent } from './components/fieldset/fieldset.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { LegendComponent } from './components/legend/legend.component';
import { HintComponent } from './components/hint/hint.component';
import { JuiFormElementsComponent } from './components/jui-form-elements/jui-form-elements.component';

@NgModule({
    imports: [
        CommonModule,
        CdkTableModule,
        FormsModule,
        ReactiveFormsModule,
        DocumentViewerModule,
        RouterModule,
        GovukModule,
        HmctsModule
    ],
    declarations: [
        TableComponent,
        DataListComponent,
        FooterComponent,
        TimelineComponent,
        QuestionListComponent,
        QuestionComponent,
        ReversePipe,
        TabsComponent,
        CheckboxComponent,
        CaseStatusGoto,
        TabsComponent,
        StatusComponent,
        CaseActionsComponent,
        CaseActionAlertComponent,
        RadiobuttonComponent,
        TextareasComponent,
        LabelComponent,
        FieldsetComponent,
        ButtonsComponent,
        LegendComponent,
        HintComponent,
        JuiFormElementsComponent,
    ],
    exports: [
        JuiFormElementsComponent,
        TableComponent,
        DataListComponent,
        FooterComponent,
        TimelineComponent,
        QuestionListComponent,
        QuestionComponent,
        ReversePipe,
        TabsComponent,
        FieldsetComponent,
        CheckboxComponent,
        RadiobuttonComponent,
        TextareasComponent,
        LabelComponent,
        LegendComponent,
        HintComponent,
        ButtonsComponent,
        CaseStatusGoto,
        TabsComponent,
        StatusComponent,
        CaseActionsComponent,
        CaseActionAlertComponent,
        DocumentViewerModule
    ]
})

export class SharedModule {}




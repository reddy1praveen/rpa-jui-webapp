import { NgModule } from '@angular/core';
import { GovUiComponent } from './gov-ui.component';
import {ButtonsComponent} from './components/buttons/buttons.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LabelComponent} from './components/label/label.component';
import {LegendComponent} from './components/legend/legend.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {InputsComponent} from './components/inputs/inputs.component';
import {TableComponent} from './components/table/table.component';
import {CdkTableModule} from '@angular/cdk/table';
import {DataListComponent} from './components/data-list/data-list.component';
import {RouterModule} from '@angular/router';
import {HintComponent} from './components/hint/hint.component';
import {CaseStatusGoto} from '../../../../src/app/shared/pipes/case-status-goto/case.status.goto';
import {GovukTableComponent} from './components/govuk-table/govuk-table.component';

const UIMODULES = [
    ButtonsComponent,
    LabelComponent,
    LegendComponent,
    TabsComponent,
    InputsComponent,
    TableComponent,
    DataListComponent,
    HintComponent,
    GovukTableComponent
];

@NgModule({
  imports: [
      CommonModule,
      RouterModule,
      CdkTableModule,
      FormsModule,
      ReactiveFormsModule
  ],
  declarations: [
      GovUiComponent, ...UIMODULES,
      CaseStatusGoto
  ],
  exports: [GovUiComponent, ...UIMODULES]
})
export class GovUiModule { }

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
import {TextareasComponent} from './components/textareas/textareas.component';
import {RadiobuttonComponent} from './components/radiobutton/radiobutton.component';
import {CheckboxComponent} from './components/checkbox/checkbox.component';
import {ValidationErrorFormControlComponent} from './components/error-messege/validation-error-formcontrol/validation-error-formcontrol.component';
import {ValidationErrorFormGroupComponent} from './components/error-messege/validation-error-formgroup/validation-error-formgroup.component';
import {ValidationService} from './components/error-messege/validation.service';
import {FormsService} from './components/error-messege/forms.service';
import {FieldsetComponent} from './components/fieldset/fieldset.component';
import {JuiFormElementsComponent} from './components/jui-form-elements/jui-form-elements.component';

const UIMODULES = [
    ButtonsComponent,
    LabelComponent,
    LegendComponent,
    FieldsetComponent,
    TabsComponent,
    InputsComponent,
    TableComponent,
    DataListComponent,
    HintComponent,
    GovukTableComponent,
    TextareasComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    JuiFormElementsComponent,
    ValidationErrorFormControlComponent,
    ValidationErrorFormGroupComponent
];
const SERVICES = [];

@NgModule({
  imports: [
      CommonModule,
      RouterModule,
      CdkTableModule,
      FormsModule,
      ReactiveFormsModule
  ],
  declarations: [
      GovUiComponent,
      ...UIMODULES,
      ...SERVICES,
      CaseStatusGoto
  ],
  exports: [GovUiComponent, ...UIMODULES, ...SERVICES],
  providers: [
    ValidationService,
      FormsService
  ]
})
export class GovUiModule { }

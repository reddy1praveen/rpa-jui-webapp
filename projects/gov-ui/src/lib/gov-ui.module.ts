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
import {TextareasComponent} from './components/textareas/textareas.component';
import {RadiobuttonComponent} from './components/radiobutton/radiobutton.component';
import {CheckboxComponent} from './components/checkbox/checkbox.component';
import {ValidationErrorFormControlComponent} from './components/error-messege/validation-error-formcontrol/validation-error-formcontrol.component';
import {ValidationErrorFormGroupComponent} from './components/error-messege/validation-error-formgroup/validation-error-formgroup.component';
import {ValidationService} from './components/error-messege/validation.service';
import {FormsService} from './components/error-messege/forms.service';
import {FieldsetComponent} from './components/fieldset/fieldset.component';
import {JuiFormElementsComponent} from './components/jui-form-elements/jui-form-elements.component';
import {GovukBackLinkComponent} from './components/govuk-back-link/govuk-back-link.component';
import {GovukBreadcrumbsComponent} from './components/govuk-breadcrumbs/govuk-breadcrumbs.component';
import {GovukButtonComponent} from './components/govuk-button/govuk-button.component';
import {GovukCheckboxesComponent} from './components/govuk-checkboxes/govuk-checkboxes.component';
import {GovukDateInputComponent} from './components/govuk-date-input/govuk-date-input.component';
import {GovukDetailsComponent} from './components/govuk-details/govuk-details.component';
import {GovukErrorSummaryComponent} from './components/govuk-error-summary/govuk-error-summary.component';
import {GovukFieldsetComponent} from './components/govuk-fieldset/govuk-fieldset.component';
import {GovukFileUploadComponent} from './components/govuk-file-upload/govuk-file-upload.component';
import {GovukFooterComponent} from './components/govuk-footer/govuk-footer.component';
import {GovukHeaderComponent} from './components/govuk-header/govuk-header.component';
import {GovukInsetTextComponent} from './components/govuk-inset-text/govuk-inset-text.component';
import {GovukPanelComponent} from './components/govuk-panel/govuk-panel.component';
import {GovukPhaseBannerComponent} from './components/govuk-phase-banner/govuk-phase-banner.component';
import {GovukRadiosComponent} from './components/govuk-radios/govuk-radios.component';
import {GovukSelectComponent} from './components/govuk-select/govuk-select.component';
import {GovukSkipLinkComponent} from './components/govuk-skip-link/govuk-skip-link.component';
import {GovukTableComponent} from './components/govuk-table/govuk-table.component';
import {GovukTabsComponent} from './components/govuk-tabs/govuk-tabs.component';
import {GovukTagComponent} from './components/govuk-tag/govuk-tag.component';
import {GovukInputComponent} from './components/govuk-input/govuk-input.component';
import {GovukTextareaComponent} from './components/govuk-textarea/govuk-textarea.component';
import {GovukWarningTextComponent} from './components/govuk-warning-text/govuk-warning-text.component';

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
    ValidationErrorFormGroupComponent,
    GovukBackLinkComponent,
    GovukBreadcrumbsComponent,
    GovukButtonComponent,
    GovukCheckboxesComponent,
    GovukDateInputComponent,
    GovukDetailsComponent,
    GovukErrorSummaryComponent,
    GovukFieldsetComponent,
    GovukFileUploadComponent,
    GovukFooterComponent,
    GovukHeaderComponent,
    GovukInsetTextComponent,
    GovukPanelComponent,
    GovukPhaseBannerComponent,
    GovukRadiosComponent,
    GovukSelectComponent,
    GovukSkipLinkComponent,
    GovukTableComponent,
    GovukTabsComponent,
    GovukTagComponent,
    GovukInputComponent,
    GovukTextareaComponent,
    GovukWarningTextComponent
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

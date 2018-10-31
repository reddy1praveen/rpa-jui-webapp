import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-jui-form-elements',
  templateUrl: './jui-form-elements.component.html',
  styleUrls: ['./jui-form-elements.component.scss']
})
export class JuiFormElementsComponent {
    // @Input() legendClasses: String;
    // @Input() hintClasses: String;
    // @Input() radiobuttonClasses: String;
    // @Input() radioItems: Object;
    @Input() group: FormGroup;
    // @Input() idPrefix: String;
    // @Input() checkboxItem: Object;
    // @Input() checkboxClasses: String;
    // @Input() labelClasses: String;
    // @Input() textareaClasses: String;
    // @Input() textareaLabel: Object;
    // @Input() rows: String;
    @Input() data: Object;

    // Ok so this is fine, going in from here.
    @Input() useValidation = true;

    constructor() {}
}

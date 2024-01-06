import { Component, Input } from '@angular/core';
import { FormGroup, } from '@angular/forms';

import { SharedBaseModule, SharedFormModule } from '../../modules';

import { isFieldInvalid } from '../../utils';

@Component({
    standalone: true,
    selector: 'app-input-text-area-component',
    inputs: [
        'form',
        'formControlName',
        'label',
        'labelRequired',
        'labelDisabled',
        'customPlaceholder',
        'inputRows',
        'readonly',
        'customFieldValidation'
    ],
    outputs: [],
    imports: [ SharedBaseModule, SharedFormModule ],
    template: `
        <div [formGroup]="form" class="mb-3">
            <label
                *ngIf="!labelDisabled"
                [class.required]="labelRequired"
                style="margin-bottom: 5px"
            >
                {{ label ? label : 'Please input label'  }}
            </label>
            <textarea
                [class.is-invalid]="customFieldValidation ? customFieldValidation(form, formControlName) : isFieldInvalid(form, formControlName)"
                [ngClass]="(labelRequired ? 'required' : '!required')"
                [formControlName]="formControlName"
                [placeholder]="customPlaceholder ? customPlaceholder : label"
                [rows]="inputRows ? inputRows : 2"
                [readOnly]="readonly"
                class="form-control"
            ></textarea>
            <ng-container
                *ngIf="customFieldValidation ? customFieldValidation(form, formControlName) : isFieldInvalid(form, formControlName)"
            >
                <!-- validators required -->
                <div *ngIf="form.get(formControlName)?.hasError('required')" class="invalid-feedback">
                    {{ label }} is required
                </div>
            </ng-container>
        </div>
    `
})
export class AppInputTextAreaComponent {
    @Input() form!: FormGroup;
    @Input() formControlName!: string;
    @Input() label?: string;
    @Input() labelRequired?: boolean = false;
    @Input() labelDisabled?: boolean = false;
    @Input() customPlaceholder?: string;
    @Input() inputRows?: number;
    @Input() readonly ?: boolean;
    @Input() customFieldValidation?: Function;

    isFieldInvalid = isFieldInvalid;
}

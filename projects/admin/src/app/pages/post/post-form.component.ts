import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Post } from '../../models';
import { adminApiService } from '../../services';

import {
    ApiServices,
    AppCardComponent,
    AppFormComponent,
    AppInputCurrencyComponent,
    AppInputTextAreaComponent,
    AppInputTextComponent,
    randomInterval,
    SharedBaseModule
} from 'shared';

@Component({
    standalone: true,
    imports: [
        SharedBaseModule,
        AppCardComponent,
        AppFormComponent,
        AppInputTextComponent,
        AppInputCurrencyComponent,
        AppInputCurrencyComponent,
        AppInputTextAreaComponent
    ],
    template: `
        <app-card-component [headerTitle]="id ? 'Update Post' : 'Create Post'">
            <app-form-component
                (onSubmit)="onSubmit($event)"
                (onCancel)="onCancel()"
                [form]="form"
                [actionStandalone]="false"
                [canSubmit]="true"
                [submitLabel]="id ? 'Update' : 'Create'"
                [canCancel]="true"
                [cancelDisabled]="formLoading"
            >
                <div class="row">
                    <div class="col-12 col-sm-6">
                        <app-input-text-component
                            [form]="form"
                            [labelRequired]="true"
                            [readonly]="formLoading"
                            label="Title"
                            formControlName="title"
                        ></app-input-text-component>

                        <app-input-text-area-component
                            [form]="form"
                            [inputRows]="5"
                            [labelRequired]="true"
                            [readonly]="formLoading"
                            label="Body"
                            formControlName="body"
                        ></app-input-text-area-component>
                    </div>
                </div>
            </app-form-component>
        </app-card-component>
    `,
})
export class AppPostFormComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject();

    id?: string | null;
    form: FormGroup;

    formLoading: boolean = false;

    constructor(
        public location: Location,
        private router: Router,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private apiServices: ApiServices,
        private toasterService: ToastrService,
    ) {
        this.form = this.formBuilder.group(new Post());
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');

        if (this.id) {
            this.formLoading = true;

            this.apiServices.findByIdService(adminApiService.post, this.id)
                .pipe(
                    takeUntil(this.ngUnsubscribe),
                    finalize(() => (this.formLoading = false))
                )
                .subscribe((response: any) => {
                    this.form.patchValue(response);
                });
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.complete();
    }

    async onCancel() {
        await this.location.back();
    }

    onSubmit(value: any) {
        this.formLoading = true;

        if (!value.userId) {
            value.userId = randomInterval(1, 10);
        }

        if (this.id) {
            this.apiServices.updateOneService(adminApiService.post, this.id, value)
                .pipe(
                    takeUntil(this.ngUnsubscribe),
                    finalize(() => (this.formLoading = false))
                )
                .subscribe(async () => {
                    this.toasterService.warning('Data Updated', 'Error');

                    await this.location.back();
                });
        } else {
            this.apiServices.createOneService(adminApiService.post, value)
                .pipe(
                    takeUntil(this.ngUnsubscribe),
                    finalize(() => (this.formLoading = false))
                )
                .subscribe(async () => {
                    this.toasterService.success('Data Created', 'Error');

                    await this.location.back();
                });
        }
    }
}

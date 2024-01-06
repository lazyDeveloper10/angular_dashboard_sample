import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { OverallPostResponseInterface, PostInterface, postTableColumns } from '../../models';
import { adminApiService } from '../../services';

import {
    ApiServices,
    AppTableComponent,
    PageRequest,
    SharedBaseModule,
    SharedFormModule,
    TableItemsInterface
} from 'shared';

@Component({
    standalone: true,
    imports: [ SharedBaseModule, SharedFormModule, AppTableComponent, ],
    template: `
        <app-table-component
            #table
            (onFetchData)="getUser($event)"
            (onCreateNew)="onAddNew()"
            (onUpdate)="onUpdate($event)"
            (onDelete)="onDelete($event)"
            [columns]="columns"
            [data]="data"
            [hasActionOptions]="true"
            [canCreateNew]="true"
            [canUpdate]="true"
            [canDelete]="true"
            headerTitle="User"
        ></app-table-component>
    `,
})
export class AppPostTableComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('table', { static: false }) table?: AppTableComponent;

    private ngUnsubscribe = new Subject();

    data?: OverallPostResponseInterface;

    totalData: number = 0;
    columns: TableItemsInterface[] = postTableColumns;

    constructor(
        private router: Router,
        private apiServices: ApiServices,
        private toasterService: ToastrService,
    ) {
    }

    ngOnInit() {
        // get total data => temporary hit for pagination
        this.apiServices.findAllService(adminApiService.post)
            .subscribe((response: PostInterface[]) => {
                this.totalData = response.length;
            });
    }

    ngAfterViewInit() {
        this.table!.fetchData();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.complete();
    }

    getUser(event: PageRequest) {
        this.apiServices.findAllService(adminApiService.post, event)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                finalize(() => (this.table!.loadingStop()))
            )
            .subscribe((response: PostInterface[]) => {
                this.data = {
                    value: response,
                    limit: event.size,
                    page: event.page,
                    pages: this.totalData / event.size === 0 ? 1 : Math.ceil(this.totalData / event.size),
                    sortBy: event.sort,
                    total: this.totalData,
                };
            });
    }

    onDelete(event: any) {
        this.apiServices.deleteOneService(adminApiService.post, event.id)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                this.toasterService.error('Data Deleted', 'Error');

                this.table!.fetchData();
            });
    }

    async onAddNew() {
        await this.router.navigate([ `/post/create` ]);
    }

    async onUpdate(event: any) {
        await this.router.navigate([ `/post/update/${ event.id }` ]);
    }
}

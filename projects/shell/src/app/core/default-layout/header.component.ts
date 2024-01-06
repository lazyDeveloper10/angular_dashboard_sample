import { Component, ComponentRef, EventEmitter, OnDestroy, OnInit, Output, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Subject, takeUntil } from 'rxjs';

import { environment } from '../../../environments/environment';

@Component({
    standalone: true,
    selector: 'app-header-component',
    inputs: [],
    outputs: [],
    imports: [],
    template: ``
})
export class AppHeaderComponent implements OnInit, OnDestroy {
    @Output() onClickCollapsible = new EventEmitter<any>();

    private ngUnsubscribe = new Subject();

    constructor(
        private viewContainerRef: ViewContainerRef
    ) {
    }

    async ngOnInit() {
        const { AppHeaderComponent } = await loadRemoteModule({
            ...environment.microFrontEnd.base,
            exposedModule: environment.microFrontEnd.base.exposedModule.SharedHeaderComponent
        });

        const component: ComponentRef<any> = this.viewContainerRef?.createComponent(AppHeaderComponent);

        component.instance.onClickCollapsible
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((value: any) => {
                this.onClickCollapsible.emit(value);
            });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.complete();
    }
}

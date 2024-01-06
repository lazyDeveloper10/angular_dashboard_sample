import { Component, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { environment } from '../../../environments/environment';

@Component({
    standalone: true,
    selector: 'app-footer-component',
    inputs: [],
    outputs: [],
    imports: [],
    template: ``
})
export class AppFooterComponent implements OnInit {
    component!: ComponentRef<any>;

    constructor(
        private viewContainerRef: ViewContainerRef
    ) {
    }

    async ngOnInit() {
        const { AppFooterComponent } = await loadRemoteModule({
            ...environment.microFrontEnd.base,
            exposedModule: environment.microFrontEnd.base.exposedModule.SharedFooterComponent
        }).catch((err) => {
        });

        this.component = this.viewContainerRef?.createComponent(AppFooterComponent);
    }
}

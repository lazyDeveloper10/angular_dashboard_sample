import { Component, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
    standalone: true,
    selector: 'app-side-menu-component',
    inputs: [],
    outputs: [],
    imports: [],
    template: ``
})
export class AppSideMenuComponent implements OnInit {
    component!: ComponentRef<{
        collapse: boolean
    }>;

    constructor(
        private viewContainerRef: ViewContainerRef
    ) {
    }

    async ngOnInit() {
        const { AppSideMenuComponent } = await loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:7500/remoteEntry.js',
            exposedModule: 'SharedSideMenuComponent'
        }).catch((err) => {
        });

        this.component = this.viewContainerRef?.createComponent(AppSideMenuComponent);
    }

    setCollapsed() {
        this.component.instance.collapse
            ? this.component.instance.collapse = false
            : this.component.instance.collapse = true;
    }
}

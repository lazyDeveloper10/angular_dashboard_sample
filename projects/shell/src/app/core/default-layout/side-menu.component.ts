import { Component, ComponentRef, Input, OnInit, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { environment } from '../../../environments/environment';

@Component({
    standalone: true,
    selector: 'app-side-menu-component',
    inputs: [],
    outputs: [],
    imports: [],
    template: ``
})
export class AppSideMenuComponent implements OnInit {
    @Input() menuList: any[] = [];

    component!: ComponentRef<{
        collapse: boolean,
        menuList: any[]
    }>;

    constructor(
        private viewContainerRef: ViewContainerRef
    ) {
    }

    async ngOnInit() {
        const { AppSideMenuComponent } = await loadRemoteModule({
            ...environment.microFrontEnd.base,
            exposedModule: environment.microFrontEnd.base.exposedModule.SharedSideMenuComponent
        }).catch((err) => {
        });

        this.component = this.viewContainerRef?.createComponent(AppSideMenuComponent);

        this.component.instance.menuList = this.menuList;
    }

    setCollapsed(collapse: boolean) {
        this.component.instance.collapse = collapse;
    }

    setSideMenu(menuList: any[]) {
        this.component.instance.menuList = menuList;
    }
}

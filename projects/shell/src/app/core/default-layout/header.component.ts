import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
    standalone: true,
    selector: 'app-header-component',
    inputs: [],
    outputs: [],
    imports: [],
    template: ``
})
export class AppHeaderComponent implements OnInit {
    constructor(
        private viewContainerRef: ViewContainerRef
    ) {
    }

    ngOnInit() {
        loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:7500/remoteEntry.js',
            exposedModule: 'SharedHeaderComponent'
        }).then(async (data: any) => {
            const { setInput, instance } = this.viewContainerRef?.createComponent(data.AppHeaderComponent);

            console.log(instance)

        }).catch((err) => {
            console.log(err);
        });
    }
}

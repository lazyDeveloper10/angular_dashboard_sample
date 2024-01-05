import { Component } from '@angular/core';

import { SharedBaseModule } from '../../shared';

@Component({
    standalone: true,
    selector: 'app-header-component',
    inputs: [],
    outputs: [],
    imports: [ SharedBaseModule ],
    template: `
        <nav class="app-header navbar navbar-expand">

        </nav>
    `,
    styleUrls: [ './header.component.scss' ]
})
export class AppHeaderComponent {
}

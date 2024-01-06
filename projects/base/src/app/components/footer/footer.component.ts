import { Component, EventEmitter, Output } from '@angular/core';

import { SharedBaseModule } from '../../shared';

@Component({
    standalone: true,
    selector: 'app-footer-component',
    inputs: [],
    outputs: [],
    imports: [ SharedBaseModule ],
    template: `
        <div class="footer-container">
            copyright LazyDeveloper 2024
        </div>
    `,
    styleUrls: [ './footer.component.scss' ]
})
export class AppFooterComponent {

}

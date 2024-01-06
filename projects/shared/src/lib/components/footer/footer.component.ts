import { Component } from '@angular/core';

import { SharedBaseModule } from '../../modules';

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

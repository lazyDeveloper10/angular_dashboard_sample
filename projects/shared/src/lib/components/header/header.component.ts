import { Component, EventEmitter, Output } from '@angular/core';

import { SharedBaseModule } from '../../modules';

@Component({
    standalone: true,
    selector: 'app-header-component',
    inputs: [],
    outputs: [],
    imports: [ SharedBaseModule ],
    template: `
        <nav class="header-container navbar navbar-expand">
            <div class="header-wrapper">
                <div class="hamburger-wrapper" (click)="onClickCollapsible.emit()">
                    <img class="header=hamburger"
                         src="https://storage.googleapis.com/lazy_developer_gallery/global_icons/hamburger_icon.svg"
                         alt="menu"/>
                </div>
            </div>
        </nav>
    `,
    styleUrls: [ './header.component.scss' ]
})
export class AppHeaderComponent {
    @Output() onClickCollapsible = new EventEmitter<any>();
}

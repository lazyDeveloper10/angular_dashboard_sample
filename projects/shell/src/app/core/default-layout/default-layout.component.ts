import { Component, ViewChild } from '@angular/core';

import { AppSideMenuComponent } from './side-menu.component';
import { AppHeaderComponent } from './header.component';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-default-layout-component',
    inputs: [],
    outputs: [],
    imports: [
        AppSideMenuComponent,
        AppHeaderComponent,
        RouterOutlet
    ],
    template: `
        <div class="dashboard-container">
            <app-side-menu-component #testSideMenu></app-side-menu-component>

            <div
                [class.main-wrapper-collapse]="testSideMenu.component.instance.collapse"
                class="main-wrapper"
            >
                <app-header-component></app-header-component>

                <div (click)="testSideMenu.setCollapsed()">
                    coba teken
                </div>

                <div class="content-container flex-grow-1 px-3">
                    <div class="container-fluid content-wrapper">
                        <router-outlet></router-outlet>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./default-layout.component.scss']
})
export class AppDefaultLayoutComponent {
    @ViewChild('testSideMenu') testSideMenu?: AppSideMenuComponent;
}

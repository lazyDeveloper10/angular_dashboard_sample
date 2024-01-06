import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppFooterComponent, AppHeaderComponent, AppSideMenuComponent } from 'shared';

@Component({
    standalone: true,
    selector: 'app-default-layout-component',
    inputs: [],
    outputs: [],
    imports: [
        AppSideMenuComponent,
        AppHeaderComponent,
        RouterOutlet,
        AppFooterComponent,
        AppSideMenuComponent
    ],
    template: `
        <div class="dashboard-container">
            <app-side-menu-component
                #appSideMenuComponent
                [collapse]="collapse"
                [menuList]="menuList"
            ></app-side-menu-component>

            <div
                [class.main-wrapper-collapse]="collapse"
                class="main-wrapper"
            >
                <app-header-component (onClickCollapsible)="onSetCollapse()"></app-header-component>

                <div class="content-container flex-grow-1 px-3">
                    <div class="container-fluid content-wrapper">
                        <router-outlet></router-outlet>
                    </div>
                </div>

                <app-footer-component></app-footer-component>
            </div>


        </div>
    `,
    styleUrls: [ './default-layout.component.scss' ]
})
export class AppDefaultLayoutComponent {
    @ViewChild('appSideMenuComponent') appSideMenuComponent?: AppSideMenuComponent;

    collapse: boolean = false;
    menuList: any[] = [
        {
            name: 'Dashboard',
            path: '/dashboard'
        },
        {
            name: 'Post',
            path: '/post'
        }
    ];

    constructor() {
    }

    onSetCollapse() {
        this.collapse
            ? this.collapse = false
            : this.collapse = true;
    }
}

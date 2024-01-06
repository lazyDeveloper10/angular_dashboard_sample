import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { AppDefaultLayoutComponent } from './core/default-layout/default-layout.component';
import { environment } from '../environments/environment';
import { AppComponent } from '../../../dashboard/src/app/app.component';

export const routes: Routes = [
    {
        path: '',
        component: AppDefaultLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                // tslint:disable-next-line:max-line-length
                loadChildren: () => loadRemoteModule({
                    ...environment.microFrontEnd.dashboard,
                    exposedModule: environment.microFrontEnd.dashboard.exposedModule.SharedDashboardComponent,
                }).then((mod) => mod.routes)
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];

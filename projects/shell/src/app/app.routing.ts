import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment';

import { AppDefaultLayoutComponent } from './core/default-layout/default-layout.component';
import { PostRouting } from '../../../admin/src/app/pages/post/post.routing';

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
                    exposedModule: environment.microFrontEnd.dashboard.exposedModule.SharedDashboardModule,
                }).then((mod) => mod.DashboardRouting)
            },
            {
                path: 'post',
                // tslint:disable-next-line:max-line-length
                loadChildren: () => loadRemoteModule({
                    ...environment.microFrontEnd.admin,
                    exposedModule: environment.microFrontEnd.admin.exposedModule.SharedAdminPostModule,
                }).then((mod) => mod.PostRouting)
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];

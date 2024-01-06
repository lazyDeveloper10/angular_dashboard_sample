import { Routes } from '@angular/router';

import { AppPostTableComponent } from './post-table.component';
import { AppPostFormComponent } from './post-form.component';

export const PostRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: AppPostTableComponent
            },
            {
                path: 'create',
                component: AppPostFormComponent
            },
            {
                path: 'update/:id',
                component: AppPostFormComponent
            }
        ]
    }
];

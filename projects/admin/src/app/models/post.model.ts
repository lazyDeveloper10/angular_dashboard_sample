import { FormControl, Validators } from '@angular/forms';

import { TableInterface } from 'shared';

export class Post {
    title = new FormControl(null, Validators.required);
    body = new FormControl(null, Validators.required);
    userId  = new FormControl(null);
}

export interface PostInterface {
    id: string;
    title: string;
    body: string;
    userId: string;
}

export interface OverallPostResponseInterface extends TableInterface {
    value: PostInterface[];
}

export const postTableColumns = [
    {
        name: 'Title',
        prop: 'title',
        flexGrow: 1,
        minWidth: 250,
        maxWidth: 250,
        draggable: false,
        sortable: true,
    },
];

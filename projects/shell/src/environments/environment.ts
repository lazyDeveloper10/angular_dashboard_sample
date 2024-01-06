import { baseAdmin, baseDashboard } from '../app/models/base-remote.model';

export const environment: any = {
    microFrontEnd: {
        dashboard: {
            type: 'module',
            remoteEntry: 'http://localhost:8000/remoteEntry.js',
            exposedModule: baseDashboard
        },
        admin: {
            type: 'module',
            remoteEntry: 'http://localhost:8100/remoteEntry.js',
            exposedModule: baseAdmin
        }
    }
};

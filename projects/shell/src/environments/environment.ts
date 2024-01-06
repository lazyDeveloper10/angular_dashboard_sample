enum baseModule {
    SharedHeaderComponent = 'SharedHeaderComponent',
    SharedSideMenuComponent = 'SharedSideMenuComponent',
    SharedFooterComponent = 'SharedFooterComponent'
}

enum baseDashboard {
    SharedDashboardComponent = 'SharedDashboardComponent',
}

export const environment: any = {
    microFrontEnd: {
        base: {
            type: 'module',
            remoteEntry: 'http://localhost:7500/remoteEntry.js',
            exposedModule: baseModule
        },
        dashboard: {
            type: 'module',
            remoteEntry: 'http://localhost:8000/remoteEntry.js',
            exposedModule: baseDashboard
        }
    }
};

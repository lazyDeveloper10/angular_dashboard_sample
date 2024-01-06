const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
    path.join(__dirname, '../../tsconfig.json'),
    [/* mapped paths to share */ ]);

module.exports = {
    output: {
        uniqueName: 'base',
        publicPath: 'auto'
    },
    optimization: {
        runtimeChunk: false
    },
    resolve: {
        alias: {
            ...sharedMappings.getAliases(),
        }
    },
    experiments: {
        outputModule: true
    },
    plugins: [
        new ModuleFederationPlugin({
            library: { type: 'module' },

            name: "base",
            filename: "remoteEntry.js",
            exposes: {
                'SharedCardComponent': './projects/base/src/app/components/card/card.component.ts',
                'SharedFooterComponent': './projects/base/src/app/components/footer/footer.component.ts',
                'SharedHeaderComponent': './projects/base/src/app/components/header/header.component.ts',
                'SharedSideMenuComponent': './projects/base/src/app/components/side-menu/side-menu.component.ts',
            },

            shared: share({
                '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },

                ...sharedMappings.getDescriptors(),
            }),

        }),
        sharedMappings.getPlugin()
    ],
};

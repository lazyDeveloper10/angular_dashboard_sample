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
        uniqueName: 'admin',
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

            name: "admin",
            filename: "remoteEntry.js",
            exposes: {
                'SharedAdminPostModule': './projects/admin/src/app/pages/post/post.routing.ts',
            },

            shared: share({
                '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },

                "ngx-toastr":{singleton: true, strictVersion: true, requiredVersion: 'auto'},

                '@shared': {
                    'singleton': true,
                    'import': 'dist/shared'
                },

                ...sharedMappings.getDescriptors()
            })

        }),
        sharedMappings.getPlugin()
    ],
};

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { loadRemoteModule } from '@angular-architects/module-federation';
// import { AppCardComponent } from '../../../base/src/app/components/card';
// import { AppCardComponent } from '../../../base/src/app/components/card';
// import { TableInterface } from '../../../base/src/app/shared';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ CommonModule, RouterOutlet ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'dashboard';

    async ngOnInit() {
        const { keystore } = await loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:7500/remoteEntry.js',
            exposedModule: 'SharedKeystoreModel'
        });

        console.log(keystore);

        loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:7500/remoteEntry.js',
            exposedModule: 'SharedKeystoreModel'
        }).then((data: any) => {
            console.log(data, 'dashboard');

            //  // const factory = this.resolver.resolveComponentFactory(data.AppCardComponent);
            //  const m = this.footerContainer?.createComponent(data.AppCardComponent);
            //
            // console.log(m);
            //  console.log(this.footerContainer)

        }).catch((err) => {
            console.log(err);
        });
    }
}

import { NgModule } from '@angular/core';

import { WebliotecaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [WebliotecaSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [WebliotecaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class WebliotecaSharedCommonModule {}

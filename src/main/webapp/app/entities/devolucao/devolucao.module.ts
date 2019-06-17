import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebliotecaSharedModule } from 'app/shared';
import {
    DevolucaoComponent,
    DevolucaoDetailComponent,
    DevolucaoUpdateComponent,
    DevolucaoDeletePopupComponent,
    DevolucaoDeleteDialogComponent,
    devolucaoRoute,
    devolucaoPopupRoute
} from './';

const ENTITY_STATES = [...devolucaoRoute, ...devolucaoPopupRoute];

@NgModule({
    imports: [WebliotecaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DevolucaoComponent,
        DevolucaoDetailComponent,
        DevolucaoUpdateComponent,
        DevolucaoDeleteDialogComponent,
        DevolucaoDeletePopupComponent
    ],
    entryComponents: [DevolucaoComponent, DevolucaoUpdateComponent, DevolucaoDeleteDialogComponent, DevolucaoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebliotecaDevolucaoModule {}

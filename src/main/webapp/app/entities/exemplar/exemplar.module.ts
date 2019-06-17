import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebliotecaSharedModule } from 'app/shared';
import {
    ExemplarComponent,
    ExemplarDetailComponent,
    ExemplarUpdateComponent,
    ExemplarDeletePopupComponent,
    ExemplarDeleteDialogComponent,
    exemplarRoute,
    exemplarPopupRoute
} from './';

const ENTITY_STATES = [...exemplarRoute, ...exemplarPopupRoute];

@NgModule({
    imports: [WebliotecaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExemplarComponent,
        ExemplarDetailComponent,
        ExemplarUpdateComponent,
        ExemplarDeleteDialogComponent,
        ExemplarDeletePopupComponent
    ],
    entryComponents: [ExemplarComponent, ExemplarUpdateComponent, ExemplarDeleteDialogComponent, ExemplarDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebliotecaExemplarModule {}

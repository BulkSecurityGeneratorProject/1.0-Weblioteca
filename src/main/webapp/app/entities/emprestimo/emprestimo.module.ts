import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebliotecaSharedModule } from 'app/shared';
import {
    EmprestimoComponent,
    EmprestimoDetailComponent,
    EmprestimoUpdateComponent,
    EmprestimoDeletePopupComponent,
    EmprestimoDeleteDialogComponent,
    emprestimoRoute,
    emprestimoPopupRoute
} from './';

const ENTITY_STATES = [...emprestimoRoute, ...emprestimoPopupRoute];

@NgModule({
    imports: [WebliotecaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmprestimoComponent,
        EmprestimoDetailComponent,
        EmprestimoUpdateComponent,
        EmprestimoDeleteDialogComponent,
        EmprestimoDeletePopupComponent
    ],
    entryComponents: [EmprestimoComponent, EmprestimoUpdateComponent, EmprestimoDeleteDialogComponent, EmprestimoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebliotecaEmprestimoModule {}

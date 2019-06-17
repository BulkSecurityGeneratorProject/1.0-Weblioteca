import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebliotecaSharedModule } from 'app/shared';
import {
    LivroComponent,
    LivroDetailComponent,
    LivroUpdateComponent,
    LivroDeletePopupComponent,
    LivroDeleteDialogComponent,
    livroRoute,
    livroPopupRoute
} from './';

const ENTITY_STATES = [...livroRoute, ...livroPopupRoute];

@NgModule({
    imports: [WebliotecaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [LivroComponent, LivroDetailComponent, LivroUpdateComponent, LivroDeleteDialogComponent, LivroDeletePopupComponent],
    entryComponents: [LivroComponent, LivroUpdateComponent, LivroDeleteDialogComponent, LivroDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebliotecaLivroModule {}

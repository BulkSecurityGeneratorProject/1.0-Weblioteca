import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebliotecaSharedModule } from 'app/shared';
import {
    EditoraComponent,
    EditoraDetailComponent,
    EditoraUpdateComponent,
    EditoraDeletePopupComponent,
    EditoraDeleteDialogComponent,
    editoraRoute,
    editoraPopupRoute
} from './';

const ENTITY_STATES = [...editoraRoute, ...editoraPopupRoute];

@NgModule({
    imports: [WebliotecaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EditoraComponent,
        EditoraDetailComponent,
        EditoraUpdateComponent,
        EditoraDeleteDialogComponent,
        EditoraDeletePopupComponent
    ],
    entryComponents: [EditoraComponent, EditoraUpdateComponent, EditoraDeleteDialogComponent, EditoraDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebliotecaEditoraModule {}

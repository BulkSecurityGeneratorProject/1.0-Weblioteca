import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEditora } from 'app/shared/model/editora.model';
import { EditoraService } from './editora.service';
import { ILivro } from 'app/shared/model/livro.model';
import { LivroService } from 'app/entities/livro';

@Component({
    selector: 'jhi-editora-update',
    templateUrl: './editora-update.component.html'
})
export class EditoraUpdateComponent implements OnInit {
    editora: IEditora;
    isSaving: boolean;

    livros: ILivro[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected editoraService: EditoraService,
        protected livroService: LivroService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ editora }) => {
            this.editora = editora;
        });
        this.livroService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ILivro[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILivro[]>) => response.body)
            )
            .subscribe((res: ILivro[]) => (this.livros = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.editora.id !== undefined) {
            this.subscribeToSaveResponse(this.editoraService.update(this.editora));
        } else {
            this.subscribeToSaveResponse(this.editoraService.create(this.editora));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEditora>>) {
        result.subscribe((res: HttpResponse<IEditora>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLivroById(index: number, item: ILivro) {
        return item.id;
    }
}

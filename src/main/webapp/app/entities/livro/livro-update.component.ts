import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILivro } from 'app/shared/model/livro.model';
import { LivroService } from './livro.service';
import { IEditora } from 'app/shared/model/editora.model';
import { EditoraService } from 'app/entities/editora';
import { IAutor } from 'app/shared/model/autor.model';
import { AutorService } from 'app/entities/autor';

@Component({
    selector: 'jhi-livro-update',
    templateUrl: './livro-update.component.html'
})
export class LivroUpdateComponent implements OnInit {
    livro: ILivro;
    isSaving: boolean;

    editoras: IEditora[];

    autors: IAutor[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected livroService: LivroService,
        protected editoraService: EditoraService,
        protected autorService: AutorService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ livro }) => {
            this.livro = livro;
        });
        this.editoraService
            .query({ filter: 'livro-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IEditora[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEditora[]>) => response.body)
            )
            .subscribe(
                (res: IEditora[]) => {
                    if (!this.livro.editora || !this.livro.editora.id) {
                        this.editoras = res;
                    } else {
                        this.editoraService
                            .find(this.livro.editora.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IEditora>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IEditora>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IEditora) => (this.editoras = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.autorService
            .query({ filter: 'livro-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IAutor[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAutor[]>) => response.body)
            )
            .subscribe(
                (res: IAutor[]) => {
                    if (!this.livro.autor || !this.livro.autor.id) {
                        this.autors = res;
                    } else {
                        this.autorService
                            .find(this.livro.autor.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IAutor>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IAutor>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IAutor) => (this.autors = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.livro.id !== undefined) {
            this.subscribeToSaveResponse(this.livroService.update(this.livro));
        } else {
            this.subscribeToSaveResponse(this.livroService.create(this.livro));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILivro>>) {
        result.subscribe((res: HttpResponse<ILivro>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEditoraById(index: number, item: IEditora) {
        return item.id;
    }

    trackAutorById(index: number, item: IAutor) {
        return item.id;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IAutor } from 'app/shared/model/autor.model';
import { AutorService } from './autor.service';
import { ILivro } from 'app/shared/model/livro.model';
import { LivroService } from 'app/entities/livro';

@Component({
    selector: 'jhi-autor-update',
    templateUrl: './autor-update.component.html'
})
export class AutorUpdateComponent implements OnInit {
    autor: IAutor;
    isSaving: boolean;

    livros: ILivro[];
    dataNascimentoDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected autorService: AutorService,
        protected livroService: LivroService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ autor }) => {
            this.autor = autor;
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
        if (this.autor.id !== undefined) {
            this.subscribeToSaveResponse(this.autorService.update(this.autor));
        } else {
            this.subscribeToSaveResponse(this.autorService.create(this.autor));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAutor>>) {
        result.subscribe((res: HttpResponse<IAutor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

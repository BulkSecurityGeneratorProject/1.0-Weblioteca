import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IExemplar } from 'app/shared/model/exemplar.model';
import { ExemplarService } from './exemplar.service';
import { ILivro } from 'app/shared/model/livro.model';
import { LivroService } from 'app/entities/livro';
import { IEmprestimo } from 'app/shared/model/emprestimo.model';
import { EmprestimoService } from 'app/entities/emprestimo';
import { IReserva } from 'app/shared/model/reserva.model';
import { ReservaService } from 'app/entities/reserva';
import { IDevolucao } from 'app/shared/model/devolucao.model';
import { DevolucaoService } from 'app/entities/devolucao';

@Component({
    selector: 'jhi-exemplar-update',
    templateUrl: './exemplar-update.component.html'
})
export class ExemplarUpdateComponent implements OnInit {
    exemplar: IExemplar;
    isSaving: boolean;

    livros: ILivro[];

    emprestimos: IEmprestimo[];

    reservas: IReserva[];

    devolucaos: IDevolucao[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected exemplarService: ExemplarService,
        protected livroService: LivroService,
        protected emprestimoService: EmprestimoService,
        protected reservaService: ReservaService,
        protected devolucaoService: DevolucaoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ exemplar }) => {
            this.exemplar = exemplar;
        });
        this.livroService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ILivro[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILivro[]>) => response.body)
            )
            .subscribe((res: ILivro[]) => (this.livros = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.emprestimoService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEmprestimo[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEmprestimo[]>) => response.body)
            )
            .subscribe((res: IEmprestimo[]) => (this.emprestimos = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.reservaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IReserva[]>) => mayBeOk.ok),
                map((response: HttpResponse<IReserva[]>) => response.body)
            )
            .subscribe((res: IReserva[]) => (this.reservas = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.devolucaoService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDevolucao[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDevolucao[]>) => response.body)
            )
            .subscribe((res: IDevolucao[]) => (this.devolucaos = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.exemplar.id !== undefined) {
            this.subscribeToSaveResponse(this.exemplarService.update(this.exemplar));
        } else {
            this.subscribeToSaveResponse(this.exemplarService.create(this.exemplar));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IExemplar>>) {
        result.subscribe((res: HttpResponse<IExemplar>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEmprestimoById(index: number, item: IEmprestimo) {
        return item.id;
    }

    trackReservaById(index: number, item: IReserva) {
        return item.id;
    }

    trackDevolucaoById(index: number, item: IDevolucao) {
        return item.id;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IDevolucao } from 'app/shared/model/devolucao.model';
import { DevolucaoService } from './devolucao.service';
import { IExemplar } from 'app/shared/model/exemplar.model';
import { ExemplarService } from 'app/entities/exemplar';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-devolucao-update',
    templateUrl: './devolucao-update.component.html'
})
export class DevolucaoUpdateComponent implements OnInit {
    devolucao: IDevolucao;
    isSaving: boolean;

    exemplars: IExemplar[];

    users: IUser[];
    dataDevolucaoDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected devolucaoService: DevolucaoService,
        protected exemplarService: ExemplarService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ devolucao }) => {
            this.devolucao = devolucao;
        });
        this.exemplarService
            .query({ filter: 'devolucao-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IExemplar[]>) => mayBeOk.ok),
                map((response: HttpResponse<IExemplar[]>) => response.body)
            )
            .subscribe(
                (res: IExemplar[]) => {
                    if (!this.devolucao.exemplar || !this.devolucao.exemplar.id) {
                        this.exemplars = res;
                    } else {
                        this.exemplarService
                            .find(this.devolucao.exemplar.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IExemplar>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IExemplar>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IExemplar) => (this.exemplars = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.devolucao.id !== undefined) {
            this.subscribeToSaveResponse(this.devolucaoService.update(this.devolucao));
        } else {
            this.subscribeToSaveResponse(this.devolucaoService.create(this.devolucao));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDevolucao>>) {
        result.subscribe((res: HttpResponse<IDevolucao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackExemplarById(index: number, item: IExemplar) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}

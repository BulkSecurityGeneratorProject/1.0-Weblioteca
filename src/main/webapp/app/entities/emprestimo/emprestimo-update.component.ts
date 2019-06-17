import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IEmprestimo } from 'app/shared/model/emprestimo.model';
import { EmprestimoService } from './emprestimo.service';
import { IExemplar } from 'app/shared/model/exemplar.model';
import { ExemplarService } from 'app/entities/exemplar';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-emprestimo-update',
    templateUrl: './emprestimo-update.component.html'
})
export class EmprestimoUpdateComponent implements OnInit {
    emprestimo: IEmprestimo;
    isSaving: boolean;

    exemplars: IExemplar[];

    users: IUser[];
    dataEmprestimoDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected emprestimoService: EmprestimoService,
        protected exemplarService: ExemplarService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ emprestimo }) => {
            this.emprestimo = emprestimo;
        });
        this.exemplarService
            .query({ filter: 'emprestimo-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IExemplar[]>) => mayBeOk.ok),
                map((response: HttpResponse<IExemplar[]>) => response.body)
            )
            .subscribe(
                (res: IExemplar[]) => {
                    if (!this.emprestimo.exemplar || !this.emprestimo.exemplar.id) {
                        this.exemplars = res;
                    } else {
                        this.exemplarService
                            .find(this.emprestimo.exemplar.id)
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
        if (this.emprestimo.id !== undefined) {
            this.subscribeToSaveResponse(this.emprestimoService.update(this.emprestimo));
        } else {
            this.subscribeToSaveResponse(this.emprestimoService.create(this.emprestimo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmprestimo>>) {
        result.subscribe((res: HttpResponse<IEmprestimo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

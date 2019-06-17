import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEmprestimo } from 'app/shared/model/emprestimo.model';
import { AccountService } from 'app/core';
import { EmprestimoService } from './emprestimo.service';

@Component({
    selector: 'jhi-emprestimo',
    templateUrl: './emprestimo.component.html'
})
export class EmprestimoComponent implements OnInit, OnDestroy {
    emprestimos: IEmprestimo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected emprestimoService: EmprestimoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.emprestimoService
            .query()
            .pipe(
                filter((res: HttpResponse<IEmprestimo[]>) => res.ok),
                map((res: HttpResponse<IEmprestimo[]>) => res.body)
            )
            .subscribe(
                (res: IEmprestimo[]) => {
                    this.emprestimos = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEmprestimos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEmprestimo) {
        return item.id;
    }

    registerChangeInEmprestimos() {
        this.eventSubscriber = this.eventManager.subscribe('emprestimoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

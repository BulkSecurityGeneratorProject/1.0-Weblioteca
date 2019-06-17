import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDevolucao } from 'app/shared/model/devolucao.model';
import { AccountService } from 'app/core';
import { DevolucaoService } from './devolucao.service';

@Component({
    selector: 'jhi-devolucao',
    templateUrl: './devolucao.component.html'
})
export class DevolucaoComponent implements OnInit, OnDestroy {
    devolucaos: IDevolucao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected devolucaoService: DevolucaoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.devolucaoService
            .query()
            .pipe(
                filter((res: HttpResponse<IDevolucao[]>) => res.ok),
                map((res: HttpResponse<IDevolucao[]>) => res.body)
            )
            .subscribe(
                (res: IDevolucao[]) => {
                    this.devolucaos = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDevolucaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDevolucao) {
        return item.id;
    }

    registerChangeInDevolucaos() {
        this.eventSubscriber = this.eventManager.subscribe('devolucaoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

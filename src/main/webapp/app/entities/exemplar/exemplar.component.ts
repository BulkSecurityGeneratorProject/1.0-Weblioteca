import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExemplar } from 'app/shared/model/exemplar.model';
import { AccountService } from 'app/core';
import { ExemplarService } from './exemplar.service';

@Component({
    selector: 'jhi-exemplar',
    templateUrl: './exemplar.component.html'
})
export class ExemplarComponent implements OnInit, OnDestroy {
    exemplars: IExemplar[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected exemplarService: ExemplarService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.exemplarService
            .query()
            .pipe(
                filter((res: HttpResponse<IExemplar[]>) => res.ok),
                map((res: HttpResponse<IExemplar[]>) => res.body)
            )
            .subscribe(
                (res: IExemplar[]) => {
                    this.exemplars = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInExemplars();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IExemplar) {
        return item.id;
    }

    registerChangeInExemplars() {
        this.eventSubscriber = this.eventManager.subscribe('exemplarListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

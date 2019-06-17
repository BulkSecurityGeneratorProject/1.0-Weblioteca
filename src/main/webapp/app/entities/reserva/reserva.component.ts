import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReserva } from 'app/shared/model/reserva.model';
import { AccountService } from 'app/core';
import { ReservaService } from './reserva.service';

@Component({
    selector: 'jhi-reserva',
    templateUrl: './reserva.component.html'
})
export class ReservaComponent implements OnInit, OnDestroy {
    reservas: IReserva[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected reservaService: ReservaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.reservaService
            .query()
            .pipe(
                filter((res: HttpResponse<IReserva[]>) => res.ok),
                map((res: HttpResponse<IReserva[]>) => res.body)
            )
            .subscribe(
                (res: IReserva[]) => {
                    this.reservas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReservas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReserva) {
        return item.id;
    }

    registerChangeInReservas() {
        this.eventSubscriber = this.eventManager.subscribe('reservaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

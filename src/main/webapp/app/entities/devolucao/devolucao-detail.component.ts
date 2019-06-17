import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDevolucao } from 'app/shared/model/devolucao.model';

@Component({
    selector: 'jhi-devolucao-detail',
    templateUrl: './devolucao-detail.component.html'
})
export class DevolucaoDetailComponent implements OnInit {
    devolucao: IDevolucao;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ devolucao }) => {
            this.devolucao = devolucao;
        });
    }

    previousState() {
        window.history.back();
    }
}

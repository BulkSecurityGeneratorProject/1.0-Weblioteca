import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExemplar } from 'app/shared/model/exemplar.model';

@Component({
    selector: 'jhi-exemplar-detail',
    templateUrl: './exemplar-detail.component.html'
})
export class ExemplarDetailComponent implements OnInit {
    exemplar: IExemplar;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ exemplar }) => {
            this.exemplar = exemplar;
        });
    }

    previousState() {
        window.history.back();
    }
}

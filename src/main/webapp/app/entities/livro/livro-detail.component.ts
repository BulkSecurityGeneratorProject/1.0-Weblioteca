import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILivro } from 'app/shared/model/livro.model';

@Component({
    selector: 'jhi-livro-detail',
    templateUrl: './livro-detail.component.html'
})
export class LivroDetailComponent implements OnInit {
    livro: ILivro;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ livro }) => {
            this.livro = livro;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEditora } from 'app/shared/model/editora.model';

@Component({
    selector: 'jhi-editora-detail',
    templateUrl: './editora-detail.component.html'
})
export class EditoraDetailComponent implements OnInit {
    editora: IEditora;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ editora }) => {
            this.editora = editora;
        });
    }

    previousState() {
        window.history.back();
    }
}

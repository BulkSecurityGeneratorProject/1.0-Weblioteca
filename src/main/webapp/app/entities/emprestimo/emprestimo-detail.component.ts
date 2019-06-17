import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmprestimo } from 'app/shared/model/emprestimo.model';

@Component({
    selector: 'jhi-emprestimo-detail',
    templateUrl: './emprestimo-detail.component.html'
})
export class EmprestimoDetailComponent implements OnInit {
    emprestimo: IEmprestimo;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ emprestimo }) => {
            this.emprestimo = emprestimo;
        });
    }

    previousState() {
        window.history.back();
    }
}

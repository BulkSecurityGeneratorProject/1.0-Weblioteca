import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmprestimo } from 'app/shared/model/emprestimo.model';
import { EmprestimoService } from './emprestimo.service';

@Component({
    selector: 'jhi-emprestimo-delete-dialog',
    templateUrl: './emprestimo-delete-dialog.component.html'
})
export class EmprestimoDeleteDialogComponent {
    emprestimo: IEmprestimo;

    constructor(
        protected emprestimoService: EmprestimoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emprestimoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'emprestimoListModification',
                content: 'Deleted an emprestimo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-emprestimo-delete-popup',
    template: ''
})
export class EmprestimoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ emprestimo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EmprestimoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.emprestimo = emprestimo;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/emprestimo', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/emprestimo', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

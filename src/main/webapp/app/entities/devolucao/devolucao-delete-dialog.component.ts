import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDevolucao } from 'app/shared/model/devolucao.model';
import { DevolucaoService } from './devolucao.service';

@Component({
    selector: 'jhi-devolucao-delete-dialog',
    templateUrl: './devolucao-delete-dialog.component.html'
})
export class DevolucaoDeleteDialogComponent {
    devolucao: IDevolucao;

    constructor(
        protected devolucaoService: DevolucaoService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.devolucaoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'devolucaoListModification',
                content: 'Deleted an devolucao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-devolucao-delete-popup',
    template: ''
})
export class DevolucaoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ devolucao }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DevolucaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.devolucao = devolucao;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/devolucao', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/devolucao', { outlets: { popup: null } }]);
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

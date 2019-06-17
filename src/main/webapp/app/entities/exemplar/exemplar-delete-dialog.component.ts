import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExemplar } from 'app/shared/model/exemplar.model';
import { ExemplarService } from './exemplar.service';

@Component({
    selector: 'jhi-exemplar-delete-dialog',
    templateUrl: './exemplar-delete-dialog.component.html'
})
export class ExemplarDeleteDialogComponent {
    exemplar: IExemplar;

    constructor(protected exemplarService: ExemplarService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.exemplarService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'exemplarListModification',
                content: 'Deleted an exemplar'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-exemplar-delete-popup',
    template: ''
})
export class ExemplarDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ exemplar }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ExemplarDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.exemplar = exemplar;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/exemplar', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/exemplar', { outlets: { popup: null } }]);
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

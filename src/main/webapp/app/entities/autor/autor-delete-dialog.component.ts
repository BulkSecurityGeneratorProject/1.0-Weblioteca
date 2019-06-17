import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAutor } from 'app/shared/model/autor.model';
import { AutorService } from './autor.service';

@Component({
    selector: 'jhi-autor-delete-dialog',
    templateUrl: './autor-delete-dialog.component.html'
})
export class AutorDeleteDialogComponent {
    autor: IAutor;

    constructor(protected autorService: AutorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.autorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'autorListModification',
                content: 'Deleted an autor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-autor-delete-popup',
    template: ''
})
export class AutorDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ autor }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AutorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.autor = autor;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/autor', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/autor', { outlets: { popup: null } }]);
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

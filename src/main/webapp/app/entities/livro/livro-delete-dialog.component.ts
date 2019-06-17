import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILivro } from 'app/shared/model/livro.model';
import { LivroService } from './livro.service';

@Component({
    selector: 'jhi-livro-delete-dialog',
    templateUrl: './livro-delete-dialog.component.html'
})
export class LivroDeleteDialogComponent {
    livro: ILivro;

    constructor(protected livroService: LivroService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.livroService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'livroListModification',
                content: 'Deleted an livro'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-livro-delete-popup',
    template: ''
})
export class LivroDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ livro }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LivroDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.livro = livro;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/livro', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/livro', { outlets: { popup: null } }]);
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

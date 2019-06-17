import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEditora } from 'app/shared/model/editora.model';
import { EditoraService } from './editora.service';

@Component({
    selector: 'jhi-editora-delete-dialog',
    templateUrl: './editora-delete-dialog.component.html'
})
export class EditoraDeleteDialogComponent {
    editora: IEditora;

    constructor(protected editoraService: EditoraService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.editoraService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'editoraListModification',
                content: 'Deleted an editora'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-editora-delete-popup',
    template: ''
})
export class EditoraDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ editora }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EditoraDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.editora = editora;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/editora', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/editora', { outlets: { popup: null } }]);
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

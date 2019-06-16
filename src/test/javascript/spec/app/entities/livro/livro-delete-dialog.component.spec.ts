/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WebliotecaTestModule } from '../../../test.module';
import { LivroDeleteDialogComponent } from 'app/entities/livro/livro-delete-dialog.component';
import { LivroService } from 'app/entities/livro/livro.service';

describe('Component Tests', () => {
    describe('Livro Management Delete Component', () => {
        let comp: LivroDeleteDialogComponent;
        let fixture: ComponentFixture<LivroDeleteDialogComponent>;
        let service: LivroService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [LivroDeleteDialogComponent]
            })
                .overrideTemplate(LivroDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LivroDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LivroService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

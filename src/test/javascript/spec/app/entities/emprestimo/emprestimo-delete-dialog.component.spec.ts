/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WebliotecaTestModule } from '../../../test.module';
import { EmprestimoDeleteDialogComponent } from 'app/entities/emprestimo/emprestimo-delete-dialog.component';
import { EmprestimoService } from 'app/entities/emprestimo/emprestimo.service';

describe('Component Tests', () => {
    describe('Emprestimo Management Delete Component', () => {
        let comp: EmprestimoDeleteDialogComponent;
        let fixture: ComponentFixture<EmprestimoDeleteDialogComponent>;
        let service: EmprestimoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [EmprestimoDeleteDialogComponent]
            })
                .overrideTemplate(EmprestimoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmprestimoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmprestimoService);
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

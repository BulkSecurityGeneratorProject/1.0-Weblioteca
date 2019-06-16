/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WebliotecaTestModule } from '../../../test.module';
import { ExemplarDeleteDialogComponent } from 'app/entities/exemplar/exemplar-delete-dialog.component';
import { ExemplarService } from 'app/entities/exemplar/exemplar.service';

describe('Component Tests', () => {
    describe('Exemplar Management Delete Component', () => {
        let comp: ExemplarDeleteDialogComponent;
        let fixture: ComponentFixture<ExemplarDeleteDialogComponent>;
        let service: ExemplarService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [ExemplarDeleteDialogComponent]
            })
                .overrideTemplate(ExemplarDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExemplarDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExemplarService);
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

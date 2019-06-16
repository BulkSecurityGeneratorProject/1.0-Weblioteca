/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WebliotecaTestModule } from '../../../test.module';
import { EditoraDeleteDialogComponent } from 'app/entities/editora/editora-delete-dialog.component';
import { EditoraService } from 'app/entities/editora/editora.service';

describe('Component Tests', () => {
    describe('Editora Management Delete Component', () => {
        let comp: EditoraDeleteDialogComponent;
        let fixture: ComponentFixture<EditoraDeleteDialogComponent>;
        let service: EditoraService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [EditoraDeleteDialogComponent]
            })
                .overrideTemplate(EditoraDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EditoraDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EditoraService);
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

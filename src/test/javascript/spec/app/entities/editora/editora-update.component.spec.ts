/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WebliotecaTestModule } from '../../../test.module';
import { EditoraUpdateComponent } from 'app/entities/editora/editora-update.component';
import { EditoraService } from 'app/entities/editora/editora.service';
import { Editora } from 'app/shared/model/editora.model';

describe('Component Tests', () => {
    describe('Editora Management Update Component', () => {
        let comp: EditoraUpdateComponent;
        let fixture: ComponentFixture<EditoraUpdateComponent>;
        let service: EditoraService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [EditoraUpdateComponent]
            })
                .overrideTemplate(EditoraUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EditoraUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EditoraService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Editora(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.editora = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Editora();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.editora = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});

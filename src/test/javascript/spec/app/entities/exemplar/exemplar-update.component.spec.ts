/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WebliotecaTestModule } from '../../../test.module';
import { ExemplarUpdateComponent } from 'app/entities/exemplar/exemplar-update.component';
import { ExemplarService } from 'app/entities/exemplar/exemplar.service';
import { Exemplar } from 'app/shared/model/exemplar.model';

describe('Component Tests', () => {
    describe('Exemplar Management Update Component', () => {
        let comp: ExemplarUpdateComponent;
        let fixture: ComponentFixture<ExemplarUpdateComponent>;
        let service: ExemplarService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [ExemplarUpdateComponent]
            })
                .overrideTemplate(ExemplarUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExemplarUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExemplarService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Exemplar(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.exemplar = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Exemplar();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.exemplar = entity;
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

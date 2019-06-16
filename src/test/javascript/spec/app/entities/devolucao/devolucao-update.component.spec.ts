/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WebliotecaTestModule } from '../../../test.module';
import { DevolucaoUpdateComponent } from 'app/entities/devolucao/devolucao-update.component';
import { DevolucaoService } from 'app/entities/devolucao/devolucao.service';
import { Devolucao } from 'app/shared/model/devolucao.model';

describe('Component Tests', () => {
    describe('Devolucao Management Update Component', () => {
        let comp: DevolucaoUpdateComponent;
        let fixture: ComponentFixture<DevolucaoUpdateComponent>;
        let service: DevolucaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [DevolucaoUpdateComponent]
            })
                .overrideTemplate(DevolucaoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DevolucaoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DevolucaoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Devolucao(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.devolucao = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Devolucao();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.devolucao = entity;
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

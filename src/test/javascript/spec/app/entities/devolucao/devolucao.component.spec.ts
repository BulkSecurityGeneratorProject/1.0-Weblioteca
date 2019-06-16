/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WebliotecaTestModule } from '../../../test.module';
import { DevolucaoComponent } from 'app/entities/devolucao/devolucao.component';
import { DevolucaoService } from 'app/entities/devolucao/devolucao.service';
import { Devolucao } from 'app/shared/model/devolucao.model';

describe('Component Tests', () => {
    describe('Devolucao Management Component', () => {
        let comp: DevolucaoComponent;
        let fixture: ComponentFixture<DevolucaoComponent>;
        let service: DevolucaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [DevolucaoComponent],
                providers: []
            })
                .overrideTemplate(DevolucaoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DevolucaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DevolucaoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Devolucao(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.devolucaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

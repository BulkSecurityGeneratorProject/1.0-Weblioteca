/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WebliotecaTestModule } from '../../../test.module';
import { DevolucaoDetailComponent } from 'app/entities/devolucao/devolucao-detail.component';
import { Devolucao } from 'app/shared/model/devolucao.model';

describe('Component Tests', () => {
    describe('Devolucao Management Detail Component', () => {
        let comp: DevolucaoDetailComponent;
        let fixture: ComponentFixture<DevolucaoDetailComponent>;
        const route = ({ data: of({ devolucao: new Devolucao(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [DevolucaoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DevolucaoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DevolucaoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.devolucao).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

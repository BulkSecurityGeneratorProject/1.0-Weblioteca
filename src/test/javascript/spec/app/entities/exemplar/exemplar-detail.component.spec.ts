/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WebliotecaTestModule } from '../../../test.module';
import { ExemplarDetailComponent } from 'app/entities/exemplar/exemplar-detail.component';
import { Exemplar } from 'app/shared/model/exemplar.model';

describe('Component Tests', () => {
    describe('Exemplar Management Detail Component', () => {
        let comp: ExemplarDetailComponent;
        let fixture: ComponentFixture<ExemplarDetailComponent>;
        const route = ({ data: of({ exemplar: new Exemplar(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [ExemplarDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ExemplarDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExemplarDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.exemplar).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

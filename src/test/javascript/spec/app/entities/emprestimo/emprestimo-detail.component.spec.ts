/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WebliotecaTestModule } from '../../../test.module';
import { EmprestimoDetailComponent } from 'app/entities/emprestimo/emprestimo-detail.component';
import { Emprestimo } from 'app/shared/model/emprestimo.model';

describe('Component Tests', () => {
    describe('Emprestimo Management Detail Component', () => {
        let comp: EmprestimoDetailComponent;
        let fixture: ComponentFixture<EmprestimoDetailComponent>;
        const route = ({ data: of({ emprestimo: new Emprestimo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [EmprestimoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EmprestimoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmprestimoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.emprestimo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

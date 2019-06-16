/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WebliotecaTestModule } from '../../../test.module';
import { EmprestimoComponent } from 'app/entities/emprestimo/emprestimo.component';
import { EmprestimoService } from 'app/entities/emprestimo/emprestimo.service';
import { Emprestimo } from 'app/shared/model/emprestimo.model';

describe('Component Tests', () => {
    describe('Emprestimo Management Component', () => {
        let comp: EmprestimoComponent;
        let fixture: ComponentFixture<EmprestimoComponent>;
        let service: EmprestimoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [EmprestimoComponent],
                providers: []
            })
                .overrideTemplate(EmprestimoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmprestimoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmprestimoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Emprestimo(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.emprestimos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

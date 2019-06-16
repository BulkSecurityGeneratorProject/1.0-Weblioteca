/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WebliotecaTestModule } from '../../../test.module';
import { ExemplarComponent } from 'app/entities/exemplar/exemplar.component';
import { ExemplarService } from 'app/entities/exemplar/exemplar.service';
import { Exemplar } from 'app/shared/model/exemplar.model';

describe('Component Tests', () => {
    describe('Exemplar Management Component', () => {
        let comp: ExemplarComponent;
        let fixture: ComponentFixture<ExemplarComponent>;
        let service: ExemplarService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [ExemplarComponent],
                providers: []
            })
                .overrideTemplate(ExemplarComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExemplarComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExemplarService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Exemplar(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.exemplars[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

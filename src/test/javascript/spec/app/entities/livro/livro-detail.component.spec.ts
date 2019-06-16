/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WebliotecaTestModule } from '../../../test.module';
import { LivroDetailComponent } from 'app/entities/livro/livro-detail.component';
import { Livro } from 'app/shared/model/livro.model';

describe('Component Tests', () => {
    describe('Livro Management Detail Component', () => {
        let comp: LivroDetailComponent;
        let fixture: ComponentFixture<LivroDetailComponent>;
        const route = ({ data: of({ livro: new Livro(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [LivroDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LivroDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LivroDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.livro).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

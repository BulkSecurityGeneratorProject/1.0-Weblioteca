/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WebliotecaTestModule } from '../../../test.module';
import { EditoraDetailComponent } from 'app/entities/editora/editora-detail.component';
import { Editora } from 'app/shared/model/editora.model';

describe('Component Tests', () => {
    describe('Editora Management Detail Component', () => {
        let comp: EditoraDetailComponent;
        let fixture: ComponentFixture<EditoraDetailComponent>;
        const route = ({ data: of({ editora: new Editora(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WebliotecaTestModule],
                declarations: [EditoraDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EditoraDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EditoraDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.editora).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

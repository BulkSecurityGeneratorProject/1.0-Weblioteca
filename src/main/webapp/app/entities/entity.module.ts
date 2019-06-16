import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'editora',
                loadChildren: './editora/editora.module#WebliotecaEditoraModule'
            },
            {
                path: 'exemplar',
                loadChildren: './exemplar/exemplar.module#WebliotecaExemplarModule'
            },
            {
                path: 'autor',
                loadChildren: './autor/autor.module#WebliotecaAutorModule'
            },
            {
                path: 'livro',
                loadChildren: './livro/livro.module#WebliotecaLivroModule'
            },
            {
                path: 'emprestimo',
                loadChildren: './emprestimo/emprestimo.module#WebliotecaEmprestimoModule'
            },
            {
                path: 'reserva',
                loadChildren: './reserva/reserva.module#WebliotecaReservaModule'
            },
            {
                path: 'devolucao',
                loadChildren: './devolucao/devolucao.module#WebliotecaDevolucaoModule'
            },
            {
                path: 'editora',
                loadChildren: './editora/editora.module#WebliotecaEditoraModule'
            },
            {
                path: 'exemplar',
                loadChildren: './exemplar/exemplar.module#WebliotecaExemplarModule'
            },
            {
                path: 'autor',
                loadChildren: './autor/autor.module#WebliotecaAutorModule'
            },
            {
                path: 'livro',
                loadChildren: './livro/livro.module#WebliotecaLivroModule'
            },
            {
                path: 'emprestimo',
                loadChildren: './emprestimo/emprestimo.module#WebliotecaEmprestimoModule'
            },
            {
                path: 'reserva',
                loadChildren: './reserva/reserva.module#WebliotecaReservaModule'
            },
            {
                path: 'devolucao',
                loadChildren: './devolucao/devolucao.module#WebliotecaDevolucaoModule'
            },
            {
                path: 'editora',
                loadChildren: './editora/editora.module#WebliotecaEditoraModule'
            },
            {
                path: 'exemplar',
                loadChildren: './exemplar/exemplar.module#WebliotecaExemplarModule'
            },
            {
                path: 'autor',
                loadChildren: './autor/autor.module#WebliotecaAutorModule'
            },
            {
                path: 'livro',
                loadChildren: './livro/livro.module#WebliotecaLivroModule'
            },
            {
                path: 'emprestimo',
                loadChildren: './emprestimo/emprestimo.module#WebliotecaEmprestimoModule'
            },
            {
                path: 'reserva',
                loadChildren: './reserva/reserva.module#WebliotecaReservaModule'
            },
            {
                path: 'devolucao',
                loadChildren: './devolucao/devolucao.module#WebliotecaDevolucaoModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebliotecaEntityModule {}

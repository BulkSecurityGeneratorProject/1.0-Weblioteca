import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Livro } from 'app/shared/model/livro.model';
import { LivroService } from './livro.service';
import { LivroComponent } from './livro.component';
import { LivroDetailComponent } from './livro-detail.component';
import { LivroUpdateComponent } from './livro-update.component';
import { LivroDeletePopupComponent } from './livro-delete-dialog.component';
import { ILivro } from 'app/shared/model/livro.model';

@Injectable({ providedIn: 'root' })
export class LivroResolve implements Resolve<ILivro> {
    constructor(private service: LivroService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILivro> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Livro>) => response.ok),
                map((livro: HttpResponse<Livro>) => livro.body)
            );
        }
        return of(new Livro());
    }
}

export const livroRoute: Routes = [
    {
        path: '',
        component: LivroComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Livros'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: LivroDetailComponent,
        resolve: {
            livro: LivroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livros'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: LivroUpdateComponent,
        resolve: {
            livro: LivroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livros'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: LivroUpdateComponent,
        resolve: {
            livro: LivroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livros'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const livroPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: LivroDeletePopupComponent,
        resolve: {
            livro: LivroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livros'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
